/*
 * required gm.io
 */

$unit.ns("gm.ngi.Storage");
gm.ngi.Storage = function() {

};

gm.ngi.Storage.prototype.getItem = function(key) {
};

gm.ngi.Storage.prototype.setItem = function(key, value) {
};

gm.ngi.Storage.prototype.removeItem = function(key) {
};

$unit.ns("gm.ngi.FileStorage");
/*
 * 本地文件存储 在调试环境中，GM File System 无法处理中文内容(乱码)， 因此在读写处理时，使用escape/unescape编解码内容。
 */
gm.ngi.FileStorage = function() {
};

gm.ngi.FileStorage.prototype = new gm.ngi.Storage;
gm.ngi.FileStorage.prototype.className = "gm.ngi.FileStorage";

gm.ngi.FileStorage.prototype.getPath = function(key) {
	var baseDir = "storage/";
	var ext = ".txt";
	return baseDir + key + ext;
};

gm.ngi.FileStorage.prototype.getItem = function(key) {
	tracer.begin("getItem: " + key, "FileStorage");
	var path = this.getPath(key);
	var result = gm.io.readFile(path);
	/* 0720sdk，如读取失败则返回一个数值：
	 * UNKNOWN: 0
	 * FILE_IO_NOT_FOUND: 12
	 * FILE_IO_ACCESS_DENIED: 13
	 * 此处简化处理，如返回结果的类型为"number"，则认为失败
	 */
	tracer.end("getItem: " + key, "FileStorage");
	if (typeof(result) == "number"){
		return null;
	}else{
		//return result;	// 因在硬件上执行时报错，怀疑是编码方面的问题
		return unescape(result);
	}	
};

gm.ngi.FileStorage.prototype.setItem = function(key, value) {
	tracer.begin("setItem: " + key, "FileStorage");
	var path = this.getPath(key);
	var result = gm.io.writeFile(path, escape(value));
	tracer.end("setItem: " + key, "FileStorage");
	//var result = gm.io.writeFile(path, value);	// 因在硬件上执行时报错，怀疑是编码方面的问题
	return result;
};

gm.ngi.FileStorage.prototype.removeItem = function(key) {
	var path = this.getPath(key);
	gm.io.deleteFile(path);
};

$unit.ns("gm.ngi.news.DataStorage");
/*
 * 新闻应用的本地数据存储 GM使用GM文件系统做为存储介质 路径为approot/data/storage
 */
gm.ngi.news.DataStorage = function() {

	this.storage = new gm.ngi.FileStorage();

	// 数据存储键
	this.storageKeys = {

		ApiSetting : "ngi.news.apisetting", // 新闻设置
		columns : "ngi.news.columns", // 新闻类别
		newslist : "ngi.news.newslist", // 新闻列表

		UserOptions : "ngi.news.useroptions", // 用户选项
		getNewsItem : "ngi.news.getNewsItem", // 新闻详情
		newslistTemplate : "ngi.news.newslistTemplate"
	};

};

gm.ngi.news.DataStorage.prototype.writeObject = function(key, obj) {
	tracer.begin("json stringify: " + key, "FileStorage");
	var value = JSON.stringify(obj);
	tracer.end("json stringify: " + key, "FileStorage");
	return this.storage.setItem(key, value);
};

gm.ngi.news.DataStorage.prototype.readObject = function(key) {
	// TODO: try catch
	var str = this.storage.getItem(key);
	if (str){
		//writeLog("try parse JSON: " + key);
		tracer.begin("json parse: " + key, "FileStorage");
		var obj = null;
		try{
			obj = JSON.parse(str);
		} catch (err){
			writeError("JSON parse error: " + err.description);
			return null;
		}
		tracer.end("json parse: " + key, "FileStorage");
		//writeLog("JSON parsed: " + key);
		return obj;
	} else{
		return null;
	}
};

gm.ngi.news.DataStorage.prototype.removeObject = function(key) {
	this.storage.removeItem(key);
};

