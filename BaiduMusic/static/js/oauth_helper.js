/*
 * Oauth_helper
 */

/*
 * https://openapi.baidu.com/oauth/2.0/token
 * ?grant_type=client_credentials
 * &client_id=?
 * &client_secret=?
 * &scope=?
 */
var AppKey = {
		app_id : 424275,
		api_key:"GDfGE9SoVRim841jg1FBcFtj",
		secret_key:"Ok9BZ29wW088TcpVwfq6k5VcojaDmFAP ",
};
/*
 * 	æ�´æ—‚æ•¤IDé”›ï¿½24275 
	API Keyé”›æ¬¸DfGE9SoVRim841jg1FBcFtj 
	Secret Keyé”›æ­„k9BZ29wW088TcpVwfq6k5VcojaDmFAP 
 */

var Oauth_helper = {
		OauthData:"",
		BaiduMusic_getAccessTaken:function(func){//é�¥ç‚¶çšŸé�‘èŠ¥æšŸ
			var url = "https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials"+
				"&client_id="+AppKey.api_key+
				"&client_secret="+AppKey.secret_key;
			CurrentAjax.add(function(){
				$.ajax({
					  url: url,
					  success: function(data) {
					    Oauth_helper.OauthData=data;
					    
					    typeof func =="function"&&func(Oauth_helper.OauthData);
					  },
					  timeout:10000,
					  complete:function(jqXHR,status){
						  console.log("ajaxCompleteStatus:"+status);
						  AjaxComplete(status);
					  },
					});
			});
			
			CurrentAjax.send();
			//load login page
			Oauth_helper.BaiduMusic_ImplicitGrant();
			
		},
		
		BaiduAPI_addedAccessTaken:function(url){
			console.log(url+"access_token="+Oauth_helper.OauthData.access_token);
			return url+"access_token="+Oauth_helper.OauthData.access_token;
		},		
		User_accessTaken:null,
		BaiduMusic_ImplicitGrant:function(func){
			var url ="https://openapi.baidu.com/oauth/2.0/authorize?"+
				"client_id="+AppKey.api_key+
				"&response_type=token"+
				"&display=mobile"+
				"&redirect_uri=oob"+//+
				"&force_login=1";//å¼ºåˆ¶ç™»é™†
				//"&confirm_login=1";//é»˜è®¤ç™»é™†
			$("#loginPage").attr("src",url);
			
			//CurrentAjax.send();
		},
		BaiduAPI_addedUserAccessTaken:function(url){
			return url+"access_token="+Oauth_helper.User_accessTaken;
		}
		/*
		BaiduMusic_getAccessTaken_ImplicitGrant:function(func){
			var url ="https://openapi.baidu.com/oauth/2.0/authorize?"+
			"client_id="+AppKey.api_key+
			"&response_type=token"+
			"&display=popup"+
			"&redirect_uri=oob"+
			"&confirm_login=1";
		CurrentAjax.add(function(){
			$.ajax({
				url:url,
				success:function(data){
					//get the login page or the authorize page
					console.log("get the login page:"+data);
					typeof func == "function" && func();
				},
				timeout:10000,
				  complete:function(jqXHR,status){
					  console.log("ajaxCompleteStatus:"+status);
					  AjaxComplete(status);
				  },
			});
		});
		
		CurrentAjax.send();
		}*/
		
};
/*such as
{
"expires_in":2592000,
"refresh_token":"4.afdd994be43dc4c71c675fdedb976a99.315360000.1671089113.282335-424275",
"access_token":"3.6341841755119ed33aa0e33711857320.2592000.1358321113.282335-424275",
"session_secret":"0d7b7852eae7cb842baff93e536fa089",
"session_key":"94rlZJtYEwLGKove\/kPh2sxQwA39aqfZ8ELHaUpePLeZ1r3q0thp3AsJsFjS6mLPyhYOMrSKnF9t17tozzWzTO\/fuQ==",
"scope":"public wise_adapt music_media_basic music_musicdata_basic music_search_basic"
}
 */


