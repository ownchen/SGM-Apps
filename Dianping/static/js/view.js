    var SearchBarView = null,
    SearchConditionalView = null,
    SearchCategoryView = null,
    SearchCategoryView2 = null,
    SearchNearbyResultView = null,
    SearchConditionalResultView = null,
    
    DetailInforView = null,
    RankingListSearchView = null,
    RankingListSearchView2 = null,
    RankingRestaurantView = null,
    FavoritesListView = null,
    MoreView = null;

    var DefaultView = SearchCategoryView;
    /* Base View Class */
    var View = function (name, toolbar) {
        this.name = name;
        this.toolbar = toolbar;
        this.show = function () {
        	$("#toolbar").css("display", "block");
            $("#toolbar > div").css("display", "none");
            $("#" + this.toolbar).css("display", "block");
        };
        this.hide = function(){
        	Controler.hidebox();
        	Controler.popDown();
        };
    };

    //Static Value
    var DEFAULT_SORT = 1;
    var DEFAULT_RADIUS = 500;
    /* ToolBar type */
    var ToolBar = {
        index: "",
        searchBar: "searchBar_toolbar",
        searchConditional: "searchConditional_toolbar",
        searchCategory: "searchCategory_toolbar",
        locationList: "locationList_toolbar",
        searchConditionalResult: "searchConditionalResult_toolbar",
        searchNearbyResult: "searchNearbyResult_toolbar",
        detailInfo: "detailInfo_toolbar",
        rankList: "rankingList_toolbar",
        favoritesList: "favouritesList_toolbar",
        more: "more_toolbar"
    };

    

    

    

    

    var SelectLocationListBox = null, SelectTypeListBox = null, SelectPriceListBox = null;

    /* Base Box Class*/
    var Box = function (name, selectToolbar) {
        this.name = name;
        this.toolbar = selectToolbar;

        this.show = function () {
            $("#selectBox").css("display", "block");
            $("#selectBox").css("z-index", "200");
            $("#selectBox > div").css("display", "none");
            $("#SelectToolBar").css("display", "block");
            $(".maskbg").css("display", "block");
            $("#" + this.toolbar).css("display", "block");
        };
        this.hide = function () {
            $("#selectBox").css("display", "none");
            Utility.flagDown();
        };
    };

    /* SelectToolBar type */
    var SelectToolBar = {
        conditionalBar: "ConditionalSelectToolbar"
    };

    /* SelectLocationList Box Class*/

    (function () {
        var instance = null;
        SelectLocationListBox = function () {
            if (instance) {
                return instance;
            }
            instance = this;
            Box.call(this, "SelectLocationList", SelectToolBar.conditionalBar);
            this.prototype = new Box();
            this.prototype.constructor = SelectLocationListBox;
            this.init = function () {
                $(".selectCancelBtn").unbind("mouseup").mouseup(function () {
                    Controler.hidebox();
                });
            };

            this.show = function () {
                this.prototype.show.call(this);
                $("#SelectLocationList").css("display", "block");
                $("#SelectLocationList li").attr("regionid");
                $(".AreaList > li").mouseup(function () {
                	$(this).removeClass("mousedown");
                	$("#areaInput").html($(this).html()).attr("regionid",$(this).attr("regionid"));
                	$(".AreaList > li").removeClass("selectedWhite");
                	$(this).addClass("selectedWhite");
                    Controler.hidebox();
                }).mousedown(function(){
                	$(this).addClass("mousedown");
                });
            };
            
            this.hide = function () {
                this.prototype.hide.call(this);
                $("#SelectLocationList").css("display", "none");
            };
            
            this.init();
        };
    } ());

    /* SelectTypeList Box Class*/

    (function () {
        var instance = null;
        SelectTypeListBox = function () {
            if (instance) {
                return instance;
            }
            instance = this;
            Box.call(this, "SelectTypeListBox", SelectToolBar.conditionalBar);
            this.prototype = new Box();
            this.prototype.constructor = SelectTypeListBox;
            this.init = function () {
                $(".selectCancelBtn").unbind("mouseup").mouseup(function () {
                    Controler.hidebox();
                });
                
            };

            this.show = function () {
                this.prototype.show.call(this);
                $("#SelectTypeList").css("display", "block");
                $(".TypeList > li").mouseup(function () {
                    $(this).removeClass("mousedown");
                	$("#typeInput").html($(this).html());
                    $(".TypeList > li").removeClass("selectedWhite");
                    $(this).addClass("selectedWhite");
                    Controler.hidebox();
                }).mousedown(function(){
                	$(this).addClass("mousedown");
                });
            };
            this.hide = function () {
                this.prototype.hide.call(this);
                $("#SelectTypeList").css("display", "none");
            };

            this.init();
        };
    } ());

    /* SelectPriceList Box Class*/

    (function () {
        var instance = null;
        SelectPriceListBox = function () {
            if (instance) {
                return instance;
            }
            instance = this;
            Box.call(this, "SelectPriceListBox", SelectToolBar.conditionalBar);
            this.prototype = new Box();
            this.prototype.constructor = SelectPriceListBox;
            this.init = function () {
                $(".selectCancelBtn").unbind("mouseup").mouseup(function () {
                    Controler.hidebox();
                });
                
            };

            this.show = function () {
                this.prototype.show.call(this);
                $("#SelectPriceList").css("display", "block");
                $(".PriceList > li").mouseup(function () {
                	$(this).removeClass("mousedown");
                    $("#priceInput").html($(this).html()).attr("priceid",$(this).attr("priceid"));
                    $(".PriceList > li").removeClass("selectedWhite");
                    $(this).addClass("selectedWhite");
                    Controler.hidebox();
                }).mousedown(function(){
                	$(this).addClass("mousedown");
                });
            };
            this.hide = function () {
                this.prototype.hide.call(this);
                $("#SelectPriceList").css("display", "none");
            };

            this.init();
        };
    } ());

    /* SelectSortList Box Class*/
    (function () {
        var instance = null;
        SelectSortListBox = function () {
            if (instance) {
                return instance;
            }
            instance = this;
            Box.call(this, "SelectSortListBox", SelectToolBar.conditionalBar);
            this.prototype = new Box();
            this.prototype.constructor = SelectSortListBox;
            this.init = function () {
                $(".selectCancelBtn").unbind("mouseup").mouseup(function () {
                    Controler.hidebox();
                });
                
            };

            this.show = function () {
                this.prototype.show.call(this);
                $(".SortList > li").mouseup(function () {
                	$(this).removeClass("mousedown");
                    $("#sortInput").html($(this).html()).attr("sortid",$(this).attr("sortid"));
                    $(".SortList > li").removeClass("selectedWhite");
                    $(this).addClass("selectedWhite");
                    Controler.hidebox();
                }).mousedown(function(){
                	$(this).addClass("mousedown");
                });
                $("#SelectSortList").css("display", "block");
            };
            this.hide = function () {
                this.prototype.hide.call(this);
                $("#SelectSortList").css("display", "none");
            };

            this.init();
        };
    } ());

    /* GaodeMap Box Class*/
    var interval="";
    (function () {
        var instance = null;
        GaodeMapBox = function (func) {
            if (instance) {
                return instance;
            }
            instance = this;
            Box.call(this, "GaodeMap", SelectToolBar.conditionalBar);
            this.prototype = new Box();
            this.prototype.constructor = GaodeMapBox;
            this.init = function () {
                $(".selectCancelBtn").unbind("mouseup").mouseup(function () {
                	$(this).removeClass("mousedown");
                    Controler.hidebox();
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
                
                $("#wordGuidBtn").unbind("mouseup").mouseup(function(){
                	$($(this).find(".clickText")).removeClass("mousedown");
                	if(Utility.popflag[1]){
                		Tracking.BtnClick("文字导航按钮");
            			$("#wordGuidBtn>div").addClass("selected");
            			Utility.falgUp(1);
	                    $("#wordGuid_popup").css("display","block");
	                    var obj = document.getElementById("guidContent");
	                    obj.scrollTop = 0;;
	                    
	                    //
	                    $("#wordGuid_popup .goback").unbind("mouseup").bind("mouseup",function(){
	                    	$(this).removeClass("mousedown");
	                    	$("#wordGuidBtn>div").removeClass("selected");
	            			$("#wordGuid_popup").css("display","none");
	            			Utility.flagDown();
	                    }).unbind("mousedown").mousedown(function(){
	                    	$(this).addClass("mousedown");
	                    });
	                    $(".noticeBar").css("display","none");
	                    //Utility.showHistoryKeyWord(Utility.getHistoryKeyWord());
	                    $(".triangle_icon").css({"left":"700px","display":"block"});
            		}else{
            			$("#wordGuidBtn>div").removeClass("selected");
            			$("#wordGuid_popup").css("display","none");
            			Utility.flagDown();
            		}
                }).unbind("mousedown").mousedown(function(){
                	$($(this).find(".clickText")).addClass("mousedown");
                });
                $("#resizeBtnSma").unbind("mouseup").mouseup(function(){
                	$(this).removeClass("mousedown");
                	mapObj.setZoom(mapObj.getZoom() - 1);
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
                $("#resizeBtnBig").unbind("mouseup").mouseup(function(){
                	$(this).removeClass("mousedown");
                	mapObj.setZoom(mapObj.getZoom() + 1);
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
               
            };
            this.show = function () {
                this.prototype.show.call(this);
                $("#GaodeMapBox").css("display","block");
                $("#content").css("display","none");
                func();
                if(Utility.searchStatus){
                	$(".noticeBar").css("display","block");
                    interval=setInterval(Utility.flagModel,10000); 
                    setTimeout(function(){$(".noticeBar").css("display","none");},10000);
                }
                s.pageName="mycadillac:大众点评:地图导航页面";
                s.channel=CHANNEL;
                s.t();
                
            };
            this.hide = function () {
                this.prototype.hide.call(this);
                $("#wordGuidBtn>div").removeClass("selected");
                $("#wordGuid_popup").css("display","none");
                $("#content").css("display","block");
                clearInterval(interval);
            };

            this.init();
        };
    } ());
    /**
    *   PopUp
    **/
    var Popup = {
        nearBy: "nearby_popup",
        food: "food_popup",
        sort: "default_sort_popup",
        weekPopular: "week_popular_popup",
        favoritesResturant: "favorites_resturant_popup",
        cuisineBest: "cuisine_best_popup",
        userRecommended: "user_recommended_popup",
        userReview: "user_review_popup",
        favoriteMerchant: "favorite_merchant_popup",
        cancleFavorites: "cancle_favorites_popup",
        clearAllFavorites: "clear_all_favorites_popup",
        conditionalRegion:"conditionalPopup_region",
        conditionalCategory:"conditionalPopup_category",
        conditionalPrice:"conditionalPopup_price",
        conditionalSort:"conditionalPopup_sort",
        shopMap:"shopMap_popup",
        history:"history_popup",
        cityList:"changeCity_popup",
        clearAllHistory:"clear_all_history_popup",
        searchCityConfirm:"changeCityConfirm_popup",
        noSearchResult : "noSearchResult_popup",
        wordGuid:"wordGuid_popup",
        noCity:"no_CityConfirm_popup",

        show_bg: function (targetPopup) {
            $("#popup").css("display", "block");
            $("#popup > div").css("display", "none");
            $(".maskbg").css("display", "block");
            $("#" + targetPopup).css("display", "block");
        },
        show: function (targetPopup) {
            $("#popup").css("display", "block");
            $("#popup > div").css("display", "none");
            $("#" + targetPopup).css("display", "block");
        },
        hide: function () {
            $("#popup").css("display", "none");
            $(".triangle_icon").css("display", "none");
        }
    };

    
    
    
    