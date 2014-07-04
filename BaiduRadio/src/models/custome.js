/**
 * 
 */
(function() {
	'use strict';

	CCR.Models.Custome = Backbone.Model.extend({
		channelid: -1,
		click_count:0,
		spend_time:0,
		});

	CCR.Collections.Customes = Backbone.Collection.extend({
		model:CCR.Models.Custome,
		max_number:200,

		// 保存
		save:function() {
			var json = this.toJSON();
			log("Saving customes state: " + JSON.stringify(json));
			helper.io.writeJSONFile("customes.json", json, false);
		},

		comparator:function(model) {
			return model.get("click_count");
		},

		// 读取
		fetch:function() {
			log("Inside favorites fetch");
			var self = this;
			helper.io.readJSONFile("customes.json", false, function(data) {
				log("Response from file read: " + JSON.stringify(data));
				if (data != {} && data.length > 0) {
					self.parse(data);
				}
				else {
					// no favorites!?
				}
			});
		},

		isExist:function(channelid) {// 是否已收藏
			var retVal = false;

			var favs = this.where({
				channelid:channelid });

			if (favs.length > 0) {
				retVal = true;
			}

			return retVal;
		},

		parse:function(data) {
			var self = this;
			for ( var i in data) {
				var fav = new CCR.Models.Custome(data[i]);
				this.add(fav);
			}
		}, });
})();
