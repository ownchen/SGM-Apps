/**
 * 
 */
var api_base_url = "https://openapi.baidu.com/rest/2.0/music/";

var BaiduMusicAPI = {
        //æ¦œå�•_#1
        //èŽ·å�–æ¦œå�•åˆ—è¡¨
        Billboard:function(){
           return api_base_url+"billboard/catalog?";
        },
        
        //æ¦œå�•_#2
        //èŽ·å�–æ¦œå�•æ­Œæ›²åˆ—è¡¨
        Billboard_list : function(type,page_no,page_size){
            //?type=1,2&page_size=10&page_no=1
            //typeå¿…é€‰
        	//page_size =20;
            var param = new Array();
            param.push("?");
            type?null:type = "1,2";
            param.push("type="+type);
            page_size?null:page_size=DefaultPageSize;
            param.push("&page_size="+page_size);
            page_no?null:page_no=1;
            param.push("&page_no="+page_no);
            param.push("&");
            return api_base_url+"billboard/billlist"+param.join("");
        },
        
        
        //1.2çƒ­é—¨èµ„æº�API
        //èŽ·å�–TOP100ä¿¡æ�¯ï¼ˆéŸ³ä¹�äººï¼Œæ­Œæ›²ï¼‰
        Hot_list:function(type,page_size,page_no){
            //?page_no=1&page_size=10&type=artist"
            //type=artist/songå¿…é€‰
        	var param = new Array();
        	param.push("?");
        	type?null:type="artist";//é»˜è®¤ä¸ºéŸ³ä¹�äºº;
        	param.push("type="+type);
        	if(page_size){
        		param.push("&page_size="+page_size);
        	}
        	if(page_no){
        		param.push("&page_no="+page_no);
        	}
        	param.push("&");
            return api_base_url+"hot/hotlist"+param.join("");
        }, 
        
        
        //1.3éŸ³ä¹�äººAPI
        Artist_list:function(page_no,page_size,order,area){
            //?page_no=1&page_size=10&order=1&area=1
            //order 1çƒ­åº¦ ï¼ˆå�¯é€‰ï¼Œé»˜è®¤æŒ‰ç…§è‡ªç„¶é¡ºåº�ï¼‰
            //area 1å†…åœ°,2æ¸¯å�°,3æ¬§ç¾Ž,4æ—¥éŸ©,5å…¶ä»– (å�¯é€‰ï¼Œé»˜è®¤ä¸ºæ‰€æœ‰)
        	var param = new Array();
        	param.push("?");
        	page_no?null:page_no=1;
        	param.push("page_no="+page_no);
        	page_size?null:page_size =DefaultPageSize;
        	param.push("&page_size="+page_size);
        	if(order){
        		param.push("&order="+order);
        	}
        	if(area){
        		param.push("&area="+area);
        	}
        	if(param.length>1){
        		param.push("&");
        	}
            return api_base_url+"artist/artistlist"+param.join("");
        },
        
        
        //èŽ·å�–éŸ³ä¹�äººåŸºæœ¬ä¿¡æ�¯
        Artist_info:function(artistid){
            //?artistid=1
            //artistid è‰ºäººid å¿…é€‰
        	var param = new Array();
            param.push("?");
            artistid?null:artistid = "1";
            param.push("artistid="+artistid);
            param.push("&");
            return api_base_url+"artist/info"+param.join("");
        },
        
        
        //èŽ·å�–éŸ³ä¹�äººä¸“è¾‘åˆ—è¡¨
        Artist_albumlist:function(artistid,page_no,page_size){
            //?page_no=1&page_size=10&artistid=1
            //artistid è‰ºäººid å¿…é€‰
        	var param = new Array();
            param.push("?");
            artistid?null:artistid="1";
            param.push("&artistid="+artistid);
            page_no?null:page_no=1;
        	param.push("&page_no="+page_no);
        	page_size?null:page_size =60;
        	param.push("&page_size="+page_size);
            param.push("&");
            return api_base_url+"artist/albumlist"+param.join("");
        },
        
       
        //èŽ·å�–éŸ³ä¹�äººæ­Œæ›²åˆ—è¡¨
        Artist_songlist:function(artistid,page_no,page_size){
            //?page_no=1&page_size=10&artistid=1
            //artist è‰ºäººid å¿…é€‰
        	var param = new Array();
            param.push("?");
            artistid?null:artistid="1";
            param.push("artistid="+artistid);
            page_no?null:page_no=1;
        	param.push("&page_no="+page_no);
        	page_size?null:page_size =DefaultPageSize;
        	param.push("&page_size="+page_size);
        	param.push("&");
            return api_base_url+"artist/songlist"+param.join("");
        },
        
        //1.4ä¸“è¾‘API
        //èŽ·å�–ä¸“è¾‘åˆ—è¡¨
        Album_list:function(page_size,page_no,area,order,is_recommend){
            //?page_size=10&page_no=1&area=1&order=1
            //area 1å†…åœ°,2æ¸¯å�°,3æ¬§ç¾Ž,4æ—¥éŸ©,5å…¶ä»– ï¼ˆå�¯é€‰ï¼Œé»˜è®¤æ‰€æœ‰ï¼‰
            //order 1è¡¨ç¤ºçƒ­åº¦ ï¼ˆé»˜è®¤ä¸ºè‡ªç„¶æŽ’åº�ï¼‰
            //is_recommend æ˜¯å�¦ä¸ºæŽ¨è��æ­Œæ›² ï¼ˆå�¯é€‰ï¼Œé»˜è®¤ä¸ºæ²¡æœ‰ï¼‰
        	var param = new Array();
            param.push("?");
            if(page_size){
            	param.push("page_size="+page_size);
            }
            if(page_no){
            	param.push("&page_no="+page_no);
            }
            if(area){
            	param.push("&area="+area);
            }
            if(order){
            	param.push("&order="+order);
            }
            if(is_recommend){
            	param.push("&is_recommend="+is_recommend);
            }
            if(param.length>1){
            	param.push("&");
            }
            return api_base_url+"album/albumlist"+param.join("");
        },
        
        
        //èŽ·å¾—ä¸“è¾‘èŽ·å�–é¡µ
        Album_info:function(albumid){
          //?albumid=60892
            //albumid ä¸“è¾‘idï¼ˆå¿…é€‰ï¼‰
        	var param = new Array();
            param.push("?");
            albumid?null:albumid="60892";
            param.push("albumid="+albumid);
            param.push("&");
            return api_base_url+"album/info"+param.join("");
        },
        
        
        //èŽ·å¾—æ­Œæ›²è¯¦æƒ…
        Song_info:function(songid){
          //?songid= 204231
            //songid æ­Œæ›²id(å¿…é€‰)
        	var param = new Array();
            param.push("?");
            songid?null:songid="204231";
            param.push("songid="+songid);
            param.push("&");
            return api_base_url+"song/info"+param.join("");
        },
        
        
        //æ­Œæ›²é€‰é“¾
        Song_link:function(songid,bitrate){
          //?songid=204231&bitrate=128
            //songid æ­Œæ›²id(å¿…é€‰)
            //bitrate æ­Œæ›²ç �çŽ‡(å¿…é€‰)
        	var param = new Array();
            param.push("?");
            songid?null:songid="204231";
            param.push("songid="+songid);
            bitrate?null:bitrate="128";
            param.push("&bitrate="+bitrate);
            param.push("&");
            return api_base_url+"song/link"+param.join("");
        },
        
        
        //æ­Œæ›²éŸ³é¢‘æŒ‡çº¹
        Song_afp:function(version,frontmd5,backmd5,format,filesize,audio){
          //version ç‰ˆæœ¬å�·ï¼ˆå¿…é¡»ï¼‰
            //frontmd5 éŸ³é¢‘æ–‡ä»¶çš„md5å‰�32ä½�ï¼ˆå¿…é€‰ï¼‰
            //backmd5 éŸ³é¢‘æ–‡ä»¶çš„md5å�Ž32ä½�ï¼ˆå¿…é€‰ï¼‰
            //format éŸ³é¢‘æ ¼å¼�ï¼ˆå¿…é€‰ï¼‰
            //filesize éŸ³é¢‘æ•°æ�®å¤§å°�ï¼ˆbyteï¼‰ï¼ˆå¿…é€‰ï¼‰
            //audio éŸ³é¢‘æ•°æ�®ï¼ˆå¿…é¡»ï¼‰
        	var param = new Array();
        	param.push("");
        	//
            return api_base_url+"song/afp";
        },
        
        
        //1.6ç”µå�°API
        //å…¬å…±ç”µå�°åˆ—è¡¨
        Radio_catalog:function(){
            return api_base_url+"radio/catalog"+"?";
        },
        
        //å…¬å…±ç”µå�°åˆ—è¡¨
        Radio_songlist:function(channelid,page_no,page_size){
          //?page_no=1&page_size=50&channelid=1 (page_sizeè®¾å®šä¸º50ä¸ºä½³)
            //channelid å…¬å…±ç”µå�°idï¼ˆå¿…é€‰ï¼‰
        	var param = new Array();
        	param.push("?");
        	channelid?null:channelid="1";
        	param.push("channelid="+channelid);
        	if(page_no){
        		param.push("&page_no="+page_no);
        	}else{
        		param.push("&page_no="+1);
        	}
        	if(page_size){
        		param.push("&page_size="+page_size);
        	}else{
        		param.push("&page_size="+DefaultPageSize);
        	}
        	param.push("&");
            return api_base_url+"radio/songlist"+param.join("");
        },
        
        
        //ç§�äººç”µå�°
        Radio_serv:function(username){
          //?username=jack
            //username ç”¨æˆ·å��
        	var param = new Array();
        	param.push("?");
        	if(username){
        		param.push("username="+username);
        	}
        	if(param.length>1){
        		param.push("&");
        	}
            return api_base_url+"radio/serv"+param.join("");
        },
        
        
        //éŸ³ä¹�äººç”µå�°
        Radio_artistsonglist:function(artist_id,page_no,page_size){
        	//?artist_id=1&page_no=1&page_size=2
            //artist_id è‰ºäººid
            //artist_name è‰ºäººå§“å��ï¼Œå¦‚æžœæ²¡æœ‰artist_idï¼Œæ ¹æ�®artist_nameåŒ¹é…�
        	var param = new Array();
        	param.push("?");
        	if(artist_id){
        		param.push("artist_id="+artist_id);
        	}
        	if(page_no){
        		param.push("&page_no="+page_no);
        	}
        	if(page_size){
        		param.push("&page_size="+page_size);
        	}
        	if(param.length>1){
        		param.push("&");
        	}
            api_base_url+"radio/artistsonglist"+param.join("");
        },
        
        
        //1.7æ£€ç´¢
        //æ£€ç´¢
        Search_common:function(query,page_no,page_size){
          //?page_no=1&page_size=10&query=ladygaga
            //query éœ€è¦�æŸ¥è¯¢çš„query,ladygagaï¼ˆå¿…é€‰ï¼‰
        	var param = new Array();
        	param.push("?");
        	query?null:query ="ladygaga";
        	param.push("query="+query);
        	if(page_no){
        		param.push("&page_no="+page_no);
        	}
        	if(page_size){
        		param.push("&page_size="+page_size);
        	}
        	param.push("&");
            return api_base_url+"search/common"+param.join("");
        },
        
        
        //Suggestion,æ�œç´¢å»ºè®®
        Search_suggestion:function(query){
          //?query=åˆ˜å¾·å�Ž
            //query éœ€è¦�æŸ¥è¯¢çš„queryï¼ˆå¿…é€‰
        	var param = new Array();
        	param.push("?");
        	query?null:query ="";
        	param.push("query="+query);
        	param.push("&");
            return api_base_url+"search/suggestion"+param.join("");
        },
        
        //æ­Œæ›²æ­Œè¯�æŸ¥æ‰¾
        Search_lyrics:function(query){
          //?query=å†·å†·çš„å†°é›¨
            //query éœ€è¦�æŸ¥è¯¢çš„query,æ­Œæ›²ä¸­çš„ä¸€éƒ¨åˆ†ï¼ˆå¿…é€‰ï¼‰
        	var param = new Array();
        	param.push("?");
        	query?null:query ="";
        	param.push("query="+query);
        	param.push("&");
            return api_base_url+"search/lyrics"+param.join("");
        },
        
        
        //å›¾ç‰‡æŸ¥æ‰¾ï¼ˆæ­Œæ›²æ­Œæ‰‹å��æ‰¾æ­Œæ‰‹å›¾ç‰‡ï¼Œæ ¹æ�®æ­Œæ›²ï¼Œä¸“è¾‘å��æ‰¾ä¸“è¾‘å›¾ç‰‡ï¼‰
        Search_photo:function(query,type,height,width){
          //?query=åˆ˜å¾·å�Ž&type=0
            //query éœ€è¦�æŸ¥è¯¢çš„queryï¼ˆå¿…é€‰ï¼‰
            //type åˆ¶å®šæ�œç´¢çš„ç±»åž‹ï¼ˆ0 æ­Œæ‰‹ï¼Œ1 ä¸“è¾‘ï¼‰å¦‚æžœæ˜¯1ï¼Œquery=ä¸“è¾‘å��$$æ­Œæ‰‹ï¼›å¦‚æžœæ˜¯0ï¼Œquery=æ­Œæ‰‹ï¼ˆå¿…é€‰ï¼‰
            //height å›¾ç‰‡é«˜åº¦
            //width å›¾ç‰‡å®½åº¦
        	var param = new Array();
        	param.push("?");
        	query?null:query ="åˆ˜å¾·å�Ž";
        	param.push("query="+query);
        	if(type){
        		param.push("&type="+type);
        	}
        	if(height){
        		param.push("&height="+height);
        	}
        	if(width){
        		param.push("&width="+width);
        	}
        	param.push("&");
            return api_base_url+"search/photo"+param.join("");
        },
        
        
        //1.8åª’ä½“æ•°æ�®
        //æ–°ç¢Ÿä¸Šæž¶
        Plaza_recommendalbum:function(page_size){
          //?page_size=10
            //page_size æ¯�é¡µä¸ªæ•°ï¼ˆå¿…é€‰ï¼‰
        	var param = new Array();
        	param.push("?");
        	page_size?null:page_size ="18";
        	param.push("page_size="+page_size);
        	param.push("&");
            return api_base_url+"plaza/recommendalbum"+param.join("");
        },
        
        
        //æ­Œæ›²é€Ÿé€’
        Plaza_newarrival:function(page_size){
          //?page_size=10
            //page_size æ¯�ä¸ªé¡µæ•°ï¼ˆå¿…é€‰ï¼‰
        	var param = new Array();
        	param.push("?");
        	page_size?null:page_size ="10";
        	param.push("page_size="+page_size);
        	param.push("&");
            return api_base_url+"plaza/newarrival"+param.join("");
        },
        
        
        //å®˜æ–¹è‡ªé€‰è¾‘åˆ—è¡¨
        Officiadiy_diylist:function(page_no,page_size){
          //?page_size=2&page_no=1
            //page_size æ¯�é¡µä¸ªæ•°ï¼ˆå¿…é€‰ï¼‰
        	var param = new Array();
        	param.push("?");
        	page_size?null:page_size ="12";
        	param.push("page_size="+page_size);
        	if(page_no){
        		param.push("&page_no="+page_no);
        	}
        	param.push("&");
            return api_base_url+"officialdiy/diylist"+param.join("");
        },
        
        
        //å®˜æ–¹è‡ªé€‰è¾‘æ­Œæ›²åˆ—è¡¨
        Officialdiy_songlist:function(code){
          //?code=mother
            //code è‡ªé€‰é›†ï¼ˆå¿…é€‰ï¼‰ æš‚ä¸�æ”¯æŒ�page_no,page_size
        	var param = new Array();
        	param.push("?");
        	code?null:code ="mother";
        	param.push("code="+code);
        	param.push("&");
            return api_base_url+"officialdiy/songlist"+param.join("");
        },
        
        
        //é¦–å�‘é€Ÿé€’
        Plaza_initialpublic:function(page_size){
          //?page_size=10
            //page_size æ¯�é¡µä¸ªæ•°ï¼ˆå¿…é€‰ï¼‰
        	var param = new Array();
        	param.push("?");
        	page_size?null:page_size =DefaultPageSize;
        	param.push("page_size="+page_size);
        	if(param.length>1){
        		param.push("&");
        	}
            return api_base_url+"plaza/initialpublic"+param.join("");
        },
        
        
        //æ �ç›®ä»‹ç»�
        Plaza_columnDesc:function(page_size){
          //page_size æ¯�é¡µä¸ªæ•°ï¼ˆå�¯é€‰ï¼Œé»˜è®¤æ˜¯6ä¸ªï¼‰
        	var param = new Array();
        	param.push("?");
        	if(page_size){
        		param.push("&page_size="+page_size);
        	}
        	if(param.length>1){
        		param.push("&");
        	}
            return api_base_url+"plaza/columnDesc"+param.join("");
        },     
        
        //ç”¨æˆ·æ•°æ�®æŽ¥å�£
        
        //1æ·»åŠ äº‘æ­Œæ›² /å°†æ­Œæ›²æ·»åŠ åˆ°ç”¨æˆ·çš„äº‘ç«¯,æ”¯æŒ�å�•ä¸ªå’Œæ‰¹é‡� 
        CloudSong_addSongFavorite:function(songId){//songId:Array;
        	//songid 
        	var param = new Array();
        	param.push("?");
        	var songIdStr = new Array();
        	for(var i=0;i<songId.length;i++){
        		if(songId.length>1&&i!=(songId.length-1)){
        			songIdStr.push(songId[i]);
        			songIdStr.push(",");
        		}else{
        			songIdStr.push(songId[i]);
        		}
        	}
        	param.push("songId="+songIdStr.join("")+"&");
        	
        	return api_base_url+"favorite/addSongFavorite"+param.join("");
        },
        
        //2.å�–æ¶ˆäº‘æ­Œæ›² /å°†æ­Œæ›²ä»Žç”¨æˆ·äº‘ç«¯åŽ»æŽ‰,æ”¯æŒ�å�•ä¸ªå’Œæ‰¹é‡� 
        CloudSong_delSongFavorite:function(songId){//songId:Array;
        	//songid 
        	var param = new Array();
        	param.push("?");
        	var songIdStr = new Array();
        	for(var i=0;i<songId.length;i++){
        		if(songId.length>1&&i!=(songId.length-1)){
        			songIdStr.push(songId[i]);
        			songIdStr.push(",");
        			//songid å¤šä¸ªç”¨é€—å�·éš”å¼€,æœ€å¤š 100 ä¸ª 
        		}else{
        			songIdStr.push(songId[i]);
        		}
        	}
        	param.push("songId="+songIdStr.join("")+"&");
        	return api_base_url+"favorite/delSongFavorite"+param.join("");
        },
        
        //3.èŽ·å�–ç”¨æˆ·çš„äº‘æ­Œæ›²åˆ—è¡¨ /
        CloudSong_getFavoriteSong:function(page_no,page_size){
        	var param = new Array();
        	param.push("?");
        	//page_no   å�¯é€‰ï¼Œé»˜è®¤  1
        	//page_size å�¯é€‰ï¼Œé»˜è®¤  50
        	//page_size = 49;
        	page_no?param.push("page_no="+page_no):null;
//        	if(param.length>2){
        		param.push("&");
        		param.push("page_size="+page_size);
//        	}
            return api_base_url+"favorite/getFavoriteSong"+param.join("")+"&";
        },
        
        //4.åˆ›å»ºäº‘åˆ—è¡¨/ç”¨æˆ·åœ¨äº‘ç«¯åˆ›å»ºä¸€ä¸ªåˆ—è¡¨ 
        //favorite/addList 
        CloudSong_addList:function(title){
        	var param = new Array();
        	param.push("?");
        	param.push("title="+title);
        	return api_base_url+"favorite/addList"+param.join("")+"&";
        },
        
        //5.åˆ é™¤äº‘åˆ—è¡¨/ç”¨æˆ·åˆ é™¤åœ¨äº‘ç«¯æŸ�ä¸€ä¸ªåˆ—è¡¨ 
        CloudSong_delList:function(id){
        	var param = new Array();
        	param.push("?");
        	param.push("id="+id);
        	return api_base_url+"favorite/delList"+param.join("")+"&";
        },
        
        //6.èŽ·å�–ç”¨æˆ·åœ¨äº‘ç«¯åˆ›å»ºçš„åˆ—è¡¨ 
        //https://openapi.baidu.com/rest/2.0/music/favorite/getList 
        //page_no å�¯é€‰,é¡µæ•°,é»˜è®¤æ˜¯ 1 page_size å�¯é€‰,æ¯�é¡µä¸ªæ•°,é»˜è®¤(æœ€å¤š)50
        CloudSong_getList:function(page_no,page_size){
        	var param = new Array();
        	param.push("?");
        	page_no?param.push("page_no="+page_no):null;
        	if(param.length>2){
        		param.push("&");
        		param.push("page_size="+page_size);
        	}
        	return api_base_url+"favorite/getList"+param.join("")+"&";
        },
        
        //7.æ·»åŠ äº‘æ­Œæ›²åˆ°æŸ�ä¸ªäº‘åˆ—è¡¨ [æ”¯æŒ�å�•ä¸ªæˆ–æ‰¹é‡�æ­Œæ›² ]
        //https://openapi.baidu.com/rest/2.0/music/favorite/addListSong 
        //songId å¿…é€‰,æ­Œæ›² songid å¤šä¸ªç”¨é€—å�·éš”å¼€,æœ€å¤š 100 ä¸ª id å¿…é€‰,åˆ—è¡¨ id 
        CloudSong_addListSong:function(songId){//songId:Array,
        	var param = new Array();
        	param.push("?");
        	var songIdStr = new Array();
        	for(var i=0;i<songId.length;i++){
        		if(songId.length>1&&i!=(songId.length-1)){
        			songIdStr.push(songId[i]);
        			songIdStr.push(",");
        			//songid å¤šä¸ªç”¨é€—å�·éš”å¼€,æœ€å¤š 100 ä¸ª 
        		}else{
        			songIdStr.push(songId[i]);
        		}
        	}
        	param.push("songId="+songIdStr.join(""));
        	return api_base_url+"favorite/addListSong"+param.join("")+"&";
        },
        
        //8.åˆ é™¤äº‘åˆ—è¡¨é‡Œçš„æ­Œæ›² [æ”¯æŒ�åˆ é™¤å�•ä¸ªæ­Œæ›²å’Œæ‰¹é‡�æ­Œæ›²]
        //https://openapi.baidu.com/rest/2.0/music/favorite/delListSong 
        //songId å¿…é€‰,æ­Œæ›² songid å¤šä¸ªç”¨é€—å�·éš”å¼€,æœ€å¤š 100 ä¸ª id å¿…é€‰,åˆ—è¡¨ id 
        CloudSong_delListSong:function(songId,id){//songId:Array,id:Int
        	var param = new Array();
        	param.push("?");
        	var songIdStr = new Array();
        	for(var i=0;i<songId.length;i++){
        		if(songId.length>1&&i!=(songId.length-1)){
        			songIdStr.push(songId[i]);
        			songIdStr.push(",");
        			//songid å¤šä¸ªç”¨é€—å�·éš”å¼€,æœ€å¤š 100 ä¸ª 
        		}else{
        			songIdStr.push(songId[i]);
        		}
        	}
        	param.push("&songId="+songIdStr.join(""));
        	param.push("&id="+id);
        	return api_base_url+"favorite/delListSong"+param.join("")+"&";
        },
        
        //9.èŽ·å�–æŸ�ä¸ªäº‘åˆ—è¡¨é‡Œçš„æ­Œæ›² 
        //https://openapi.baidu.com/rest/2.0/music/favorite/getListInfo 
        //id å¿…é€‰,äº‘åˆ—è¡¨ id page_no å�¯é€‰,é¡µæ•°,é»˜è®¤æ˜¯ 1 page_size å�¯é€‰,æ¯�é¡µä¸ªæ•°,é»˜è®¤(æœ€å¤š)50 
        CloudSong_getListInfo:function(id,page_no,page_size){
        	var param = new Array();
        	param.push("?");
        	param.push("id="+id);
        	var songIdStr = new Array();
        	for(var i=0;i<songId.length;i++){
        		if(songId.length>1&&i!=(songId.length-1)){
        			songIdStr.push(songId[i]);
        			songIdStr.push(",");
        			//songid å¤šä¸ªç”¨é€—å�·éš”å¼€,æœ€å¤š 100 ä¸ª 
        		}else{
        			songIdStr.push(songId[i]);
        		}
        	}
        	param.push("&songId="+songIdStr.join(""));
        	return api_base_url+"favorite/getListInfo"+param.join("")+"&";	
        },
        
        //10.æ­Œæ›²æ˜¯å�¦æ˜¯äº‘æ­Œæ›²ï¼Œæ”¯æŒ�å�•ä¸ªæ­Œæ›²å’Œæ‰¹é‡�æ­Œæ›² 
        //https://openapi.baidu.com/rest/2.0/music/favorite/isFavorite 
        //item å¿…é€‰,æ­Œæ›² id å¤šä¸ªç”¨é€—å�·éš”å¼€,æœ€å¤š 100 ä¸ª
        CloudSong_isFavorite:function(item){//item:Array
        	var param = new Array();
        	param.push("?");
        	var songIdStr = new Array();
        	for(var i=0;i<item.length;i++){
        		if(item.length>1&&i!=(item.length-1)){
        			songIdStr.push(item[i]);
        			songIdStr.push(",");
        			//songid å¤šä¸ªç”¨é€—å�·éš”å¼€,æœ€å¤š 100 ä¸ª 
        		}else{
        			songIdStr.push(item[i]);
        		}
        	}
        	param.push("&item="+songIdStr.join(""));
        	return api_base_url+"favorite/isFavorite"+param.join("")+"&";	
        },
};
