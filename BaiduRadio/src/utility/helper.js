(function() {
	'use strict';

	window.helper = {};
	helper.comm = {};
	helper.info = {};
	helper.io = {};
	helper.media = {};
	helper.nav = {};
	helper.system = {};
	helper.ui = {};

	var media = {};

	var heartbeat_url = "http://www.baidu.com";
	var watch_connectivity_callback = null;
	var heartbeat_frequency = 30000;
	var heartbeat_timeout = null;
	var last_heartbeat = true;

	helper.comm.getBaiduRadioToken = function(callback) {
		if (CCR.Config.client_token) {
			callback(CCR.Config.client_token, "success");
		}
		else {
			CCR.Config.initToken(callback);
		}
	};

	// gm 判断失效 + 自动义网络判断
	helper.comm.getNetworkConnectivity = function(callback) {
		
		gm.comm.getNetworkConnectivity(function(gm_status) {
			ping_baidu(function(baidu_status) {
				callback(gm_status && baidu_status);
			});
		}, function() {
			callback(false);
		});

		function ping_baidu(callback) {
			var random = Math.round(Math.random() * 10000);
			$.ajax(heartbeat_url + '?rand=' + random, {
				success:function(data, textStatus, request) {
					callback(true);
				},
				error:function() {
					callback(false);
				},
				timeout:30000 });
		}
	};

	helper.comm.getLastNetworkStatus = function() {
		return last_heartbeat;
	};

	helper.comm.watchNetworkConnectivity = function(callback) {
		watch_connectivity_callback = callback;

		gm.comm.watchNetworkConnectivity(function(status) { // gm提供的api暂时无法工作
			handleConnection(status && last_heartbeat);
		}, function() {
			handleConnection(false);
		});

		function check() {
			clearTimeout(heartbeat_timeout);
			helper.comm.getNetworkConnectivity(function(connected) {
				handleConnection(connected);
				heartbeat_timeout = setTimeout(check, heartbeat_frequency);
			});
		}

		check();
	};

	function handleConnection(status) {
		if (status != last_heartbeat) {

			last_heartbeat = status;

			if ( !status && (media.status == "playing" || media.status == "buffering" || media.status == "connecting")) {
				helper.media.pause();
			}
			else if (status && media.status == "paused") {

				// media.mustSeek = true;

				// helper.media.play(media.url);

				helper.media.pause();
			}

			if (watch_connectivity_callback)
				watch_connectivity_callback(status);
		}
	}

	// 旋钮信息
	helper.info.watchRotaryControl = function() {
		gm.info.watchRotaryControl(function(status) {
			if (status == "RC_SELECT") {
				$(document).trigger('application.controls.pressed_select');
			}
			else if (status == "RC_CW" || status == "RC_RIGHT") {
				$(document).trigger('application.controls.pressed_right');
			}
			else if (status == "RC_CCW" || status == "RC_LEFT") {
				$(document).trigger('application.controls.pressed_left');
			}
			else if (status == "RC_UP") {
				$(document).trigger('application.controls.pressed_up');
			}
			else if (status == "RC_DOWN") {
				$(document).trigger('application.controls.pressed_down');
			}
		}, function(status) {
			log("ERROR: Got faitlure for gm.info.watchRotaryConrol!");
		});
	};
	// 返回键
	helper.info.watchButtons = function() {
		gm.info.watchButtons(function(button) {
			if (button == "BTN_BACK" || button == "BACK_SWITCH") {
				$(document).trigger("application.controls.pressed_back");
			}
		});

	};

	// 
	helper.info.watchSteeringWheelControls = function() {
		gm.hmi.watchSteeringWheelControls(function(e) {
			if (e == "SWC_LEFT") {
				$(document).trigger("application.controls.pressed_left");
			}
			else if (e == "SWC_RIGHT") {
				$(document).trigger("application.controls.pressed_right");
			}
			else if (e == "SWC_UP") {
				$(document).trigger("application.controls.pressed_up");
			}
			else if (e == "SWC_DOWN") {
				$(document).trigger("application.controls.pressed_down");
			}
			else if (e == "SWC_SELECT") {
				$(document).trigger("application.controls.pressed_select");
			}
		});
	};

	helper.media.play = function(url, callback) { // 播放

		helper.media.stop();
		resetMediaTime();
		media.url = url;
		media.callback = callback;

		setTimeout(function() {
			media.handle = gm.media.play(url, "exclusiveAudio", playerCallback);
		}, 1000);

		return true;
	};

	helper.media.pause = function() { // 暂停

		if (media.handle) {
			gm.media.pause(media.handle);
		}

		return true;
	};

	helper.media.seek = function(position) { // 拖拽
		if (media.handle) {
			media.position = position;
			gm.media.seek(media.handle, position);
		}
	};

	helper.media.stop = function() { // 停止
		log("Inside  media stop");
		if (media.handle) {
			gm.media.stop(media.handle);
			media.handle = null;
		}
		resetMediaTime();
	};

	helper.media.getPosition = function() {
		compoundMediaTime();
		return media.position;
	};

	helper.media.getStatus = function() {
		return media.status;
	};

	/* 播放功能 */

	media.status = "stopped";
	media.code = 10;
	media.handle = null;
	media.timeStarted = null;
	media.position = 0;
	media.focused = true;
	media.mustSeek = false;
	media.url = null;
	media.callback = null;

	function playerCallback(code) {
		var status = "";
		switch (code) {
			case -1:
				status = "error";
				media.focused = true;
				resetMediaTime();
			break;
			case 0:
				status = "playing";
				media.focused = true;
				media.timeStarted = new Date().getTime();
				if (media.mustSeek) {
					media.mustSeek = false;
					helper.media.seek(media.position);
				}
			break;
			case 1:
				status = "paused";
				media.focused = false;
				compoundMediaTime();
				media.timeStarted = null;
			break;
			case 2:
				status = "stopped";
				media.focused = false;
			break;
			case 3:
				status = "error";
				media.focused = true;
				resetMediaTime();
			break;
			case 4:
				status = "error";
				media.focused = true;
				resetMediaTime();
			break;
			case 5:
				status = "stopped";
				media.focused = false;
				compoundMediaTime();
			break;
			case 6:
				status = "connecting";
				media.focused = true;
				compoundMediaTime();
			break;
			case 7:
				status = "buffering";
				media.focused = true;
				compoundMediaTime();
			break;
			case 8:
				status = "ended";
				media.focused = true;
				resetMediaTime();
			break;
			case 9:
				status = "paused";
				media.focused = true;
				compoundMediaTime();
			break;
			case 10:
				status = "stopped";
				media.focused = true;
				resetMediaTime();
			break;
			case 11:
				status = "seeked";
				media.focused = true;
			break;
		}
		media.status = status;
		media.code = code;
		if (media.callback) {
			media.callback(code, status);
		}
	}

	function compoundMediaTime() {
		var now = new Date().getTime();
		var started = media.timeStarted;

		if (started) {
			var elapsed = now - started;
			media.position = media.position || 0;
			media.position += elapsed;
			media.timeStarted = now;
		}
	}

	function resetMediaTime() {
		media.timeStarted = null;
		media.position = 0;
	}

	// 删除文件
	helper.io.deleteFile = function(filename, isPrivate) {
		var opts = {};
		if (isPrivate) {
			opts.isPrivate = true;
		}
		gm.io.deleteFile(filename, opts);
	};

	// 读取文件
	helper.io.readFile = function(filename, isPrivate, callback) {
		var opts = {};
		if (isPrivate) {
			opts.isPrivate = true;
		}
		var contents = gm.io.readFile(filename, opts);
		callback(contents);
	};

	// 读取json格式的文件
	helper.io.readJSONFile = function(filename, isPrivate, callback) {
		helper.io.readFile(filename, isPrivate, function(d) {
			if ( typeof d == "undefined" || typeof d == "number" || d == null || d == "") {
				if (callback) {
					callback({});
				}
			}
			else {
				if (callback) {
					callback(JSON.parse(decodeURIComponent(d)));
				}
			}
		});
	};

	// 写文件
	helper.io.writeFile = function(filename, contents, isPrivate) {
		var opts = {};
		if (isPrivate) {
			opts.isPrivate = true;
		}
		gm.io.writeFile(function() {
			log("Success writing file " + filename);
		}, function() {
			log("Error writing file " + filename);
		}, filename, contents, opts);
	};

	// 写入json 文件
	helper.io.writeJSONFile = function(filename, contents, isPrivate) {
		var data = encodeURIComponent(JSON.stringify(contents));
		helper.io.writeFile(filename, data, isPrivate);
	};

	helper.system.setShutdown = function(callback) {
		gm.system.setShutdown(callback, function() {
		});
	};

})();
