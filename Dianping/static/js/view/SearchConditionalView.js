/* SearchConditional View Class*/
    (function () {
        var instance = null;
        SearchConditionalView = function () {
            if (instance) {
                return instance;
            }
            instance = this;
            Box.call(this, "searchconditonal", ToolBar.searchConditional);
            this.prototype = new View();
            this.prototype.constructor = SearchConditionalView;
            
          //Tracking
            this.pageName="mycadillac:大众点评:条件搜索页面";
            this.channel="大众点评";
            
            this.init = function () {
                $("#searchConditional_toolbar .cancelBtn").unbind("mouseup").mouseup(function () {
                    //Controler.transfer(Utility.currentView, new SearchCategoryView());
                	$(this).removeClass("mousedown");
                    Controler.goback();
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });

                $("#areaInput").unbind("mouseup").mouseup(function () {
                	$(this).removeClass("mousedown");
                	Tracking.BtnClick("搜索区域选择按钮");
                    Controler.showbox(new SelectLocationListBox());
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
                $("#typeInput").unbind("mouseup").mouseup(function () {
                	$(this).removeClass("mousedown");
                	Tracking.BtnClick("搜索分类选择按钮");
                    Controler.showbox(new SelectTypeListBox());
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
                $("#priceInput").unbind("mouseup").mouseup(function () {
                	$(this).removeClass("mousedown");
                    Controler.showbox(new SelectPriceListBox());
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
                $("#sortInput").unbind("mouseup").mouseup(function () {
                	$(this).removeClass("mousedown");
                	Tracking.BtnClick("搜索排序选择按钮");
                    Controler.showbox(new SelectSortListBox());
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
                $("#searchConditionalBtn").unbind("mouseup").mouseup(function () {
                	$($(this).children(".clickText")).removeClass("mousedown");
                	Utility.searchConditional.shoptype = $("#typeInput").html();
                	Utility.searchConditional.region = $("#areaInput").html();
                	Utility.searchConditional.sort = $("#sortInput").attr("sortid");
                	Utility.currentPage = 1;
                	Tracking.BtnClick("搜索按钮");
                	DianPing.conditionalSearch(function(){
                    	Controler.transfer(new SearchConditionalResultView);
                	},Utility.currentPage);
                	
                }).unbind("mousedown").mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
            };

            this.show = function () {
                this.prototype.show.call(this);
                $("#currentCityFlag").html("搜索城市："+(Utility.currentSearchCity));
                $("#ConditionalSearch").css("display", "block");
                

            };
            this.hide = function () {
                this.prototype.show.call(this);
                $("#ConditionalSearch").css("display", "none");
            };
            
            this.init();
        
        };
    } ());