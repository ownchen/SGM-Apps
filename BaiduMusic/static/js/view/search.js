(function() {
	SearchView = function() {
		View.call(this, "searchView");
		this.prototype = new View();
		this.prototype.constructor = SearchView;
		var _this = this;
		this.pageName = "mycadillac:百度音乐:搜索页面";
		this.dataInit = function(func) {
			//test
			var searchHistory = JSON2.parse(Storage.readFile(Storage.searchHistory));
			$(".search_result").addClass("hidden");
			$(".recommend").removeClass("hidden");
			$(".recommend").css("width", "200px");
			$(".history").removeClass("hidden");
			$('.recommendTitle').html("热门歌曲");
			_this.getHistory();
			typeof func == "function" && func();
		};
		this.addEvent = function() {

			$("#searchBtn").mouseup(function() {
				Tracking.BtnClick("搜索按钮");
				var queryStr = x$("#searchInput")[0].value.trim();
				if (queryStr != "") {
					Controler.preloadLayerShow($("#searchView"));
					_this.searchKeyword(function() {
						Controler.preloadLayerHide($("#searchView"));
					}, queryStr, 0, 8);
				}

			});
			$("#searchInput").mouseup(function() {
				$("#searchInput").attr("value", "");
			});

			$(".clearHistory").unbind("mouseup").bind("mouseup", function() {
				Tracking.BtnClick("清除历史按钮");
				var tar = $(this);
				Storage.writeFile("[]", Storage.searchHistory);
				Controler.transfer(new SearchView());
				tar.removeClass("clearHistory_down");
			});

			$(".clearHistory").unbind("mousedown").bind("mousedown", function() {
				var tar = $(this);
				tar.addClass("clearHistory_down");
			});

		};

		this.show = function() {
			_this.prototype.show.call(_this);
			this.dataInit(function(data) {
				if (ViewInitFlag.SearchView) {
					_this.addEvent();

				}
				//alert(data.toString());
			});
		};
		this.hide = function() {
			this.prototype.hide.call(this);
			if ( !BufferView) {
				$(".resultList").html("");
			}
			//x$("#SearchResultList").setStyle("display", "none");
		};

		//custom function

		this.getHistory = function() {
			var searchHistory = JSON2.parse(Storage.readFile(Storage.searchHistory));
			var historyArr = new Array();
			for ( var item in searchHistory) {
				if (item == 0) {
					historyArr.push("<li>" + searchHistory[item].title + "</li>");
				}
				else if (item <= 4) {
					historyArr.push("<li>" + searchHistory[item].title + "</li>");
				}

			}
			$(".historyList").html(historyArr.join(""));
			$(".historyList li").mouseup(function() {
				var queryStr = $(this).html();
				$("#searchInput").attr("value", queryStr);
				Controler.preloadLayerShow($("#searchView"));
				_this.searchKeyword(function() {
					Controler.preloadLayerHide($("#searchView"));
				}, queryStr, 0, 8);
			});
		};

		this.searchKeyword = function(func, queryStr, pageNo, pageSize) {
			var json = {
				title:queryStr };
			Storage.saveSearchHistory(json);
			Data.init.search_common(function(data) {
				var htmlStr = new Array();
				$(".recommendTitle").html("搜索相关歌曲共" + data.pages.total + "首");
				var no = 0;
				for ( var i in data.song_list) {
					var songList = data.song_list[i];
					no = (pageNo) * 4 + parseInt(i) + 1;
					songList.title = songList.title.replace("<em>", "");
					songList.title = songList.title.replace("</em>", "");
					if (i % 4 == 0) {
						htmlStr.push("<li>");
						htmlStr.push("<div class='song' song_id=" + songList.song_id + ">");
						htmlStr.push("<div class='songList'>");
						htmlStr.push("<div class='songDetail'>");
						htmlStr.push("<div class='songName'>" + no + "." + songList.title + "</div>");
						htmlStr.push("<div class='songer'>" + songList.author + "</div>");
						htmlStr.push("</div>");
						htmlStr.push("</div>");
						htmlStr.push("</div>");
						if (i == data.song_list.length - 1) {
							htmlStr.push("</li>");
						}
					}
					else if (i % 4 == 1 || i % 4 == 2) {
						htmlStr.push("<div class='song' song_id=" + songList.song_id + ">");
						htmlStr.push("<div class='songList'>");
						htmlStr.push("<div class='songDetail'>");
						htmlStr.push("<div class='songName'>" + no + "." + songList.title + "</div>");
						htmlStr.push("<div class='songer'>" + songList.author + "</div>");
						htmlStr.push("</div>");
						htmlStr.push("</div>");
						htmlStr.push("</div>");
						if (i == data.song_list.length - 1) {
							htmlStr.push("</li>");
						}
					}
					else if (i % 4 == 3) {
						htmlStr.push("<div class='song' song_id=" + songList.song_id + ">");
						htmlStr.push("<div class='songList'>");
						htmlStr.push("<div class='songDetail'>");
						htmlStr.push("<div class='songName'>" + no + "." + songList.title + "</div>");
						htmlStr.push("<div class='songer'>" + songList.author + "</div>");
						htmlStr.push("</div>");
						htmlStr.push("</div>");
						htmlStr.push("</div>");
						htmlStr.push("</li>");
					}
				}

				$(".search_result").removeClass("hidden");
				$(".recommend").addClass("hidden");
				$(".history").addClass("hidden");

				if (pageNo != 0) {
					x$(".resultList").html("bottom", htmlStr.join(""));
					var scrollapi = $(".resultScroller").data("scrollable");
					scrollapi.seekTo(scrollapi.getIndex());
				}
				else {
					$(".resultList").html(htmlStr.join(""));
					if (ViewInitFlag.SearchView) {
						$(".resultScroller").scrollable({
							disabled:".disabled",
							vertical:true,
							next:"#searchView .top_arrow",
							prev:"#searchView .bot_arrow", });
						var scrollapi = $(".resultScroller").data("scrollable");
						scrollapi.seekTo(0);
						scrollapi.onSeek = function() {
							if ((scrollapi.getIndex() + 1) == scrollapi.getItems().length) {
								//Add new data
								var pageSize = 4;
								var queryStr = x$("#searchInput")[0].value;
								var page_no = scrollapi.getIndex() + 1;

								_this.searchKeyword(function() {

								}, queryStr, page_no, pageSize * 2);
								//scrollapi.seekTo(scrollapi.getIndex());
							}
							;
						};
						ViewInitFlag.SearchView = false;
					}
					else {
						var scrollapi = $(".resultScroller").data("scrollable");
						scrollapi.seekTo(0);
					}

				}

				$("#searchView .song").unbind("mouseup").mouseup(function() {
					var currentSongId = $(this).attr("song_id");
					var songListObject = $(this).parent().parent().children().children(".song");
					var songList = new Array();
					//console.log("newAlbumShelvesDetail:songListObject.length="+songListObject.length);
					for (var i = 0; i < songListObject.length; i++) {
						songList.push($(songListObject[i]).attr("song_id"));
					}
					//add songList in PlayList
					PlayList.addSongList(songList);
					//change currentTag by songId
					PlayList.changeSongTagById(currentSongId);

					$("#searchView .song").removeClass("artistSongItem_down");
					//go paly view
					Controler.transfer(new PlayView());
				});

				$("#searchView .song").unbind("mousedown").mousedown(function() {
					$("#searchView .song").removeClass("artistSongItem_down");
					$(this).addClass("artistSongItem_down");
				});

				typeof func == "function" && func();
			}, queryStr, pageNo, pageSize);

		};

	};
}());
