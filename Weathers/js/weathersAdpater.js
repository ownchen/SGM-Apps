$unit.ns("gm.ngi.weathers.weathersAdpater");
/*
 * 获取天气预报相关
 * @Auther: super man.
 */
gm.ngi.weathers.weathersAdpater = function() {
	this.ds = gm.ngi.weather.dataStorage;
	this.sdk = new gm.ngi.weathersdk.WeatherApi();
	this.setting = {
			backPath:"images/backimage/",icoPath:"images/weatherforecast/"
			
	};
	this.writeToDS = function(regionId, list) {
		this.ds.writeObject(this.ds.storageKeys.getForcast + "_" + regionId,list);
	};
	this.readFromDS = function(regionId) {
		var list = this.ds.readObject(this.ds.storageKeys.getForcast + "_" + regionId);
		if (list && list != "false" && list.length > 0) {
			return list;
		}
		return 0;
	};
	this.writeIndicesToDS = function(regionId, list) {
		this.ds.writeObject(this.ds.storageKeys.getIndices + "_" + regionId,list);
	};
	this.readIndicesFromDS = function(regionId) {
		var list = this.ds.readObject(this.ds.storageKeys.getIndices + "_" + regionId);
		if (list && list != "false" && list.length > 0) {
			return list;
		}
		return 0;
	};
	this.writeSunInfoToDS = function(regionId, list) {
		this.ds.writeObject(this.ds.storageKeys.getSunInfo + "_" + regionId,list);
	};
	this.readSunInfoFromDS = function(regionId) {
		var list = this.ds.readObject(this.ds.storageKeys.getSunInfo + "_" + regionId);
		if (list && list != "false" && list.length > 0) {
			return list;
		}
		return 0;
	};
	//thi
	this.formatModel = function(m) {
		if (m) {
			var n = new gm.ngi.weathers.WeatherForcast();
			var d = new gm.ngi.weathers.WeatherInfo();
			var night = new gm.ngi.weathers.WeatherInfo();
			n.date = m.date;

			d.state = m.s1;
			d.stateBackground = this.getStateBackgroundUrl(m.f1);
			d.stateIcon = this.getStateIconUrl(m.f1);
			d.temperature = m.t1;
			d.windDirection = m.d1;
			d.windPower = m.p1;

			night.state = m.s2;
			night.stateBackground = this.getStateBackgroundUrl(m.f2);
			night.stateIcon = this.getStateIconUrl(m.f2);
			night.temperature = m.t2;
			night.windDirection = m.d2;
			night.windPower = m.p2;

			n.weatherOfDay = d;
			n.weatherOfNight = night;
			n.sunInfo = {};
			n.lunarInfo = {};
			n.indices = {};
			return n;
		}
		return 0;
	};
	this.formatIndicesModel = function(m) {
		if (m) {
			var d = new gm.ngi.weathers.WeatherIndex();
			var n = new gm.ngi.weathers.WeatherIndices();

			n.Date = m.date;
			// gm.ngi.weathers.WeatherIndex array.
			n.Indices = [];

//			d.Level= m.bqll || "";
//			d.Name= m.bql || "冰琪淋";
//			d.Description = m.bqls || "";
//			n.Indices.push(d);

			d = new gm.ngi.weathers.WeatherIndex();
			//d.Name = m.zwx || "紫外线";
			//d.Level = m.zwxl || "";
			d.Name = "紫外线";
			d.Level = m.zwxl || "";
			d.Description = m.zwxs || "";
			n.Indices.push(d);
			
			d = new gm.ngi.weathers.WeatherIndex();
			//d.Level = m.cyl || "";
			//d.Name= m.cy || "穿衣";
			d.Level = m.cyl || "";
			d.Name= "穿衣";
			d.Description = m.cys || "";
			n.Indices.push(d);

			d = new gm.ngi.weathers.WeatherIndex();
			//d.Name = m.kt || "舒适度";
			//d.Level = m.ktl || "";
			d.Name = "舒适度";
			d.Level = m.ktl || "";
			d.Description = m.kts || "";
			n.Indices.push(d);
			
			d = new gm.ngi.weathers.WeatherIndex();
			//d.Name = m.gm || "感冒";
			d.Name = "感冒";
			d.Level = m.gml || "";
			d.Description = m.gms || "";
			n.Indices.push(d);

			d = new gm.ngi.weathers.WeatherIndex();
			//d.Name = m.xc || "洗车";
			d.Name = "洗车";
			d.Level = m.xcl || "";
			d.Description = m.xcs || "";
			n.Indices.push(d);

//			d = new gm.ngi.weathers.WeatherIndex();
//			d.Name = m.wr || "";
//			d.Level = m.wrl || "";
//			d.Description = m.wrs || "";
//			n.Indices.push(d);

			d = new gm.ngi.weathers.WeatherIndex();
			//d.Name = m.yl || "晾晒";
			d.Name =  "晾晒";
			d.Level = m.yll || "";
			d.Description = m.yls || "";
			n.Indices.push(d);

			d = new gm.ngi.weathers.WeatherIndex();
			//d.Name = m.yd || "运动";
			d.Name =  "运动";
			d.Level = m.ydl || "";
			d.Description = m.yds || "";
			n.Indices.push(d);




			d = new gm.ngi.weathers.WeatherIndex();
			//d.Name = m.tgd || "雨伞";
			d.Name = "雨伞";
			d.Level = m.tgdl || "";
			d.Description = m.tgds || "";
			n.Indices.push(d);

			return n;
		}
		return 0;
	};
	this.formatSunInfoModel = function(m){
		if (m) {
			var n = new gm.ngi.weathers.SunInfo();
			n.Date = m.date;
			n.Sunrise = m.sunrise;
			n.Sunset = m.sunset;
			return n;
		}
		return 0;
	};
    this.formatLunarcalModel = function(m){
    	if(m){
    		var n = new gm.ngi.weathers.LunarInfo();
    		n.Date = m.date;
        	n.Year = m.lyear;
        	n.Month = m.lmonth;
        	n.Day = m.lday;
        	n.SolarTerm = m.sterm;
        	return n;
    	}
    	return 0;
    };
    this.getFriendDate = function(){
    	var now = new Date();
    	var pmTime = $unit.format("{0} 17:20:00",now.toDateString());
    	var displayTime = new Date(pmTime);
    	if(now-displayTime>0) return pmTime;
    	return $unit.format("{0} 08:20:00",now.toDateString());
    };
    this.compareDate = function(d1,d2){
    	var s1= ""+d1.getFullYear() + d1.getMonth()+ d1.getDate();
    	d2 = new Date(d2);
    	var s2= ""+d2.getFullYear() + d2.getMonth()+ d2.getDate();
    	return s1==s2;
    }
};
/*
 * 获取5日内天气预报
 */
