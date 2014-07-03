
$unit.ns("gm.ngi.Storage");
gm.ngi.Storage = function() {

};

gm.ngi.Storage.prototype.getItem = function(key) {
};

gm.ngi.Storage.prototype.setItem = function(key, value) {
};

gm.ngi.Storage.prototype.removeItem = function(key) {
};

$unit.ns("gm.ngi.FileStorage");
/*
 * 本地文件存储 在调试环境中，GM File System 无法处理中文内容(乱码)， 因此在读写处理时，使用escape/unescape编解码内容。
 */
gm.ngi.FileStorage = function() {
};

gm.ngi.FileStorage.prototype = new gm.ngi.Storage;
gm.ngi.FileStorage.prototype.className = "gm.ngi.FileStorage";

gm.ngi.FileStorage.prototype.getPath = function(key) {
	var baseDir = "storage/";
	var ext = ".txt";
	return baseDir + key + ext;
};

gm.ngi.FileStorage.prototype.getItem = function(key) {
	writeLog("try read: " + key);
	var path = this.getPath(key);
	var result = gm.io.readFile(path);
	/* 0720sdk，如读取失败则返回一个数值：
	 * UNKNOWN: 0
	 * FILE_IO_NOT_FOUND: 12
	 * FILE_IO_ACCESS_DENIED: 13
	 * 此处简化处理，如返回结果的类型为"number"，则认为失败
	 */
	if (typeof(result) == "number"){
		writeWarn("read failed: " + key);
		return null;
	}else{
		writeLog("read completed: " + key);
		//return result;	// 因在硬件上执行时报错，怀疑是编码方面的问题
		return unescape(result);
	}	
};

gm.ngi.FileStorage.prototype.setItem = function(key, value) {
	var path = this.getPath(key);
	var result = gm.io.writeFile(path, escape(value));
	//var result = gm.io.writeFile(path, value);	// 因在硬件上执行时报错，怀疑是编码方面的问题
	return result;
};

gm.ngi.FileStorage.prototype.removeItem = function(key) {
	var path = this.getPath(key);
	gm.io.deleteFile(path);
};

$unit.ns("gm.ngi.weather.DataStorage");
/*
 * 新闻应用的本地数据存储 GM使用GM文件系统做为存储介质 路径为approot/data/storage
 */
gm.ngi.weather.DataStorage = function() {

	this.storage = new gm.ngi.FileStorage();

	// 数据存储键
	this.storageKeys = {

		ApiSetting : "ngi.weather.apisetting", // 新闻设置
		columns : "ngi.weather.columns", // 新闻类别
		newslist : "ngi.weather.newslist", // 新闻列表

		UserOptions : "ngi.weather.useroptions", // 用户选项
		getForcast : "ngi.weather.getForcast", // 获取天气预报

		getProvinces:"gm.ngi.weathers.provinces",//省
		getIndices : "ngi.weather.getIndices", // 获取天气指数
		getSunInfo : "ngi.weather.getSunInfo",// 获取日出日落
		newslistTemplate : "ngi.weather.newslistTemplate"
	};

};

gm.ngi.weather.DataStorage.prototype.writeObject = function(key, obj) {
	var value = JSON.stringify(obj);
	return this.storage.setItem(key, value);
};

gm.ngi.weather.DataStorage.prototype.readObject = function(key) {
	// TODO: try catch
	var str = this.storage.getItem(key);
	if (str){
		writeLog("try parse JSON: " + key);
		var obj = null;
		try{
			obj = JSON.parse(str);
		} catch (err){
			writeError("JSON parse error: " + err.description);
			return null;
		}
		writeLog("JSON parsed: " + key);
		return obj;
	} else{
		return null;
	}
};

gm.ngi.weather.DataStorage.prototype.removeObject = function(key) {
	this.storage.removeItem(key);
};

gm.ngi.weather.DataStorage.prototype.getColumns = function() {
	// var obj = this.readObject(this.storageKeys。columns);
	return gm.ngi.newssdk.Columns;
};

gm.ngi.weather.DataStorage.prototype.getNewsList = function(columnId) {
	return this.readObject(this.storageKeys.newslist + "_" + columnId);
};

gm.ngi.weather.DataStorage.prototype.setNewsList = function(columnId, list) {
	return this.writeObject(this.storageKeys.newslist + "_" + columnId, list);
};

gm.ngi.weather.DataStorage.prototype.getNewsItem = function(columnId, newsId) {
	// return this.readObject(this.storageKeys.getNewsItem+"_"+columnId,
	// newsId);
};

gm.ngi.weather.DataStorage.prototype.setNewsItem = function(columnId, item) {
	// TODO;
};
gm.ngi.weather.DataStorage.prototype.getUserOptions = function() {
	var obj = this.readObject(this.storageKeys.UserOptions);
	return obj;
};

gm.ngi.weather.DataStorage.prototype.setUserOptions = function(value) {
	return this.writeObject(this.storageKeys.UserOptions, value);
};
gm.ngi.weather.dataStorage = new gm.ngi.weather.DataStorage();

function writeLog(s){
	console.log("*** Sina News Application Log => ***"); 
	console.log("*** ==== " + s);
}

function writeWarn(s){
	console.log("*** Sina News Application Warn => ***"); 
	console.warn("*** ==== " + s);
}

function writeError(s){
	console.log("*** Sina News Application Error => ***"); 
	console.error("*** ==== " + s);
}