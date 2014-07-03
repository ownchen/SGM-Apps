var INITIATIVE = false;
var TestMedia = null;
var SongMedia = null;

function songAddAlert(){
	$("#addCloudSong").fadeIn();
	setTimeout(function(){
		$("#addCloudSong").fadeOut();
	},1000);
}

(function () {
	PlayView = function () {
          View.call(this, "playView");
          this.prototype = new View();
          this.prototype.constructor = PlayView;
          var _this = this;
          var StatusPlaying = true;
          this.pageName="mycadillac:百度音乐:歌曲播放页面";
          
          this.dataInit = function(func){
        	  if(NoPlaySong){
        		  _this.getCurrentSongInfo(func);
        	  }
          };
          
          this.currentSongTime=null;
          this.watchSpeed = {
        		  id:null,
        		  begin:function(){
        			  //test
        			  if(!LOGINTEST){
	        			  var speed = gm.system.getSpeed();
	        			  if(speed!=0){
	        				  $(".lyrics_content").addClass("hidden");
	    	        		  $(".lyricscover").removeClass("hidden");
	        			  }
	        			  _this.watchSpeed.id = gm.system.watchSpeed(function(param){
	        	        	  //0 = Park
	        	        	  //1 = Low Speed
	        	        	  //2 = High Speed
	        	        	  if(param!=0){
	        	        		  $(".lyrics_content").addClass("hidden");
	        	        		  $(".lyricscover").removeClass("hidden");
	        	        	  }else{
	        	        		  $(".lyrics_content").removeClass("hidden");
	        	        		  $(".lyricscover").addClass("hidden");
	        	        	  }
	        	          }, function(){
	        	        	  console.log("watchSpeedFailure! -- "+param);
	        	          });
        			  }
        		  } ,
          };
          this.addEvent = function (func) {
        	$("#playBtn").unbind("mouseup").mouseup(function() {
        		if(audioFlag){
        			if(!StatusPlaying){
    					Tracking.BtnClick("播放按钮");
    					$("#PlayAudioSong")[0].play();
    					// $(this).unbind("mouseup");
    					//$("#playBtn").addClass("playBtn_down");
    					//setTimeout(function(){
    					$("#playBtn").removeClass("playBtn").removeClass("playBtn_down").addClass("playStopBtn");
    					StatusPlaying = true;
    					 //},300);
    					
    					if($("#RadioAudioSong")[0]){
    						$("#RadioAudioSong")[0].pause();
    						// $(this).unbind("mouseup");
    						$("#radioPlayBtn").addClass("playBtn").removeClass("playStopBtn");
    					}
    				}else{
    					Tracking.BtnClick("暂停按钮");
    					INITIATIVE = true;
    					$("#PlayAudioSong")[0].pause();
    					//$("#playBtn").addClass("playStopBtn_down");
    					//setTimeout(function(){
    						//$("#playBtn").removeClass("playStopBtn_down");
    					$("#playBtn").addClass("playBtn").removeClass("playBtn_down");
    					StatusPlaying = false;
    					 //},300);
    				}
        		}else{
        			SongMedia.pause();
        		}
        		
				
			});
        	$("#playNextBtn").unbind("mousedown").mousedown(function(){
				$("#playNextBtn").addClass("playNextBtn_down");
			});
			$("#playNextBtn").unbind("mouseup").mouseup(function(){
				Tracking.BtnClick("下一首按钮");
				$("#playNextBtn").removeClass("playNextBtn_down");
				Controler.preloadLayerShow($("#playView"),"");
				var nextSongInfo = PlayList.getNextSong();
				$("#playBtn").removeClass("playStopBtn").addClass("playBtn");
				if(nextSongInfo){
					_this.getCurrentSongInfo(function(){
						 Controler.preloadLayerHide($("#playView"));
						
					});
				}
			});
			
			$(".musicNext").unbind("mouseup").mouseup(function(){
				Tracking.BtnClick("下一首按钮");
				$("#playNextBtn").removeClass("playNextBtn_down");
				Controler.preloadLayerShow($("#playView"),"");
				var nextSongInfo = PlayList.getNextSong();
				$("#playBtn").removeClass("playStopBtn").addClass("playBtn");
				if(nextSongInfo){
					_this.getCurrentSongInfo(function(){
						 Controler.preloadLayerHide($("#playView"));
						
					});
				}
			});
			
			$("#playPrevBtn").unbind("mousedown").mousedown(function(){
				$("#playPrevBtn").addClass("playPrevBtn_down");
			});
			$("#playPrevBtn").unbind("mouseup").mouseup(function(){
				$("#playPrevBtn").removeClass("playPrevBtn_down");
				 $("#playBtn").removeClass("playStopBtn").addClass("playBtn");
				Controler.preloadLayerShow($("#playView"),"");
				//DebugLog("getTheCurrentSongTime"+_this.currentSongTime);
				$("#playBtn").removeClass("playStopBtn").addClass("playBtn");
				if(!_this.currentSongTime||parseInt(_this.currentSongTime)<20){
					Tracking.BtnClick("前一首按钮");
					PlayList.getPrevSong();
					DebugLog("PrevSong");
				}else{
					Tracking.BtnClick("重播按钮");
					PlayList.replay();
					DebugLog("rePlaySong");
				}
				_this.getCurrentSongInfo(function(){
					 Controler.preloadLayerHide($("#playView"));
				});
			});
			$(".musicPrev").unbind("mouseup").mouseup(function(){
				$("#playPrevBtn").removeClass("playPrevBtn_down");
				 $("#playBtn").removeClass("playStopBtn").addClass("playBtn");
				Controler.preloadLayerShow($("#playView"),"");
				//DebugLog("getTheCurrentSongTime"+_this.currentSongTime);
				$("#playBtn").removeClass("playStopBtn").addClass("playBtn");
				if(!_this.currentSongTime||parseInt(_this.currentSongTime)<20){
					Tracking.BtnClick("前一首按钮");
					PlayList.getPrevSong();
					DebugLog("PrevSong");
				}else{
					Tracking.BtnClick("重播按钮");
					PlayList.replay();
					DebugLog("rePlaySong");
				}
				_this.getCurrentSongInfo(function(){
					 Controler.preloadLayerHide($("#playView"));
				});
			});
			
			$("#cloudBtn").unbind("mousedown").bind("mousedown",function(){
				var tar = $(this);
				if(tar.attr("class").indexOf("cloudNo")==-1){
					tar.addClass("cloud_down");
				}else{
					tar.addClass("cloudNo_down");
				}
			});
			
			$("#cloudBtn").unbind("mouseup").bind("mouseup",function(){
				var tar = $(this);
				if(tar.attr("class").indexOf("cloudNo")==-1){
					tar.removeClass("cloud_down");
				}else{
					tar.removeClass("cloudNo_down");
				}
//				if(tar.hasClass("cloud")){
//					tar.removeClass().addClass("cloudNo");
//				}else{
//					tar.removeClass().addClass("cloud");
//				}
//				
				//$("#cloudBtn").addClass("cloud");
				if(Oauth_helper.User_accessTaken){
					var songItem = new Array();
					var songId = PlayList.getCurrentSong();
					songItem.push(songId);
					Data.init.cloud_isFavorite(function(data){
						var tag = data["result"][PlayList.getCurrentSong()];
						if(tag=="0"){
							//not favourite song
							console.log("no song");
							Tracking.BtnClick("歌曲收藏按钮");
							var songList = new Array();
							songList.push(PlayList.getCurrentSong());
							Data.init.cloud_addSongFavorite(function(){
								$("#addCloudSong").html("歌曲已收藏");
								songAddAlert();
								$("#cloudBtn").removeClass();
								$("#cloudBtn").addClass("cloud");
							},songList);
						}else{
							console.log("have song");
							Tracking.BtnClick("取消歌曲收藏按钮");
							var songList = new Array();
							songList.push(PlayList.getCurrentSong());
							$("#cloudBtn").removeClass();
							$("#cloudBtn").addClass("cloudNo");
							Data.init.cloud_delSongFavorite(function(data){
								songAddAlert();
								$("#addCloudSong").html("已取消收藏");
								$("#cloudBtn").removeClass();
								$("#cloudBtn").addClass("cloudNo");
							},songList);
						}
					},songItem);
				}else{
					//login
					Controler.transfer(new MyMusicView());
					//$("#loginIframe").removeClass("hidden");
					$(loginPage.find(".submit")).css({
							"margin-left":"87px",
					});
					$(loginPage.find("#loginClose")).css({"display":"block"});
					loginSuccessFunc = function(){
						if(Oauth_helper.User_accessTaken){
//							var songItem = new Array();
//							var songId = PlayList.getCurrentSong();
//							songItem.push(songId);
//							Data.init.cloud_isFavorite(function(data){
//								var tag = data["result"][PlayList.getCurrentSong()];
//								if(tag=="0"){
//									console.log("no song");
////									songAddAlert();
////									$("#addCloudSong").html("歌曲未收藏");
////									$("#cloudBtn").removeClass();
////									$("#cloudBtn").addClass("cloudNo");
//								}else{
//									console.log("have song");
//									var songList = new Array();
//									songList.push(PlayList.getCurrentSong());
//									songAddAlert();
//									$("#addCloudSong").html("歌曲已收藏");
//									$("#cloudBtn").removeClass();
//									$("#cloudBtn").addClass("cloud");
//								}
//							},songItem);
						};
					};
				};
			});
			typeof func=="function"&&func();
          };
          
          this.show = function () {
        	  Controler.preloadLayerShow($("#playView"));
        	  if(audioFlag){
        		  _this.watchSpeed.begin();
        	  }
        	  _this.prototype.show.call(_this);
        	  if(NoPlaySong){
        		  if(ViewInitFlag.PlayView){
	        		  _this.dataInit(function(){
	        			  $("#playGuidBtn").removeClass("hidden");
	            		  _this.addEvent();
	            		  //_this.prototype.show.call(_this);
	                	  //hide the bottom bar
	                	  $(".Footer").addClass("hidden");
	                	  Controler.preloadLayerHide($("#playView"));
	                	  ViewInitFlag.PlayView = false;
	            	  });
        		  }else{
        			  _this.getCurrentSongInfo(function(){
        				  $("#playGuidBtn").removeClass("hidden");
                		  //_this.prototype.show.call(_this);
                    	  //hide the bottom bar
                    	  $(".Footer").addClass("hidden");
                    	  Controler.preloadLayerHide($("#playView"));
        			  });
        		  }
        	  }else{
        		  $("#playGuidBtn").removeClass("hidden");
        		  //_this.addEvent();
        		  _this.prototype.show.call(_this);
            	  //hide the bottom bar
            	  $(".Footer").addClass("hidden");
            	  Controler.preloadLayerHide($("#playView"));
        	  }
          };
          
          this.hide = function () {
          	this.prototype.hide.call(_this);
          	$(".Footer").removeClass("hidden"); 
          	$("#playGuidBtn").removeClass("current");          
          	NoPlaySong = true;
          	//clearSpeed
          	//$(".lyrics_content").removeClass("hidden");
          	if(audioFlag){
          		$(".lyricscover").addClass("hidden");
          		console.log("watchSpeedId="+_this.watchSpeed.id);
          		if(!LOGINTEST){
                  	gm.system.clearSpeed(_this.watchSpeed.id);
              	}
          	}
          	
          };
          this.options = {
              lrcid : ".lyrics_content",
              lrcTag: {
                  sname: "ti",
                  cname: "cl",
                  qname: "cs",
                  bname: "ps",
                  sgname: "ar",
                  special: "al",
                  kname: "by",
                  end: "end"
              },
              lrcClassV1: "normalLyric",
              lrcClassV2: "currentLyric",
              lrcClassV3: "v3",
              lrcEmpty: 20,
              lrcCenter: 120,
              lrc_lines: []
          };
          this.lrcRead = function (lrc, fun) {
              if (!lrc) return;
              if (fun != null && typeof fun == "function")
                  return fun.call(this, lrc);
              var jsons = {};
              jsons["lrcs"] = new Array();
              var lrs = lrc.split('[');
              var lejt = lrs.length;
              for (var i = 0; i < lejt; i++) {
                  var element = lrs[i];
                  var dic = element.split(']');
                  if (dic.length == 2)
                      if (dic[0].search("^[0-9]{2}:[0-9]{2}.[0-9]{2}$") < 0) {

                          title = dic[0].split(':');
                          if (title.length === 2)
                              switch (title[0]) {
                                  case this.options.lrcTag.cname: jsons[this.options.lrcTag.cname] = title[1]; break;
                                  case this.options.lrcTag.qname: jsons[this.options.lrcTag.qname] = title[1]; break;
                                  case this.options.lrcTag.bname: jsons[this.options.lrcTag.bname] = title[1]; break;
                                  case this.options.lrcTag.sgname: jsons[this.options.lrcTag.sgname] = title[1]; break;
                                  case this.options.lrcTag.special: jsons[this.options.lrcTag.special] = title[1]; break;
                                  case this.options.lrcTag.kname: jsons[this.options.lrcTag.kname] = title[1]; break;
                                  case this.options.lrcTag.end: jsons[this.options.lrcTag.end] = title[1]; break;
                              }
                      } else {
                          var lt = { "time": dic[0], "name": dic[1] };
                          jsons["lrcs"].push(lt);
                      }
              }
              return jsons;
          };
          this.lrcLoad = function (json, fun) {
              if (!json) {
                  $(this.options.lrcid).html("<li>没有搜索到相关</li>");
                  return;
              };
              sname = json[this.options.lrcTag.sname];
              cname = json[this.options.lrcTag.cname];
              qname = json[this.options.lrcTag.qname];
              bname = json[this.options.lrcTag.bname];
              sgname = json[this.options.lrcTag.sgname];
              special = json[this.options.lrcTag.special];
              kname = json[this.options.lrcTag.kname];
              lrcs = json["lrcs"];
              end = json[this.options.lrcTag.end];
              $(this.options.lrcid).html("");
              this.options.lrc_lines = new Array();
              if (sname) sname["time"] ? this.addLrc(this.options.lrcClassV1, sname["name"], sname["time"]) : this.addLrc(this.options.lrcClassV1, sname);
              if (cname) cname["time"] ? this.addLrc(this.options.lrcClassV1, cname["name"], cname["time"]) : this.addLrc(this.options.lrcClassV1, cname);
              if (qname) qname["time"] ? this.addLrc(this.options.lrcClassV1, qname["name"], qname["time"]) : this.addLrc(this.options.lrcClassV1, qname);
              if (bname) bname["time"] ? this.addLrc(this.options.lrcClassV1, bname["name"], bname["time"]) : this.addLrc(this.options.lrcClassV1, bname);
              if (sgname) sgname["time"] ? this.addLrc(this.options.lrcClassV1, sgname["name"], sgname["time"]) : this.addLrc(this.options.lrcClassV1, sgname);
              if (special) special["time"] ? this.addLrc(this.options.lrcClassV1, special["name"], special["time"]) : this.addLrc(this.options.lrcClassV1, special);
              if (kname) kname["time"] ? this.addLrc(this.options.lrcClassV1, kname["name"], kname["time"]) : this.addLrc(this.options.lrcClassV1, kname);
              if (lrcs)
                  for (var index in lrcs) {
                      this.addLrc(this.options.lrcClassV1, lrcs[index]["name"], lrcs[index]["time"]);
                  }
              if (end) end["time"] ? this.addLrc(this.classV1, end["end"], end["time"]) : this.addLrc(this.options.lrcClassV1, end);
              for (var it = 0; it < this.options.lrcEmpty; it++) {
                  this.addLrc("", "&nbsp;", "");
              }
              if (typeof fun == 'function')
                  fun.call(null, null);
              if ($(this.options.lrcid).children().length == 0) {
                  $(this.options.lrcid).html("<li>未找到相关歌词</li>");
              };
          },
          this.addLrc = function (cla, text, val) {
              var lrc_line = $("<li></li>");
              if(text.replace(" ","").replace(/\n+/,"").replace("&nbsp;","").length == 0) return;
              lrc_line.html(text ? text : "");
              lrc_line.attr("class", cla ? cla : "");
              lrc_line.attr("lang", val ? val : "");
              $(this.options.lrcid).append(lrc_line);
              this.options.lrc_lines.push(lrc_line);
          },
          this.getLrcByValue = function (val) {
              le = this.options.lrc_lines.length
              val = "^" + val + ".*";
              for (var i = 0; i < le; i++) {
                  if (this.options.lrc_lines[i].lang.search(val) == 0) return this.options.lrc_lines[i];
              }
              return null;
          },
          this.getLrcByValueInd = function (val) {
              le = this.options.lrc_lines.length - 1
              for (var i = le; i >= 0; i--) {
                  p = this.options.lrc_lines[i][0].lang;
                  if (p)
                      if (p < val) return this.options.lrc_lines[i][0];
              }
              return null;
          },
          this.lrcTorun = function (time) {
              time = this.lrctoTimer(Math.round(time * 100) / 100);
              var line = this.getLrcByValueInd(time);
              if (line)
                  if (this.upkp != line) {
                      $(line).attr("class", this.options.lrcClassV2);
                      this.lrcUpTop(line);
                      if (this.upkp) $(this.upkp).attr("class", this.options.lrcClassV1);
                      this.upkp = line;
                  }
          },
          this.lrcUpTop = function (obj) {
              var thisTop = obj.offsetTop;
              if (!$(this.options.lrcid).length)
                  return;
              var st = $(this.options.lrcid).get(0).scrollTop;
              var nextTop = thisTop - this.options.lrcCenter;
              this.lrcmyf($(this.options.lrcid).get(0), st, nextTop);
          },
          this.lrcmyf = function (obj, f, m) {
              if (this.options.lrcTimer != null) {
                  clearTimeout(this.options.lrcTimer);
              }
              this.isUpOrDown(obj, f, m);
          },
          this.isUpOrDown = function (obj, f, m) {
        	  $(obj).animate({scrollTop:m},300);
          },
          this.lrctoTimer = function (time) {
              var m, s;
              m = Math.floor(time / 60);
              m = isNaN(m) ? '--' : (m >= 10) ? m : '0' + m;
              s = Math.floor(time % 60);
              s = isNaN(s) ? '--' : (s >= 10) ? s : '0' + s;
              return m + ':' + s;
          };
          
          this.getCurrentSongInfo = function(func){
        	  var currentSongId = PlayList.getCurrentSong();
        	  
        	  var _this = this;
        	  Data.init.song_info(function(data){
          		//$("#testSongId").attr("href",data.songurl.url[0].file_link);
        		  $("#currentTime").html("00:00");
        		  $("#allTime").html("00:00");
        		  document.getElementById("prog").value=0; 
        		 
        		  //source.attr("src","http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3");
     			 //add pic
     			 $(".playerName").html(data.songinfo.author);
     			 if(data.songinfo.pic_small){
     				$(".baiduMusicLogo").css(
     						{"background":"url("+data.songinfo.pic_small+") no-repeat",
     						"background-size":"100%",
     						"border": "2px solid #000",
     						"box-sizing": "border-box",
     				});
     			 }else{
     				$(".baiduMusicLogo").css(
     						{"background":"url('static/images/radioViewMiddleLogo.png')",
     						"background-size":"100%",
     						"border": "2px solid #000",
     						"box-sizing": "border-box",
     				});
     			 }
     			 $(".musicTit").html(data.songinfo.title);
     			 
     			 var audio,source,audioContainer;
     			 if(audioFlag){
	     			 //[Audio] add audio tag
     				 audio = $("<audio id='PlayAudioSong' autoplay='true'></audio>");
	    			 source = $("<source></source>");
	    			 source.attr("type","audio/mpeg");
	    			 source.attr("src",data.songurl.url[0].file_link);
	    			 audio.html(source);
	    			 audioContainer = $("#audioContainer .playContainer");
	    			 audioContainer.html(audio);
	    			 
	    			 //load lrclink
	    			 var url = data.songinfo.lrclink;
	    			 $.ajax({
	    				 url: url,
	    				 success: function(data) {
	    					//$(".lyrics_content").html(data);
	    					 _this.lrcLoad(_this.lrcRead(data));
	    				 },
	    			 });
    			 
     			 }else{
     				 //remove progress bar
     				 $("#progressContainer").css("display","none");
     				 //lyric remove
     				 $(".lyrics_content").addClass("hidden");
	        		 $(".lyricscover").removeClass("hidden");
     				
	        		 //Media player
         			 var mediaUrl = data.songurl.url[0].file_link;
         			 SongMedia = new Media(mediaUrl,"normal",{
         				 play:function(){
         					$("#playBtn").removeClass("playBtn").addClass("playStopBtn");
         				 },
	       				 pause:function(){
	       					$("#playBtn").addClass("playBtn").removeClass("playStopBtn");
	       				 },
	       				 end:function(){
	       					DebugLog('Code = ' + CodeStatus + 'Play next song!');
	       					$("#playBtn").addClass("playBtn").removeClass("playStopBtn");
	       					Controler.preloadLayerShow($("#playView"),"");
	       					PlayList.getNextSong();
	       					new PlayView().getCurrentSongInfo(function(){
	       						 Controler.preloadLayerHide($("#playView"));
	       					});
	       				 },
	       				 stop:function(){
	       					$("#playBtn").addClass("playBtn").removeClass("playStopBtn");
	       				 },
         			 });
         			 
         			 SongMedia.play();
     			 }
     			 
     			 
     			 
    			//Cloud favourite
    			 
    			 if(Oauth_helper.User_accessTaken){
 					var songItem = new Array();
 					var songId = PlayList.getCurrentSong();
 					songItem.push(songId);
 					Data.init.cloud_isFavorite(function(data){
 						var currentSongId = PlayList.getCurrentSong();
 						if(currentSongId&&currentSongId!=''){
	 						var tag = data["result"][PlayList.getCurrentSong()];
	 						if(tag=="0"){
	 							//not favourite song
	 							$("#cloudBtn").removeClass();
	 							$("#cloudBtn").addClass("cloudNo");
	 						}else{
	 							var songList = new Array();
	 							songList.push(PlayList.getCurrentSong());
	 							$("#cloudBtn").removeClass();
	 							$("#cloudBtn").addClass("cloud");
	 						}
 						}
 					},songItem);
    			 }
    			 
    			//[Audio] event timeupdate 
    			 if(audioFlag){
	    			 $($("#PlayAudioSong")[0]).unbind("timeupdate").bind("timeupdate",function(event){
	    				 _this.lrcTorun(event.currentTarget.currentTime+1.5);
	    				 _this.currentSongTime = event.currentTarget.currentTime;
	    				 _this.currentSongDuration = event.currentTarget.duration;
	    				 var progressNumber = Math.round(_this.currentSongTime/_this.currentSongDuration * 100);
	    				 var minutes = Math.floor(_this.currentSongTime/60);
	    				 if(minutes<10){
	    					 minutes = "0"+minutes;
	    				 }
	    				 var seconds =Math.round(_this.currentSongTime%60);
	    				 if(seconds<10){
	    					 seconds = "0"+seconds;
	    				 }
	    				 $("#currentTime").html(minutes+":"+seconds);
	    				 if(progressNumber){
	    					 document.getElementById("prog").value=progressNumber;
	    				 }else{
	    					 document.getElementById("prog").value=0;
	    				 }
	    				 
	    				 //if(event.currentTarget.currentTime==event.currentTarget.duration){
	    				//	 DebugLog("Audio timeupdate: event.currentTarget.currentTime="+event.currentTarget.currentTime+"; event.currentTarget.duration"+event.currentTarget.duration);
	        			//	Controler.preloadLayerShow($("#playView"),"");
	    	     		//	PlayList.getNextSong();
	    	     		//	_this.getCurrentSongInfo(function(){
	    	     		//		 Controler.preloadLayerHide($("#playView"));
	    	     		//	});
	    				//}
	    				//$(".currentTime").children("span").html(event.currentTarget.currentTime);
	    			});
	    			
	    			 
	    			//[Audio] event play
	    			
	    			$($("#PlayAudioSong")[0]).bind("play",function(e){
	    				$("#playBtn").addClass("playStopBtn").removeClass("playBtn");
	    				DebugLog('fire the Play');
	    				StatusPlaying = true;
	    				_this.currentSongDuration = e.currentTarget.duration;
	    				if(_this.currentSongDuration){
	    				var minutes = Math.floor(_this.currentSongDuration/60);
		   				 if(minutes<10){
		   					 minutes = "0"+minutes;
		   				 }
		   				 var seconds =Math.round(_this.currentSongDuration%60);
		   				 if(seconds<10){
		   					 seconds = "0"+seconds;
		   				 }
		   				$("#allTime").html(minutes+":"+seconds);
	    				}else{
	    					$("#allTime").html("00:00");
	    				}
	    			});
	    			
	    			
	    			//[Audio] event pause
	    			
	    			$($("#PlayAudioSong")[0]).bind("pause",function(e){
	    				DebugLog('fire the Pause');
	    				//if(INITIATIVE){
	    					$("#playBtn").addClass("playBtn").removeClass("playStopBtn");
	        				StatusPlaying = false;
	        				INITIATIVE = false;
	    				//}
	    				//else
	    				//{
	    				//	DebugLog('play next song');
	    				//	$("#playBtn").addClass("playBtn").removeClass("playStopBtn");
	        			//	StatusPlaying = false;
	        			//	INITIATIVE = false;
	        				//playNext
	        			//	Controler.preloadLayerShow($("#playView"),"");
	        			//	PlayList.getNextSong();
	        			//	_this.getCurrentSongInfo(function(){
	        			//		 Controler.preloadLayerHide($("#playView"));
	        			//	});
	    				//}                                      
	    			});
	    			
	    			
	    			$($("#PlayAudioSong")[0]).bind("ended",function(e){
	    				DebugLog('Play - fire the end');
	    				$("#playBtn").addClass("playBtn").removeClass("playStopBtn");
	    				StatusPlaying = false;
	    				//INITIATIVE = false;
	    				//playNext
	    				Controler.preloadLayerShow($("#playView"),"");
	    				PlayList.getNextSong();
	    				_this.getCurrentSongInfo(function(){
	    					 Controler.preloadLayerHide($("#playView"));
	    				});
	    			});
    			 }
    			
    			//Testing
    			/*
    			TestMedia = $("#PlayAudioSong")[0];
    			var eventTester = function(ename){  
    			    TestMedia.addEventListener(ename,function(e){  
    			    	var now = new Date();
    			    	now = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    			    	var moreinfo = "";
    			    	 
    			    	moreinfo="; currentTime:"+this.currentTime;
    			    	moreinfo+="; duration:"+this.duration;
    			    	moreinfo+="; networkState:"+this.networkState;
    			        DebugLog(now + " "+ename+":"+moreinfo);  
    			    });  
    			};
    			
    			eventTester("loadstart");   //客户端开始请求数据  
    			eventTester("progress");    //客户端正在请求数据  
    			eventTester("suspend");     //延迟下载  
    			eventTester("abort");       //客户端主动终止下载（不是因为错误引起），  
    			eventTester("error");       //请求数据时遇到错误  
    			eventTester("stalled");     //网速失速  
    			eventTester("play");        //play()和autoplay开始播放时触发  
    			eventTester("pause");       //pause()触发  
    			eventTester("loadedmetadata");  //成功获取资源长度  
    			eventTester("loadeddata");  //  
    			eventTester("waiting");     //等待数据，并非错误  
    			eventTester("playing");     //开始回放  
    			eventTester("canplay");     //可以播放，但中途可能因为加载而暂停  
    			eventTester("canplaythrough"); //可以播放，歌曲全部加载完毕  
    			eventTester("seeking");     //寻找中  
    			eventTester("seeked");      //寻找完毕  
    			eventTester("timeupdate");  //播放时间改变  
    			eventTester("ended");       //播放结束  
    			eventTester("ratechange");  //播放速率改变  
    			eventTester("durationchange");  //资源长度改变  
    			eventTester("volumechange");    //音量改变  
    			*/
    			
    			//hide prev & next
    			$("#playPrevBtn").addClass("hidden");
    			$("#playNextBtn").addClass("hidden");
    			$(".musicPrev").addClass("hiddenv");
    			$(".musicNext").addClass("hiddenv");
    			var prevSongId = PlayList.getPrevSongId();
    			if(prevSongId!=null){
    				Data.init.song_info(function(data){
    					var container = $(".musicPrev");
    					container.find(".playerNameSmall").html(data.songinfo.author);
    	     			 if(data.songinfo.pic_small){
    	     				container.find(".baiduMusicLogoSmall").css(
    	     						{"background":"url("+data.songinfo.pic_small+") no-repeat",
    	     						"background-size":"100%",
    	     				});
    	     			 }else{
    	     				container.find(".baiduMusicLogoSmall").css(
    	     						{"background":"url('static/images/radioViewMiddleLogo.png')",
    	     						"background-size":"100%",
    	     				});
    	     			 }
    	     			 container.find(".songTitle").html(data.songinfo.title);
    	     			$("#playPrevBtn").removeClass("hidden");
    	    			$(".musicPrev").removeClass("hiddenv");
        			},prevSongId);
    			};
    			var nextSongId = PlayList.getNextSongId();
    			if(nextSongId!=null){
    				Data.init.song_info(function(data){
    					var container = $(".musicNext");
    					container.find(".songTitle").html(data.songinfo.title);
    	     			 if(data.songinfo.pic_small){
    	     				container.find(".baiduMusicLogoSmall").css(
    	     						{"background":"url("+data.songinfo.pic_small+") no-repeat",
    	     						"background-size":"100%",
    	     				});
    	     			 }else{
    	     				container.find(".baiduMusicLogoSmall").css(
    	     						{"background":"url('static/images/radioViewMiddleLogo.png')",
    	     						"background-size":"100%",
    	     				});
    	     			 }
    	     			 container.find(".playerNameSmall").html(data.songinfo.author);
    	    			$("#playNextBtn").removeClass("hidden");
    	    			$(".musicNext").removeClass("hiddenv");
        			},nextSongId);
    			};
    			
    			 
    			 
    			 
    			typeof func == "function"&&func();
    		  },currentSongId);
        	  
        	  if(audioFlag){
        		  if($("#RadioAudioSong")[0]){
    	        	  $("#RadioAudioSong")[0].pause();
    	        	  $("#radioPlayBtn").addClass("playBtn").removeClass("playStopBtn");
            	  }
        	  }
        	  
        	  
        	  
        	  
        	  
          };
          
		};
  } ());