gm.ngi.news.DataStorage.prototype.getColumns = function() {
	// var obj = this.readObject(this.storageKeys。columns);
	return gm.ngi.newssdk.Columns;
};

gm.ngi.news.DataStorage.prototype.getNewsList = function(columnId) {
	return this.readObject(this.storageKeys.newslist + "_" + columnId);
};

gm.ngi.news.DataStorage.prototype.setNewsList = function(columnId, list) {
	return this.writeObject(this.storageKeys.newslist + "_" + columnId, list);
};

gm.ngi.news.DataStorage.prototype.getNewsItem = function(columnId, newsId) {
	// return this.readObject(this.storageKeys.getNewsItem+"_"+columnId,
	// newsId);
};

gm.ngi.news.DataStorage.prototype.setNewsItem = function(columnId, item) {
	// TODO;
};
gm.ngi.news.DataStorage.prototype.getUserOptions = function() {
	var obj = this.readObject(this.storageKeys.UserOptions);
	return obj;
};

gm.ngi.news.DataStorage.prototype.setUserOptions = function(value) {
	return this.writeObject(this.storageKeys.UserOptions, value);
};
gm.ngi.news.dataStorage = new gm.ngi.news.DataStorage();

$unit.ns("gm.ngi.news.UserOptions");
gm.ngi.news.UserOptions = function() {

	// 用户通知的轮询间隔，默认为30分钟
	this.expiredDuration = 30 * 60 * 1000;

	// 列表页每次下载的条数，默认为10条
	this.pageSize = 20;

	this.maxPages = 100;
};

$unit.ns("gm.ngi.news.NewsDAL");

/*
 * 新闻数据处理 @Author:super man.
 */
gm.ngi.news.NewsDAL = function(userOptions) {

	this.newsApi = new gm.ngi.newssdk.NewsApi();
	this.userOptions = userOptions || new gm.ngi.news.UserOptions();

};
/*
 * 获取新闻列表，按类别
 */
gm.ngi.news.NewsDAL.prototype.getNewsList = function(columnId, callback) {

	var now = new Date();
	var list = gm.ngi.news.dataStorage.getNewsList(columnId);
	var valid = list && list != "false" && list.items;
	if (valid) {
		var expiresAtTime = list.expiresAt;
		var nowTime = new Date().getTime();
		valid = expiresAtTime - nowTime > 0;
	}
	if (valid) {
		// 缓存有效
		callback(list);
	} else {
		// 缓存不存在或已过期
		var that = this;
		this.newsApi.getNewsList(columnId, this.userOptions.pageSize, 0,
				function(ar) {
					if (ar.succeeded) {
						var downloadlist = new gm.ngi.newssdk.NewsList();
						downloadlist.columnId = columnId;
						downloadlist.expiresAt = now.getTime()
								+ that.userOptions.expiredDuration;
						downloadlist.items = ar.data;
						
						list = that.mergeNewsList(list, downloadlist);
						
						gm.ngi.news.dataStorage.setNewsList(columnId, list);
					} else {
						list = null;
					}
					callback(list);
				});
	}

};
gm.ngi.news.NewsDAL.prototype.refreshNewsList = function(columnId, callback) {

	// 缓存不存在或已过期
	var that = this,downloadlist={},now = new Date();
	this.newsApi.getNewsList(columnId, this.userOptions.pageSize, 0,function(ar) {
				if (ar.succeeded) {
					downloadlist = new gm.ngi.newssdk.NewsList();
					downloadlist.columnId = columnId;
					downloadlist.expiresAt = now.getTime() + that.userOptions.expiredDuration;
					downloadlist.items = ar.data;
					
					var list = gm.ngi.news.dataStorage.getNewsList(columnId);
					if(list&& list != "false" && list.items){
						list = that.mergeNewsList(list, downloadlist);
					}
					gm.ngi.news.dataStorage.setNewsList(columnId, list);
				} 
				callback(downloadlist);
			});
};

