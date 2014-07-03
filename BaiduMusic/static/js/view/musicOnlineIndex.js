var NoPlaySong = true;

(function () {
	MusicOnlineIndexView = function () {
            View.call(this, "musicOnline");
            this.prototype = new View();
            this.prototype.constructor = MusicOnlineIndexView;
            var _this = this;
            this.pageName="mycadillac:百度音乐:在线音乐首页";
            this.dataInit = function (func) {           	
            	typeof func=="function"&&func();
            };
            this.addEvent = function () {
            	$(".billBoardBtn").mousedown(function(){
            		$(this).addClass("billBoardBtn_down");
            	});
            	$(".billBoardBtn").mouseup(function(){
            		$(".billBoardBtn").removeClass("billBoardBtn_down");
            		Controler.transfer(new BillBoardListView());
            	});
            	
            	$(".artistBtn").mousedown(function(){
            		$(this).addClass("artistBtn_down");
            	});
            	$(".artistBtn").mouseup(function(){
            		$(".artistBtn").removeClass("artistBtn_down");
            		Controler.transfer(new ArtistView());
            	});
            	$(".newAlbumBtn").mousedown(function(){
            		$(this).addClass("newAlbumBtn_down");
            	});
            	$(".newAlbumBtn").mouseup(function(){
            		$(".newAlbumBtn").removeClass("newAlbumBtn_down");
            		Controler.transfer(new NewAlbumShelvesView());
            	});
            	$(".newSongBtn").mousedown(function(){
            		$(this).addClass("newSongBtn_down");
            	});
            	$(".newSongBtn").mouseup(function(){
            		$(".newSongBtn").removeClass("newSongBtn_down");
            		Controler.transfer(new PlazaNewArrivalView());
            	});
            	$(".featuredAlbumBtn").mousedown(function(){
            		$(this).addClass("featuredAblumBtn_down");
            	});
            	$(".featuredAlbumBtn").mouseup(function(){
            		$(".featuredAlbumBtn").removeClass("featuredAblumBtn_down");
            		Controler.transfer(new FeaturedAlbumsView());
            	});
            	$(".radioBtn").mousedown(function(){
            		$(this).addClass("radioBtn_down");
            	});
            	$(".radioBtn").mouseup(function(){
            		$(".radioBtn").removeClass("radioBtn_down");
            		Controler.transfer(new RadioView());
            	});
            	
            	$("#playGuidBtn").mouseup(function(){
            		//$(".Footer div").addClass("hasMusic");
    				//$(this).addClass("current");
    				NoPlaySong = false;
    				Controler.transfer(new PlayView());
            	 });
            };
            
            this.show = function () {
            	_this.prototype.show.call(_this);
            	$("#onLineMusicGuidBtn").addClass("current");
            	if(ViewInitFlag.MusicOnlineIndexView){
            		this.dataInit(function(data){
                        _this.addEvent();
                        ViewInitFlag.MusicOnlineIndexView = false;
                    });
            		
            	}
            };
            this.hide = function () {
            	this.prototype.hide.call(this);
            	$("#onLineMusicGuidBtn").removeClass("current");
                //x$("#SearchResultList").setStyle("display", "none");
            };
        };
    } ());