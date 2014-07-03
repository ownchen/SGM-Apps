// 和远程服务调用相关的封装在此
ibuickApp.factory('remoteServiceFactory', function($http, md5, gmInfoFactory) {
	
    var factory = {};
    var iBuickServiceUrl = "http://apis.sgmlink.com";
    
    /*
    // 供参考的老代码
    factory.getGasStations = function() {
    	return gmInfoFactory.getLatlng().then(function(pos) {
    		var latitude  = pos.coords.latitude;
    		var longitude = pos.coords.longitude;
    		
    		var sort = 1;
        	var pagenum = 1;
        	var output = 'json';
        	var channel = 'buick';
        	var key = '1o1uGoO2UOd0rCfxIMAX9KY36ruaTPIrXCGkfD7Q';
        	var url = 'http://telematics.autonavi.com/ws/value_added/gas/query/';

        	var signstr = "" + latitude + longitude + "@" + key;
        	var sign = md5.createHash(signstr);

        	url += "?latitude=" + latitude + "&longitude=" + longitude + "&sort=" + sort;
        	url += "&pagenum=" + pagenum + "&output=" + output;
        	url += "&channel=" + channel;
        	// sing必须要是大写字母
        	url += "&sign=" + sign.toUpperCase();

        	return $http.get(url);
        }).then(function(response) {
    		if(response.data.ats.code === "1") {
    			if(response.data.ats.total > 0) {
    				if(response.data.ats.gaslist.item.length > 0) {
        				return response.data.ats.gaslist.item;
        			}
    			}
    		}
    		return {};
    	});
    };
    */
    // 从高德获取加油站信息
    factory.getGasStations = function(lng, lat, pageno, sortfliter) {
    	
    	var latitude  = lat;
		var longitude = lng;
		
		var sort    = sortfliter; // 0 or 1
    	var pagenum = pageno;
    	var output  = 'json';
    	var channel = 'buick';
    	var key = '1o1uGoO2UOd0rCfxIMAX9KY36ruaTPIrXCGkfD7Q';
    	var url = 'http://telematics.autonavi.com/ws/value_added/gas/query/';

    	var signstr = "" + latitude + longitude + "@" + key;
    	var sign = md5.createHash(signstr);

    	url += "?latitude=" + latitude + "&longitude=" + longitude + "&sort=" + sort;
    	url += "&pagenum=" + pagenum + "&output=" + output;
    	url += "&channel=" + channel;
    	
    	url += "&sign=" + sign.toUpperCase();
    	
    	return $http.get(url);
    };
    
    // 获取油品列表
    factory.getGasTypeList = function() {
    	
    	var output  = 'json';
    	var channel = 'buick';
    	var key = '1o1uGoO2UOd0rCfxIMAX9KY36ruaTPIrXCGkfD7Q';
    	var url = 'http://telematics.autonavi.com/ws/value_added/gas/gastype/';
    	
    	var signstr = "" + channel + "@" + key;
    	var sign = md5.createHash(signstr);
    	
    	url += "?channel=" + channel;
    	url += "&output=" + output;
    	url += "&sign=" + sign.toUpperCase();
    	
    	return $http.get(url);
    };
    
    //从高德获取当前城市
    factory.getCurrentCity = function(lng, lat) {
    	
    	var latitude  = lat;
		var longitude = lng;
		
    	var output  = 'json';
    	var channel = 'buick';
    	var key = '1o1uGoO2UOd0rCfxIMAX9KY36ruaTPIrXCGkfD7Q';
    	var url = 'http://telematics.autonavi.com/ws/mapapi/geo/reversecode/';

    	var signstr = "" + longitude + latitude + "@" + key;
    	var sign = md5.createHash(signstr);

    	url += "?latitude=" + latitude + "&longitude=" + longitude + "&output=" + output;
    	url += "&channel=" + channel;

    	url += "&sign=" + sign.toUpperCase();    	
    	
    	return $http.get(url);
    };
    
    //从高德获取城市list
    factory.getCityList = function() {
    	
    	var output  = 'json';
    	var channel = 'buick';
    	var adcode = '010';
    	var key = '1o1uGoO2UOd0rCfxIMAX9KY36ruaTPIrXCGkfD7Q';
    	//var url = 'http://telematics.autonavi.com/ws/mapapi/trafficinfo/citylist/';
    	var url = 'http://telematics.autonavi.com/ws/mapapi/district/search/';
    	
    	var signstr = "" + adcode + "@" + key;
    	var sign = md5.createHash(signstr);

    	url += "?adcode=" + adcode + "&output=" + output;
  
    	url += "&sign=" + sign.toUpperCase();   
    	
    	return $http.get(url);
    };
    
    // 从高德获取路径
    // X为经度，Y为纬度
    factory.getPathArray = function(fromX, fromY, toX, toY) {
    	
    	var output  = 'json';
    	var channel = 'buick';
    	var key = '1o1uGoO2UOd0rCfxIMAX9KY36ruaTPIrXCGkfD7Q';
    	var url = 'http://telematics.autonavi.com/ws/mapapi/routing/';

    	var signstr = "" + fromX + fromY + toX + toY + "@" + key;
    	var sign = md5.createHash(signstr);

    	url += "?fromX=" + fromX + "&fromY=" + fromY;
    	url += "&toX=" + toX + "&toY=" + toY;
    	url += "&coor_need=true&output=" + output;
    	url += "&channel=" + channel;
    	url += "&sign=" + sign.toUpperCase();
    	
    	return $http.get(url);
    };
    
    // 从高德获取加油站信息
    factory.getParkings = function(lng, lat, pageno, sortfliter) {
    	
    	var latitude  = lat;
		var longitude = lng;
		
		var sort    = sortfliter; // 0 or 1
    	var pagenum = pageno;
    	var output  = 'json';
    	var channel = 'buick';
    	var key = '1o1uGoO2UOd0rCfxIMAX9KY36ruaTPIrXCGkfD7Q';
    	var url = 'http://telematics.autonavi.com/ws/value_added/parking/list-detail/';

    	var signstr = "" + channel + longitude +latitude+ "@" + key;
    	var sign = md5.createHash(signstr);

    	url += "?latitude=" + latitude + "&longitude=" + longitude + "&sort=" + sort;
    	url += "&pagenum=" + pagenum + "&output=" + output;
    	url += "&channel=" + channel;

    	url += "&sign=" + sign.toUpperCase();
    	
    	return $http.get(url);
    };
    
    /*
    factory.searchKeywords = function(citicode, keywords) {
    	var city  = citicode;
    	var words = keywords;
    	
    	var output  = 'json';
    	var channel = 'buick';
    	var key = '1o1uGoO2UOd0rCfxIMAX9KY36ruaTPIrXCGkfD7Q';
    	var url = "http://telematics.autonavi.com/ws/mapapi/suggestion/tips/";
    	
    	var signstr = "" + city + words + "@" + key;
    	var sign = md5.createHash(signstr);
    	
    	url += "?words=" + words + "&output=" + output;
    	url += "&channel=" + channel;
    	
    	if(city != "") {
    		url += "&city=" + city;
    	}

    	url += "&sign=" + sign.toUpperCase();
 
    	return $http.get(url);
    };
    */
    factory.searchKeywords = function(citicode, keywords) {
    	var city  = citicode;
    	var words = keywords;
    	
    	var output  = 'json';
    	var channel = 'buick';
    	var key = '1o1uGoO2UOd0rCfxIMAX9KY36ruaTPIrXCGkfD7Q';
    	var url = "http://telematics.autonavi.com/ws/mapapi/suggestion/tips/";
    	
    	var signstr = "" + city + words + "@" + key;
    	var sign = md5.createHash(signstr);
    	
    	var postData = "words=" + words + "&output=" + output;
    	postData += "&channel=" + channel;
    	
    	if(city != "") {
    		postData += "&city=" + city;
    	}

    	postData += "&sign=" + sign.toUpperCase();
 
    	return $http({
    		url:url,
    		method:"POST",
    		data:postData
    	});
    };
    
    /*
    factory.getLatLngOfAddress = function(keywords) {
    	var address  = keywords;
    	
    	var output  = 'json';
    	var channel = 'buick';
    	var key = '1o1uGoO2UOd0rCfxIMAX9KY36ruaTPIrXCGkfD7Q';
    	var url = "http://telematics.autonavi.com/ws/mapapi/geo/code/";
    	
    	var signstr = "" + address + "@" + key;
    	var sign = md5.createHash(signstr);
    	
    	var postData = "address=" + address + "&output=" + output;
    	postData += "&channel=" + channel;

    	postData += "&sign=" + sign.toUpperCase();
    	
    	return $http({
    		url:url,
    		method:"POST",
    		data:postData
    	});
    };
    */
    
    factory.getLatLngOfAddress = function(keywords) {
    	var address  = keywords;
    	
    	var output  = 'json';
    	var channel = 'buick';
    	var key = '1o1uGoO2UOd0rCfxIMAX9KY36ruaTPIrXCGkfD7Q';
    	var url = "http://telematics.autonavi.com/ws/mapapi/geo/code/";
    	
    	var signstr = "" + address + "@" + key;
    	var sign = md5.createHash(signstr);
    	
    	url += "?address=" + address + "&output=" + output;
    	url += "&channel=" + channel;

    	url += "&sign=" + sign.toUpperCase();
    	
    	return $http.get(url);
    };
    
    // 根据经纬度从SGM获取经销商信息
    factory.getDealersByLat = function(lng, lat) {
    	
    	var latitude  = lat;
		var longitude = lng;
		
    	if(longitude == null) {
    		longitude = 121.59365415573121;
    	}
    	
    	if(latitude == null) {
    		latitude = 31.217425958989562;
    	}

    	var type  = 'json';
    	//var url = iBuickServiceUrl + '/dataquery/rest/api/public/dealerInfo/v2/searchDealerByLat/2/';
    	var url = iBuickServiceUrl + '/dataquery/rest/api/public/dealerInfo/v2/searchDealerByLat/2/';

    	url += longitude + "/" + latitude;
    	url += "?_type=" + type;
    	
    	return $http.get(url);
    };
    
    // 根据城市代码从SGM获取经销商信息
    factory.getDealersByCity = function(citycode) {
		
    	if(citycode === null || citycode === '') {
    		citycode = 3101;
    	}

    	var type  = 'json';
    	//var url = iBuickServiceUrl + '/dataquery/rest/api/public/dealerInfo/v2/searchDealerByCity/2/';
    	var url = iBuickServiceUrl + '/dataquery/rest/api/public/dealerInfo/v2/searchDealerByCity/2/';

    	url += citycode;
    	url += "?_type=" + type;
    	
    	return $http.get(url);
    };
    
    return factory;
});
