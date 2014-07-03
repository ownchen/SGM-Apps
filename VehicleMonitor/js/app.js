'use strict';

// Declare app level module which depends on filters, and services
angular.module('app', [ 'app.filters', 'app.tools', 'app.services', 'app.directives', 'app.controllers' ]).constant('app', {
	version:"0.1.0",

	// 配置
	config:{
		simulator:true,
		debug:false,
		modeOpposite:false,
		logDisplay:true,
		appID:14746626,

		appCfgPath:"cfg/appcfg.txt",
		alertCfgPath:"cfg/alertcfg.txt",
		fileMgrPath:"cfg/fileMgr.txt",
		langCHNPath:"cfg/CHN.txt",
		vehicleFile:"getVehicleData",
		storageMaxSize:4000000, // 文件所占存储最大值
		// storageMaxSize: 500000, //文件所占存储最大值
		fileMaxSize:60000, // 单位字节，压缩前的大小，按照压缩比为8:1
		/*
		 * getDataIntervel: 10000, //采集车辆数据周期，单位为毫秒 uploadIntervel: 5,
		 * //上传数据到服务器的周期，单位为分钟
		 */
		enigeRcvIntervel:5, // 接收watch的引擎转速次数限制
		speedRcvIntervel:3, // 接收watch的瞬时速度次数限制
		getAppListIntervel:10, // 监控后台程序运行的次数
		getCfgUrl:"http://114.141.129.193/conf.json" },

	// 枚举
	alertCfgIDs:{ // 警告的ID
		engine_speed:0,
		coolant_temp:1,
		oil_temp:2,
		tire_pressure:3,
		speed_limit:4 },
	alertValve:{ // 警告的阀值
		engine_speed:3000,
		temperature:100,
		tire_pressure_min:190,
		tire_pressure_max:260 },
	speedLimitRange:{ // 瞬时速度的限制范围
		limit_80:4,
		limit_100:5,
		limit_120:6 },
	movement:{ // 静止、运动状态定义和初始化
		origin: -1,
		loading:0,
		static:1,
		moving:2,
		setting:3,
		error:999 },
	shiftlevel:{ // 档位变换
		None:0,
		P:1,
		R:2,
		N:3,
		D:4,
		M:5 },
	wheeldirection:{ // 方向盘的转向
		origin:1,
		left:2,
		right:3 },
	carThemeType:{ // 车载系统的类型
		none:0,
		cadillac:1, // 凯迪拉克
		buick:2, // 别克
		simulator:3, // 模拟器
		other:99 } }).config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/loading', {
		templateUrl:'partials/loading.html',
		controller:'loadingCtrl' });
	$routeProvider.when('/static', {
		templateUrl:'partials/static.html',
		controller:'staticCtrl' });
	$routeProvider.when('/moving', {
		templateUrl:'partials/moving.html',
		controller:'movingCtrl' });
	$routeProvider.when('/setting', {
		templateUrl:'partials/setting.html',
		controller:'settingCtrl' });
	$routeProvider.otherwise({
		redirectTo:'/error' });
} ]).run([ 'app', '$location', '$http', 'tools', 'timing', 'appCfg', 'alertCfg', 'alert', 'fileMgr', 'post', function(app, $location, $http, tools, timing, appCfg, alertCfg, alert, fileMgr, post) {
	window.app = app; // 全局变量
	angular.extend(app, tools); // 扩展工具

	// 服务
	app.timing = timing;
	app.appCfg = appCfg;
	app.alertCfg = alertCfg;
	app.alert = alert;
	app.fileMgr = fileMgr;
	app.post = post;

	// 状态位和初始化
	app.mode = app.movement.origin; // 控制当前车的行驶状态
	app.chageToStaticEnable = true; // 设置是否可以从设置页面转到静态页面
	app.chageToMovingEnable = true; // 设置是否可以从设置页面转到行驶页面
	app.shiftAnimateShow = null; // 控制换挡图片的显示
	app.carTheme = app.carThemeType.none; // 车型
	app.isLogDisplaying = false; // 控制是否在真实车载页面中部显示日志
	app.watchVDID = null; // 调用watchVehicleData获得的ID
	app.appCfgObj = app.appCfg(); // 获取程序的 设置
	app.dayTime = true; // 当前时间是否是白天
	app.dateString = "初始化中"; // 当前日期
	app.odometer = 0; // 行驶的里程数
	app.killAppArr = null; // 需要被杀掉的程序数组
	app.isKillingApp = false; // 是否正在杀程序

	app.engine_coolant_temp = null; // 冷却液油温
	app.transmission_oil_temp = null; // 变速箱油温
	app.tire_pressure_min = null; // 最小的胎压
	app.tire_pressure_max = null; // 最大的胎压

	// 局部变量
	// 写文件和上传文件相关
	// var fileWriting = app.fileMgr(app.config.fileMgrPath, app.lzw_encode),
	var fileWriting = app.fileMgr(app.config.fileMgrPath, null), filePosting = null, isPosting = false,
	// watch参数更新相关
	enigeRcvCount = 0, // 转速更新次数
	speedRcvCount = 0, // 瞬时速度更新次数
	getAppListCount = 0, // 监控后台运行程序的次数
	isBgImgChanged = false, // 背景图片是否已经被更换
	postDelay = Math.floor(Math.random() * app.appCfgObj.user.upload_frequency);
	app.log("postDelay: " + postDelay);

	// 初始化函数响应
	app.initCallBack = function() {
		app.currentdate_callback = null;
		app.engine_speed_callback = null;
		app.wheel_angle_callback = null;
		app.shift_lever_position_callback = null;
		app.average_speed_callback = null;
		app.odometer_callback = null;
		app.applist_callback = null;

		// 只在别克车的车载系统中油温，冷却液温度和胎压才有效
		if (app.carTheme == app.carThemeType.buick) {
			app.engine_coolant_temp_callback = app.alert.checkEngineCoolantTemp;
			app.transmission_oil_temp_callback = app.alert.checkTransmissionOilTemp;
			app.tire_pressure_callback = app.alert.checkTirepPressure;
		}

		enigeRcvCount = 0;
		speedRcvCount = 0;

	};

	app.changBgImg = function() {
		if ( !isBgImgChanged) {
			window.document.body.style.backgroundImage = "url(img/bg.png)";
			document.getElementById("shift_changed").style.backgroundImage = "url(img/bg.png)";
			isBgImgChanged = true;
		}
	};

	// 更改车的静止、运动状态
	app.changeMode = function(movestatus) {
		// app.log("Change app.mode to: " + movestatus);

		// 停止轮询和监控数据
		if (app.dataTiming) {
			app.timing.cancel(app.dataTiming);
			app.dataTiming = null;
		}
		if (app.watchVDID) {
			gm.info.clearVehicleData(app.watchVDID);
			app.watchVDID = null;
		}

		var path = null;
		switch (movestatus) {
			case app.movement.loading:
				path = "#/loading";
			break;
			case app.movement.static:
				if (app.chageToStaticEnable) {
					path = "#/static";
				}
			break;
			case app.movement.moving:
				if (app.chageToMovingEnable) {
					path = "#/moving";
				}
			break;
			case app.movement.setting:
				path = "#/setting";
			break;
			case app.movement.error:
				path = "#/error";
			break;
			default:
		}

		if (path) {
			app.mode = movestatus;
			window.location = path;
		}
	};

	// 在真实车载系统中的日志辅助显示
	app.logDisplay = function() {
		return;
		if (app.config.logDisplay) {
			if (app.isLogDisplaying) {
				var logDiv = document.getElementById("logdiv");
				if (logDiv) {
					document.body.removeChild(logDiv);
				}
			}
			else {
				var logDiv = document.createElement("div");
				logDiv.id = "logdiv";
				logDiv.style.width = "600px";
				logDiv.style.height = "350px";
				logDiv.style.left = "100px";
				logDiv.style.top = "110px";
				logDiv.style.backgroundColor = "lightgrey";
				logDiv.style.color = "blue";
				logDiv.style.position = "absolute";
				document.body.appendChild(logDiv);
			}
			app.isLogDisplaying = !app.isLogDisplaying;
		}
	};

	// 读写文件、上传数据相关
	function appendVehicleFile(json, timeSeg, orderID) {
		var fileName = null, newFile = null;
		if (app.isNull(orderID)) {
			fileName = timeSeg + "_" + app.config.vehicleFile + ".txt";
			newFile = app.fileMgr.getFile(timeSeg, fileName, 0, false, 0);
		}
		else {
			fileName = timeSeg + "_" + app.config.vehicleFile + "_" + orderID + ".txt";
			newFile = app.fileMgr.getFile(timeSeg, fileName, 0, false, orderID);
		}
		app.fileMgr.appendFile(app.config.fileMgrPath, newFile, fileWriting);
		app.fileMgr.overwriteFile(newFile, "[" + JSON.stringify(json));

		// 更新变量
		fileWriting.timeSeg = newFile.timeSeg;
		fileWriting.fileName = newFile.fileName;
		fileWriting.fileSize = newFile.fileSize;
		fileWriting.isPosted = newFile.isPosted;
		fileWriting.orderID = newFile.orderID;
	}

	function writeVehicleFile(date, json, orderID) {
		var timeSeg = app.getUploadTimeSeg(date);
		if (timeSeg != fileWriting.timeSeg) {
			// 时间段更换
			app.log("fileWriting.fileSize is: " + fileWriting.fileSize);
			appendVehicleFile(json, timeSeg);
			// 为了防止集中在某个时间段上传文件导致服务器压力太大，这里发送数据的时间做随机分配
			app.timing(function() {
				postFile();
			}, postDelay, 1);
		}
		else {
			// Todo: 限制单个文件的大小
			if (fileWriting.fileSize >= app.config.fileMaxSize) {
				appendVehicleFile(json, fileWriting.timeSeg, fileWriting.orderID + 1);
			}
			else {
				app.fileMgr.writeFileByAppend(fileWriting, "," + JSON.stringify(json));
			}
		}
	}

	function postFile() {
		app.log("call postFile()");
		if (app.appCfgObj.user.enable_upload == 0 || isPosting) {
			return;
		}

		// 获取网络连接能力
		var connect = false;
		app.post.getNetworkConnectivity(function(status) {
			connect = status;
		});
		if (connect) {
			app.log("getNetworkConnectivity success!");
		}
		else {
			app.log("getNetworkConnectivity failed!");
			return;
		}

		while (true) {
			filePosting = app.fileMgr.getFirstFile(app.config.fileMgrPath, false);
			if ( !app.isNull(filePosting) && filePosting.timeSeg != fileWriting.timeSeg) {
				app.log("filePosting.fileName: " + filePosting.fileName);
				var result = fileMgr.readFile(filePosting.fileName);
				if (result) {
					isPosting = true;
					app.post.sendContents(filePosting.fileName, result);
					break;
				}
				else {
					app.fileMgr.deleteFile(app.config.fileMgrPath, filePosting);
				}
			}
			else {
				app.log("no file need to post!");
				break;
			}
		}
	}

	// 监测胎压
	function checkTirePressure(tirePressure) {
		if (app.isNull(tirePressure)) {
			return;
		}

		if (app.isNull(app.tire_pressure_min)) {
			app.tire_pressure_min = tirePressure;
		}
		else if (tirePressure < app.tire_pressure_min) {
			app.tire_pressure_min = tirePressure;
		}

		if (app.isNull(app.tire_pressure_max)) {
			app.tire_pressure_max = tirePressure;
		}
		else if (tirePressure > app.tire_pressure_max) {
			app.tire_pressure_max = tirePressure;
		}
	}

	app.getAppList = function() {
		var applist = null;
		if (app.config.simulator) {
			applist = [ {
				"name":"app1",
				"appID":"11111111",
				"running":true }, {
				"name":"app2",
				"appID":"22222222",
				"running":true }, {
				"name":"app3",
				"appID":"33333333",
				"running":true }, {
				"name":"app4",
				"appID":"44444444",
				"running":false }, {
				"name":"app5",
				"appID":"55555555",
				"running":true }, {
				"name":"app6",
				"appID":"66666666",
				"running":false }, {
				"name":"app7",
				"appID":"77777777",
				"running":true }, {
				"name":"app8",
				"appID":"88888888",
				"running":true }, {
				"name":"app9",
				"appID":"99999999",
				"running":true } ];
			// var applist = [{ "name": "app1", "appID": "11111111", "running":
			// false }];
		}
		else {
			applist = gm.appmanager.getAppsList();
		}

		app.killAppArr = new Array();
		if ( !app.isNull(applist) && applist instanceof Array) {
			for (var i = 0; i < applist.length; i++) {
				var running = applist[i].running, appID = applist[i].appID;
				if (running && appID > 9999999 && 99999999 >= appID && appID != app.config.appID) {
					app.killAppArr.push(applist[i]);
				}
			}
		}
	};

	function getAppList() {
		if (app.isNull(app.applist_callback) || app.isKillingApp) {
			return;
		}

		app.getAppList();
		app.applist_callback();
	}

	// 对getVehicleData数据的响应
	function getVehicleData() {
		// app.log("call app getVehicleData()");
		// gm.vehicle.getVehicleData(function (json)
		gm.info.getVehicleData(function(json) {
			// 判断获取数据是否有效
			if (json.year <= 1970) {
				return;
			}

			if ( !app.isNull(app.currentdate_callback)) {
				var date = app.getVehicleDate(json);
				writeVehicleFile(date, json);
				app.currentdate_callback(date);
			}

			if ( !app.isNull(json.engine_speed) && !app.isNull(app.engine_speed_callback)) {
				app.engine_speed_callback(json.engine_speed);
				/***************************************************************
				 * ***UNIT TEST CODE FOR ENGIN SPEED //
				 * app.engine_speed_callback(Math.random() * 18000);
				 * app.engine_speed_callback(5999);
				 **************************************************************/
			}

			if ( !app.isNull(json.wheel_angle) && !app.isNull(app.wheel_angle_callback)) {
				app.wheel_angle_callback(json.wheel_angle);
				/***************************************************************
				 * ***UNIT TEST CODE FOR WHEEL ANGLE app.wheel_angle_callback(90 -
				 * Math.random() * 180);
				 **************************************************************/
			}

			if ( !app.isNull(json.average_speed) && !app.isNull(app.average_speed_callback)) {
				app.average_speed_callback(json.average_speed);
				/***************************************************************
				 * ***UNIT TEST CODE FOR AVERAGE SPEED //
				 * app.average_speed_callback(Math.random() * 130);
				 * app.average_speed_callback(110);
				 **************************************************************/
			}

			if ( !app.isNull(json.odometer) && !app.isNull(app.odometer_callback)) {
				app.odometer_callback(json.odometer);
			}

			if (app.carTheme == app.carThemeType.buick) {
				if ( !app.isNull(json.engine_coolant_temp) && !app.isNull(app.engine_coolant_temp_callback)) {
					app.engine_coolant_temp_callback(json.engine_coolant_temp);
				}

				if ( !app.isNull(json.transmission_oil_temp) && !app.isNull(app.transmission_oil_temp_callback)) {
					app.transmission_oil_temp_callback(json.transmission_oil_temp);
				}

				app.tire_pressure_min = null;
				app.tire_pressure_max = null;
				checkTirePressure(json.tire_left_front_pressure);
				checkTirePressure(json.tire_left_rear_pressure);
				checkTirePressure(json.tire_right_front_pressure);
				checkTirePressure(json.tire_right_rear_pressure);

				if ( !app.isNull(app.tire_pressure_callback)) {
					app.tire_pressure_callback(app.tire_pressure_min, app.tire_pressure_max);
				}
			}

			/*******************************************************************
			 * ***UNIT TEST CODE FOR SHIFT app.shiftAnimateShow(Math.floor(4 *
			 * Math.random() + 1)); // app.shiftAnimateShow(1);
			 ******************************************************************/
		}, function() {
		});
	}

	// loop getVehicleData
	app.loopGetVehicleData = function() {
		if (app.appCfgObj.user.enable_collect == 0) {
			return;
		}

		getVehicleData();

		app.dataTiming = app.timing(function() {
			getVehicleData();
		}, app.appCfgObj.user.collect_frequency, 0);

		app.dataTiming.then(function() {
		});
	};

	// watchVehicleData，对watchVehicleData数据的响应
	app.watchVehicleData = function() {
		if (app.appCfgObj.user.enable_upload == 0) {
			return;
		}

		app.watchVDID = gm.info.watchVehicleData(function(json) {
			if ( !app.isNull(json.shift_lever_position) && !app.isNull(app.shiftAnimateShow)) {
				app.shiftAnimateShow(json.shift_lever_position);
			}

			if ( !app.isNull(json.engine_speed) && !app.isNull(app.engine_speed_callback)) {
				if (enigeRcvCount == app.config.enigeRcvIntervel) {
					app.engine_speed_callback(json.engine_speed);
					enigeRcvCount = 0;
				}
				else {
					if (json.engine_speed == 0) {
						app.engine_speed_callback(json.engine_speed);
					}
					enigeRcvCount++;
				}
			}

			if ( !app.isNull(json.wheel_angle) && !app.isNull(app.wheel_angle_callback)) {
				// app.log("json.wheel_angle: " + json.wheel_angle);
				app.wheel_angle_callback(json.wheel_angle);
			}

			if ( !app.isNull(json.average_speed) && !app.isNull(app.average_speed_callback)) {
				/*
				 * 已经去除speed的采样限制 if ((speedRcvCount ==
				 * app.config.speedRcvIntervel) || (1 > json.average_speed)) {
				 * app.average_speed_callback(json.average_speed); speedRcvCount =
				 * 0; } else { speedRcvCount++; }
				 */
				app.average_speed_callback(json.average_speed);
			}
		}, function() {
		});
	};

	(function() {
		// 添加自动启动
		if ( !app.config.simulator) {
			gm.appmanager.setAutostart(app.config.appID, app.appCfgObj.system.auto_start);
		}

		// 获取车辆识别码
		app.vin = gm.info.getVIN();

		// 获取汽车配置
		gm.info.getVehicleConfiguration(function(args) {
			if ( !app.isNull(args.theme)) {
				if (args.theme == "CADILLAC_DEFAULT") {
					app.carTheme = app.carThemeType.cadillac;
				}
				else if (args.theme == "BUICK_DEFAULT") {
					app.carTheme = app.carThemeType.buick;
				}
				else if (args.theme == "gmc") {
					app.log("app.carTheme is simulator");
					app.carTheme = app.carThemeType.simulator;
				}
			}
			else {
				app.log("app.carTheme is other: " + args.theme);
				app.carTheme = app.carThemeType.other;
			}
		});
		app.alertCfgArr = app.alertCfg(); // 获取告警设置
		// app.log("JSON.stringify(app.alertCfgArr): " +
		// JSON.stringify(app.alertCfgArr));

		// 向服务器发送请求配置文件的get请求
		$http.get(app.config.getCfgUrl).success(function(result) {
			app.log("get callback");
			var json = result;
			app.log(JSON.stringify(json));
			app.appCfg.updateCfg(app.appCfgObj, json);
			app.appCfg.save(app.appCfgObj);
		});

		// 搭建上传数据的iframe
		app.post(function(postStatus) {
			isPosting = false;
			if (postStatus) {
				filePosting.isPosted = true;
				app.fileMgr.deleteFile(app.config.fileMgrPath, filePosting);
				postFile();
			}
		});
		app.post.createIframe();
		postFile();

		// 监控车辆的行驶状态以判断当前是静止状态还是运动状态
		if (true) {
			// 间隔1秒调用getSpeed
			var speedtiming = app.timing(function() {
				var movestatus;
				status = gm.system.getSpeed();
				// if (app.mode == app.movement.origin) {
				// app.changeMode(app.movement.loading);
				// } else {
				if (status == 0) {
					if (app.config.debug) {
						movestatus = !app.config.modeOpposite ? app.movement.static : app.movement.moving;
					}
					else {
						movestatus = app.movement.static;
					}
				}
				else {
					if (app.config.debug) {
						movestatus = !app.config.modeOpposite ? app.movement.moving : app.movement.static;
					}
					else {
						movestatus = app.movement.moving;
					}
				}

				if (app.mode != movestatus) {
					app.changeMode(movestatus);
				}
				// }

				// 添加对后台程序数量的监控
				if (getAppListCount == 0) {
					getAppList();
				}
				else if (getAppListCount == app.config.getAppListIntervel) {
					getAppListCount = 0;
				}
				else {
					getAppListCount++;
				}
			}, 1000, 0);

			speedtiming.then(function() {
			});
		}
		else {
			// watchSpeed
			gm.system.watchSpeed(function(status) {
				var movestatus;
				if (status == 0) {
					movestatus = app.movement.static;
				}
				else {
					movestatus = app.movement.moving;
				}
				if (app.mode != movestatus) {
					app.changeMode(movestatus);
				}
			}, function() {
				app.changeMode(app.movement.error);
			});
		}
	})();
	// window.document.getElementById("shift_changed").style.display = "block";
	// window.document.body.style.backgroundImage = "url(img/bg.png)";
} ]);
