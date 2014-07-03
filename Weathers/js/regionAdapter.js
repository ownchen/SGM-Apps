$unit.ns("gm.ngi.weathers.regionAdapter");
gm.ngi.weathers.regionAdapter = function() {
	this.ds = gm.ngi.weather.dataStorage;
	this.sdk = new gm.ngi.weathersdk.WeatherApi();
	this.provinceStr="";
	this.writeToDS = function(list, provinceid) {
		var path = this.ds.storageKeys.getProvinces;
		if (provinceid)
			path = path + "_" + provinceid;
		this.ds.writeObject(path, list);
	};
	this.readFromDS = function(provinceid) {
		var path = this.ds.storageKeys.getProvinces;
		if (provinceid)
			path = path + "_" + provinceid;
		var list = this.ds.readObject(path);
		if (list)
			return list;
		return 0;
	};
};

gm.ngi.weathers.regionAdapter.prototype.className = "gm.ngi.weathers.regionAdapter";
// 从服务器加载省列表
gm.ngi.weathers.regionAdapter.prototype.generateProvinces = function() {
	var item = {}, that = this;
	that.provinceStr="";
	this.sdk.getCnProvinces(function(ar) {
		if (ar.succeeded) {
			item = ar.data;
			var ps = [];
			for ( var p in item.data.provinces.province) {
				ps.push({
					provinceId : item.data.provinces.province[p].id,
					provinceName : item.data.provinces.province[p].name
				});
				that.provinceStr+=item.data.provinces.province[p].name+",";
			}
			that.writeToDS(ps);
		}
	});
};
// 从本地缓存读取省列表
gm.ngi.weathers.regionAdapter.prototype.getProvinces = function() {
	var list = this.readFromDS();
	return list;
};
// 生成市，区数据，并将所有的ID和名称保存起来
gm.ngi.weathers.regionAdapter.prototype.generateRegions = function() {
	var list = this.getProvinces();
	var that = this;
	if (list) {
		var ps = [];
		var ns = [];
		for ( var i in list)
			ps.push(list[i].provinceId);
		for ( var i in list)
			{
				this.generateRegionsByPID(list[i].provinceId, function(pid, names) {
					var pi=-1;
					if(ps.length>0)
					{
						for(var j=ps.length-1;j>=0;j--)
						{
							if(ps[j]==pid)
							{
								pi=j;
								break;
							}
						}	
						if(pi!=-1)
							ps.splice(pi,1);
					}
					for ( var j in names)
						ns.push(names[j]);
					that.writeToDS(names, pid);
					if (ps.length == 0) {
						that.writeToDS(ns, "-1");
					}
				});
			}
	}
};
// 获取省份下的城市列表
gm.ngi.weathers.regionAdapter.prototype.getCities = function(provinceId,
		callback) {
	this.sdk.getCnCities(provinceId, function(ar) {
		if (ar.succeeded) {
			var item = ar.data;
			var cs = [];
			if (item && item.data && item.data.cities && item.data.cities.city
					&& item.data.cities.city.length > 0) {
				for ( var i in item.data.cities.city) {
					var cityid = item.data.cities.city[i].id;
					var cityname = item.data.cities.city[i].name;
					cs.push(cityid + "_" + cityname);
				}
			}
			if (callback)
				callback(provinceId, cs);
		}
	});
};
// 获取市区下的县列表
gm.ngi.weathers.regionAdapter.prototype.getCnDistricts = function(cityid, cityname, callback) {
	this.sdk.getCnDistricts(cityid, function(ar) {
		if (ar.succeeded) {
			var item = ar.data;
			var cs = [];
			if (item && item.data && item.data.districts
					&& item.data.districts.district
					&& item.data.districts.district.length > 0) {
				for ( var j in item.data.districts.district) {
					var disid = item.data.districts.district[j].id;
					var disname = item.data.districts.district[j].name;
					cs.push(disid + "_" + disname);
				}
			}
			if (callback)
				callback( cityid, cityname, cs);
		}
	});
};
// 获取某个省下的市，区数据 callback: pid:省编号 names:省，市的编号和名称
gm.ngi.weathers.regionAdapter.prototype.generateRegionsByPID = function(provinceId, callback) {
	var tps=[];
	var that=this;
	this.getCities(provinceId, function(pid, cs) {
		var ps = [];
		var cids=[];
		if(cs&&cs.length>0)
		for(var i in cs)
		{
			var cid=cs[i].substring(0, cs[i].indexOf("_"));
			var cname=cs[i].substring(cs[i].indexOf("_")+1);
			cids.push(cid);
			var p={
					regionId : cid,
					regionName : cname,
					cityId : cid,
					cityName : cname,
					districtId : "",
					districtName : ""
				};
			ps.push(p);
			tps.push(p);
		}
		for(var i in ps)
		{			
			that.getCnDistricts(ps[i].cityId, ps[i].cityName, function(cid,cname,cs){
				if(cs&&cs.length>0)
					for(var i in cs){
					var did=cs[i].substring(0, cs[i].indexOf("_"));
					var dname=cs[i].substring(cs[i].indexOf("_")+1);
					var p={
							regionId : did,
							regionName : dname,
							cityId : cid,
							cityName : cname,
							districtId : did,
							districtName : dname
						};
				if(that.provinceStr=="")
				{
					var ll =that.getProvinces();
					for(var pp in ll)
						that.provinceStr+=ll[pp].provinceName+",";
				}	
				if(that.provinceStr.indexOf(p.cityName+",")==-1)
					p.regionName=p.cityName+"."+gm.ngi.weathers.utils.transferCityName(p.districtName);
					p.districtName=gm.ngi.weathers.utils.transferCityName(p.districtName);
					tps.push(p);
				}
				var pi=-1;
				if(cids.length>0)
				for(var i=cids.length-1;i>=0;i--)
				{
					if(cids[i]==cid)
					{
						pi=i;
						break;
					}
				}
				if(pi!=-1)
					cids.splice(pi,1);
				if(cids.length==0&&callback)
					callback(provinceId,tps);
			});
		}
	});
};
// 根据省ID 获取相应的市区信息
gm.ngi.weathers.regionAdapter.prototype.getRegions = function(provinceId) {
	var list = this.readFromDS(provinceId);
	return list;
};
// 根据关键字获取相应的 Region信息
gm.ngi.weathers.regionAdapter.prototype.findRegions = function(searchTerm) {
	var list = this.readFromDS("-1");
	var ps = [];
	if (list && list.length > 0)
		for ( var p in list)
			{
			if (list[p].regionName.indexOf(searchTerm) > -1)
				ps.push(list[p]);
			}
	return ps;
};
// 根据ID获取相应的Region信息
gm.ngi.weathers.regionAdapter.prototype.getRegion = function(regionid) {
	var list = this.readFromDS("-1");
	var region = null;
	if (list && list.length > 0)
		for ( var p in list)
			if(list[p].regionId==regionid)
				{
					region=list[p];
					break;
				}
	
	return region;
};