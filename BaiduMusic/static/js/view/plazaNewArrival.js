(function () {
	PlazaNewArrivalView = function () {
            View.call(this, "newSongsExpressView");
            this.prototype = new View();
            this.prototype.constructor = PlazaNewArrivalView;
            var _this = this;
            var PageSIZE = 50;
            this.initFlag = false;
            this.pageName="mycadillac:百度音乐:新歌速递页面";
            this.dataInit = function (func) {
            	Data.init.plaza_newarrival(function(data){
            		var htmlStr=new Array();
            		var no = 1;
            		if(data.song_list){
	            		for(var i in data.song_list){
	                		var song_list = data.song_list[i];
	                		if(i%6==0){
	                			htmlStr.push("<div>");
	                			htmlStr.push("<div class='song' song_id='"+song_list.song_id+"'>");
		                		htmlStr.push("<div class='songList'>");
		                		htmlStr.push("<div class='songDetail'>");
		                		htmlStr.push("<div class='songName'>"+no+"."+song_list.title+"</div>");
		                		htmlStr.push("<div class='songer'>"+song_list.author+"</div>");
		                		htmlStr.push("</div>");
		                		htmlStr.push("</div>");
		                		htmlStr.push("</div>");
		                		no++;
	                			if(i==data.song_list.length-1){
	                				htmlStr.push("</div>");
	                			}
	                		}
	                		if(i%6==1 || i%6 ==2 || i%6==3|| i%6==4){
	                			htmlStr.push("<div class='song' song_id='"+song_list.song_id+"'>");
		                		htmlStr.push("<div class='songList'>");
		                		htmlStr.push("<div class='songDetail'>");
		                		htmlStr.push("<div class='songName'>"+no+"."+song_list.title+"</div>");
		                		htmlStr.push("<div class='songer'>"+song_list.author+"</div>");
		                		htmlStr.push("</div>");
		                		htmlStr.push("</div>");
		                		htmlStr.push("</div>");
		                		no++;
	                			if(i==data.song_list.length-1){
	                				htmlStr.push("</div>");
	                			}
	                		}
	                		if(i%6==5){
	                			htmlStr.push("<div class='song' song_id='"+song_list.song_id+"'>");
		                		htmlStr.push("<div class='songList'>");
		                		htmlStr.push("<div class='songDetail'>");
		                		htmlStr.push("<div class='songName'>"+no+"."+song_list.title+"</div>");
		                		htmlStr.push("<div class='songer'>"+song_list.author+"</div>");
		                		htmlStr.push("</div>");
		                		htmlStr.push("</div>");
		                		htmlStr.push("</div>");
		                		no++;
	                			htmlStr.push("</div>");
	                		}
	                		
	                		//
	                		if(i==0){
	                		 var _lrcLoad = function (lrc, fun) {
	                			/* if(lrc){
	                				 if (lrc.indexOf("http") == -1) {
		                				 lrc = "http://music.baidu.com"+lrc;
		                			 }
	                				 function lrcsuccess(data){
		                	            	//_lrcLoad(data,fun);
	                					 console.log(data);
		                	         }
		                	         function lrcfailure(){
		                	            	$("div.lyricsPannel ul").html("<li>NO lyrics</li>");
		                	            }
		                	         var data = gm.io.getResource(lrcsuccess,lrcfailure,lrc);
		                	         //console.log("lyruc:"+data)
	                				 ;
	                			 }*/
	                			 console.log("http://music.baidu.com"+lrc);
	                			 //var url="http://music.baidu.com/data2/lrc/32577581/32577581.lrc";
	                			 var url = "http://music.baidu.com"+lrc;
	                			 $.ajax({
	                                 url: url,
	                                 contentType:'text/html',
	                                 success: function (data) {
	                                	 //alert(data);
	                                     //_lrcLoad(data, fun);
	                                 }
	                             });
	                	        
	                	        };
	                	          
	                	        _lrcLoad(song_list.lrclink,function(){});  
	                		 };
	            		}
	            		$("#newSongsExpressView div.newsongul").html(htmlStr.join(""));
	            		$(".newSongsList").scrollable({
	            			disabled:".disabled",
	                		vertical:true,
	                		next:"#newSongsExpressView .top_arrow",
	                		prev:"#newSongsExpressView .bot_arrow"
	            		});
	            		var scrollapi = $(".newSongsList").data("scrollable");
	            		scrollapi.seekTo(0);
	            		//$("div.lyricsPannel ul").html();
            		}
            		typeof func=="function"&&func();
            	},PageSIZE);
            	
            };
            this.addEvent = function () {
            	$("#BillBoardList").scrollable({
            		disabled:".disabled",
            		vertical:true,
            		next:"#BillboardTopArrowBtn",
            		prev:"#BillboardBotArrowBtn",
            	});
            	
            	$("#BillBoardList .menu_content").mousedown(function(){
            		$("#BillBoardList .menu_content").removeClass('secondClassU_down');
            		$("#BillBoardList .menu_content").removeClass('secondClassM_down');
            		$("#BillBoardList .menu_content").removeClass('secondClassD_down');
            		
            		var type = parseInt($(this).attr("billid"));
            		$(this).addClass('secondClass_down');
            		_this.getSecondMenuList_songList(function(){
            			//callback
            		},type);
            	});
                /*
                 	x$("#searchNearbyResult_toolbar .goback").mousedown(function () {
                    Controler.goback();
                });
                */
            	$(".song").unbind("mousedown").mousedown(function(){
            		$(".song .songList").removeClass("artistSongItem_down");
        			$(this).children(".songList").addClass("artistSongItem_down");
            	});
            	
            	$(".song").unbind("mouseup").mouseup(function(){
            		var currentSongId = $(this).attr("song_id");
        			var songListObject = $(this).parent().parent().children("div").children(".song");
            		var songList = new Array();
            		//console.log("newSongsExpressView:songListObject.length="+songListObject.length);
            		for(var i=0;i<songListObject.length;i++){
            			songList.push($(songListObject[i]).attr("song_id"));
            			//console.log("songId = "+songList[i]);
            		}
            		//console.log(songList);
            		//add songList in PlayList
            		PlayList.addSongList(songList);
            		//change currentTag by songId
            		PlayList.changeSongTagById(currentSongId);
            		$(".song .songList").removeClass("artistSongItem_down");
        			//go paly view
        			Controler.transfer(new PlayView());
            	});
            	
            };
            
            this.show = function () {
            	Controler.preloadLayerShow($("#newSongsExpressView"));
            	_this.prototype.show.call(_this);
            	if(ViewInitFlag.PlazaNewArrivalView){
            		this.dataInit(function(data){
                        _this.addEvent();
                        Controler.preloadLayerHide($("#newSongsExpressView"));
                        BufferView && (ViewInitFlag.PlazaNewArrivalView = false);
                    });
            		
            	}else{
            		Controler.preloadLayerHide($("#newSongsExpressView"));
            	}
            	
                
                
                $("#billBoardView .SecondClass_menu").css({"width":"595px"});
                
            };
            this.hide = function () {
            	this.prototype.hide.call(this);
            	if(!BufferView){
            		$("#newSongsExpressView div.newsongul").html("");
            		$("#billBoardView .song_list").html("");
            	}
            	//ViewInitFlag.PlazaNewArrivalView = false;
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
        			            //lrc:"[ti:Disturbia][ar:Rihanna][al:Good   Girl 	Gone 	Bad: 	Reloaded][by:Jermen][00:00.80][00:01.25]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[00:04.79]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[00:08.57]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[00:11.79]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[00:17.35]No 	more 	gas 	in 	the 	rig[00:18.94]Can't 	even 	get 	it 	started[00:20.76]Nothing 	heard, 	nothing 	said[00:22.57]Can't 	even 	speak 	about 	it[00:24.58]All 	my 	life 	on 	my 	head[00:26.52]Don't 	want 	to 	think 	about 	it[00:28.47]Feels 	like 	I'm 	going 	insane[00:30.68]Yeah[00:32.07][00:32.40]It's 	a 	thief 	in 	the 	night[00:34.36]To 	come 	and 	grab 	you[00:36.17]It 	can 	creep 	up 	inside 	you[00:38.37]And 	consume 	you[00:40.01]A 	disease 	of 	the 	mind[00:41.98]It 	can 	control 	you[00:43.87]It's 	too 	close 	for 	comfort[00:46.47][00:47.22]Throw 	on 	your 	break 	lights[00:48.72]We're 	in 	the 	city 	of 	wonder[00:50.80]Ain't 	gonna 	play 	nice[00:52.40]Watch 	out, 	you 	might 	just 	go 	under[00:54.66]Better 	think 	twice[00:56.47]Your 	train 	of 	thought 	will 	be 	altered[00:58.66]So 	if 	you 	must 	faulter 	be 	wise[01:01.80]Your 	mind 	is 	in 	disturbia[01:04.40]It's 	like 	the 	darkness 	is 	the 	light[01:05.820]Disturbia[01:07.86]Am 	I 	scaring 	you 	tonight[01:10.22]Your 	mind 	is 	in 	disturbia[01:11.94]Ain't 	used 	to 	what 	you 	like[01:14.09]Disturbia[01:16.28]Disturbia[01:19.69]$$$ 	Jermen 	åˆ¶ä½œ[01:19.92]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[01:22.24]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[01:25.81]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[01:29.64]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[01:33.33][01:33.99]Faded 	pictures 	on 	the 	wall[01:36.47]It's 	like 	they 	talkin' 	to 	me[01:37.49]Disconnectin' 	your 	call[01:39.58]Your 	phone 	don't 	even 	ring[01:41.50]I 	gotta 	get 	out[01:42.91]Or 	figure 	this 	shit 	out[01:45.13]It's 	too 	close 	for 	comfort[01:48.59] [01:49.40]It's 	a 	thief 	in 	the 	night[01:51.26]To 	come 	and 	grab 	you[01:53.24]It 	can 	creep 	up 	inside 	you[01:55.19]And 	consume 	you[01:57.02]A 	disease 	of 	the 	mind[01:58.72]It 	can 	control 	you[02:00.68]I 	feel 	like 	a 	monster[02:03.82]  [02:04.30]Throw 	on 	your 	break 	lights[02:05.83]We're 	in 	the 	city 	of 	wonder[02:07.86]Ain't 	gonna 	play 	nice[02:09.44]Watch 	out, 	you 	might 	just 	go 	under[02:11.67]Better 	think 	twice[02:13.13]Your 	train 	of 	thought 	will 	be 	altered[02:15.32]So 	if 	you 	must 	faulter 	be 	wise[02:18.81]Your 	mind 	is 	in 	disturbia[02:21.26]It's 	like 	the 	darkness 	is 	the 	light[02:23.22]Disturbia[02:24.78]Am 	I 	scaring 	you 	tonight[02:27.02]Your 	mind 	is 	in 	disturbia[02:28.67]Ain't 	used 	to 	what 	you 	like[02:31.09]Disturbia[02:32.58]Disturbia[02:37.71][02:37.96]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[02:38.89]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[02:42.60]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[02:46.49]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[02:49.85][02:50.88]Release 	me 	from 	this 	curse[02:54.29]I'm 	trying 	to 	remain 	tame[02:56.87]But 	I'm 	struggling[02:58.12]You 	can't 	go, 	go, 	go[03:02.84]I 	think 	I'm 	going 	to 	oh, 	oh, 	oh[03:05.58][03:06.07]Throw 	on 	your 	break 	lights[03:07.17]We're 	in 	the 	city 	of 	wonder[03:09.12]Ain't 	gonna 	play 	nice[03:10.88]Watch 	out, 	you 	might 	just 	go 	under[03:13.190]Better 	think 	twice[03:14.63]Your 	train 	of 	thought 	will 	be 	altered[03:16.99]So 	if 	you 	must 	faulter 	be 	wise[03:20.73]Your 	mind 	is 	in 	disturbia[03:22.75]It's 	like 	the 	darkness 	is 	the 	light[03:24.31]Disturbia[03:25.88]Am 	I 	scaring 	you 	tonight[03:28.13]Your 	mind 	is 	in 	disturbia[03:30.04]Ain't 	used 	to 	what 	you 	like[03:32.51]Disturbia[03:34.47]Disturbia[03:38.18][03:38.74]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[03:40.25]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[03:44.04]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[03:47.94]Bum 	bum 	be-dum 	bum 	bum 	be-dum 	bum[03:53.68]"
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
            /*
             * Customer Function
             */
            //èŽ·å�–äºŒçº§è�œå�•åˆ—è¡¨ï¼Œå�³æ¦œå�•æ­Œæ›²åˆ—è¡¨
            this.getSecondMenuList_songList = function(func,type,page_size,page_no){
            	Data.init.billboard_list(function(data){
            		var htmlStr=new Array();
            		if(data["billboard"+type]){
	            		for(var i in data["billboard"+type].song_list){
	                		var song = data["billboard"+type].song_list[i];
	                		htmlStr.push("<li class='song'>");
		        				htmlStr.push("<div class='songHover hidden'>");
			        				htmlStr.push("<span class='pic'></span>");
				        				htmlStr.push("<span class='musicInfo'>");
				        					htmlStr.push("<span class='number'>"+song.rank+".</span>");
				        				htmlStr.push("<span class='songInfo'>");
					        				htmlStr.push("<div class='songName'>"+song.title+"-"+song.author+"</div>");
					        				htmlStr.push("<div class='time_bar'>");
					        				htmlStr.push("</div>");
				        				htmlStr.push("</span>");
			        				htmlStr.push("</span>");
			        				htmlStr.push("<span class='play_bar'>");
				        				htmlStr.push("<span>stop</span>");
				        				htmlStr.push("<span>Next</span>");
				        				htmlStr.push("<span>Favorite</span>");
			        				htmlStr.push("</span>");
		        				htmlStr.push("</div>");
		        				htmlStr.push("<div class='songList'>");
		        					htmlStr.push("<span class='number'>"+song.rank+".</span>");
		        					htmlStr.push("<div class='songDetail'>");
		        					htmlStr.push("<div class='songName'>"+song.title+"</div>");
		        					htmlStr.push("<div class='songer'>"+song.author+"</div>");
		        					htmlStr.push("</div>");
		        				htmlStr.push("</div>");
		        			htmlStr.push("</li>");	                		
	                	}
	            		$("#billBoardView .song_list").html(htmlStr.join(""));
            		}
            		typeof func=="function"&&func();
            	},type,page_no,page_size);
            };
        };
    } ());