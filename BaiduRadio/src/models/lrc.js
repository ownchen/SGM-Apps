(function() {
	'use strict';

	CCR.Models.Lrc = Backbone.Model.extend({

		parse:function(data) {
			return data;
		},

		// 分析时间
		parseTime:function(item) {

			var time = item.replace('[', "").replace(']', "");

			var items = time.split(':');

			var min = items[0];

			var second = items[1];

			return min * 60 * 1000 + Math.floor(second * 1000);
		},

		ready:function(callback) {
			if ( !this.options) {
				return;
			}
			var self = this;

			var url = self.options.url;

			$.ajax({
				type:"get",
				async:true,
				url:url,
				cache:true,
				success:function(data) {
					if (data) {
						var newData = [];

						var items = data.split('\n');
						var p = '\\[\\d{2}:\\d{2}\\.\\d{2}\\]';

						for ( var i in items) {
							// 时间
							var time = items[i].match(p) || "";

							// 歌词内容
							var content = items[i].replace(time[0], "");

							// 是否为空
							if ($.trim(time) != "" && $.trim(content) != "") {
								newData.push({
									position:self.parseTime(time[0]),
									content:content });
							}
						}

						self.set({
							lineList:newData });

						callback(true);
					}
				},
				error:function(err) {
					callback(false);
				} });
		},

		initialize:function(options) {
			this.options = options;

			CCR.Comm.log("Initializing Lrc: " + JSON.stringify(this.toJSON()));
		},

	});

})();
