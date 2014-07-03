(function () {
	NewAlbumShelvesView = function () {
            View.call(this, "newAlbumShelvesView");
            this.prototype = new View();
            this.prototype.constructor = NewAlbumShelvesView;
            var _this = this;
            var PageSIZE = 60;
            this.pageName="mycadillac:百度音乐:新碟上架专辑列表页面";
            this.dataInit = function (func) {
            	_this.getPlaza_recommendAlbum(function(){
            		//callback;
            		typeof func == "function"&& func();
            	},PageSIZE);
            };
            
            this.addEvent = function () {
            	$("#newAlbumShelvesView .ShelvesLists .newAlbumItem").mouseup(function(){
            		var albumName = $($(this).find(".artistName")).html();
            		Tracking.BtnClick("新碟按钮-"+albumName);
            		var albumId = $(this).attr("album_id");
            		//$("#newAlbumShelvesDetailView").removeClass("hidden");
        			Controler.transfer(new NewAlbumShelvesDetailView(albumId));
        			
//            		_this.hide();
//            		_this.getAlbumSongsList(function(){
//            			
//            		},albumId);
            		
            	});
            	
            	
            	$("#artistView .artist_relateBtn .albums").mouseup(function(){
            		_this.getArtistAlbumList(function(){
            			$("#artistView .album_list").css({"display":"block"});
            			$("#artistView .song_list").css({"display":"none"});
            			/*$("#artistView .artist_relateBtn div").removeClass("selected");
            			$(this).addClass("selected");*/
            		},_this.currentArtistId);
            	});	
            	
            	
            	
            };
            
            this.show = function () {
            	Controler.preloadLayerShow($("#newAlbumShelvesView"));
            	_this.prototype.show.call(_this);
            	if(ViewInitFlag.NewAlbumShelvesView){
            		this.dataInit(function(data){
                        _this.addEvent();
                        //_this.prototype.show.call(_this);
                        Controler.preloadLayerHide($("#newAlbumShelvesView"));
                        //alert(data.toString());
                        $("#artistView .album_songs_menu").css({"display":"none"});
                        $("#artistView .SecondClass_menu").css({"width":"522px"});
                        BufferView && (ViewInitFlag.NewAlbumShelvesView = false);
                    });
            	}else{
            		//_this.prototype.show.call(_this);
                    Controler.preloadLayerHide($("#newAlbumShelvesView"));
            	}
                
            };
            
            this.hide = function () {
            	this.prototype.hide.call(_this);
            	if(!BufferView){
            		$("#newAlbumShelvesView .ShelvesLists").html("");
            		$("#artistView .song_list").html("");
            		$("#artistView .album_list").html("");
            		$("#newAlbumShelvesDetailView .song_list").html("");
            	}
                //x$("#SearchResultList").setStyle("display", "none");
            	//ViewInitFlag.NewAlbumShelvesView = false;
            };
            
            
            //Custom function
            this.getPlaza_recommendAlbum = function(func,page_size){
            	Data.init.plaza_recommendalbum(function(data){
            		var htmlStr=new Array();
            		if(data.plaze_album_list.RM.album_list.list){
	            		for(var i in data.plaze_album_list.RM.album_list.list){
	                		var albumList = data.plaze_album_list.RM.album_list.list[i];
	                		if(i%6==0){
	                			htmlStr.push("<div>");
	                			htmlStr.push("<div album_id='"+albumList.album_id+"' artist_id='"+albumList.artist_id+"' class='newAlbumItem'>");
		                		if(albumList.pic_small){
		                			htmlStr.push("<div class='albumImg' style='background:url("+albumList.pic_small+");background-size:169px 130px'></div>");
		                				
	                			}else{
	                				htmlStr.push("<span>《</span><div class='albumTitle'>"+albumList.title+"</div><span>》</span>");
			                		htmlStr.push("<div class='songer'>"+albumList.author+"</div>");
	                			}
		                		htmlStr.push("<div class='artistName'>"+albumList.title+"</div>");
		                		htmlStr.push("</div>");
	                			if(i==data.plaze_album_list.RM.album_list.list.length-1){
	                				htmlStr.push("</div>");
	                			}
	                		}
	                		if(i%6==1 || i%6==2 || i%6==3 || i%6==4){
	                			htmlStr.push("<div album_id='"+albumList.album_id+"' artist_id='"+albumList.artist_id+"' class='newAlbumItem'>");
		                		//htmlStr.push("<div class='albumImg' style='background:url("+albumList.pic_small+");background-size:100px 70px'></div>");
	                			if(albumList.pic_small){
		                			htmlStr.push("<div class='albumImg' style='background:url("+albumList.pic_small+");background-size:169px 130px'></div>");
		                				
	                			}else{
	                				htmlStr.push("<span>《</span><div class='albumTitle'>"+albumList.title+"</div><span>》</span>");
			                		htmlStr.push("<div class='songer'>"+albumList.author+"</div>");
	                			}
	                			htmlStr.push("<div class='artistName'>"+albumList.title+"</div>");
	                			htmlStr.push("</div>");
	                			if(i==data.plaze_album_list.RM.album_list.list.length-1){
	                				htmlStr.push("</div>");
	                			}
	                		}
	                		if(i%6==5){
	                			htmlStr.push("<div album_id='"+albumList.album_id+"' artist_id='"+albumList.artist_id+"' class='newAlbumItem'>");
		                		//htmlStr.push("<div class='albumImg' style='background:url("+albumList.pic_small+");background-size:100px 70px'></div>");
	                			if(albumList.pic_small){
		                			htmlStr.push("<div class='albumImg' style='background:url("+albumList.pic_small+");background-size:169px 130px'></div>");
		                				
	                			}else{
	                				htmlStr.push("<span>《</span><div class='albumTitle'>"+albumList.title+"</div><span>》</span>");
			                		htmlStr.push("<div class='songer'>"+albumList.author+"</div>");
	                			}
	                			htmlStr.push("<div class='artistName'>"+albumList.title+"</div>");
	                			htmlStr.push("</div>");
	                			htmlStr.push("</div>");
	                		}
	            		}
	            		$("#newAlbumShelvesView .ShelvesLists").html(htmlStr.join(""));
	            		$("#newAlbumShelvesView .ViewContent").scrollable({
	                		disabled:".disabled",
	                		vertical:true,
	                		next:"#newAlbumShelvesView .top_arrow",
	                		prev:"#newAlbumShelvesView .bot_arrow"
	                	});
	            		var scrollapi = $("#newAlbumShelvesView .ViewContent").data("scrollable");
	            		scrollapi.seekTo(0);
            		}
            		typeof func=="function"&&func();
            	},page_size);
            };
			
		};
    } ());