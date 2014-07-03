/* DetailInfor View Class*/
    (function () {
        var instance = null;
        DetailInforView = function () {
            if (instance) {
                return instance;
            }
            instance = this;
            View.call(this, "detailInfo", ToolBar.detailInfo);
            this.prototype = new View();
            this.prototype.constructor = DetailInforView;
            //Tracking
            this.pageName="mycadillac:大众点评:商户详情页面";
            this.channel="大众点评";
            
            this.init = function () {
                $("#detailInfo_toolbar .goback").unbind("mouseup").mouseup(function () {
                    Controler.goback();
                });
                
                $("#userReviewBtn").unbind("mouseup").mouseup(function () {
                	$($(this).children(".clickText")).removeClass("mousedown");
                	if(Utility.popflag[2]){
                		Tracking.BtnClick("网友点评按钮");
                		Utility.falgUp(2);
                		//recommend_flag = favorite_falg = true;
                		Controler.popUp_bg(Popup.userReview);
                		var obj = document.getElementById("reviewZoom");
            			obj.scrollTop = 0;
                        $("#detailInfo_toolbar .selected").removeClass("selected");
                        $("#userReviewBtn").addClass("selected");
                        $(".triangle_icon").css("left", "147px").css("display", "block");
                        //get Shop Review
                        Controler.preloadLayerShow("#user_review_popup");
                        DianPing.getShopReview(function(){
                        	Controler.preloadLayerHide("#user_review_popup");
                    	},Utility.currentShopInfo.business_id);
                	}else{
                		$(this).removeClass("selected");
                		Controler.popDown();
                		Utility.flagDown();
                	}
                    
                }).unbind("mousedown").mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                
                //var favorite_falg = true;
                $("#favoriteMerchantBtn").unbind("mouseup").mouseup(function () {
                	$($(this).children(".clickText")).removeClass("mousedown");
                    if(Utility.popflag[3]){
                    	Tracking.BtnClick("收藏商户按钮");
                    	Utility.falgUp(3);
                		//recommend_flag = review_flag = true;
                    	Controler.popUp_bg(Popup.favoriteMerchant);
                        $("#detailInfo_toolbar .selected").removeClass("selected");
                        $("#favoriteMerchantBtn").addClass("selected");
                        $(".triangle_icon").css("left", "327px").css("display", "block");
                    }else{
                    	$(this).removeClass("selected");
                		Controler.popDown();
                		Utility.flagDown();
                	}
                }).unbind("mousedown").mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });

                $("#cancelFavoriteBtn").unbind("mouseup").mouseup(function () {
                	$($(this).children(".clickText")).removeClass("mousedown");
                    if(Utility.popflag[3]){
                    	Utility.falgUp(3);
                		//recommend_flag = review_flag = true;
                    	Controler.popUp_bg(Popup.cancleFavorites);
                        $("#detailInfo_toolbar .selected").removeClass("selected");
                        $("#cancelFavoriteBtn").addClass("selected");
                        $(".triangle_icon").css("left", "327px").css("display", "block");
                    }else{
                    	$(this).removeClass("selected");
                		Controler.popDown();
                		Utility.flagDown();
                	}
                }).unbind("mousedown").mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                
                $("#shopMapBtn").unbind("mouseup").mouseup(function () {
                	$($(this).children(".clickText")).removeClass("mousedown");
//                    	if(!Utility.searchStatus){
//                    		$("#noSearchResult_popup").css("display","block");
//	            			$("#alertpopup").css("display","block");
//	            			$("#noResult_yes").mouseup(function(){
//	            				$("#noSearchResult_popup").css("display","none");
//		            			$("#alertpopup").css("display","none");
//		            			 Controler.hidebox();
//	            			});
//                    	}
                		Tracking.BtnClick("路径导航按钮");
                    	Utility.searchStatus = true;
                		Utility.currentShopPoint = {
                				lat : Utility.currentShopInfo.latitude,
                				lng : Utility.currentShopInfo.longitude,
                		};
                		Utility.hideMap = false;
                		Controler.preloadLayerShow("#DetailResultInformation")
                		Utility.search(function(){
                			Controler.preloadLayerHide("#DetailResultInformation");
                		},Utility.currentShopPoint);
                    	//Controler.showbox(new GaodeMapBox());
                    
                }).unbind("mousedown").mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                
                $("#favorite_merchant_yes").unbind("mouseup").mouseup(function(){
                	//save favorite shops
                	$(this).removeClass("selected");
                	Utility.saveFavorites(Utility.currentShopInfo);
                	$("#cancelFavoriteBtn").css("display","block");
                	$("#favoriteMerchantBtn").css("display","none");
                	Controler.popDown();
            		Utility.flagDown();
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("selected");
                });
                $("#favorite_merchant_no").unbind("mouseup").mouseup(function(){
                	$(this).removeClass("selected");
                	Controler.popDown();
            		Utility.flagDown();
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("selected");
                });
                
                $("#cancel_favorite_yes").unbind("mouseup").mouseup(function(){
                	//save favorite shops
                	$(this).removeClass("selected");
                	Utility.deleteFavorites(Utility.currentShopInfo.business_id);
                	$("#cancelFavoriteBtn").css("display","none");
                	$("#favoriteMerchantBtn").css("display","block");
                	if(Controler.prevView.length>2&&Controler.prevView[(Controler.prevView.length-2)].name=="favoritesList"){
                		Utility.getFavoriteShops();
                	}
                	Controler.popDown();
            		Utility.flagDown();
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("selected");
                });
                
                $("#cancel_favorite_no").unbind("mouseup").mouseup(function(){
                	$("#cancelFavoriteBtn").removeClass("selected");
                	Controler.popDown();
            		Utility.flagDown();
                });
            };

            this.show = function () {
                this.prototype.show.call(this);
                $("#detailInfo_toolbar .selected").removeClass("selected");
                $("#DetailResultInformation").css("display", "block");
                
            };
            this.hide = function () {
            	this.prototype.hide.call(this);
                $("#DetailResultInformation").css("display", "none");
            };

            this.init();
        };
    } ());