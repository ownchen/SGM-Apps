(function() {
	'use strict';

	CCR.Models.Catalog = Backbone.Model.extend({
		cid:0,
		title:"",
		channellist:[],
		channel_i:0, // 当前频道

		/*
		 * 每一次调用 fetch 从服务器拉取集合的模型数据时，parse都会被调用。 本函数接收原始 response 对象， 返回可以 add
		 * 到集合的模型属性数组。 默认实现是无需操作的，只需简单传入服务端返回的JSON对象
		 */
		parse:function(data) {
			return data;
		},

		/*
		 * 构造函数：被实例化时执行
		 */
		initialize:function(options) {
			CCR.Comm.log("Initializing Category" + JSON.stringify(this.toJSON()));
		}, });

	CCR.Collections.Catalogs = Backbone.Collection.extend({
		model:CCR.Models.Catalog,

		// 拉取数据成功
		ready:function(success, error) {
			var self = this;
			helper.comm.getBaiduRadioToken(function(token, textStatus) {
				var url = CCR.Config.radio_catalog_url;
				url += "access_token=" + token.access_token;

				if (textStatus == "success") {
					self.url = url;
					self.fetch();
				}
				else {
					typeof error === "function" && error(textStatus);
				}

			});

			self.fetch({
				success:function(model,response) {
					typeof success === "function" && success();
				},
				error:function() {
					typeof error === "function" && error("error");
				},
				
				timeout:60000,
				});
		},

		parse:function(data) {

			var newData = [];
			if (data) {
				var items = data.catalog;
				for ( var i in items) {
					newData.push(items[i]);
				}
			}

			return newData;
		},

		initialize:function() {
		}, });

})();
