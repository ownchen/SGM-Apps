$unit.ns("gm.ngi.weathers.userRegionAdpater");
gm.ngi.weathers.userRegionAdpater = function() {
	this.ds = gm.ngi.weather.dataStorage;
	this.sdk = new gm.ngi.weathersdk.WeatherApi();
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
		if (list) {
			return list;
		}
		return 0;
	};
};

gm.ngi.weathers.userRegionAdpater.prototype.className = "gm.ngi.weathers.userRegionAdpater";
//添加用户选择的区域ID和名称
gm.ngi.weathers.userRegionAdpater.prototype.add = function(region) {
	var list=this.getAll();
	if(!list||list.length==0)
		list=[];
	var flg=false;
	for(var p in list)
		if(list[p].regionId==region.regionId)
			{
			flg=true;
			break;
			}
	if(flg)
		return;
	if(list.length==47)
	{
		list[0]=region;
	}
	else		
		list.push(region);
	this.writeToDS(list,"users");
};
//移除用户选择的区域
gm.ngi.weathers.userRegionAdpater.prototype.remove = function(regionId) {
	var list=this.getAll();
	var def=this.getDefault();
	if(!list||list.length==0)
		list=[];
	var pi=-1;
	if(list.length>0)
		for(var i=list.length-1;i>=0;i--)
		{
			if(list[i].regionId==regionId)
			{
				pi=i;
				break;
			}
		}
	if(pi=="-1")
		return;
	if(list.length==1)
	{
		gm.ngi.msgbox.show("请至少保留一个城市.");
	}
	else
		list.splice(pi,1);
	if(def&&def.regionId==regionId&&list.length>0)
	{
		this.setDefault(list[0]);
	}	
	this.writeToDS(list,"users");
};
//获取用户存储的所有区域
gm.ngi.weathers.userRegionAdpater.prototype.getAll=function(){
	var list=this.readFromDS("users");
	if(list&&list.length>0&&list[0])
	{
		for(var p in list)
		{
			if(list[p]&&list[p].regionName.indexOf(".")>-1)
				list[p].regionName=list[p].districtName;
		}	
	}
	else
		list=[];
	return list;
};
//获取用户当前区域
gm.ngi.weathers.userRegionAdpater.prototype.getDefault=function(){
	var list=this.readFromDS("default");
	if(list)
	{
		if(list.regionName.indexOf(".")>-1)
			list.regionName=list.districtName;
	}
	else
		list=null;
	return list;
};
//设置用户设置的当前区域
gm.ngi.weathers.userRegionAdpater.prototype.setDefault=function(region){
	this.writeToDS(region,"default");
};