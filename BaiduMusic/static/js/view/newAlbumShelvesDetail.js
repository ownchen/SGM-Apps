//newAlbumShelvesDetailViewæ­Œæ‰‹ æ¯�å¼ ä¸“è¾‘çš„æ­Œæ›²åˆ—è¡¨View
(function () {
	NewAlbumShelvesDetailView = function (albumId) {
          View.call(this, "newAlbumShelvesDetailView");
          this.prototype = new View();
          this.prototype.constructor = NewAlbumShelvesDetailView;
          var _this = this;
          this.pageName="mycadillac:百度音乐:新碟上架专辑详细页面";
          this.AlbumId = albumId;
          this.dataInit = function(func){
        	  _this.getAlbumSongsList(func,_this.AlbumId);
        	  //typeof func =="function" && func();
          };
          this.addEvent = function () {

          	$("#artistView .artist_relateBtn .songs").mouseup(function(){
          		_this.getArtistSongsList(function(){
          			$("#artistView .album_list").css({"display":"none"});
          			$("#artistView .album_songs_menu").css({"display":"none"});
          			$("#artistView >.SecondClass_menu").css({"display":"block"});
          			$("#artistView .song_list").css({"display":"block"});
          			/*$("#artistView .artist_relateBtn div").removeClass("selected");
          			$(this).addClass("selected");*/
          		},_this.currentArtistId);
          	});

          	$("#newAlbumShelvesDetailView .playAllBtn").unbind("mouseup").mouseup(function(){
      			var songListObject = $("#newAlbumShelvesDetailView .albumSongsList").children("div").children("div").children(".song");
          		var songList = new Array();
          		console.log("newAlbumShelvesDetail:songListObject.length="+songListObject.length);
          		for(var i=0;i<songListObject.length;i++){
          			
          			songList.push($(songListObject[i]).attr("song_id"));
          			console.log("songId = "+songList[i]);
          		}
          		console.log(songList);
          		//add songList in PlayList
          		PlayList.addSongList(songList);
          		
          		Controler.transfer(new PlayView());
          	});
          };
          this.show = function () {
        	  Controler.preloadLayerShow($("#newAlbumShelvesDetailView"));
        	  _this.prototype.show.call(_this);
        	  
              this.dataInit(function(data){
                  _this.addEvent();
                 
                  Controler.preloadLayerHide($("#newAlbumShelvesDetailView"));
              });
        	  if(!BufferView){
        		  
        	  }
          };
          
          this.hide = function () {
          	this.prototype.hide.call(_this);
          	if(!BufferView){
          		
          	}
          };
          
          this.getNewAlbumRelatedInfo = function(func,artist_id){
          	Data.init.artist_info(function(data){
	            	if(data){
		            	$("#artistView .FirstClass_relatedContent div.pic").css("background","url('"+data.avatar_small+"')");
			            $("#artistView .artist_info div.name").html(data.name);
			            $("#artistView .artist_info span.bithday").html(data.birth);
			            $("#artistView .artist_info span.region").html(data.country);
			            $("#artistView .artist_relateBtn span.songsTotal").html(data.songs_total);
			            $("#artistView .artist_relateBtn span.ablumsTotal").html(data.albums_total);
	            	}
	            	typeof func=="function"&&func();
          	},artist_id);
          };
          
          this.getArtistSongsList = function(func,artistid){
          	Data.init.artist_songlist(function(data){
          	var htmlStr=new Array();
          	if(data.songlist){
          		var no = 1;
	            	for(var i in data.songlist){
	                var songs = data.songlist[i];
	                htmlStr.push("<li class='song'>");
	                	htmlStr.push("<div class='songList' song_id='"+song.song_id+"'>");
		                	htmlStr.push("<div class='songDetail'>");
		                		htmlStr.push("<div class='songName'>"+song.rank+"."+song.title+"</div>");
		        				htmlStr.push("<div class='songer'>"+songs.author+"</div>");
		        			htmlStr.push("</div>");
		        		htmlStr.push("</div>");
		        	htmlStr.push("</li>");
		        	no++;
	            	}
	            	$("#artistView .song_list").html(htmlStr.join(""));
          	}
          	typeof func=="function"&&func();
          	},artistid);
          };
          
          this.getArtistAlbumList = function(func,artistid){
          	Data.init.artist_albumlist(function(data){
          		var htmlStr=new Array();
              	if(data.albumlist){
              		var no = 1;
  	            	for(var i in data.albumlist){
  	                var albums = data.albumlist[i];
  	                
  	                htmlStr.push("<div class='song'>");
  			        htmlStr.push("<span class='albumPic'></span>");
  				    htmlStr.push("<div class='songList'>");
  				    htmlStr.push("<div class='songDetail'>");
  				    htmlStr.push("<div class='songName'>"+albums.title+"</div>");
  				    htmlStr.push("<div class='songer'>"+albums.author+"</div>");
  					htmlStr.push("</div>");
  		        	htmlStr.push("</div>");
  		        	htmlStr.push("<span class='stretchArrow' albumId='"+albums.album_id+"'>></span>");
  		        	htmlStr.push("</div>");
  		        	no++;
  	            	}
  	            	$("#artistView .album_list").html(htmlStr.join(""));
              	}
              	_this.addArtistalbumListEvent();
              	typeof func=="function"&&func();
          	},artistid);
          };
          this.addArtistalbumListEvent=function(){
          	//Ã¤Â¸â€°Ã§ÂºÂ§Ã¨ï¿½Å“Ã¥ï¿½â€¢Ã¤Âºâ€¹Ã¤Â»Â¶
	        	$("#artistView .album_list .stretchArrow").mouseup(function(){
	        		var albumId = parseInt($(this).attr("albumId"));
	        		_this.getAlbumSongsList(function(){
	        			$("#artistView >.SecondClass_menu").css({"display":"none"});
	        			$("#artistView .album_list").css({"display":"none"});
	        			$("#artistView .song_list").css({"display":"none"});
	        			$("#artistView .album_songs_menu").css({"display":"block"});
	        			/*$("#artistView .artist_relateBtn div").removeClass("selected");
	        			$(this).addClass("selected");*/
	        		},albumId);
	        	});	
          };
          this.getAlbumSongsList = function(func,albumid){
          	Data.init.album_info(function(data){
          		var htmlStr = new Array();
          		if(data.albumInfo){
          			$("#newAlbumShelvesDetailView .albumImg").css("background","url('"+data.albumInfo.pic_small+"')");
          			$("#newAlbumShelvesDetailView .albumName").html(data.albumInfo.title);
          			$("#newAlbumShelvesDetailView .songer").html(data.albumInfo.author);
          			$("#newAlbumShelvesDetailView .albumTime").html(data.albumInfo.publishtime);
          		}
          		if(data.songlist){
          			var no=1;
          			
          			for(var i in data.songlist){
          			/*if(i>5){break;}*/
  	                var songs = data.songlist[i];
  	                if(i%6==0){
  	                	htmlStr.push("<div>");
  	                	 htmlStr.push("<div class='song' song_id = '"+songs.song_id+"'>");
  	    		        	/*htmlStr.push("<div class='songHover hidden'>");
  	    			        htmlStr.push("<span class='pic'></span>");
  	    				        				htmlStr.push("<span class='musicInfo'>");
  	    				        					htmlStr.push("<span class='number'>"+no+".</span>");
  	    				        				htmlStr.push("<span class='songInfo'>");
  	    					        				htmlStr.push("<div class='songName'>"+songs.title+"-"+songs.author+"</div>");
  	    					        				htmlStr.push("<div class='time_bar'>");
  	    					        				htmlStr.push("</div>");
  	    				        				htmlStr.push("</span>");
  	    			        				htmlStr.push("</span>");
  	    			        				htmlStr.push("<span class='play_bar'>");
  	    				        				htmlStr.push("<span>stop</span>");
  	    				        				htmlStr.push("<span>Next</span>");
  	    				        				htmlStr.push("<span>Favorite</span>");
  	    			        				htmlStr.push("</span>");
  	    		        				htmlStr.push("</div>");*/
  	    		        				htmlStr.push("<div class='songList'>");
  	    		        					htmlStr.push("<div class='songDetail'>");
  	    		        					htmlStr.push("<div class='songName'>"+no+"."+songs.title+"</div>");
  	    		        					htmlStr.push("<div class='songer'>"+songs.author+"</div>");
  	    		        					htmlStr.push("</div>");
  	    		        				htmlStr.push("</div>");
  	    		        			htmlStr.push("</div>");
  	    		        			no++;
  	                	if(i==data.songlist.length-1){
  	                		htmlStr.push("</div>");
  	                	}
  	                }
  	                if(i%6==1 ||i%6==2 || i%6==3|| i%6==4){
  	                	 htmlStr.push("<div class='song' song_id = '"+songs.song_id+"'>");
  	    		        				htmlStr.push("<div class='songList'>");
  	    		        					htmlStr.push("<div class='songDetail'>");
  	    		        					htmlStr.push("<div class='songName'>"+no+"."+songs.title+"</div>");
  	    		        					htmlStr.push("<div class='songer'>"+songs.author+"</div>");
  	    		        					htmlStr.push("</div>");
  	    		        				htmlStr.push("</div>");
  	    		        			htmlStr.push("</div>");
  	    		        			no++;
  	                	if(i==data.songlist.length-1){
  	                		htmlStr.push("</div>");
  	                	}
  	                	
  	                }
  	                if(i%6==5){
  	                	 htmlStr.push("<div class='song' song_id = '"+songs.song_id+"'>");
		        				htmlStr.push("<div class='songList'>");
		        					htmlStr.push("<div class='songDetail'>");
		        					htmlStr.push("<div class='songName'>"+no+"."+songs.title+"</div>");
		        					htmlStr.push("<div class='songer'>"+songs.author+"</div>");
		        					htmlStr.push("</div>");
		        				htmlStr.push("</div>");
		        			htmlStr.push("</div>");
		        			no++;
  	                	htmlStr.push("</div>");
  	                }
  	               
  	            	}
          		}
          		$("#newAlbumShelvesDetailView .song_list").html(htmlStr.join(""));
          		
          		if($("#newAlbumShelvesDetailView .song_list").children("div").length==1){
          			$("#newAlbumShelvesDetailView .top_arrow").addClass("disabled");
          			$("#newAlbumShelvesDetailView .bot_arrow").addClass("disabled");
          		}else{
          			$("#newAlbumShelvesDetailView .top_arrow").removeClass("disabled");
          			//$("#newAlbumShelvesDetailView .bot_arrow").removeClass("disabled");
          		}
          		
          		$("#newAlbumShelvesDetailView .albumSongsList").scrollable({
          			disabled:".disabled",
              		vertical:true,
              		next:"#newAlbumShelvesDetailView .top_arrow",
              		prev:"#newAlbumShelvesDetailView .bot_arrow"
          		});
          		var scrollapi = $("#newAlbumShelvesDetailView .albumSongsList").data("scrollable");
          		scrollapi.seekTo(0);
          		$("#newAlbumShelvesDetailView .song").unbind("mousedown").mousedown(function(){
          			$("#newAlbumShelvesDetailView .song").removeClass("artistSongItem_down");
          			$(this).addClass("artistSongItem_down");
          		});
          		
          		$("#newAlbumShelvesDetailView .song").unbind("mouseup").mouseup(function(){
              		var currentSongId = $(this).attr("song_id");
          			var songListObject = $(this).parent().parent().children("div").children(".song");
              		var songList = new Array();
              		console.log("newAlbumShelvesDetail:songListObject.length="+songListObject.length);
              		for(var i=0;i<songListObject.length;i++){
              			
              			songList.push($(songListObject[i]).attr("song_id"));
              			console.log("songId = "+songList[i]);
              		}
              		console.log(songList);
              		//add songList in PlayList
              		PlayList.addSongList(songList);
              		//change currentTag by songId
              		PlayList.changeSongTagById(currentSongId);
              		
              		$("#newAlbumShelvesDetailView .song").removeClass("artistSongItem_down");
          			//go paly view
          			Controler.transfer(new PlayView());
              	});
          		
          	/*	$("#newAlbumShelvesDetailView .album_songs_menu .stretchArrow").click(function(){
              		_this.getArtistAlbumList(function(){
              			$("#artistView .song_list").css({"display":"none"});
              			$("#artistView .album_songs_menu").css({"display":"none"});
              			$("#artistView >.SecondClass_menu").css({"display":"block"});
              			$("#artistView .album_list").css({"display":"block"});
              			$("#artistView .artist_relateBtn div").removeClass("selected");
              			$(this).addClass("selected");
              		},_this.currentArtistId);
              	});	*/
              	typeof func=="function"&&func();
          	},albumid);
          }; 
          
          this.getSongInfo = function(func,song_id){
          	Data.init.song_info(function(data){
          		console.log(data);
          		PlayingSong = data;
          		//Put the value to PlayingSong 
          		
          		
          		/*$("#jPlayer1").jPlayer({
      			    ready: function (event) {
      			        $(this).jPlayer("setMedia", {
      			            mp3: data.songurl.url[0].file_link,
      			            title: data.songinfo.title,
      			            //lrc:"[ti:Disturbia][ar:Rihanna][al:Good   Girl 	Gone 	Bad: 	Reloaded][by:Jermen][00:00.80][00:01.25]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[00:04.79]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[00:08.57]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[00:11.79]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[00:17.35]No 	more 	gas 	in 	the 	rig[00:18.94]Can't 	even 	get 	it 	started[00:20.76]Nothing 	heard, 	nothing 	said[00:22.57]Can't 	even 	speak 	about 	it[00:24.58]All 	my 	life 	on 	my 	head[00:26.52]Don't 	want 	to 	think 	about 	it[00:28.47]Feels 	like 	I'm 	going 	insane[00:30.68]Yeah[00:32.07][00:32.40]It's 	a 	thief 	in 	the 	night[00:34.36]To 	come 	and 	grab 	you[00:36.17]It 	can 	creep 	up 	inside 	you[00:38.37]And 	consume 	you[00:40.01]A 	disease 	of 	the 	mind[00:41.98]It 	can 	control 	you[00:43.87]It's 	too 	close 	for 	comfort[00:46.47][00:47.22]Throw 	on 	your 	break 	lights[00:48.72]We're 	in 	the 	city 	of 	wonder[00:50.80]Ain't 	gonna 	play 	nice[00:52.40]Watch 	out, 	you 	might 	just 	go 	under[00:54.66]Better 	think 	twice[00:56.47]Your 	train 	of 	thought 	will 	be 	altered[00:58.66]So 	if 	you 	must 	faulter 	be 	wise[01:01.80]Your 	mind 	is 	in 	disturbia[01:04.40]It's 	like 	the 	darkness 	is 	the 	light[01:05.820]Disturbia[01:07.86]Am 	I 	scaring 	you 	tonight[01:10.22]Your 	mind 	is 	in 	disturbia[01:11.94]Ain't 	used 	to 	what 	you 	like[01:14.09]Disturbia[01:16.28]Disturbia[01:19.69]$$$ 	Jermen 	Ã¥Ë†Â¶Ã¤Â½Å“[01:19.92]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[01:22.24]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[01:25.81]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[01:29.64]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[01:33.33][01:33.99]Faded 	pictures 	on 	the 	wall[01:36.47]It's 	like 	they 	talkin' 	to 	me[01:37.49]Disconnectin' 	your 	call[01:39.58]Your 	phone 	don't 	even 	ring[01:41.50]I 	gotta 	get 	out[01:42.91]Or 	figure 	this 	shit 	out[01:45.13]It's 	too 	close 	for 	comfort[01:48.59] [01:49.40]It's 	a 	thief 	in 	the 	night[01:51.26]To 	come 	and 	grab 	you[01:53.24]It 	can 	creep 	up 	inside 	you[01:55.19]And 	consume 	you[01:57.02]A 	disease 	of 	the 	mind[01:58.72]It 	can 	control 	you[02:00.68]I 	feel 	like 	a 	monster[02:03.82]  [02:04.30]Throw 	on 	your 	break 	lights[02:05.83]We're 	in 	the 	city 	of 	wonder[02:07.86]Ain't 	gonna 	play 	nice[02:09.44]Watch 	out, 	you 	might 	just 	go 	under[02:11.67]Better 	think 	twice[02:13.13]Your 	train 	of 	thought 	will 	be 	altered[02:15.32]So 	if 	you 	must 	faulter 	be 	wise[02:18.81]Your 	mind 	is 	in 	disturbia[02:21.26]It's 	like 	the 	darkness 	is 	the 	light[02:23.22]Disturbia[02:24.78]Am 	I 	scaring 	you 	tonight[02:27.02]Your 	mind 	is 	in 	disturbia[02:28.67]Ain't 	used 	to 	what 	you 	like[02:31.09]Disturbia[02:32.58]Disturbia[02:37.71][02:37.96]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[02:38.89]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[02:42.60]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[02:46.49]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[02:49.85][02:50.88]Release 	me 	from 	this 	curse[02:54.29]I'm 	trying 	to 	remain 	tame[02:56.87]But 	I'm 	struggling[02:58.12]You 	can't 	go, 	go, 	go[03:02.84]I 	think 	I'm 	going 	to 	oh, 	oh, 	oh[03:05.58][03:06.07]Throw 	on 	your 	break 	lights[03:07.17]We're 	in 	the 	city 	of 	wonder[03:09.12]Ain't 	gonna 	play 	nice[03:10.88]Watch 	out, 	you 	might 	just 	go 	under[03:13.190]Better 	think 	twice[03:14.63]Your 	train 	of 	thought 	will 	be 	altered[03:16.99]So 	if 	you 	must 	faulter 	be 	wise[03:20.73]Your 	mind 	is 	in 	disturbia[03:22.75]It's 	like 	the 	darkness 	is 	the 	light[03:24.31]Disturbia[03:25.88]Am 	I 	scaring 	you 	tonight[03:28.13]Your 	mind 	is 	in 	disturbia[03:30.04]Ain't 	used 	to 	what 	you 	like[03:32.51]Disturbia[03:34.47]Disturbia[03:38.18][03:38.74]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[03:40.25]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[03:44.04]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[03:47.94]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[03:53.68]"
      			        }).jPlayer("play");
      			    },
      			    //cssSelectorAncestor: "#audio1",
      			    supplied: "mp3",
      			    wmode: "window",
      			    //lrcid: "#Div3"
      			});
      			*/
          		typeof func=="function"&&func();  
          	},song_id);
          	          	
          }; 
          
		};
  } ());