/*
 * 将下载的新闻列表与已缓存的新闻正文合并
 */
gm.ngi.news.NewsDAL.prototype.mergeNewsList = function(localList, downloadList) {
	var newItems = [];
	for ( var x = 0, j = downloadList.items.length; x < j; x++) {
		var downloadItem = downloadList.items[x];
		if (downloadItem.contentType !="subject"){
			newItems.push(downloadItem);
		}
	}	
	downloadList.items = newItems;
	
	if (!localList) {
		return downloadList;
	}
	for ( var x = 0, j = downloadList.items.length; x < j; x++) {
		var downloadItem = downloadList.items[x];
		for ( var y = 0, yj = localList.items.length; y < yj; y++) {
			var localItem = localList.items[y];
			if (downloadItem.id == localItem.id) {
				downloadItem.content = localItem.content;
				downloadItem.images = localItem.images;
				continue;
			}
		}
	}
	return downloadList;
};
/*
 * 过滤不必要的新闻
 */
gm.ngi.news.NewsDAL.prototype.filterNewsList = function( downloadList) {
	var newItems = [];
	for ( var x = 0, j = downloadList.items.length; x < j; x++) {
		var downloadItem = downloadList.items[x];
		if (downloadItem.contentType !="subject"){
			newItems.push(downloadItem);
		}
	}	
	downloadList.items = newItems;
};
/*
 * 获取新闻详情，按类别
 */
gm.ngi.news.NewsDAL.prototype.getNewsItem = function(columnId, newsId, callback) {
	var list = gm.ngi.news.dataStorage.getNewsList(columnId);
	var item = 0;
	if (list && list != "false" && list.items) {
		var i = 0;
		while (list.items[i]) {
			if (list.items[i].id == newsId) {
				item = list.items[i];
				break;
			}
			i++;
		}
	}
	if (item && item.content=="") {
		var that = this;
		this.newsApi.getNewsItem(item.url,function(ar){
			if (ar.succeeded) {
				item = ar.data;
				that.mergeNewsItem(list, item);
				gm.ngi.news.dataStorage.setNewsList(columnId, list);
			} 
			callback(item);
		});
	}
	else
		callback(item);
};

gm.ngi.news.NewsDAL.prototype.refreshNewsItem = function(columnId,newsId, callback) {

	// 缓存不存在或已过期
	var that = this,item={};
	this.newsApi.getNewsItem(newsId, function(ar) {
				if (ar.succeeded) {
					item = ar.data;
					var list = gm.ngi.news.dataStorage.getNewsList(columnId);
					if (list && list != "false" && list.items){
						that.mergeNewsItem(list, item);
						gm.ngi.news.dataStorage.setNewsList(columnId, list);
					}
				} 
				callback(item);
			});
};
/*
 * 获取新闻详情，并与缓存合并
 */
gm.ngi.news.NewsDAL.prototype.mergeNewsItem = function(localList, item) {
	var i =0;
	while (localList.items[i]) {
		if (localList.items[i].id == item.id) {
			this.formatContent(item);
			localList.items[i].media = item.media;
			localList.items[i].content = item.content;
			localList.items[i].images = item.images;
			break;
		}
		i++;
	}
};

