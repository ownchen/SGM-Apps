var map;
var searchComplete ;
var transit;
var TestFlag = false;
var Log = function(info){
	console.log(info);
	info&&$("#debugContent").html($("#debugContent").html()+"</br>"+info+"</br>");
};
// Display error messages in debug file
window.onerror = function(msg, url, line) {
	Log("ERROR="+msg+" </br> URL="+url+"</br>Line="+line);
	$(".loadingMsg").html("加载失败，请稍后重试");
	setTimeout(function(){
		Controler.goback();
	},2000);
	
};
	
	var Version = "DianPingNew V0915";
	var GetLocation = false;
	var MapInit = function(func){
		//check net environment
		$("#container").css("background","none");
		$(".startView").addClass("hidden");
		Controler.transfer(new SearchCategoryView());
		
		function network_success(){
			Log("connect internet");
		}
		function network_failure(){
			Log("no internet");
		}
		//gm.comm.getNetworkConnectivity(network_success,network_failure);
		$("#currentCityFlag").html("城市搜索中...");
		getLocationCity(function(){
			var script = document.createElement("script");
			script.type = "text/javascript";
			//script.src = "http://webapi.amap.com/maps?v=1.2&key=ua1o1uGofxIMAX9KY36rO2UOd0rCTPIrXCGkfD7Q&callback=getLocationCity";
			script.src = "http://webapi.amap.com/maps?v=1.2&key=ua1o1uGofxIMAX9KY36rO2UOd0rCTPIrXCGkfD7Q&callback=mapInit";
			document.body.appendChild(script);
		});
		//getLocationCity();
        //init function : according the GPS position get the current location city and get the city id in dianping app
	    
	};
	
	function getLocationCity(func){
    	Utility.getCurrentPoint(function(point){
    		getCityName(point.lng,point.lat,function(){
    			
    			GetLocation = true;
    			typeof func =="function"&&func();
    		});
    		
    	});
    };
	
    var Data = {
    	//currentLocationCityId:"",
    	currentLocationCityName:"",
    	currentCityName:"",
    	categoryArray:"",
    	regionArray:"",
    };
    
    
    var keywordsEffect = {
            fontUnit : {
                maxSize: 42,
                minSize: 15,
                reduce: "reduce",
                grow: "grow",
                up: "up",
                down: "down"
            },
            board : document.getElementById('tagBoard'),
            init:function(){
            	var keywords = new Array(12);
            	var keywordsDefault = ["KTV", "浙菜", "火锅", "按摩", "酒店", "美发", "粤菜", "写真", "快餐", "电影", "自助", "川菜"];
            	var keyWordListRecord = Utility.getHistoryKeyWord();
            	var keyWordList = new Array();
            	for(x in keyWordListRecord){
            		if(keyWordListRecord[x].Times>1){
            			keyWordList.push(keyWordListRecord[x]);
            		}
            	}
            	if(keyWordList.length>=12){
            		for(x1 = 0;x1<keywords.length;x1++){
            			keywords[x1] = keyWordList[x1].KeyWord;
            		}
            	}
            	else{
            		for(x2 in keyWordList){
            			for(y in keywordsDefault){
	            			if(keyWordList[x2].KeyWord==keywordsDefault[y]){
	            				keywordsDefault.splice(y,1);
	            			}
                		}
                	};
        			var index = 0;
            		for(var i=0;i<keywords.length;i++){
            			if(keyWordList.length>0&keyWordList.length>i){
            				keywords[i] = keyWordList[i].KeyWord;
            			}else{
            				keywords[i]=keywordsDefault[index];
            				index++;
            			}
            		}
            	}
                var FontList = new Array();
                var wordNumber = keywords.length;
                var initTagsBoard = function () {
                	function cutWords(keyword){
                    		var words = keyword.split("");
                    		var word = new Array();
                    		var length = 0;
                    		for(a in words){
                    			if(length<8){
	                    			if(words[a].match(/[^\x00-\x80^i^l^j]/ig)){
	                    				length+=2;
	                    			}else{
	                    				length+=1;
	                    			}
	                    			word.push(words[a]);
                    			}
                    		}
                    		return keyword= word.join("");
                		}
                    var htmlStr = new Array();
                    for (var i = 0; i < 2; i++) {
                        for (var j = 0; j < wordNumber / 2; j++) {
                            var css = new Array();
                            css.push('class="tags"');
                            css.push('style="');
                            var ranSize = Math.random() * (keywordsEffect.fontUnit.maxSize - keywordsEffect.fontUnit.minSize) + keywordsEffect.fontUnit.minSize;
                            var font = ranSize + 'px' + ' 黑体';
                            css.push('font:' + font + '!important;');
                            var top = 10 + Math.random() * 60 + i * 155;
                            css.push('top:' + top + 'px;');
                            var left = j * 108;
                            css.push('height:'+(parseInt(font)+5)+'px!important;');
                            css.push('line-height:'+(parseInt(font)+5)+'px!important;');
                            css.push('left:' + left + 'px;');
                            css.push('margin:0px!important;');
                            css.push('padding:0px!important;');
                            css.push('position:absolute;');
                            css.push("border:3px solid transparent;");
                            //1-5线性渐变
                            //css.push('-webkit-animation-delay:' + (i*(wordNumber / 2)+j) +'s;');
                            //奇偶渐变
                            //(j % 2 == 0) ? css.push('-webkit-animation-delay:' + 3 + 's; ') : css.push('-webkit-animation-delay:' + 0 + 's;');
                            css.push('"');
                            var showWord = cutWords(keywords[i * wordNumber / 2 + j]);
                            htmlStr.push('<div word="'+keywords[i * wordNumber / 2 + j]+'" ' + css.join('') + '>' + showWord + '</div>');
                            var size = keywordsEffect.fontUnit.grow;
                            var toward = keywordsEffect.fontUnit.down;
                            if (j % 2 == 0) {
                                size = keywordsEffect.fontUnit.reduce;
                                toward = keywordsEffect.fontUnit.up;
                            }
                           
                        }
                    }
                    $("#tagBoard").html(htmlStr.join(""));
                    $("#tagBoard>div").mouseup(function(){
                    	$(this).removeClass("mousedown");
                    	$('#AdvancedSearchBox').attr('value',$(this).attr("word"));
                    	Utility.searchConditional.keyword = $(this).attr("word");
                    	DianPing.keyWordSearch(function(){
                    		Controler.transfer(new SearchConditionalResultView);
                    	},1);
                    }).mousedown(function(){
                    	$(this).addClass("mousedown");
                    });
                };
                initTagsBoard();
        }
    };
    
    var APPInit = function (func) {
    	//init Data
    	//plugin
    	
    	//
    	MapInit(function(){
        	//
        });
    	//init keyboard
    	var keyBoardObj = $("#customkeyboard").keyboard({
            doneCallback: function (d) {
                //alert(d.target.input[0].value);
            	Utility.searchConditional.keyword = d.target.input[0].value;
            	DianPing.keyWordSearch(function(){
            		Controler.transfer(new SearchConditionalResultView);
            	},1);
            },
            EmptyValueCallback: function () {
                //alert("请输入内容");
                
               
            },
            returnCallback: function () {
            }
        });
        //keyBoardObj.RegisterKeyBoadr("#txtArea");
    	
        // initialize scrollable with mousewheel support
        
        //init keywordsEffect
        keywordsEffect.init();
        
        
        
        typeof func == "function" && func();
    };
    
    
