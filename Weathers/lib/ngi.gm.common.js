var $unit = {
	/*
	 * 命名空间 $unit.ns('com.company');
	 */
	ns : function() {
		var a = arguments, o = null, i, j, d;
		for (i = 0; i < a.length; i = i + 1) {
			d = ("" + a[i]).split(".");
			o = window;
			for (j = 0; j < d.length; j = j + 1) {
				o[d[j]] = o[d[j]] || {};
				o = o[d[j]];
			}
		}
		return o;
	},
	format : function() {
		if (arguments.length == 0)
			return null;
		var value = arguments[0];
		for ( var i = 1, count = arguments.length; i < count; i++) {
			var pattern = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
			value = value.replace(pattern, arguments[i]);
		}
		return value;
	},
	queryString : function() {

		var e, pageParams={};
		var a = /\+/g; // Regex for replacing addition symbol with a space
		var r = /([^&=]+)=?([^&]*)/g;
		var d = function(s) {
			return decodeURIComponent(s.replace(a, " "));
		};
		var q = window.location.search.substring(1);

		while (e = r.exec(q))
			pageParams[d(e[1])] = d(e[2]);
		return pageParams;
	},
	trim : function(source) {
		return String(source).replace(/(^\s*)|(\s*$)/g, "");
	},
	isString : function(source) {
		return '[object String]' == Object.prototype.toString.call(source);
	},
	bind : function(func, scope) {
		var xargs = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
		return function() {
			var fn = $unit.isString(func) ? scope[func] : func;
			args = (xargs) ? xargs.concat([].slice.call(arguments, 0))
					: arguments;
			return fn.apply(scope || fn, args);
		};
	},
	page : {
		getViewWidth : function() {
			var doc = document, client = doc.compatMode == 'BackCompat' ? doc.body
					: doc.documentElement;

			return client.clientWidth;
		},

		getViewHeight : function() {
			var doc = document, client = doc.compatMode == 'BackCompat' ? doc.body
					: doc.documentElement;

			return client.clientHeight;
		},

		getWidth : function() {
			var doc = document, body = doc.body, html = doc.documentElement, client = doc.compatMode == 'BackCompat' ? body
					: doc.documentElement;
			return Math.max(html.scrollWidth, body.scrollWidth,
					client.clientWidth);
		},

		getHeight : function() {
			var doc = document, body = doc.body, html = doc.documentElement, client = doc.compatMode == 'BackCompat' ? body
					: doc.documentElement;
			return Math.max(html.scrollHeight, body.scrollHeight,
					client.clientHeight);
		},

		getScrollLeft : function() {
			var d = document;
			return window.pageXOffset || d.documentElement.scrollLeft
					|| d.body.scrollLeft;
		},

		getScrollTop : function() {
			var d = document;
			return window.pageYOffset || d.documentElement.scrollTop
					|| d.body.scrollTop;
		},

		setScrollTop : function(value) {
			var d = document;
			d.documentElement.scrollTop = value;
			d.body.scrollTop = value;
			// window.pageYOffset = value;
		},

		getCenter : function(oi) {
			var wi = {
				width : this.getViewWidth(),
				height : this.getViewHeight()
			};
			var wsi = {
				left : this.getScrollLeft(),
				top : this.getScrollTop()
			};
			return {
				left : wsi.left + wi.width / 2 - oi.width / 2 + 'px',
				top : wsi.top + wi.height / 2 - oi.height / 2 + 'px'
			};
		}
	},
	argumentNames : function(fn) {
		var names = fn.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1]
				.replace(/\s+/g, '').split(',');
		return names.length == 1 && !names[0] ? [] : names;
	},
	getChinaDate : function(dateNow) {
		var LunarDaysOfMonth = new Array(0xd4a8, 0xd4a0, 0xda50, 0x5aa8,
				0x56a0, 0xaad8, 0x25d0, 0x92d0, 0xc958, 0xa950, // 2001-2010
				0xb4a0, 0xb550, 0xb550, 0x55a8, 0x4ba0, 0xa5b0, 0x52b8, 0x52b0,
				0xa930, 0x74a8, // 2011-2020
				0x6aa0, 0xad50, 0x4da8, 0x4b60, 0x9570, 0xa4e0, 0xd260, 0xe930,
				0xd530, 0x5aa0, // 2021-2030
				0x6b50, 0x96d0, 0x4ae8, 0x4ad0, 0xa4d0, 0xd258, 0xd250, 0xd520,
				0xdaa0, 0xb5a0, // 2031-2040
				0x56d0, 0x4ad8, 0x49b0, 0xa4b8, 0xa4b0, 0xaa50, 0xb528, 0x6d20,
				0xada0, 0x55b0 // 2041-2050
		);

		// 数组LunarLeapYear存放农历2001年到2050年闰月的月份，如没有则为0，从高到低，每字节存两年
		var LunarLeapYear = new Array(0x40, 0x02, 0x07, 0x00, 0x50, // 2001-2010
		0x04, 0x09, 0x00, 0x60, 0x04, // 2011-2020
		0x00, 0x20, 0x60, 0x05, 0x00, // 2021-2030
		0x30, 0xb0, 0x06, 0x00, 0x50, // 2031-2040
		0x02, 0x07, 0x00, 0x50, 0x03 // 2041-2050
		);

		// 返回农历iLunarYear年的闰月月份，如没有则返回0
		function GetLeapMonth(iLunarYear) {
			var Leap = LunarLeapYear[(iLunarYear - 2001) >> 1];
			return (((iLunarYear - 2001) & 1) == 0) ? (Leap >> 4)
					: (Leap & 0x0f);
		};

		// 返回农历iLunarYer年iLunarMonth月的天数，结果是一个长整数
		// 如果iLunarMonth不是闰月， 高字为0，低字为该月的天数
		// 如果iLunarMonth是闰月， 高字为后一个月的天数，低字为前一个月的天数
		function LunarMonthDays(iLunarYear, iLunarMonth) {
			var High;
			var Low;
			var Bit;

			High = 0;
			Low = 29;
			Bit = 16 - iLunarMonth;
			if ((iLunarMonth > GetLeapMonth(iLunarYear))
					&& (GetLeapMonth(iLunarYear) > 0))
				Bit--;
			if ((LunarDaysOfMonth[iLunarYear - 2001] & (1 << Bit)) > 0)
				Low++;
			if (iLunarMonth == GetLeapMonth(iLunarYear)) {
				High = ((LunarDaysOfMonth[iLunarYear - 2001] & (1 << (Bit - 1))) > 0) ? 30
						: 29;
			}

			return Low + (High << 16);
		};

		// 返回农历iLunarYear年的总天数
		function LunarYearDays(iLunarYear) {
			var Days;
			var tmp;

			Days = 0;
			for ( var i = 1; i <= 12; i++) {
				tmp = LunarMonthDays(iLunarYear, i);
				Days = Days + ((tmp >> 16) & 0xffff); // 取高位
				Days = Days + (tmp & 0xffff); // 取低位
			}

			return Days;
		};

		// 将农历iLunarYear年格式化成天干地支记年法表示的字符串
		function FormatLunarYear(iLunarYear) {
			var szText1 = new String("甲乙丙丁戊己庚辛壬癸");
			var szText2 = new String("子丑寅卯辰巳午未申酉戌亥");
			var strYear;

			strYear = szText1.substr((iLunarYear - 4) % 10, 1);
			strYear = strYear + szText2.substr((iLunarYear - 4) % 12, 1);

			return strYear + "年";
		};

		// 将农历iLunarMonth月格式化成农历表示的字符串
		function FormatLunarMonth(iLunarMonth) {
			var szText = new String("正二三四五六七八九十");
			var strMonth;

			if (iLunarMonth <= 10) {
				strMonth = szText.substr(iLunarMonth - 1, 1);
			} else if (iLunarMonth == 11)
				strMonth = "十一";
			else
				strMonth = "十二";

			return strMonth + "月";
		};

		// 将农历iLunarDay日格式化成农历表示的字符串
		function FormatLunarDay(iLunarDay) {
			var szText1 = new String("初十廿三");
			var szText2 = new String("一二三四五六七八九十");
			var strDay;
			if ((iLunarDay != 20) && (iLunarDay != 30)) {
				strDay = szText1.substr((iLunarDay - 1) / 10, 1)
						+ szText2.substr((iLunarDay - 1) % 10, 1);
			} else if (iLunarDay != 20) {
				strDay = szText1.substr(iLunarDay / 10, 1) + "十";
			} else {
				strDay = "二十";
			}

			return strDay;
		};

		// 将公历日期转换为农历日期，返回农历表示的字符串
		function GetLunarDateString(SolarDate) {
			var tmp;
			var iLunarYear=0;
			var iLunarMonth;
			var iLunarDay;
			var Leap = false;
			var MinMilli = 1000 * 60;
			var HrMilli = MinMilli * 60;
			var DyMilli = HrMilli * 24;

			// 从2001年1月1日算起，给定的公历日期已经过去的天数
			// 11323是1970年1月1日到2001年1月1日之间的天数，因为Date是从1970年1月1日作为起点的
			var iSpanDays = Math.round(SolarDate.getTime() / DyMilli) - 11323;

			// 公历2001年1月24日为农历2001年正月初一，差23天
			if (iSpanDays < 23) {
				iYear = 2000;
				iLunarMonth = 12;
				iLunarDay = iSpanDays + 7;
			} else {
				// 从农历2001年正月初一算起
				iSpanDays = iSpanDays - 23;
				iLunarYear = 2001;
				iLunarMonth = 1;
				iLunarDay = 1;

				// 计算农历年
				tmp = LunarYearDays(iLunarYear);
				while (iSpanDays >= tmp) {
					iSpanDays -= tmp;
					iLunarYear++;
					tmp = LunarYearDays(iLunarYear);
				}

				// 计算农历月
				tmp = LunarMonthDays(iLunarYear, iLunarMonth) & 0xffff; // 取低字
				while (iSpanDays >= tmp) {
					iSpanDays -= tmp;
					if (iLunarMonth == GetLeapMonth(iLunarYear)) // 该年该月闰月
					{
						tmp = LunarMonthDays(iLunarYear, iLunarMonth) >> 16; // 取高字
						if (iSpanDays < tmp) {
							Leap = (tmp > 0) ? true : false; // 闰月的后个月？
							break;
						}
						iSpanDays = iSpanDays - tmp;
					}

					iLunarMonth++;
					tmp = LunarMonthDays(iLunarYear, iLunarMonth) & 0xffff; // 取低字
				}

				// 计算农历日
				iLunarDay += iSpanDays;
			}

			return FormatLunarYear(iLunarYear) + (Leap ? "闰" : "")
					+ FormatLunarMonth(iLunarMonth) + FormatLunarDay(iLunarDay);
		};

		return GetLunarDateString(dateNow || new Date());
	}
};

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
	writeLog("try read: " + key);
	var path = this.getPath(key);
	var result = gm.io.readFile(path);
	/* 0720sdk，如读取失败则返回一个数值：
	 * UNKNOWN: 0
	 * FILE_IO_NOT_FOUND: 12
	 * FILE_IO_ACCESS_DENIED: 13
	 * 此处简化处理，如返回结果的类型为"number"，则认为失败
	 */
	if (typeof(result) == "number"){
		writeWarn("read failed: " + key);
		return null;
	}else{
		writeLog("read completed: " + key);
		return result;	// 因在硬件上执行时报错，怀疑是编码方面的问题
		//return unescape(result);
	} 
};

