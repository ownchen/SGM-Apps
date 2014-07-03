function ForecastPage(){
	

	function registerEventHandlers(){
//		gm.ngi.weathers.app.api.apiConnectionError = function () {
//			gm.ngi.weathers.defaultPage.showProgressBox("哎呀，你的网络好像有点问题，请重试！", 1000);
//		};
//		gm.ngi.weathers.app.api.apiServerError = function (d) {
//			gm.ngi.weathers.defaultPage.showProgressBox("获取天气失败。错误码：" + d.data.error_code, 1000);
//		};

		$("#btn_showMyCity").registerButtonFeedBack("images/5_1.png", "images/5.png");
		$("#btn_refreshForecast").registerButtonFeedBack("images/3_1.png", "images/3.png");
		
		$("#btnPlayTTS").click(function () {
			buttonFeedback(this);
			$player.btnPlayClicked();
		});
		
		$("#btn_showMyCity").click(function(){
			gm.ngi.weathers.defaultPage.showCityManagePage();
			gm.ngi.weathers.defaultPage.showMyCityPage();
		});
		
		$("#btn_refreshForecast").click(function(){
			gm.ngi.weathers.defaultPage.loadForecastData();
		});
		
		$(".arrowRight").click(function () {
			if (gm.ngi.weathers.app.currentRegionIndex < 4) {
				gm.ngi.weathers.app.currentRegionIndex++;
				$(".img_left").attr("src",
								gm.ngi.weathers.app.currentRegionIndex <= 1 ? "images/1_1.png" : "images/1.png");
				$(".img_right").attr("src",
								gm.ngi.weathers.app.currentRegionIndex >= 3 ? "images/2_1.png" : "images/2.png");
				gm.ngi.weathers.app.currentRegionIndex = gm.ngi.weathers.app.currentRegionIndex == 4 ? 3 : gm.ngi.weathers.app.currentRegionIndex;
				ShowPLLiStatus(gm.ngi.weathers.app.currentRegionIndex);
				leftInit(gm.ngi.weathers.app.currentRegionIndex, 2);
			}
		});
		$(".arrowLeft").click(function () {
			if (gm.ngi.weathers.app.currentRegionIndex > 1) {
				gm.ngi.weathers.app.currentRegionIndex--;
				$(".img_left").attr("src",
								gm.ngi.weathers.app.currentRegionIndex <= 1 ? "images/1_1.png" : "images/1.png");
				$(".img_right").attr("src",
								gm.ngi.weathers.app.currentRegionIndex >= 3 ? "images/2_1.png" : "images/2.png");
				gm.ngi.weathers.app.currentRegionIndex = gm.ngi.weathers.app.currentRegionIndex == 0 ? 1 : gm.ngi.weathers.app.currentRegionIndex;
				ShowPLLiStatus(gm.ngi.weathers.app.currentRegionIndex);
				leftInit(gm.ngi.weathers.app.currentRegionIndex, 1);
			}
		});
		$(".pl_li_2_1").click(function () {
			$(".pl_li_2_1").attr("class", "pl_li_2_1");
			var li = $(this);
			li.attr("class", "pl_li_2_1 Choose");
			var blocks = [];
			var nones = [];
			var items = $(".li_otherWeahter");
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if (item.style && item.style["display"]) {
					if (item.style["display"] == "none")
						nones.push(item);
					else
						blocks.push(item);
				}
			}
			for (var p in nones) {
				var item = nones[p];
				item.style["display"] = "block";
			}
			for (var p in blocks) {
				var item = blocks[p];
				item.style["display"] = "none";
			}
		});
		
	}
	
	function commonApiErrorHandler(){
		gm.ngi.weathers.defaultPage.showProgressBox("网络故障，请稍候重试。", 3000);
	}
	
	function loadAndRenderForecast(regionId, callback){
		tracer.info("==== 分割线 ====", "render");

		var daForecast = new gm.ngi.weathers.weathersAdpater();
		daForecast.sdk.apiConnectionError = function(){
			// 应用启动时，如遇网络失败，则强制关闭欢迎页
			if ($("#pageBox_Welcome").css("display") != "none"){
            	gm.ngi.weathers.defaultPage.showForecastPage();
            	gm.ngi.weathers.defaultPage.hideWelcomePage();
			}
			commonApiErrorHandler();
		};
		daForecast.sdk.apiServerError = commonApiErrorHandler;
		
		tracer.begin("download forecast data", "render");
		daForecast.refreshForcast(regionId, function (data) {
			tracer.end("download forecast data", "render");

			if (!data || data.length == 0){
				commonApiErrorHandler();
				return;
			}
			
			tracer.begin("render forecast div", "render");
			// 渲染第一屏
			gm.ngi.weathers.app.renderForcast(data);
	    	tracer.end("render forecast div", "render");

	    	setTimeout(function(){
	    		tracer.info("wait a while", "render");
	    		loadAndRenderIndicies(regionId);
	    		renderCurve(data);
	    	}, 1000);
	    	if (callback){
	    		callback();
	    	}
		});

	}
	
	function renderCurve(data){
		// 格式化天气数据
		var ar = [];
		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			ar.push({
				d: gm.ngi.weathers.app.getDate(i, item.date),
				h: item.weatherOfDay.temperature,
				l: item.weatherOfNight.temperature,
				di: item.weatherOfDay.stateIcon,
				ni: item.weatherOfNight.stateIcon
			});
		};

    	tracer.begin("render curve", "render");
		gm.ngi.weathers.app.renderCurve(ar);
    	tracer.end("render curve", "render");

	}
	
	function loadAndRenderIndicies(regionId){
		var daIndices = new gm.ngi.weathers.weathersAdpater();
		daIndices.sdk.apiConnectionError = commonApiErrorHandler;
		daIndices.sdk.apiServerError = commonApiErrorHandler;
		
		tracer.begin("download indicies", "render");
		daIndices.refreshIndices(regionId, function (indicies) {
			tracer.end("download indicies", "render");
			if (!indicies || indicies.length == 0){
				commonApiErrorHandler();
				return;
			}
			tracer.begin("download suninfo", "render");
			daIndices.refreshSunInfo(regionId, function (suninfo) {
				tracer.end("download suninfo", "render");
				if (!suninfo || suninfo.length == 0){
					commonApiErrorHandler();
					return;
				}
		    	tracer.begin("render indicies div", "render");
				gm.ngi.weathers.app.renderIndices({ i: indicies, sun: suninfo });
				gm.ngi.weathers.app.loadIndexCompleted = 1;
		    	tracer.end("render indicies div", "render");
			});
		});

	}
	
	this.loadForecastData = function(callback){
		var regionId = gm.ngi.weathers.defaultPage.currentCity.regionId;
		loadAndRenderForecast(regionId, callback);		
	};
	
	// 原始的渲染代码
	this.loadForecastData_origin = function(){
		var regionId = gm.ngi.weathers.defaultPage.currentCity.regionId;
		var jobResult = {
				forecast: null,
				indices: null,
				suninfo: null,
				jobDone: 0
		};
		
		function onJobDone(){
			jobResult.jobDone ++;
			if (jobResult.jobDone < 3)
				return;
			
			if (!jobResult.forecast || !jobResult.indices || !jobResult.suninfo){
				gm.ngi.weathers.defaultPage.showProgressBox("网络故障，请稍候重试。", 1000);
				return;
			}

			tracer.end("retrieve forecast data", "render");

			var ar = [];
			for (var i = 0; i < jobResult.forecast.length; i++) {
				var m = jobResult.forecast;
				ar.push({
					d: gm.ngi.weathers.app.getDate(i, m[i].date),
					h: m[i].weatherOfDay.temperature,
					l: m[i].weatherOfNight.temperature,
					di: m[i].weatherOfDay.stateIcon,
					ni: m[i].weatherOfNight.stateIcon
				});
			};
	    	
			tracer.begin("render forecast div", "render");
			gm.ngi.weathers.app.renderForcast(jobResult.forecast);
	    	tracer.end("render forecast div", "render");
	    	
			gm.ngi.weathers.defaultPage.showProgressBox("渲染曲线");
			
	    	tracer.begin("render curve", "render");
			gm.ngi.weathers.app.renderCurve(ar);
	    	tracer.end("render curve", "render");

	    	tracer.begin("render indicies", "render");
			gm.ngi.weathers.app.renderIndices({ i: jobResult.indices, sun: jobResult.suninfo });
	    	tracer.end("render indicies", "render");
	    	
			gm.ngi.weathers.app.showIndices();

			gm.ngi.weathers.app.loadIndexCompleted = 1;
			gm.ngi.weathers.defaultPage.closeProgressBox();
			
			tracer.info("==== 分割线 ====", "render");

		}
				
		gm.ngi.weathers.defaultPage.showProgressBox("加载中...");
		gm.ngi.weathers.app.loadIndexCompleted = 0;
    	tracer.begin("retrieve forecast data", "render");
		
		var daIndices = new gm.ngi.weathers.weathersAdpater();
		daIndices.sdk.apiConnectionError = onJobDone;
		daIndices.sdk.apiServerError = onJobDone;
		daIndices.refreshIndices(regionId, function (di) {
			if (di && di.length > 0){
				jobResult.indices = di;
			}
			onJobDone();
		});
		
		var daSunInfo = new gm.ngi.weathers.weathersAdpater();
		daSunInfo.sdk.apiConnectionError = onJobDone;
		daSunInfo.sdk.apiServerError = onJobDone;
		daSunInfo.refreshSunInfo(regionId, function (ds) {
			if (ds && ds.length > 0) {
				jobResult.suninfo = ds;
			}
			onJobDone();
		});
		
		var daForecast = new gm.ngi.weathers.weathersAdpater();
		daForecast.sdk.apiConnectionError = onJobDone;
		daForecast.sdk.apiServerError = onJobDone;
		daForecast.refreshForcast(regionId, function (d) {
			if (d && d.length > 0) {
				jobResult.forecast = d;
			} 
			onJobDone();
		});

	};
	
	function setCityName() {
		var cityName = $("#currentWeather_left").find(".theWeatherCity");
		cityName.html(gm.ngi.weathers.app.currentRegion.regionName);
	};

	function leftInit(p, t) {
		if (p != gm.ngi.weathers.app.currentLeft) {
			if (p == 1) {
				gm.ngi.weathers.app.showForcast(t);
			} else if (p == 2) {
				gm.ngi.weathers.app.showCurve(t);

			} else if (p == 3) {
				if (gm.ngi.weathers.app.loadIndexCompleted == 0) {
					initIndies(gm.ngi.weathers.app.regionId, 0);
				}

				gm.ngi.weathers.app.showIndices(t);
			}
			gm.ngi.weathers.app.currentLeft = p;
		}
	};
	
	function initIndies(rid, callback, c) {
		rid = rid || gm.ngi.weathers.app.regionId;
		if (c !== 2) {
			gm.ngi.weathers.defaultPage.showProgressBox("加载中...");
		}
		gm.ngi.weathers.app.adpater.getIndices(rid, function (di) {
			if (di) {
				gm.ngi.weathers.app.adpater.getSunInfo(rid, function (ds) {
					if (ds) {
						gm.ngi.weathers.app.renderIndices({
							i: di,
							sun: ds
						});
						gm.ngi.weathers.app.loadIndexCompleted = 1;
						if (c !== 2) {
							gm.ngi.weathers.defaultPage.closeProgressBox();
						}
						if (callback) {
							callback();

						}
					}
				});
			}
		});
	};

	function ShowPLLiStatus(index) {
		$("#pl_ul").children(".Choose").attr("class", "");
		$("#pl_li_" + index).attr("class", "Choose");
	}
	
	this.showForecastPage = function(){
		$("#pageBox_forecast").show();
		$("#pageBox_cityManageContainer").hide();
	};

	this.renderForecast = function(callback){
		setCityName();
		gm.ngi.weathers.defaultPage.loadForecastData(callback);
	};
	
	this.showFirstRegion = function(){
		leftInit(1,1);
		gm.ngi.weathers.app.currentRegionIndex = 1;
		gm.ngi.weathers.app.currentLeft = 1;
	};
	
	registerEventHandlers();

} 