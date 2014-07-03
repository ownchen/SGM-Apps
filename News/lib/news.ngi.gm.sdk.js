/*
 * 天气 Api 类
 */
$unit.ns("gm.ngi.newssdk.BaseApi");
gm.ngi.newssdk.BaseApi = function() {
	this.apiConnectionError = function() {
		// alert("网络出错");
	};

	this.apiServerError = function(d) {
	};

	this.exec = function(lnk, config, callback) {
		config.traceCode = Math.random();

		var ps = config.noEncode ? decodeURIComponent($.param(config)) : $
				.param(config);
		var url = lnk + "?" + ps;
		var start = new Date();
		$.ajax({
			async : true,
			dataType : config.format,
			url : url,
			context : this,
			timeout: 30000,
			success : function(data, status, xhr) {
				var end = new Date();
				var result = {
					succeeded : true,
					data : data,
					xhr : xhr
				};
				var format = data.result ? this.formatTopData
						: this.formatNewsData;
				var nowData = data.result ? data.result.data : data.data;
				var items = [];

				if (nowData && nowData.length > 0) {
					var item;
					if (nowData.length == 1) {
						item = format(nowData[0]);
						item.content = nowData[0].content;
						items = item;
					} else {
						for ( var i = 0, j = nowData.length; i < j; i++) {
							item = format(nowData[i]);
							item && items.push(item);
							continue;
						}
					}
					result.data = items;
				}
				if (data.error_code) {
					this.apiServerError && this.apiServerError(result);
					return;
				}
				if (callback) {
					callback(result);
				}
			},
			error : function(xhr, message, exception) {
				var end = new Date();
				var result = {
					succeeded : false,
					errorMessage : message,
					exception : exception,
					xhr : xhr
				};

				if (xhr.readyState < 4 && this.apiConnectionError) {
					this.apiConnectionError(result);
				} else if (xhr.readyState >= 4 && this.apiServerError) {
					try {
						result.data = JSON.parse(xhr.responseText);
					} catch (err) {
					}
					this.apiServerError(result);
				}

			},
			type : "GET"
		});
	};
	this.formatNewsData = function(a) {
		if (a) {
			var item = new gm.ngi.newssdk.NewsItem();
			item.channel = a.channel;
			item.createTime = a.createtime;
			// item.id = a.id;
			item.id = a.url; // 使用Url做为id，原因是新浪api的listapi返回的id与itemapi返回的id不一致
			item.media = a.media_name;
			item.title = a.title;
			item.url = a.url;
			if (a.img) {
				item.images.push({
					url : a.img,
					width : a.width || 50,
					height : a.height || 50,
					title : ""
				});
			}
			return item;
			// item.Content = a.
		}
		return 0;
	};
	this.formatTopData = function(a) {
		if (a) {
			var item = new gm.ngi.newssdk.NewsItem();
			item.channel = a["channel-id"];
			item.createTime = a.createdatetime;
			// item.id = a.id;
			item.id = a.url; // 使用Url做为id
			item.media = a.media;
			item.title = a.title;
			item.url = a.url;
			item.contentType = a["content-type"];
			if (a.images && a.images.length > 0) {
				item.images = a.images;
			}
			// item.Content = a.
			return item;
			// item.Content = a.
		}
		return 0;
	};
};
$unit.ns("gm.ngi.newssdk.NewsApi");

