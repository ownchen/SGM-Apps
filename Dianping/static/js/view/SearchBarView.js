/* SearchBar View Class */
    (function () {
        var instance = null;
        SearchBarView = function () {
            if (instance) {
                return instance;
            };

            instance = this;
            View.call(this, "searchbar", ToolBar.searchBar);
            this.prototype = new View();
            this.prototype.constructor = SearchBarView;

          //Tracking
            this.pageName="mycadillac:大众点评:关键词搜索页面";
            this.channel="大众点评";
            
            this.init = function () {
                $("#advancedSearchBtn").unbind("mouseup").mouseup(function () {
                	$($(this).children(".clickText")).removeClass("mousedown");
                	Tracking.BtnClick("搜全程按钮");
                    Utility.initConditionalInput();
                    Utility.currentKeywordSearch =false;
                    Controler.transfer(new SearchConditionalView());
                }).unbind("mousedown").mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                $("#historyBtn").unbind("mouseup").mouseup(function () {  
                	$($(this).children(".clickText")).removeClass("mousedown");
                		if(Utility.popflag[1]){
                			Tracking.BtnClick("历史记录按钮");
                			$(this).addClass("selected");
                			Utility.falgUp(1);
		                    Controler.popUp_bg(Popup.history);
		                    Utility.showHistoryKeyWord(Utility.getHistoryKeyWord());
		                    //$(".triangle_icon").setStyle("left", "700px").setStyle("display", "block");
                		}else{
                			$(this).removeClass("selected");
                			Controler.popDown();
                			Utility.flagDown();
                		}
                }).unbind("mousedown").mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                $("#clearHistoryYesBtn").unbind("mouseup").mouseup(function(){
                	$(this).removeClass("selected");
                	Utility.clearHistoryKeyWord();
                	Controler.popDown();
        			Utility.flagDown();
        			$("#historyBtn").removeClass("selected");
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("selected");
                });
                $(".confirm_no").unbind("mouseup").mouseup(function(){
                	$(this).removeClass("selected");
                	Controler.popDown();
        			Utility.flagDown();
        			$("#historyBtn").removeClass("selected");
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("selected");
                });
                
                $("#left_search_box_icon").unbind("mouseup").mouseup(function(){
                	$("#SearchIcon").removeClass("mousedown");
                	Utility.currentPage = 1;
                	Utility.currentKeywordSearch = true;
                	Tracking.BtnClick("搜索按钮");
                	//Utility.initConditionalInput();
                	if($("#AdvancedSearchBox").attr("value")!=''){
                		Utility.searchConditional.keyword = $("#AdvancedSearchBox").attr("value");
                        	DianPing.keyWordSearch(function(){
                        		Controler.transfer(new SearchConditionalResultView);
                        	},1);
                	}
                }).unbind("mousedown").mousedown(function(){
                	$("#SearchIcon").addClass("mousedown");
                });
               
            };

            this.show = function () {
                this.prototype.show.call(this);
                //keywordsEffect.init();
                Utility.initConditionalInput();
                $("#historyBtn").removeClass("selected");
                $("#currentCityFlag").html("搜索城市："+(Utility.currentSearchCity));
                $("#AdvancedSearch").css("display", "block");
            };
            this.hide = function () {
            	this.prototype.hide.call(this);
                $("#AdvancedSearch").css("display", "none");
                $(this).removeClass("selected");
                Controler.popDown();
    			Utility.flagDown();
            };

            this.init();
        };
    } ());