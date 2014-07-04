Rotary = {};

(function() {
	var elements = [];
	var elements_i = 0;
	var enable = true;
	var type = "page";

	var counter = {
		elements:[],
		time:null };

	var popup = {
		elements:[],
		elements_i:0 };

	/*
	 * 旋钮初始化: a.绑定元素组,b.绑定默认选中项
	 * 
	 */
	Rotary.init = function(e, i) {

		elements = [];

		e.each(function() {
			elements.push($(this));
		});

		if (i == 0 || i) {
			elements_i = i;
		}

		if ($("#player").css("display") != "none") {

			$("div#player .btn").each(function() {
				elements.push($(this));
			});
		}

		display();

	};

	// 旋钮是否启用(true:启用;false:禁用)
	Rotary.enabled = enable;

	// 启用旋钮
	Rotary.enable = function() {
		enable = true;
	};

	Rotary.setIndex = function(index) {
		index = index || 0;

		elements_i = index;

	};

	// 禁用旋钮
	Rotary.disable = function() {
		enable = false;
	};

	// 旋钮绑定到弹出框页面
	Rotary.start_popup_control = function(e, i) {

		if ( !enable) {
			return;
		}

		type = "popup";
		popup.elements = e || [];
		popup.elements_i = i || 0;

		display();
	};

	// 弹出框关闭,重新绑定到页面元素序列
	Rotary.end_popup_control = function() {

		if ( !enable) {
			return;
		}

		type = "page";

		display();
	};

	function executEvent() {

	}

	function next(e) {

	}

	function previous(e) {
	}

	// 显示当前绑定的选
	function display() {
		if (type == "page" && elements.length > 0 && elements[elements_i]) {

			$(elements).each(function(i, el) {
				$(el).removeClass("focus");
			});

			$(elements[elements_i]).addClass("focus");
		}
		else if (type == "popup" && popup.elements.length > 0 && popup.elements[popup.elements_i]) {

			$(popup.elements).each(function(i, el) {
				$(el).removeClass("focus");
			});

			$(popup.elements[popup.elements_i]).addClass("focus");
		}
	}

	// 下一个
	function hwNext() {
		log("Inside hwNext");

		if ( !enable) {
			return;
		}

		Rotary.disable();

		setTimeout(function() {
			
			Rotary.enable();
			
		}, 200);

		if (type == "page") {

			var prev_i = elements_i;

			elements_i++;

			if (elements_i >= elements.length) {
				elements_i = 0;
			}

			$(elements[prev_i]).trigger("rotaryBlur");

			$(elements[elements_i]).trigger("rotaryRightFocus");

			if ($(elements[elements_i]).hasClass('disabled')) {
				hwNext();
			}
		}
		else if (type == "popup") {

			var prev_i = popup.elements_i;

			popup.elements_i++;

			if (popup.elements_i > popup.elements.length) {
				popup.elements_i = 0;
			}

			$(popup.elements[prev_i]).trigger("rotaryBlur");

			if (prev_i != popup.elements_i) {
				$(popup.elements[popup.elements_i]).trigger("rotaryFocus");
			}

			if ($(popup.elements[popup.elements_i]).hasClass('disabled')) {
				hwNext();
			}
		}

		display();
	}

	// 上一个
	function hwPrevious() {
		log("hwPrevious");

		if ( !enable) {
			return;
		}

		Rotary.disable();

		setTimeout(function() {
			
			Rotary.enable();
			
		}, 200);

		
		var prev_i = elements_i;

		elements_i--;

		if (type == "page") {

			if (elements_i < 0) {
				elements_i = elements.length - 1;
			}

			$(elements[prev_i]).trigger("rotaryBlur");

			$(elements[elements_i]).trigger("rotaryLeftFocus");

			if ($(elements[elements_i]).hasClass('disabled')) {
				hwPrevious();
			}
		}
		else if (type == "popup") {

			var prev_i = popup.elements_i;

			popup.elements_i--;

			if (popup.elements_i < 0) {
				popup.elements_i = popup.elements.length - 1;
			}

			$(popup.elements[prev_i]).trigger("rotaryBlur");

			if (prev_i != popup.elements_i) {
				$(popup.elements[popup.elements_i]).trigger("rotaryFocus");
			}

			if ($(popup.elements[popup.elements_i]).hasClass('disabled')) {
				hwPrevious();
			}
		}

		display();
	}

	// 后退键
	function hwBack() {
		log("hwBack");
		$(document).trigger("back-confirm");
	}

	// 选中事件
	function hwSelect() {

		if ( !enable) {
			return;
		}

		if (type == "page") {
			$(elements[elements_i]).trigger("rotarySelect");
		}
		else if (type == "popup") {
			$(popup.elements[popup.elements_i]).trigger("rotarySelect");
		}

	}

	$(document).on("application.controls.pressed_left", hwPrevious);
	$(document).on("application.controls.pressed_right", hwNext);
	// $(document).on("application.controls.pressed_up", hwPrevious);
	// $(document).on("application.controls.pressed_down", hwNext);
	$(document).on("application.controls.pressed_back", hwBack);
	$(document).on("application.controls.pressed_select", hwSelect);

})();
