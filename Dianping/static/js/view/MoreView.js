/* More View Class*/
var CityInit = true;
    (function () {
        var instance = null;
        MoreView = function () {
            if (instance) {
                return instance;
            }
            instance = this;
            View.call(this, "more", ToolBar.more);
            this.prototype = new View();
            this.prototype.constructor = MoreView;

          //Tracking
            this.pageName="mycadillac:大众点评:更多页面";
            this.channel="大众点评";
            
            this.init = function () {
                $("#more_toolbar .goback").unbind("mouseup").mouseup(function () {
                	$(this).removeClass("mousedown");
                    Controler.goback();
                }).unbind("mousedown").mousedown(function(){
                	$(this).addClass("mousedown");
                });
                $("#changeCityBtn").unbind("mouseup").mouseup(function(){
                	$($(this).children(".clickText")).removeClass("mousedown");
                	if(Utility.popflag[1]){
                    	Utility.falgUp(1);
                    	Tracking.BtnClick("搜索城市切换按钮");
                    	if(CityInit){
                    		DianPing.getCityList(function(){
                        		DianPing.getRegion();
                            	Controler.popUp_bg(Popup.cityList);
                            	$("#changeCityBtn").addClass("selected");
                                $(".triangle_icon").css("left", "250px").css("display", "block");
                        	});
                    		CityInit = false;
                    	}else{
                    		Controler.popUp_bg(Popup.cityList);
                        	$("#changeCityBtn").addClass("selected");
                            $(".triangle_icon").css("left", "250px").css("display", "block");
                    	}
                    }else{
                    	$("#changeCityBtn").removeClass("selected");
                		Controler.popDown();
                		Utility.flagDown();
                	}
                }).unbind("mousedown").mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                $("#dianPingIcon").unbind("mouseup").mouseup(function(){
                	$($(this).find(".unclickableText")).removeClass("mousedown");
                    $("#changeCityBtn").removeClass("selected");
                    Tracking.BtnClick("导航按钮");
                	Controler.popDown();
                	Utility.flagDown();
                }).unbind("mousedown").mousedown(function(){
                	$($(this).find(".unclickableText")).addClass("mousedown");
                });
            };

            this.show = function () {
                this.prototype.show.call(this);
                $("#currentCityFlag").html("搜索城市："+(Utility.currentSearchCity));
                $("#More").css("display", "block");
            };
            this.hide = function () {
            	this.prototype.hide.call(this);
                $("#More").css("display", "none");
                $("#changeCityBtn").removeClass("selected");
            };

            this.init();
        };
    } ());