$(document).ready(function(){
    	
        $("#appCloseBtn").mouseup(function(){
        	$(this).removeClass("mousedown");
        	gm.system.closeApp(function(){
        		//        		
        	});
        }).mousedown(function(){
        	$(this).addClass("mousedown");
        });
        
        
        
        /*Debug View*/
    	$("#showDebug").mouseup(function(){
    		$("#debugView").removeClass("small");
    		$("#hideDebug").removeClass("hidden");
    		$(this).addClass("hidden");
    	});
    	$("#hideDebug").mouseup(function(){
    		$("#debugView").addClass("small");
    		$("#showDebug").removeClass("hidden");
    		$(this).addClass("hidden");
    	});
    	$("#logoutBox .alertBtn").mouseup(function(){
    		if($(this).html()=="OK"){
    			gm.system.closeApp();
    		}else{
    			$("#logoutBox").addClass("hidden");
    		}
    		
    	});
    	$("#debugPrev").mouseup(function(){
    		var debugView = $("#debugContent");
    		var top = parseInt(debugView.css("top"));
    		var h = 220;
    		if(top<40){
    			debugView.css({
    				"top":(top+h)+"px",
    			});
    		};
    	});
    	$("#debugNext").mouseup(function(){
    		var debugView = $("#debugContent");
    		var top = parseInt(debugView.css("top"));
    		var height = parseInt(debugView.css("height"));
    		var h = 220;
    		if((top*-1+220-40)<=height){
    			debugView.css({
    				"top":(top-h)+"px",
    			});
    		};
    	});
    	var contentHtml = $(HtmlContent);
        $("#container").append($(HtmlContent));
        contentHtml.ready(function(){
        	$("#no_city").mouseup(function(){
        		$(this).removeClass("selected");
            	gm.system.closeApp(function(){
            		//        		
            	});
            }).mousedown(function(){
            	$(this).addClass("selected");
            });
        	//alert("contentLoaded");
        	APPInit(function(){
        		/* SearchCategory View Class*/
                /* SearchRankingList View Class*/
                $(".goback").mouseup(function () {
                	$(this).removeClass("mousedown");
                    Controler.goback();
                }).mousedown(function(){
                	$(this).addClass("mousedown");
                });
                
                $(".searchBtn").mouseup(function () {
                	$(this).removeClass("mousedown");
                    Controler.transfer(new SearchBarView());
                }).mousedown(function(){
                	$(this).addClass("mousedown");
                });
                
                //Guide bar event 
                $("#nearBySearchBtn").mouseup(function () {
                	$($(this).children(".clickText")).removeClass("mousedown");
                    Controler.transfer(new SearchCategoryView());
                }).mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                $("#rankingSearchBtn").mouseup(function () {
                	$($(this).children(".clickText")).removeClass("mousedown");
                    Controler.transfer(new RankingListSearchView());
                }).mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                
        		$('#SearchResultList .resultscrollable').on('jsp-initialised', function () {
        			//Rotary.init($('ul.resourceList li'));
        			jScrollArrow();
        		}).jScrollPane(
        			{
        			    showArrows: true,
        			    verticalArrowPositions: 'os',
        			    horizontalArrowPositions: 'os',
        	    		hideFocus: true,
        	    		verticalDragMinHeight: 30,
        	    		verticalDragMaxHeight: 30,
        	    		animateScroll: true,
        	    		arrowButtonSpeed: 270,
        	    		mouseWheelSpeed: 90,
        	    		trackClickSpeed: 270,
        	    		autoReinitialise: true,
        			}
        		);
        		$('#cityListScrollable').on('jsp-initialised', function () {
        			//Rotary.init($('ul.resourceList li'));
        			jScrollArrow();
        		}).jScrollPane(
        			{
        			    showArrows: true,
        			    verticalArrowPositions: 'os',
        			    horizontalArrowPositions: 'os',
        	    		hideFocus: true,
        	    		verticalDragMinHeight: 30,
        	    		verticalDragMaxHeight: 30,
        	    		animateScroll: true,
        	    		arrowButtonSpeed: 260,
        	    		mouseWheelSpeed: 90,
        	    		trackClickSpeed: 255,
        	    		autoReinitialise: true,
        			}
        		);
        		$('#categoryListScrollable').on('jsp-initialised', function () {
        			//Rotary.init($('ul.resourceList li'));
        			jScrollArrow();
        		}).jScrollPane(
        			{
        			    showArrows: true,
        			    verticalArrowPositions: 'os',
        			    horizontalArrowPositions: 'os',
        	    		hideFocus: true,
        	    		verticalDragMinHeight: 30,
        	    		verticalDragMaxHeight: 30,
        	    		animateScroll: true,
        	    		arrowButtonSpeed: 270,
        	    		mouseWheelSpeed: 90,
        	    		trackClickSpeed: 270,
        	    		autoReinitialise: true,
        			}
        		);
        		$('#reviewZoom').on('jsp-initialised', function () {
        			//Rotary.init($('ul.resourceList li'));
        			jScrollArrow();
        		}).jScrollPane(
        			{
        			    showArrows: true,
        			    verticalArrowPositions: 'os',
        			    horizontalArrowPositions: 'os',
        	    		hideFocus: true,
        	    		verticalDragMinHeight: 30,
        	    		verticalDragMaxHeight: 30,
        	    		animateScroll: true,
        	    		arrowButtonSpeed: 135,
        	    		mouseWheelSpeed: 90,
        	    		trackClickSpeed: 135,
        	    		autoReinitialise: true,
        			}
        		);
        		$('#guidContent').on('jsp-initialised', function () {
        			//Rotary.init($('ul.resourceList li'));
        			jScrollArrow();
        		}).jScrollPane(
        			{
        			    showArrows: true,
        			    verticalArrowPositions: 'os',
        			    horizontalArrowPositions: 'os',
        	    		hideFocus: true,
        	    		verticalDragMinHeight: 30,
        	    		verticalDragMaxHeight: 30,
        	    		animateScroll: true,
        	    		arrowButtonSpeed: 238,
        	    		mouseWheelSpeed: 90,
        	    		trackClickSpeed: 238,
        	    		autoReinitialise: true,
        			}
        		);
        		$('#keywordsList').on('jsp-initialised', function () {
        			//Rotary.init($('ul.resourceList li'));
        			jScrollArrow();
        		}).jScrollPane(
        			{
        			    showArrows: true,
        			    verticalArrowPositions: 'os',
        			    horizontalArrowPositions: 'os',
        	    		hideFocus: true,
        	    		verticalDragMinHeight: 30,
        	    		verticalDragMaxHeight: 30,
        	    		animateScroll: true,
        	    		arrowButtonSpeed: 210,
        	    		mouseWheelSpeed: 90,
        	    		trackClickSpeed: 210,
        	    		autoReinitialise: true,
        			}
        		);
        		
        		function jScrollArrow(){
        			$(".jspArrow").mousedown(function(){
            			$(this).addClass("mousedown");
            		}).mouseup(function(){
            			$(this).removeClass("mousedown");
            		});
        		}
                
                
                $("#favotitesBtn").mouseup(function () {
                	$($(this).children(".clickText")).removeClass("mousedown");
                	Utility.getFavoriteShops();
                    Controler.transfer(new FavoritesListView());
                }).mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                
                $("#moreBtn").mouseup(function () {
                	$($(this).children(".clickText")).removeClass("mousedown");
                    Controler.transfer(new MoreView());
                }).mousedown(function(){
                	$($(this).children(".clickText")).addClass("mousedown");
                });
                
                $("#changeCity_yes").mouseup(function(){
        			$("#changeCityConfirm_popup").css("display","none");
        			$("#alertpopup").css("display","none");
                	//Utility.saveLocalStorage({CityId:Data.currentLocationCityId,CityName:Data.currentLocationCityName});
                	//Data.currentCityId =Data.currentLocationCityId;
                	Data.currentCityName = Utility.currentLocationCity;
                    DianPing.getRankShopType(function(){
                    	DianPing.getRegion();
                    });
                });
                $("#changeCity_no").mouseup(function(){
                	$("#changeCityConfirm_popup").css("display","none");
        			$("#alertpopup").css("display","none");
                	var City = Utility.getLocalStorage();
                	//Data.currentCityId =City[0].CityId;
                	Utility.currentLocationCity = City[0].CityName;
                	DianPing.getRankShopType(function(){
                		Controler.popDown();
                		DianPing.getRegion();
                	});
                });
//                $(".maskbg").mouseup(function(){
//                	Controler.hidebox();
//                	Controler.popDown();
//        			Utility.flagDown();
//                });
        		
        	});
        });
    	
    	
    	
    });
    
	
    
var DebugInit = function(){
	/*Debug View*/
	$("#showDebug").mouseup(function(){
		$("#debugView").removeClass("small");
		$("#hideDebug").removeClass("hidden");
		$(this).addClass("hidden");
	});
	$("#hideDebug").mouseup(function(){
		$("#debugView").addClass("small");
		$("#showDebug").removeClass("hidden");
		$(this).addClass("hidden");
	});
	$("#logoutBox .alertBtn").mouseup(function(){
		if($(this).html()=="OK"){
			gm.system.closeApp();
		}else{
			$("#logoutBox").addClass("hidden");
		}
	});
	$("#debugPrev").mouseup(function(){
		var debugView = $("#debugContent");
		var top = parseInt(debugView.css("top"));
		var h = 220;
		if(top<40){
			debugView.css({
				"top":(top+h)+"px",
			});
		};
	});
	$("#debugNext").mouseup(function(){
		var debugView = $("#debugContent");
		var top = parseInt(debugView.css("top"));
		var height = parseInt(debugView.css("height"));
		var h = 220;
		if((top*-1+220-40)<=height){
			debugView.css({
				"top":(top-h)+"px",
			});
		};
	});
};
    