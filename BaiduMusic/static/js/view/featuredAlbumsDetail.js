//featuredAlbumsDetailView
(function() {
	FeaturedAlbumsDetailView = function(code) {
		View.call(this, "featuredAlbumsDetailView");
		this.prototype = new View();
		this.prototype.constructor = FeaturedAlbumsDetailView;
		this.code = code;
		var _this = this;
		this.pageName = "mycadillac:百度音乐:精选专辑专辑详情页面";
		this.dataInit = function(func) {
			_this.getAlbumSongsList(function() {

				typeof func == "function" && func();
			}, _this.code);
		};

		this.addEvent = function() {
			$("#featuredAlbumsDetailView .albumSongsList").scrollable({
				disabled:".disabled",
				vertical:true,
				next:"#featuredAlbumsDetailView .top_arrow",
				prev:"#featuredAlbumsDetailView .bot_arrow" });

			$("#featuredAlbumsDetailView .playAllBtn").unbind("mouseup").mouseup(function() {
				var songListObject = $("#featuredAlbumsDetailView .albumSongsList").children("div").children("div").children(".song");
				var songList = new Array();
				console.log("featuredAlbumsDetailView:songListObject.length=" + songListObject.length);
				for (var i = 0; i < songListObject.length; i++) {

					songList.push($(songListObject[i]).attr("song_id"));
					console.log("songId = " + songList[i]);
				}
				console.log(songList);
				//add songList in PlayList
				PlayList.addSongList(songList);
				Controler.transfer(new PlayView());
			});

		};

		this.show = function() {
			Controler.preloadLayerShow($("#featuredAlbumsDetailView"));
			_this.prototype.show.call(_this);
			if (_this.code) {
				this.dataInit(function(data) {
					if (ViewInitFlag.FeaturedAlbumsDetailView) {
						_this.addEvent();
						BufferView && (ViewInitFlag.FeaturedAlbumsDetailView = false);
					}
					var scrollapi = $("#featuredAlbumsDetailView .albumSongsList").data("scrollable");
					scrollapi.seekTo(0);

					Controler.preloadLayerHide($("#featuredAlbumsDetailView"));
				});
			}
			else {
				//_this.prototype.show.call(_this);
				Controler.preloadLayerHide($("#featuredAlbumsDetailView"));
			}
		};

		this.hide = function() {
			this.prototype.hide.call(_this);
			if ( !BufferView) {
				$("#featuredAlbumsDetailView .song_list").html("");
			}
			//ViewInitFlag.FeaturedAlbumsDetailView = false;
		};

		//Custom Function
		this.addArtistalbumListEvent = function() {

		};

		this.getAlbumSongsList = function(func, code) {
			Data.init.featured_album_songsList(function(data) {
				var htmlStr = new Array();
				if (data) {
					$("#featuredAlbumsDetailView .albumImg").css({
						"background":"url('" + data.pic + "')",
						"background-size":"70px 70px" });
					$("#featuredAlbumsDetailView .albumDes").html(data.desc);
					/*$("#featuredAlbumsDetailView .songer").html(data.albumInfo.author);*/
					/*$("#featuredAlbumsDetailView .albumTime").html(data.albumInfo.publishtime);*/
				}
				if (data.list) {
					var no = 1;

					for ( var i in data.list) {
						/*if(i>5){break;}*/
						var songs = data.list[i];
						if (i % 6 == 0) {
							htmlStr.push("<div>");
							htmlStr.push("<div class='song' song_id='" + songs.song_id + "'>");
							htmlStr.push("<div class='songList' song_id='" + songs.song_id + "'>");
							htmlStr.push("<div class='songDetail'>");
							htmlStr.push("<div class='songName'>" + no + "." + songs.title + "</div>");
							htmlStr.push("<div class='songer'>" + songs.author + "</div>");
							htmlStr.push("</div>");
							htmlStr.push("</div>");
							htmlStr.push("</div>");
							no++;
							if (i == data.list.length - 1) {
								htmlStr.push("</div>");
							}
						}
						if (i % 6 == 1 || i % 6 == 2 || i % 6 == 3 || i % 6 == 4) {
							htmlStr.push("<div class='song' song_id='" + songs.song_id + "'>");
							htmlStr.push("<div class='songList' song_id='" + songs.song_id + "'>");
							htmlStr.push("<div class='songDetail'>");
							htmlStr.push("<div class='songName'>" + no + "." + songs.title + "</div>");
							htmlStr.push("<div class='songer'>" + songs.author + "</div>");
							htmlStr.push("</div>");
							htmlStr.push("</div>");
							htmlStr.push("</div>");
							no++;
							if (i == data.list.length - 1) {
								htmlStr.push("</div>");
							}
						}
						if (i % 6 == 5) {
							htmlStr.push("<div class='song' song_id='" + songs.song_id + "'>");
							htmlStr.push("<div class='songList' song_id='" + no + "." + songs.song_id + "'>");
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
				}
				$("#featuredAlbumsDetailView .song_list").html(htmlStr.join(""));

				$("#featuredAlbumsDetailView .song").unbind("mousedown").mousedown(function() {
					$("#featuredAlbumsDetailView .song").removeClass("artistSongItem_down");
					$(this).addClass("artistSongItem_down");
				});
				$("#featuredAlbumsDetailView .song").unbind("mouseup").mouseup(function() {
					var currentSongId = $(this).attr("song_id");
					var songListObject = $(this).parent().parent().children("div").children(".song");
					var songList = new Array();
					console.log("newAlbumShelvesDetail:songListObject.length=" + songListObject.length);
					for (var i = 0; i < songListObject.length; i++) {

						songList.push($(songListObject[i]).attr("song_id"));
						console.log("songId = " + songList[i]);
					}
					console.log(songList);
					//add songList in PlayList
					PlayList.addSongList(songList);
					//change currentTag by songId
					PlayList.changeSongTagById(currentSongId);

					x$("#featuredAlbumsDetailView .song").removeClass("artistSongItem_down");
					//go paly view
					Controler.transfer(new PlayView());
				});
				typeof func == "function" && func();
			}, code);
		};

		this.getSongInfo = function(func, song_id) {
			Data.init.song_info(function(data) {
				console.log(data);
				PlayingSong = data;
				//Put the value to PlayingSong 
				typeof func == "function" && func();
			}, song_id);

		};

	};
}());