gm.ngi.newssdk.NewsApi = function() {

	this.className = "NewsApi";
	this.lnk = "http://platform.sina.com.cn/news/";
	this.baseConfig = {
		app_key : '3025920294',
		format : 'json',
		column : 0
	};
	this.listConfig = {
		ie : 'utf-8',
		oe : 'utf-8',
		datetime : '',
		channel : 1,
		ch_map : '',
		comp_h : '',
		comp_w : '',
		date : '',
		delay : 0,
		k : '',
		num : 60,
		offset_num : '',
		offset_page : '',
		page : 1,
		pid : '',
		stime : '',
		type : 1,
		ver : '1.0',
		video : 0,
		traceCode : 0
	};
	this.detailConfig = {
		url : "",
		noEncode : 1
	};
	this.listConfig = $.extend(null, this.listConfig, this.baseConfig);
	this.detailConfig = $.extend(null, this.detailConfig, this.baseConfig);
	/*
	 * 获取新闻 newsType:gm.ngi.weibosdk.NewsType
	 */
	this.getNewsList = function(columnId, pSize, nowTime, callback) {
		tracer.begin("getNewsList - " + columnId, "Api");
		if (parseInt(columnId, 10) == gm.ngi.newssdk.Columns.Top) {
			this.lnk = "http://platform.sina.com.cn/news/important";

		} else {
			this.lnk = "http://platform.sina.com.cn/news/roll";
		}
		this.listConfig.column = columnId;
		this.listConfig.page = 1;
		this.listConfig.num = pSize || 20;
		this.listConfig.datetime = this.getNowTimeString(nowTime);
		this.exec(this.lnk, this.listConfig, function(result){
			tracer.end("getNewsList - " + columnId, "Api");
			callback(result);
		});
	};

	this.getNewsItem = function(url, callback) {
		tracer.begin("getNewsItem - " + url, "Api");
		this.lnk = "http://platform.sina.com.cn/news/news";
		this.detailConfig.url = url;
		this.exec(this.lnk, this.detailConfig, function(result){
			tracer.end("getNewsItem - " + url, "Api");
			callback(result);
		});
	};

	this.getNowTimeString = function(d) {
		var date = d || new Date();
		return $unit.format("{0}-{1}-{2} {3}:{4}:{5}", date.getFullYear(), date
				.getMonth() + 1, date.getDate(), date.getHours(), date
				.getMinutes(), date.getSeconds());
	};

};
gm.ngi.newssdk.NewsApi.prototype = new gm.ngi.newssdk.BaseApi();

// 新闻频道地址：http://platform.sina.com.cn/news/roll?ie=utf-8&oe=utf-8&channel=25&column=237&k=&video=1&num=10&traceCode=0.9421692753676325&app_key=3025920294&format=json
// 新闻详情地址：http://platform.sina.com.cn/news/news?url=http://auto.sina.com.cn/car/2012-04-21/1433957738.shtml&noEncode=1&app_key=3025920294&format=json&column=0&traceCode=0.7888955443631858

$unit.ns("gm.ngi.newssdk.NewsType");
/*
 * 新闻类别
 */
gm.ngi.newssdk.Columns = {
	// 头条
	Top : 89,
	// 国内
	China : 90,
	// 国际
	World : 91,
	// 社会
	Life : 92,
	// 军事
	Politics : 93,
	// 体育
	Sports : 94,
	// 娱乐
	Entertainment : 95,
	// 技术
	Technology : 96,
	// 财经
	Finance : 97, 
	// 汽车
	Auto: 237
};

gm.ngi.newssdk.ColumnsName = {
		// 头条
		89:"头条新闻",
		// 国内
		 90:"国内新闻",
		// 国际
		 91:"国际新闻",
		// 社会
		 92:"社会新闻",
		// 军事
		 93:"军事新闻",
		// 体育
		 94:"体育新闻",
		// 娱乐
		95:"娱乐新闻",
		// 技术
		 96:"科技新闻",
		// 财经
		 97:"财经新闻",
		 // 汽车
		 237:"汽车新闻"
	};
gm.ngi.newssdk.NewsList = function() {
	this.expiresAt = {};
	this.columnId = 0;
	this.items = [];
};
gm.ngi.newssdk.NewsItem = function() {
	this.channel = 0;
	this.columnId = 0;
	this.title = "";
	this.createTime = 0;
	this.contentType = "";
	this.content = "";
	this.images = [];
	this.media = 0;
	this.url = "";
	this.id = "";
};
