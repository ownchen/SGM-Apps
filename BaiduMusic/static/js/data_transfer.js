/* getData and transfer */

var Data = {
	init:{
		billboard:function(func){
			var currentData="";
			CurrentAjax.add(function(){
				$.ajax({
				  url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Billboard()),
				  success: function(data) {
					  currentData=data;
					  typeof func =="function"&&func(currentData);
				  },
				  timeout:10000,
				  complete:function(jqXHR,status){
					  //console.log("ajaxCompleteStatus:"+status);
					  AjaxComplete(status);
				  },
				});
			});
			CurrentAjax.send();
		},
		billboard_list:function(func,type,page_no,page_size){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Billboard_list(type,page_no,page_size)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		
		},
		artist_list:function(func,page_no,page_size,order,area){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Artist_list(page_no,page_size,order,area)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
			
		},
		artist_info:function(func,artistid){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Artist_info(artistid)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
			
		},
		artist_songlist:function(func,artistid,page_no,page_size){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Artist_songlist(artistid,page_no,page_size)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		artist_albumlist:function(func,artistid,page_no,page_size){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Artist_albumlist(artistid,page_no,page_size)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		album_info:function(func,albumid){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Album_info(albumid)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		plaza_recommendalbum:function(func,page_size){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Plaza_recommendalbum(page_size)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		plaza_newarrival:function(func,page_size){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Plaza_newarrival(page_size)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		featured_albums:function(func,page_no,page_size){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Officiadiy_diylist(page_no,page_size)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		featured_album_songsList:function(func,code){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Officialdiy_songlist(code)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		search_suggestion:function(func,queryStr){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Search_suggestion(queryStr)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		search_common:function(func,queryStr,page_no,page_size){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Search_common(queryStr,page_no,page_size)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		radio_catalog:function(func){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Radio_catalog()),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		//Radio_songlist
		radio_songList:function(func,channelid,page_no,page_size){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Radio_songlist(channelid,page_no,page_size)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		song_info:function(func,song_id){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Song_info(song_id)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		//Hot_list:function(type,page_size,page_no){
		hot_list:function(func,type,page_size,page_no){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedAccessTaken(BaiduMusicAPI.Hot_list(type,page_size,page_no)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		//获取用户的云歌曲列表 
		cloud_getFavoriteSong:function(func,page_no,page_size){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedUserAccessTaken(BaiduMusicAPI.CloudSong_getFavoriteSong(page_no,page_size)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		//获取用户在云端创建的列表 
		cloud_getList:function(func,page_no,page_size){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedUserAccessTaken(BaiduMusicAPI.CloudSong_getList(page_no,page_size)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		//获取某个云列表里的歌曲 
		cloud_getListInfo:function(func,id,page_no,page_size){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedUserAccessTaken(BaiduMusicAPI.CloudSong_getListInfo(id,page_size,page_no)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		//判断歌曲是否是在用户的云列表中
		cloud_isFavorite:function(func,item){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedUserAccessTaken(BaiduMusicAPI.CloudSong_isFavorite(item)),
					success: function(data) {
						currentData=data;
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		//添加歌曲到用户的云列表中
		cloud_addSongFavorite:function(func,idList){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedUserAccessTaken(BaiduMusicAPI.CloudSong_addSongFavorite(idList)),
					success: function(data) {
						currentData=data;
						console.log("添加歌曲到用户的云列表中OK"+data);
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		//取消用户列表的收藏歌曲
		//CloudSong_delSongFavorite
		cloud_delSongFavorite:function(func,idList){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedUserAccessTaken(BaiduMusicAPI.CloudSong_delSongFavorite(idList)),
					success: function(data) {
						currentData=data;
						console.log("删除歌曲从用户的云列表中OK"+data);
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		//添加歌曲到用户的某个云列表中
		cloud_addListSong:function(func,idList){
			var currentData = "";
			CurrentAjax.add(function(){
				$.ajax({
					url: Oauth_helper.BaiduAPI_addedUserAccessTaken(BaiduMusicAPI.CloudSong_addListSong(idList)),
					success: function(data) {
						currentData=data;
						console.log("添加歌曲到用户的云列表中OK"+data);
						typeof func =="function"&&func(currentData);
					},
					timeout:10000,
					complete:function(jqXHR,status){
						//console.log("ajaxCompleteStatus:"+status);
						AjaxComplete(status);
					},
				});
			});
			CurrentAjax.send();
		},
		
	}	
};

