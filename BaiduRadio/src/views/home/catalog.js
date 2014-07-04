(function() {

	'use strict';
	// 模板内容
	var templateHTML = '<div id="radioListBar" class="radioListBar">	{{#each channellist}}	<div id="{{this.channelid}}" href="channel/{{this.channelid}}">		<div class="channel" bg="{{this.thumb}}"></div>		<span>{{this.name}}</span>	</div>	{{/each}}</div>';
	// 频道列表视图
	CCR.Views.CatalogView = Backbone.View.extend({
		el:'#radioList', // 模板根元素
		template:Handlebars.compile(templateHTML), // 模板
		listDiv:null, // 旋钮元素
		left_count:2,
		focusDiv:null,
		hidden:true, // 是否显示

		bindEvents:function() { // 事件绑定

			var self = this;

			var rootDiv = $("#radioListBar");

			$("#radioListBar>div").off("rotaryLeftFocus").on("rotaryLeftFocus", function() {

				self.onRotaryLeftFocus(this);

			}).off("rotaryRightFocus").on("rotaryRightFocus", function() {

				self.onRotaryRightFocus(this);

			}).off("rotarySelect").on("rotarySelect", function() {

				self.onRotarySelect(this);

			}).off("mousedown").on("mousedown", function() {

				if (rootDiv.hasClass("disabled")) {
					return;
				}

				self.onMousedown(this);

			}).off("mouseup").on("mouseup", function() {

				if (rootDiv.hasClass("disabled")) {
					return;
				}

				$("#radioListBar").addClass("disabled");

				setTimeout(function() {
					rootDiv.removeClass("disabled");

				}, 1000);

				self.onMouseup(this);

				self.onClick(this);

			}).off("mouseleave").on("mouseleave",function(){
				
				$(this).removeClass("selected");
				
			});
		},

		// 旋钮 - 旋到焦点
		onRotaryLeftFocus:function(e) {

			var listItem = $(e);

			if ( !listItem.hasClass("playing")) {
				var index = this.listDiv.index(listItem);

				var i = CCR.Flags.get("focus_channel_i");

				this.renderChannel(index);
			}
		},

		// 旋钮 - 旋到焦点
		onRotaryRightFocus:function(e) {

			var listItem = $(e);

			if ( !listItem.hasClass("playing")) {
				var index = this.listDiv.index(listItem);

				this.renderChannel(index);
			}
		},

		// 旋钮 - 点击选中
		onRotarySelect:function(e) {

			var listItem = $(e);

			var href = listItem.attr("href");

			var self = this;

			if (parseInt(listItem.attr("id")) != CCR.Channel.get("channelid")) {

				CCR.Router.hideAll();

				CCR.Router.showPlayer(0);
			}
			else {
				if ($("#player").css("display") != "none") {
					CCR.Router.hidePlayer();
				}
				else {
					CCR.Router.showPlayer(0);
				}
			}

			// 切换频道
			setTimeout(function() {
				CCR.Router.navigate(href, {
					trigger:true });
			}, 1000);
		},

		// 鼠标按下 - 加载样式
		onMousedown:function(e) {

			var listItem = $(e);

			listItem.addClass("selected");

			if (listItem.hasClass("playing") && //
			parseInt(listItem.attr("id")) != CCR.Channel.get("channelid")) {
				listItem.removeClass("focus");
			}
		},

		// 鼠标松开 - 移除鼠标按下时的效果
		onMouseup:function(e) {

			var listItem = $(e);

			var index = this.listDiv.index(listItem);

			if (parseInt(listItem.attr("id")) != CCR.Channel.get("channelid")) {

				CCR.Router.hideAll();
			}

			if (index < 0) {

				var tempIndex = $("#radioListBar>div").index(listItem);

				if (tempIndex >= this.listDiv.length) {

					index = tempIndex - (this.listDiv.length + this.left_count);

				}
				else if (tempIndex < this.left_count) {

					index = this.listDiv.length - tempIndex - 1;
				}
			}

			this.listDiv.removeClass("focus").not(".playing").removeClass("selected");

			listItem.removeClass("selected").addClass("focus");

			this.renderChannel(index);
		},

		// 鼠标点击
		onClick:function(e) {

			var listItem = $(e);

			var href = listItem.attr("href");

			// 切换频道
			setTimeout(function() {
				CCR.Router.navigate(href, {
					trigger:true });
			}, 1000);
		},

		/*
		 * 频道切换
		 */
		renderChannel:function(index, direction) {

			var parentDiv = $("#radioListBar");

			var width = 126;

			if (index < 0) {// 循环
				index = this.listDiv.length - 1;
			}
			else if (index >= this.listDiv.length) {
				index = 0;
			}

			if (index < CCR.Flags.get("focus_channel_i")) {
				parentDiv.css({
					left: -(index + 1) * width });
			}
			else if (index > CCR.Flags.get("focus_channel_i")) {
				parentDiv.css({
					left: -(index - 1) * width });
			}

			var left = -(index * width) + "px";

			this.loadingBg(index);

			CCR.Flags.set({ // 当前焦点所在的频道
				focus_channel_i:index });

			parentDiv.stop().animate({
				"left":left }, 100);

			this.listDiv.removeClass("playing");

			$(this.listDiv[index]).addClass("playing").addClass("focus");

			if ($("#player").css("display") != "none") {

				Rotary.init($(this.listDiv[index]), 0);

			}
			else {
				Rotary.setIndex(index);
			}

		},

		// 加载背景图片
		loadingBg:function(index) {

			var items = $("#radioListBar .channel").slice(index, index + this.left_count * 2 + 1);

			for (var i = 0; i < items.length; i++) {

				var item = $(items[i]);

				if (item.css("background-image") != "url(" + item.attr("bg") + ")") {
					item.css("background", "url(" + item.attr("bg") + ") no-repeat");
				}
			}
		},

		// 显示
		show:function() {
			this.hidden = false;
			this.render();
		},

		// 隐藏
		hide:function() {
			if ( !this.hidden) {
				this.hidden = true;
				this.$el.html("");
			}
		},

		// 渲染
		render:function() {

			log("Rendering channel list view");

			var channels = this.collection.toJSON();

			var start_list = channels.slice(0, this.left_count);

			var end_list = channels.slice(channels.length - this.left_count);

			// 环形 - 尾部 - 头部 衔接
			for (var i = 0; i < start_list.length; i++) {
				channels.push(start_list[i]);
			}

			// 环形 - 头部-尾部衔接
			for (var i = end_list.length - 1; i >= 0; i--) {
				channels.unshift((end_list[i]));
			}

			this.$el.html(this.template({
				channellist:channels, }));

			this.bindEvents();

			var items = $("#radioListBar>div");

			var channel_i = CCR.Flags.get("playing_channel_i");

			this.listDiv = items.slice(this.left_count, items.length - this.left_count);

			this.renderChannel(channel_i, "next");

			if ($("#player").css("display") != "none") {
				CCR.Router.showPlayer(0);
			}
			else {
				Rotary.init(this.listDiv, channel_i);
			}

			return this;
		},

		initialize:function() {
			log("initialize CatalogView");
		} });
})();
