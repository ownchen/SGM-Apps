var secondeBillboardInit = null;
var thirdBillBoardInit = null;
var BillBoardInit = false;
var ArtistType = 26;
(function() {
	BillBoardListView = function() {
		View.call(this, "billBoardView");
		this.prototype = new View();
		this.prototype.constructor = BillBoardListView;
		var _this = this;
		this.pageName = "mycadillac:百度音乐:榜单页面";
		this.currentArtistId = null;
		this.billCata = null;
		this.initFlag = false;
		this.haveMore = {};
		this.songlistscroller = null;//current songList Scroller to save
		this.dataInit = function(func) {
			if (BillBoardInit == false) {
				Data.init.billboard(function(data) {
					//BillBoardInit = true;
					var htmlStr = new Array();
					var billCataArray = new Array();
					var billCataListHtml = new Array();
					var billCataListBarHtml = new Array();
					var billSongFirstIdList = new Array();
					var billCataSongListHtml = new Array();
					if (data.bill_list) {
						//first step init the BillBoard
						for ( var i in data.bill_list) {
							var bill = data.bill_list[i];
							//
							var currentCataId = 0;
							var cataflag = true;//
							for (var b = 0; b < billCataArray.length; b++) {
								if (billCataArray[b] == data.bill_list[i].in_cata) {
									cataflag = false;//
									currentCataId = b;
								}
							}
							//if the same category 
							if (cataflag) {
								billCataArray.push(data.bill_list[i].in_cata);
								currentCataId = billCataArray.length - 1;
								billSongFirstIdList.push(data.bill_list[i].bill_id);
								billCataListHtml.push(new Array());

							}
							//put the billList content of html into BillCataArray 
							var length = billCataListHtml[currentCataId].length;
							if (bill.name.indexOf("新歌TOP") !== -1) {
								bill.name = "新歌榜";
							}
							else if (bill.name.indexOf("歌曲TOP") !== -1) {
								bill.name = "热歌榜";
							}
							else if (bill.name.indexOf("歌手TOP") !== -1) {
								bill.name = "热门歌手";
							}
							billCataListHtml[currentCataId].push("<div class='menu_content' flag='" + length + "' billid='" + bill.bill_id + "' billType='" + currentCataId + "' is_artist='" + bill.is_artist + "'" + " page=0><span>" + bill.name + "</span></div>");
							if (bill.is_artist == "1") {
								ArtistType = parseInt(bill.bill_id);
							}
						}
						//collection 3 bill in one div and the scrollable with 3 bill
						for (i in billCataListHtml) {
							billCataListBarHtml[i] = new Array();
							for (j in billCataListHtml[i]) {
								if (j % 3 == 0) {
									billCataListBarHtml[i].push("<div>");
									billCataListBarHtml[i].push(billCataListHtml[i][j]);
									if (j == (billCataListHtml[i].length - 1)) {
										billCataListBarHtml[i].push("</div>");
									}
								}
								if (j % 3 == 1) {
									billCataListBarHtml[i].push(billCataListHtml[i][j]);
									if (j == (billCataListHtml[i].length - 1)) {
										billCataListBarHtml[i].push("</div>");
									}
								}
								if (j % 3 == 2) {
									billCataListBarHtml[i].push(billCataListHtml[i][j]);
									billCataListBarHtml[i].push("</div>");
								}
							}
						}

						//show the Top bar item
						var topListBarHtml = new Array();
						for ( var i in billCataArray) {
							if (i == 0) {
								topListBarHtml.push("<div class='TopList currentTopBill' type='billboardtype' typeid='" + i + "'><span>" + billCataArray[i] + "</span></div>");
							}
							else {
								topListBarHtml.push("<div class='TopList' type='billboardtype' typeid='" + i + "'><span>" + billCataArray[i] + "</span></div>");
							}

						}
						$("#billTopBar").html(topListBarHtml.join(""));

						// show the billboard Structure
						var billBoardHtml = new Array();
						for ( var i in billCataArray) {
							billBoardHtml.push("<div class='BillBoard' id='billBoardView" + i + "'>");
							billBoardHtml.push("<div class='FirstClass_menu'>");
							billBoardHtml.push("<div class='menu_list' id='BillBoardList" + i + "'>");
							billBoardHtml.push("<div class='menu_items'></div>");
							billBoardHtml.push("</div>");
							billBoardHtml.push("<div class='menu_toparrow' id='BillboardTopArrowBtn" + i + "'></div>");
							billBoardHtml.push("<div class='menu_botarrow' id='BillboardBotArrowBtn" + i + "'></div>");
							billBoardHtml.push("</div>");
							billBoardHtml.push("<div class='SecondClass_menu'>");
							billBoardHtml.push("<div class='listPagePointContainer'></div>");
							billBoardHtml.push("<div class='song_listContainer'>");
							billBoardHtml.push("<div class='song_list'></div>");
							billBoardHtml.push("</div>");
							billBoardHtml.push("<div class='menu_arrow'>");
							billBoardHtml.push("<div class='top_arrow'></div>");
							billBoardHtml.push("<div class='bot_arrow'></div>");
							billBoardHtml.push("</div>");
							billBoardHtml.push("</div>");
							billBoardHtml.push("</div>");
						}

						$(".BillBoardLong").html(billBoardHtml.join(""));
						for ( var i in billCataArray) {
							arrowBtnEffect("#billBoardView" + i + " .top_arrow", "#billBoardView" + i + " .bot_arrow");
						}

						//add the billboard list content
						for ( var i in billCataArray) {
							$("#BillBoardList" + i + " .menu_items").html(billCataListBarHtml[i].join(""));
						}
						// add the class secondClassM_down to the first menu_content in different bill type
						// default selected second bill menu
						for ( var i in billCataArray) {
							//console.log(x$("#BillBoardList"+i+" .menu_content").length);
							$($("#BillBoardList" + i + " .menu_content")[0]).addClass("secondClassM_down");
							$($("#BillBoardList" + i + " .menu_content")[0].children[0]).addClass("current");
						}

						$(".menu_toparrow").mousedown(function() {
							$(this).addClass("mousedown");
						}).mouseup(function() {
							$(this).removeClass("mousedown");
						});
						$(".menu_botarrow").mousedown(function() {
							$(this).addClass("mousedown");
						}).mouseup(function() {
							$(this).removeClass("mousedown");
						});

						for (var i = 0; i < billCataArray.length; i++) {
							if (i == 0) {
								_this.getSecondMenuList_songList(function() {
									//callback
									typeof func == "function" && func();
								}, billSongFirstIdList[i], i);
							}
							else if (i == 1) {
								secondBillboardInit = function(func) {
									_this.getSecondMenuList_songList(function() {
										//callback
										typeof func == "function" && func();
									}, billSongFirstIdList[1], 1);
								};
							}
							else if (i == 2) {
								thirdBillboardInit = function(func) {
									_this.getSecondMenuList_songList(function() {
										//callback
										typeof func == "function" && func();
									}, billSongFirstIdList[2], 2);
								};
							}

						}
						//
						//                    		_this.songlistscroller = $("#BillBoardList0 .secondClassM_down");
						_this.billCata = billCataArray;
					}
					else {

					}
					//typeof func=="function"&&func();
				});
			}
		};
		this.addEvent = function() {

			$("#billTopBar .TopList").mouseup(function() {
				var boardName = $($(this).find("span")).html();
				Tracking.BtnClick("主榜单按钮-" + boardName);
				var typeid = $(this).attr("typeid");
				var left = 750 * typeid;
				$("#billBoardView .BillBoardLong").css({
					"left":left * -1 + "px" });
				//update the current songlistscroller
				//_this.songlistscroller = $("#BillBoardList"+typeid+" .secondClassM_down");
				for (var i = 0; i < $("#BillBoardList" + typeid + " .menu_content").length; i++) {
					if ($("#BillBoardList" + typeid + " .menu_content")[i].className.toString().match("secondClass")) {
						_this.songlistscroller = $($("#BillBoardList" + typeid + " .menu_content")[i]);
					}
				}
				//init data
				var type = $(this).attr("typeid");
				switch (type) {
					case "1":
						typeof secondBillboardInit == "function" && (function() {
							//preload layer
							Controler.preloadLayerShow($($(".SecondClass_menu")[1]), "");
							secondBillboardInit(function() {
								secondBillboardInit = null;
								Controler.preloadLayerHide($($(".SecondClass_menu")[1]));
							});
						})();
					break;
					case "2":
						typeof thirdBillboardInit == "function" && (function() {
							Controler.preloadLayerShow($($(".SecondClass_menu")[2]), "");
							thirdBillboardInit(function() {
								thirdBillboardInit = null;
								Controler.preloadLayerHide($($(".SecondClass_menu")[2]));
							});
						})();
					break;
				}
				//x$("#BillBoardList"+billViewId+" .menu_content")[i].className.toString().match("secondClass")
			}).mousedown(function() {
				$(".TopList").removeClass('currentTopBill');
				$(this).addClass('currentTopBill');
			});

			//for(var i=0 ;i<x$(".BillBoard .menu_content").length ;i++){
			$(".BillBoard .menu_content").mouseup(function() {
				var boardName = $($(this).find("span")).html();
				Tracking.BtnClick("次榜单按钮-" + boardName);
				//add the mouseuped object to songlistscroller
				_this.songlistscroller = $(this);
				//reset the page attr = 0
				_this.songlistscroller.attr("page", "0");
				_this.songlistscroller.attr("hasmore", "1");

				//get the current bill info
				var type = parseInt($(this).attr("billid"));
				var typeid = parseInt($(this).attr("billType"));
				var is_artist = parseInt($(this).attr("is_artist"));

				var page = parseInt(_this.songlistscroller.attr("page")[0]);
				//var billid = parseInt(_this.songlistscroller.attr("billType")[0]);
				//if is the artist bill list : difference ui style
				var scrollapi = $("#billBoardView" + typeid + " .song_listContainer").data("scrollable");
				if (scrollapi) {
					scrollapi.seekTo(0);
				}
				var secondMenuIndex = parseInt($(".currentTopBill").attr("typeid"));
				if (is_artist == "1") {
					//console.log("BillBoard Singer View");
					Controler.preloadLayerShow($($(".SecondClass_menu")[secondMenuIndex]), "");
					_this.getSecondMenuList_artistList(function() {
						//call back
						Controler.preloadLayerHide($($(".SecondClass_menu")[secondMenuIndex]));
					}, type, typeid, 12, 0);
				}
				else {
					Controler.preloadLayerShow($($(".SecondClass_menu")[secondMenuIndex]), "");
					_this.getSecondMenuList_songList(function() {
						//callback
						Controler.preloadLayerHide($($(".SecondClass_menu")[secondMenuIndex]));
					}, type, typeid, DefaultPageSize, 0);
				}
			}).mousedown(function() {
				//get the current top bill menu
				var billViewId = parseInt($(".currentTopBill").attr("typeid")[0]);
				//Update the css style
				$("#BillBoardList" + billViewId + " .menu_content").removeClass('secondClassU_down');
				$("#BillBoardList" + billViewId + " .menu_content").removeClass('secondClassM_down');
				$("#BillBoardList" + billViewId + " .menu_content").removeClass('secondClassD_down');
				$("#BillBoardList" + billViewId + " .menu_content span").removeClass('current');
				//3 type css stye of 3 button
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

				$(this).find("span").addClass('current');
			});

			for ( var i in _this.billCata) {
				$("#BillBoardList" + i).scrollable({
					disabled:".disabled",
					vertical:true,
					next:"#BillboardBotArrowBtn" + i,
					prev:"#BillboardTopArrowBtn" + i, });
				if ($("#BillBoardList" + i + " .menu_items").children("div").length == 1) {
					$("#BillboardTopArrowBtn" + i).addClass("disabled");
					$("#BillboardBotArrowBtn" + i).addClass("disabled");
				}
				;
			}
			;

			return _this;
		};

		this.show = function(prevView) {
			Controler.preloadLayerShow($("#billBoardView"));
			_this.prototype.show.call(_this);
			if (ViewInitFlag.BillBoardListView && ( !(prevView && prevView.name == "playView"))) {
				this.dataInit(function(data) {
					_this.addEvent();
					//hide
					Controler.preloadLayerHide($("#billBoardView"));
					BufferView && (ViewInitFlag.BillBoardListView = false);
					_this.songlistscroller = $("#BillBoardList0 .secondClassM_down");
				});
			}
			else {
				Controler.preloadLayerHide($("#billBoardView"));
			}

			$("#billBoardView .SecondClass_menu").css({
				"width":"520px" });

			//add the default scoller
			_this.songlistscroller = $($(".BillBoard .menu_content")[0]);
		};
		this.hide = function(nextView) {
			this.prototype.hide.call(this);
			if ( !(nextView && nextView.name == "playView")) {
				if ( !BufferView) {
					$("#billTopBar").html("");
					$(".BillBoardLong").html("").css("left", "0px");
				}
			}
			else {
				$(".Footer").addClass("hidden");
			}

			//x$("#SearchResultList").setStyle("display", "none");
		};

		this.defaultInit = function(prevView) {
			Controler.preloadLayerShow($("#billBoardView"));
			if (ViewInitFlag.BillBoardListView) {
				this.dataInit(function(data) {
					_this.addEvent();
					//hide
					Controler.preloadLayerHide($("#billBoardView"));
					BufferView && (ViewInitFlag.BillBoardListView = false);
					_this.songlistscroller = $("#BillBoardList0 .secondClassM_down");
				});
			}
			else {
				Controler.preloadLayerHide($("#billBoardView"));
			}

			$("#billBoardView .SecondClass_menu").css({
				"width":"520px" });

			//add the default scoller
			_this.songlistscroller = $($(".BillBoard .menu_content")[0]);
		};

		/*
		 * Customer Function
		 */
		this.getSecondMenuList_songList = function(func, type, divId, page_size, page_no) {
			//get init data
			Data.init.billboard_list(function(data) {
				var htmlStr = new Array();
				if (data["billboard" + type]) {
					var billLen = data["billboard" + type].song_list.length;
					if ( !billLen && page_no == 1) {
						htmlStr.push("<div style='margin-left:40px;'>没有相关歌曲</div>");
					}
					if (data["billboard" + type].billboard.havemore) {
						_this.songlistscroller.attr("hasmore", "1");
					}
					else {
						_this.songlistscroller.attr("hasmore", "0");
					}
					for (var i = 0; i < billLen; i++) {
						var song = data["billboard" + type].song_list[i];
						if (i % 5 == 0) {
							htmlStr.push("<div>");//First div header
						}
						//if(i%5 !=4&&i%5 != 0){
						htmlStr.push("<div class='song' api='billboard_list' type='" + type + "'>");//li
						htmlStr.push("<div class='songList' song_id='" + song.song_id + "'>");
						htmlStr.push("<div class='songDetail'>");
						htmlStr.push("<div class='songName'>" + song.rank + "." + song.title + "");
						htmlStr.push("</div>");
						htmlStr.push("<div class='songer'>" + song.author + "</div>");
						htmlStr.push("</div>");
						htmlStr.push("</div>");
						htmlStr.push("</div>");
						/*if(i == data["billboard"+type].song_list.length -1){
							htmlStr.push("</div>");	//Last div end
						}*/
						//}
						if (i % 5 == 4 || (billLen - 1) == i) {
							htmlStr.push("</div>"); //Last div end
						}
					}
					if (page_no) {//if init false = init
						var billtype = parseInt(_this.songlistscroller.attr("billtype"));
						console.log(htmlStr.join(""));
						if (htmlStr.length) {
							x$("#billBoardView" + billtype + " .song_list").html("bottom", htmlStr.join(""));
							var scrollapi = $("#billBoardView" + divId + " .song_listContainer").data("scrollable");
							scrollapi.seekTo(scrollapi.getIndex());
						}
						//x$("#RightResultList").html("bottom",htmlString.join(""));

					}
					else if (page_no == 0) {
						var scrollapi = $("#billBoardView" + divId + " .song_listContainer").data("scrollable");
						scrollapi.seekTo(0);
						$("#billBoardView" + divId + " .song_list").html(htmlStr.join(""));
					}
					else {
						$("#billBoardView" + divId + " .song_list").html(htmlStr.join(""));
						//add scrollable event
						$("#billBoardView" + divId + " .song_listContainer").scrollable({
							disabled:".disabled",
							vertical:true,
							next:"#billBoardView" + divId + " .top_arrow",
							prev:"#billBoardView" + divId + " .bot_arrow" });

						//_this.songlistscroller.attr("page",page)
						//add the seek event

						//divId ==3 no need scroll paging
						if (divId != 2) {
							var scrollapi = $("#billBoardView" + divId + " .song_listContainer").data("scrollable");

							scrollapi.onSeek(function() {
								if ((scrollapi.getIndex() + 1) == scrollapi.getItems().length) {
									//Add new data
									if (_this.songlistscroller.attr("hasmore") == undefined || parseInt(_this.songlistscroller.attr("hasmore"))) {
										var type = parseInt(_this.songlistscroller.attr("billid"));
										var typeid = parseInt(_this.songlistscroller.attr("billType")[0]);
										var page_no = parseInt(_this.songlistscroller.attr("page")) + 1;
										_this.songlistscroller.attr("page", page_no);

										var is_artist = parseInt(_this.songlistscroller.attr("is_artist"));
										if (is_artist == "1") {
											_this.getSecondMenuList_artistList(function() {
											}, type, typeid, 12, page_no + 1);

										}
										else {
											_this.getSecondMenuList_songList(function() {
											}, type, typeid, DefaultPageSize, page_no + 1);

										}
									}
								}
							});
						}

					}

					$("#billBoardView" + divId + " .song").unbind("mousedown").mousedown(function() {
						$("#billBoardView" + divId + " .songList").removeClass("songList_down");
						$(this).children(".songList").addClass("songList_down");
					});

					//add extra event listener
					$("#billBoardView" + divId + " .song").unbind("mouseup").mouseup(function() {
						//ReadySong.song_id = x$(x$(this)[0].children[0]).attr("song_id");
						var currentSongId = $(this).children(".songList").attr("song_id");
						var songListObject = $(this).parent().parent().children("div").children(".song").children(".songList");
						var songList = new Array();
						//console.log("songListObject.length="+songListObject.length);
						for (var i = 0; i < songListObject.length; i++) {
							if ($(songListObject[i]).attr("song_id") && $(songListObject[i]).attr("song_id") != '') {
								songList.push($(songListObject[i]).attr("song_id"));
							}
							//console.log("songId = "+songList[i]);
						}
						//console.log(songList);
						//add songList in PlayList
						var api = $(this).attr("api");
						var type = $(this).attr("type");
						var param = {
							"type":type };
						PlayList.addSongList(songList);
						PlayList.addPlayList(api, param);
						//change currentTag by songId

						PlayList.changeSongTagById(currentSongId);
						//		                	if(currentSongId==""){
						//			                 		  PlayList.getNextSong();
						//			                 		  currentSongId = PlayList.getCurrentSong();
						//			                 	 }
						$("#billBoardView" + divId + " .songList").removeClass("songList_down");
						//go paly view
						//console.log("song_id="+ReadySong.song_id);
						Controler.transfer(new PlayView());
					});
				}
				//circle last time did the call back function
				typeof func == "function" && func();
			}, type, page_no, page_size);//fist init load 8 
		};

		//
		this.getSecondMenuList_artistList = function(func, type, divId, page_size, page_no) {
			Data.init.billboard_list(function(data) {
				var htmlStr = new Array();
				if (data["billboard" + type]) {
					for ( var i in data["billboard" + type].song_list) {
						var artist = data["billboard" + type].song_list[i];

						if (i % 6 == 0) {
							htmlStr.push("<div class='artistListContainer'>");

							if (artist.avatar_middle) {
								htmlStr.push("<div class='artistBox' style='background:url(" + artist.avatar_middle + ")no-repeat;background-size:100px auto' artist_id='" + artist.artist_id + "'>");
							}
							else {
								htmlStr.push("<div class='artistBox' artist_id='" + artist.artist_id + "'>");
								htmlStr.push("<div class='name'>" + artist.name + "</div>");
							}
							htmlStr.push("<div class='artistName'>" + artist.name + "</div>");
							if (i == data["billboard" + type].song_list.length - 1) {
								htmlStr.push("</div>");
							}
						}
						if (i % 6 == 1 || i % 6 == 2 || i % 6 == 3 || i % 6 == 4) {
							if (artist.avatar_middle) {
								htmlStr.push("<div class='artistBox' style='background:url(" + artist.avatar_middle + ")no-repeat;background-size:100px auto' artist_id='" + artist.artist_id + "'>");
							}
							else {
								htmlStr.push("<div class='artistBox' artist_id='" + artist.artist_id + "'>");
								htmlStr.push("<div class='name'>" + artist.name + "</div>");
							}
							htmlStr.push("<div class='artistName'>" + artist.name + "</div>");
							if (i == data["billboard" + type].song_list.length - 1) {
								htmlStr.push("</div>");
							}
						}
						if (i % 6 == 5) {
							if (artist.avatar_middle) {
								htmlStr.push("<div class='artistBox' style='background:url(" + artist.avatar_middle + ")no-repeat;background-size:100px auto' artist_id='" + artist.artist_id + "'>");
							}
							else {
								htmlStr.push("<div class='artistBox' artist_id='" + artist.artist_id + "'>");
								htmlStr.push("<div class='name'>" + artist.name + "</div>");
							}
							htmlStr.push("<div class='artistName'>" + artist.name + "</div>");
							htmlStr.push("</div>");
						}

						htmlStr.push("</div>");
					}
					//$("#billBoardView"+divId+" .song_list").html(htmlStr.join(""));

					if (page_no) {//if init false = init
						var billtype = parseInt(_this.songlistscroller.attr("billtype"));
						console.log(htmlStr.join(""));
						if (htmlStr.length) {
							x$("#billBoardView" + billtype + " .song_list").html("bottom", htmlStr.join(""));
							var scrollapi = $("#billBoardView" + divId + " .song_listContainer").data("scrollable");
							scrollapi.seekTo(scrollapi.getIndex());
						}
						//x$("#RightResultList").html("bottom",htmlString.join(""));

					}
					else if (page_no == 0) {
						var scrollapi = $("#billBoardView" + divId + " .song_listContainer").data("scrollable");
						scrollapi.seekTo(0);
						$("#billBoardView" + divId + " .song_list").html(htmlStr.join(""));
					}
					$("#billBoardView" + divId + " .artistBox").mouseup(function() {
						var artistId = parseInt($(this).attr("artist_id"));
						_this.currentArtistId = artistId;
						Controler.transfer(new ArtistInfoView(artistId));
					});
				}
				typeof func == "function" && func();
			}, type, page_no, page_size);
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
	};
}());
