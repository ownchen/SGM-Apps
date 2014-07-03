
$unit.ns("gm.ngi.weather.UserOptions");
gm.ngi.weather.UserOptions = function() {

	// 用户通知的轮询间隔，默认为30分钟
	this.expiredDuration = 30 * 60 * 1000;

	// 列表页每次下载的条数，默认为10条
	this.pageSize = 20;

	this.maxPages = 100;
};

$unit.ns("gm.ngi.weathers.weathersApplication");
gm.ngi.weathers.weathersApplication = function() {
	
	this.userOption = new gm.ngi.weather.UserOptions();
	this.adpater = new gm.ngi.weathers.weathersAdpater();
	this.userRegionAdpater = new gm.ngi.weathers.userRegionAdpater();
	this.api = this.adpater.sdk;
	this.forcastParentControl = null;
	this.cityParentControl = null;

	this.currentForcastDiv = 0;
	this.currentCityDiv = 0;
	this.currentLeft = "1";
	this.loadIndexCompleted = 0;
	this.currentRegion = this.userRegionAdpater.getDefault(); 
	this.regionId = 0;
	this.currentRegionIndex = 0;
	this.regionList = [];
	if (this.currentRegion) {
		this.regionId = this.currentRegion.regionId;
		var lst = this.userRegionAdpater.getAll();
		this.regionList.push(this.currentRegion);
		if (lst && lst.length > 0) {
			for ( var i = 0; i < lst.length; i++) {
				if (lst[i].regionId !== this.regionId) {
					this.regionList.push(lst[i]);
				}
			}
		}
	}

	this.toogleForcastPanel = function(c, callback) {
		if (this.currentForcastDiv.attr("id") != c.id && c.t) {
			//this.currentForcastDiv.slideUp(400, callback || function() {});
			//$("#" + c).slideDown(400);
			var current = $("#" + c.id);
			if(c.t==2){
//				this.currentForcastDiv.removeClass().addClass("animated fadeOutLeft");
				this.currentForcastDiv.hide();
//				current.removeClass().addClass("animated fadeInRight");
				current.show();
			}
			else{
//				this.currentForcastDiv.removeClass().addClass("animated fadeOutRight");
				this.currentForcastDiv.hide();
//				current.removeClass().addClass("animated fadeInLeft");
				current.show();
			}
			//fadeOutLeft go out.
			//fadeInRight go in.
			this.currentForcastDiv = current;
		}
	};
	this.toogleCityPanel = function(c, callback) {
		if (this.currentCityDiv.attr("id") != c) {
			this.currentCityDiv.slideUp(400, callback || function() {});
			$("#" + c).slideDown(400);
			this.currentCityDiv = $("#" + c);
		}
	};
	this.getZero = function(d){
		return d<10?"0":"";
	};
	this.getDateFriend2 = function(d) {
		var p1 = this.getZero(d.getHours()), p2 = this.getZero(d.getMinutes());
		return p1 + d.getHours() + ":" + p2 + d.getMinutes();
	};
	this.getDateFriend1 = function(d) {
		var p3 = this.getZero(d.getMonth() + 1), p4 = this.getZero(d.getDate());
		return p3 + (d.getMonth() + 1) + "/" + p4 + d.getDate();
	};
	this.getDate = function(index,d){
		if(index==0) return "今天";
		if(index==1) return "明天";
		if(index==2) return "后天";
		d = new Date(d);
		return this.getDateFriend1(d);
	};
	this.preImage=function(url,x,y,callback){  

		var img = new Image();

		img.src = url;  

		

		if (img.complete) { 

			callback.call(img,x,y);  

		return; 

		}  

		img.onload = function () { 

			callback.call(img,x,y);

		}; 
	};
};
gm.ngi.weathers.weathersApplication.prototype.showForcast = function(type) {
	
	this.toogleForcastPanel({id:"dvForcast",t:type});   
};
gm.ngi.weathers.weathersApplication.prototype.renderForcast = function(m) {
	var n = m[0];
	var week = ["周日","周一","周二","周三","周四","周五","周六"];
	var parent = $("#currentWeather");
	var firstDate = new Date(n.date);
	var isNight = firstDate.getHours() == 17; 
	var p = this.getDateFriend2(firstDate);
	var pp = this.getDateFriend1(firstDate);
	var nl = $unit.getChinaDate() || "农历廿十六";
	parent.find(".releaseTime").html(p+"发布"); //发布时间 weatherOfNight
	parent.find(".theWeather").html(isNight?n.weatherOfNight.state:n.weatherOfDay.state); //天气状况，多云，
	parent.find(".theWeather_other").html($unit.format("<span>{0}&nbsp;&nbsp;</span><span>{1}</span>",isNight?n.weatherOfNight.windDirection:n.weatherOfDay.windDirection,isNight?n.weatherOfNight.windPower:n.weatherOfDay.windPower)); //天气说明，<span>湿度55%&nbsp;&nbsp;</span><span>东南风2级</span>
	parent.find(".theWeather_time").html($unit.format("<span>{0}&nbsp;&nbsp;</span><span>{1}&nbsp;&nbsp;</span><span>{2}</span>",pp,week[firstDate.getDay()],nl)); //<span>02/21&nbsp;&nbsp;</span><span>周二&nbsp;&nbsp;</span> <span>农历正月三十</span>
	//parent = $("#currentWeather_right");
	//parent.find(".weather_high").html(); //今天最高
	parent.find(".weather_high_num").html(n.weatherOfDay.temperature+""); //温度
	//parent.find(".weather_low").html(); //今天最高
	parent.find(".weather_low_num").html(n.weatherOfNight.temperature+""); //温度
	parent = $("#pageBox_forecast"); // 背景图
	
	//console.log("是否是晚上："+isNight);
	if (isNight) {
		parent.css("background-image","url("+n.weatherOfNight.stateBackground+")");
		//parent.attr("src", n.weatherOfNight.stateBackground);
	} else {
		parent.css("background-image","url("+n.weatherOfDay.stateBackground+")");
		//parent.attr("src", n.weatherOfDay.stateBackground);
	}
	if($player){
		var contents = ["新浪天气通为您播报最新天气预报，"];
		contents.push(gm.ngi.weathers.app.currentRegion.regionName);
		contents.push("，今天白天，");
		contents.push(n.weatherOfDay.state);
		// n.weatherOfDay.temperature中包含℃，如21℃，车机上好象能将℃播报成摄氏度
		contents.push("，最高温度 "+n.weatherOfDay.temperature.replace("-", "零下 ").replace("℃", " 摄氏度")+"，");
		contents.push(n.weatherOfDay.windDirection+"，");
		contents.push("风力"+n.weatherOfDay.windPower.replace("≤", "").replace("-", "至"));
		contents.push("，今天夜间，");
		contents.push(n.weatherOfNight.state);
		contents.push("，最低温度 "+n.weatherOfNight.temperature.replace("-", "零下 ").replace("℃", " 摄氏度")+"，");
		contents.push(n.weatherOfNight.windDirection+"，");
		contents.push("风力"+n.weatherOfNight.windPower.replace("≤", "").replace("-", "至")); 
		$player.content = contents.join(" ");
	}
	parent = $("#otherDayWeahter ul"); //将来四天天气
	var htm = "",tmp = '<li class="otherWeahter li_otherWeahter" style="background: url({5}) 10px 45px no-repeat;display:{6};"><aside class="">{0}</aside> <aside class="">{1}{3}</aside><aside class="">{2}{4}</aside></li>';
	var ar=[];
	ar.push({d:this.getDate(0,n.date),h:n.weatherOfDay.temperature,l:n.weatherOfNight.temperature,di:n.weatherOfDay.stateIcon,ni:n.weatherOfNight.stateIcon});
	for(var i=1;i<m.length;i++){
        ar.push({d:this.getDate(i,m[i].date),h:m[i].weatherOfDay.temperature,l:m[i].weatherOfNight.temperature,di:m[i].weatherOfDay.stateIcon,ni:m[i].weatherOfNight.stateIcon});
        if(i<=3){
        	htm += $unit.format(tmp, ar[i].d,ar[i].h,ar[i].l,m[i].weatherOfDay.state,m[i].weatherOfNight.state,isNight?m[i].weatherOfNight.stateIcon:m[i].weatherOfDay.stateIcon,"block");
        }
//        else{
//        	htm += $unit.format(tmp, ar[i].d,ar[i].h,ar[i].l,m[i].weatherOfDay.state,m[i].weatherOfNight.state,isNight?m[i].weatherOfNight.stateIcon:m[i].weatherOfDay.stateIcon,"none");
//        }        	
	};
	
	parent.html(htm);
	
};
gm.ngi.weathers.weathersApplication.prototype.showIndices = function(m) {
	//this.toogleForcastPanel("dvIndex");
	this.toogleForcastPanel({id:"dvIndex",t:m});
};
gm.ngi.weathers.weathersApplication.prototype.renderIndices = function(m) {
	var sunInfo = m.sun[0];
	var indeics = m.i[0]?m.i[0].Indices:[];
	var parent = $("#weatherLine li");
	$(parent[0]).html(this.getDateFriend2(new Date(sunInfo.Date))+"发布");
	$(parent[1]).html(sunInfo.Sunrise);
	$(parent[2]).html(sunInfo.Sunset);

	var htm = "暂无", tmp = [
			'<div class="weatherPrompt">',
			'<aside><img src="images/zx-{0}.png" width="60" height="60"></aside>',// <!---替换图标位置--->
			'<aside>{1}<br>{2}</aside>', '</div>' ].join("");
	parent = $("#currentWeatherIndex");
	if (indeics) {
		htm = "";
		for ( var i = 0, j = indeics.length; i < j; i++) {
			htm += $unit.format(tmp, i + 1, indeics[i].Name, indeics[i].Level);
		}
	}
	parent.html(htm);
};
gm.ngi.weathers.weathersApplication.prototype.showCurve = function(m) {
	this.toogleForcastPanel({id:"weatherCurve",t:m});
};