gm.ngi.FileStorage.prototype.setItem = function(key, value) {
	var path = this.getPath(key);
	//var result = gm.io.writeFile(path, escape(value));
	var result = gm.io.writeFile(path, value);	// 因在硬件上执行时报错，怀疑是编码方面的问题
	return result;
};

gm.ngi.FileStorage.prototype.removeItem = function(key) {
	var path = this.getPath(key);
	gm.io.deleteFile(path);
};

$unit.ns("gm.ngi.DomStorage");
/*
 * Chrome Dom Storage
 */
gm.ngi.DomStorage = function() {

};

gm.ngi.DomStorage.prototype = new gm.ngi.Storage;
gm.ngi.DomStorage.prototype.className = "gm.ngi.DomStorage";

gm.ngi.DomStorage.prototype.getItem = function(key) {
	return window.localStorage.getItem(key);
};

gm.ngi.DomStorage.prototype.setItem = function(key, value) {
	return window.localStorage.setItem(key, value);
};

gm.ngi.DomStorage.prototype.removeItem = function(key) {
	window.localStorage.removeItem(key);
};

/*
 * Name: 对话框类。 Author: dongee
 */
$unit.ns("gm.ngi.Dialog.Floater");
// 对话框基类
gm.ngi.Dialog.Floater = function() {
	this.baseSetting = {
		zIndex : 2011,
		interval : 0,
		isClickEnable : 0,
		isClosed : 0
	};

	this.init = function(option, config) {
		this.option = $.extend(null, option);
		this.config = $.extend(null, this.baseSetting, config);
		this.container = $(this.option.container || document.body);
		this.content = this.option.content || '';
		this.zIndex = this.option.zIndex || this.config.zIndex;
		if (this.content) {
			var element = $(this.content);
			switch (element.length) {
			case 0:
				this.panel = $('<div></div>');
				if (this.content.length > 0)
					this.panel.html(this.content);
				break;
			case 1:
				this.panel = element;
				break;
			default:
				this.panel = $('<div></div>').append(element);
				break;
			}
		} else
			this.panel = $('<div></div>');
		this.panel.css({
			'position' : 'absolute',
			'zIndex' : this.zIndex
		});

		this.container.append(this.panel.hide());
		var that = this;
		this.panel.click(function() {
			that.config.isClickEnable && that.close();
		});
		this.contentControl = $('#contentBoxS', this.panel);
		if (this.config.onPanelAppend) {
			this.config.onPanelAppend(this.panel);
		}
		this.closeHandler = $unit.bind(this.close, this);
		this.startup();
	},

	this.startup = function() {
		if (!this.config.lurk)
			this.show();
	};
	this.setClickEnable = function(d) {
		this.config.isClickEnable = d;
		if (this.config.onClickEnableChange) {
			this.config.onClickEnableChange(d);
		}
	};
	this.show = function() {
		var data = $unit.page.getCenter({
			'width' : this.panel.width(),
			'height' : this.panel.height()
		});
		this.panel.css(data);
		this.panel.show();
		if (this.config.interval > 0) {
			this.timeout = setTimeout(this.closeHandler, this.config.interval);
		}
		if (this.config.onShow) {
			this.config.onShow();
		}
	};

	this.hide = function() {
		this.panel.hide();
	};
	this.close = function() {
		this.panel.remove();
		this.config.isClosed = 1;
		this.config.interval > 0 && clearTimeout(this.timeout);
		if (this.config.onClose) {
			this.config.onClose();
		}
	};
	this.setContent = function(c) {
		this.contentControl.html(c);
	};
};
$unit.ns("gm.ngi.Dialog.Tip");
// 普通对话框，只有字，有遮层，自动消失（可传值设置）
gm.ngi.Dialog.Tip = function(option, config) {
	this.setting = {
		outer : [
				'<div id="msgBoxX" et="contentContainer">',
				'<div id="msgArrBox_left"></div>',
				'<div id="msgArrBox_middle">',
				'<div id="msgArrBoxS"><img width="165" height="165" src="images/22_2.png"></div><!---这里程序修改图片的SRC--->',
				'<div id="contentBoxS">{0}</div>', '<span></span>', '</div>',
				'<div id="msgArrBox_right"></div>', '</div>' ].join(""),
		interval : 3000,
		lurk : false,
		isClickEnable : 1
	};
	this.option = $.extend(null, this.option, option);
	this.option.content = $unit.format(this.setting.outer, this.option.content
			|| '');
	this.config = $.extend(null, this.setting, config);

	this.init(this.option, this.config);

};
gm.ngi.Dialog.Tip.prototype = new gm.ngi.Dialog.Floater();

