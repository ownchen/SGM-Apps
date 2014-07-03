/* SearchCategory View Class*/
    (function () {
        var instance = null;
        SearchCategoryView = function () {
            if (instance) {
                return instance;
            }
            instance = this;
            View.call(this, "searchcategory", ToolBar.searchCategory);
            this.prototype = new View();
            this.prototype.constructor = SearchCategoryView;

          //Tracking
            this.pageName="mycadillac:大众点评:我的附近页面1";
            this.channel="大众点评";
            
            this.init = function () {
                $("#CategoryListSearch .categoryIcon").unbind("mouseup").mouseup(function(){
                	var type = $(this).parent().children("h2").html();
                	$(this).removeClass("mousedown");
                	
                	if(type=="更多"){
                		Controler.transfer(new SearchCategoryView2());
                	}else{
                		//Tracking 点击量
                    	var s=s_gi(s_account); 
                		var buttonName = type+"按钮";
                    	s.linkTrackVars='prop1,prop2'; 
                    	s.prop1=buttonName;//设置 prop1 为 button 名称 
                    	s.prop2=buttonName+s.pageName;
                    	//设置 prop2 为 button 名称+页面名称 
                    	s.tl(this,'o','click_button');
                    	
                		Controler.preloadLayerShow("#CategoryListSearch");
                		//get online data first time
                		DianPing.getNearbySearchResult(function(){
                			Controler.preloadLayerHide("#CategoryListSearch");
                			GotTheNearyByResultList(type);
                		},type,DEFAULT_RADIUS,DEFAULT_SORT,1);//radius defaul value = 500
                		DianPing.getSubCategory(type);
                	}
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
                                
            };

            this.show = function () {
                this.prototype.show.call(this);
                $("#currentCityFlag").html("当前城市："+Utility.currentLocationCity);
                $("#currentCityFlag").css("display","block");
                $("#searchCategory_toolbar .goback").css("display", "none");
                $("#searchCategory_toolbar .searchBtn").css("display", "block");
                $("#nearBySearchBtn").addClass("selected");
                $("#CategoryListSearch").css("display", "block");
                
            };
            this.hide = function () {
            	this.prototype.hide.call(this);
                $("#CategoryListSearch").css("display", "none");
                $("#nearBySearchBtn").removeClass("selected");
            };

            this.init();
        };
    })();
    /* SearchCategory View Class*/
    (function () {
        var instance = null;
        SearchCategoryView2 = function () {
            if (instance) {
                return instance;
            }
            instance = this;
            View.call(this, "searchcategory2", ToolBar.searchCategory);
            this.prototype = new View();
            this.prototype.constructor = SearchCategoryView2;

          //Tracking
            this.pageName="mycadillac:大众点评:我的附近页面2";
            this.channel="大众点评";
            
            this.init = function () {
            	$("#CategoryListSearch2 .categoryIcon").unbind("mouseup").mouseup(function(){
                	var type = $(this).parent().children("h2").html();
                	$(this).removeClass("mousedown");
                	if(type=="更多"){
                		Controler.transfer(new SearchCategoryView2());
                	}else{
                		//get online data
                		//Tracking 点击量
                    	var s=s_gi(s_account); 
                		var buttonName = type+"按钮";
                		Tracking.BtnClick(buttonName);
                		Controler.preloadLayerShow("#CategoryListSearch");
                		DianPing.getNearbySearchResult(function(){
                			Controler.preloadLayerHide("#CategoryListSearch");
                			GotTheNearyByResultList(type);
                		},type,DEFAULT_RADIUS,DEFAULT_SORT,1);//radius defaul value = 500
                		DianPing.getSubCategory(type);
                	}
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
            };

            this.show = function () {
                this.prototype.show.call(this);
                $("#searchCategory_toolbar .goback").css("display", "block");
                $("#searchCategory_toolbar .searchBtn").css("display", "none");
                $("#nearBySearchBtn").addClass("selected");
                $("#CategoryListSearch2").css("display", "block");
                $("#currentCityFlag").html("当前城市："+Utility.currentLocationCity);
            };
            this.hide = function () {
            	this.prototype.hide.call(this);
                $("#CategoryListSearch2").css("display", "none");
                $("#nearBySearchBtn").removeClass("selected");
                
            };

            this.init();
        };
    })();
    
    var GotTheNearyByResultList = function(type){
    	$("#scopeResultBtn").attr("radius",500);
		$("#scopeResultBtn>div").html("500米");
		$("#sortResultBtn").attr("sortid",1);
		$("#sortResultBtn>div").html("默认排序");
		$("#shopTypeBtn>div").html(type);
		
		$("#nearby_popup li").removeClass("selectedWhite");
		$($("#nearby_popup li")[0]).addClass("selectedWhite");
		
		$("#default_sort_popup li").removeClass("selectedWhite");
		$($("#default_sort_popup li")[0]).addClass("selectedWhite");
		
		Controler.transfer(new SearchNearbyResultView());
    };