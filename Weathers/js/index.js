function DefaultPage(){
	$.fn.extend({
	    registerButtonFeedBack: function (downBgImage, upBgImage) {
	        this.mousedown(function () {
	            $(this).css("background-image", "url(" + downBgImage + ")");
	        });
	        this.mouseup(function () {
	            $(this).css("background-image", "url(" + upBgImage + ")");
	        });
	    }
	});

	this.currentCity = null;
	
    this.showProgressBox = function (msg, timeout) {
        $("#progressBoxMessage").text(msg);
        $("#progressBox").show();
        $("#msgBoxS").css("left", ($("body").width()-$("#msgBoxS").width())/2);
        
        if (timeout){
    		setTimeout(function(){
    			$("#progressBox").hide();
    		}, timeout);
        }
    };

    this.closeProgressBox = function (timeout) {
        $("#progressBox").hide();
    };

    $("#progressBox").click(function () {
        gm.ngi.weathers.defaultPage.closeProgressBox();
    });
    
    function configCloseButton(){
		var tmpClose = $("<div class=\"closeButton changeopacity\"></div>");
		tmpClose.appendTo($(document.body));
		tmpClose.bind("click", function() {
			gm.system.closeApp();
//			gm.ngi.msgbox.confirm("您确定关闭新浪天气吗？",function(){
//				if (typeof($player) != "undefined"){
//					$player.stop();
//				}
//				gm.appmanager.closeApp();
//				});
		});
    }
    
    // 获取默认城市
    function getDefaultCity(){
        var URA = new gm.ngi.weathers.userRegionAdpater();
        var city = URA.getDefault();
        if (!city){
        	var list = URA.getAll();
        	if (list && list.length > 0){
        		city = list[0];
        	}
        }
        return city;
    }
    
    
    this.startApp = function(){
    	configCloseButton();
		gm.ngi.weathers.app.currentRegionIndex = 1;
		gm.ngi.weathers.app.currentLeft = 1;
		gm.ngi.weathers.app.currentForcastDiv = $("#dvForcast");

    	this.currentCity = getDefaultCity();
    	tracer.info("get current city", "startup");

        if (!this.currentCity) {
        	// 无预置的默认城市，启动地理定位
        	this.LocateCity(function(cityName){
        		// 城市定位成功
            	tracer.info("City located", "startup");
            	gm.ngi.weathers.defaultPage.hideWelcomePage();
            	gm.ngi.weathers.defaultPage.showCityManagePage();
            	gm.ngi.weathers.defaultPage.geosearch_city(cityName);
            	tracer.info("auto found city by geo", "startup");

        	}, function(){
        		// 城市定位失败
            	gm.ngi.weathers.defaultPage.hideWelcomePage();
            	gm.ngi.weathers.defaultPage.showCityManagePage();
            	gm.ngi.weathers.defaultPage.showProvinceListPage();
        	});
        } else {
        	// 找到预置的默认城市，直接进入预报界面
        	gm.ngi.weathers.defaultPage.renderForecast(function(){
                tracer.info("ui rendered", "startup");
            	gm.ngi.weathers.defaultPage.showForecastPage();
            	gm.ngi.weathers.defaultPage.hideWelcomePage();
                tracer.info("ui shown", "startup");
        	});
//            setTimeout(function () {
//            	gm.ngi.weathers.defaultPage.hideWelcomePage();
//            }, 2000);
        }
    };

} 

function init(){
	gm.ngi.weathers.defaultPage = new DefaultPage();
	
	$.extend(gm.ngi.weathers.defaultPage, new WelcomePage());
	$.extend(gm.ngi.weathers.defaultPage, new ForecastPage());
	$.extend(gm.ngi.weathers.defaultPage, new GeoUtils());
	
	tracerSettings = {
		appName: "Weathers",
		beforeUpload: function(){
			gm.ngi.weathers.defaultPage.showProgressBox("upload logs...");
		},
		afterUpload: function(xhr, ts){
			if (ts == "success"){
				gm.ngi.weathers.defaultPage.showProgressBox(xhr.responseText, 30000);
			} else {
				gm.ngi.weathers.defaultPage.showProgressBox("upload failed", 5000);
			}
		}
	};
	$.extend(gm.ngi.weathers.defaultPage, new TracerPage(tracerSettings));
	
	tracer.info("constructed default page", "startup");

	gm.ngi.weathers.defaultPage.startApp();
	
	setTimeout(function(){
		tracer.info("wait a while to lazy load", "startup");
		lazyLoadJs();
	}, 100);
}

function lazyLoadJs(){
	   var scripts = 
		   [
		    "keyboard/js/chn_py_word_lib.js",
		    "keyboard/js/keyboard.js"
		   ];
	   batchLoad(scripts, function(){
			$.extend(gm.ngi.weathers.defaultPage, new CityManagePage());
		   tracer.info("lazy load finished", "startup");
	   });
}

function addClearAndRestartFunc(){
	gm.io.writeFile(function(){}, function(){}, "storage/gm.ngi.weathers.provinces_users.txt", "");
	gm.io.writeFile(function(){}, function(){}, "storage/gm.ngi.weathers.provinces_default.txt", "");
	gm.system.restartApp();
}

$(document).ready(function(){
	tracer.info("document ready", "startup");
	init();
   $("#clearAndRestartApp").click(function(){
	   addClearAndRestartFunc();
   });
});

//gm.ngi.weathers.defaultPage = new DefaultPage();