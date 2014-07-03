
var initFlag ={
		showShopList : true,
};
var DEFAULT_SHOPLIMIT = 12;

var RequestSend = function(dataCallback,url,funcCallback){
	CurrentAjax.add(function(){
		$.ajax({
		  url:url,
		  success: function(data) {
			  currentData=data;
			  typeof dataCallback =="function"&&dataCallback(data);
		  },
		  timeout:10000,
		  complete:function(jqXHR,status){
			  AjaxComplete(status);
		  }
		});
	});
	CurrentAjax.send();
};

var DianPing = {
    	getNearbySearchResult:function(func,category,radius,sort,page){
    		Utility.currentPage = page;
    		var param = {
    			latitude:Utility.currentPoint.lat,
    			longitude:Utility.currentPoint.lng,
    			category:category,
    			radius:radius,
    			sort:sort,
    			page:page,
    			limit:DEFAULT_SHOPLIMIT,
    			offset_type:1,
    			out_offset_type:1,
    		};
    		var url = URLGenerate(DianPingURLConfig.findBusinessesByCoordinate,param);
    		Utility.currentSearch = {
    				url : DianPingURLConfig.findBusinessesByCoordinate,
    				param:param,
    		};
    		Controler.preloadLayerShow("#content");
    		
    		RequestSend(function(data){
    			Controler.preloadLayerHide("#content");
    			if(data.status=="OK"){
    				if(data.businesses.length>0){
    					showShopList(data);
    				}else{
    					showShopList(null);
    				}
    				typeof func == "function" && func();
    			}
    			
    		},url);
    	},
    	getRankList:function(func,category,page){
    		var sort = 2; //Rank list defind the sort
    		Utility.currentPage = page;
    		var param = {
    				city:Utility.currentSearchCity,
        			category:category,
        			sort:sort,
        			page:page,
        			limit:DEFAULT_SHOPLIMIT,
        		};
        		var url = URLGenerate(DianPingURLConfig.findBusinessesByRegion,param);
        		Controler.preloadLayerShow("#RankinglistSearch");
        		Utility.currentSearch = {
        				url : DianPingURLConfig.findBusinessesByRegion,
        				param:param,
        		};
        		RequestSend(function(data){
        			if(data.status=="OK"){
	    				if(data.businesses.length>0){
	    					showShopList(data);
	    				}else{
	    					showShopList(null);
	    				}
	    				typeof func == "function" && func();
	    			}
        			Controler.preloadLayerHide("#RankinglistSearch");
        		},url);
    	},
    	getCityList:function(func){
    		var url = URLGenerate(DianPingURLConfig.getCitiesWithBusiness,null);
    		Controler.preloadLayerShow("#changeCity_popup");
    		RequestSend(function(data){
    			if(data.status=="OK"){
    				if(data.cities.length>0){
    					showCityList(data);
    				}else{
    					showCityList(null);
    				}
    				typeof func == "function" && func();
    			}
    			Controler.preloadLayerHide("#changeCity_popup");
    		},url);
    	},
		getRegion : function(func) {
			var param = {
		    	city:Utility.currentSearchCity,
		    };
		    var url = URLGenerate(DianPingURLConfig.getRegionsWithBusinesses,param);
		    
		    RequestSend(function(data){
    			if(data.status=="OK"){
    				if(data.cities[0].districts.length>0){
    					showRegion(data);
    				}else{
    					showRegion(null);
    				}
    				typeof func == "function" && func();
    			}
    		},url);
		},
		
		getShopInfo:function(func,shopid){
			var param = {
					business_id:shopid,
	    		};
	    	var url = URLGenerate(DianPingURLConfig.getSingleBusiness,param);
	    	Controler.preloadLayerShow("#SearchResultList");
	    	
	    	RequestSend(function(data){
    			if(data.status=="OK"){
    				if(data.businesses.length>0){
    					showShopInfo(data);
    				}else{
    					showShopInfo(null);
    				}
    				typeof func == "function" && func();
    			}
    			Controler.preloadLayerHide("#SearchResultList");
    		},url);
		},
		getShopReview:function(func,shopid){
			var param = {
				business_id:shopid,
	    	};
	    	var url = URLGenerate(DianPingURLConfig.getRecentReviews,param);
	    	Controler.preloadLayerShow("#user_review_popup");
	    	RequestSend(function(data){
    			if(data.status=="OK"){
    				if(data.reviews.length>=0){
    					showShopReview(data);
    				}else{
    					$("#reviewContainer>h2").css("display","block");
    				}
    				typeof func == "function" && func();
    			}
    			Controler.preloadLayerHide("#user_review_popup");
    		},url);
		},
    	getSubCategory:function(category){
    		var url = URLGenerate(DianPingURLConfig.getCategoriesWithBusinesses);
    		
    		RequestSend(function(data){
    			if(data.status=="OK"){
   					var shopTypeJson = data;
	    			shopTypeList = shopTypeJson.categories;
	    			for(x in shopTypeList){
	    				if(shopTypeList[x].category_name==category){
	    					var subcategoryJson =shopTypeList[x].subcategories;
	    					if(subcategoryJson.length>=0){
	    						showSubCategory(subcategoryJson);
	    					}else{
	    						showSubCategory(null);
	    					}
	    				}
	    			}
   				}
    		},url);
    	},
		conditionalSearch:function(func,page){
			Utility.currentPage = page;
			
			var category = Utility.searchConditional.shoptype;
			var region = Utility.searchConditional.region;
			var sort = Utility.searchConditional.sort;
			
			region==ALLREGION?region=null:region;
			category==ALLCATEGORY?category=null:category;
			var keyboard = Utility.searchConditional.keyword;
			keyboard==''?keyboard=null:keyboard;
			var param = {
		    		city:Utility.currentSearchCity,
		    		region: region,
		    		category: category,
		    		page:page,
		    		limit:DEFAULT_SHOPLIMIT,
		    		keyword: keyboard,
		    		sort: sort,
		    	};
		    var url = URLGenerate(DianPingURLConfig.findBusinesses,param);
		    Utility.currentSearch = {
    				url : DianPingURLConfig.findBusinesses,
    				param:param,
    		};
		    Controler.preloadLayerShow("#ConditionalSearch");
		    RequestSend(function(data){
    			if(data.status=="OK"){
    				var shopJson = data.businesses;
    				if(shopJson.length>0){
    					showShopList(data);
    					//Show the result
    				}else{
    					showShopList(null);
    				}
    				typeof func=="function"&&func();
   				}
    			Controler.preloadLayerHide("#ConditionalSearch");
    		},url);
		},
		keyWordSearch:function(func,page){
			Utility.currentPage = page;
			
			var category=null,city=null,region=null,sort=null,keyword=null;
			city = Utility.currentSearchCity;
			if(Utility.searchConditional.shoptype){
				category = Utility.searchConditional.shoptype;
			};
			if(Utility.searchConditional.region){
				region = Utility.searchConditional.region;
			};
			if(Utility.searchConditional.sort){
				sort = Utility.searchConditional.sort;
			}
			keyword = Utility.searchConditional.keyword;
			
			region==ALLREGION||null?region=null:region;
			category==ALLCATEGORY||null?category=null:category;
			keyword==""||null?keyword=null:keyword;
			var param = {
				category:category,
			   	city:city,
			   	region:region,
			   	sort:sort,
			   	page:page,
			   	limit:DEFAULT_SHOPLIMIT,
			   	keyword:keyword,
			};
			var url = URLGenerate(DianPingURLConfig.findBusinessesByRegion,param);
			Utility.currentSearch = {
    				url : DianPingURLConfig.findBusinessesByRegion,
    				param:param,
    		};
			Controler.preloadLayerShow("#AdvancedSearch");
			RequestSend(function(data){
    			if(data.status=="OK"){
    				//save keyword
    				Utility.saveHistoryKeyWord({KeyWord:Utility.searchConditional.keyword});
    				console.log("search result:"+data);
    				if(data.businesses.length>0){
    					showShopList(data);
    				}else{
    					showShopList(null);
    				}
    				typeof func == "function" && func();
    			}
    			Controler.preloadLayerHide("#AdvancedSearch");
    		},url);
		},
    };

