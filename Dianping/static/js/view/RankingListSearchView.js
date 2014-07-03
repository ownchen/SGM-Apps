/* SearchRankingList View Class*/
var MAX_RADUUS = 5000;
    (function () {
        var instance = null;
        RankingListSearchView = function () {
            if (instance) {
                return instance;
            }
            instance = this;
            View.call(this, "rankinglistsearch", ToolBar.searchCategory);
            this.prototype = new View();
            this.prototype.constructor = RankingListSearchView;

          //Tracking
            this.pageName="mycadillac:大众点评:排行榜页面1";
            this.channel="大众点评";
            
            this.init = function () {
            	$("#RankinglistSearch .categoryIcon").unbind("mouseup").mouseup(function(){
            		$(this).removeClass("mousedown");
                	var type = $(this).parent().children("h2").html();
                	type = type.replace("排行榜","");
                	if(type=="更多"){
                		Controler.transfer(new RankingListSearchView2());
                	}else{
                		//Tracking 点击量
                    	var s=s_gi(s_account); 
                    	var buttonName = type+"按钮";
                    	s.linkTrackVars='prop1,prop2'; 
                    	s.prop1=buttonName;//设置 prop1 为 button 名称 
                    	s.prop2=buttonName+s.pageName;
                    	//设置 prop2 为 button 名称+页面名称 
                    	s.tl(this,'o','click_button');
                    	
                		Controler.preloadLayerShow("#RankinglistSearch");
                    	DianPing.getRankList(function(){
                    		Controler.preloadLayerHide("#RankinglistSearch");
                    		Controler.transfer(new RankingRestaurantView());
//                			DianPing.getRegion();
//                			DianPing.getSubCategory(type);
                		},type,1);//radius defaul value = 500
                	}
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
            };

            this.show = function () {
                this.prototype.show.call(this);
                $("#currentCityFlag").html("搜索城市："+(Utility.currentSearchCity));
                $("#searchCategory_toolbar .searchBtn").css("display", "block");
                $("#searchCategory_toolbar .goback").css("display", "none");
                $("#rankingSearchBtn").addClass("selected");
                $("#RankinglistSearch").css("display", "block");
                
                
            };
            this.hide = function () {
            	this.prototype.hide.call(this);
                $("#RankinglistSearch").css("display", "none");
                $("#rankingSearchBtn").removeClass("selected");
            };

            this.init();
        };
    })();
    
    /* SearchRankingList View Class*/
    (function () {
        var instance = null;
        RankingListSearchView2 = function () {
            if (instance) {
                return instance;
            }
            instance = this;
            View.call(this, "rankinglistsearch2", ToolBar.searchCategory);
            this.prototype = new View();
            this.prototype.constructor = RankingListSearchView2;
          //Tracking
            this.pageName="mycadillac:大众点评:排行榜页面2";
            this.channel="大众点评";
            this.init = function () {
            	$("#RankinglistSearch2 .categoryIcon").unbind("mouseup").mouseup(function(){
            		$(this).removeClass("mousedown");
                	var type = $(this).parent().children("h2").html();
                	type = type.replace("排行榜","");
                	//get online data
                	Controler.preloadLayerShow("#RankinglistSearch2");
                	DianPing.getRankList(function(){
                		Controler.preloadLayerHide("#RankinglistSearch2");
                		Controler.transfer(new RankingRestaurantView());
//                		DianPing.getRegion();
//                		DianPing.getSubCategory(type);
                	},type,1);//radius defaul value = 500
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
            	
            	
            };

            this.show = function () {
                this.prototype.show.call(this);
                $("#currentCityFlag").html("搜索城市："+(Utility.currentSearchCity));
                $("#searchCategory_toolbar .searchBtn").css("display", "none");
                $("#searchCategory_toolbar .goback").css("display", "block");
                $("#rankingSearchBtn").addClass("selected");
                $("#RankinglistSearch2").css("display", "block");
                
                
            };
            this.hide = function () {
            	this.prototype.hide.call(this);
                $("#RankinglistSearch2").css("display", "none");
                $("#rankingSearchBtn").removeClass("selected");
            };

            this.init();
        };
    })();
    
    
   