gm.ngi.weathers.weathersAdpater.prototype.getForcast = function(regionId,
		callback) {
	var list = this.readFromDS(regionId);
	if (list) {
		if (list[0] && list[0].date) {
			if (this.compareDate(new Date(), list[0].date)) {
				callback && callback(list);
			} else {
				this.refreshForcast(regionId, callback);
			}
		} else {
			this.refreshForcast(regionId, callback);
		}
	} else {
		this.refreshForcast(regionId, callback);
	}
};
/*
 * 是否刷新天气预报
 */
gm.ngi.weathers.weathersAdpater.prototype.shouldRefreshForcast = function(lst) {
	//TODO: 完善代码
	return false;
};
/*
 * 刷新5日内天气预报
 */
gm.ngi.weathers.weathersAdpater.prototype.refreshForcast = function(regionId, callback) {
	var list = [], that = this;
	this.sdk.getForecast(regionId, 0, 5, function(d) {
		var newList = [];
		if (d.succeeded && d.data) {
			list = d.data.data.city[0].days.day;
			if (list && list.length > 0) {
				for ( var i = 0, j = list.length; i < j; i++) {
					var newItem = that.formatModel(list[i]);
					if(i == 0 && newItem) {
						newItem.date = that.getFriendDate(newItem.date);
						}
					newItem && newList.push(newItem);
				}
				try{
					i = j-1;
					if(newList[i].weatherOfNight.state==""){
						newList[i].weatherOfNight = newList[i-1].weatherOfNight;
					}
					that.writeToDS(regionId, newList);
				}catch(e){
					
				}
			}
		}
		callback && callback(newList);
	});
};
/*
 * 获取天气预报的天气图标路径
 */
gm.ngi.weathers.weathersAdpater.prototype.getStateIconUrl = function(n) {
	return this.setting.icoPath + n + ".png";
};
/*
 * 获取天气预报的天气背景
 */
gm.ngi.weathers.weathersAdpater.prototype.getStateBackgroundUrl = function(n) {
	return this.setting.backPath + n + ".png";
};
/*
 * 获取今日天气指数
 */
gm.ngi.weathers.weathersAdpater.prototype.getIndices = function(regionId,callback) {
	var list = this.readIndicesFromDS(regionId);
	if (list) {
		if (list[0] && list[0].date) {
			if (this.compareDate(new Date(), list[0].date)) {
				callback && callback(list);
			} else {
				this.refreshIndices(regionId, callback);
			}
		} else {
			this.refreshIndices(regionId, callback);
		}
	} else {
		this.refreshIndices(regionId, callback);
	}
};

