/* FavoritesList View Class*/
    (function () {
        var instance = null;
        FavoritesListView = function () {
            if (instance) {
                return instance;
            }
            instance = this;
            View.call(this, "favoritesList", ToolBar.favoritesList);
            this.prototype = new View();
            this.prototype.constructor = FavoritesListView;

            //Tracking
            this.pageName="mycadillac:大众点评:收藏夹页面";
            this.channel="大众点评";
            
            this.init = function () {
                $("#favouritesList_toolbar .goback").unbind("mouseup").mouseup(function () {
                    Controler.goback();
                });

                $("#clearFavoriteBtn").unbind("mouseup").mouseup(function () {
                	$($(this).children(".clickText")).removeClass("mousedown");
                	Tracking.BtnClick("清空收藏按钮");
                    Controler.popUp_bg(Popup.clearAllFavorites);
                }).unbind("mousedown").mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                $("#cancle_favorites_popup .confirm_yes").unbind("mousedown").bind("mousedown",function () {
                	$(this).addClass("selected");
                }).unbind("mouseup").bind("mouseup",function () {
                	Controler.popDown();
                	$(this).removeClass("selected");
                });
                $("#cancle_favorites_popup .confirm_no").unbind("mousedown").bind("mousedown",function () {
                    $(this).addClass("selected");
                }).unbind("mouseup").bind("mouseup",function () {
                	Controler.popDown();
                	$(this).removeClass("selected");
                });
                $("#clear_all_favorites_popup .confirm_yes").unbind("mousedown").bind("mousedown",function () {
                	$(this).addClass("selected");
                }).unbind("mouseup").bind("mouseup",function () {
                	Utility.clearFavorites();
                	//refresh favorites shops list
                	Utility.getFavoriteShops(function(data){
                		showShopList(data);
                	});
                    Controler.popDown();           
                    $(this).removeClass("selected");
                });
                $("#clear_all_favorites_popup .confirm_no").unbind("mousedown").bind("mousedown",function () {
                    $(this).addClass("selected");
                }).unbind("mouseup").bind("mouseup",function () {
                    Controler.popDown();
                    $(this).removeClass("selected");
                });
                
                $(".CallAction").unbind("mousedown").mousedown(function(){
                	$(this).addClass("selected");
                });
                
                $(".CallAction").unbind("mouseup").mouseup(function(){
                	Tracking.BtnClick("导航按钮");
            		var tel = $(this).attr("tel");
            		var _this = $(this);
            		_this.addClass("selected");
            		_this.removeClass("selected");
            		Utility.phone(tel,function(){
                		//callback
                	});
            	});
                
            };

            this.show = function () {
                this.prototype.show.call(this);
                $("#currentCityFlag").html("当前城市："+Utility.currentLocationCity);
                $("#SearchResultList").css("display", "block");
            };
            this.hide = function () {
            	this.prototype.hide.call(this);
                $("#SearchResultList").css("display", "none");
            };
            this.init();
        };
    } ());