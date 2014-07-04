/**
 * 
 */
(function() {
	'use strict';

	CCR.Collections.Favorites = Backbone.Collection.extend({
		model:CCR.Models.Song,
		max_number:500,

		// 保存
		save:function() {
			var json = this.toJSON();
			log("Saving favorites state: " + JSON.stringify(json));
			helper.io.writeJSONFile("favorites.json", json, false);
		},

		// 读取
		fetch:function() {
			log("Inside favorites fetch");
			var self = this;
			helper.io.readJSONFile("favorites.json", false, function(data) {
				log("Response from file read: " + JSON.stringify(data));
				if (data != {} && data.length > 0) {
					self.parse(data);
				}
				else {
					// no favorites!?
				}
			});
		},

		isExist:function(songid) {// 是否已收藏
			var retVal = false;

			var favs = this.where({
				songid:songid });

			if (favs.length > 0) {
				retVal = true;
			}

			return retVal;
		},

		comparator:function(model) {
			
			return -model.get("timeStamp");
		},

		isFull:function() { // 是否已满

			var retVal = false;

			if (this.size() >= max_number) {
				retVal = true;
			}
			return retVal;
		},

		parse:function(data) {
			var self = this;
			for ( var i in data) {
				var fav = new CCR.Models.Song(data[i]);
				this.add(fav);
			}
		}, });

})();
