var CIRCLE = "circle";
var NOCIRCLE = "nocircle";
var PlayList = {
	songList:new Array(),
	currentTag:0,
	playtype:NOCIRCLE,
	api:"",
	param:{
		type:"",
	},
	addPlayList:function(api,param){
		PlayList.api = api;
		PlayList.param = param;
	},
	addSongList:function(songIdArray){
		PlayList.clearSongList();
		if(songIdArray.length>0){
			PlayList.songList = new Array();
			PlayList.songList = songIdArray;
			PlayList.currentTag = 0;//default value
		}
		
	},
	addMoreSongList:function(songIdArray){
		for(i in songIdArray){
			PlayList.songList.push(songIdArray[i]);
		}
	},
	addMoreSong:function(songId){
		PlayList.songList.push(songId);
	},
	
	clearSongList:function(){
		PlayList.api = "";
		PlayList.songList = new Array();
	},
	
	changeSongTagById:function(id){
		for(i in PlayList.songList){
			if(parseInt(PlayList.songList[i])==parseInt(id)){
				PlayList.currentTag = parseInt(i);
			}
		}
	},
	getCurrentSong:function(){
		return PlayList.songList[PlayList.currentTag];
	},
	getSongByTag:function(tag){
		if(undefined != PlayList.songList[tag]){
			return PlayList.songList[tag];
		}
	},
	getPrevSongId:function(){
		var tag = PlayList.currentTag;
		if(tag-1>=0){
			return PlayList.songList[tag-1];
		}else{
			return null;
		}
	},
	getNextSongId:function(){
		var tag = PlayList.currentTag;
		if((tag+1)<=(PlayList.songList.length-1)){
			return PlayList.songList[tag+1];
		}else{
			return null;
		}
	},
	getNextSong:function(){
		var tag = PlayList.currentTag;
		var circle = true;
		if((tag+1)<=(PlayList.songList.length-2)){
			PlayList.currentTag = tag+1;
			if(PlayList.songList[PlayList.currentTag]!=""){
				return PlayList.songList[PlayList.currentTag];
			}else{
				return PlayList.getNextSong();
			}
		}else if((tag+1)<=(PlayList.songList.length-1)){
			DebugLog("request next 50 song");
			//get the page_no&page_size
			
			switch (PlayList.api){
				case "billboard_list":
					var songLength = PlayList.songList.length;
					//get 10 song in one time
					var pageSize = 50;
//					debugger;
					var pageNumber = parseInt(songLength/pageSize)+1;
					//if call back song is null
					var type = PlayList.param.type;
					
					getBillboardList(type,pageNumber,pageSize,1);
					break;
					function getBillboardList(type,pageNumber,pageSize,time){
						if(time!=1){
							pageNumber = pageNumber+1; 
						}
						Data.init.billboard_list(function(data){
		            		if(data["billboard"+type].song_list){
		            			var billLen = data["billboard"+type].song_list.length;
		            			if(billLen==0){
		            				circle = true;
		            			}else{
		            				var newSongList = new Array();
				            		for(var i=0; i<billLen; i++){
				                		var song = data["billboard"+type].song_list[i];
				                		var id = song.song_id;
				                		var exist = false;
				                		for(var j in PlayList.songList){
				                			if(PlayList.songList[j]==id){
				                				exist = true;
				                			}
				                		}
				                		if(!exist){
				                			newSongList.push(id);
				                		}
				            		}
				            		if(newSongList.length>0){
				            			console.log("new Song list="+newSongList);
				            			PlayList.addMoreSongList(newSongList);
//				            			PlayList.currentTag = tag+1;
//				            			if(PlayList.songList[PlayList.currentTag]!=""){
//				            				PlayList.songList[PlayList.currentTag];
//				            			}else{
//				            				PlayList.getNextSong();
//				            			}
//					            		(new PlayView).getCurrentSongInfo(function(){
//					   						 Controler.preloadLayerHide($("#playView"));
//					   					});
				            			//$("#playNextBtn").click();
				            			var nextSongId = PlayList.getNextSongId();
				            			if(nextSongId!=null){
				            				Data.init.song_info(function(data){
				            					var container = $(".musicNext");
				            					container.find(".songTitle").html(data.songinfo.author);
				            	     			 if(data.songinfo.pic_small){
				            	     				container.find(".baiduMusicLogoSmall").css(
				            	     						{"background":"url("+data.songinfo.pic_small+") no-repeat",
				            	     						"background-size":"100%",
				            	     				});
				            	     			 }else{
				            	     				container.find(".baiduMusicLogoSmall").css(
				            	     						{"background":"url('static/images/radioViewMiddleLogo.png')",
				            	     						"background-size":"auto",
				            	     				});
				            	     			 }
				            	     			 container.find(".playerNameSmall").html(data.songinfo.title);
				            	    			$("#playNextBtn").removeClass("hidden");
				            	    			$(".musicNext").removeClass("hiddenv");
				                			},nextSongId);
				            			};
				            			console.log("new Song list="+PlayList.songList);
				            		}else{
				            			if(time!=1||time!=2){
				            				DebugLog("request next 10 song time="+(time+1));
				            				getBillboardList(type,pageNumber,pageSize,time+1);
				            			}
//				            			else{
//				            				circle = true;
//					            			circlePlay(circle);
//				            			}
				            			
				            		}
		            			}
		            		}
						},type,pageNumber,pageSize);
//						return null;
					}
					break;
				case "artist_songlist":
					var songLength = PlayList.songList.length;
					//get 10 song in one time
					var pageSize = 10;
					debugger;
					var pageNumber = parseInt(songLength/pageSize)+1;
					var artistid = PlayList.param.artistid;
					getArtistSongList(artistid,pageNumber,pageSize,1);
					
					function getArtistSongList(artistid,pageNumber,pageSize,time){
						if(time!=1){
							pageNumber = pageNumber+1; 
						}
						Data.init.artist_songlist(function(data){
		            		if(data.songlist){
		            			var songLen = data.songlist.length;
		            			if(songLen==0){
		            				circle = true;
		            			}else{
		            				var newSongList = new Array();
		            				for(var i in data.songlist){
				                		var song = data.songlist[i];
				                		var id = song.song_id;
				                		var exist = false;
				                		for(var j in PlayList.songList){
				                			if(PlayList.songList[j]==id){
				                				exist = true;
				                			}
				                		}
				                		if(!exist){
				                			newSongList.push(id);
				                		}
				            		}
				            		if(newSongList.length>0){
				            			console.log("new Song list="+newSongList);
				            			PlayList.addMoreSongList(newSongList);
//				            			PlayList.currentTag = tag+1;
//				            			(new PlayView).getCurrentSongInfo(function(){
//					   						 Controler.preloadLayerHide($("#playView"));
//					   					});
				            			
				            			var nextSongId = PlayList.getNextSongId();
				            			if(nextSongId!=null){
				            				Data.init.song_info(function(data){
				            					var container = $(".musicNext");
				            					container.find(".songTitle").html(data.songinfo.author);
				            	     			 if(data.songinfo.pic_small){
				            	     				container.find(".baiduMusicLogoSmall").css(
				            	     						{"background":"url("+data.songinfo.pic_small+") no-repeat",
				            	     						"background-size":"100%",
				            	     				});
				            	     			 }else{
				            	     				container.find(".baiduMusicLogoSmall").css(
				            	     						{"background":"url('static/images/radioViewMiddleLogo.png')",
				            	     						"background-size":"auto",
				            	     				});
				            	     			 }
				            	     			 container.find(".playerNameSmall").html(data.songinfo.title);
				            	    			$("#playNextBtn").removeClass("hidden");
				            	    			$(".musicNext").removeClass("hiddenv");
				                			},nextSongId);
				            			};
				            			
				            			console.log("new Song list="+PlayList.songList);
				            		}else{
				            			if(time!=1||time!=2){
				            				getArtistSongList(artistid,pageNumber,pageSize,time+1);
				            			}
//				            			else{
//				            				circle = true;
//					            			circlePlay(circle);
//				            			}
				            			
				            		}
		            			}
		            		}
						},artistid,pageNumber,pageSize);
					}
					break;
					
				case "cloud_songlist":
					var artistid = PlayList.param.artistid;
					getCloudSongList(pageNumber,pageSize,1);
					
					function getCloudSongList(pageNumber,pageSize,time){
						if(time!=1){
							pageNumber = pageNumber+1; 
						}
						Data.init.cloud_getFavoriteSong(function(data){
		            		if(data["result"]){
		            			var songLen = data["result"].length;
		            			if(songLen==0){
		            				circle = true;
		            			}else{
		            				var newSongList = new Array();
		            				for(var i in data["result"]){
				                		var song = data["result"][i];
				                		var id = song.song_id;
				                		var exist = false;
				                		for(var j in PlayList.songList){
				                			if(PlayList.songList[j]==id){
				                				exist = true;
				                			}
				                		}
				                		if(!exist){
				                			newSongList.push(id);
				                		}
				            		}
				            		if(newSongList.length>0){
				            			console.log("new Song list="+newSongList);
				            			PlayList.addMoreSongList(newSongList);
//				            			PlayList.currentTag = tag+1;
//				            			(new PlayView).getCurrentSongInfo(function(){
//					   						 Controler.preloadLayerHide($("#playView"));
//					   					});
				            			
				            			var nextSongId = PlayList.getNextSongId();
				            			if(nextSongId!=null){
				            				Data.init.song_info(function(data){
				            					var container = $(".musicNext");
				            					container.find(".songTitle").html(data.songinfo.author);
				            	     			 if(data.songinfo.pic_small){
				            	     				container.find(".baiduMusicLogoSmall").css(
				            	     						{"background":"url("+data.songinfo.pic_small+") no-repeat",
				            	     						"background-size":"100%",
				            	     				});
				            	     			 }else{
				            	     				container.find(".baiduMusicLogoSmall").css(
				            	     						{"background":"url('static/images/radioViewMiddleLogo.png')",
				            	     						"background-size":"auto",
				            	     				});
				            	     			 }
				            	     			 container.find(".playerNameSmall").html(data.songinfo.title);
				            	    			$("#playNextBtn").removeClass("hidden");
				            	    			$(".musicNext").removeClass("hiddenv");
				                			},nextSongId);
				            			};
				            			
				            			console.log("new Song list="+PlayList.songList);
				            		}else{
				            			if(time!=1||time!=2){
				            				getCloudSongList(artistid,pageNumber,pageSize,time+1);
				            			}
//				            			else{
//				            				circle = true;
//					            			circlePlay(circle);
//				            			}
				            			
				            		}
		            			}
		            		}
						},pageNumber,pageSize);
					}
					break;
				//default:circle = true;return circlePlay(circle);
			}
			
			
			PlayList.currentTag = tag+1;
			if(PlayList.songList[PlayList.currentTag]!=""){
				return PlayList.songList[PlayList.currentTag];
			}else{
				return PlayList.getNextSong();
			}
		}else{

//			function circlePlay(circle){
//			//Circle play
//				if(circle){
//					if(PlayList.playtype==CIRCLE){
//						if(PlayList.songList.length!=0){
//							tag = 0;
//							PlayList.currentTag = tag;
//							return PlayList.songList[PlayList.currentTag];
//						}
//					}
//				}
//			}
//			circle = true;return circlePlay(circle);
			
			return null;
		}
	},
	getPrevSong:function(){
		var tag = PlayList.currentTag;
		if((tag-1)>=0){
			PlayList.currentTag = tag-1;
			if(PlayList.songList[PlayList.currentTag]!=""){
				return PlayList.songList[PlayList.currentTag];
			}else{
				return PlayList.getPrevSong();
			}
			
		}else{
			if(PlayList.playtype==CIRCLE){
				tag = PlayList.songList.length-1;
				PlayList.currentTag = tag;
				return PlayList.songList[PlayList.currentTag];
			}else{
				return null;
			}
		}
	},
	replay:function(){
		var tag = PlayList.currentTag;
		return PlayList.songList[PlayList.currentTag];
	},
};

