/**
 * 电台类别
 */
(function() {
	'use strict';

	CCR.Models.Channel = Backbone.Model.extend({
		channel:"", // 频道名称
		channelid:0, // 频道编号
		count:0, // 歌曲数量
		songlist:[], // 歌曲列表
		page_count:0, // 歌曲列表页数
		page_sort:[],
		channel_i:0,
		// channeldiv_i:0,
		options:null,

		parse:function(data) {
			var newData = {};
			if (data) {
				newData = data.channelinfo;
			}

			return newData;
		},

		randomSort:function(count) { // 自定义排序
			var json = {};
			var retVal = [];
			var temp = [];

			for (var i = 1; i <= count; i++) {

				var item = Math.random();

				temp.push(item);

				json[item] = i;
			}

			temp.sort();

			for (var i = 0; i < temp.length; i++) {
				retVal.push(json[temp[i]]);
			}

			return retVal;

		},

		//
		ready:function(success, error) {

			var self = this;

			var setPageSort = function(token, textStatus) {

				var url = CCR.Config.radio_songlist_url;
				url += "channelid=" + self.options.channelid;
				url += "page_no=1&page_size=1";
				url += "&access_token=" + token.access_token;

				if (textStatus == "success") {
					$.ajax({
						url:url,
						contentType:"application/json; charset=utf-8",
						dataType:"json",
						async:false,
						success:function(data) {
							var pageCount = Math.floor((data.channelinfo.count - 1) / self.get('page_size')) + 1;

							var pageSort = self.randomSort(pageCount);

							CCR.ChannelBasic.set("page_sort", pageSort);

						},
						error:function(jqXHR, status) {
							typeof error === "function" && error(status);
							return;
						},

						timeout:60000,

					});

				}
				else {
					typeof error === "function" && error(textStatus);
				}
			};

			var getUrl = function(token, textStatus) {
				var url = CCR.Config.radio_songlist_url;

				var page_no = CCR.ChannelBasic.get("page_sort").lenth > 0 ? CCR.ChannelBasic.get("page_sort")[self.options.page_no] : 1;
				url += "channelid=" + self.options.channelid;

				url += "&page_no=" + page_no;

				if (self.options.page_size) {
					url += "&page_size=" + self.options.page_size;
				}

				url += "&access_token=" + token.access_token;

				if (textStatus == "success") {
					self.url = url;
					self.fetch();
				}
				else {
					typeof error === "function" && error(textStatus);
				}
			};

			if ( !CCR.ChannelBasic.get("page_sort") || CCR.ChannelBasic.get("page_sort").length == 0) {
				helper.comm.getBaiduRadioToken(setPageSort);
			}

			helper.comm.getBaiduRadioToken(getUrl);

			this.fetch({
				success:function(data, response) {
					var pageCount = Math.floor((data.get('count') - 1) / self.get('page_size')) + 1;

					// 获取最大页数
					self.set({
						page_count:pageCount });

					typeof success === "function" && success();
				},
				error:function() {

					typeof error === "function" && error("error");

				},
				timeout:60000, });
		},

		/*
		 * 构造函数：被实例化时执行
		 */
		initialize:function(options) {

			if ( !options) {
				return;
			}

			this.options = options;

			// 频道编号
			if (options.channelid) {
				this.set({
					channelid:options.channelid });
			}
			// 页数
			if (options.page_no) {
				this.set({
					page_no:options.page_no });
			}
			// 条数
			if (options.page_size) {
				this.set({
					page_size:options.page_size });
			}

			CCR.Comm.log("Initializing Channel" + JSON.stringify(this.toJSON()));
		}, });

	CCR.Collections.Channels = Backbone.Collection.extend({
		model:CCR.Models.Channel,
		options:null,
		channel_i:0,
		limitedCount:true,

		parse:function(data) {
			for ( var i in data) {
				var item = new CCR.Models.Channel(data[i]);
				this.add(item);
			}
			return data;
		},

		fetch:function(channellist) {
			var modellist = [];

			var list = [];

			var count;

			var first;

			var redChannel = getChannel("0", channellist);

			for (var i = (CCR.Customes.models.length - 1); i >= 0; i--) {

				if (i % 2 == 0) {

					modellist.push(CCR.Customes.models[i]);
				}
				else {

					modellist.unshift(CCR.Customes.models[i]);
				}
			}

			if (this.limitedCount && CCR.Config.channel_count) {
				count = modellist.length > CCR.Config.channel_count ? CCR.Config.channel_count : modellist.length;
			}
			else {
				count = modellist.length;
			}

			if (modellist.length > 0) {

				for (var i = 0; i < count; i++) {
					var channel = getChannel(modellist[i].get("channelid"), channellist);

					if (parseInt(channel.channelid) == 0) {
						continue;
					}

					channel && list.push(channel);

					if (i == parseInt(count / 2)) {
						list.push(redChannel);
					}
				}
			}
			else {
				list.push(redChannel);
			}

			for (var i = 0; i < channellist.length; i++) {
				var channel = channellist[i];
				var channelmodel = CCR.Customes.where({
					channelid:parseInt(channel.channelid) });

				if (channelmodel.length > 0) {
					continue;
				}

				if (parseInt(channel.channelid) == 0) {
					continue;
				}

				if (this.limitedCount && CCR.Config.channel_count && list.length >= CCR.Config.channel_count) {
					break;
				}

				if (list.length % 2 == 0) {
					list.push(channellist[i]);
				}
				else {
					list.unshift(channellist[i]);
				}
			}

			this.parse(list);

			function getChannel(id, channellist) {
				var channel = null;
				for (var i = 0; i < channellist.length; i++) {
					if (parseInt(channellist[i].channelid) === parseInt(id)) {
						channel = channellist[i];
					}
				}
				return channel;
			}
		},

		initialize:function(options) {
			if (options) {
				this.options = options;
				// this.fetch();
			}
		}, });

})();
