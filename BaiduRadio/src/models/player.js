(function() {
	'use strict';

	// 播放器
	CCR.Models.Player = Backbone.Model.extend({
		status:"stopped",
		song_i:0,

		// 播放
		play:function(url) {

			helper.media.play(url, this.playCallBack);
		},

		// 暂停
		pause:function() {
			log("model - inside pasue");
			return helper.media.pause();
		},

		// 停止
		stop:function() {
			log("model - inside stop");
			helper.media.stop();
		},

		seek:function(position) {
			log("model - inside seek");

			helper.media.seek(position);

		},

		//
		parse:function(data) {
			return data;
		},

		playCallBack:function(code, status) {

			CCR.Player.set("status", status);// 重置状态

			var i = CCR.Player.get('song_i') || 0;

			if (status == "ended") { // 歌曲播放结束

				CCR.Router.songDetail(++i);// 播放下一首
			}
			else if (status == "error") {
				CCR.Router.playError();
			}

			var e = $("#playBtn .icon");

			var d = $("#currentSongName");

			if (status == 'paused') {

				e.removeClass("stop").addClass("play");
				// d.removeClass("play").addClass("pause");

			}
			else {
				e.addClass("stop").removeClass("play");
				// d.removeClass("pause").addClass("play");
			}
		},

		/*
		 * 构造函数：被实例化时执行
		 */
		initialize:function(options) {
			log("Initializing Models Player" + JSON.stringify(this.toJSON()));

			if (options && options.url) {
				this.url = options.url;
			}
		},

	});
})();