var RadioPlayList = {
		songList:new Array(),
		currentTag:0,
		playtype:CIRCLE,
		channelid:0,
		currentPage:0,
		totalPage:0,
		pageSize:10,
		addSongList:function(songIdArray){
			RadioPlayList.clearSongList();
			if(songIdArray.length>0){
				RadioPlayList.songList = new Array();
				RadioPlayList.songList = songIdArray;
				RadioPlayList.currentTag = 0;//default value
			}
			
		},
		updateChannel:function(channelid,currentPage,totalPage){
			this.channelid = channelid;
			this.currentPage = currentPage;
			this.totalPage = totalPage;;
		},
		nextPage:function(callback){
			var self = this;
			if(this.currentPage<this.totalPage){
				this.currentPage +=1;
			}else{
				this.currentPage = 0;
			}
			
			Data.init.radio_songList(function(data){
    			var songListObj = data.channelinfo.songlist;
        		var songList = new Array();
        		for(var i = 0;i<songListObj.length;i++){
        			songList.push(songListObj[i].songid);
        			//console.log("songId = "+songList[i]);
        		}
        		self.addSongList(songList);
        		//console.log(RadioPlayList.songList);
        		//play the music
        		(new RadioView).getCurrentSongInfo(function(){
        			Controler.preloadLayerHide($(".radioMiddleView"));
        		});
        		RadioPlayList.songList[RadioPlayList.currentTag];
    		},self.channelid,self.currentPage,self.pageSize);
			typeof callback ==="function" && callback();
		},
		addMoreSong:function(songId){
			RadioPlayList.songList.push(songId);
		},
		
		clearSongList:function(){
			RadioPlayList.songList = new Array();
		},
		
		changeSongTagById:function(id){
			for(i in RadioPlayList.songList){
				if(parseInt(RadioPlayList.songList[i])==parseInt(id)){
					RadioPlayList.currentTag = parseInt(i);
				}
			}
		},
		
		getCurrentSong:function(){
			return RadioPlayList.songList[RadioPlayList.currentTag];
		},
		
		getSongByTag:function(tag){
			if(undefined != RadioPlayList.songList[tag]){
				return RadioPlayList.songList[tag];
			}
		},
		
		getNextSong:function(){
			var tag = RadioPlayList.currentTag;
			if((tag+1)<=(RadioPlayList.songList.length-1)){
				RadioPlayList.currentTag = tag+1;
				return RadioPlayList.songList[RadioPlayList.currentTag];
			}else{
//				if(RadioPlayList.playtype==CIRCLE){
//					if(RadioPlayList.songList.length!=0){
//						tag = 0;
//						RadioPlayList.currentTag = tag;
//						return RadioPlayList.songList[RadioPlayList.currentTag];
//					}
//				}
				return this.nextPage();
			}
		},
	};