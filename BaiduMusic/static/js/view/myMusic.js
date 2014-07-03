var fromCloudView = false;
var FirstTimeLogin = false;
(function() {
	MyMusicView = function() {
		View.call(this, "myMusic");
		this.prototype = new View();
		this.prototype.constructor = MyMusicView;
		var _this = this;
		this.pageName = "mycadillac:百度音乐:我的音乐页面";
		this.loginStatus = false;
		this.dataInit = function(func) {
			typeof func == "function" && func();
		};
		this.addEvent = function() {
			$("#myMusic .alertBtn").unbind("mouseup").bind("mouseup", function() {
				Controler.goback();
			});
			$(".cloudMusicBtn").unbind("mousedown").bind("mousedown", function() {
				var tar = $(this);
				$(this).addClass("cloudMusicBtn_down");
			}).unbind("mouseup").bind("mouseup", function() {
				var tar = $(this);
				tar.removeClass("cloudMusicBtn_down");
				Controler.transfer(new MyCloudSongView());
			});
			$(".logoutBtn").unbind("mousedown").bind("mousedown", function() {
				var tar = $(this);
				$(this).addClass("logoutBtn_down");
			});
			$(".logoutBtn").unbind("mouseup").bind("mouseup", function() {
				HasLogout = true;
				FirstTimeLogin = false;
				var tar = $(this);
				Oauth_helper.User_accessTaken = null;
				if ( !LOGINTEST) {
					Storage.updateSearchHistory("", "");
				}
				userData = null;
				Oauth_helper.User_accessTaken = null;
				$("#loginIframe").html("<iframe id='loginPage' onload='loginLoaded()'></iframe>");
				Oauth_helper.BaiduMusic_ImplicitGrant();
				tar.removeClass("logoutBtn_down");
				$(".userAccount").addClass("hidden");
				$(".userFunction").addClass("hidden");
				Controler.transfer(new MusicOnlineIndexView());
			});

			$(".loginBefBtn").unbind("mousedown").mousedown(function() {
				var tar = $(this);
				tar.addClass("down");
			});
			$(".loginBefBtn").unbind("mouseup").mouseup(function() {
				var tar = $(this);
				tar.removeClass("down");
				$("#loginBefore").addClass("hidden");
				$("#loginIframe").removeClass("hidden");
			});
		};

		this.show = function() {
			_this.prototype.show.call(_this);
			$("#loginIframe .username").html("");
			$("#myMusicBtn").addClass("current");
			$("#myMusic").removeClass("nobg");
			if ( !Oauth_helper.User_accessTaken) {
				_this.loginStatus = true;
				$("#loginBefore").removeClass("hidden");
				_this.addEvent();
			}
			else if ((Oauth_helper.User_accessTaken && fromCloudView) || (Oauth_helper.User_accessTaken && FirstTimeLogin)) {
				// 状态为登陆并且返回自CloudView
				$(".userAccount").removeClass("hidden");
				$(".userFunction").removeClass("hidden");
				_this.loginStatus = false;
				_this.addEvent();
				Controler.preloadLayerShow($("#myCloudSong"));
				_this.getCloudFavoriteSong(function() {
					Controler.preloadLayerHide($("#myCloudSong"));
				}, 1, 10);
				FirstTimeLogin = false;
				$("#loginIframe").addClass("hidden");
			}
			else if ((Oauth_helper.User_accessTaken && !fromCloudView) || (Oauth_helper.User_accessTaken && !FirstTimeLogin)) {
				_this.loginStatus = false;
				_this.prototype.hide.call(this);
				Controler.transfer(new MyCloudSongView());
				$("#loginIframe").addClass("hidden");
			}
		};
		this.hide = function() {
			this.prototype.hide.call(this);
			$("#myMusicBtn").removeClass("current");
			$("#loginIframe").addClass("hidden");
			$("#registerBox").addClass("hidden");
			fromCloudView = false;
//			if(!BufferView){
//				$("#CloudSongList").html("");
//			}
		};

		this.getCloudFavoriteSong = function(func, page_no, page_size) {
			ViewInitFlag.MyMusicView = false;
			Data.init.cloud_getFavoriteSong(function(data) {
				console.log(data);
				var pagesize = page_size;
				var scrollapi = $("#CloudSongList").data('jsp');
				if (scrollapi) {
					scrollapi.destroy();
				}
				DebugLog("getCloudFavoriteSong--> data:" + data);
				var htmlStr = new Array();
				if (data["result"] && data["result"].length > 0) {
					$("#songNumber").html(data["total"]);
					for ( var i in data["result"]) {
						var song = data["result"][i];
						var n = parseInt(page_no - 1) * page_size + parseInt(i) + 1;
						htmlStr.push("<div style='width:500px'>");
						htmlStr.push("<div class='song' api='cloud_songlist' song_id='" + song.song_id + "' select=false>");
						htmlStr.push("<div class='songList'>");
						htmlStr.push("<div class='songDetail'>");
						htmlStr.push("<div class='songName'>" + n + "." + song.title + "</div>");
						htmlStr.push("<div class='songer'>" + song.artist + "</div>");
						htmlStr.push("</div>");
						htmlStr.push("</div>");
						htmlStr.push("<div class='selectIcon hidden'></div>");
						htmlStr.push("</div>");
						htmlStr.push("</div>");
						if (i == data["result"].length - 1 && i == pagesize - 1) {
							htmlStr.push("<div id='moreCloudSongBtn' class='moreCloudSongBtn'>更多...</div>");
							// htmlStr.push("</div>");
						}
						else if (i == data["result"].length - 1) {
						}
					}
				}
				if (page_no && page_no == 1) {
					$("#CloudSongList").html(htmlStr.join(""));
				}
				else {
					$("#CloudSongList").html($("#CloudSongList").html() + htmlStr.join(""));
				}

				$(".moreCloudSongBtn").unbind("mouseup").bind("mouseup", function() {
					var api = $("#CloudSongList").data("jsp");
					var currentY = api.getContentPositionY();
					$("#moreCloudSongBtn").html("加载中...");
					$("#addMoreCloudSongLoadInfo").html("更多好歌加载中...");
					$("#addMoreCloudSongLoadInfo").fadeIn();
					var AddFlag = true;
					var settime = setTimeout(function() {
						if (AddFlag) {
							$("#addMoreCloudSongLoadInfo").html("加载失败，请重试...");
							$("#addMoreCloudSongLoadInfo").fadeOut();
							$("#moreCloudSongBtn").html("更多");
						}
					}, 10000);
					_this.getCloudFavoriteSong(function() {
						AddFlag = false;
						$("#moreCloudSongBtn").remove();
						$("#addMoreCloudSongLoadInfo").fadeOut();
						$(".selectIcon").removeClass("hidden");
						$('#CloudSongList').on('jsp-initialised', function() {
							// Rotary.init($('ul.resourceList li'));
						}).jScrollPane({
							showArrows:true,
							verticalArrowPositions:'os',
							horizontalArrowPositions:'os',
							hideFocus:true,
							verticalDragMinHeight:20,
							verticalDragMaxHeight:20,
							animateScroll:true,
							arrowButtonSpeed:225,
							mouseWheelSpeed:50,
							trackClickSpeed:225
						// horizontalGutter: 250,
						// verticalGutter: 50
						});
						$("#CloudSongList").data("jsp").scrollToY(currentY);
//						$(".jspArrowDown").unbind("mousedown").bind("mousedown",function(){
//							$(this).addClass("topArrow_down")
//						}).unbind("mouseup").bind("mouseup",function(){
//							
//						});
//						$(".jspArrowUp").unbind("mousedown").bind("mousedown",function(){
//							
//						});
					}, page_no + 1, 10);
				});

				// add Events
				$(".selectIcon").unbind("mouseup").bind("mouseup", function() {
					var icon = $(this);
					if (Oauth_helper.User_accessTaken) {
						var songItem = new Array();
						var songId = $(this).parent().attr("song_id");
						songItem.push(songId);
						var songList = icon.parent().find(".songList");
						if(songList.hasClass("deleted")){
							songList.removeClass("deleted");
						}else{
							songList.addClass("deleted");
						}
						if(icon.hasClass("selectedIcon")){
							icon.removeClass("selectedIcon");
						}else{
							icon.addClass("selectedIcon");
						}
						Data.init.cloud_isFavorite(function(data) {
							var tag = data["result"][songId];
							if (tag == "0") {
								// not favourite song
								console.log("no song");

								var songList = new Array();
								songList.push(songId);
								Data.init.cloud_addSongFavorite(function() {
									songAddAlert();
									Tracking.BtnClick("收藏歌曲按钮");
									$("#addCloudSong").html("歌曲已收藏");
									icon.parent().find(".songList").removeClass("deleted");
									icon.removeClass("selectedIcon");
								}, songList);
							}
							else {
								console.log("have song");
								var songList = new Array();
								songList.push(songId);
								Data.init.cloud_delSongFavorite(function(data) {
									songAddAlert();
									Tracking.BtnClick("取消收藏歌曲按钮");
									$("#addCloudSong").html("已取消收藏");
									icon.parent().find(".songList").addClass("deleted");
									icon.addClass("selectedIcon");
								}, songList);
							}
						}, songItem);
					}
					else {
						// login
						$("#loginIframe").removeClass("hidden");

						loginSuccessFunc = function() {
							if (Oauth_helper.User_accessTaken) {
								var songItem = new Array();
								var songId = $(this).parent().attr("song_id");
								songItem.push(songId);
								Data.init.cloud_isFavorite(function(data) {
									var tag = data["result"][songId];
									if (tag == "0") {
										// not favourite song
										console.log("no song");
										icon.addClass("selectedIcon");
									}
									else {
										console.log("have song");
										var songList = new Array();
										songList.push(songId);
										icon.removeClass("selectedIcon");
									}
								}, songItem);
							};
						};
					};
				});

				$(".songDetail").mousedown(function() {
					$(this).parent().removeClass("artistSongItem_down");
					$(this).parent().addClass("artistSongItem_down");
				});
				$(".songDetail").mouseup(function() {
					var currentSongId = $(this).parent().parent().attr("song_id");
					var api = $(this).parent().parent().attr("api");
					var songListObject = $(this).parent().parent().parent().parent().children("div").children(".song");
					var songList = new Array();
					console.log("myMusic:songListObject.length=" + songListObject.length);
					for (var i = 0; i < songListObject.length; i++) {

						songList.push($(songListObject[i]).attr("song_id"));
						console.log("songId = " + songList[i]);
					}

					// var type = $(this).attr("type");
					var param = {};

					console.log(songList);
					// add songList in PlayList
					PlayList.addSongList(songList);
					PlayList.addPlayList(api, param);
					// change currentTag by songId
					PlayList.changeSongTagById(currentSongId);

					$(".song .songList").removeClass("artistSongItem_down");
					$(".Footer").addClass("hidden");
					// go paly view
					Controler.transfer(new PlayView());
				});

				typeof func == "function" && func();
			}, page_no, page_size);
		};

	};
}());
