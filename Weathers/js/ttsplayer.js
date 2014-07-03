$player = {
	isPlaying : false,
	handle : 0,
	content : null
};

$player.getTTSContentFromDoc = function() {
	return this.content;
};

$player.play = function() {
	appendLog("play...");
	$("#playState").show();
	var content = this.getTTSContentFromDoc();
	this.handle = gm.voice.startTTS(function() {
		$("#playState").hide();
		$player.handle = 0;
	}, function() {
		$("#playState").hide();
		$player.handle = 0;
	}, content);
};

$player.stop = function() {
	appendLog("stop: " + this.handle);
	gm.voice.stopTTS(this.handle);
	this.handle = 0;
	$("#playState").hide();
};

$player.btnPlayClicked = function() {
	if (this.handle > 0) {
		this.stop();
	} else {
		this.play();
	}
}

//window.onerror = function(msg, url, line) {
//	appendLog("ERROR: " + msg + "\n" + url + ":" + line);
//	return true;
//}

function appendLog(text) {
	var content = readFile("ttsLog.txt");
	content = content + "\r\n======\r\n" + text;
	saveFile("ttsLog.txt", content);
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

/*
 * 模拟gm.voice.TTS
 * */

var overrideTTS = false;
if (overrideTTS){
	gm.voice.startTTS = function(success, fail, content){
		console.log(content);
		setTimeout(function(){
			success();
		}, 3000);
		return 10;
	}
	gm.voice.stopTTS = function(handle){
	}	
}

