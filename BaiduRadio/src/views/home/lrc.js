(function() {
	'use strict';

	// var filename = "templates/radio/songInfo.txt";
	// var templateHTML = gm.io.readFile(filename);

	var templateHTML = '<ul id="lrcPane">{{#each lineList}}<li class="normalLyric">{{this.content}}</li> {{/each}}</ul>';

	CCR.Views.LrcView = Backbone.View.extend({ // 单曲信息视图
		el:'div#lrc', // 模板根元素
		template:Handlebars.compile(templateHTML), // 模板

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
			var lrc = CCR.Lrc;

			this.$el.html(this.template({
				lineList:lrc.get('lineList') }));
		},

		initialize:function(options) {
			this.options = options;
		},

	});

})();
