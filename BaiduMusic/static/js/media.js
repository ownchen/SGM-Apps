
/*
function init() {
	//!localPlayBtn && (localPlayBtn = documennt.getElementById("localPlayBtn"));
	var localMedia = new Media("Supercell.mp3");
	LocalPlayBtn.addEventListener("click",function(){
		SdkMedia.play(localMedia);
	});
	//!localPauseBtn &&(locapPauseBtn = document.getElementById("locapPauseBtn"));
	LocalPauseBtn.addEventListener("click", function(e){
		SdkMedia.pause(localMedia);
	});
	var netMedia = new Media("http://www.jplayer.org/audio/mp3/Miaow-05-The-separation.mp3");
	NetPlayBtn.addEventListener("click",function(){
		SdkMedia.play(netMedia);
	});
	//!localPauseBtn &&(locapPauseBtn = document.getElementById("locapPauseBtn"));
	NetPauseBtn.addEventListener("click", function(e){
		SdkMedia.pause(netMedia);
	});
}
*/
/* Media DebugLogic to make up for lack of functionality in framework */

var CodeStatus = null;

var Media = function(url,type,callback){
	//status
	var self = this;
	this.status = "stopped";
	if(type){
		this.type = type;
	}else{
		this.type = null;
	}
	if(this.type=="radio"){
		
	}
	
	this.code = 10;
	this.handle = null;
	this.timeStarted = null;
	this.position=0;
	this.focused = false;
	this.url = url;
	this.callback = callback;
	this.paused = false;
	
	DebugLog("new "+this.type+" Media url="+this.url);
	//change position to currenttime mm:ss:00
	this.getCurrenttime  = function(position){
		position!=0&&!position&&(position = self.compoundMediaTime());
		return changeMillisecondTime(position);
	};
	
	this.resetMediaTime = function(){
		DebugLog("resteMediaTime");
		self.timeStarted = null;
		self.position = 0;
	};
	
	this.compoundMediaTime = function() {
		var now = new Date().getTime();
		var started = self.timeStarted;		
		var elapsed =0;
		if (started && self.status=="playing") {
			elapsed = now - started;
			self.position = self.position || 0;
			self.position += elapsed;
			self.timeStarted = now;
		}
		DebugLog("compoundMediaTime started="+started+" now="+now+" status="+self.status+" elapsed="+elapsed);
		return self.position;
	};
	
	this.pauseMediaTime = function(){
		DebugLog("pauseMediaTime");
		self.timeStarted = null;
	};
	
	this.interval=null,
	//歌曲开始播放状态
	this.spacetime = 1000;//毫秒
	this.start = function(){
//		DebugLog("MeidaStatus:Start! + media.handle="+self.handle);
//		if(self.handle){
//			DebugLog("start interval");
//			self.interval = setInterval(self.getTime,self.spacetime);
//		}
	};
	
	this.getTime = function(){
		var t = self.getCurrenttime();
		DebugLog("getTime() => currenttime="+t);
		//currenttime.innerHTML = t;
		return t;
	};
	
	this.play = function(){
		DebugLog("media play");
		SdkMedia.play(self);
	};
	
	this.pause = function(){
		DebugLog("media pause");
		//before pause events
		if(self.type===SdkMedia.currentMedia.type){
			SdkMedia.pause(self);
		}else{
			SdkMedia.play(self);
		}
	};
};


var SdkMedia = {};

SdkMedia.play = function (media) {
	//SdkMedia.stop(media);
	DebugLog("SdkMedia.play+media="+media+" currentMedia="+SdkMedia.currentMedia);
	if(SdkMedia.currentMedia){
		SdkMedia.stop(SdkMedia.currentMedia);
	}
	if(SdkMedia.currentMedia&&SdkMedia.currentMedia.url!=media.url){
		DebugLog("SdkMedia.currentMedia.status="+SdkMedia.currentMedia.status);
		//if(SdkMedia.currentMedia.status==="playing"){
//		debugger;
			if(SdkMedia.currentMedia.type === media.type){
				//SdkMedia.pause(SdkMedia.currentMedia);	
				/*if(SdkMedia.currentMedia.type==="radio"){
					$("#radioPlayBtn").addClass("playStopBtn").removeClass("playBtn");
					$("#playBtn").addClass("playBtn").removeClass("playStopBtn");
				}else{
					$("#playBtn").addClass("playStopBtn").removeClass("playBtn");
					$("#radioStopBtn").addClass("playBtn").removeClass("playStopBtn");
				}*/
			}else{
				SdkMedia.stop(SdkMedia.currentMedia);
				/*if(SdkMedia.currentMedia.type==="radio"){
					$("#radioPlayBtn").addClass("playStopBtn").removeClass("playBtn");
					$("#playBtn").addClass("playBtn").removeClass("playStopBtn");
				}else{
					$("#playBtn").addClass("playStopBtn").removeClass("playBtn");
					$("#radioStopBtn").addClass("playBtn").removeClass("playStopBtn");
				}*/
			}
		//}
	}
	SdkMedia.currentMedia = media;
	
	//media.resetMediaTime();
	media.start();
	setTimeout(function(){
		media.handle = gm.media.play(media.url, "exclusiveAudio", playerCallback);
	},1000);
	
};
	
