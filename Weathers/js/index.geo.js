function GeoUtils(){
	
	function onFail(){
		gm.ngi.weathers.defaultPage.showProgressBox("定位失败，请手动选择城市");
		setTimeout(function(){
			gm.ngi.weathers.defaultPage.closeProgressBox();
			callbackFailure();
		}, 1000);
	}
	
	function getCoords(){
		tracer.info("getCurrentPosition", "geo");
    	gm.info.getCurrentPosition(function(pos){
    		tracer.info("getCurrentPosition success", "geo");
    		var divider = 3600 * 1000;
    		var lat = pos.coords.latitude / divider;
    		var lng = pos.coords.longitude / divider;
    		tracer.info("getCurrentPosition coords: " + lat + ", " + lng , "geo");
    		var coords = {latitude:lat, longitude:lng};
    		getCityNameByGeo(coords);
    	}, 
    	function(){
    		tracer.info("getCurrentPosition failed", "geo");
    		onFail();
    	}, 
    	{timeout:15});
    }
    
    function getCityNameByGeo(coords){
    	tracer.info("getCityNameByGeo", "geo");
    	var WAPI = new gm.ngi.weathersdk.WeatherApi();
    	 WAPI.apiConnectionError = function(){
    		tracer.info("getCityNameByGeo apiConnectionError", "geo");
    		onFail();
    	};
         WAPI.apiServerError = function(){
    		tracer.info("getCityNameByGeo apiServerError", "geo");
    		onFail();
    	};
         
         var a = coords.longitude + "," + coords.latitude;
         WAPI.getCoordinate(a, function (d) {
        	 var city_name = null; 
             if (d && d.data && d.data.result && d.data.result.data && d.data.result.data.province_name) {
                 city_name = d.data.result.data.city_name;
                 if (!city_name){
                     city_name = d.data.result.data.province_name;
                 }
             }
             if (city_name){
          		 tracer.info("getCityNameByGeo cityname found: " + city_name, "geo");
                 city_name = city_name.replace("省", "").replace("自治区", "").replace("市", "").replace("县", "");
                 gm.ngi.weathers.defaultPage.closeProgressBox();
                 callbackSuccess(city_name);
             }
             else {
         		tracer.info("getCityNameByGeo cityname not found: " + JSON.stringify(d), "geo");
        		onFail();
             }
         });

    }
    
	this.LocateCity = function(success, failure){
		callbackSuccess = success;
		callbackFailure = failure;
    	this.showProgressBox("正在定位...");
    	getCoords();
	};
	
	var callbackSuccess;
	var callbackFailure;

}