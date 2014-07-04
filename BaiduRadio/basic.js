/*
 * JavaScript file
 */   
var Now = function() {
	var d = new Date(), h, m, s;
	d.getHours() < 10 ? h = "0" + d.getHours() : h = d.getHours();
	d.getMinutes() < 10 ? m = "0" + d.getMinutes() : m = d.getMinutes();
	d.getSeconds() < 10 ? s = "0" + d.getSeconds() : s = d.getSeconds();
	var t = "[" + h + ":" + m + ":" + s + "]";
	return t;
};

function log(info) {
	info && $("#infoBoard").html(Now() + " " + info + "</br>" + $("#infoBoard").html());
}

function DebugAlert(info) {
	var tar = $("#debugAlert");
	tar.html(info);
	tar.css({
		"display":"block" });
	/*
	 * setTimeout(function() {
	 * 
	 * tar.css({ "display":"none" }); }, 6000);
	 */
};

window.onerror = function(msg, url, line) {
	// DebugAlert("ERROR="+msg+" </br> URL="+url+"</br>Line="+line);
};

log("V0218 基本界面测试");

var rotaryEnabled = Rotary.enabled;

var btnControls = {
	nextBtnEnabled:false,
	favoriteBtnEnabled:false,
	playBtnEnabled:false,
};

var stretworkTimeout = "亲，您的网速不太给力";

var strNetworkError = "亲，您当前的网络不可用，请检查网络设置";

// 页面加载时运行 -
function init() {

	gm.system.init();

	// 注册旋钮事件
	helper.info.watchRotaryControl();

	// 注册back事件
	helper.info.watchButtons();

	if (CCR.Config.closeBtnEnabled) {

		$("#closeBtn").removeClass("hidden");
	}

	// 程序退出时执行
	helper.system.setShutdown(function() {

		CCR.Favorites.save();

		CCR.Customes.save();

		CCR.Player.stop();
	});

	// 检测网络
	helper.comm.watchNetworkConnectivity(function(connected) {
		if (connected) {
			$(document).trigger('connection-restored');
		}
		else {
			$(document).trigger('connection-lost');
		}
	});
}

function getVehicleData() {
	gm.info.getVehicleData(function(data) {

		data = JSON.stringify(data);

		var opts = {};

		opts.isPrivate = false;

		gm.io.writeFile(function() {
			// log("write success");
		}, function() {
			// log("write failure");

		}, "VehicleData.txt", data, opts);

	}, function() {
		log("getVehicleData failure ");
	});
}

function getVehicleConfiguration() {

	gm.info.getVehicleConfiguration(function(data) {

		data = JSON.stringify(data);

		var opts = {};
		opts.isPrivate = false;

		gm.io.writeFile(function() {
			// log("write success");
		}, function() {
			// log("write failure");

		}, "VehicleConfiguration.txt", data, opts);

	}, function() {
		log("getVehicleConfiguration failure");
	});
}

