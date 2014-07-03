'use strict';

/* Controllers */
angular.module('app.controllers', []).
controller('shiftCtrl', ['app', '$scope', function (app, $scope) {
    app.log("enter shiftCtrl");
    //window.document.body.style.backgroundImage = "url(img/bg.png)";
    $scope.showTiming = null;
    $scope.hideTiming = null;
    $scope.shift_position = app.shiftlevel.None;
    app.shiftAnimateShow = function (shift_level) {
//        app.log("call app.shiftAnimateShow(): " + shift_level);
//        app.log("$scope.shift_position: " + $scope.shift_position);
        //限定响应的范围
        if (!(shift_level == app.shiftlevel.P
        		|| shift_level == app.shiftlevel.R
        		|| shift_level == app.shiftlevel.N
        		|| shift_level == app.shiftlevel.D
        		|| shift_level == app.shiftlevel.M)
        		|| (shift_level == $scope.shift_position)) {
            return;
        }

        if ($scope.shift_position == app.shiftlevel.None) {
            $scope.shift_position = shift_level;
//            $scope.shift_text = "当前档位";
            document.getElementById("shift_text").innerText = "当前档位";
            return;
        } else {
            $scope.shift_position = shift_level;
        }
        
        //先禁止转换静态和动态
        app.chageToStaticEnable = false;
        app.chageToMovingEnable = false;
        
//        app.log("$scope.shift_show is true");
        if ($scope.showTiming) {
            app.timing.cancel($scope.showTiming);
            $scope.showTiming = null;
        }
        $scope.showTiming = app.timing(function () {
            $scope.shift_show = true;

            if ($scope.hideTiming) {
                app.timing.cancel($scope.hideTiming);
                $scope.hideTiming = null;
            }
            $scope.hideTiming = app.timing(function () {
                $scope.shift_show = false;
            }, 1500, 1);

            $scope.hideTiming.then(function () {
                app.timing.cancel($scope.hideTiming);
                $scope.hideTiming = null;
            });
            
            //出现动画后再允许转换静态和动态
            app.chageToStaticEnable = true;
            app.chageToMovingEnable = true;
            
        }, 500, 1);

        $scope.showTiming.then(function () {
            app.timing.cancel($scope.showTiming);
            $scope.showTiming = null;
        });
    };

    $scope.shift_show = false;
}]).
controller('loadingCtrl', ['app', function (app) {
	app.log("enter loadingCtrl");
	app.timing(function () {
		app.log("loading animate end");
		app.chageToStaticEnable = true;
		app.chageToMovingEnable = true;
	}, 6000, 1);
}]).
controller('staticCtrl', ['app', '$scope', function (app, $scope) {
    app.log("enter staticCtrl.");
    app.changBgImg();
    app.chageToStaticEnable = false;
    app.chageToMovingEnable = true;
    app.isKillingApp = false;
    app.initCallBack();
    var engine_speed_range = 0;
    $scope.engine_speed_url = "img/static/Park_engine_speed.png";
    $scope.engine_speed_unit = "RPM";
    $scope.engine_speed_tag = "转速";

    $scope.logDisplay = function () {
        app.logDisplay();
    };

    /*****UNIT TEST CODE FOR CHANGING TO MOVING PAGE
    $scope.changeMode = function () {
    	app.config.mode_opposite = !app.config.mode_opposite;
    };
    *****/

    $scope.loadSetting = function () {
//        app.log("call staticCtrl loadSetting");
//        app.chageToStaticEnable = false;
//        app.chageToMovingEnable = false;
        app.changeMode(app.movement.setting);
    };

    $scope.closeApp = function () {
        app.closeApp();
    };

    $scope.engine_speed_value = "0";
    $scope.odometer_number = app.odometer;
    $scope.vin_value = app.vin;

    $scope.datestr = app.dateString;
    $scope.dayimg = "daytime.png";
    function changeDayImg() {
        if (app.dayTime) {
            $scope.dayimg = "daytime.png";
        } else {
            $scope.dayimg = "night.png";
        }
    }
    changeDayImg();

    app.currentdate_callback = function (dateObj) {
        app.log("static currentdate_callback(): " + app.formatTime(dateObj));
        if (app.dayTime != app.isDayTime(dateObj)) {
            app.dayTime = !app.dayTime;
            changeDayImg();
        }

        var datestr = app.formatDate(dateObj);
        if (app.dateString != datestr) {
            app.dateString = datestr;
            $scope.datestr = app.dateString;
        }
    };

    $scope.alertShow = false;
    $scope.alertImgSrc = null;
    app.alert.clear();
    app.alert.setCallBack(function (showAlert, alertID) {
        app.log("call static alert.callBack()");
        if (showAlert) {
        	if (!app.isNull(alertID) && alertID <= app.alertCfgIDs.speed_limit) {
        		$scope.alertImgSrc = "img/setting/alert_active_" + alertID + ".png";
        	} else {
        		return;
        	}
        }
        
        if ($scope.alertShow != showAlert) {
            $scope.alertShow = showAlert;
        }
    });

    function changEngineSpeedPoint() {
        if (0 == engine_speed_range) {
            $scope.engine_speed_url = "img/static/Park_engine_speed.png";
        } else {
            var id = (engine_speed_range <= 18) ? engine_speed_range - 1 : 17;
            $scope.engine_speed_url = "img/static/Park_engine_speed_" + id + ".png";
        }
    }

    app.engine_speed_callback = function (engine_speed) {
        var quo = (engine_speed / 1000);
        var range = (0 == engine_speed) ? 0 : Math.floor(quo) + 1;
//        $scope.engine_speed_value = quo.toFixed(2);
        $scope.engine_speed_value = Math.round(engine_speed);
        if (range != engine_speed_range) {
            engine_speed_range = range;
            changEngineSpeedPoint();
        }
        app.alert.checkEngineSpeed(engine_speed);
    };

    app.odometer_callback = function (odometer) {
        //        app.log("static odometer_callback(odometer): " + odometer);
    	app.odometer = Math.round(odometer);
        $scope.odometer_number = app.odometer;
    };

    /*app manager*/
    //canvas initialization
    $scope.app_manager_title = "一键优化";
    var canvas = document.getElementById("app_manager_canvas"), ctx = canvas.getContext("2d"), W = canvas.width, H = canvas.height,
    degrees_max = 360 * 0.9, degrees = degrees_max, new_degrees = 0, degrees_add = 5, degrees_set = 0, difference = 0, gradient = new Image(),
    appCount50Pct = 4, color50Pct = "#ff4e00", color80Pct = "#ffa200", color90Pct = "#00e4ff", tubeColor = color90Pct, bgColor = "#222", 
    bg_src_init = "img/static/yh_init.png", bg_src_killing = "img/static/yh_killing.png",
    appCount = 0, killIndex = 0, canvasTiming = null;
    gradient.src = bg_src_init;
    
    function canvasInit () {                
//        app.log("W: " + W + ", H: " + H);
    	//Clear the canvas everytime a chart is drawn
        ctx.clearRect(0, 0, W, H);
        ctx.beginPath();
        ctx.drawImage(gradient, 0, 0, canvas.width, canvas.height);
        ctx.save();

        //Background 360 degree arc
        ctx.beginPath();
        ctx.strokeStyle = bgColor;
        ctx.lineWidth = 10;
        ctx.arc(W / 2, H / 2, 95, 0, Math.PI * 2, false); //you can see the arc now
        ctx.stroke();

        //gauge will be a simple arc
        //Angle in radians = angle in degrees * PI / 180
        var radians = degrees * Math.PI / 180;
        ctx.beginPath();
        ctx.strokeStyle = tubeColor;
        ctx.lineWidth = 10;
        //The arc starts from the rightmost end. If we deduct 90 degrees from the angles
        //the arc will start from the topmost end
//        ctx.arc(W / 2, H / 2, 90, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, true);
        ctx.arc(W / 2, H / 2, 95, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
        //you can see the arc now
        ctx.stroke();

        //Lets add the text
        ctx.fillStyle = tubeColor;
//        ctx.font = "50px bebas";
//        text = Math.floor(degrees / 360 * 100) + "%";
        //Lets center the text
        //deducting half of text width from position x
//        text_width = ctx.measureText(text).width;
        //adding manual value to position y since the height of the text cannot
        //be measured easily. There are hacks but we will keep it manual for now.
//        ctx.fillText(text, W / 2 - text_width / 2, H / 2 + 15);
        ctx.restore();
    }

    //因为图片是异步加载的，所在要在图片完成加载完后再执行画图工作，不然图片会画不出来
    function loadToCanvasInit() {
    	canvasInit();
	    if (gradient.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数  
	    	canvasInit();
	    }
	 
	    gradient.onload = function () { //图片下载完毕时异步调用callback函数。  
	    	canvasInit();//将回调函数的this替换为Image对象  
	    };
    }

    function canvasDraw() {
//    	app.log("degrees: " + degrees + ", new_degrees: " + new_degrees);
        //Cancel any movement animation if a new chart is requested
    	if (!app.isNull(canvasTiming)) {
    		clearInterval(canvasTiming);
    	}

        //random degree from 0 to 360
        //new_degrees = Math.round(Math.random() * 360);
        difference = new_degrees - degrees;
        //This will animate the gauge to new positions
        //The animation will take 1 second
        //time for each frame is 1sec / difference in degrees
//        canvaTiming = setInterval(animate_to, 1000 / difference);
        canvasTiming = app.timing(function () {
        	canvasAnimate();
        }, degrees_add * 500 / difference, 0);
    }

    //function to make the chart move to new degrees
    function canvasAnimate() {
        //clear animation loop if degrees reaches to new_degrees
        if (degrees >= new_degrees) {
            app.timing.cancel(canvasTiming);
            if (new_degrees < degrees_max) {
	            if (new_degrees + degrees_set  <= degrees_max) {
	            	new_degrees += degrees_set;
	            } else {
	            	new_degrees = degrees_max;
	            }
	            
	            if (killIndex < appCount - 1) {
	            	killIndex++;
	            	$scope.killContents = "正在关闭后台程序：" + app.killAppArr[killIndex].name;
			    	if (!app.config.simulator) {
			    		gm.appmanager.killApp(app.killAppArr[killIndex].appID);
			    	}
			    	
			    	if (appCount >= appCount50Pct) {
			    		if (killIndex == Math.floor(appCount / 2)) {
			    			tubeColor = color80Pct;
			    		}
			    	}
	            }
	            canvasInit();
	            canvasDraw();
            } else {
	        	$scope.killContents = "您已经成功优化了" + appCount + "个程序";
	        	app.timing(function () {
	            	gradient.src = bg_src_init;
	            	loadToCanvasInit();
	        		$scope.app_manager_title = "一键优化";
	        		$scope.app_alert_show = false;
	        		app.isKillingApp = false;
	        	}, 2000, 1);
            	tubeColor = color90Pct;
            	canvasInit();
            }
        } else {
//	        degrees++;
	        degrees+=degrees_add;
	        if (degrees > new_degrees) {
	        	degrees = new_degrees;
	        }

            canvasInit();
        }
    }

    $scope.appmanager = function () {
    	if (app.isKillingApp) {
    		return;
    	} else {
    		app.isKillingApp = true;
    	}
    	app.sCheck("一键优化", "静态页面");
    	$scope.app_manager_title = "正在优化";

        app.getAppList();
        appCount = app.killAppArr.length;
        if (appCount == 0) {
        	degrees = degrees_max;
        	tubeColor = color90Pct;
        	canvasInit();
        	$scope.app_alert_show = true;
        	$scope.killContents = "无后台程序优化";
        	app.timing(function () {
        		$scope.app_manager_title = "一键优化";
        		$scope.app_alert_show = false;
        		app.isKillingApp = false;
        	}, 2000, 1);
        } else {
        	if (appCount >= appCount50Pct) {
	        	degrees = 180;
	        	degrees_set = (degrees_max - degrees) / appCount;
	        	tubeColor = color50Pct;
	        } else {
	        	degrees = 360 * 0.8;
	        	degrees_set = (degrees_max - degrees) / appCount;
	        	tubeColor = color80Pct;
	        }
        	degrees_set = Math.round(degrees_set);
        	new_degrees = degrees + degrees_set;
        	killIndex = 0;
			$scope.app_alert_show = true;
	    	$scope.killContents = "正在关闭后台程序：" + app.killAppArr[killIndex].name;
	    	if (!app.config.simulator) {
	    		app.timing(function () {
		    		gm.appmanager.killApp(app.killAppArr[killIndex].appID);
	    		}, 500, 1);
	    	}
	        gradient.src = bg_src_killing;
        	canvasDraw();
        }
    };

    app.applist_callback = function () {
    	if (app.isKillingApp) {
    		return;
    	}
    	
        if (app.killAppArr.length >= appCount50Pct) {
        	degrees = 180;
        	tubeColor = color50Pct;
        } else if (app.killAppArr.length == 0) {
        	degrees = degrees_max;
        	tubeColor = color90Pct;
        } else {
        	degrees = 360 * 0.8;
        	tubeColor = color80Pct;
        }
//        canvasInit();
        loadToCanvasInit();
    };
    app.getAppList();
    app.applist_callback();
    
    $scope.app_alert_show = false;
    
    app.loopGetVehicleData();
    if (!app.config.simulator) {
    	app.watchVehicleData();
    }
}]).
controller('movingCtrl', ['app', '$scope', function (app, $scope) {
    app.log("enter movingCtrl.");
    app.changBgImg();
    app.chageToStaticEnable = true;
    app.chageToMovingEnable = false;
    app.initCallBack();
    var average_speed_range = 0, engine_speed_range = 0;
    var wheel_direction = app.wheeldirection.origin;

    $scope.engine_speed_tag = "转速";
    $scope.engine_speed_unit = "RPM";
    $scope.wheel_direction = 1;
    $scope.average_speed_id = 0;
    $scope.engine_speed_id = 0;

    $scope.logDisplay = function () {
        app.logDisplay();
    };

    $scope.closeApp = function () {
        app.closeApp();
    };

    $scope.datestr = app.dateString;
    $scope.dayimg = "daytime.png";
    function changeDayImg() {
        if (app.dayTime) {
            $scope.dayimg = "daytime.png";
        } else {
            $scope.dayimg = "night.png";
        }
    }
    changeDayImg();

    app.currentdate_callback = function (dateObj) {
        app.log("moving currentdate_callback(): " + app.formatTime(dateObj));
        if (app.dayTime != app.isDayTime(dateObj)) {
            app.dayTime = !app.dayTime;
            changeDayImg();
        }

        var datestr = app.formatDate(dateObj);
        if (app.dateString != datestr) {
            app.dateString = datestr;
            $scope.datestr = app.dateString;
        }
    };

    $scope.alertShow = false;
    $scope.alertImgSrc = null;
    app.alert.clear();
    app.alert.setCallBack(function (showAlert, alertID) {
        app.log("call moving alert.callBack()");
        if (showAlert) {
        	if (!app.isNull(alertID) && alertID <= app.alertCfgIDs.speed_limit) {
        		$scope.alertImgSrc = "img/setting/alert_active_" + alertID + ".png";
        	} else {
        		return;
        	}
        }
        
        if ($scope.alertShow != showAlert) {
            $scope.alertShow = showAlert;
        }
    });

    function changWheelDirection() {
        $scope.wheel_direction = wheel_direction;
    }

    app.wheel_angle_callback = function (wheel_angle) {
        var angleInt = Math.round(wheel_angle), direction, dir_text;
        if (Math.abs(angleInt) <= 10) {
            direction = app.wheeldirection.origin;
        } else if (angleInt > 10) {
            direction = app.wheeldirection.left;
        } else {
            direction = app.wheeldirection.right;
        }

        if (angleInt == 0) {
            dir_text = "回正";
        } else if (angleInt > 0) {
            dir_text = "左转" + angleInt + "°";
        } else {
            dir_text = "右转" + Math.abs(angleInt) + "°";
        }

        $scope.dir_text = dir_text;
        if (direction != wheel_direction) {
            wheel_direction = direction;
            changWheelDirection();
        }
    };

//    var isSpeedLimitSelected = app.alertCfgArr[app.alertCfgIDs.speed_limit].selected,
//    	speedLimitValve = app.alertCfgArr[app.alertCfgIDs.speed_limit].valve;
    var speedCfg = app.alertCfg.getCfgByID(app.alertCfgArr, app.alertCfgIDs.speed_limit),
    	isSpeedLimitSelected = speedCfg.selected,
    	speedLimitValve = speedCfg.valve;
    app.log("isSpeedLimitSelected: " + isSpeedLimitSelected);
    app.log("speedLimitValve: " + speedLimitValve);
    function changeAverageSpeedPoint() {
        var id = (average_speed_range <= 12) ? average_speed_range : 12;
        if (isSpeedLimitSelected) {
            switch (speedLimitValve) {
                case 80:
                    if (id >= app.speedLimitRange.limit_80) {
                        id += 80;
                    }
                    break;
                case 100:
                    if (id >= app.speedLimitRange.limit_100) {
                        id += 100;
                    }
                    break;
                case 120:
                    if (id >= app.speedLimitRange.limit_120) {
                        id += 120;
                    }
                    break;
            }
        }
        $scope.average_speed_id = id;
    }

    app.average_speed_callback = function (average_speed) {
        var quo = (average_speed / 20);
        var range = Math.floor(quo);
        $scope.average_speed_value = average_speed.toFixed(1);
        if (range != average_speed_range) {
            average_speed_range = range;
            changeAverageSpeedPoint();
        }
        app.alert.checkAverageSpeed(average_speed, speedLimitValve);
    };

    function changEngineSpeedPoint() {
        var id = (engine_speed_range <= 17) ? engine_speed_range : 17;
        $scope.engine_speed_id = id;
    }

    app.engine_speed_callback = function (engine_speed) {
        var quo = (engine_speed / 1000);
        var range = Math.floor(quo);
//        $scope.engine_speed_value = quo.toFixed(2);
        $scope.engine_speed_value = Math.round(engine_speed);
        if (range != engine_speed_range) {
            engine_speed_range = range;
            changEngineSpeedPoint();
        }
        app.alert.checkEngineSpeed(engine_speed);
    };

    app.loopGetVehicleData();
    if (!app.config.simulator) {
    	app.watchVehicleData();
    }
}]).
controller('settingCtrl', ['app', '$scope', function (app, $scope) {
    app.log("enter settingCtrl.");
    app.chageToStaticEnable = false;
    if (app.alert.isHaveAlert()) {
        app.chageToMovingEnable = false;
    } else {
        app.chageToMovingEnable = true;
    }
    app.initCallBack();
    app.langCHNObj = JSON.parse(app.fileMgr.readFile(app.config.langCHNPath));
    //增添附加说明
	for (var i = 0; i < app.langCHNObj.length; i++) {
		var id = app.langCHNObj[i].id;
		switch (id) {
		case app.alertCfgIDs.coolant_temp:
			if (!app.isNull(app.engine_coolant_temp)) {
				app.langCHNObj[i].description = app.langCHNObj[i].description 
				+ "(当前温度: " + app.engine_coolant_temp + "℃)";
			}
			break;
		case app.alertCfgIDs.oil_temp:
			if (!app.isNull(app.transmission_oil_temp)) {
				app.langCHNObj[i].description = app.langCHNObj[i].description 
				+ "(当前温度: " + app.transmission_oil_temp + "℃)";
			}
			break;		
		case app.alertCfgIDs.tire_pressure:
			if (!app.isNull(app.tire_pressure_min) && !app.isNull(app.tire_pressure_max)) {
				app.langCHNObj[i].description = app.langCHNObj[i].description 
				+ "(当前最小: " + app.tire_pressure_min + ", 最大: " + app.tire_pressure_max + ")";
			}
			break;
		}
	}

    $scope.logDisplay = function () {
        app.logDisplay();
    };

    $scope.configitems = app.alertCfgArr;
    /*****UNIT TEST CODE FOR ALERT CONFIG
    $scope.configitems = [{ id: 1, description: "转速提醒", selected: false, url: "img/setting/unselected.png" },
	                      { id: 2, description: "冷却液温度提醒", selected: false, url: "img/setting/unselected.png" },
	                      { id: 3, description: "变速箱油温提醒", selected: false, url: "img/setting/unselected.png" },
	                      { id: 4, description: "胎压提醒", selected: true, url: "img/setting/unselected.png" },
	                      { id: 5, description: "超速提醒", selected: false, url: "img/setting/unselected.png" },
	                      { id: 6, description: "监控抬头提示", selected: false, url: "img/setting/unselected.png" }];
    *****/
    $scope.speedLimits = [{ id: 1, value: 80, selected: false, url: "img/setting/unselected.png" },
                       { id: 2, value: 100, selected: false, url: "img/setting/unselected.png" },
                       { id: 3, value: 120, selected: false, url: "img/setting/unselected.png" }];
    $scope.limitShow = false;
    //初始化超速告警设置分选项
    (function () {
        for (var i = 0; i < $scope.configitems.length; i++) {
            if ($scope.configitems[i].name == "speed_limit") {
                $scope.speedLimitIndex = i;
                showSpeedLimit(i);
                var valve = $scope.configitems[i].valve;
                if (!app.isNull(valve)) {
                    for (var j = 0; j < $scope.speedLimits.length; j++) {
                        if ($scope.speedLimits[j].value == valve) {
                            $scope.speedLimits[j].selected = true;
                            $scope.speedLimits[j].url = "img/setting/selected.png";
                            return;
                        }
                    }
                }
            }
        }
    })();

    function showSpeedLimit(itemID) {
        app.log("call showSpeedLimit(), itemID: " + itemID);
        if (itemID == $scope.speedLimitIndex) {
            app.log("change limitShow!");
            $scope.limitShow = $scope.configitems[$scope.speedLimitIndex].selected;
        }
    }

    var selectstatus = {
        unselected: 0,
        select_all: 1,
        selected: 2
    };

    //退回页面
    $scope.back = function () {
        app.log("call settingCtrl back()");
        //保存配置
        app.alertCfgArr = $scope.configitems;
        app.alertCfg.save(app.alertCfgArr);
//        app.alertCfg.save($scope.configitems);
        //        app.changeMode(app.movement.static);
        app.chageToStaticEnable = true;
        app.chageToMovingEnable = true;
    };

    //更改“告警全开”按钮的图片
    function change_allon_btn() {
        switch ($scope.select_all) {
            case selectstatus.unselected:
                $scope.allon_url = "img/setting/unselected.png";
                break;
            case selectstatus.select_all:
                $scope.allon_url = "img/setting/selected.png";
                break;
            case selectstatus.selected:
                $scope.allon_url = "img/setting/select_part.png";
                break;
        }
    };

    //更新“告警全开”选项
    function update_select_all() {
        var select_allon = $scope.select_all,
	    selected_count = 0,
	    unselected_count = 0;
        //遍历所有单独的配置选项
        for (var i = 0; i < $scope.configitems.length; i++) {
            if ($scope.configitems[i].selected) {
                selected_count++;
            } else {
                unselected_count++;
            }
        }

        //获取“是”和“否”选项的总数，以此为依据
        if (unselected_count > 0 && selected_count == 0) {
            select_allon = selectstatus.unselected;
        } else if (selected_count > 0 && unselected_count == 0) {
            select_allon = selectstatus.select_all;
        } else if (selected_count > 0 && unselected_count > 0) {
            select_allon = selectstatus.selected;
        }

        if (select_allon != $scope.select_all) {
            $scope.select_all = select_allon;
            change_allon_btn();
        }
    }

    //初始化
    $scope.select_all = selectstatus.unselected;
    $scope.allon_url = "img/setting/unselected.png";
    update_select_all();

    //单独依次设置每个选项的选中状态
    function set_allitems_selected(isSelected) {
    	for (var i = 0; i < $scope.configitems.length; i++) {
            var item = $scope.configitems[i];
            item.selected = isSelected;
            item.alertred = item.selected && item.isActive;
            showSpeedLimit(i);
        }
    }

    //对“告警全开”按钮的响应
    $scope.check_select_all = function () {
    	app.sCheck("告警全开按钮响应", "告警设置页面");
        if ($scope.select_all == selectstatus.unselected
				|| $scope.select_all == selectstatus.selected) {
            set_allitems_selected(true);
            $scope.select_all = selectstatus.select_all;
        } else {
            set_allitems_selected(false);
            $scope.select_all = selectstatus.unselected;
        }
        change_allon_btn();
    };

    //对每个配置按钮的响应
    $scope.check_selected = function (id, isSelected) {
    	app.sCheck("单个告警按钮响应", "告警设置页面");
        for (var i = 0; i < $scope.configitems.length; i++) {
            var item = $scope.configitems[i];
            if (item.id == id) {
                item.selected = !isSelected;
                item.alertred = item.selected && item.isActive;
                showSpeedLimit(i);
                break;
            }
        }
        update_select_all();
    };

    //对超速选项按钮的响应
    $scope.checkSpeedLimit = function (id, isSelected) {
        if (!isSelected) {
            for (var i = 0; i < $scope.speedLimits.length; i++) {
                var limit = $scope.speedLimits[i];
                if (limit.id == id) {
                    //更改选中
                    limit.selected = true;
                    limit.url = "img/setting/selected.png";
                    $scope.configitems[$scope.speedLimitIndex].valve = limit.value;
                } else {
                    if (limit.selected) {
                        limit.selected = false;
                        limit.url = "img/setting/unselected.png";
                    }
                }
            }
        }
    };
}]);