$unit.ns("gm.ngi.Dialog.Mask");
// 对话框的遮罩层
gm.ngi.Dialog.Mask = function(config) {
	var that = this;
	this.closing = function() {
		that.config.target && that.config.target.config.isClosed === 0
				&& that.config.target.close();
	};
	this.setting = {
		content : '<div class="mask"></div>',
		lurk : true,
		fullfill : true,
		onClose : this.closing

	};

	this.option = {
		content : this.setting.content
	};
	this.config = $.extend(null, this.setting, config);
	this.init(this.option, this.config);
	initPage.call(this);
	function initPage() {
		if (this.config.fullfill) {
			data = {
				left : 0,
				top : 0,
				width : $unit.page.getWidth(),
				height : $unit.page.getHeight()
			};
		}
		this.panel.css({
			left : data.left + 'px',
			top : data.top + 'px',
			width : data.width + 'px',
			height : data.height + 'px',
			backgroundColor : '#666',
			opacity : 0.5,
			zIndex : this.config.zIndex
		}).addClass(this.config.css);
	}
	;

};
gm.ngi.Dialog.Mask.prototype = new gm.ngi.Dialog.Floater();

$unit.ns("gm.ngi.Dialog.Load");
// 带按钮的对话框，确认与取消。有遮层
gm.ngi.Dialog.Load = function(option, config) {
	var that = this;
	var zi = 2011;
	this.mark = new gm.ngi.Dialog.Mask({
		zIndex : zi - 1,
		target : that
	});
	this.showing = function() {
		that.mark.show();
	};
	this.closeing = function() {
		that.mark.close();
	};
	this.clickEnableChange = function(d) {
		that.mark.setClickEnable(d);
	};
	this.setting = {
		outer : [
				'<div id="msgBoxS"  et="contentContainer">',
				'<div id="msgArrBox_left"></div>',
				'<div id="msgArrBox_middle">',
				'<div id="msgArrBoxS_loading"><img width="83" height="83" src="images/26.png"></div><!---这里程序修改图片的SRC--->',
				'<div id="contentBoxS">{0}</div>', '<span></span>', '</div>',
				'<div id="msgArrBox_right"></div>', '</div>' ].join(""),
		lurk : true,
		zIndex : zi,
		onShow : this.showing,
		onClose : this.closeing,
		onClickEnableChange : this.clickEnableChange
	};
	this.option = $.extend(null, this.option, option);
	this.option.content = $unit.format(this.setting.outer, this.option.content
			|| '');
	this.config = $.extend(null, this.setting, config);
	this.init(this.option, this.config);
};
gm.ngi.Dialog.Load.prototype = new gm.ngi.Dialog.Floater();