var showShopList = function(data){
	 var shopList = null;
	 var getAllNumber = null;
	 if(data){
		 shopList = data.businesses;
		 getAllNumber = data.total_count;
	 }
	if(Utility.currentPage==1){
		$("#RightResultList").html("");
	}else{
		if($("#RightResultList").find(".addMore")){
			$("#RightResultList .addMore").remove();
		}
	}
	var htmlString = new Array();
	if(shopList&&shopList.length!=0){
		var currentNumber = Utility.currentPage*DEFAULT_SHOPLIMIT;
		
//		if(shopList instanceof Array){//shopList is a ArrayList
//			$("#RightResultList").html(htmlString.join(''));
//		}
		htmlString = new Array();
		for (x in shopList)
		{
			htmlString.push('<div class="item" ');
			htmlString.push('lat="'+shopList[x].latitude+'"'+'lng="'+shopList[x].longitude+'" ');	
			htmlString.push('cityName="'+shopList[x].city+'"'+'businessid="'+shopList[x].business_id+'" >');
				
			htmlString.push('<div class="DetailResult">');
			var width = Utility.addressLength(shopList[x].name)/4*20;
			var addressWidth = 505- (Math.round(width)+30);
			htmlString.push('<div class="shoptitle"><h3>'+shopList[x].name+'</h3><div style="width:'+addressWidth+'px">');
			var width2 = Utility.addressLength(shopList[x].address)/4*18;
			if((addressWidth)<(width2)){
				htmlString.push('<marquee id="mymarquee" class="addressInfo" direction="left"  behavior="alternate" scrollamount="1" width="'+addressWidth+'" height="50">'+shopList[x].address+'</marquee>');
			}else{
				htmlString.push('<span class="addressInfo">'+shopList[x].address+'</span>');
			}
			
			htmlString.push('</div></div>');
			
			htmlString.push('<div class="ResultInformation">');    
			htmlString.push('<ul class="StarsList">');    
			var star = parseFloat(shopList[x].avg_rating)*10 ;
			for(var i=1;i<=5;i++){
				htmlString.push('<li>');
				if((star-i*10)>=0){
					htmlString.push('<span class="redStar" ></span>');
				}
				else if((star-i*10)<0&&(star-i*10)>-10){
				htmlString.push('<span class="redStar" style="width:'+(10+(star-i*10))/10*22+'px;"></span>');
				}
				htmlString.push('</li>');
			}
			htmlString.push('</ul>');        
			htmlString.push('<div class="infoItem">');
			if(shopList[x].distance&&shopList[x].distance!=-1){
				htmlString.push('<span class="duration">距离:'+shopList[x].distance+'米</span>');
			}
			htmlString.push('</div>');            
			htmlString.push('</div>');
			htmlString.push('</div>');
			
			htmlString.push('<div class="CallOrElse">');
			if(shopList[x].telephone&&shopList[x].telephone!="无"){htmlString.push('<div class="CallAction" tel="'+shopList[x].telephone+'"></div>');}
			htmlString.push('<div class="ElseAction">');
			htmlString.push('</div>');
			htmlString.push('</div>');
			htmlString.push('</div>');
		}
		if(Utility.currentPage==1){
			$("#RightResultList").html(htmlString.join(""));
		}else{
			$("#RightResultList").append(htmlString.join(""));
		}
		if(currentNumber<getAllNumber){
			$("#RightResultList").append("<div class='addMore'>更多</div>");
			
		}
	
		
	}else if(Utility.currentPage==1||Utility.currentPage==0){
		$("#RightResultList").html('<p class="noInfoP">没有查询到相关记录!</p>');
	}
	
	$("#RightResultList .addMore").unbind("mouseup").mouseup(function(){
		$(this).addClass("wait");
		$(this).html("");
		getShopList_addMorePage(function(){
			//_this.removeClass("wait");
		});
	});
	
	$("#RightResultList .DetailResult").unbind("mouseup").mouseup(function () {
		$(this).removeClass("mousedown");
		var parent = $(this).parent();
		var businessId = parseInt(parent.attr("businessid"));
		//if in Favorites history
		if(Utility.findFavorites(businessId)){
			$("#favoriteMerchantBtn").css("display","none");
			$("#cancelFavoriteBtn").css("display","block");
		}else{
			$("#favoriteMerchantBtn").css("display","block");
			$("#cancelFavoriteBtn").css("display","none");
		}
		//got the shopInfo detail & change to the detail info view
		Controler.preloadLayerShow("#SearchResultList");
		DianPing.getShopInfo(function(){
			Controler.preloadLayerHide("#SearchResultList");
			Utility.hideMap = true;
			Controler.transfer(new DetailInforView());
		},businessId);

	}).unbind("mousedown").bind("mousedown",function(){
		$(this).addClass("mousedown");
	});
	
	
	$(".CallAction").unbind("mousedown").mousedown(function(){
		$(this).addClass("selected");
	});
	$(".CallAction").unbind("mouseup").mouseup(function(){
		var tel = $(this).attr("tel");
		$(this).removeClass("selected");
		Utility.phone(tel,function(){
    		//callback
    	});
	});
	$(".ElseAction").unbind("mousedown").mousedown(function(){
		var parent = $(this).parent().parent();
		var _this = $(this);
		_this.addClass("selected");
	});
	
	$(".ElseAction").unbind("mouseup").mouseup(function(){
		var parent = $(this).parent().parent();
		var _this = $(this);
		Tracking.BtnClick("导航按钮");
		
		_this.removeClass("selected");
		if(parent.attr("lat")!=""){
			Utility.currentShopPoint ={
				lat:parent.attr("lat"),
				lng:parent.attr("lng"),
			};
		}else{
			Utility.currentShopPoint = null;
		}
		Utility.currentShopInfo = {
				address:parent.find(".addressInfo").html(),
		};
		Utility.searchStatus = true;
		Utility.hideMap = false;
		Controler.preloadLayerShow("#SearchResultList");
		Utility.search(function(){
			Controler.preloadLayerHide("#SearchResultList");
		},Utility.currentShopPoint);
	});
};
var showFavorShopList = function(shopList){
	$("#RightResultList").html("");
	var htmlString = new Array();
	if(shopList&&shopList.length!=0){
		htmlString = new Array();
		for (x in shopList)
		{
			htmlString.push('<div class="item" ');
			htmlString.push('lat="'+shopList[x].latitude+'"'+'lng="'+shopList[x].longitude+'" ');	
			htmlString.push('cityName="'+shopList[x].city+'"'+'businessid="'+shopList[x].business_id+'" >');
				
			htmlString.push('<div class="DetailResult">');
			var width = Utility.addressLength(shopList[x].name)/4*20;
			var addressWidth = 505- (Math.round(width)+30);
			htmlString.push('<div class="shoptitle"><h3>'+shopList[x].name+'</h3><div style="width:'+addressWidth+'px">');
			var width2 = Utility.addressLength(shopList[x].address)/4*18;
			if((addressWidth)<(width2)){
				htmlString.push('<marquee id="mymarquee" class="addressInfo" direction="left"  behavior="alternate" scrollamount="1" width="'+addressWidth+'" height="50">'+shopList[x].address+'</marquee>');
			}else{
				htmlString.push('<span class="addressInfo">'+shopList[x].address+'</span>');
			}
			
			htmlString.push('</div></div>');
			
			htmlString.push('<div class="ResultInformation">');    
			htmlString.push('<ul class="StarsList">');    
			var star = parseFloat(shopList[x].avg_rating)*10 ;
			for(var i=1;i<=5;i++){
				htmlString.push('<li>');
				if((star-i*10)>=0){
					htmlString.push('<span class="redStar" ></span>');
				}
				else if((star-i*10)<0&&(star-i*10)>-10){
				htmlString.push('<span class="redStar" style="width:'+(10+(star-i*10))/10*22+'px;"></span>');
				}
				htmlString.push('</li>');
			}
			htmlString.push('</ul>');        
			htmlString.push('<div class="infoItem">');
			if(shopList[x].distance&&shopList[x].distance!=-1){
				htmlString.push('<span class="duration">距离:'+shopList[x].distance+'米</span>');
			}
			htmlString.push('</div>');            
			htmlString.push('</div>');
			htmlString.push('</div>');
			
			htmlString.push('<div class="CallOrElse">');
			if(shopList[x].telephone&&shopList[x].telephone!="无"){htmlString.push('<div class="CallAction" tel="'+shopList[x].telephone+'"></div>');}
			
			htmlString.push('<div class="ElseAction">');
			htmlString.push('</div>');
			htmlString.push('</div>');
			htmlString.push('</div>');
		}
		$("#RightResultList").html(htmlString.join(""));
		
	}else{
		$("#RightResultList").html('<p class="noInfoP">没有查询到相关记录!</p>');
	}
	
	$("#RightResultList .DetailResult").unbind("mouseup").mouseup(function () {
		$(this).removeClass("mousedown");
		var parent = $(this).parent();
		var businessId = parseInt(parent.attr("businessid"));
		//if in Favorites history
		if(Utility.findFavorites(businessId)){
			$("#favoriteMerchantBtn").css("display","none");
			$("#cancelFavoriteBtn").css("display","block");
		}else{
			$("#favoriteMerchantBtn").css("display","block");
			$("#cancelFavoriteBtn").css("display","none");
		}
		//got the shopInfo detail & change to the detail info view
		Controler.preloadLayerShow("#SearchResultList");
		DianPing.getShopInfo(function(){
			Controler.preloadLayerHide("#SearchResultList");
			Utility.hideMap = true;
			Controler.transfer(new DetailInforView());
		},businessId);
	}).unbind("mousedown").mousedown(function(){
		$(this).addClass("mousedown");
	});
	
	$(".CallAction").unbind("mousedown").mousedown(function(){
		$(this).addClass("selected");
	});
	
	$(".CallAction").unbind("mouseup").mouseup(function(){
		var tel = $(this).attr("tel");
		var _this = $(this);
		_this.removeClass("selected");
		Utility.phone(tel,function(){
    		//callback
    	});
	});
	
	$(".ElseAction").unbind("mousedown").mousedown(function(){
		var _this = $(this);
		Tracking.BtnClick("导航按钮");
		_this.addClass("selected");
	});
	
	$(".ElseAction").unbind("mouseup").mouseup(function(){
		var parent = $(this).parent().parent();
		var _this = $(this);
		_this.removeClass("selected");
		if(parent.attr("lat")!=""){
			Utility.currentShopPoint ={
				lat:parent.attr("lat"),
				lng:parent.attr("lng"),
			};
		}else{
			Utility.currentShopPoint = null;
		}
		Utility.currentShopInfo = {
				address:parent.find(".addressInfo").html(),
		};
		Utility.searchStatus = true;
		Utility.hideMap = false;
		Controler.preloadLayerShow("#SearchResultList");
		Utility.search(function(){
			Controler.preloadLayerHide("#SearchResultList");
		},Utility.currentShopPoint);
	});
	
};

