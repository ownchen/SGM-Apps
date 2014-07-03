'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('app.services', []).
value('version', '0.1').
factory('timing', ['$rootScope', '$q', '$exceptionHandler',	//定时调用服务
                   function ($rootScope, $q, $exceptionHandler) {
                       function timing(fn, delay, times) {
                           var timingId, count = 0,
                               defer = $q.defer(),
                               promise = defer.promise;

                           fn = angular.isFunction(fn) ? fn : angular.noop;
                           delay = parseInt(delay, 10);
                           times = parseInt(times, 10);
                           times = times >= 0 ? times : 0;
                           timingId = window.setInterval(function () {
                               count += 1;
                               if (times && count >= times) {
                                   window.clearInterval(timingId);
                                   defer.resolve(fn(count, times, delay));
                               } else {
                                   try {
                                       fn(count, times, delay);
                                   } catch (e) {
                                       defer.reject(e);
                                       $exceptionHandler(e);
                                   }
                               }
                               if (!$rootScope.$$phase) {
                                   $rootScope.$apply();
                               }
                           }, delay);

                           promise.$timingId = timingId;
                           return promise;
                       }
                       timing.cancel = function (promise) {
                           if (promise && promise.$timingId) {
                               clearInterval(promise.$timingId);
                               return true;
                           } else {
                               return false;
                           }
                       };
                       return timing;
                   }
]).factory('loadXMLDoc', [function () {
    function loadXMLDoc(filePath) {
        var xmlDoc = null;
        try //Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.load(filePath);
            console.log("Internet Explorer load xml");
        }
        catch (e) {
            try //Firefox, Mozilla, Opera, etc.
            {
                xmlDoc = document.implementation.createDocument("", "", null);
                xmlDoc.async = false;
                xmlDoc.load(filePath);
                console.log("Gecko kernel load xml");
            }
            catch (e) {
                try //Google Chrome  
                {
                    var xmlhttp = new window.XMLHttpRequest();
                    xmlhttp.open("GET", filePath, false);
                    xmlhttp.send(null);
                    xmlDoc = xmlhttp.responseXML.documentElement;
                    console.log("Webkit kernel load xml");
                }
                catch (e) {
                    console.log(e.message);
                }
            }
        }
        var object = (xmlDoc);
        return object;
    }

    function appendMember(xmlDoc, cfgArr, tagName) {
        console.log("call appendMember, tagName: " + tagName);
        if (cfgArr) {
            var tagNode = xmlDoc.getElementsByTagName(tagName)[0];
            if (tagNode) {
                var cfg = {
                    id: cfgArr.length,
                    description: "",
                    selected: false
                };
                cfg.description = tagNode.getAttribute("desc");
                var enable = tagNode.getAttribute("enable");
                cfg.selected = (enable == "true") ? true : false;
                cfgArr.push(cfg);
            }
        }
    }

    return loadXMLDoc;
}]).factory('appCfg', ['$http', function ($http) {
    function appCfg() {
        app.log("call appCfg");
        var result = app.fileMgr.readFile(app.config.appCfgPath);
        var json = JSON.parse(result);
        if (app.isArray(json)) {
            //初始化告警项的状态
            for (var i = 0; i < json.length; i++) {
                var alertItem = json[i];
                alertItem.isActive = false;
                alertItem.alertred = false;
            }
        }
        return json;
    }

    appCfg.save = function (cfg) {
        app.log("call appCfg.save()");
        gm.io.writeFile(app.config.appCfgPath, JSON.stringify(cfg));
    };

    appCfg.updateCfg = function (localCfg, serverCfg) {
        app.log("call appCfg.updateCfg()");
        if (!app.isNull(serverCfg.system.auto_start)
				&& serverCfg.system.auto_start != localCfg.system.auto_start) {
            localCfg.system.auto_start = serverCfg.system.auto_start;
            gm.appmanager.setAutostart(app.config.appID, 2);
        }

        if (!app.isNull(serverCfg.user.enable_collect)
				&& serverCfg.user.enable_collect != localCfg.user.enable_collect) {
            localCfg.user.enable_collect = serverCfg.user.enable_collect;
            if (serverCfg.user.enable_collect == 0) {
                if (!app.isNull(app.dataTiming)) {
                    app.timing.cancel(app.dataTiming);
                    app.dataTiming = null;
                }
            } else {
                if (app.isNull(app.dataTiming)) {
                    if (app.chageToStaticEnable || app.chageToMovingEnable) {
                        app.loopGetVehicleData();
                    }
                } else {
                    if (!app.isNull(serverCfg.user.collect_frequency)
							&& serverCfg.user.collect_frequency != localCfg.user.collect_frequency) {
                        localCfg.user.collect_frequency = serverCfg.user.collect_frequency;
                        app.timing.cancel(app.dataTiming);
                        app.dataTiming = null;
                        app.loopGetVehicleData();
                    }
                }
            }
        }

        if (!app.isNull(serverCfg.user.collect_frequency)
				&& serverCfg.user.collect_frequency != localCfg.user.collect_frequency) {
            localCfg.user.collect_frequency = serverCfg.user.collect_frequency;
        }

        if (!app.isNull(serverCfg.user.enable_upload)
				&& serverCfg.user.enable_upload != localCfg.user.enable_upload) {
            localCfg.user.enable_upload = serverCfg.user.enable_upload;
        }

        if (!app.isNull(serverCfg.user.upload_frequency)
				&& serverCfg.user.upload_frequency != localCfg.user.upload_frequency) {
            localCfg.user.upload_frequency = serverCfg.user.upload_frequency;
        }

        if (!app.isNull(serverCfg.server.server_address)
				&& serverCfg.server.server_address != localCfg.server.server_address) {
            localCfg.server.server_address = localCfg.server.server_address;
        }

        if (!app.isNull(serverCfg.server.protocol)
				&& serverCfg.server.protocol != localCfg.server.protocol) {
            localCfg.server.protocol = localCfg.server.protocol;
        }
    };

    return appCfg;
}]).factory('alertCfg', [function () {
    function alertCfg() {
        app.log("call alertCfg()");
        var json = JSON.parse(app.fileMgr.readFile(app.config.alertCfgPath));
        if (app.isArray(json)) {
            //初始化告警项的状态
            var len = json.length;
            for (var i = 0; i < json.length; i++) {
                var alertItem = json[i];
                if (app.carTheme != app.carThemeType.simulator
	    				&& app.carTheme != app.carThemeType.buick) {
                    if (alertItem.id == app.alertCfgIDs.coolant_temp
	    					|| alertItem.id == app.alertCfgIDs.oil_temp
	    					|| alertItem.id == app.alertCfgIDs.tire_pressure) {
                        json.splice(i, 1);
                        i--;
                        len--;
                        continue;
                    }
                }
                alertItem.isActive = false;
                alertItem.alertred = false;
            }
        }
        return json;
    }

    alertCfg.save = function (cfgArr) {
        app.log("call alertCfg.save()");
        gm.io.writeFile(app.config.alertCfgPath, angular.toJson(cfgArr));
    };

    alertCfg.getCfgByID = function (cfgArr, cfgID) {
        if (app.isArray(cfgArr)) {
            for (var i = 0; i < cfgArr.length; i++) {
                if (!app.isNull(cfgArr[i])
    					&& !app.isNull(cfgArr[i].id)
    					&& cfgArr[i].id == cfgID) {
                    return cfgArr[i];
                }
            }
        } else {
            return null;
        }
    };

    return alertCfg;
}]).factory('alert', [function () {
    var displayArr = null,
		alertTiming = null,
		curIndex = 0,
		callback = null;
    function alert() {
        app.log("call alert()");
    }

    alert.clear = function () {
        if (displayArr) {
            for (var i = 0; i < displayArr.length; i++) {
                var alertID = displayArr[i],
//					cfg = app.alertCfgArr[alertID];
					cfg = app.alertCfg.getCfgByID(app.alertCfgArr, alertID);
                cfg.isActive = false;
            }
        }
        displayArr = null;
        displayArr = new Array();
    };
    alert.clear();

    alert.isHaveAlert = function () {
        if (displayArr.length > 0) {
            return true;
        } else {
            false;
        }
    };

    alert.appendAlert = function (alertID) {
        //		app.log("call alert.appendAlert()");
        displayArr.push(alertID);
    };

    alert.deleteAlert = function (alertID) {
        //		app.log("call alert.deleteAlert()");
        for (var i = 0; i < displayArr.length; i++) {
            if (displayArr[i] == alertID) {
                displayArr.splice(i, 1);
                return;
            }
        }
    };

    alert.setCallBack = function (fun) {
        app.log("call alert.setCallBack()");
        callback = fun;
    };

    alert.loopAlert = function () {
        //		app.log("call alert.loopAlert()");
        if (!app.isNull(alertTiming)) {
            app.timing.cancel(alertTiming);
            alertTiming = null;
        }
        var len = displayArr.length;
        if (len == 0) {
            if (!app.isNull(callback)) {
                callback(false);
            }
            return;
        } else if (len == 1) {
            //			app.log("displayArr[0]: " + displayArr[0]);
            callback(true, displayArr[0]);
        } else {
            callback(true, displayArr[0]);
            curIndex++;
            alertTiming = app.timing(function () {
                //				app.log("displayArr[curIndex]: " + displayArr[curIndex]);
                callback(true, displayArr[curIndex++]);
                curIndex = (curIndex < displayArr.length) ? curIndex : 0;
            }, 2000, 0);
        }
    };

    function checkAlert(alertID, checkValve) {
        //		app.log("call alert.checkAlert()");
        //		var cfg = app.alertCfgArr[alertID];
        var cfg = app.alertCfg.getCfgByID(app.alertCfgArr, alertID);
        if (cfg.selected) {
            if (checkValve != cfg.isActive) {
                if (checkValve) {
                    alert.appendAlert(alertID);
                } else {
                    alert.deleteAlert(alertID);
                }
                cfg.isActive = checkValve;
                cfg.alertred = cfg.selected && cfg.isActive;
                alert.loopAlert();
            }
        }
    }

    alert.checkEngineSpeed = function (engine_speed) {
        var check = (engine_speed >= app.alertValve.engine_speed);
        checkAlert(app.alertCfgIDs.engine_speed, check);
    };

    alert.checkAverageSpeed = function (average_speed, speedLimitValve) {
        var check = (average_speed >= speedLimitValve);
        checkAlert(app.alertCfgIDs.speed_limit, check);
    };

    alert.checkEngineCoolantTemp = function (engine_coolant_temp) {
    	app.engine_coolant_temp = engine_coolant_temp;
        var check = (engine_coolant_temp >= app.alertValve.temperature);
        checkAlert(app.alertCfgIDs.coolant_temp, check);
    };

    alert.checkTransmissionOilTemp = function (transmission_oil_temp) {
    	app.transmission_oil_temp = transmission_oil_temp;
        var check = (transmission_oil_temp >= app.alertValve.temperature);
        checkAlert(app.alertCfgIDs.oil_temp, check);
    };

    alert.checkTirepPressure = function (tirePreMin, tirePreMax) {
        var check = false;
        if (!app.isNull(tirePreMin)) {
            if (tirePreMin <= app.alertValve.tire_pressure_min) {
                check = true;
            }
        }

        if (!app.isNull(tirePreMax)) {
            if (tirePreMax >= app.alertValve.tire_pressure_max) {
                check = true;
            }
        }

        checkAlert(app.alertCfgIDs.tire_pressure, check);
    };

    return alert;
}]).factory('fileMgr', [function () {
    function getfileSize(filePath) {
        var result = fileMgr.readFile(filePath);
        if (result) {
            return result.length;
        } else {
            return 0;
        }
    }

    var compressFun = null;	//压缩文本的方法
    function fileMgr(path, fun) {
        app.log("call fileMgr, path: " + path);
        var lastFile = fileMgr.getEmptyFile();
        compressFun = fun;
        var result = fileMgr.readFile(path);
        if (result) {
            var json = JSON.parse(result);
            if (!app.isNull(json)) {
                if (!app.isNull(json.lastTimeSeg)) {
                    var timeSeg = json.lastTimeSeg;
                    for (var i = json.files.length - 1; i >= 0; i--) {
                        var file = json.files[i];
                        if (file.timeSeg == timeSeg) {
                            lastFile = fileMgr.getFile(file.timeSeg, file.fileName, file.fileSize, file.orderID);
                            //获取文件实际的大小
                            var size = getfileSize(file.fileName);
                            if ((0 == lastFile.fileSize) && (size != lastFile.fileSize)) {
                                lastFile.fileSize = size;
                                fileMgr.updateFile(path, lastFile);
                            }
                            break;
                        }
                    }
                }
            }
        }
        return lastFile;
    }

    fileMgr.getFile = function (timeSeg, fileName, fileSize, isPosted, orderID) {
        return {
            "timeSeg": timeSeg,
            "fileName": fileName,
            "fileSize": fileSize,
            "isPosted": isPosted,
            "orderID": orderID
        };
    };

    fileMgr.getEmptyFile = function () {
        return fileMgr.getFile("", "", 0, false, 0);
    };

    function initFileMgr(mgrPath, newFile) {
        var json =
			{
			    "totalSize": newFile.fileSize,
			    "lastTimeSeg": newFile.timeSeg,
			    "files": [newFile],
			};
        gm.io.writeFile(mgrPath, JSON.stringify(json));
    }

    fileMgr.getFirstFile = function (mgrPath, isPosted) {
        app.log("call fileMgr.getFirstFile()");
        var result = fileMgr.readFile(mgrPath);
        if (result) {
            var json = JSON.parse(result);
            if (json.files.length > 0) {
                for (var i = 0; i < json.files.length; i++) {
                    if (!app.isNull(isPosted)) {
                        if (json.files[i].isPosted == isPosted) {
                            return json.files[i];
                        }
                    } else {
                        return json.files[i];
                    }
                }
            }
        }

        return null;
    };

    //由于readFile的API返回方式在模拟器和实际车载有所不同，需要分别作处理
    fileMgr.readFile = function (fileName) {
        var result = gm.io.readFile(fileName);
        if (app.config.simulator) {
            if (typeof result != "number") {
                return result;
            } else {
                return null;
            }
        } else {
            if (!app.isNull(result)) {
                return result;
            } else {
                return null;
            }
        }
    };

    fileMgr.appendFile = function (mgrPath, newFile, oldFile) {
        app.log("call fileMgr.appendFile(), newFile : " + newFile.fileName);
        var result = fileMgr.readFile(mgrPath);
        if (result) {
            var json = JSON.parse(result);
            if (!app.isNull(json)) {
                //当空间满了以后，需要删除老的文件
                var len = json.files.length;
                for (var i = 0; i <= len && json.totalSize >= app.config.storageMaxSize; i++) {
                    var file = json.files[i],
        			ret = gm.io.deleteFile(file.fileName),
        			isDeleted = (11 == ret || 12 == ret) ? true : false;//11表示文件成功被删除，12表示文件不存在
                    if (isDeleted) {
                        json.totalSize -= file.fileSize;
                        json.files.splice(i, 1);
                        len--;
                        i--;
                    }
                    app.log("storage is full, delete file: " + file.fileName);
                    app.log("delete return: " + ret);
                }

                json.totalSize += newFile.fileSize;
                json.lastTimeSeg = newFile.timeSeg;
                //更新旧有文件的信息，主要是文件大小
                if (!app.isNull(oldFile)) {
                    for (var i = json.files.length - 1; i >= 0; i--) {
                        var file = json.files[i];
                        if (file.fileName == oldFile.fileName) {
                            //                        	/*****发送完整json格式
                            //补完旧文件
                            fileMgr.writeFileByAppend(oldFile, "]");
                            //                        	*****/

                            //压缩文件
                            //   							file.fileSize = fileMgr.compressFile(mgrPath, oldFile);
                            file.fileSize = oldFile.fileSize;
                            json.totalSize += file.fileSize;
                            break;
                        }
                    }
                }
                json.files.push(newFile);
                gm.io.writeFile(mgrPath, JSON.stringify(json));
            } else {
                initFileMgr(mgrPath, newFile);
            }
        } else {
            initFileMgr(mgrPath, newFile);
        }

    };

    fileMgr.updateFile = function (mgrPath, updatedFile) {
        app.log("call fileMgr.updateFile(), updatedFile : " + updatedFile.fileName);
        var result = fileMgr.readFile(mgrPath);
        if (result) {
            var json = JSON.parse(result);
            if (!app.isNull(json)) {
                for (var i = json.files.length - 1; i >= 0; i--) {
                    var file = json.files[i];
                    if (file.fileName == updatedFile.fileName) {
                        json.totalSize += updatedFile.fileSize;
                        file.fileSize = updatedFile.fileSize;
                        break;
                    }
                }
                gm.io.writeFile(mgrPath, JSON.stringify(json));
            }
        }
    };

    fileMgr.deleteFile = function (mgrPath, deletedFile) {
        app.log("call fileMgr.deleteFile(), deletedFile: " + deletedFile.fileName);
        var ret = gm.io.deleteFile(deletedFile.fileName),
//        var ret = 11,
        isDeleted = (11 == ret || 12 == ret) ? true : false;//11表示文件成功被删除，12表示文件不存在
        app.log("delete file return: " + ret);
        var result = fileMgr.readFile(mgrPath);
        if (result) {
            var json = JSON.parse(result);
            if (!app.isNull(json)) {
                for (var i = 0; i < json.files.length; i++) {
                    var file = json.files[i];
                    if (file.fileName == deletedFile.fileName) {
                        if (isDeleted) {
                            json.totalSize -= deletedFile.fileSize;
                            json.files.splice(i, 1);
                        } else {
                            file.isPosted = deletedFile.isPosted;
                        }
                        break;
                    }
                }
                gm.io.writeFile(mgrPath, JSON.stringify(json));
            }
        }
    };

    fileMgr.overwriteFile = function (file, contents) {
        //        gm.io.writeFile(file.fileName, contents + "\n");
        //    	/*****发送完整json格式
        gm.io.writeFile(file.fileName, contents);
        //        *****/
        file.fileSize += contents.length;
    };

    //追加方式写文件
    fileMgr.writeFileByAppend = function (file, contents) {
        //        gm.io.writeFile(file.fileName, contents + "\n", { "overwrite": 1 });
        //    	/*****发送完整json格式
        gm.io.writeFile(file.fileName, contents, { "overwrite": 1 });
        //      *****/
        file.fileSize += contents.length;
    };

    //压缩文件
    fileMgr.compressFile = function (mgrPath, file) {
        var result = gm.io.readFile(file.fileName);
        if (typeof result != "number") {
            var compressStr = compressFun(result);
            //覆盖原文件
            gm.io.writeFile(file.fileName, compressStr);
            return compressStr.length;
        }

        return file.fileSize;
    };

    return fileMgr;
}]).factory('post', [function () {
    var listenTiming = null, isTimeout = false, needResponse = true, replyCallBack = null;
    function post(callback) {
        replyCallBack = callback;
    }

    post.getNetworkConnectivity = function (callback) {
        gm.comm.getNetworkConnectivity(function (status) {
            callback(status);
        }, function () { }, "internet");
    };

    post.createIframe = function () {
        app.log("call post.createIframe()");
        var iframeOld = document.getElementById("postframe");
        if (iframeOld) {
            document.body.removeChild(iframeOld);
        }
        var iframe = document.createElement("iframe");
        iframe.id = "postframe";
        iframe.name = "postframe";
        iframe.src = "post.html";
        iframe.frameborder = "0";
        iframe.scrolling = "no";
        iframe.style.display = "none";
        needResponse = false;
        iframe.onload = post.reply;
        document.body.appendChild(iframe);
    };

    post.cancellistenTiming = function () {
        app.timing.cancel(listenTiming);
        isTimeout = false;
    };

    function replyBack(status) {
        if (needResponse) {
            post.cancellistenTiming();
            if (status) {
                app.log("success posting file!");
                replyCallBack(status);
                //                app.timing(replyCallBack(true), 1000, 1);
            } else {
                app.log("fail posting file!");
                replyCallBack(status);
                post.createIframe();
                //                app.timing(function () {
                //                    post.createIframe();
                //                    replyCallBack(false);
                //                }, 1000, 1);
            }
        }
    }

    function getActionUrl() {
        //    	app.log("call getActionUrl()");
        //        var href = window.location.href, parts = href.split(/(\/)/);
        var href = window.location.href, parts = href.split("app.html");
        parts.pop();
        //        app.log("parts: " + parts);
        var urlPlain = parts.join("") + "post.html", url = Base64.encodeURI(urlPlain);
        //        return "http://180.169.18.27/post?_t=r&l=" + url;
        return app.appCfgObj.server.protocol + "://" + app.appCfgObj.server.server_address + "/post?_t=r&l=" + url;
    }
    //    var actionUrl = getActionUrl();

    function checkPostForm() {
        try {
            var frm = document.getElementsByName("postframe")[0],
            doc = document.frames ? document.frames["postframe"].document : frm.contentDocument;
            var form = doc.forms[0];
            form.action = getActionUrl();
            //            app.log("checkPostForm result is true");
            return true;
        } catch (e) {
            return false;
        }
    }

    post.reply = function () {
        app.log("call post.reply()");
        //超时判定
        if (isTimeout) {
            replyBack(false);
        } else {
            replyBack(checkPostForm());
        }
    };

    post.sendContents = function (fileName, contents) {
        app.log("call post.sendContents()");
        needResponse = true;
        app.log("contents before base64_urlencode size: " + contents.length);
        var encodeStr = null;
        if (app.config.debug) {
            encodeStr = fileName + Base64.encodeURI(contents);
        } else {
            encodeStr = Base64.encodeURI(contents);
        }

        //        gm.io.writeFile(fileName + ".log", encodeStr);

        app.log("contents after base64_urlencode size: " + encodeStr.length);
        document.getElementById("postframe").contentWindow.postMessage(encodeStr, "*");

        //监测post返回和设置超时5分钟
        isTimeout = false;
        listenTiming = app.timing(function () {
            //这里只对错误返回做监测，正确返回会走上面的replay流程
            if (!checkPostForm()) {
                app.log("get post response not 302!");
                replyBack(false);
            }
        }, 1000, 300);
        listenTiming.then(function () {
            app.timing.cancel(listenTiming);
            listenTiming = null;
            isTimeout = true;
            post.reply();
        });
    };

    return post;
}]);