$unit.ns("gm.ngi.Dialog.Confirm");
// 带按钮的对话框，确认与取消。有遮层
gm.ngi.Dialog.Confirm = function(option) {
	var that = this;
	var zi = 2011;
	this.mark = new gm.ngi.Dialog.Mask({
		zIndex : zi - 1
	});
	this.showing = function() {
		that.mark.show();
	};
	this.closeing = function() {
		that.mark.close();
	};

	this.appendCompleted = function(d) {
		that.button1 = $('[et="ok"]', d);
		that.button2 = $('[et="cancel"]', d);
		that.button1.bind('click', option.button1Click);
		that.button2.bind('click', option.button2Click);
	};
	this.setting = {
		outer : [ '<div id="msgBoxB" et="contentContainer">',
				'<div id="contentBoxB">{0}</div>', '<div id="ComfButton">',
				'<ul style="margin-top: -20px;">', '<li class="okButton" et="ok">' + option.btn1 + '</li>',
				'<li class="cancelButton" et="cancel">' + option.btn2 + '</li>', '</ul>', '</div>',
				'</div>' ].join(),
		lurk : false,
		zIndex : zi,
		onShow : this.showing,
		onClose : this.closeing,
		onPanelAppend : this.appendCompleted
	};
	this.option = $.extend(null, this.option, option);
	this.option.content = $unit.format(this.setting.outer, this.option.content
			|| '');
	this.init(this.option, this.setting);
};