var showCityList = function(data){
	var cityList = data.cities;
	var htmlStr = new Array();
	var selectedClass = '';
	//htmlStr.push('<div class="LeftArrow"><a class="UpArrow"></a><a class="DownArrow"></a></div>');
	//htmlStr.push('');
	//$("#changeCity_popup").html(htmlStr.join(""));
	htmlStr=new Array();
	for (x in cityList)
	{
		if(cityList[x] ==Utility.currentSearchCity){
			selectedClass="class='selectedWhite'";
		}else{
			selectedClass='';
		}
		if((parseInt(x)+1)%20==1){
			htmlStr.push("<div>");
		}
		if((parseInt(x)+1)%5==1){
			htmlStr.push('<ul class="selectLine TypeList sizeFive">');
			htmlStr.push('<li '+selectedClass+' >'+cityList[x]+'</li>');		
		}
		if((parseInt(x)+1)%5!=1&&(parseInt(x)+1)%5!=0){
			htmlStr.push('<li '+selectedClass+' ">'+cityList[x]+'</li>');					
		}
		if((parseInt(x)+1)%5==0||(x==cityList.length)){
			htmlStr.push('<li '+selectedClass+' ">'+cityList[x]+'</li>');
			htmlStr.push('</ul>');
		}
		if((parseInt(x)+1)%20==0||(x==cityList.length)){
			htmlStr.push("</div>");
		}
	}
	
	$("#cityListScrollable .items").html(htmlStr.join(""));
	
	/*$("#cityListScrollable").scrollable({
		disabled:".disabled",
		vertical: true,
		mousewheel:true,
		next:".DownArrow",
		prev:".UpArrow",
		});
	*/
	$("#changeCity_popup li").mouseup(function(){
		$(this).removeClass("mousedown");
		Utility.currentSearchCity=$(this).html();
		$("#changeCity_popup li").removeClass("selectedWhite");
		$(this).addClass("selectedWhite");
		//hide the popup
		$("#changeCityBtn").removeClass("selected");
		Controler.popDown();
		Utility.flagDown();
		$("#currentCityFlag").html("搜索城市："+(Utility.currentSearchCity));
		//Update the Region of the selected city
		DianPing.getRegion(function(){
			//callback func
		},Utility.currentLocationCity);
	}).mousedown(function(){
		$(this).addClass("mousedown");
	});
};