SdkMedia.pause = function (media) {
	!media&& (medai=SdkMedia.currentMedia);
	if(SdkMedia.currentMedia.type === media.type){
		if (media.handle) {
			gm.media.pause(media.handle);//media.handle=>The handle of the media object.
		}
	}else{
		if (SdkMedia.currentMedia.handle) {
			gm.media.stop(SdkMedia.currentMedia.handle);
		}
	}
	SdkMedia.currentMedia = media;
	DebugLog("Inside sdk media pause");
	
};
	
SdkMedia.seek = function (media,position) {
	!media && (media = SdkMedia.currentMedia);
	DebugLog("Inside sdk media seek, position: " + position);
	if (media.handle) {
		media.position = position;
		gm.media.seek(media.handle, position);
	}
};
	
SdkMedia.stop = function (media) {
	!media && SdkMedia.currentMedia && (media = SdkMedia.currentMedia);
	if(!media){
		return;
	}
	DebugLog("Inside sdk media stop");
	if (media.handle) {
		gm.media.stop(media.handle);
		//gm.media.pause(media.handle);
		media.handle = null;
	}
	media.resetMediaTime();
	SdkMedia.currentMedia = null;
	media = null;
};

SdkMedia.getPosition = function (media) {
	!media && (media = SdkMedia.currentMedia);
	media.compoundMediaTime();
	return media.position;
};

SdkMedia.getStatus = function (media) {
	!media && (media = SdkMedia.currentMedia);
	return media.status;
};



function playerCallback (code) {
	// -1 An unknown error occurred
	// 0  Audio Channel sourced (or re-sourced)
	// 1  Audio not completed; another source activated temporarily (audio paused)
	// 2  audio not completed; all audio turned off (including vehicle shutdown)
	// 3  Invalid data at URL
	// 4  Audio Channel Unavailable
	// 5  audio not completed, another source chosen permanently
	// 6  connecting (establishing initial connection of audio source)
	// 7  buffering (audio still sourced but playing audio has stopped)
	// 8  end of file (this includes in a stream when the end of one song is reached and another one begins)
	// 9  paused
	// 10 stopped
	// 11 seeked
	//gm.constants.FAILURE: -1
	//gm.constants.PLAYING: 0 
	//gm.constants.TEMPORARILY_PAUSED: 1
	//gm.constants.AUDIO_OFF: 2
	//gm.constants.INVALID_DATA: 3
	//gm.constants.CHANNEL_UNAVAILABLE: 4
	//gm.constants.SOURCE_CHANGED: 5
	//gm.constants.CONNECTING: 6
	//gm.constants.BUFFERING: 7
	//gm.constants.END_OF_FILE: 8
	//gm.constants.JS_PAUSED: 9
	//gm.constants.JS_STOPPED: 10
	//gm.constants.JS_SEEKED: 11
	var media = SdkMedia.currentMedia;
	//DebugLog("playerCallback media="+media+" media.url="+media.url);
	
	switch (code) {
		case -1:
			CodeStatus = -1;
			media.status = "error";
			media.resetMediaTime();
			//media.callback.end();
			break;
		case 0:
			CodeStatus = 0;
			media.status = "playing";
			DebugLog("playing===========  0  ==============>");
			media.timeStarted = new Date().getTime();
			if (media.mustSeek) {
				media.mustSeek = false;
				SdkMedia.seek(media,media.position);
			}
			media.callback.play();
			break;
		case 1:
			CodeStatus = 1;
			media.status = "paused";
			media.pauseMediaTime();
			//media.callback.pause();
			DebugLog("paused===========  1  ==============>");
			break;
		case 2:
			CodeStatus = 2;
			media.status = "stopped";
			//media.end();
			break;
		case 3:
			CodeStatus = 3;
			media.status = "error";
			media.resetMediaTime();
			//media.callback.end();
			break;
		case 4:
			CodeStatus = 4;
			media.status = "error";
			media.resetMediaTime();
			//media.callback.end();
			break;
		case 5:
			CodeStatus = 5;
			media.status = "stopped";
			//media.end();
			break;
		case 6:
			CodeStatus =6;
			media.status = "connecting";
			media.pauseMediaTime();
			//media.callback.pause();
			break;
		case 7:
			CodeStatus = 7;
			media.status = "buffering";
			break;
		case 8: 
			CodeStatus = 8;
			media.status = "ended";
			media.resetMediaTime();
			media.callback.end();
			DebugLog("callback end===========  8  ==============>");
			break;
		case 9:
			CodeStatus = 9;
			media.status = "paused";
			media.pauseMediaTime();
			media.callback.pause();
			DebugLog("callback paused============  9   =============>");
			break;
		case 10:
			CodeStatus = 10;
			media.status = "stopped";
			media.resetMediaTime();
			break;
		case 11:
			CodeStatus = 11;
			media.status = "seeked";
			break;
						
	}
//	DebugLog("playerCallback currentTime="+media.getTime()+" code="+code+" status="+media.status);
	media.code = code;
	
}


function changeMillisecondTime(millisecond) {
    if (millisecond) {
        var minutes = Math.floor(millisecond / (60*1000));
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        var seconds = parseInt(Math.floor(millisecond % (60*1000) / 1000));
        if (seconds < 10) {
            seconds = "0" + seconds; 
        }
        var millisecond = parseInt(millisecond % 1000);
        return minutes + ":" + seconds+":"+millisecond;
    } else {
        return "00:00:000";
    }
}