gm.ngi.Dialog.Confirm.prototype = new gm.ngi.Dialog.Floater();

$unit.ns("gm.ngi.Dialog.TTS");
gm.ngi.Dialog.TTS = function(option, config) {
	this.setting = {
		outer : [
				'<div style="width: 600px; padding:10px;border: solid; border-width:1px; background-color : silver;">',
				'<div>{0}</div>', '</div>' ].join(""),
		lurk : false
	};
	this.option = $.extend(null, this.option, option);
	this.option.content = $unit.format(this.setting.outer, this.option.content
			|| '');
	this.config = $.extend(null, this.setting, config);
	this.init(this.option, this.config);

};
gm.ngi.Dialog.TTS.prototype = new gm.ngi.Dialog.Floater();

gm.ngi.msgbox = {
	show : function(content,b) {
		return new gm.ngi.Dialog.Tip({
			content : content
		}, b);
	},
	showLoad : function(content) {
		var ld = new gm.ngi.Dialog.Load({
			content : content
		}, {});
		ld.show();
		return ld;
	},
	confirm : function(content, button1Callback) {
		return this.confirmDetail(content, '', '', button1Callback);
	},
	confirmDetail : function(content, button1Text, button2Text,
			button1Callback, button2Callback) {
		var conf = new gm.ngi.Dialog.Confirm({
			content : content,
			btn1 : button1Text || "确定",
			btn2 : button2Text || "取消",
			button1Click : function() {
				button1Callback && button1Callback();
				conf.close();
			},
			button2Click : function() {
				button2Callback && button2Callback();
				conf.close();
			}
		});
		return conf;
	}

};