var showRegion = function(data){
	var regionList = data.cities[0].districts;
	var htmlString = '<ul class="selectLine AreaList sizeFive"><li class="selectedWhite">全部区域</li>';
	for (x in regionList)
	{
		if((parseInt(x)+2)%5==1){
			htmlString+='<ul class="selectLine AreaList sizeFive">';
			htmlString+='<li>'+regionList[x].district_name+'</li>';		
		}
		if((parseInt(x)+2)%5!=1&&(parseInt(x)+2)%5!=0){
			htmlString+='<li>'+regionList[x].district_name+'</li>';					
		}
		if((parseInt(x)+2)%5==0||(x==regionList.length)){
			htmlString+='<li>'+regionList[x].district_name+'</li>';
			htmlString+='</ul>';
		}
	}
    
	$("#SelectLocationList").html(htmlString);
	$("#SelectLocationList li").unbind("mouseup").mouseup(function(){
		$(this).removeClass("mousedown");
		$("#areaInput").html($(this).html());
		$("#SelectLocationList li").removeClass("selectedWhite");
		$(this).addClass("selectedWhite");
		Controler.hidebox();
	}).unbind("mousedown").mousedown(function(){
		$(this).addClass("mousedown");
	});
};

var showShopInfo = function(data){
	var shopObject = data.businesses[0];
	var htmlString = new Array();
	htmlString.push('<div id="CenterDetailInfor">');
	htmlString.push('<h2 id="shopname">'+shopObject.name+'</h2>');
	htmlString.push('<ul class="StarsList">');
	var star = parseFloat(shopObject.avg_rating)*10 ;
	for(var i=1;i<=5;i++){
		htmlString.push('<li>');
		if((star-i*10)>=0){
			htmlString.push('<span  class="redStar"></span>');
		}
		else if((star-i*10)<0&&(star-i*10)>-10){
			htmlString.push('<span  class="redStar" style="width:'+(10+(star-i*10))/10*22+'px;"></span>');
		}
		htmlString.push('</li>');
	}
	htmlString.push('</ul>');
	
    if(shopObject.categories.length>=0){
        htmlString.push('<span>'+shopObject.categories[0]+'</span>');
    }else{
    	htmlString.push('<span></span>');
    }
    
    if(!shopObject.telephone){shopObject.telephone="无";htmlString.push('<div class="DetailInformation dTelephone"><span class="dTitle">电话：</span>'+shopObject.telephone+'</div>');}else{
    	htmlString.push('<div class="DetailInformation dTelephone"><span class="dTitle">电话：</span>'+shopObject.telephone+'<span id="Calling" tel="'+shopObject.telephone+'"></span></div>');
    }
    htmlString.push('<div class="DetailInformation" id="distanceInfo"><span class="dTitle">距离：</span>'+"--"+'&nbsp;&nbsp;驾车约'+"--"+'分钟</div>');
    htmlString.push('<div class="DetailInformation"><span class="dTitle">地址：</span><span id="addressInfo">'+shopObject.address+'</span>');
    htmlString.push('<span id="GuideBtn2"></span></div>');
    htmlString.push('</div>');
    htmlString.push('<img id="ClientPhoto" onerror="this.src=\'static/img/no-mapPic.png\'" src="'+shopObject.s_photo_url+'"/>');
	$("#DetailResultInformation").html(htmlString.join(""));
	
	//alert(shopObject.Address+"  length="+shopObject.Address.length);
	$("#GuideBtn2").unbind("mousedown").mousedown(function(){
		var _this = $(this);
		_this.addClass("selected");
	});
	
	$("#GuideBtn2").unbind("mouseup").mouseup(function(){
		Utility.searchStatus = true;
		var _this = $(this);
		Tracking.BtnClick("导航按钮");
		_this.removeClass("selected");
		Utility.currentShopPoint = {
				lat : Utility.currentShopInfo.latitude,
				lng : Utility.currentShopInfo.longitude,
		};
		Utility.hideMap = false;
		Controler.preloadLayerShow("#DetailResultInformation");
		Utility.search(function(){
			Controler.preloadLayerHide("#DetailResultInformation");
		},Utility.currentShopPoint);
	});
	
	$("#Calling").unbind("mousedown").mousedown(function(){
		var _this = $(this);
		_this.addClass("selected");
	});
	
	$("#Calling").unbind("mouseup").mouseup(function(){
		var tel = $(this).attr("tel");
		var _this = $(this);
		_this.removeClass("selected");
		Utility.phone(tel,function(){
			//callback
		});
	});
	Utility.currentShopInfo = {
			city:Utility.currentSearchCityName,
			business_id:shopObject.business_id,
			name:shopObject.name,
			categories:shopObject.categories,
			address:shopObject.address,
			telephone:shopObject.telephone,
			s_photo_url:shopObject.s_photo_url,
			avg_rating:shopObject.avg_rating,
			latitude:shopObject.latitude,
			longitude:shopObject.longitude,
	};
	Utility.currentShopPoint = {
			lat : Utility.currentShopInfo.latitude,
			lng : Utility.currentShopInfo.longitude,
	};
	Utility.searchInfo(function(){
		
	},Utility.currentShopPoint);
	
};

