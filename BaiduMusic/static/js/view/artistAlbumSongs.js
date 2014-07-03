//artistAlbumSongsView View
(function() {
	ArtistAlbumSongsView = function(albumId) {
		View.call(this, "artistAlbumSongsView");
		this.prototype = new View();
		this.prototype.constructor = ArtistAlbumSongsView;
		this.albumId = albumId;
		var _this = this;
		this.pageName = "mycadillac:百度音乐:热门歌手专辑页面";
		this.dataInit = function(func) {
			this.getAlbumSongsList(function() {
				//callback function
				typeof func == "function" && func();
			}, _this.albumId);
		};

		this.addEvent = function() {
			$(".album_songs_listScroller").scrollable({
				disabled:".disabled",
				vertical:true,
				next:"#artistAlbumSongsView .top_arrow",
				prev:"#artistAlbumSongsView .bot_arrow" });

		};
		this.show = function() {
			_this.prototype.show.call(_this);
			Controler.preloadLayerShow($("#artistAlbumSongsView"));
			if (_this.albumId == 0 || _this.albumId) {//init data
				this.dataInit(function() {
					if (ViewInitFlag.ArtistAlbumSongs) {
						_this.addEvent();
						BufferView && (ViewInitFlag.ArtistAlbumSongs = false);
					}
					var scrollapi = $(".album_songs_listScroller").data("scrollable");
					scrollapi.seekTo(0);

					//hide
					Controler.preloadLayerHide($("#artistAlbumSongsView"));
				});
			}
			else {
				Controler.preloadLayerHide($("#artistAlbumSongsView"));
			}
		};

		this.hide = function() {
			this.prototype.hide.call(_this);
			if ( !BufferView) {
				$("#artistAlbumSongsView .album_songs_list").html("");
			}
		};

		//Custom funtion
		this.getAlbumSongsList = function(func, albumid) {
			Data.init.album_info(function(data) {
				var htmlStr = new Array();
				if (data.albumInfo) {
					//$("#artistAlbumSongsView .albumImg").css("background","url('"+data.albumInfo.pic_small+"')");
					$("#artistAlbumSongsView .albumTitle").html(data.albumInfo.title);
					$("#artistAlbumSongsView .songer").html("" + data.albumInfo.author + "");
					$("#artistAlbumSongsView .publishTime").html(data.albumInfo.publishtime);
				}
				if (data.songlist) {
					var no = 1;
					for ( var i in data.songlist) {
						/*if(i>5){break;}*/
						var songs = data.songlist[i];
						//var no = 
						if (i % 5 == 0) {
							htmlStr.push("<div>");
							htmlStr.push("<div class='song' song_id='" + songs.song_id + "'>");
							htmlStr.push("<div class='songList'>");
							htmlStr.push("<div class='songDetail'>");
							htmlStr.push("<div class='songName'>" + songs.title + "</div>");
							htmlStr.push("<div class='songer'>" + songs.author + "</div>");
							htmlStr.push("</div>");
							htmlStr.push("</div>");
							htmlStr.push("</div>");
							no++;
							if (i == data.songlist.length - 1) {
								htmlStr.push("</div>");
							}
						}
						if (i % 5 == 1 || i % 5 == 2 || i % 5 == 3) {
							htmlStr.push("<div class='song' song_id='" + songs.song_id + "'>");
							htmlStr.push("<div class='songList'>");
							htmlStr.push("<div class='songDetail'>");
							htmlStr.push("<div class='songName'>" + songs.title + "</div>");
							htmlStr.push("<div class='songer'>" + songs.author + "</div>");
							htmlStr.push("</div>");
							htmlStr.push("</div>");
							htmlStr.push("</div>");
							no++;
							if (i == data.songlist.length - 1) {
								htmlStr.push("</div>");
							}
						}
						if (i % 5 == 4) {
							htmlStr.push("<div class='song' song_id='" + songs.song_id + "'>");
							htmlStr.push("<div class='songList'>");
							htmlStr.push("<div class='songDetail'>");
							htmlStr.push("<div class='songName'>" + songs.title + "</div>");
							htmlStr.push("<div class='songer'>" + songs.author + "</div>");
							htmlStr.push("</div>");
							htmlStr.push("</div>");
							htmlStr.push("</div>");
							no++;
							htmlStr.push("</div>");
						}
					}
				}

				$("#artistAlbumSongsView .album_songs_list").html(htmlStr.join(""));

				$("#artistAlbumSongsView .song").mousedown(function() {
					$("#artistAlbumSongsView .song").removeClass("artistSongItem_down");
					$(this).addClass("artistSongItem_down");
				});

				$("#artistAlbumSongsView .song").mouseup(function() {
					//var song_id = x$(this).attr("song_id");
					//ReadySong.song_id = song_id;
					var currentSongId = $(this).attr("song_id");
					var songListObject = $(this).parent().parent().children("div").children(".song");
					var songList = new Array();
					console.log("artistalbum:songListObject.length=" + songListObject.length);
					for (var i = 0; i < songListObject.length; i++) {

						songList.push($(songListObject[i]).attr("song_id"));
						console.log("songId = " + songList[i]);
					}
					console.log(songList);
					//add songList in PlayList
					PlayList.addSongList(songList);
					//change currentTag by songId
					PlayList.changeSongTagById(currentSongId);
					$("#artistAlbumSongsView .song").removeClass("artistSongItem_down");
					//go paly view
					Controler.transfer(new PlayView());
				});
				typeof func == "function" && func();
			}, albumid);
		};
	};
}());