gm.ngi.news.NewsDAL.prototype.formatContent = function(item){
	if (!item.content){
		item.content = "";
		return;
	}
	
	item.content = removePager(item.content);
	item.content = removeImage(item.content);
	item.content = removeWeiboCard(item.content);
	item.content = removeIFrame(item.content);
	item.content = removeAnchor(item.content);
	item.content = removeImageDivs(item.content);
	item.content = removeEmail(item.content);
	
	// 移除正文底部的分页块
	function removePager(content){
		var pattern = /<span id="_function_code_page">[\s\S]*?<\/span>/gi;
		var replacement = "";
		return content.replace(pattern, replacement);
	}

	// 移除正文内部图片
	function removeImage(content){
		var pattern = /<div class="img_wrapper">[\s\S]*?<\/div>/gi;
		var replacement = "";
		return content.replace(pattern, replacement);
	}
	
	// 移除正文内部微博名片
	function removeWeiboCard(content){
		var pattern = /<a onmouseover="WeiboCard.show.[\s\S]*?<\/a>/gi;
		var replacement = "";
		return content.replace(pattern, replacement);
	}
	
	// 移除正文内部的iframe，如微博投票
	function removeIFrame(content){
		var pattern = /<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi;
		var replacement = "";
		return content.replace(pattern, replacement);
	}
	
	// 移除正文内部的链接，但保留链接文字
	function removeAnchor(content){
		var pattern = /<a[^>]*?>([\s\S]*?)<\/a>/gi;
		var replacement = "$1";
		return content.replace(pattern, replacement);
	}
	
	// 娱乐频道的图片处理
	function removeImageDivs(content){
		var pattern1 = /<div class="img_table_disc">[\s\S]*?<\/div>/gi;
		var pattern2 = /<div class="img_table_wraper">[\s\S]*?<\/div>/gi;
		var replacement = "";
		content = content.replace(pattern1, replacement);
		content = content.replace(pattern2, replacement);
		return content;
	}
	
	// 处理Email
	function removeEmail(content){
		// sample: <a href="mailto:cdbluescafe@gmail.com">cdbluescafe@gmail.com</a>
		var pattern = /<a href="mailto:[\s\S]*?">([\s\S]*?)<\/a>/gi;
		var replacement = "$1";
		return content.replace(pattern, replacement);		
	}
};

gm.ngi.news.newsDAL = new gm.ngi.news.NewsDAL();

$unit.ns("gm.ngi.news.NewsApplication");
/*
 * 微博应用主控类
 */
gm.ngi.news.NewsApplication = function() {

	// 应用的页面地址定义
	this.pages = {
		home : "default.html",
		login : "login.html",
		monitor : "monitor.html"
	};

	this.userOptions = new gm.ngi.news.UserOptions();

	this.templateKeys = {};
	this.listControl = null;
	this.detailControl = null;

	this.tm = {};
	this.currentColumn = 0;
	this.currentDIV = 0;
	this.preverDIV=0;
	this.currentDetailId="";
    this.currentScroll = 0;
	initTemplateManager.call(this);
	//initUserOptions.call(this);



	function initUserOptions() {
		var op = gm.ngi.news.dataStorage.getUserOptions();
		if (op) {
			this.userOptions = $.extend(null, this.userOptions, op);
		}
	}

	function initTemplateManager() {
		this.tm = new gm.ngi.TemplateManager(gm.ngi.news.dataStorage);
		this.templateKeys = $.extend(null, this.templateKeys,
				this.tm.templatePaths);
		this.tm.init(this.templateKeys);
	}
	//c:当前面板 t:即将跳转面板
	this.tooglePanel = function(c,t,callback) {
		//this.currentDIV = this.currentDIV || $("#iconBox");
		if (this.currentDIV.attr("id") != t) {
			//this.currentDIV.hide(600);
			//$("#" + c).show(600);
			//$("#" + t).slideToggle(400);
			this.currentDIV.slideToggle(400,callback||function(){});
			this.currentDIV = $("#" + t);
			this.preverDIV = $("#" + c);
		}
	};
	this.showPanel=function(current){
		this.preverDIV=this.currentDIV;
		if(current=="iconBox"){
			this.currentDIV=$("#iconBox");
			$("#speedDialog").hide();
			$("#newsListBox").hide();
			$("#newsListBox2").hide();
			$("#iconBox").show();
			$("#ttsButton").hide();
			$("#nextButton").hide();
			$("#topBox .goUp").hide();
			$("#topBox .goDown").hide();
			$("#img_refrash").css("visibility","hidden");
			$("#img_sina").attr("src","images/menu_2.png");
		}
		if(current=="newsListBox"){
			this.currentDIV=$("#newsListBox");
			$("#speedDialog").hide();
			$("#iconBox").hide();
			$("#newsListBox").show();
			$("#newsListBox2").hide();
			$("#ttsButton").hide();
			$("#nextButton").hide();
			$("#topBox .goUp").show();
			$("#topBox .goDown").show();
			$("#li_back").hide();
			$("#img_sina").attr("src","images/menu.png");
		}
		if(current=="newsListBox2"){
			this.currentDIV=$("#newsListBox2");
			$("#iconBox").hide();
			$("#speedDialog").hide();
			$("#newsListBox").hide();
			$("#newsListBox2").show();
			$("#nextButton").hide();
			$("#topBox .goUp").show();
			$("#topBox .goDown").show();
			$("#li_back").show();
			$("#ttsButton").show();

			$("#topTitle").show();
			$("#img_sina").show();
			$("#img_sina").attr("src","images/menu.png");
			
			this.currentDIV[0].scrollTop = 0;
		}
		if (current=="speedDialog"){
			this.currentDIV=$("#speedDialog");
			$("#newsListBox").hide();
			$("#newsListBox2").hide();
			$("#iconBox").hide();
			$("#speedDialog").show();
			$("#ttsButton").hide();
			$("#nextButton").hide();
			$("#topBox .goUp").hide();
			$("#topBox .goDown").hide();
//			$("#img_refrash").attr("src","images/4_1.png");
//			$("#li_arrow").attr("class","arrowDown");
//			$("#img_arrow").attr("src","images/11.png");
			$("#img_refrash").hide();
			//$("#li_arrow").hide();
			//$("#img_arrow").hide();
			$("#topTitle").hide();
			$("#img_sina").hide();
		}
	};
};