var showShopReview = function(data){
	var reviewList = new Array();
	var reviewJson = data;
		$("#reviewContainer>h2").css("display","none");
		reviewList = reviewJson.reviews;
		var htmlStr = new Array();
		htmlStr.push("<ul>");
		for (x in reviewList)
		{
			htmlStr.push('<li>');
			htmlStr.push('<div style="font-size: 21px;color:#36648B;height:52px;"><h2>'+reviewList[x].user_nickname+'</h2>');
			htmlStr.push('<ul class="StarsList">');    
			var star = 0 ;
			(reviewList[x].review_rating)?star = parseFloat(reviewList[x].review_rating):((reviewList[x].review_rating)?star = parseFloat(reviewList[x].review_rating):function(){});
			star = star*10;
			for(var i=1;i<=5;i++){
				htmlStr.push('<li style="margin-top:5px;">');
				if((star-i*10)>=0){
					htmlStr.push('<span class="redStar" ></span>');
				}
				else if((star-i*10)<0&&(star-i*10)>-10){
					htmlStr.push('<span class="redStar" style="width:'+(10+(star-i*10))/10*22+'px;"></span>');
				}
				htmlStr.push('</li>');
			}
			htmlStr.push('</ul>');
			
			if(reviewList[x].ShopType==10){
			htmlStr.push('口味：'+Utility.transReview(reviewList[x].product_rating)+
					'&nbsp;&nbsp;环境：'+Utility.transReview(reviewList[x].decoration_rating)+
					'&nbsp;&nbsp;服务:'+Utility.transReview(reviewList[x].service_rating)+"&nbsp;&nbsp;");
			}
				
				
			htmlStr.push('</div>');
			htmlStr.push('<p>&nbsp;&nbsp;&nbsp;&nbsp;');
			htmlStr.push(reviewList[x].text_excerpt+'</br>');
			htmlStr.push("<span>"+ reviewList[x].created_time/*.replace("T"," ")*/+'</span></br>');
			htmlStr.push('</p>');
			htmlStr.push('</li>');
		}
		htmlStr.push("</ul>");
		//htmlStr.push("");
		$("#reviewContainer").html(htmlStr.join(""));
};
//显示二级商户分类菜单
var showSubCategory = function(subJson){
	if(subJson){
		var htmlStr = new Array();
//		$("#food_popup").html("");
		$("#food_popup").removeClass("fourpiece").addClass("fivepiece");
//		htmlStr.push('<div class="LeftArrow"><a class="UpArrow"></a><a class="DownArrow"></a></div>');
//		htmlStr.push('<div id="categoryListScrollable"><div class="items"></div></div>');
//		$("#food_popup").html(htmlStr.join(""));
		
		htmlStr = new Array();
		for (var x = 0 ;x<subJson.length;x++)
		{
			if((parseInt(x)+1)%20==1){
				htmlStr.push('<div>');
			}
			if((parseInt(x)+1)%5==1){
				htmlStr.push('<ul>');
				htmlStr.push('<li>'+subJson[x].category_name+'</li>');
			}
			if((parseInt(x)+1)%5!=1&&(parseInt(x)+1)%5!=0){
				htmlStr.push('<li>'+subJson[x].category_name+'</li>');
			}
			if((parseInt(x)+1)%5==0||(x==subJson.length)){
				htmlStr.push('<li>'+subJson[x].category_name+'</li>');;
				htmlStr.push('</ul>');
			}
			if((parseInt(x)+1)%20==0){
				htmlStr.push('</div>');
			}
			if(x==subJson.length){
				htmlStr.push('</div>');
			}
		}
		
		if(subJson.length<=20){
			$("#food_popup .LeftArrow").addClass("hidden");
		}
		
		$("#categoryListScrollable .items").html(htmlStr.join(""));
		
		$("#food_popup li").mouseup(function () {
			$(this).removeClass("mousedown");
			$("#food_popup li").removeClass("selectedWhite");
			$(this).addClass("selectedWhite");
			$("#shopTypeBtn>div").html($(this).html());
			$("#shopTypeBtn").removeClass("selected");
			var category = $("#shopTypeBtn>div").html();
			var radius = parseInt($("#scopeResultBtn").attr("radius"));
			var sortid = parseInt($("#sortResultBtn").attr("sortid"));		
			DianPing.getNearbySearchResult(function(){
				
			},category,radius,sortid,1);
			Controler.popDown();
			Utility.flagDown();
        }).mousedown(function(){
        	$(this).addClass("mousedown");
        });
		
	}else{
		$("#food_popup").html(htmlStr.join("没有相关信息"));
	}
};

