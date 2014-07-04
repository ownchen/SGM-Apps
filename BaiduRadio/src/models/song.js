(function() {
	'use strict';

	CCR.Models.Song = Backbone.Model.extend({
		// 歌曲列表信息
		artist:"",
		songid:0,
		thumb:"",
		title:"",
		options:null, // 参数传递

		// 详细信息
		songinfo:{},

		songurl:{},

		parse:function(data) {
			return data;
		},

		ready:function(success, error) {
			if ( !this.options) {
				return;
			}
			var self = this;

			helper.comm.getBaiduRadioToken(function(token,textStatus) {
				var url = CCR.Config.radio_song_url;
				url += "songid=" + self.options.songid;
				url += "&access_token=" + token.access_token;

				if (textStatus == "success") {
					self.url = url;
					self.fetch();
				}
				else {
					typeof error === "function" && error(textStatus);
				}
			});

			this.fetch({
				success:function(model,response) {
					typeof success === "function" && success();
				},
				error:function() {
					typeof error === "function" && error("error");
				},
				timeout:60000
				});
		},

		initialize:function(options) {
			this.options = options;

			CCR.Comm.log("Initializing song: " + JSON.stringify(this.toJSON()));
		}, });
})();