/*
 * 获取5日内天气系数
 */
gm.ngi.weathers.weathersAdpater.prototype.refreshIndices = function(regionId,callback) {
	var list = [],that=this;
	this.sdk.getCityZs(regionId, 0, 5, function(d) {
		var newList = [];
		if (d.succeeded && d.data) {
			list = d.data.data.city[0].days.day;
			
			if (list && list.length > 0) {
				for ( var i = 0, j = list.length; i < j; i++) {
					var newItem = that.formatIndicesModel(list[i]);
					if(i == 0 && newItem) {
						newItem.Date = that.getFriendDate(newItem.Date);
						}
					newItem && newList.push(newItem);
				}
				that.writeIndicesToDS(regionId, newList);
			}
		}
		callback && callback(newList);
	});
};

/*
 * 获取今日天气指数
 */
gm.ngi.weathers.weathersAdpater.prototype.getSunInfo = function(regionId,callback) {
	var list = this.readSunInfoFromDS(regionId);
	if (list) {
		if (list[0] && list[0].date) {
			if (this.compareDate(new Date(), list[0].date)) {
				callback && callback(list);
			} else {
				this.refreshSunInfo(regionId, callback);
			}
		} else {
			this.refreshSunInfo(regionId, callback);
		}
	} else {
		this.refreshSunInfo(regionId, callback);
	}
};

/*
 * 获取5日内天气系数
 */
gm.ngi.weathers.weathersAdpater.prototype.refreshSunInfo = function(regionId,callback) {
	var list = [],that=this;
	this.sdk.getSuninfo(regionId, 0, 5, function(d) {
		var newList = [];
		if (d.succeeded && d.data) {
			list = d.data.data.city[0].days.day;
			
			if (list && list.length > 0) {
				for ( var i = 0, j = list.length; i < j; i++) {
					var newItem = that.formatSunInfoModel(list[i]);
					if(i == 0 && newItem) {
						newItem.Date = that.getFriendDate(newItem.Date);
					}
					newItem && newList.push(newItem);
				}
				that.writeSunInfoToDS(regionId, newList);
			}
		}
		callback && callback(newList);
	});
};

/*
 * 获取农历信息
 */
gm.ngi.weathers.weathersAdpater.prototype.getLunarcal = function(callback) {
	var list = [],that=this;
	this.sdk.getLunarcal(0, 5, function(d) {
		var newList = [];
		if (d.succeeded && d.data) {
			list = d.data.data.days.day;
			
			if (list && list.length > 0) {
				for ( var i = 0, j = list.length; i < j; i++) {
					var newItem = that.formatLunarcalModel(list[i]);
					newItem && newList.push(newItem);
				}
				//that.writeSunInfoToDS(regionId, newList);
			}
		}
		callback && callback(newList);
	});
};

$unit.ns("gm.ngi.weathers.WeatherForcast");
/*
 * 天气预报实体类
 */
gm.ngi.weathers.WeatherForcast = function() {
	this.date = 0;
	this.weatherOfDay = {};
	this.weatherOfNight = {};
	this.lunarInfo = {};
	this.sunInfo = {};
	this.indices = {};
};
$unit.ns("gm.ngi.weathers.WeatherInfo");
/*
 * 天气预报详细实体类
 */
gm.ngi.weathers.WeatherInfo = function() {
	this.state = 0;
	this.stateIcon = "";
	this.temperature = "";
	this.windPower = "";
	this.windDirection = "";
	this.stateBackground = "";
};

/*
 * 天气指数详细实体类
 */
$unit.ns("gm.ngi.weathers.WeatherIndex");
gm.ngi.weathers.WeatherIndex = function() {
	this.Name = "";
	this.Level = "";
	this.Description = "";
};

/*
 * 天气指数实体类
 */
$unit.ns("gm.ngi.weathers.WeatherIndices");
gm.ngi.weathers.WeatherIndices = function() {
	this.Date = "";
	//gm.ngi.weathers.WeatherIndex array.
	this.Indices = [];

};

$unit.ns("gm.ngi.weathers.SunInfo");
gm.ngi.weathers.SunInfo = function() {
	this.Date = "";
	this.Sunrise = "";
	this.Sunset = "";
};


$unit.ns("gm.ngi.weathers.LunarInfo");
gm.ngi.weathers.LunarInfo = function() {
	this.Date = "";
	this.Year = "";
	this.Month = "";
	this.Day = "";
	this.SolarTerm = "";
};

