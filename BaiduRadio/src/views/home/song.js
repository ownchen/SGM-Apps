/**
 * 单曲播放显示
 */
var SongCanPlay = false;
var LRCFlag = false;

(function() {
	'use strict';

	// var filename = "templates/radio/songInfo.txt";
	// var templateHTML = gm.io.readFile(filename);

	var templateHTML = '<div id="currentInfo"><span id="currentChannelName">{{channel.channel}}</span><span id="currentSongName" class="pause">{{song.title}}</span><span id="currentSongArtist">{{song.author}}</span></div>';

	CCR.Views.SongView = Backbone.View.extend({ // 单曲信息视图
		el:'div#songInfo', // 模板根元素
		template:Handlebars.compile(templateHTML), // 模板
		options:null,

		// 事件绑定
		events:{

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
			var self = this;

			var song = CCR.Song.get('songinfo');
			var channel = CCR.Channel.toJSON();

			self.$el.html(self.template({
				song:song,
				channel:channel }));
		},

		initialize:function(options) {
			this.options = options;
		},
	});

})();
