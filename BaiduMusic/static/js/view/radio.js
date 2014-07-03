var RADIOINITIATION = false;
var RadioMedia = null;
(function() {
	RadioView = function() {
		View.call(this, "radioView");
		this.prototype = new View();
		this.prototype.constructor = RadioView;
		var _this = this;
		var StatusPlaying = true;
		this.pageName = "mycadillac:百度音乐:电台页面";
		this.initFlag = false;
		this.dataInit = function(func) {
			Data.init.radio_catalog(function(data) {
				var htmlStr = new Array();
				if (data.catalog[0].channellist) {
					for ( var i in data.catalog[0].channellist) {
						var channel_list = data.catalog[0].channellist[i];
						if (i % 6 == 0) {
							htmlStr.push("<div class='item'>");
							htmlStr.push("<div id='defaultRadioChannel' channelid=" + channel_list.channelid + " flag='" + i + "'><span>" + channel_list.name + "</span></div>");
							if (i == data.catalog[0].channellist.length - 1) {
								htmlStr.push("</div>");
							}
						}
						if (i % 6 == 5) {
							htmlStr.push("<div channelid=" + channel_list.channelid + " flag='" + i + "'><span>" + channel_list.name + "</span></div>");
							htmlStr.push("</div>");
						}
						if (i % 6 == 1 || i % 6 == 2 || i % 6 == 3 || i % 6 == 4) {
							htmlStr.push("<div channelid=" + channel_list.channelid + " flag='" + i + "'><span>" + channel_list.name + "</span></div>");
							if (i == data.catalog[0].channellist.length - 1) {
								htmlStr.push("</div>");
							}
						}
					}
					$("#radioView div.radioList").html(htmlStr.join(""));
				}
				typeof func == "function" && func();
			});
		};
		this.addEvent = function() {
			$("#radioPlayBtn").unbind("mouseup").mouseup(function() {
				if (audioFlag) {
					if ( !StatusPlaying) {
						Tracking.BtnClick("电台播放按钮");
						$("#RadioAudioSong")[0].play();
						$("#radioPlayBtn").addClass("playStopBtn").removeClass("playBtn");
						StatusPlaying = true;

						if ($("#PlayAudioSong")[0]) {
							$("#PlayAudioSong")[0].pause();
							$("#playBtn").addClass("playBtn").removeClass("playBtn_down");
						}
					}
					else {
						RADIOINITIATION = true;
						;
						if ($("#RadioAudioSong")[0]) {
							Tracking.BtnClick("电台暂停按钮");
							$("#RadioAudioSong")[0].pause();
							$("#radioPlayBtn").addClass("playBtn").removeClass("playStopBtn");
							StatusPlaying = false;
						}
					}
				}
				else {
					RadioMedia.pause();
				}
			});

			$("#radioCloud").unbind("mouseup").mouseup(function() {
				var tar = $(this);
				if (tar.attr("class").indexOf("cloudNo") == -1) {
					tar.removeClass("cloud_down");
				}
				else {
					tar.removeClass("cloudNo_down");
				}
				if (Oauth_helper.User_accessTaken) {
					var songItem = new Array();
					var songId = RadioPlayList.getCurrentSong();
					songItem.push(songId);
					Data.init.cloud_isFavorite(function(data) {
						var tag = data["result"][RadioPlayList.getCurrentSong()];
						if (tag == "0") {
							Tracking.BtnClick("收藏电台歌曲按钮");
							var songList = new Array();
							songList.push(RadioPlayList.getCurrentSong());
							Data.init.cloud_addSongFavorite(function() {
								$("#addCloudSong").html("歌曲已收藏");
								songAddAlert();
								$("#radioCloud").removeClass();
								$("#radioCloud").addClass("cloud");
							}, songList);
						}
						else {
							Tracking.BtnClick("取消收藏电台歌曲按钮");
							var songList = new Array();
							songList.push(RadioPlayList.getCurrentSong());
							$("#radioCloud").removeClass();
							$("#radioCloud").addClass("cloudNo");
							Data.init.cloud_delSongFavorite(function(data) {
								songAddAlert();
								$("#addCloudSong").html("已取消收藏");
								$("#radioCloud").removeClass();
								$("#radioCloud").addClass("cloudNo");
							}, songList);
						}
					}, songItem);
				}
				else {
					//login
					Controler.transfer(new MyMusicView());
					$(loginPage.find(".submit")).css({
						"margin-left":"87px", });
					$(loginPage.find("#loginClose")).css({
						"display":"block" });
				}
				;
			});

			$(".radioControlBar .cloudNo").unbind("mousedown").mousedown(function() {
				var tar = $(this);
				if (tar.attr("class").indexOf("cloudNo") == -1) {
					tar.addClass("cloud_down");
				}
				else {
					tar.addClass("cloudNo_down");
				}

			});
			$("#radioNextBtn").unbind("mousedown").mousedown(function() {
				$("#radioNextBtn").addClass("radioNextBtn_down");
			});
			$("#radioNextBtn").unbind("mouseup").mouseup(function() {
				Tracking.BtnClick("电台下一首按钮");
				$("#radioNextBtn").removeClass("radioNextBtn_down");
				Controler.preloadLayerShow($(".radioMiddleView"), "");
				RadioPlayList.getNextSong();
				$("#radioPlayBtn").addClass("playBtn").removeClass("playStopBtn");
				_this.getCurrentSongInfo(function() {
					Controler.preloadLayerHide($(".radioMiddleView"));

				});
			});

			$(".radioList .item div").unbind("mousedown").mousedown(function() {
				$(".radioList .item div").removeClass('secondClassU_down');
				$(".radioList .item div").removeClass('secondClassM_down');
				$(".radioList .item div").removeClass('secondClassD_down');
				$(".item div span").removeClass('current');
				var flag = parseInt($(this).attr('flag'));
				if (flag % 3 == 0) {
					$(this).addClass("secondClassU_down");
				}
				if (flag % 3 == 1) {
					$(this).addClass("secondClassM_down");
				}
				if (flag % 3 == 2) {
					$(this).addClass("secondClassD_down");
				}
			});

			$(".radioList .item div").unbind("mouseup").mouseup(function() {
				$(this).find("span").addClass('current');
				var channelId = $(this).attr("channelid");
				_this.getSongByChannel(function() {

				}, channelId);
			});

			$(".radioListContainer").scrollable({
				disabled:".disabled",
				vertical:false,
				next:".bottomArrow",
				prev:".topArrow" });

			$(".bottomArrow").mousedown(function() {
				$(this).addClass("mousedown");
			}).mouseup(function() {
				$(this).removeClass("mousedown");
			});
			$(".topArrow").mousedown(function() {
				$(this).addClass("mousedown");
			}).mouseup(function() {
				$(this).removeClass("mousedown");
			});

		};

		this.show = function() {
			DebugLog("preloadLayer show");

			_this.prototype.show.call(_this);
			if (ViewInitFlag.RadioView) {
				this.dataInit(function(data) {
					_this.addEvent();
					ViewInitFlag.RadioView = false;
					//default radion channel
					DebugLog("init radioView preload hide:");
					$("#defaultRadioChannel").addClass("secondClassU_down");
					if ($($("#defaultRadioChannel").find("span").attr("class")).toString().indexOf("current") == -1) {
						$($("#defaultRadioChannel").find("span")).addClass('current');
					}
					Controler.preloadLayerHide($("#radioView"));
					_this.getSongByChannel(function() {

					}, $("#defaultRadioChannel").attr("channelid"));
				});
			}
			else {
				DebugLog("inited radioView preload hide:");
				Controler.preloadLayerHide($("#radioView"));
			}

			document.getElementById("radioView").style.width = 802 + "px";
			setTimeout(function() {
				DebugLog("hide again");
				Controler.preloadLayerHide($("#radioView"));
			}, 3000);

		};

		this.hide = function() {
			this.prototype.hide.call(this);
		};

		//get the channel songlist
		this.getSongByChannel = function(func, channelid, page_no, page_size) {
			Controler.preloadLayerShow($(".radioMiddleView"), "");
			var PageSize = 50;
			Data.init.radio_songList(function(data) {
				//console.log(data);
				var songLength = data.channelinfo.count;
				var pageLength = Math.ceil(songLength / PageSize);
				var randomPageNo = parseInt(Math.random() * pageLength) + 1;
				Data.init.radio_songList(function(data) {
					var songListObj = data.channelinfo.songlist;
					var songList = new Array();
					for (var i = 0; i < songListObj.length; i++) {
						songList.push(songListObj[i].songid);
						//console.log("songId = "+songList[i]);
					}
					RadioPlayList.updateChannel(channelid, randomPageNo, pageLength);
					RadioPlayList.addSongList(songList);
					//console.log(RadioPlayList.songList);
					//play the music
					_this.getCurrentSongInfo(function() {
						Controler.preloadLayerHide($(".radioMiddleView"));
					});
				}, channelid, randomPageNo, PageSize);
			}, channelid, 1, 1);

			typeof func == "function" && func();
		};

		this.getCurrentSongInfo = function(func) {
			var currentSongId = RadioPlayList.getCurrentSong();
			Data.init.song_info(function(data) {
				//$("#testSongId").attr("href",data.songurl.url[0].file_link);
				if ( !data.songurl) {
					RadioPlayList.getNextSong();
					return;
				}
				if (data.songurl.url[0]) {
					/* Audio tag code */
					var audio, source, audioContainer;
					if (audioFlag) {
						audio = $("<audio id='RadioAudioSong' autoplay='true' preload='auto'></audio>");
						source = $("<source type='audio/mpeg' src='" + data.songurl.url[0].file_link + "'></source>");
						source.attr("type", "audio/mpeg");
						source.attr("src", data.songurl.url[0].file_link);
						audio.html(source);
						audioContainer = $("#audioContainer .radioContainer");
						audioContainer.html(audio);
					}
					else {
						var mediaUrl = data.songurl.url[0].file_link;
						RadioMedia = new Media(mediaUrl, "radio", {
							play:function() {
								$("#radioPlayBtn").addClass("playStopBtn").removeClass("playBtn");
							},
							pause:function() {
								$("#radioPlayBtn").removeClass("playStopBtn").addClass("playBtn");

							},
							end:function() {
								DebugLog("Radio next song!");
								DebugLog('Code = ' + CodeStatus + 'Play next radiosong!');
								$("#radioStopBtn").addClass("playBtn").removeClass("playStopBtn");
								Controler.preloadLayerShow($(".radioMiddleView"), "");
								RadioPlayList.getNextSong();
								new RadioView().getCurrentSongInfo(function() {
									Controler.preloadLayerHide($(".radioMiddleView"), "");
								});
							},
							stop:function() {
								$("#radioStopBtn").addClass("playBtn").removeClass("playStopBtn");
							} });

						RadioMedia.play();
					}
					//add pic
					if (data.songinfo.pic_small) {
						$(".radioMiddleViewLogo").css({
							"background":"url(" + data.songinfo.pic_small + ") no-repeat",
							"background-size":"100%", });
					}
					else {
						$(".radioMiddleViewLogo").css({
							"background":"url('static/images/radioViewMiddleLogo.png')",
							"background-size":"100%", });
					}

					//addTitle
					$(".radioSongTitle").html(data.songinfo.title);
					//add author
					$(".radioSongArtist").html(data.songinfo.author);

					if (Oauth_helper.User_accessTaken) {
						var songItem = new Array();
						var songId = RadioPlayList.getCurrentSong();
						songItem.push(songId);
						Data.init.cloud_isFavorite(function(data) {
							var tag = data["result"][RadioPlayList.getCurrentSong()];
							if (tag == "0") {
								//not favourite song
								$("#radioCloud").removeClass();
								$("#radioCloud").addClass("cloudNo");
							}
							else {
								var songList = new Array();
								songList.push(RadioPlayList.getCurrentSong());
								$("#radioCloud").removeClass();
								$("#radioCloud").addClass("cloud");
							}
						}, songItem);
					}

					if (audioFlag) {
						$($("#RadioAudioSong")[0]).bind("timeupdate", function(event) {
							// $("#currentTime").html(event.currentTarget.currentTime);
							if (event.currentTarget.currentTime == event.currentTarget.duration) {
								Controler.preloadLayerShow($(".radioMiddleView"), "");
								// Controler.preloadLayerShow($("#radioView"),"");
								RadioPlayList.getNextSong();
								_this.getCurrentSongInfo(function() {
									Controler.preloadLayerHide($(".radioMiddleView"), "");
								});
							}
						});

						$($("#RadioAudioSong")[0]).bind("play", function(e) {
							$("#radioPlayBtn").addClass("playStopBtn").removeClass("playBtn");
							StatusPlaying = true;
						});

						$($("#RadioAudioSong")[0]).bind("pause", function(e) {
							$("#radioStopBtn").addClass("playBtn").removeClass("playStopBtn");
							StatusPlaying = false;
							DebugLog("Radio pause the radio");
						});

						$($("#RadioAudioSong")[0]).bind("ended", function(e) {
							DebugLog("radio end ");
							$("#radioStopBtn").addClass("playBtn").removeClass("playStopBtn");
							StatusPlaying = false;
							Controler.preloadLayerShow($(".radioMiddleView"), "");
							// Controler.preloadLayerShow($("#radioView"),"");
							RadioPlayList.getNextSong();
							_this.getCurrentSongInfo(function() {
								Controler.preloadLayerHide($(".radioMiddleView"), "");
							});
						});

					}
				}
				else {
					RadioPlayList.getNextSong();
					_this.getCurrentSongInfo(function() {
						DebugLog("preloadLayerHide radio");
						Controler.preloadLayerHide($(".radioMiddleView"), "");
					});
				}
				typeof func == "function" && func();
			}, currentSongId);

			if (audioFlag) {
				if ($("#PlayAudioSong")[0]) {
					$("#PlayAudioSong")[0].pause();
					$("#playBtn").addClass("playBtn").removeClass("playBtn_down");
				}
			}
		};
	};
}());
