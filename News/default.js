function defaultPage() {
	
	$.fn.extend({
	    registerButtonFeedBack: function (downBgImage, upBgImage) {
	        this.mousedown(function () {
	            $(this).css("background-image", "url(" + downBgImage + ")");
	        });
	        this.mouseup(function () {
	            $(this).css("background-image", "url(" + upBgImage + ")");
	        });
	    }
	});

    this.showProgressBox = function (msg) {
        $("#progressBoxMessage").text(msg);
        $("#progressBox").show();
        $("#msgBoxS").css("left", ($("body").width()-$("#msgBoxS").width())/2);
        return $("#progressBox");
    };

    this.closeProgressBox = function () {
        $("#progressBox").hide();
        return $("#progressBox");
    };
    
    this.showMenuBox = function(){
    	$("#iconBox").show();
        $("#img_sina").attr("src", "images/menu.png");
    };

    this.hideMenuBox = function(){
    	$("#iconBox").hide();
        $("#img_sina").attr("src", "images/menu_2.png");
    };

    $("#progressBox").click(function () {
        gm.ngi.news.defaultPage.closeProgressBox();
    });

    function refreshNewsList() {
        gm.ngi.news.defaultPage.showProgressBox("加载中...");
    	tracer.begin("refreshNewsList: " + gm.ngi.news.app.currentColumn, "NewsList");
        gm.ngi.news.newsDAL.refreshNewsList(gm.ngi.news.app.currentColumn, function (d) {
        	tracer.begin("refreshNewsList: " + gm.ngi.news.app.currentColumn, "NewsList");
        	showNewsList(d);
        });
    }

    function showNewsList(d){
    	tracer.begin("showNewsList: " + $("#topTitle").text(), "NewsList");
        if (d) {
            gm.ngi.news.app.renderList(d);
//            s.pageName="mycadillac:sina新闻:新闻列表:" + $("#topTitle").text();
//            s.t();
            //$("#newsListBox").scrollTop(0);
            $("#newsListBox ul li").bind("mousedown", function(){
            	$(this).addClass("mousedown");
            });
            $("#newsListBox ul li").bind("mouseup", function(){
            	$(this).removeClass("mousedown");
            });
        }
        
        gm.ngi.news.app.showPanel("newsListBox");
        $("#newsListBox").reInitJsp();
        gm.ngi.news.defaultPage.closeProgressBox();
    	tracer.end("showNewsList: " + $("#topTitle").text(), "NewsList");
    }
    
    function refreshNewsItem() {
        gm.ngi.news.defaultPage.showProgressBox("加载中...");
        var message = "refreshNewsItem: " + gm.ngi.news.app.currentDIV.find(".newsTitleBox2").text() + "(" + gm.ngi.news.app.currentDetailId + ")";
    	tracer.begin(message, "NewsItem");
        gm.ngi.news.newsDAL.refreshNewsItem(gm.ngi.news.app.currentColumn, gm.ngi.news.app.currentDetailId, function (d) {
        	tracer.end(message, "NewsItem");
        	showNewsItem(d);
            gm.ngi.news.defaultPage.closeProgressBox();
        });
    }
    
    function showNewsItem(d){
    	tracer.begin("showNewsItem", "NewsItem");
        if (d && d.content){
        	gm.ngi.news.app.showPanel("newsListBox2");
            gm.ngi.news.app.renderDetail(d);
//            s.pageName = "mycadillac:sina新闻:新闻详情页面:" + $("#topTitle").text() + ":" + d.title;
//            s.t();
        }
        gm.ngi.news.app.showDetailPanel(gm.ngi.news.app.currentColumn);
        $("#newsListBox2").reInitJsp();
    	tracer.end("showNewsItem", "NewsItem");
    }
    
    function switchToNewsColumn(columnName){
    	gm.ngi.news.defaultPage.showProgressBox("加载中...");
        var columnID = gm.ngi.newssdk.Columns[columnName];
        
    	tracer.begin("getNewsList: " + columnName, "NewsList");
        gm.ngi.news.newsDAL.getNewsList(columnID, function(list){
        	tracer.end("getNewsList: " + columnName, "NewsList");
        	showNewsList(list);
        });

    	$("#newsListBox").getScroller().scrollToTop();
    }
    
    // 车速提示
    var speedingDialog = null;
    var lastSpeedState = gm.system.getSpeed();

    function showSpeedingDialog() {
        var curId = gm.ngi.news.app.currentDIV[0].id;
        if (curId == "speedDialog" || curId != "newsListBox2") {
            // 仅在详情页处理速度变化。
            return;
        }
        gm.ngi.news.app.showPanel("speedDialog");
        var newsTitle = $(".newsTitleBox2").text().trim();
        $("#titleOfCurrentNews").html(newsTitle);
        $("#ttsButton").hide();
        $("#li_back").hide();
        $("#btnRefresh").hide();
    }

    function hideSpeedingDialog() {
        $("#ttsButton").show();
//        $("#li_back").hide();
        $("#btnRefresh").show();
        gm.ngi.news.app.showPanel("newsListBox2");
        $("#newsListBox2").reInitJsp();
    }

    function checkSpeeding() {
        if (gm.system.getSpeed() > 0) {
            showSpeedingDialog();
        }
    }
    
    function registerSpeedWatcher(){
        gm.system.watchSpeed(function (curState) {
            //console.log("watchSpeed, state changed to: " + curState);
            if (lastSpeedState == 0 && curState > 0) {
                // 车辆从静止变化为行驶
                showSpeedingDialog();
            } else if (lastSpeedState > 0 && curState == 0) {
                // 车辆从行驶变化为静止，如果弹窗已显示，则关闭弹窗。
                hideSpeedingDialog();
            }
            lastSpeedState = curState;
        }, function () {
            console.log("watchSpeed failed");
        });
    }

    function registerEventHandlers(){
    	// 刷新按钮
        $("#btnRefresh").registerButtonFeedBack("images/reload2.png", "images/reload.png");
        $("#btnRefresh").click(function () {

            var id = gm.ngi.news.app.currentDIV.attr("id");
            if (id == "newsListBox") {
                refreshNewsList();
            } else if (id == "newsListBox2") {
                refreshNewsItem();
            }
        });
        
        // 列表项 click ,goto detail page
        $("#newsListBox li").live("click", function () {
            
        	var item = $(this);
            var pk = item.attr("pk");
            item.attr("class", "readitem");	// 标记为已读
            
            gm.ngi.news.defaultPage.showProgressBox("加载中...");
            var message = "getNewsItem: " + item.children("a").text() + "(" + pk + ")";
        	tracer.begin(message, "NewsItem");
            gm.ngi.news.newsDAL.getNewsItem(gm.ngi.news.app.currentColumn, pk, function (d) {
            	tracer.end(message, "NewsItem");
                if (d) {
                	showNewsItem(d);
                    checkSpeeding();
                    $("#newsListBox2").getScroller().scrollToTop();
                }
                gm.ngi.news.defaultPage.closeProgressBox();
            });

        });
        $("#newsListBox li").bind("mousedown", function (){
        	$(this).css("margin-left", "5px");
        });
        $("#newsListBox li").bind("mouseup", function (){
        	$(this).css("margin-left", "0px");
        });
        
        $("#newsListBox2 li").click(function(){
    		var api = $("#newsListBox2").data("jsp");
    		if (!api)
    			return;
    		if (api.getPercentScrolledY() == 1){
    			api.scrollToY(0, true);
    		} else {
    			api.scrollByY(100);
    		}
        });

        // Column click , goto newslist page.
        $("#iconBox li").click(function () {
            // 停止播报
            try {
                $player.stop();
            }
            catch (ex) { }
            var item = $(this);
            var columnName = item.attr("pk");
            switchToNewsColumn(columnName);
        });

        // 详情页返回按钮
        $("#li_back").registerButtonFeedBack("images/v2/back_click.png", "images/v2/back.png");
        $("#li_back").click(function () {
            gm.ngi.news.app.showPanel("newsListBox");
            $("#newsListBox").reInitJsp();
        });
        
        function channelClicked(){
            if (gm.ngi.news.app.currentDIV[0].id == "speedDialog")
                return;
            
            var isHidden = $("#iconBox")[0].style.display == "none";
            if (isHidden){
            	gm.ngi.news.defaultPage.showMenuBox();
            } else {
            	gm.ngi.news.defaultPage.hideMenuBox();
            }
        }

        $("#topTitle").click(channelClicked);
        $("#img_sina").click(channelClicked);
        
        // TTS 按钮
        $("#ttsButton").click(function () {
           $player.btnPlayClicked();
        });

        // 行驶模式下的TTS 按钮
        $("#btnPlayInSpeedDialog").click(function () {
            $player.btnPlayClicked();
        });

        $("#btnPQuitInSpeedDialog").click(function () {
            $player.stop();
            gm.appmanager.closeApp();
        });


        $("#btnPlayInSpeedDialog")
        .bind("mousedown", function(){
        	$(this).css("color", "#00A0E3");
        }).bind("mouseup", function(){
        	$(this).css("color", "white");
        });
        
        $("#btnPQuitInSpeedDialog")
        .bind("mousedown", function(){
        	$(this).css("color", "#00A0E3");
        }).bind("mouseup", function(){
        	$(this).css("color", "white");
        });
    }

    function configCloseButton() {
        var mTopBox = $("#pageBox");
        if (mTopBox && mTopBox[0]) {
            var tmpClose = $("<div class=\"closeButton2\"></div>");
            tmpClose.appendTo(mTopBox);
            tmpClose.bind("click", function () {
//                $player.stop();
                gm.appmanager.closeApp();
            });
        }

    }
    
    function setTracePage(){
    	tracerSettings = {
    			appName: "News",
    			beforeUpload: function(){
    				gm.ngi.news.defaultPage.showProgressBox("upload logs...");
    			},
    			afterUpload: function(xhr, ts){
    				if (ts == "success"){
    					gm.ngi.news.defaultPage.showProgressBox(xhr.responseText, 30000);
    				} else {
    					gm.ngi.news.defaultPage.showProgressBox("upload failed", 5000);
    				}
    			}
    		};
    	new TracerPage(tracerSettings);
    }
        
    // Api调用失败的处理
    gm.ngi.news.newsDAL.newsApi.apiConnectionError = function () {
    	gm.ngi.news.defaultPage.showProgressBox("哎呀，你的网络好像有点问题，请重试！");
    };
    
    gm.ngi.news.newsDAL.newsApi.apiServerError = function (d) {
    	gm.ngi.news.defaultPage.showProgressBox("获取新闻失败。错误码：" + d.data.error_code);
    };

    function startApp() {
        $("#topBox").show();
        $("#bodyBox").show();
        $("#pageBox").show();
        configCloseButton();
        switchToNewsColumn("China");
        setTimeout(function(){
        	tracer.info("wait a while", "startup");
            var columnID = gm.ngi.newssdk.Columns["Top"];
        	tracer.info("begin download top news background", "startup");
        	gm.ngi.news.newsDAL.getNewsList(columnID, function(d){
            	tracer.info("background job done", "startup");
        	});
        }, 1000);
        $("#imgSplash").hide();

    }

    $(document).ready(function (){
    	
    	tracer.info("document ready", "startup");
    	
        setTimeout(function(){
            $("#newsListBox").initJsp(false, 288);
            $("#newsListBox2").initJsp(false, 100);
            tracer.info("initJsp", "startup");
            
            gm.ngi.news.app.listControl = $("#newsListBox ul");
            gm.ngi.news.app.detailControl = $("#newsListBox2 ul");
            gm.ngi.news.app.currentDIV = $("#iconBox");
            gm.ngi.news.app.preverDIV = $("#iconBox");

            registerEventHandlers();
            tracer.info("registerEventHandlers", "startup");

            registerSpeedWatcher();
            tracer.info("registerSpeedWatcher", "startup");
        	
            setTracePage();

            startApp();
        }, 100);
        
    });
}

gm.ngi.news.defaultPage = new defaultPage();

// obselete
function setStatusText(s, dl) {
    if (dl) {
        dl.close();
        dl = gm.ngi.msgbox.show(s);
    } else {
        dl = gm.ngi.msgbox.showLoad(s);
    }
    dl.setClickEnable(1);
    setTimeout(function () {
        dl.close();
    }, 3000);
}

function iconOver(name, obj) {

    obj.getElementsByTagName("img")[0].src = "images/" + name + "2.png";
    var text = "头条";
    if (name == "head_0") text = "头条";
    if (name == "world_0") text = "国际";
    if (name == "china_0") text = "国内";
    if (name == "social_0") text = "社会";
    if (name == "finance_0") text = "财经";
    if (name == "military_0") text = "军事";
    if (name == "sport_0") text = "体育";
    if (name == "technology_0") text = "科技";
    if (name == "amusement_0") text = "娱乐";
    $("#topTitle").html(text);
}

function iconOut(name, obj) {

    obj.getElementsByTagName("img")[0].src = "images/" + name + "1.png";

}


