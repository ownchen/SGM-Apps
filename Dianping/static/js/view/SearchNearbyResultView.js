/* SearchNearbyResult View Class*/
    (function () {
        var instance = null;
        SearchNearbyResultView = function () {
            if (instance) {
                return instance;
            }
            instance = this;
            View.call(this, "searchresult", ToolBar.searchNearbyResult);
            this.prototype = new View();
            this.prototype.constructor = SearchNearbyResultView;
            
          //Tracking
            this.pageName="mycadillac:大众点评:附近搜索结果页面";
            this.channel="大众点评";
            
            this.init = function () {
                $("#searchNearbyResult_toolbar .goback").unbind("mouseup").mouseup(function () {
                    Controler.goback();
                });
                
                $("#scopeResultBtn").unbind("mouseup").mouseup(
                	function () {
                		$($(this).children(".clickText")).removeClass("mousedown");
                		if(Utility.popflag[1]){
                			Tracking.BtnClick("搜索范围选择按钮");
                			$("#searchNearbyResult_toolbar .toolbar_centerRight>div").removeClass("selected");
                			Utility.falgUp(1);
		                    Controler.popUp_bg(Popup.nearBy);
		                    $(this).addClass("selected");
		                    $(".triangle_icon").css("left", "145px").css("display", "block");
                		}else{
                			$(this).removeClass("selected");
                			Controler.popDown();
                			Utility.flagDown();
                		}
                }).unbind("mousedown").mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                $("#shopTypeBtn").unbind("mouseup").mouseup(
                	function () {
                		$($(this).children(".clickText")).removeClass("mousedown");
                		if(Utility.popflag[2]){
                			Tracking.BtnClick("搜索子类选择按钮");
                			$("#searchNearbyResult_toolbar .toolbar_centerRight>div").removeClass("selected");
                			Utility.falgUp(2);
		                    Controler.popUp_bg(Popup.food);
		                    $(this).addClass("selected");
		                    $(".triangle_icon").css("left", "325px").css("display", "block");
                		}else{
                			$(this).removeClass("selected");
                			Controler.popDown();
                			Utility.flagDown();
                		}
                }).unbind("mousedown").mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                $("#sortResultBtn").unbind("mouseup").mouseup(
                	function () {
                		$($(this).children(".clickText")).removeClass("mousedown");
                		if(Utility.popflag[3]){
                			Tracking.BtnClick("搜索排序选择按钮");
                			$("#searchNearbyResult_toolbar .toolbar_centerRight>div").removeClass("selected");
                			Utility.falgUp(3);
		                    Controler.popUp_bg(Popup.sort);
		                    $(this).addClass("selected");
		                    $(".triangle_icon").css("left", "505px").css("display", "block");
                		}else{
                			$(this).removeClass("selected");
                			Controler.popDown();
                			Utility.flagDown();
                		}
                }).unbind("mousedown").mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                $("#nearby_popup li").unbind("mouseup").mouseup(function () {
                	$(this).removeClass("mousedown");
                	$("#nearby_popup li").removeClass("selectedWhite");
                	$(this).addClass("selectedWhite");
                	$("#scopeResultBtn").attr("radius",$(this).attr("radius"));
                	$("#scopeResultBtn").removeClass("selected");
                	$("#scopeResultBtn>div").html($(this).html());
                	
    				var category = $("#shopTypeBtn").children().html();
    				var radius = parseInt($(this).attr("radius"));
    				var sortid = parseInt($("#sortResultBtn").attr("sortid"));		
    				DianPing.getNearbySearchResult(function(){
    					
    				},category,radius,sortid,1);
    				
                    Controler.popDown();
        			Utility.flagDown();
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
                $("#default_sort_popup li").unbind("mouseup").mouseup(function(){
                	$(this).removeClass("mousedown");
                	$("#default_sort_popup li").removeClass("selectedWhite");
                	$(this).addClass("selectedWhite");
                	$("#sortResultBtn").attr("sortid",$(this).attr("sortid"));
                	$("#sortResultBtn>div").html($(this).html());
                	$("#sortResultBtn").removeClass("selected");
                	var category = $("#shopTypeBtn").children().html();
    				var radius = parseInt($("#scopeResultBtn").attr("radius"));
    				var sortid = parseInt($("#sortResultBtn").attr("sortid"));		
    				DianPing.getNearbySearchResult(function(){},category,radius,sortid,1);
    				
                	Controler.popDown();
        			Utility.flagDown();
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
                
            };
            
            this.show = function () {
                this.prototype.show.call(this);
                $("#searchNearbyResult_toolbar .selected").removeClass("selected");
                $("#SearchResultList").css("display", "block");
                
                
            };
            this.hide = function () {
            	this.prototype.hide.call(this);
                $("#SearchResultList").css("display", "none");
            };

            this.init();
        };
    } ());