var showShopType = function(data){
	var shopTypeJson = data;
	shopTypeList = shopTypeJson.categories;
	var htmlString = '<ul class="selectLine TypeList sizeFive"><li class="selectedWhite">全部频道</li>';
	for (x in shopTypeList)
	{
		if((parseInt(x)+2)%5==1){
			htmlString+='<ul class="selectLine TypeList sizeFive">';
			htmlString+='<li>'+shopTypeList[x].category_name+'</li>';		
		}
		if((parseInt(x)+2)%5!=1&&(parseInt(x)+2)%5!=0){
			htmlString+='<li>'+shopTypeList[x].category_name+'</li>';					
		}
		if((parseInt(x)+2)%5==0||(x==shopTypeList.length)){
			htmlString+='<li>'+shopTypeList[x].category_name+'</li>';
			htmlString+='</ul>';
		}
	}
	$("#SelectTypeList").html(htmlString);
	$("#SelectTypeList li").mouseup(function(){
		$(this).removeClass("mousedown");
		$("#typeInput").html($(this).html());
		Controler.hidebox();
	}).mousedown(function(){
		$(this).addClass("mousedown");
	});
};

var getShopList_addMorePage = function(func){
	Utility.currentPage = Utility.currentPage+1;
	Utility.currentSearch.param.page = Utility.currentPage;
	var url = URLGenerate(Utility.currentSearch.url,Utility.currentSearch.param);
//	Controler.preloadLayerShow("#content");
	
	RequestSend(function(data){
//		Controler.preloadLayerHide("#content");
		if(data.status=="OK"){
			if(data.businesses.length>0){
				showShopList(data);
			}else{
				showShopList(null);
			}
			typeof func == "function" && func();
		}
	},url);
	typeof func=="function" && func();
};