/* Utility Class */
var ALLREGION = "全部区域";

//Tracking 点击量
Tracking={
	BtnClick:function(buttonName){
		s.linkTrackVars='prop1,prop2'; 
		s.prop1=buttonName;//设置 prop1 为 button 名称 
		s.prop2=buttonName+s.pageName;
		//设置 prop2 为 button 名称+页面名称 
		s.tl(this,'o','click_button');
	},
};



var ALLCATEGORY = "全部频道";

    var Utility = {
    	currentLocationCity:"",
    	currentSearchCity:"",
    	searchConditional:{},
    	currentSearch:{},
    	currentPoint:{},
    	currentBaiduPoint:{},
    	currentKeywordSearch:false,
    	currentKeyword:{},
        currentView: {},
        currentShopPoint:"",
        currentShopType:"",
        currentRadiusId:{},
        currentSortId:{},
        currentPage:1,
        currentAddress:"",
        searchStatus : true,
        hideMap:true,
        marker:"",
        flagModel:function(func){
             
        },
        searchInfo:function(func,endPoint){
        	Utility.getCurrentPoint(function(){
        		getRouthPathInfo(func,Utility.currentPoint,endPoint);
        	});
        },
        search : function (func,endPoint) {
        	Utility.getCurrentPoint(function(){
        		getRouthPath(func,Utility.currentPoint,endPoint);
        	});        	
        },
        maxRows:function(){
        	if(Utility.currentPage==1){
        		return 6;
        	}else{
        		return 3;
        	}
        },
        addressLength:function(address){
        	var sumLength = 0;
        	if(address){
        		var word = address.split("");
            	for(y in word){
            		if(word[y].match(/[^\x00-\x80^i^l^j]/ig)){
            			sumLength+=4;
            		}else if(word[y].match(/[ilj]/)){
            			sumLength+=2;
            		}else{
            			sumLength+=2;
            		}
            	}
        	}else{
        		sumLength = 0;
        	}
        	return sumLength;
        },
        locationOutput:function(){
        	//if(Utility.currentLocationCity==""){
        		//return "没有找到您所在的区域对应的城市";
        	//}else{
        	return "所在城市："+(Utility.currentLocationCity);
        	//}
        },
        prevView: new Array(),
        currentBox: {},
        //currentSearchInput:{},
        //saveFavourites: function (data) {},
        currentShopInfo:'',
        currentRankType:'',
        currentReviewPage:{},
        favoritesPath:"dir/favorites/myshops.txt",
        historyPath:"dir/history/mykeywords.txt",
        localPath:"dir/history/localstorage.txt",
        apiKey:"8f7b1cf11fbb4d1a84c6aed032ed17fa",
        initConditionalInput:function(){
        	$("#areaInput").html("全部区域");
        	$("#typeInput").html("全部频道");
        	$("#sortInput").attr("sortid",'1').html("默认排序");
        	$("#conRegionBtn>div").html("全部区域");
        	$("#conCategoryBtn>div").html("全部频道");
        	$("#conSortBtn").attr("sortid","1");
        	$("#conSortBtn>div").html("默认排序");
        	$("#SelectLocationList li").removeClass("selectedWhite");
        	$($("#SelectLocationList li")[0]).addClass("selectedWhite");
        	$("#SelectTypeList li").removeClass("selectedWhite");
        	$($("#SelectTypeList li")[0]).addClass("selectedWhite");
        	$("#SelectPriceList li").removeClass("selectedWhite");
        	$($("#SelectPriceList li")[0]).addClass("selectedWhite");
        	$("#SelectSortList li").removeClass("selectedWhite");
        	$($("#SelectSortList li")[0]).addClass("selectedWhite");
        	Utility.searchConditional = {};
        },
        getCurrentPoint:function(func){
        	//if(!GetPointBlock){
        		//GetPointBlock = true;
            	var point = {};
            	gm.info.getCurrentPosition(gps_success,gps_error,{timeout:15000});
            	function gps_success( position ){
        			lat = position.coords.latitude/3600000;
    		        lng = position.coords.longitude/3600000;
    		        /*
    		        //local NGI
    		        lat = position.coords.latitude/2560/3600;
    		        lng = position.coords.longitude/2560/3600;
    		        */
    		        point.lng = lng;
    		        point.lat = lat;
    		        //GPS换算百度地图坐标
    		        //var gpsPoint = new BMap.Point(lat,lng)
    		        
    		        //BMap.Convertor.translate(gpsPoint,0,function(point){
    		        Utility.currentPoint = {lng:point.lng,lat:point.lat};
    		        
    		        typeof func =="function"&&func(point);
    		        //}); 
    		    }
            	function gps_error(error){
            		Log("GPS Error");
            	}
        },
        getJson:function(responseText){
			var xmlDom = (new DOMParser()).parseFromString(responseText,"text/xml");
			return eval('('+xml2json(xmlDom,"")+')');
        },
        popflag:[true,true,true,true,true,true],
        falgUp:function(x){
        	for(i in this.popflag){
        		this.popflag[i] = true;
        	}
        	this.popflag[x] = false;
        },
        flagDown:function(){
        	for(i in this.popflag){
        		this.popflag[i] = true;
        	}
        },
        transReview:function(no){
        	switch(no){
        		case "0": return "差";
        		case "1": return "一般";
        		case "2": return "好";
        		case "3": return "很好";
        		case "4": return "非常好";
        	}
        },
        writeFile : function (v, path) {
            //var result = gm.io.writeFile(path || this.favoritesPath, v);
        	gm.io.writeFile(path || this.favoritesPath, encodeURIComponent(v));
        },
        readFile : function (path) {
            return decodeURIComponent(gm.io.readFile(path || this.favoritesPath)) || "[]";
        },
        findFavorites: function(business_id){
        	var json = JSON.parse(this.readFile());
        	for(var index in json)
        		if (json[index].business_id == business_id){
        			return json[index];
        		}
        	return null;
        },
        saveFavorites: function(data){
        	if (this.findFavorites(data.business_id))
        		this.updateFavorites(data);
        	else
        		this.addFavorites(data);
        },
        updateFavorites: function(data){
        	var json = JSON.parse(this.readFile());
        	
        	for(var index in json){
        		if (data.business_id != json[index].business_id){
        			for(var s in json[index])
        				json[index][s] = data[s]; 
        		}
        	}
        	this.writeFile(JSON2.stringify(json));
        },
        addFavorites : function (data) {
            var json = this.readFile() || "[]";
            data.date = "'"+new Date()+"'";
            //data.city = //"'"+encodeURI(encodeURI($("#curCity").html()))+"'";
            json = JSON.parse(json);
            json.unshift(data);
            this.writeFile(JSON2.stringify(json));
        },
//        addLog:function(info){
//        	var data = {
//            		info:info,	
//            	};
//        	$("#textBox").html(info+"</br>"+$("#textBox").html());
//        	/*var json = this.readFile("dir/debug/log.txt") || "[]";
//            data.date = "'"+new Date()+"'";
//            json = JSON.parse(json);
//            json.push(data);
//            this.writeFile(JSON2.stringify(json),"dir/debug/log.txt");
//            */
//        },
        deleteFavorites : function (business_id) {
        	var json = JSON.parse(this.readFile());
        	
        	var arr = new Array();
        	for(var index in json){
        		business_id != json[index].business_id && arr.push(json[index]);
        	}
        	this.writeFile(JSON2.stringify(arr));
        },
        clearFavorites:function(){
        	this.writeFile('');
        },
        getFavoriteShops:function(func){
        	var json = this.readFile()||"[]";
        	json = JSON.parse(json);
//        	Utility.currentPage = 0;
        	showFavorShopList(json);
        	typeof func=="function"&&func(json);
        },
        getHistoryKeyWord:function(){
        	var json = this.readFile(Utility.historyPath)||"[]";
        	json = JSON.parse(json);
        	return json;
        },
        findHistoryKeyWord: function(keyword){
        	var json = JSON.parse(this.readFile(Utility.historyPath));
        	for(var index in json)
        			if (json[index].KeyWord.toLowerCase() == keyword.toLowerCase()) 
            			return json[index];
            	return {};
        },
        saveHistoryKeyWord: function(data){
        	if (this.findHistoryKeyWord(data.KeyWord).KeyWord)
        		this.updateHistoryKeyWord(data);
        	else
        		this.addHistoryKeyWord(data);
        },
        updateHistoryKeyWord: function(data){
        	var json = JSON.parse(this.readFile(Utility.historyPath));
        	
        	for(var index in json){
        		if (data.KeyWord.toLowerCase() == json[index].KeyWord.toLowerCase()){
        				json[index].KeyWord = data.KeyWord; 
        				json[index].Times = parseInt(json[index].Times)+1;
        		}
        	}
        	//重新排序
        	for(var i=0;i<(json.length-1);i++){
        		for(var j=i;j<(json.length-1);j++){
	        		if(json[j].Times<json[j+1].Times){
	        			var obj =json[j];
	        			json[j] = json[j+1];
	        			json[j+1] = obj;
	        		}
        		}
        	}
        	this.writeFile(JSON2.stringify(json),Utility.historyPath);
        },
        addHistoryKeyWord : function (data) {
            var json = this.readFile(Utility.historyPath) || "[]";
            data.Times = "1";
            json = JSON.parse(json);
            json.unshift(data);
            this.writeFile(JSON2.stringify(json),Utility.historyPath);
        },
        saveLocalStorage : function (data) {
            var json = new Array();
            json.push(data);
            this.writeFile(JSON2.stringify(json),Utility.localPath);
        },
        getLocalStorage : function(){
        	var json = this.readFile(Utility.localPath)||"[]";
        	json = JSON.parse(json);
        	return json;
        },
        deleteHistoryKeyWord : function (Keyword) {
        	var json = JSON.parse(this.readFile(Utility.historyPath));
        	
        	var arr = new Array();
        	for(var index in json){
        		Keyword != json[index].KeyWord && arr.push(json[index]);
        	}
        	this.writeFile(JSON2.stringify(arr),Utility.historyPath);
        },
        clearHistoryKeyWord:function(){
        	var arr = new Array();
        	this.writeFile(JSON2.stringify(arr),Utility.historyPath);
        },
        showHistoryKeyWord:function(json){
        	
        	if(json){
        		var htmlStr = new Array();
        		//htmlStr.push('<div class="sLeftArrow"><a class="sUpArrow"></a><a class="sDownArrow"></a></div>');
        		
        		//htmlStr.push('<div id="keywordsList" class="historyscrollable"><div class="items"></div></div><div id="clearHistoryBtn">清除历史记录</div>');
        		$("#keywordsList .items").html(htmlStr.join(''));
        		
        		
        		htmlStr = new Array();
        		for(x in json){
        			if(x%3==0){
        				if(json.length>3){
        					htmlStr.push("<ul class='searchscorllUl'>");
        				}else{
        					htmlStr.push("<ul>");
        				}
        				
        			}
        			htmlStr.push('<li><div class="keywords">'
        					+json[x].KeyWord+'</div><span class="deleteHistoryBtn" keyword="'
        					+json[x].KeyWord+'"><span></li>');
        			if(x%3==2||x==json.length){
        				htmlStr.push("</ul>");
        			}
        		}
        		
        		
        		$("#keywordsList .items").html(htmlStr.join(""));
//        		$(".historyscrollable").scrollable({disabled:".disabled",vertical:true,mousewheel:true,next:".sDownArrow",prev:".sUpArrow"});
//        		if(json.length>3){
//        			//$(".sLeftArrow").css("visibility","visible");
//        		}else{
//        			$(".sLeftArrow").css("visibility","hidden");
//        		}
        		/*if(json.length==1){
        			$("#keywordsList .items").addClass("items1");
        		}else if(json.length==2){
        			$("#keywordsList .items").addClass("items2");
        		}*/
        	}
        	$("#clearHistoryBtn").mouseup(function(){
        		$(this).removeClass("mousedown");
        		Controler.popUp_bg(Popup.clearAllHistory);
            }).mousedown(function(){
            	$(this).addClass("mousedown");
            });
        	$("#history_popup .keywords").mouseup(function(){
        		$(this).removeClass("mousedown");
            	$("#AdvancedSearchBox").attr("value",$(this).html());
            	Utility.currentKeyword = $(this).html();
            	Controler.popDown();
    			Utility.flagDown();
    			$("#historyBtn").removeClass("selected");
            }).mousedown(function(){
            	$(this).addClass("mousedown");
            });
        	$(".deleteHistoryBtn").mouseup(function(){
        		$(this).removeClass("mousedown");
            	Utility.deleteHistoryKeyWord($(this).attr("keyword"));
            	Utility.showHistoryKeyWord(Utility.getHistoryKeyWord());
            }).mousedown(function(){
            	$(this).addClass("mousedown");
            });
        },
        phone:function(number,func){
        	Tracking.BtnClick("电话拨号按钮");
        	options = new Object(); 
        	options.phone = number.toString().replace(/[^\d]/g,'').toString(); 
        	options.callParameters = new Object(); 
        	options.callParameters.phoneSource = gm.constants.callSource.BLUETOOTH; 
        	options.callParameters.noiseSuppression = gm.constants.noiseSuppression.STANDARD; 
        	gm.phone.dialPhoneNumber(function(){
        		//phone success
        		typeof func=="function"&&func();
        	}, function(){
        		//phone failure
        		typeof func=="function"&&func();
        	}, options);
        },
        //计算已知经纬度两点之间的距离
        /*
        getDistance : function( lat1,  lng1){
        	var point = Utility.currentPoint;
        		var lat2 = point.lat;
            	var lng2 = point.lng;
            	function rad(d)
                {
                return d * Math.PI / 180.0;
                }
    	        if( ( Math.abs( lat1 ) > 90  ) ||(  Math.abs( lat2 ) > 90 ) ){
    	        	
    	        	return null;
    	        }
    	        if( ( Math.abs( lng1 ) > 180  ) ||(  Math.abs( lng2 ) > 180 ) ){
    	
    	        	
    	        	return null;
    	        }
    	        var radLat1 = rad(lat1);
    	        var radLat2 = rad(lat2);
    	        var a = radLat1 - radLat2;
    	        var  b = rad(lng1) - rad(lng2);
    	        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    	        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    	        s = s *6378.137 ;// EARTH_RADIUS;
    	        s = Math.round(s * 10000) / 10;
    	        return s;
        	
        }
        */
    }; 