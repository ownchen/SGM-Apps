(function() {
	ArtistView = function() {
		View.call(this, "artistView");
		this.prototype = new View();
		this.prototype.constructor = ArtistView;
		var _this = this;
		this.currentArtistId = null;
		this.dataInit = function(func) {
			_this.getArtistList(function() {
				typeof func == "function" && func();
			}, null, 8 * 2);
		};
		this.pageName = "mycadillac:百度音乐:热门歌手首页";
		this.addEvent = function() {

		};

		this.show = function() {
			Controler.preloadLayerShow($("#artistView"));
			if (ViewInitFlag.ArtistView) {
				_this.dataInit(function(data) {
					_this.addEvent();

					BufferView && (ViewInitFlag.ArtistView = false);
					Controler.preloadLayerHide($("#artistView"));
				});
			}
			else {
				Controler.preloadLayerHide($("#artistView"));
			}
			_this.prototype.show.call(_this);

			$("#artistView .album_songs_menu").css({
				"display":"none" });
			$("#artistView .SecondClass_menu").css({
				"width":"522px" });

		};
		this.hide = function() {
			this.prototype.hide.call(_this);
			if ( !BufferView) {
				$("#ArtistList").html("");
			}
		};

		this.getArtistList = function(func, page_no, page_size) {
			var type = ArtistType;
			Data.init.billboard_list(function(data) {
				var htmlStr = new Array();
				if (data["billboard" + type]) {
					for ( var i in data["billboard" + type].song_list) {
						var artist = data["billboard" + type].song_list[i];

						//var artist = data.artist[i];
						if (i % 8 == 0) {
							htmlStr.push("<div>");
							htmlStr.push("<div artistId='" + artist.artist_id + "' class='artistItems_up'>");
							//htmlStr.push("<div class='artistsPic' style='background:url("+artist.avatar_middle+");background-size:100px 90px'></div>");
							if (artist.avatar_middle) {
								htmlStr.push("<div class='songer' style='background:url(" + artist.avatar_middle + ");background-size:146px auto'>");

								htmlStr.push("</div>");
							}
							else {
								htmlStr.push("<div class='songer'>" + artist.name + "</div>");
							}
							htmlStr.push("<div class='artistName'>" + artist.name + "</div>");
							htmlStr.push("</div>");
							if (i == data["billboard" + type].song_list.length - 1) {
								htmlStr.push("</div>");
							}
						}
						if (i % 8 == 1 || i % 8 == 2 || i % 8 == 3 || i % 8 == 4 || i % 8 == 5 || i % 8 == 6) {
							htmlStr.push("<div artistId='" + artist.artist_id + "' class='artistItems_up'>");
							//htmlStr.push("<div class='artistsPic' style='background:url("+artist.avatar_middle+");background-size:100px 90px'></div>");
							if (artist.avatar_middle) {
								htmlStr.push("<div class='songer' style='background:url(" + artist.avatar_middle + ");background-size:146px auto'></div>");
							}
							else {
								htmlStr.push("<div class='songer'>" + artist.name + "</div>");
							}
							htmlStr.push("<div class='artistName'>" + artist.name + "</div>");
							htmlStr.push("</div>");
							if (i == data["billboard" + type].song_list.length - 1) {
								htmlStr.push("</div>");
							}
						}
						if (i % 8 == 7) {
							htmlStr.push("<div artistId='" + artist.artist_id + "' class='artistItems_up'>");
							//htmlStr.push("<div class='artistsPic' style='background:url("+artist.avatar_middle+");background-size:100px 90px'></div>");
							if (artist.avatar_middle) {
								htmlStr.push("<div class='songer' style='background:url(" + artist.avatar_middle + ");background-size:146px auto'></div>");
							}
							else {
								htmlStr.push("<div class='songer'>" + artist.name + "</div>");
							}
							htmlStr.push("<div class='artistName'>" + artist.name + "</div>");
							htmlStr.push("</div>");
							htmlStr.push("</div>");
						}

					}
					if (page_no && htmlStr.length) {
						x$("#ArtistList").html("bottom", htmlStr.join(""));
						//x$("#RightResultList").html("bottom",htmlString.join(""));
						var scrollapi = $("#artistView .ViewContent").data("scrollable");
						scrollapi.seekTo(scrollapi.getIndex());

					}
					else if ( !page_no || page_no == 0) {
						//Fisrt time data init
						$("#ArtistList").html(htmlStr.join(""));
						//add EventListener
						$("#artistView .ViewContent").scrollable({
							disabled:".disabled",
							vertical:true,
							next:"#artistView .top_arrow",
							prev:"#artistView .bot_arrow" });

						var scrollapi = $("#artistView .ViewContent").data("scrollable");
						scrollapi.seekTo(0);
						scrollapi.onSeek(function() {
							if ((scrollapi.getIndex() + 1) == scrollapi.getItems().length) {
								var page_no = scrollapi.getIndex() + 1;
								_this.getArtistList(function() {
									//add
								}, parseInt(page_no / 2) + 1, 8 * 2);
							}
						});
					}

					//add event for new  data
					$("#ArtistList .artistItems_up").unbind("mouseup").bind("mouseup", function() {
						var artistId = parseInt($(this).attr("artistId"));
						var songerName = $($(this).find(".artistName")).html();
						Tracking.BtnClick("歌手" + songerName + "按钮");
						//x$(this).removeClass("artistItems_up");
						//x$(this).addClass("artistItems_down");

						_this.currentArtistId = artistId;
						_this.hide();
						Controler.transfer(new ArtistInfoView(artistId));
					});

					data = null;
					delete data;
				}
				typeof func == "function" && func();
			}, type, page_no, page_size);
		};
	};
}());
