var CURRENT_ARTISTID = 0;
(function() {
	ArtistInfoView = function(artistId) {
		View.call(this, "artistInfoView");
		this.prototype = new View();
		this.prototype.constructor = ArtistInfoView;
		this.artistId = artistId;
		CURRENT_ARTISTID = this.artistId;
		var _this = this;
		this.pageName = "mycadillac:百度音乐:热门歌手详细页面";
		this.dataInit = function(func) {
			_this.getArtistRelatedInfo(function() {
				_this.getArtistAlbumList(function() {
					typeof func == "function" && func();
				}, _this.artistId, null, 8);
				_this.getArtistSongsList(function() {

				}, _this.artistId, null, DefaultPageSize);
			}, _this.artistId);
		};

		this.addEvent = function() {
			$("#artistInfoView .songsItem").mouseup(function() {
				Tracking.BtnClick("显示歌手歌曲按钮");
				$(".topBar .btn").removeClass("selected");
				$(this).addClass("selected");
				//show the content
				$("#artistInfoView .artistAlbumList").css({
					"display":"none" });
				$("#artistInfoView .song_list").css({
					"display":"block" });
				//change the arrow
				$("#artistInfo_albumListArrow").addClass("hidden");
				$("#artistInfo_songListArrow").removeClass("hidden");
			});

			$("#artistInfoView .albumItem").mouseup(function() {
				Tracking.BtnClick("显示歌手专辑按钮");
				$(".topBar .btn").removeClass("selected");
				$(this).addClass("selected");
				$("#artistInfoView .artistAlbumList").css({
					"display":"block" });
				$("#artistInfoView .song_list").css({
					"display":"none" });
				//change the arrow
				$("#artistInfo_albumListArrow").removeClass("hidden");
				$("#artistInfo_songListArrow").addClass("hidden");

			});
		};

		this.show = function() {
			_this.prototype.show.call(_this);
			Controler.preloadLayerShow($("#artistInfoView"));
			if (_this.artistId == 0 || _this.artistId) {//init data
				_this.dataInit(function() {
					//if(ViewInitFlag.ArtistInfoView){
					_this.addEvent();
					//ViewInitFlag.ArtistInfoView =false;
					//}
					//hide
					Controler.preloadLayerHide($("#artistInfoView"));
				});
			}
			else {
				Controler.preloadLayerHide($("#artistInfoView"));

			}
		};

		this.hide = function() {
			this.prototype.hide.call(_this);
			ViewInitFlag.ArtistInfoView = false;
			if ( !BufferView) {
				$("#artistInfoView .song_list").html("");
				$("#artistInfoView .mainContent .artistAlbumList").html("");
			}
		};

		this.getArtistRelatedInfo = function(func, artist_id) {
			Data.init.artist_info(function(data) {
				if (data) {
					//$("#artistInfoView .artistImg").css("background","url('"+data.avatar_small+"')");
					$("#artistInfoView .artistName").html(data.name);
					$("#artistInfoView span.bithday").html(data.birth);
					$("#artistInfoView span.region").html(data.country);
					$("#artistInfoView span.songsTotal").html(data.songs_total);
					$("#artistInfoView span.ablumsTotal").html(data.albums_total);
				}
				typeof func == "function" && func();
			}, artist_id);
		};

		this.getArtistSongsList = function(func, artistid, page_no, page_size) {
			//func,artistid,page_no,page_size
			Data.init.artist_songlist(function(data) {
				var htmlStr = new Array();
				$(".songsItem .songsTotal").html(data['songnums']);
				if (data.songlist) {
					var no = 1;
					if (page_no) {
						no = (page_no - 1) * page_size + 1;
					}

					for ( var i in data.songlist) {
						/*if(no>4){break;}*/
						var songs = data.songlist[i];
						if (i % 5 == 0) {
							htmlStr.push("<div>");
							htmlStr.push("<div class='song' api='artist_songlist' artistid='" + artistid + "' song_id = '" + songs.song_id + "'>");
							htmlStr.push("<div class='songList'>");
							htmlStr.push("<div class='songDetail'>");
							htmlStr.push("<div class='songName'>" + no + "." + songs.title + "</div>");
							;
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
							htmlStr.push("<div class='song' api='artist_songlist' artistid='" + artistid + "' song_id = '" + songs.song_id + "'>");
							htmlStr.push("<div class='songList'>");
							htmlStr.push("<div class='songDetail'>");
							htmlStr.push("<div class='songName'>" + no + "." + songs.title + "</div>");
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
							htmlStr.push("<div class='song' api='artist_songlist' artistid='" + artistid + "' song_id = '" + songs.song_id + "'>");
							htmlStr.push("<div class='songList' >");
							htmlStr.push("<div class='songDetail'>");
							htmlStr.push("<div class='songName'>" + no + "." + songs.title + "</div>");
							htmlStr.push("<div class='songer'>" + songs.author + "</div>");
							htmlStr.push("</div>");
							htmlStr.push("</div>");
							htmlStr.push("</div>");
							no++;
							htmlStr.push("</div>");
						}
					}

					if (page_no && htmlStr.length) {
						x$("#artistInfoView .song_list").html("bottom", htmlStr.join(""));
						//x$("#RightResultList").html("bottom",htmlString.join(""));
						var scrollapi = $(".song_listScroller").data("scrollable");
						scrollapi.seekTo(scrollapi.getIndex());
					}
					else {
						//Fisrt time data init
						$("#artistInfoView .song_list").html(htmlStr.join(""));

						//don't add the repeating event
						if ( !$(".song_listScroller").data("scrollable")) {
							//add EventListener
							$(".song_listScroller").scrollable({
								disabled:".disabled",
								vertical:true,
								next:"#artistInfo_songListArrow .top_arrow",
								prev:"#artistInfo_songListArrow .bot_arrow" });
							var scrollapi = $(".song_listScroller").data("scrollable");
							scrollapi.onSeek(function() {
								if ((scrollapi.getIndex() + 1) == scrollapi.getItems().length) {
									var page_no = parseInt(scrollapi.getIndex() / 6) + 1;
									_this.getArtistSongsList(function() {
										//				            			_this.getArtistSongsList(function(){
										//											//add
										//										},CURRENT_ARTISTID,page_no+2,DefaultPageSize);
									}, CURRENT_ARTISTID, page_no + 1, DefaultPageSize);
								}
							});
						}
						else {
							var scrollapi = $(".song_listScroller").data("scrollable");
							scrollapi.seekTo(0);
						}
					}

					$("#artistInfoView  .song").unbind("mousedown").bind("mousedown", function() {
						$("#artistInfoView .songList").removeClass("artistSongItem_down");
						$(this).children(".songList").addClass("artistSongItem_down");
					});

					$("#artistInfoView  .song").unbind("mouseup").bind("mouseup", function() {
						var currentSongId = $(this).attr("song_id");
						var songListObject = $(this).parent().parent().children("div").children(".song");
						var songList = new Array();
						console.log("songListObject.length=" + songListObject.length);
						for (var i = 0; i < songListObject.length; i++) {

							songList.push($(songListObject[i]).attr("song_id"));
							console.log("songId = " + songList[i]);
						}
						console.log(songList);
						//add songList in PlayList
						//change currentTag by songId
						//add songList in PlayList
						var api = $(this).attr("api");
						var artistid = $(this).attr("artistid");
						var param = {
							"artistid":artistid };
						PlayList.addSongList(songList);
						PlayList.addPlayList(api, param);
						//change currentTag by songId
						PlayList.changeSongTagById(currentSongId);

						//console.log("song_id="+ReadySong.song_id);

						$("#artistInfoView  .songList").removeClass("artistSongItem_down");
						//go paly view
						Controler.transfer(new PlayView());
					});

				}

				typeof func == "function" && func();
			}, artistid, page_no, page_size);
		};

		this.getArtistAlbumList = function(func, artistid, page_no, page_size) {
			//func,artistid,page_no,page_size
			Data.init.artist_albumlist(function(data) {
				var htmlStr = new Array();
				if (data.albumlist && data.albumlist.length > 0) {
					var no = 1;
					for ( var i in data.albumlist) {
						var albums = data.albumlist[i];
						if (i % 4 == 0) {
							htmlStr.push("<div>");
							htmlStr.push("<div albumId='" + albums.album_id + "' class='albumItem'>");
							//htmlStr.push("<div class='albumImg' style='background:url("+albums.pic_small+");background-size:120px 70px'></div>");
							//htmlStr.push("<span>《</span><div class='albumTitle'>"+albums.title+"</div><span>》</span>");
							if (albums.pic_small) {
								htmlStr.push("<div class='albumImg' style='background:url(" + albums.pic_small + ");background-size:146px 105px'></div>");
								htmlStr.push("<div class='artistName'>" + albums.title + "</div>");
							}
							else {
								htmlStr.push("<span>《</span><div class='albumTitle'>" + albums.title + "</div><span>》<span>");
							}

							htmlStr.push("</div>");
							no++;
							if (i == data.albumlist.length - 1) {
								htmlStr.push("</div>");
							}
						}
						if (i % 4 == 1 || i % 4 == 2) {
							htmlStr.push("<div albumId='" + albums.album_id + "' class='albumItem'>");
							if (albums.pic_small) {
								htmlStr.push("<div class='albumImg' style='background:url(" + albums.pic_small + ");background-size:146px 105px'></div>");
								htmlStr.push("<div class='artistName'>" + albums.title + "</div>");
							}
							else {
								htmlStr.push("<span>《</span><div class='albumTitle'>" + albums.title + "</div><span>》<span>");
							}
							htmlStr.push("</div>");
							no++;
							if (i == data.albumlist.length - 1) {
								htmlStr.push("</div>");
							}
						}
						if (i % 4 == 3) {
							htmlStr.push("<div albumId='" + albums.album_id + "' class='albumItem'>");
							// htmlStr.push("<div class='albumImg' style='background:url("+albums.pic_small+");background-size:120px 70px'></div>");
							if (albums.pic_small) {
								htmlStr.push("<div class='albumImg' style='background:url(" + albums.pic_small + ");background-size:146px 105px'></div>");
								htmlStr.push("<div class='artistName'>" + albums.title + "</div>");
							}
							else {
								htmlStr.push("<span>《</span><div class='albumTitle'>" + albums.title + "</div><span>》<span>");
							}
							htmlStr.push("</div>");
							no++;
							htmlStr.push("</div>");
						}
					}

					if (page_no && htmlStr.length) {
						x$("#artistInfoView .mainContent .artistAlbumList").html("bottom", htmlStr.join(""));
						//x$("#RightResultList").html("bottom",htmlString.join(""));
						if ($(".artistAlbumListScroller").data("scrollable")) {
							var scrollapi = $(".artistAlbumListScroller").data("scrollable");
							scrollapi.seekTo(scrollapi.getIndex());
						}
						;
					}
					else {
						//Fisrt time data init
						$("#artistInfoView .mainContent .artistAlbumList").html(htmlStr.join(""));

						if ($("#artistInfoView .artistAlbumList").children("div").length == 1) {
							$("#artistInfo_albumListArrow .top_arrow").addClass("disabled");
							$("#artistInfo_albumListArrow .bot_arrow").addClass("disabled");
						}
						else {
							$("#artistInfo_albumListArrow .top_arrow").addClass("disabled");
							$("#artistInfo_albumListArrow .bot_arrow").removeClass("disabled");
						}

						if ( !$(".artistAlbumListScroller").data("scrollable")) {
							//add EventListener
							$(".artistAlbumListScroller").scrollable({
								disabled:".disabled",
								vertical:true,
								next:"#artistInfo_albumListArrow .top_arrow",
								prev:"#artistInfo_albumListArrow .bot_arrow" });
							var scrollapi = $(".artistAlbumListScroller").data("scrollable");
							scrollapi.onSeek(function() {
								if ((scrollapi.getIndex() + 1) == scrollapi.getItems().length) {
									var page_no = scrollapi.getIndex() + 1;
									_this.getArtistAlbumList(function() {
										//add
										_this.getArtistAlbumList(function() {
											//add
										}, CURRENT_ARTISTID, page_no + 2, 4);
									}, CURRENT_ARTISTID, page_no + 1, 4);
								}
							});
						}
						else {
							var scrollapi = $(".artistAlbumListScroller").data("scrollable");
							scrollapi.seekTo(0);
						}
					}
				}
				else if ( !page_no) {
					$("#artistInfoView .mainContent .artistAlbumList").html("");
				}

				/*_this.addArtistalbumListEvent();*/
				$("#artistInfoView .artistAlbumList .albumItem").unbind("mouseup").bind("mouseup", function() {
					var albumId = $(this).attr("albumId");
					$("#artistInfoView").addClass("hidden");

					//$("#artistAlbumSongsView").removeClass("hidden");
					Controler.transfer(new ArtistAlbumSongsView(albumId));

				});

				typeof func == "function" && func();

			}, artistid, page_no, page_size);
		};

		this.addArtistalbumListEvent = function() {
			$("#artistView .album_list .stretchArrow").mouseup(function() {
				var albumId = parseInt($(this).attr("albumId"));
				_this.getAlbumSongsList(function() {
					$("#artistView >.SecondClass_menu").css({
						"display":"none" });
					$("#artistView .album_list").css({
						"display":"none" });
					$("#artistView .song_list").css({
						"display":"none" });
					$("#artistView .album_songs_menu").css({
						"display":"block" });
					/*$("#artistView .artist_relateBtn div").removeClass("selected");
					$(this).addClass("selected");*/
				}, albumId);//no paging
			});
		};

		this.getSongInfo = function(func, song_id) {
			Data.init.song_info(function(data) {
				console.log(data);
				PlayingSong = data;
				typeof func == "function" && func();
			}, song_id);

		};

	};
}());