gm.ngi.news.NewsApplication.prototype.showListPanel = function(callback) {
	
	var item = $("#lnkReturn");
	if(item.hasClass("goBack")){
		item.removeClass("goBack").addClass("logo").html("");
	}
//	$("#lnkRefresh").show();
//	$("#lnkForword").show();
//	$("#lnkPlay").show();
	
	$("#lnkTopLeft").css({visibility: 'visible'});
	var parent = $("#lnkColumnList");
	
	parent.find("img").attr("src","images/7.png");
	//callback&&callback();
	var id =gm.ngi.news.app.currentDIV.attr("id");
	this.tooglePanel(id,"newsListBox",callback);
};

gm.ngi.news.NewsApplication.prototype.showDetailPanel = function(columnId,newsId) {
	$("#lnkReturn").removeClass("logo").addClass("goBack").html("<a href=\"#\" class=\"white\">返回</a>");
//	$("#lnkRefresh").show();
//	$("#lnkForword").show();
//	$("#lnkPlay").show();
	$("#lnkTopLeft").show();
	$("#lnkColumnList").find("a").html(gm.ngi.newssdk.ColumnsName[columnId]);
//	$("#ttsButton").show();
//	$("#nextButton").show();
	$("#topBox goUp").show();
	$("#topBox goDown").show();

};

gm.ngi.news.NewsApplication.prototype.showColumnsPanel = function() {

	var item = $("#lnkReturn");
	if (this.currentDIV.attr("id") == "newsListBox2") {
		if (item.hasClass("goBack")) {
			// 出现新浪
			item.removeClass("goBack").addClass("logo").html("");
		} else {
			item.removeClass("logo").addClass("goBack").html("<a href=\"#\" class=\"white\">返回</a>");
		}
	}
	//else if()
	if($("#lnkTopLeft").css("visibility")=="visible"){
		$("#lnkTopLeft").css({visibility: 'hidden'});
	}
	else{
		$("#lnkTopLeft").css({visibility: 'visible'});
	}
	$("#ttsButton").hide();
	$("#nextButton").hide();
	$("#topBox goUp").hide();
	$("#topBox goDown").hide();
//	$("#lnkRefresh").toggle();//visible
//	$("#lnkForword").toggle();
//	$("#lnkPlay").toggle();
	var s = $("#lnkColumnList").find("img");
	if(s.attr("src")=="images/4.png"){
		s.attr("src","images/7.png");
	}
	else{
		s.attr("src","images/4.png");
	}
	$("#iconBox").slideToggle("fast");
	//parent.find("a").html(gm.ngi.newssdk.ColumnsName[gm.ngi.newssdk.Columns.Top]);
};

