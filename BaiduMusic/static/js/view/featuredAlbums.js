(function() {
	FeaturedAlbumsView = function() {
		View.call(this, "featuredAlbumsView");
		this.prototype = new View();
		this.prototype.constructor = FeaturedAlbumsView;
		var _this = this;
		//var PageSIZE = 60;
		this.pageName = "mycadillac:百度音乐:精选专辑首页专辑列表";
		this.dataInit = function(func) {
			_this.getFeaturedAlbums(function() {
				typeof func == "function" && func();
			}, 0, 12);//init page size: 12

		};
		this.addEvent = function() {
			$("#artistView .artist_relateBtn .songs").mouseup(function() {
				_this.getArtistSongsList(function() {
					$("#artistView .album_list").css({
						"display":"none" });
					$("#artistView .album_songs_menu").css({
						"display":"none" });
					$("#artistView >.SecondClass_menu").css({
						"display":"block" });
					$("#artistView .song_list").css({
						"display":"block" });
					/*$("#artistView .artist_relateBtn div").removeClass("selected");
					$(this).addClass("selected");*/
				}, _this.currentArtistId);
			});

			$("#artistView .artist_relateBtn .albums").mouseup(function() {
				_this.getArtistAlbumList(function() {
					$("#artistView .album_list").css({
						"display":"block" });
					$("#artistView .song_list").css({
						"display":"none" });
					/*$("#artistView .artist_relateBtn div").removeClass("selected");
					$(this).addClass("selected");*/
				}, _this.currentArtistId);
			});

		};

		this.show = function() {
			Controler.preloadLayerShow($("#featuredAlbumsView"));
			_this.prototype.show.call(_this);
			if (ViewInitFlag.FeaturedAlbumsView) {
				this.dataInit(function(data) {
					_this.addEvent();

					Controler.preloadLayerHide($("#featuredAlbumsView"));
					//alert(data.toString());
					$("#artistView .album_songs_menu").css({
						"display":"none" });
					$("#artistView .SecondClass_menu").css({
						"width":"522px" });
					BufferView && (ViewInitFlag.FeaturedAlbumsView = false);
				});
			}
			else {
				Controler.preloadLayerHide($("#featuredAlbumsView"));
			}

		};

		this.hide = function() {
			this.prototype.hide.call(_this);
			if ( !BufferView) {
				$("#featuredAlbumsView .ShelvesLists").html("");
				$("#artistView .song_list").html("");
				$("#artistView .album_list").html("");
			}
			//ViewInitFlag.FeaturedAlbumsView = false;
		};

		this.getFeaturedAlbums = function(func, page_no, page_size) {
			Data.init.featured_albums(function(data) {
				var htmlStr = new Array();
				if (data.albumList) {
					for ( var i in data.albumList) {
						var albumList = data.albumList[i];
						if (i % 6 == 0) {
							htmlStr.push("<div>");
							htmlStr.push("<div code='" + albumList.code + "' class='newAlbumItem'>");
							if (albumList.pic) {
								htmlStr.push("<div class='albumImg' style='background:url(" + albumList.pic + ");background-size:169px 130px'></div>");
							}
							else {
								htmlStr.push("<span>《</span><div class='albumTitle'>" + albumList.name + "</div><span>》<span>");
							}
							htmlStr.push("<div class='artistName'>" + albumList.name + "</div>");
							htmlStr.push("</div>");
							if (i == data.albumList.length - 1) {
								htmlStr.push("</div>");
							}
						}
						if (i % 6 == 1 || i % 6 == 2 || i % 6 == 3 || i % 6 == 4) {
							htmlStr.push("<div code='" + albumList.code + "' class='newAlbumItem'>");
							if (albumList.pic) {
								htmlStr.push("<div class='albumImg' style='background:url(" + albumList.pic + ");background-size:169px 130px'></div>");
							}
							else {
								htmlStr.push("<span>《</span><div class='albumTitle'>" + albumList.name + "</div><span>》<span>");
							}
							htmlStr.push("<div class='artistName'>" + albumList.name + "</div>");
							htmlStr.push("</div>");
							if (i == data.albumList.length - 1) {
								htmlStr.push("</div>");
							}
						}
						if (i % 6 == 5) {
							htmlStr.push("<div code='" + albumList.code + "' class='newAlbumItem'>");
							if (albumList.pic) {
								htmlStr.push("<div class='albumImg' style='background:url(" + albumList.pic + ");background-size:169px 130px'></div>");
							}
							else {
								htmlStr.push("<span>《</span><div class='albumTitle'>" + albumList.name + "</div><span>》<span>");
							}
							htmlStr.push("<div class='artistName'>" + albumList.name + "</div>");
							htmlStr.push("</div>");
							htmlStr.push("</div>");
						}
					}

					if (page_no && htmlStr.length) {
						x$("#featuredAlbumsView .ShelvesLists").html("bottom", htmlStr.join(""));
						//x$("#RightResultList").html("bottom",htmlString.join(""));
						var scrollapi = $("#featuredAlbumsView .ViewContent").data("scrollable");
						scrollapi.seekTo(scrollapi.getIndex());

					}
					else {
						//Fisrt time data init
						$("#featuredAlbumsView .ShelvesLists").html(htmlStr.join(""));
						//add EventListener
						$("#featuredAlbumsView .ViewContent").scrollable({
							disabled:".disabled",
							vertical:true,
							next:"#featuredAlbumsView .top_arrow",
							prev:"#featuredAlbumsView .bot_arrow" });

						var scrollapi = $("#featuredAlbumsView .ViewContent").data("scrollable");
						scrollapi.seekTo(0);
						scrollapi.onSeek(function() {
							if ((scrollapi.getIndex() + 1) == scrollapi.getItems().length) {
								var page_no = scrollapi.getIndex() + 1;
								/*= parseInt(_this.songlistscroller.attr("page"));
								page_no+=1;
								 */
								//_this.songlistscroller.attr("page",page_no);
								//var is_artist = parseInt(_this.songlistscroller.attr("is_artist"));
								_this.getFeaturedAlbums(function() {
									//add
								}, page_no + 1, 6 * 2);
							}
						});
					}

					$("#featuredAlbumsView .ShelvesLists .newAlbumItem").unbind("mouseup").bind("mouseup", function() {
						//function(){
						var albumName = $($(this).find(".artistName")).html();
						Tracking.BtnClick("专辑按钮-" + albumName);
						var code = $(this).attr("code");
						//_this.hide();
						Controler.transfer(new FeaturedAlbumsDetailView(code));

						//}
					})
				}
				typeof func == "function" && func();
			}, page_no, page_size);
		};

		this.getNewAlbumRelatedInfo = function(func, artist_id) {
			Data.init.artist_info(function(data) {
				if (data) {
					$("#artistView .FirstClass_relatedContent div.pic").css("background", "url('" + data.avatar_small + "')");
					$("#artistView .artist_info div.name").html(data.name);
					$("#artistView .artist_info span.bithday").html(data.birth);
					$("#artistView .artist_info span.region").html(data.country);
					$("#artistView .artist_relateBtn span.songsTotal").html(data.songs_total);
					$("#artistView .artist_relateBtn span.ablumsTotal").html(data.albums_total);
				}
				typeof func == "function" && func();
			}, artist_id);
		};

		this.getArtistSongsList = function(func, artistid) {
			Data.init.artist_songlist(function(data) {
				var htmlStr = new Array();
				if (data.songlist) {
					var no = 1;
					for ( var i in data.songlist) {
						var songs = data.songlist[i];
						htmlStr.push("<li class='song' song_id='" + songs.song_id + "'>");
						htmlStr.push("<div class='songList'>");
						htmlStr.push("<span class='number'>" + no + ".</span>");
						htmlStr.push("<div class='songDetail'>");
						htmlStr.push("<div class='songName'>" + songs.title + "</div>");
						htmlStr.push("<div class='songer'>" + songs.author + "</div>");
						htmlStr.push("</div>");
						htmlStr.push("</div>");
						htmlStr.push("</li>");
						no++;
					}
					$("#artistView .song_list").html(htmlStr.join(""));
				}
				typeof func == "function" && func();
			}, artistid);
		};

		this.getArtistAlbumList = function(func, artistid) {
			Data.init.artist_albumlist(function(data) {
				var htmlStr = new Array();
				if (data.albumlist) {
					var no = 1;
					for ( var i in data.albumlist) {
						var albums = data.albumlist[i];
						htmlStr.push("<li class='song'>");
						htmlStr.push("<span class='albumPic'></span>");
						htmlStr.push("<div class='songList'>");
						htmlStr.push("<div class='songDetail'>");
						htmlStr.push("<div class='songName'>" + albums.title + "</div>");
						htmlStr.push("<div class='songer'>" + albums.author + "</div>");
						htmlStr.push("</div>");
						htmlStr.push("</div>");
						htmlStr.push("<span class='stretchArrow' albumId='" + albums.album_id + "'>></span>");
						htmlStr.push("</li>");
						no++;
					}
					$("#artistView .album_list").html(htmlStr.join(""));
				}
				_this.addArtistalbumListEvent();
				typeof func == "function" && func();
			}, artistid);
		};

	};
}());
