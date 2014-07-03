/*
模板管理器
 */

$unit.ns("gm.ngi.TemplateManager");
gm.ngi.TemplateManager = function(d) {

	this.templatePaths = {
		newslistTemplate : "template/newslist.html"
	};
	/*
	 * 初始化模板
	 */
	this.init = function(m, completed) {
		for ( var temp in this.templatePaths) {
			var l = this.get(temp);
			if (m) {
				m[temp] = l;
			}
		}
		;
		if (completed)
			completed.call(null);
	};
	/*
	 * 加载模板
	 */
	this.loadTemplate = function(url) {
		var result = "";
		$.ajax({
			url : url,
			async : false,
			success : function(d) {
				result = d;
			},
			type : "GET"
		});
		return result;
	};
	/*
	 * 按初始化的key,返回模板，避免二次请求。 key:为模板名，如：LeftTemplate。
	 * k为文件名，如："ngi.weibo.template.left"
	 */
	this.get = function(key, callback) {
		var m = '{{#items}}' + 
		'<li {{classname}} pk="{{id}}"><a href="#">{{title}}</a>' + 
		'<span>{{friendlyDate}}</span></li>' + 
		'{{/items}}';
		return m;
	};
	
	this.get_bak = function(key, callback) {
		var k = d.storageKeys[key];
		var m = d.storage.getItem(k);
		if (m && m != "false") {
//			console.log(key + " was read by storage");
			return m;
		} else {
			m = this.loadTemplate(this.templatePaths[key]);
			d.storage.setItem(k, m);
			callback && callback(m);
			return m;
		}

	};
};