$unit.ns("gm.ngi.weathers.Utils");
gm.ngi.weathers.Utils = function() {

	/*
	 * JSON.stringify在调试环境中，输出的中文总是被escape处理过 请使用toJsonStr方法以输出正常的中文
	 */
	this.toJsonStr = function(obj, indent) {
		var str = JSON.stringify(obj, null, indent ? "\t" : null);
		// unescape 处理
		str = str.replace(/\\u\w{4}/gi, function(word) {
			return unescape("%u" + word.substr(2));
		});
		return str;
	};

	// 过滤文本中的@someone，将其转换为html
	this.filterMetion = function(s) {

	};

	// 过滤文本中的短网址，将其转换为html
	this.filterShortUrl = function(s) {
		var regex = /http:\/\/t.cn\/\w+\b/ig;
	};

	// 过滤文本中的微博表情，将其转换为image
	this.filterShortUrl = function(s) {

	};

	// 处理友好的日期显示
	this.toFriendlyDate = function(date) {
		var odate = new Date();
		iDays = parseInt(Math.abs(date - odate) / 1000 / 60);
		var year = date.getFullYear();
		var mon = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();
		var timestr = (hour > 9 ? hour : ("0" + hour)) + ":"
				+ (min > 9 ? min : ("0" + min)) + ":"
				+ (sec > 9 ? sec : ("0" + sec));
		var str = year + "-" + (mon > 9 ? mon : ("0" + mon)) + "-"
				+ (day > 9 ? day : ("0" + day)) + " " + timestr;
		if (iDays == 0)
			str = "1分钟内";
		else if (iDays < 60)
			str = iDays + " 分钟前";
		else if (date.getFullYear() == odate.getFullYear()
				&& date.getMonth() == odate.getMonth()
				&& date.getDate() == odate.getDate())
			str = "今天 " + timestr;
		else if (date.getFullYear() == odate.getFullYear()
				&& date.getMonth() == odate.getMonth()
				&& (date.getDate() - odate.getDate()) == -1)
			str = "昨天 " + timestr;
		return unescape(str);
	};
	this.formatTypeV = function(user, verified, verified_type) {
		if (!verified && verified_type == 220)
			return "27.png";
		if (verified && verified_type == 0)
			return "28.png";
		if (verified && (verified_type == 2 || verified_type == 3))
			return "29.png";
		return null;
	};
	this.getTextLength = function(str) {
		var len = 0;
		for ( var i = 0; i < str.length; i++) {
			var temp = str.charCodeAt(i);
			if (temp >= 0 && temp <= 254) {
				// 以下是0-255之内为全角的字符
				if (temp == 162 || temp == 163 || temp == 167 || temp == 168
						|| temp == 171 || temp == 172 || temp == 175
						|| temp == 176 || temp == 177 || temp == 180
						|| temp == 181 || temp == 182 || temp == 183
						|| temp == 184 || temp == 187 || temp == 215
						|| temp == 247) {
					len += 2;
				}
				len++;
			} else if (temp >= 65377 && temp <= 65439) {
				if (temp == 65381) {
					len += 2;
				}
				len++;
			} else {
				len += 2;
			}
		}// for end
		if (len % 2 == 0) {
			return len / 2;
		} else {
			return parseInt(len / 2) + 1;
		}
	};
	this.transferCityName=function(str){
		var citys="土默特左旗|土左旗/土默特右旗|土右旗/达尔罕茂明安联合旗|达茂旗/科尔沁左翼后旗|科左后旗/克什克腾旗|克什旗/伊金霍洛旗|伊金霍洛/鄂托克前旗|鄂托克旗/乌拉特后旗|乌后旗/乌拉特中旗|乌中旗/乌拉特前旗|乌前旗";
		var list=citys.split('/');
		for(var p in list)
			if(list[p].split('|')[0]==str)
				return list[p].split('|')[1];
		return str;
	};
};

gm.ngi.weathers.utils = new gm.ngi.weathers.Utils();