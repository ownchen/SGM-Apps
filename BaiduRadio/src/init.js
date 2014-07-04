/**
 * 定义命名空间
 */
(function() {
	window.CCR = {};
	CCR.Collections = {}; // 有序组合
	CCR.Models = {}; // 实体类
	CCR.Views = {}; // 视图类
	CCR.Comm = {}; // 公共方法

	// 百度电台的配置信息
	CCR.Config = {
		isDebug:true,
		// 百度电台相关信息
		app_id:424275,
		client_id:"GDfGE9SoVRim841jg1FBcFtj",
		client_secret:"Ok9BZ29wW088TcpVwfq6k5VcojaDmFAP",
		client_token:null,

		channel_count:50,

		closeBtnEnabled:true,

		lrcEnabled:false,

		/*
		 * Request
		 * URL:https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=&client_secret=
		 */
		radio_token_url:"https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials",

		/*
		 * https://openapi.baidu.com/rest/2.0/music/radio/catalog?access_token=
		 */
		radio_catalog_url:"https://openapi.baidu.com/rest/2.0/music/radio/catalog?",

		/*
		 * https://openapi.baidu.com/rest/2.0/music/radio/songlist?channelid=6&page_no=7&page_size=50&access_token=
		 */
		radio_songlist_url:"https://openapi.baidu.com/rest/2.0/music/radio/songlist?",

		/*
		 * https://openapi.baidu.com/rest/2.0/music/song/info?songid=65865126&access_token=
		 */
		radio_song_url:"https://openapi.baidu.com/rest/2.0/music/song/info?",

		/*
		 * 获取访问令牌
		 */
		/*
		 * getToken:function(callback) { var self = this; if (self.client_token) {
		 * 
		 * typeof callback === "function" && callback(self.client_token); } else {
		 * self.initToken(callback); } },
		 */

		initToken:function(callback) {
			var self = this;
			var url = self.radio_token_url;
			url += "&client_id=" + self.client_id + "&client_secret=" + self.client_secret;

			$.ajax({
				url:url,
				contentType:"application/json; charset=utf-8",
				dataType:"json",
				async:false,
				success:function(data, textStatus) {
					// 返回的数据用data.d获取内容
					self.client_token = token = data;
					typeof callback === "function" && callback(data, textStatus);
				},
				error:function(jqXHR, textStatus) {
					typeof callback === "function" && callback({}, textStatus);
				},

				timeout:60000,
			});
		} };
})();

// 显示加载
function showFirstLoading() {
	$('#loading').removeClass('hidden');
}

// 隐藏加载
function hideFirstLoading() {
	$('#loading').addClass('hidden');
}

// 显示加载
function showLoading() {

	showPopup("加载中，精彩马上呈现", "load");

/*	setTimeout(function() {
		if ( !$("#load").hasClass("hidden")) {
			showPopup("亲，您的网络伤不起啊，要不要再试一次?", "retry");
		}

	}, 30000);
*/
	Rotary.disable();
}

// 隐藏加载
function hideLoading() {
	hidePopup();

	Rotary.enable();
}

// 显示初始加载项
function showFirst() {

	showFirstLoading();

	$("#first").removeClass("hidden");

	$(".container").addClass("hidden");
}

// 隐藏初始加载项
function hideFirst() {
	hideFirstLoading();
	$("#first").addClass("hidden");
	$(".container").removeClass("hidden");
}

// 显示消息
function showPopup(message, type, timeout) {

	timeout = timeout || 2000;

	hideLoading();

	$("#popup").removeClass("hidden");

	$("#popup .msgpane").addClass("hidden");

	if (type == "message") {
		$("#message").removeClass("hidden");

		setTimeout(function() {
			hidePopup("message");
		}, timeout);
	}
	else if (type == "error") {
		$("#error").removeClass("hidden");
	}
	else if (type == "load") {
		$("#load").removeClass("hidden");
	}
	else if (type == "retry") {
		$("#retry").removeClass("hidden");

		Rotary.start_popup_control($("#retry .btn"), 0);
	}
	else {
		$("#confirm").removeClass("hidden");
	}

	if (message) {
		$("#popup .messageword").html(message);
	}
}

// 隐藏消息
function hidePopup() {

	$("#popup").addClass("hidden");

	$("#popup .msgpane").addClass("hidden");

	Rotary.end_popup_control();

}
