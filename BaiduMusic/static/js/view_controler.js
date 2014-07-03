/* View Controler */


var Controler = {
		prevView:new Array(),
        currentView:null,
        transfer: function (nextView) {
        	var prevView = null; 
        	if(Controler.prevView.length>0&&Controler.prevView.name!=nextView.name){
        		prevView = Controler.prevView[(Controler.prevView.length-1)];
        		prevView.hide(nextView);
        	}
            
            Controler.currentView = nextView;
            nextView && typeof nextView.show === 'function' && nextView.show(prevView);
            if(Controler.currentView){
            	s.pageName = Controler.currentView.pageName;
            	s.prop1="";
            	s.prop2="";
            	s.t();
            }
            
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
        },
        goback: function () {
        	Controler.currentView.hide();
        	Controler.prevView.pop();
        	var preView = Controler.currentView;
        	Controler.currentView = Controler.prevView[(Controler.prevView.length-1)];
        	
        	Controler.currentView.show(preView);
        },
        preloadLayerShow:function(target,msg){
        	$(target).children().addClass("hiddenv");
        	if($(target).attr("class").indexOf("View")!=-1){
        		$(target).addClass("nobg");
        	}
        	if(!$(target).children(".preloadLayer").length){
        	var preloadLayer = null;
        	var preloadHtml =new Array();
	        	preloadHtml.push("<div class='preloadLayer'>");
		        	/*preloadHtml.push("<div id='floatingCirclesG' style='position: absolute;top: 50%;margin-top: -84px;left: 50%;margin-left: -64px;z-index: 1000;'>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_01'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_02'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_03'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_04'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_05'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_06'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_07'></div>");
			        	preloadHtml.push("<div class='f_circleG' id='frotateG_08'></div>");
		        	preloadHtml.push("</div>");*/
	        		preloadHtml.push("<div class='loading'></div>");
		        	preloadHtml.push("<div class='loadingMsg'>");
		        	msg?preloadHtml.push(msg):preloadHtml.push("数据加载中，请稍后...");
		        	preloadHtml.push("</div>");
		        	//preloadHtml.push("<div id='waitMsg'>è¯·ç¨�å€™...</div>");
		        	    
	        	preloadHtml.push("</div>");
	        	preloadLayer = preloadHtml.join("");
	        	$(target).append(preloadLayer);
        	}else{
        		msg?$(".loadingMsg").html(msg):$(".loadingMsg").html("数据加载中，请稍后...");
        		$(target).children(".preloadLayer").css("display","block").removeClass("hiddenv");
        		//$(target).children(".preloadLayer").removeClass("hiddenv");
        	}
        	Controler.preloadTarget = target;
        },
        preloadLayerHide:function(target){
        	//if($(target).children(".preloadLayer").length){
        		$(target).removeClass("nobg");
        		$(target).children(".preloadLayer").css("display","none");
        		$(target).children().removeClass("hiddenv");
        	//}
        	
        	//$("#dataView").css("display","none");
        },
        preloadTarget:null,
    };
