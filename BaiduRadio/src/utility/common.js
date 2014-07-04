/**
 * 
 */
(function()
{
	// 文件读取
	CCR.Comm.readFile = function(filename, isPrivate, callback)
	{
		var options = {};
		if (isPrivate) {
			options.isPrivate = true;
		}

		var contents = gm.io.readFile(filename, options);
		callback(contents);
	};

	// 日志记录
	CCR.Comm.log = function(message)
	{
		if (CCR.Config.isDebug) {
			console.log(message);
		}
	};

	CCR.Media = {
		// 播放
		mediaHandle:null,
		status:null,
		time:{
			t:null,
			spacetime:200,
			starttime:0,	//开始时间
			remaintime:0,	//暂停之前已播放的时间
			currenttime:0,	//当前播放时间
			init:function(callback){
				var self = this;
				if(!this.t){
					this.t = $.timer(function() {
						self.currenttime = Date.now() - self.starttime + self.remaintime;
		                typeof callback==="function"&&callback(self.currenttime,CCR.Media.status);
			        });
					this.t.set({ time : self.spacetime, autostart : false });
				}else{
					this.start();
				}
		        
			},
			start:function(){
				log("start timer 开始计时");
				this.starttime = Date.now();
				this.currenttime = 0;
				this.remaintime = 0;
				this.t.play(true);
			},
			play:function(){
				log("play() time.remaining="+this.t.remaining);
				if(this.t.remaining){//判断当前状态
					log("play() time.isActive="+this.t.isActive);
					if(!this.t.isActive){
						this.starttime = Date.now();
						this.t.play();
					}
				}else{
					this.start();
				}
			},
			pause:function(){
				log("timer pause");
				this.t.pause();
				this.remaintime = this.currenttime;
				this.currenttime = 0;
				this.starttime = Date.now();
			},
			stop:function(){
				log("timer stop");
				this.t.stop();
				this.starttime = Date.now();
				this.remaintime = 0;
			}
		},
		play : function(filename, callback)
		{
			var self = this;
			self.time.init(function(t,status){
				callback.timeupdate(t,status);
			});
			var mediahandle = gm.media.play(filename, "exclusiveAudio", function(
					code)
			{
				log("捕获播放状态: code="+code);
				switch (code) {
					case -1:
						self.status = "AUDIO_OF-error";
						//状态：异常错误
						//操作：停止计时，停止音乐，播放下一首
						self.time.stop();
						callback.stop();
						break;
					case 0:
						self.status = "PLAYING-playing";
						//状态：播放
						//操作：1.暂停后播放，2.加载后播放? 计时继续或开始计时
						self.time.play();
						callback.play();
						break;
					case 1:
						self.status = "TEMPORARILY_PAUSED-paused";
						//状态：暂停
						//操作：暂停计时
						self.time.pause();
						callback.pause();
						break;
					case 2:
						self.status = "AUDIO_OFF-stopped";
						//状态：停止
						//操作：停止音乐
						self.time.stop();
						callback.stop();
						break;
					case 3:
						self.status = "INVALID_DATA-error";
						//状态：异常错误
						//操作：停止计时，停止音乐，播放下一首
						self.time.stop();
						callback.stop();
						break;
					case 4:
						self.status = "CHANNEL_UNAVAILABLE-error";
						//状态：异常错误
						//操作：停止计时，停止音乐，播放下一首
						self.time.stop();
						callback.stop();
						break;
					case 5:
						self.status = "SOURCE_CHANGED-none";
						//状态：资源已修改
						break;
					case 6:
						self.status = "CONNECTING-none";
						//状态：资源连接中
						//操作：无
						break;
					case 7:
						self.status = "BUFFERING-pause";
						//状态：资源加载中
						//操作：在计时已开始状态下暂停计时
						self.time.pause();
						callback.pause();
						self.pause();
						break;
					case 8: 
						self.status = "END_OF_FILE-ended";
						//状态：歌曲播放完整结束
						//操作：关闭计时，播放下一首歌曲
						self.time.stop();
						callback.stop();
						break;
					case 9:
						self.status = "JS_PAUSED-paused";
						//状态：Js异常？
						//操作：在计时开启的状态下暂停计时
						self.time.pause();
						callback.pause();
						break;
					case 10:
						self.status = "JS_STOPPED-stopped";
						//状态:
						//操作：停止计时，播放下一首
						self.time.stop();
						callback.stop();
						break;
					case 11:	
						self.status = "JS_SEEKED-none";
						//拖动？
						break;
									
				}
				log("status=" + self.status);
						
				typeof callback==="function" && callback();
			});
			
			this.mediaHandle = mediahandle;
			
			return mediahandle;
		},
		// 暂停
		pause:function(){
			if(this.mediaHandle){
				gm.media.pause(this.mediaHandle);
			}else{
				CCR.Songs.playNext(CCR.Songs);
			}
			
		},
		stop : function(mediaHandle, callback)
		{
			gm.media.stop(this.mediaHandle);
		},

	};

})();

//转换毫秒时间
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
        var millisecond = parseInt(millisecond % 1000)/10;
        if(millisecond<10){
        	millisecond = "00";
        }
        return minutes + ":" + seconds+":"+millisecond;
    } else {
        return "00:00:00";
    }
}