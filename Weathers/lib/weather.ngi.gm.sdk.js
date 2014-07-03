/*
 *  Api 类
 */
$unit.ns("gm.ngi.weathersdk.WeatherApi");
gm.ngi.weathersdk.WeatherApi = function() {
	this.config = {
		traceCode : 0,
		format : "json",
		app_key : "3025920294",
		auth_type : "uuid",
		auth_value : "0123456789012345",
		cnprocode : "",
		cncitycode : "",
		continent : "",
		country : "",
		city : "",
		startday : 0,
		lenday : 1,
		month : null,
		day : null,
		airport : "PEK"
	};
	this.apiConnectionError = function() {
		// alert("网络出错");
	};

	this.apiServerError = function(d) {
	};

	this.lnk = "http://platform.sina.com.cn/weather/";
};

gm.ngi.weathersdk.WeatherApi.prototype.exec = function(url, callback) {
	this.config.traceCode = Math.random();
	url = url + "?" + $.param(this.config);
	$.ajax({
		async : true,
		dataType : "json",
		context : this,
		url : url,
		success : function(data, status, xhr) {
			var result = {
				succeeded : true,
				data : data,
				xhr : xhr
			};
			if (callback) {
				callback(result);
			}
		},
		error : function(xhr, message, exception) {
			var result = {
				succeeded : false,
				errorMessage : message,
				exception : exception,
				xhr : xhr
			};
			if (xhr.readyState < 4 && this.apiConnectionError) {
				this.apiConnectionError(result);
			} else if (xhr.readyState >= 4 && this.apiServerError) {
				try {
					result.data = JSON.parse(xhr.responseText);
				} catch (err) {
				}
				this.apiServerError(result);
			}
		},
		type : "GET"
	});
};
/* 获得国内省份和与之对应的ID */
gm.ngi.weathersdk.WeatherApi.prototype.getCnProvinces = function(callback) {
	var url = this.lnk + "cnprovince";
	this.exec(url, callback);
};
/*
 * 获得服务支持的国内市和与之对应的ID cnprocode: 必选 国内省份ID或中文名（不带‘省’）
 */
gm.ngi.weathersdk.WeatherApi.prototype.getCnCities = function(cnprocode, callback) {
	var url = this.lnk + "cncity";
	this.config.cnprocode = cnprocode;
	this.exec(url, callback);
};
/*
 * 获得服务支持的国内区县和与之对应的ID cncitycode : 必选 国内市名ID或中文名（不带‘市’）
 */
gm.ngi.weathersdk.WeatherApi.prototype.getCnDistricts = function(cncitycode,
		callback) {
	var url = this.lnk + "cndistrict";
	this.config.cncitycode = cncitycode;
	this.exec(url, callback);
};

/*
 * 获得城市（包括区县）的天气预报 city : 可选 城市（包括区县）名或其ID，多个城市使用逗号隔开 startday: 可选 指定开始日期
 * 0/1/2/3/4：今天/明天/后天/第4天/第5天 默认值为0 lenday：可选 指定返回几天的数据 默认值为1 最多5天
 */
gm.ngi.weathersdk.WeatherApi.prototype.getForecast = function(city, startday,
		lenday, callback) {
	var url = this.lnk + "forecast";
	this.config.city = city;
	this.config.startday = startday;
	this.config.lenday = lenday;
	this.exec(url, callback);
};
/*
 * 获得城市（包括区县）的天气指数 city : 必选 城市（包括区县）名或其ID，多个城市使用逗号隔开 startday: 可选 指定开始日期
 * 0/1/2/3/4：今天/明天/后天/第4天/第5天 默认值为0 lenday：可选 指定返回几天的数据 默认值为1 最多5天
 */
gm.ngi.weathersdk.WeatherApi.prototype.getCityZs = function(city, startday,
		lenday, callback) {
	var url = this.lnk + "cityzs";
	this.config.city = city;
	this.config.startday = startday;
	this.config.lenday = lenday;
	this.exec(url, callback);
};
/*
 * 获得城市（包括区县）日出日落时间 city : 必选 城市（包括区县）名或其ID，多个城市使用逗号隔开 startday: 可选 指定开始日期
 * 0/1/2/3/4：今天/明天/后天/第4天/第5天 默认值为0 lenday：可选 指定返回几天的数据 默认值为1 最多5天
 */
gm.ngi.weathersdk.WeatherApi.prototype.getSuninfo = function(city, startday,
		lenday, callback) {
	var url = this.lnk + "suninfo";
	this.config.city = city;
	this.config.startday = startday;
	this.config.lenday = lenday;
	this.exec(url, callback);
};
/*
 * 获得农历信息 startday: 可选 指定开始日期 0/1/2/3/4：今天/明天/后天/第4天/第5天 默认值为0 lenday：可选
 * 指定返回几天的数据 默认值为1 最多5天
 */
gm.ngi.weathersdk.WeatherApi.prototype.getLunarcal = function(startday, lenday,
		callback) {
	var url = this.lnk + "lunarcal";
	this.config.startday = startday;
	this.config.lenday = lenday;
	this.exec(url, callback);
};

/*
 * 获得提供天气服务的国内机场和与之对应的ID
 */
gm.ngi.weathersdk.WeatherApi.prototype.getAirPorts = function(callback) {
	var url = this.lnk + "airport";
	this.exec(url, callback);
};
/*
 * 获得机场的天气预报 airport : 必选 机场中文名或其ID（三字码），多个机场使用逗号隔开
 */
gm.ngi.weathersdk.WeatherApi.prototype.getAirPortForecast = function(airport, callback) {
	var url = this.lnk + "wairport_current";
	this.config.airport = airport;
	this.exec(url, callback);
};
/*
 * 获得周边城市和与之对应的ID city：必选 城市ID或中文名
 */
gm.ngi.weathersdk.WeatherApi.prototype.getAroundcity = function(city, callback) {
	var url = this.lnk + "aroundcity";
	this.config.city = city;
	this.exec(url, callback);
};
/*
 *  根据经纬度返回所在城市 coordinate ， 精度和纬度用英文半角逗号 隔开 如：110.72,36.8
 */
gm.ngi.weathersdk.WeatherApi.prototype.getCoordinate = function(coordinate,callback) {
	var url = this.lnk + "coordinate";
	this.config.coordinate = coordinate;
	this.exec(url, callback);
};
gm.ngi.weathersdk.WeatherApi.prototype.getLocation = function(callback){
	gm.info.getCurrentPosition(function(pos){
		var divider = 3600 * 1000;
		var lat = pos.coords.latitude / divider;
		var lng = pos.coords.longitude / divider;
		var coords = {latitude:lat, longitude:lng};
		if (callback){
			callback(coords);
		}
	}, function(args) {
		if (callback){
			return null;
		}
	}, {});
}