$(function() {

	var Workspace = Backbone.Router.extend({

		initialize:function() {

			/*
			 * ---------------集合,模型，视图对象初始化开始----------------------
			 * --------------------------------------------------------
			 */

			// 目录列表
			CCR.Catalogs = new CCR.Collections.Catalogs();

			// 频道列表
			CCR.Channels = new CCR.Collections.Channels();

			// 个性化
			CCR.Customes = new CCR.Collections.Customes();
			CCR.Customes.fetch();

			// 收藏夹
			CCR.Favorites = new CCR.Collections.Favorites();

			// 读取用户已收藏的歌曲
			CCR.Favorites.fetch();

			// 记录各状态
			CCR.Flags = new CCR.Models.Flags();

			// 当前目录
			CCR.Catalog = new CCR.Models.Catalog();

			// 频道信息
			CCR.Channel = new CCR.Models.Channel();

			// 频道的基本信息
			CCR.ChannelBasic = new CCR.Models.Channel();

			// 歌曲信息
			CCR.Song = new CCR.Models.Song();

			// 歌词信息
			CCR.Lrc = new CCR.Models.Lrc();

			// 播放器 - 模型
			CCR.Player = new CCR.Models.Player();

			// 频道列表 -视图
			CCR.CatalogView = new CCR.Views.CatalogView({
				collection:CCR.Channels });

			// 歌曲信息列表 - 视图
			CCR.SongView = new CCR.Views.SongView();

			// 歌词显示 - 视图
			CCR.LrcView = new CCR.Views.LrcView();

			/*
			 * --------------------------------------------------------
			 * ---------------集合,模型，视图对象初始化结束----------------------
			 * ---------------事件绑定 - 开始-------------------------------
			 * --------------------------------------------------------
			 */

			// 事件绑定 - 左箭头
			$(".btn").on("mousedown", function() {

				$(this).addClass("selected").on("mouseup mouseleave", function() {

					$(this).removeClass("selected");

				});
			});
			// 左箭头 - 触摸屏事件
			$("#leftArrowBtn").on("mouseup", function() {

				var i = CCR.Flags.get("focus_channel_i");

				CCR.CatalogView.renderChannel(--i);

				// Rotary.init($("#radioListBar .playing"), 0);
				
				$(this).removeClass("selected");

			}).on("mousedown",function(){
				
				$(this).addClass("selected");
			});

			// 右箭头 - 触摸屏事件
			$("#rightArrowBtn").on("mouseup", function() {

				var i = CCR.Flags.get("focus_channel_i");

				CCR.CatalogView.renderChannel(++i, "next");
				
				$(this).removeClass("selected");

				// Rotary.init($("#radioListBar .playing"), 0);

			}).off("mousedown").on("mousedown",function(){				
				
				
				$(this).addClass("selected");
			});;

			// 事件绑定 - 暂停 ||播放
			$("#playBtn").on("rotarySelect", function() {
				var self = this;

				if ($(this).hasClass("disabled")) {
					return;
				}

				$(self).addClass("selected");

				setTimeout(function() {

					$(self).removeClass("selected");

					CCR.Router.showPlayer(2);

					CCR.Player.pause(); // {播放-暂停} 控制

				}, 100);

				// CCR.Router.showPlayer(this);

			}).on("click", function() {

				if ($(this).hasClass("disabled")) {
					return;
				}

				CCR.Player.pause(); // {播放-暂停} 控制

			});

			// 事件绑定 - 播放下一首
			$("#nextSongBtn").on("rotarySelect", function() {

				var self = this;

				if ($(this).hasClass("disabled")) {
					return;
				}

				$(self).addClass("selected");

				setTimeout(function() {

					$(self).removeClass("selected");

					var song_i = CCR.Player.get('song_i') || 0;

					CCR.Router.songDetail(++song_i); // 下一首

				}, 100);

				CCR.Router.showPlayer(3);

				$(this).addClass("disabled");

				setTimeout(function() {

					$(self).removeClass("disabled");

				}, 2000);

			}).on("mouseup", function() {

				var self = this;
				var song_i = CCR.Player.get('song_i') || 0;

				if ($(this).hasClass("disabled")) {
					return;
				}

				// CCR.Router.hideAll();

				$(this).addClass("disabled");

				setTimeout(function() {// 限制点击次数

					$(self).removeClass("disabled");

				}, 2000);

				CCR.Router.songDetail(++song_i);

			});

			// 事件绑定 - 添加收藏
			$("#favouriveBtn").on("mouseup rotarySelect", function() {

				var songid = CCR.Song.get("songid");

				if ($(this).hasClass("disabled")) {
					return;
				}

				var favs = CCR.Favorites.where({
					songid:songid });

				if (favs.length > 0) {

					CCR.Favorites.remove(favs[0]);

					showPopup("歌曲已从红心频道移除", "message");

					CCR.Router.enableFavorite();
				}
				else {
					var timeStamp = 0;
					if (CCR.Favorites.length != 0) {
						timeStamp = CCR.Favorites.models[0].get("timeStamp") + 1;
					}

					CCR.Favorites.add(new CCR.Models.Song({
						songid:songid,
						timeStamp:timeStamp }));

					showPopup("歌曲已添加到红心频道", "message");

					CCR.Router.disableFavorite();
				}

			});

			// 事件绑定 - 关闭程序 - 退出(close button)
			$("#closeBtn").on("rotarySelect", function() {

				var self = $(this);
				self.addClass("selected");

				setTimeout(function() {

					self.removeClass("selected");

					$(document).trigger('exit-confirm');

				});
			}).on("mouseup", function() {

				$(document).trigger('exit-confirm');

				// gm.system.closeApp();

			});

			// 事件绑定 - 退出(弹出退出对话)
			$(document).on("back-confirm", function() {

				if ( !CCR.CatalogView.hidden) {
					var index = CCR.CatalogView.listDiv.index($("#radioListBar .playing"));

					if (index != CCR.Flags.get("playing_channel_i")) {

						Rotary.setIndex(CCR.Flags.get("playing_channel_i"));

						CCR.CatalogView.renderChannel(CCR.Flags.get("playing_channel_i"));

						// Rotary.init($("#radioListBar .playing"), 0);
					}
					else {
						$(document).trigger('exit-confirm');
					}
				}
				else {
					$(document).trigger('exit-confirm');
				}
			});

			$(document).on("exit-confirm", function() {

				showPopup("需要退出吗?", "confirm");

				Rotary.start_popup_control($("#confirm .btn"), 0);

			});

			// 事件绑定 - 退出(yes button)
			$("#confirm .yesBtn").on("click", function() {

				hidePopup();

				gm.system.closeApp(function() {
				});

				Rotary.end_popup_control();

			}).on("rotarySelect", function() {

				var self = $(this);

				self.addClass("selected");

				setTimeout(function() {

					hidePopup();

					self.removeClass("selected");

					Rotary.end_popup_control();

					sgm.system.closeApp(function() {
					});

				}, 100);
			});

			// 重试
			$("#retry .cancelBtn").on("mouseup", function() {
				hidePopup();

				Rotary.end_popup_control();

			}).on("rotarySelect", function() {

				var self = $(this);

				self.addClass("selected");

				setTimeout(function() {

					self.removeClass("selected");

					hidePopup();

				}, 100);

				Rotary.end_popup_control();

			});

			// 
			$("#retry .yesBtn").on("click rotarySelect", function() {

				var self = $(this);

				self.addClass("selected");

				setTimeout(function() {

					self.removeClass("selected");

					helper.comm.getNetworkConnectivity(function(status) {

						if (status) {
							CCR.Router.songDetail(CCR.Player.get("song_i"));
						}
					});

					/*
					 * if (helper.comm.getLastNetworkStatus()) { }
					 */

				}, 100);

				Rotary.end_popup_control();

			});
			
			
			$("#load .closeLoadBtn").on("mouseup",function(){
				
				hidePopup("load");
			});

			$("#error .yesBtn").on("click rotarySelect", function() {

				var self = $(this);

				self.addClass("selected");
				setTimeout(function() {

					self.removeClass("selected");

					hidePopup();

				}, 100);

				Rotary.end_popup_control();

			});

			// 事件绑定 - 退出(cancel button)
			$("#cancelBtn").on("mouseup", function() {

				hidePopup("confirm");

				Rotary.end_popup_control();

			}).on("rotarySelect", function() {

				var self = $(this);

				self.addClass("selected");

				setTimeout(function() {

					self.removeClass("selected");

					Rotary.end_popup_control();

					hidePopup("confirm");

				}, 100);

			});

			// 判断当前网络 - 网络已经重新连接
			$(document).on("connection-restored", function() {

				hidePopup();

				// $("#retry .yesBtn").trigger("click");

				// $(document).trigger('connection-restored');

				// showPopup("亲，您的网络已恢复正常", "message", 1000);

				$("#player .btn").removeClass("disabled");

				var mediaStatus = helper.media.getStatus();

				if ( !CCR.Flags.get("channel_is_ready")) {
					CCR.Router.showDefault();
				}
				else if (mediaStatus == "stopped" || mediaStatus == "error" || mediaStatus == "connecting") {
					CCR.Router.songDetail(CCR.Player.get("song_i"));
				}

				Rotary.end_popup_control();
			});

			// 判断当前网络 - 网络已断开
			$(document).on("connection-lost", function() {

				if ($('#loading').hasClass('hidden')) {
					showPopup("亲，您的网络不太给力", "error");
				}

				// Rotary.start_popup_control($("#error .yesBtn"), 0);

			});
		},

		/*
		 * -------------------------------------------------------
		 * ------------------事件绑定 - 结束---------------------------
		 * -----------------routes绑定及函数定义-----------------------
		 * -------------------------------------------------------
		 */
		routes:{ // 路由信息
			"":"showDefault", // 默认显示
			"favorites":"favorites", // 红心频道(收藏夹)
			"channel/:id":"channelDetail", // 切换频道
			"song/:id":"songDetail", // 切换歌曲
		},

		// 默认显示内容
		showDefault:function() {
			CCR.Catalogs.ready(function() { // success

				hideFirst();

				CCR.Flags.set({
					channel_is_ready:true });

				// 获取第一组目录信息
				CCR.Catalog = CCR.Catalogs.first();

				// 获取频道列表
				var channellist = CCR.Catalog.get('channellist');

				// 添加红心频道
				channellist.push({
					channelid:"0",
					channel:"红心频道",
					name:"红心频道",
					thumb:"assets/img/liuxing/hong_big.jpg", });

				CCR.Channels.fetch(channellist);

				// 默认频道
				var channel_i = parseInt(CCR.Channels.length / 2);

				if (parseInt(CCR.Channels.models[channel_i].get('channelid')) == 0 && //
				CCR.Favorites.length == 0) {
					channel_i++;
				}

				// 当前频道
				CCR.Channel = CCR.Channels.models[channel_i];

				CCR.Flags.set({
					playing_channel_i:channel_i,
					focus_channel_i:channel_i });

				var href = "channel/" + CCR.Channel.get("channelid");

				CCR.Router.navigate(href, {
					trigger:true });

				// 显示频道信息
				CCR.CatalogView.show();

			}, function(textStatus) {// error

				$("#loading img").addClass("hidden");

				$("#loading .error").removeClass("hidden");

				if (textStatus == "timeout") {

					$("#loading .error").html(stretworkTimeout);

					// showPopup(stretworkTimeout, "retry");
				}
				else {

					$("#loading .error").html(strNetworkError);

					// showPopup(strNetworkError, "retry");
				}

			});
		},

		// 切换频道
		channelDetail:function(id, page_no, page_size) {
			!page_no && (page_no = 0);

			!page_size && (page_size = 50);

			id = parseInt(id);

			CCR.Router.showPlayer(0);

			var custome = CCR.Customes.where({
				channelid:id });

			if (custome.length > 0) {

				var count = custome[0].get('click_count');

				custome[0].set('click_count', ++count);

			}
			else {

				var item = new CCR.Models.Custome({
					channelid:id,
					click_count:1 });

				CCR.Customes.add(item);
			}

			if (id == 0) { // 读取收藏夹里的信息

				CCR.Channel = CCR.Channels.where({
					channelid:"0" })[0];

				var song_i = 0; // 播放第一首歌曲
				CCR.Router.songDetail(song_i);
			}
			else { // 频道里信息

				// 该频道的基本信息->随机分页数组
				CCR.ChannelBasic = CCR.Channels.where({
					channelid:id.toString() })[0];

				CCR.Channel = new CCR.Models.Channel({
					channelid:id,
					page_no:page_no,
					page_size:page_size });

				CCR.Flags.set({
					playing_channel_i:CCR.Flags.get("focus_channel_i") });

				CCR.Channel.ready(function() {

					var song_i = 0; // 播放第一首歌曲
					CCR.Router.songDetail(song_i);

				}, function(textStatus) {

					$("#loading img").addClass("hidden");

					$("#loading .error").removeClass("hidden");

					if (textStatus == "timeout") {

						$("#loading .error").html(stretworkTimeout);

						showPopup(stretworkTimeout, "retry");
					}
					else {
						$("#loading .error").html(strNetworkError);

						showPopup(strNetworkError, "retry");
					}
				});

			}
		},

		// 切换歌曲
		songDetail:function(song_i) {

			var songlist = []; // 歌曲列表

			var islast = false; // 是否为最后一首

			// 当前播放下标
			var i = song_i || 0;

			var id = CCR.Channel.get("channelid");

			CCR.Router.hideAll();

			if (id == 0) { // 红心频道
				songlist = CCR.Favorites.toJSON();

				if (i >= songlist.length) {
					i = 0;
				}
			}
			else { // 其它频道
				songlist = CCR.Channel.get('songlist') || [];

				/*
				 * 当播放完歌曲列表中的最后一首时，自动更新下一页歌曲列表
				 */
				if (i >= songlist.length) {

					// 当前频道id
					var channelid = CCR.Channel.get('channelid');

					var page_no = CCR.Channel.get('page_no') || 0;

					var page_sort = CCR.ChannelBasic.get('page_sort') || [];

					if (page_no < page_sort.length) {

						CCR.Router.channelDetail(channelid, ++page_no);
						return;
					}
					else {
						CCR.Router.channelDetail(channelid, 0);
						return;
					}
				}
			}

			if (songlist.length == 0) {
				showPopup("亲，当前频道没有歌曲哦", "message");
				return;
			}

			if (islast == true) {
				showPopup("亲，已经是最后一首了哦", "message");
				return;
			}

			CCR.Router.playSong(i, songlist);
		},

		// 播放歌曲
		playSong:function(song_i, songlist) {
			// 当前播放下标
			var i = song_i || 0;

			var songid = songlist[i].songid;

			// 读取歌曲信息
			CCR.Song = new CCR.Models.Song({
				songid:songid });

			CCR.Player.set({
				song_i:i });

			CCR.Song.ready(function() {// 显示当前歌曲信息

				hideLoading(); // 隐藏loading

				CCR.SongView.show(); // 显示歌曲信息

				if (CCR.Favorites.isExist(songid)) { // 取消收藏

					CCR.Router.disableFavorite();
				}
				else { // 收藏

					CCR.Router.enableFavorite();
				}

				if ( !CCR.Song.get('songurl')) {

					return;
				}

				var urls = CCR.Song.get('songurl').url || null;

				if ( !urls) {
					return;
				}

				var file_link = urls[0].show_link;

				if ( !file_link) {
					return;
				}

				CCR.Player.play(CCR.Song.get('songurl').url[0].file_link);
				// 显示歌词
				if (CCR.Config.lrcEnabled) {
					// CCR.Router.lrcDetail(CCR.Song.get('songinfo').lrclink);
				}
			},

			function(textStatus) {

				hideLoading();

				$("#loading img").addClass("hidden");

				$("#loading .error").removeClass("hidden");

				if (textStatus == "timeout") {

					$("#loading .error").html(stretworkTimeout);

					showPopup(stretworkTimeout, "error");
				}
				else {

					$("#loading .error").html(strNetworkError);

					showPopup(strNetworkError, "error");
				}

			});
		},

		// 播放出错
		playError:function() {
			if (helper.comm.getLastNetworkStatus()) {
				showPopup("播放错误,请检查网络是否正常?", "retry");
			}
			else {
				showPopup("亲，当前网络不给力哦", "retry");
			}
		},

		// 歌词
		lrcDetail:function(url) {
			CCR.Lrc = new CCR.Models.Lrc({
				url:url });

			CCR.Lrc.ready(function(isOk) {
				if (isOk) {
					// 歌词拉取成功
					CCR.LrcView.show();

					// 歌词同步
					CCR.Router.lrcSync();
				}
				else {
					// 歌词拉取失败
				}
			});
		},

		// 歌词同步
		lrcSync:function() {
			//
			var k = -1;

			var timer = $.timer(function() {

				// 播放时间
				var mediaTime = helper.media.getPosition();

				// $("#currentSongStatus").html(mediaTime);

				// 歌词列表
				var items = CCR.Lrc.get('lineList');

				/*
				 * if ( !items) { timer.stop(); return; }
				 */

				// 循环
				for (var i = items.length - 1; i >= 0; i--) {
					if (items[i].position < mediaTime) {

						if (k != i && i > k) {

							CCR.Router.showLrc(i);
							k = i;
							break;
						}
					}
				}
			}, 1000, true);

		},

		/*
		 * ------------------------------------------------------------------------------
		 * -----------------routes结束---------------------------------------------------
		 * ------------------------------------------------------------------------------
		 * ----------------样式变换开始-----------------------------------------------------
		 * ------------------------------------------------------------------------------
		 */

		// 歌词显示
		showLrc:function(i) {

			$("#lrcPane .currentLyric").removeClass("currentLyric").addClass("normalLyric").hide();

			var current = $("#lrcPane li:eq(" + i + ")");

			current.addClass("currentLyric").removeClass("normalLyric").fadeIn(500);
		},

		//
		hideAll:function() {

			showLoading();

			CCR.Player.stop();

			CCR.SongView.hide();

			// CCR.LrcView.hide();
		},

		// 显示播放控制按钮
		// showPlayerTimer:null,
		showPlayer:function(index) {

			index = index || 0;

			$("#player").show();

			Rotary.init($("#radioListBar .playing"), index);
		},

		// 隐藏播放控制按钮
		hidePlayer:function() {
			$("#songInfo").removeClass("showup");
			$("#player").hide(500, function() {

				Rotary.init(CCR.CatalogView.listDiv, CCR.Flags.get("focus_channel_i"));

			});
		},

		// 启动收藏夹
		enableFavorite:function() {
			$("#favouriveBtn").removeClass("favoried");
		},

		// 禁止收藏夹
		disableFavorite:function() {
			$("#favouriveBtn").addClass("favoried");
		}, });

	CCR.Router = new Workspace();
	Backbone.history.start();

});
