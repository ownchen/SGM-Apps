    
    var DianPingUrlSign = {
    	appKey:"519056196",
    	appSecret:"fd4a029a424245b88e6b74fd917a59d1",
    };
    
    var DianPingURLConfig = {
    		findBusinesses:"http://api.dianping.com/v1/business/find_businesses",
    		findBusinessesByCoordinate:"http://api.dianping.com/v1/business/find_businesses_by_coordinate",
    		findBusinessesByRegion:"http://api.dianping.com/v1/business/find_businesses_by_region",
    		getCitiesWithBusiness:"http://api.dianping.com/v1/metadata/get_cities_with_businesses",
    		getCategoriesWithBusinesses:"http://api.dianping.com/v1/metadata/get_categories_with_businesses",
    		getSingleBusiness:"http://api.dianping.com/v1/business/get_single_business",
    		getRecentReviews:"http://api.dianping.com/v1/review/get_recent_reviews",
    		getRegionsWithBusinesses:"http://api.dianping.com/v1/metadata/get_regions_with_businesses",
    		
    };
  
    var URLGenerate = function(url,param){
    	var paramArray = new Array();
    	for(i in param){
    		if(paramArray.length!=0&&param[i]!=null){
    			paramArray.push("&");
    		}
    		if(param[i]!=null){
    			paramArray.push(i);
        		paramArray.push("=");
        		paramArray.push(param[i]);
    		}
    		
    	}
    	if(paramArray.length!=0){
			paramArray.push("&");
    	}
    	//add appKey
		paramArray.push("appkey="+DianPingUrlSign.appKey);
		paramArray.push("&sign="+GenerateSign(param));
    	
    	paramArray.unshift("?");
    	//added URL
    	paramArray.unshift(url);
    	
    	var url = encodeURI(paramArray.join(""));
    	
    	return url;
    };
    	
    var GenerateSign =  function(param){
    	// 对参数名进行字典排序
        var array = new Array();
        for(var key in param)
        {
        	if(param[key]!=null){
        		array.push(key);
        	}
        }
        array.sort();
        // 拼接有序的参数名-值串
        var paramArray = new Array();
        paramArray.push(DianPingUrlSign.appKey);
        for(var index in array)
        {
        	var key = array[index];
   	    	paramArray.push(key + param[key]);
        }
        paramArray.push(DianPingUrlSign.appSecret);
        
     // SHA-1编码，并转换成大写，即可获得签名
        var shaSource = paramArray.join("");
        var sign = new String(SHA1(shaSource)).toUpperCase();
        console.log("sign = "+sign);
        return sign;
    };
    