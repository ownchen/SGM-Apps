var Controler = {
		prevView:new Array(),
        currentView:null,
        currentBox:null,
        transfer: function (nextView) {
        	if(Controler.prevView.length>0&&Controler.prevView.name!=nextView.name){
        		Controler.prevView[(Controler.prevView.length-1)].hide();
        	}
            if(nextView){
            	typeof nextView.show === 'function' && nextView.show();
                //Tracking
                s.pageName=nextView.pageName;
                s.channel=nextView.channel;
                s.prop1="";
                s.prop2="";
                s.t();
            }  
            
            Controler.currentView = nextView;
            if(Controler.currentView){
            	if(Controler.prevView.length>0){
            		if(Controler.currentView.name!=Controler.prevView[Controler.prevView.length-1].name){
            			Controler.prevView.push(Controler.currentView);
            		}
            	}else{
            		Controler.prevView.push(Controler.currentView);
            	}
            }
            if(Controler.prevView.length>10){
            	Controler.prevView.shift();
            }
            Controler.preloadLayerHide();
        },
        goback: function () {
        	Controler.currentView.hide();
        	Controler.prevView.pop();
        	Controler.currentView = Controler.prevView[(Controler.prevView.length-1)];
        	Controler.currentView.show();
        	Controler.preloadLayerHide();
        },
        showbox: function (targetBox) {
            targetBox.show();
            Controler.currentBox = targetBox;
        },
        hidebox: function () {
        	if(Controler.currentBox){
        		Controler.currentBox.hide();
        	};
        },
        popUp_bg: function (targetPopup) {
            Popup.show_bg(targetPopup);
        },
        popUp: function (targetPopup) {
            Popup.show(targetPopup);
        },
        popDown: function () {
            Popup.hide();
        },
        preloadLayerShow:function(target,msg){
        	$(target).children().addClass("hidden");
        	$("#appCloseBtn").removeClass("hgidden");
        	if(!$(target).children(".preloadLayer").length){
        	var preloadLayer = null;
        	var preloadHtml =new Array();
	        	preloadHtml.push("<div class='preloadLayer'>");
	        	preloadHtml.push("<div class='cover'></div>")
		        	/*preloadHtml.push("<div id='floatingCirclesG' style='position: absolute;top: 50%;margin-top: -100px;left: 50%;margin-left: -100px;z-index: 1000;'>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_01'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_02'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_03'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_04'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_05'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_06'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_07'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_08'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_09'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_10'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_11'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_12'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_13'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_14'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_15'></div>");
		        	preloadHtml.push("</div>");*/
		        	preloadHtml.push("<div class='loadingMsg'>");
		        	msg ? preloadHtml.push(msg):preloadHtml.push("加载中，请稍后...");
		        	preloadHtml.push("</div>");
		        	    
	        	preloadHtml.push("</div>");
	        	preloadLayer = preloadHtml.join("");
	        	$(target).append(preloadLayer);
        	}else{
        		msg?$(target).children(".loadingMsg").html(msg):$(".loadingMsg").html("加载中，请稍后...");
        		$(target).children(".preloadLayer").css("display","block").removeClass("hidden");
        	}
        	
        	Controler.preloadTarget.unshift(target);
        },
        preloadLayerHide:function(target){
        	if(!target){
        		for(i in Controler.preloadTarget){
        			$(Controler.preloadTarget[i]).children(".preloadLayer").css("display","none");
                	$(Controler.preloadTarget[i]).children().removeClass("hidden");
        		}
        		Controler.preloadTarget = new Array();
        	}else{
        		$(target).children(".preloadLayer").css("display","none");
            	$(target).children().removeClass("hidden");
        	}
        	
        },
        preloadTarget:new Array(),
    };
         