gm.ngi.news.NewsApplication.prototype.renderList = function(listData) {
	tracer.begin("renderList", "NewsList");
	if(listData){
		var temp = gm.ngi.news.app.templateKeys.newslistTemplate;
		
		for (var i=0; i< listData.items.length; i++){
			item = listData.items[i];
			item.friendlyDate = gm.ngi.news.utils.toFriendlyDate(item.createTime);
			item.classname = item.content ? "class=readitem" : "";
		}
		
//		listData.datefomart = function() {
//			return gm.ngi.news.utils.toFriendlyDate(new Date(this.createTime));
//		};
	
		this.listControl.html("");
		this.currentColumn = listData.columnId;
		$("#lnkColumnList a").html(gm.ngi.newssdk.ColumnsName[gm.ngi.news.app.currentColumn]);
		$(Mustache.render(temp, listData)).appendTo(this.listControl);
		//debugsave.css({opacity : 0.1}).animate({opacity : 1}, 1000)
		//debugSaveOutput(gm.ngi.news.app.currentColumn, listData, this.listControl);
	}
	tracer.end("renderList", "NewsList");
};

gm.ngi.news.NewsApplication.prototype.renderDetail = function(detailDatal) {
	tracer.begin("renderDetail", "NewsDetail");

	var items = this.detailControl.find("aside");
	$(items[0]).html(detailDatal.title || "");
	var m = detailDatal.media || "";
	
	var friendlyDate = "今天";
	if (detailDatal.createTime){
		friendlyDate = gm.ngi.news.utils.toFriendlyDate(detailDatal.createTime);
	}
//	var d = detailDatal.createTime || "2011-03-02 18:00:00";
	$(items[1]).html(friendlyDate + " "+ m);
	var item =$(items[2]);
	item.html(detailDatal.content||"");
	// 汽车新闻-内部图文过滤
	var blocks = item.find(".tuwen");
	blocks.remove();
	// 汽车新闻-内部图文过滤 结束
	item.scrollTop();
	this.currentDetailId = detailDatal.id;
	//this.tooglePanel(gm.ngi.news.app.currentDIV.attr("id"),"newsListBox2");
	
	tracer.end("renderDetail", "NewsDetail");

};

gm.ngi.news.app = new gm.ngi.news.NewsApplication();

function writeLog(s){
//	console.log("*** Sina News Application Log => ***"); 
//	console.log("*** ==== " + s);
}

function writeWarn(s){
//	console.log("*** Sina News Application Warn => ***"); 
//	console.warn("*** ==== " + s);
}

function writeError(s){
//	console.log("*** Sina News Application Error => ***"); 
//	console.error("*** ==== " + s);
}

function debugSaveOutput(columnid, listdata, listcontrol){
	var id = new Date().valueOf();
	var json = JSON.stringify(listdata);
	var html = listcontrol[0].outerHTML;
	var jsonPath = columnid + "/" + id + ".listdata.txt";
	var htmlPath = columnid + "/" + id + ".listcontrol.txt";
	gm.io.writeFile(jsonPath, json);
	gm.io.writeFile(htmlPath, html);
	jsonPath = columnid + "/" + id + ".listdata.escape.txt";
	htmlPath = columnid + "/" + id + ".listcontrol.escape.txt";
	gm.io.writeFile(jsonPath, escape(json));
	gm.io.writeFile(htmlPath, escape(html));
}