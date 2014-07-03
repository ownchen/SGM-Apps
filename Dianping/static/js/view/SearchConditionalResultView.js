/* SearchConditionalResult View Class*/
    (function () {
        var instance = null;
        SearchConditionalResultView = function () {
            if (instance) {
                return instance;
            }
            instance = this;
            View.call(this, "searchresult", ToolBar.searchConditionalResult);
            this.prototype = new View();
            this.prototype.constructor = SearchConditionalResultView;

          //Tracking
            this.pageName="mycadillac:大众点评:搜索结果页面";
            this.channel="大众点评";
            
            this.init = function () {
                
                $("#conRegionBtn").unbind("mouseup").mouseup(function(){
                	$($(this).children(".clickText")).removeClass("mousedown");
                		if(Utility.popflag[0]){
                			Tracking.BtnClick("搜索区域选择按钮");
                			$("#searchConditionalResult_toolbar .toolbar_centerRight>div").removeClass("selected");
                			$(this).addClass("selected");
                			Utility.falgUp(0);
		                    Controler.popUp_bg(Popup.conditionalRegion);
		                    $(".triangle_icon").css("left", "145px").css("display", "block");
                		}else{
                			$(this).removeClass("selected");
                			Controler.popDown();
                			Utility.flagDown();
                		}
                }).unbind("mousedown").mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                $("#conCategoryBtn").unbind("mouseup").mouseup(function(){
                	$($(this).children(".clickText")).removeClass("mousedown");
            		if(Utility.popflag[1]){
            			Tracking.BtnClick("搜索类型选择按钮");
            			$("#searchConditionalResult_toolbar .toolbar_centerRight>div").removeClass("selected");
            			$(this).addClass("selected");
            			Utility.falgUp(1);
	                    Controler.popUp_bg(Popup.conditionalCategory);
	                    $(".triangle_icon").css("left", "325px").css("display", "block");
            		}else{
            			$(this).removeClass("selected");
            			Controler.popDown();
            			Utility.flagDown();
            		}
                }).unbind("mousedown").mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                $("#conSortBtn").unbind("mouseup").mouseup(function(){
                	$($(this).children(".clickText")).removeClass("mousedown");
            		if(Utility.popflag[3]){
            			Tracking.BtnClick("搜索排序选择按钮");
            			$("#searchConditionalResult_toolbar .toolbar_centerRight>div").removeClass("selected");
            			$(this).addClass("selected");
            			Utility.falgUp(3);
	                    Controler.popUp_bg(Popup.conditionalSort);
	                    $(".triangle_icon").css("left", "507px").css("display", "block");
            		}else{
            			$(this).removeClass("selected");
            			Controler.popDown();
            			Utility.flagDown();
            		}
                }).unbind("mousedown").mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                $("#searchConditionalResult_toolbar .goback").unbind("mouseup").mouseup(function () {
                	$(this).removeClass("mousedown");
                	$("#searchConditionalResult_toolbar .toolbar_centerRight>div").removeClass("selected");
                	$("#conRegionBtn>div").html($(this).html());
                	$("#conRegionBtn").attr("regionid",$(this).attr("regionid"));
                    Controler.goback();
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
            };

            this.show = function () {
                this.prototype.show.call(this);
                $("#SearchResultList").css("display", "block");
                $("#currentCityFlag").html("搜索城市："+(Utility.currentSearchCity));
                $("#conRegionBtn>div").html($("#areaInput").html());
                	$("#conRegionBtn").attr("regionid",$("#areaInput").attr("regionid"));
                $("#conCategoryBtn>div").html($("#typeInput").html());
                	$("#conCategoryBtn").attr("shoptypeid",$("#typeInput").attr("shoptypeid"));
                $("#conPriceBtn>div").html($("#priceInput").html());
                	$("#conPriceBtn").attr("priceid",$("#priceInput").attr("priceid"));
                $("#conSortBtn>div").html($("#sortInput").html());
                	$("#conSortBtn").attr("sortid",$("#sortInput").attr("sortid"));
                	
                $("#conditionalPopup_region").html($("#SelectLocationList").html());
                $("#conditionalPopup_category").html($("#SelectTypeList").html());
                $("#conditionalPopup_price").html($("#SelectPriceList").html());
                $("#conditionalPopup_sort").html($("#SelectSortList").html());
                
                $("#conditionalPopup_region li").unbind("mouseup").mouseup(function(){
                	$(this).removeClass("mousedown");
                	$("#conditionalPopup_region li").removeClass("selectedWhite");
                	$(this).addClass("selectedWhite");
                	$("#SelectLocationList").html($("#conditionalPopup_region").html());
                	$("#areaInput").html($(this).html());
                	$("#conRegionBtn>div").html($(this).html());
                	$("#conRegionBtn").removeClass("selected");
                	Utility.searchConditional.region = $(this).html();
                	Utility.currentPage = 1;
                	DianPing.conditionalSearch(function(){
                		
                	},1);
                	Controler.popDown();
        			Utility.flagDown();
        			
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
                $("#conditionalPopup_category li").unbind("mouseup").mouseup(function(){
                	$(this).removeClass("mousedown");
                	$("#conditionalPopup_category li").removeClass("selectedWhite");
                	$(this).addClass("selectedWhite");
                	$("#SelectTypeList").html($("#conditionalPopup_category").html());
                	$("#typeInput").html($(this).html());
                	//$("#typeInput").attr("shoptypeid",$(this).attr("shoptypeid"));
                	$("#conCategoryBtn>div").html($(this).html());
                	$("#conCategoryBtn").removeClass("selected");
                	Utility.searchConditional.shoptype = $(this).html();
                	Utility.currentPage = 1;
                	DianPing.conditionalSearch(function(){
                		//
                	},1);
                	Controler.popDown();
        			Utility.flagDown();
        			
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
                $("#conditionalPopup_sort li").unbind("mouseup").mouseup(function(){
                	$(this).removeClass("mousedown");
                	$("#conditionalPopup_sort li").removeClass("selectedWhite");
                	$(this).addClass("selectedWhite");
                	$("#SelectSortList").html($("#conditionalPopup_sort").html());
                	$("#sortInput").html($(this).html());
                	$("#sortInput").attr("sortid",$(this).attr("sortid"));
                	$("#conSortBtn>div").html($(this).html());
                	$("#conSortBtn>div").attr("sortid",$(this).attr("sortid"));
                	$("#conSortBtn").removeClass("selected");
                	Utility.searchConditional.sort = $(this).attr("sortid");
                	Utility.currentPage = 1;
                	DianPing.conditionalSearch(function(){
                		//
                	},1);
                	Controler.popDown();
        			Utility.flagDown();
        			
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
                
                
            };
            this.hide = function () {
            	this.prototype.hide.call(this);
                $("#SearchResultList").css("display", "none");
            };

            this.init();
        };
    } ());