(function() {
	MyCloudSongView = function() {
		View.call(this, "myCloudSong");
		this.prototype = new View();
		this.prototype.constructor = MyCloudSongView;
		var _this = this;
		this.pageName = "mycadillac:百度音乐:我的云歌曲页面";
		this.loginStatus = false;
		this.dataInit = function(func) {
			$(".backToMyMusicBtn").unbind("mouseup").bind("mouseup", function() {
				fromCloudView = true;
				Controler.transfer(new MyMusicView());
			});
			typeof func == "function" && func();
		};
		this.addEvent = function() {

		};

		this.show = function() {
			$("#myMusicBtn").addClass("current");
			$("#myCloudSong").removeClass("nobg");
			DebugLog("------>myMusic background:css" + $("#myCloudSong").css("background"));
			_this.prototype.show.call(_this);
			
			Controler.preloadLayerShow($("#myCloudSong"));
			var myMusic = new MyMusicView();
			myMusic.getCloudFavoriteSong(function() {
				Controler.preloadLayerHide($("#myCloudSong"));
				
				_this.dataInit(function(data) {
					_this.addEvent();

				});
				
				if ($("#myCloudSong .rightContent").attr("class").indexOf("hiddenv") == -1) {
					initScroll();
				}
				else {
					var interview = setInterval(function() {
						if ($("#myCloudSong .rightContent").attr("class").indexOf("hiddenv") == -1) {
							initScroll();
							clearInterval(interview);
						}
					}, 500);
				}
			}, 1, 10);
			
			function initScroll() {
				$('#CloudSongList').on('jsp-initialised', function() {
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
					trackClickSpeed:225 });
				$(".selectIcon").removeClass("hidden");
			}
		};
		this.hide = function() {
			_this.prototype.hide.call(this);
			$("#myMusicBtn").removeClass("current");
			$("#loginIframe").addClass("hidden");
			if(!BufferView){
				$("#CloudSongList").html("");
			}
		};

	};
}());
