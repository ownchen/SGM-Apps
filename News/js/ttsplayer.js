function TTSPlayer() {
    this.handle = 0;
    this.newsItem = null;
    this.newsList = null;
    this.stopRequested = false;
    this.lastClicked = new Date();

    this.getTTSContentFromDoc = function () {
        var maxLen = 350;
        var periodChar = "。";
        var content = $(".newsTitleBox2").text().trim() + "， " + $(".newsContent2").text().trim();
        // 取消400字限制
//        if (content) {
//            if (content.length > maxLen) {
//                content = content.substring(0, 350);
//                var periodIndex = content.lastIndexOf(periodChar);
//                if (periodIndex > 0) {
//                    content = content.substring(0, periodIndex + 1);
//                }
//            }
//        }

        return content;
    };

    // 已过时
    this.getCurrentTitle = function () {
        return "新闻标题：" + this.newsItem.title + "，显示标题" + $(".newsTitleBox2").text().trim() + "，播报结束。";
    };

    // 已过时
    this.generateTTSContent = function (item) {
        var maxLen = 350;
        var periodChar = "。";
        var content = item.title + " " + item.content;
        if (content) {
            if (content.length > maxLen) {
                content = content.substring(0, 350);
                var periodIndex = content.lastIndexOf(periodChar);
                if (periodIndex > 0) {
                    content = content.substring(0, periodIndex + 1);
                }
            }
        }
        return content;
    };

    this.onTTSStopped = function () {
        $("#playState").hide();
        this.handle = 0;
        $("#btnPlayInSpeedDialog").html("播放");
    };

    this.play = function () {

        var content = this.getTTSContentFromDoc();
        console.log(content);

        $("#playState").show();
        $("#btnPlayInSpeedDialog").html("停止");

        this.handle = gm.voice.startTTS(
            function () {
                // success
                window.$player.onTTSStopped();

                var curId = gm.ngi.news.app.currentDIV[0].id;
                if (curId != "speedDialog") {
                    return;
                }

                if (this.stopRequested) {
                	this.stopRequested = false;
                    return;
                }

                // 以下为行驶模式下，自动定位至下一条新闻

                gm.ngi.news.newsDAL.getNewsList(gm.ngi.news.app.currentColumn, function (newsList) {
                	this.newsList = newsList;
                    var item = this.newsList.items.shift();
                    while (item) {
                        if (item.id == gm.ngi.news.app.currentDetailId) {
                        	this.newsItem = item;
                            break;
                        }
                        item = this.newsList.items.shift();
                    }
                });

                var item = this.newsList.items.shift();
                if (item) {
                    gm.ngi.news.defaultPage.showProgressBox("加载中...");
                    gm.ngi.news.newsDAL.getNewsItem(this.newsList.columnId, item.id, function (d) {
                        if (d) {
                            gm.ngi.news.app.renderDetail(d);
                            gm.ngi.news.app.showDetailPanel(gm.ngi.news.app.currentColumn);
                            $("#titleOfCurrentNews").html(d.title);
                            $("#newsListBox2").reInitJsp();
                            this.play();
                        }
                        gm.ngi.news.defaultPage.closeProgressBox();
                    });
                }

            },
            // TTS Failed
            function () {
                appendLog("tts error");
                window.$player.onTTSStopped();

            }, content);
        appendLog("tts invoked.");

    };

    this.stop = function () {
        $("#playState").hide();
        appendLog("invoke gm.voice.stopTTS");
        $player.stopRequested = true;
        gm.voice.stopTTS(this.handle);
    };


    this.btnPlayClicked = function () {
    	// 避免暴力点击
    	var now = new Date();
    	var duration = now - this.lastClicked;
    	this.lastClicked = now;
    	if (duration < 500)
    		return;
    	
        if (this.handle > 0) {
            this.stop();
        } else {
            this.play();
            return;
        }
    };
};

$player = new TTSPlayer();
var logFile = "TTSLOG";

function appendLog(text) {
    return;
    var content = readFile(logFile);
    var d = new Date();
    content = content + "\r\n\r\n====== " + d.toString() + " ======\r\n" + text + " (ttsHandle: " + $player.handle + ")";
    saveFile(logFile, content);
    console.log(text);
}

function saveFile(path, content) {
    content = escape(content);
    var result = gm.io.writeFile(path, content);
    return result;
}

function readFile(path) {
    var result = gm.io.readFile(path);
    if (typeof (result) == "number") {
        result = null;
    } else {
        result = unescape(result);
    }
    return result;
}

function clearLog() {
    gm.io.writeFile(logFile, "");
}

/*
 * 模拟器上 模拟gm.voice.TTS
 */

if (navigator.platform == "Win32"){
    gm.voice.startTTS = function (success, fail, content) {
        setTimeout(function () {
            success();
        }, 3000);
        return 10;
    }
    gm.voice.stopTTS = function (handle) {
    }
}