gm.ngi.weathers.weathersApplication.prototype.renderCurve = function(m) {

	var canvas = document.getElementById("canvasBox");
	var context = canvas.getContext("2d");
	context.lineWidth = 5;
	context.shadowColor = "#000000";
	context.shadowBlur = 5;
	context.shadowOffsetX = 5;
	context.shadowOffsetY = 3;
	context.font = "30px Times 微软雅黑";
	context.fillStyle = "#FFFFFF";
	context.clearRect(0, 0, 660, 315);

	// X坐标只能定位于66,198,330,462,594
	// Y坐标：高值---20为最高点，160为最低点（0度）
	// 低值---160为最高点（0度），300为最低点
	// 设置每3XP=1度，最高支持正负46度

	var highTextY = 90;
	var highIconY = -5;
	var lowTextY = 230;
	var lowIconY = 230;

	var perY = 10; // 每度Y柱走位
	var StartX = 66; // 初始X柱坐标
	var StartO = 190; // 每日最高温度初始Y柱
	var EndO = highTextY + 15;
	var mov = 20; // 文字平移量
	var movX = 132; // X柱平移量

	var len = m.length;
	var that = this;

	var temperature_High = new Array();
	var temperature_Low = new Array();
	var maxTemperature = 0, minTemperature = 0;

	for ( var i = 0; i < len; i++) {
		temperature_High.push(Number(m[i].h.replace("℃", "")));
		temperature_Low.push(Number(m[i].l.replace("℃", "")));
		if (i == 0){
			maxTemperature = temperature_High[i];
			minTemperature = temperature_Low[i];
		} else {
			maxTemperature = Math.max(maxTemperature, temperature_High[i]);
			minTemperature = Math.min(minTemperature, temperature_Low[i]);
		}
	}
	var diff = maxTemperature - minTemperature;
	if (diff == 0){
		
	} else {
		perY = (StartO - EndO) / diff;
	}
	
	// 白天
	context.strokeStyle = "#FF7D03";
	$.each(m, function(i) {
		// 文字
		context.fillText(m[i].h, (StartX + i * movX) - mov, highTextY);

		var pixelY = StartO - (temperature_High[i] - minTemperature) * perY;
		
		// 图标
		var highX = StartX + i * movX - 45;
		var highY = pixelY - 108;
		var highImg = m[i].di;
		that.preImage(highImg, highX, highY, function(x, y) {
			context.drawImage(this, x, highIconY);
		});

		// 点
		context.beginPath();
		context.arc(StartX + i * movX, pixelY, 3, 0, 2 * Math.PI, false);
		context.stroke();
		
	});
	
	// 白天 连线
	$.each(m, function(i) {
		var pixelY = StartO - (temperature_High[i] - minTemperature) * perY;
		if (i == 0)
			context.moveTo(StartX + i * movX, pixelY);
		else
			context.lineTo(StartX + i * movX, pixelY);
	});

	// 夜间
	context.stroke();
	context.strokeStyle = "#0084FF";
	
	$.each(m, function(i) {
		// 文字
		context.fillText(m[i].l, (StartX + i * movX) - mov, lowTextY);

		var pixelY = StartO - (temperature_Low[i] - minTemperature) * perY;

		// 图标
		var lowX = StartX + i * movX - 45;
		var lowY = temperature_Low[i] + 45;
		that.preImage(m[i].ni, lowX, lowY, function(x, y) {
			context.drawImage(this, x, lowIconY);
		});

		// 点
		context.beginPath();
		context.arc(StartX + i * movX, pixelY, 3, 0, 2 * Math.PI, false);
		context.stroke();

	});

	// 夜间连线
	$.each(m, function(i) {
		var pixelY = StartO - (temperature_Low[i] - minTemperature) * perY;
		if (i == 0)
			context.moveTo(StartX + i * movX, pixelY);
		else
			context.lineTo(StartX + i * movX, pixelY);

	});

	// 调试用，画x坐标轴	
//	context.moveTo(StartX, StartO);
//	context.lineTo(StartX + movX * 4, StartO);


	// 底部横坐标
	context.stroke();
	context.font = "26px Times 微软雅黑";
	$.each(m, function(i) {
		context.fillText(m[i].d, (StartX + i * movX) - mov, 320);
	});
	context.stroke();
};
gm.ngi.weathers.weathersApplication.prototype.showCityList = function(m) {
	   
};
gm.ngi.weathers.weathersApplication.prototype.renderCityList = function(m) {
   
};
gm.ngi.weathers.weathersApplication.prototype.showCityManage = function(m) {
	   
};
gm.ngi.weathers.weathersApplication.prototype.renderCityManage = function(m) {
   
};
//TODO: 阿灿添加 其它展示Panel的原型方法 。
gm.ngi.weathers.app = new gm.ngi.weathers.weathersApplication();

