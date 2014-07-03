'use strict';
/* global angular */

angular.module('app.tools', []).factory('tools', function() {
	var breaker = {};

	return {
		log:log,

		/*
		 * setSpecLog: setSpecLog, logSpec: logSpec,
		 */

		trim:trim,
		each:each,
		some:some,
		union:union,
		toStr:toStr,
		isNull:isNull,
		hasOwn:hasOwn,
		isEmpty:isEmpty,
		isArray:isArray,
		intersect:intersect,
		checkType:checkType,
		digestArray:digestArray,
		formatDate:formatDate,
		formatTime:formatTime,
		isDayTime:isDayTime,
		closeApp:closeApp,
		getVehicleDate:getVehicleDate,
		getUploadTimeSeg:getUploadTimeSeg,
		sCheck:sCheck

	/*
	 * lzw_encode: lzw_encode, lzw_decode: lzw_decode,
	 */
	};

	// 正式版将启用下面的代码
	function log(message) {
		if (app.config.debug) {
			console.log(message);
		}
	}

	/*
	 * //正式版将取消下面的代码 var displayLine = 0, isSpecLogging = false; function
	 * disPlayLog(message) { var logDiv = document.getElementById("logdiv"),
	 * innerHTML = logDiv.innerHTML; if (displayLine <= 10) { innerHTML =
	 * innerHTML + message + "<br/>"; displayLine++; } else { innerHTML =
	 * message + "<br/>"; displayLine = 0; } logDiv.innerHTML = innerHTML; //
	 * logDiv.append(message + "<br/>"); //
	 * logDiv.scrollTop(logDiv[0].scrollHeight - logDiv.height()); }
	 * 
	 * function log(message) { if (app.config.debug) { console.log(message); } //
	 * if (app.isLogDisplaying && !isSpecLogging) { if (app.isLogDisplaying) {
	 * disPlayLog(message); } }
	 */

	/*
	 * function setSpecLog (flg) { isSpecLogging = flg; displayLine = 11; }
	 * 
	 * function logSpec(message) { if (app.isLogDisplaying && isSpecLogging) {
	 * disPlayLog(message); } }
	 */

	function isArray(obj) {
		return Array.isArray ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]';
	}

	function isNull(obj) {
		return obj === null || obj === undefined || obj !== obj;
	}

	function toStr(value) {
		return isNull(value) ? '' : value + '';
	}

	function hasOwn(obj, key) {
		return Object.prototype.hasOwnProperty.call(obj, key);
	}

	function isEmpty(obj) {
		for ( var key in obj) {
			if (hasOwn(obj, key)) {
				return false;
			}
		}
		return true;
	}

	function checkType(obj) {
		var type = typeof obj;
		if (obj === null) {
			return 'null';
		}
		else if (isArray(obj)) {
			return 'array';
		}
		else {
			return type;
		}
	}

	function trim(str, strict) {
		return toStr(str).replace(strict ? (/\s+/g) : (/ +/g), ' ').replace(/^\s+/, '').replace(/\s+$/, '');
	}

	function each(obj, iterator, context, arrayLike, right) {
		iterator = iterator || angular.noop;
		if ( !obj) {
			return;
		}
		else if (arrayLike || isArray(obj)) {
			if ( !right) {
				for (var i = 0, l = obj.length; i < l; i++) {
					if (iterator.call(context, obj[i], i, obj) === breaker) {
						return;
					}
				}
			}
			else {
				for (var i = obj.length - 1; i >= 0; i--) {
					if (iterator.call(context, obj[i], i, obj) === breaker) {
						return;
					}
				}
			}
		}
		else {
			for ( var key in obj) {
				if (hasOwn(obj, key)) {
					if (iterator.call(context, obj[key], key, obj) === breaker) {
						return;
					}
				}
			}
		}
	}

	function some(obj, iterator, context) {
		var result = false, nativeSome = Array.prototype.some;

		iterator = iterator || angular.noop;
		if ( !obj) {
			return result;
		}
		else if (nativeSome && obj.some === nativeSome) {
			return obj.some(iterator, context);
		}
		else {
			each(obj, function(value, index, list) {
				result = iterator.call(context, value, index, list);
				if (result) {
					return breaker;
				}
			});
			return ! !result;
		}
	}

	// 深度并集复制，用于数据对象复制、数据对象更新，若同时提供参数 a 对象和 b 对象，则将 b 对象所有属性（原始类型，忽略函数）复制给 a
	// 对象（同名则覆盖），
	// 返回值为深度复制了 b 后的 a，注意 a 和 b 必须同类型;
	// 若只提供参数 a，则 union 函数返回 a 的克隆，与JSON.parse(JSON.stringify(a))相比，克隆效率略高。

	function union(a, b) {
		var type = checkType(a);

		if (b === undefined) {
			b = a;
			a = type === 'object' ? {} : [];
		}
		if (type === checkType(b)) {
			if (type === 'object' || type === 'array') {
				each(b, function(x, i) {
					var type = checkType(x);
					if (type === 'object' || type === 'array') {
						a[i] = type === checkType(a[i]) ? a[i] : (type === 'object' ? {} : []);
						union(a[i], x);
					}
					else {
						a[i] = type === 'function' ? null : x;
					}
				});
			}
			else {
				a = type === 'function' ? null : b;
			}
		}
		return a;
	}

	// 深度交集复制，用于数据对象校验，即以 a 为模板，当a 和 b 共有属性且属性值类型一致时，将 b 的属性值复制给 a，对于 a 有 b 没有或
	// b 有 a 没有的属性，均删除，返回相交复制后的 a;
	// var a = {q:0,w:'',e:{a:0,b:[0,0,0]}}, b =
	// {r:10,w:'hello',e:{a:99,b:[1,2,3,4,5]}};
	// intersect(a, b); // a 变成{w:'hello',e:{a:99,b:[1,2,3]}}
	// 如果 a 或其属性是 null，则完全复制 b 或其对应属性
	// 如果 a 或其属性是 {} 或 [], 且 b 或其对应属性类型一致（即对象类型或数组类型），则完全复制
	// 如果 a 的某属性是数组，且只有一个值，则以该值为模板，将 b 对应的该属性的数组的值校检并复制
	// var a = {q:0,w:null,e:{a:0,b:[0]}}, b =
	// {r:10,w:'hello',e:{a:99,b:[function(){},1,2,3,'4',5]}};
	// intersect(a, b); // 注意a与上面的区别
	// var a = {q:0,w:null,e:{a:0,b:[null]}}, b =
	// {r:10,w:'hello',e:{a:99,b:[function(){},1,2,3,'4',5]}};
	// intersect(a, b); // 注意a与上面的区别

	function intersect(a, b) {
		var type = checkType(a);

		if (type === checkType(b) && (type === 'array' || type === 'object')) {
			if (isEmpty(a)) {
				union(a, b);
			}
			else if (type === 'array' && a.length === 1) {
				var o = a[0], typeK = checkType(o);
				a.length = 0;
				if (typeK !== 'function') {
					each(b, function(x) {
						var typeB = checkType(x);
						if (typeK === 'null' || typeK === typeB) {
							if (typeK === 'object' || typeK === 'array') {
								a.push(intersect(union(o), x));
							}
							else {
								a.push(union(x));
							}
						}
					});
				}
			}
			else {
				each(a, function(x, i) {
					var typeK = checkType(x);
					if (type === 'array' || hasOwn(b, i)) {
						if (typeK === 'function' && type === 'array') {
							a[i] = null;
						}
						else if (typeK === 'null') {
							a[i] = union(b[i]);
						}
						else if (typeK === checkType(b[i])) {
							if (typeK === 'object' || typeK === 'array') {
								intersect(a[i], b[i]);
							}
							else {
								a[i] = b[i];
							}
						}
						else {
							delete a[i];
						}
					}
					else {
						delete a[i];
					}
				});
			}
		}
		return a;
	}

	// 去除数组中的undefined值，修改原数组，返回原数组
	function digestArray(list) {
		var result = [];
		if (isArray(list)) {
			each(list, function(x, i) {
				if (checkType(x) === 'undefined') {
					list.splice(i, 1);
				}
			}, null, true, true);

		}
		return list;
	}

	function formatDate(date) {
		/*
		 * var yy = date.getFullYear(), MM = date.getMonth(), dd =
		 * date.getDate();
		 */
		var yy = date.year, MM = date.month, dd = date.day;
		return yy + "/" + MM + "/" + dd;
	}

	function formatTime(date) {
		/*
		 * var yy = date.getFullYear(), MM = date.getMonth(), dd =
		 * date.getDate(), hh = date.getHours(), mm = date.getMinutes(), ss =
		 * date.getSeconds();
		 */
		var yy = date.year, MM = date.month, dd = date.day, hh = date.hours, mm = date.minutes, ss = date.seconds;
		return yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
	}

	function isDayTime(date) {
		// var hh = date.getHours();
		var hh = date.hours;
		if (hh >= 6 && hh < 18) {
			return true;
		}
		else {
			return false;
		}
	}

	function closeApp() {
		gm.system.closeApp(function() {
			log("failed to close app!");
		});
	}

	function getVehicleDate(json) { // 获取getVehicleData中的日期
		/*
		 * var date = new Date(); // date.setMonth(date.getMonth() + 1);
		 * app.log("json.month: " + json.month); app.log("json.day: " +
		 * json.day); // var date = new Date(json.year, json.month, json.day);
		 * date.setFullYear(json.year); date.setDate(1);
		 * date.setMonth(json.month); date.setDate(json.day); //
		 * date.setFullYear(json.year, json.month, json.day);
		 * date.setHours(json.hours); date.setMinutes(json.minutes);
		 * date.setSeconds(json.seconds); return date;
		 */

		var retVal;

		// if (isNull(json) || isEmpty(json)) {
		if (true) {
			var myDate = new Date();

			retVal = {
				year:myDate.getFullYear(),
				month:myDate.getMonth() + 1,
				day:myDate.getDate(),
				hours:myDate.getHours(),
				minutes:myDate.getMinutes(),
				seconds:myDate.getSeconds() };

		}
		else {
			retVal = {
				year:json.year,
				month:json.month,
				day:json.day,
				hours:json.hours,
				minutes:json.minutes,
				seconds:json.seconds };
		}

		return retVal;
	}

	function getFullStr(digtal) {
		return digtal < 10 ? "0".concat(digtal) : digtal;
	}

	function getUploadTimeSeg(date) { // 获取上传数据的时间段
		var uploadIntervel = app.appCfgObj.user.upload_frequency / (60 * 1000),
		/*
		 * yy = getFullStr(date.getFullYear()), MM =
		 * getFullStr(date.getMonth()), dd = getFullStr(date.getDate()), hh =
		 * getFullStr(date.getHours()), mm = date.getMinutes();
		 */
		yy = getFullStr(date.year), MM = getFullStr(date.month), dd = getFullStr(date.day), hh = getFullStr(date.hours), mm = date.minutes;
		var q = Math.floor(mm / uploadIntervel);
		mm = getFullStr(q * uploadIntervel);
		return "".concat(yy, MM, dd, hh, mm);
	}

	function sCheck(buttonName, pageName) {
		app.log("call sCheck()");
		var s = s_gi(s_account);
		s.linkTrackVars = 'prop1,prop2';
		s.prop1 = buttonName;// 设置prop1为button名称
		s.prop2 = buttonName + pageName;// 设置prop2为button名称+页面名称
		s.tl(this, 'o', 'click_button');
	}

	/*
	 * // LZW-compress a string function lzw_encode(s) { var dict = {}; var data =
	 * (s + "").split(""); var out = []; var currChar; var phrase = data[0]; var
	 * code = 256; for (var i=1; i<data.length; i++) { currChar=data[i]; if
	 * (dict[phrase + currChar] != null) { phrase += currChar; } else {
	 * out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
	 * dict[phrase + currChar] = code; code++; phrase=currChar; } }
	 * out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0)); for
	 * (var i=0; i<out.length; i++) { out[i] = String.fromCharCode(out[i]); }
	 * return out.join(""); } // Decompress an LZW-encoded string function
	 * lzw_decode(s) { var dict = {}; var data = (s + "").split(""); var
	 * currChar = data[0]; var oldPhrase = currChar; var out = [currChar]; var
	 * code = 256; var phrase; for (var i=1; i<data.length; i++) { var currCode =
	 * data[i].charCodeAt(0); if (currCode < 256) { phrase = data[i]; } else {
	 * phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar); }
	 * out.push(phrase); currChar = phrase.charAt(0); dict[code] = oldPhrase +
	 * currChar; code++; oldPhrase = phrase; } return out.join(""); }
	 */
});
