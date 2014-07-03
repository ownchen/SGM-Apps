var DebugModel = true;

var wordlist ={};
var LOGINTEST = true;
var HasLogout = false;
var audioFlag = false;
var Debug = false;
var keyBoardInit = true;
var loginSuccessFunc = null;
var UserSaver = false;
var DefaultPageSize = 20;
var netSongSrcTest = false;
var localSongSrcTest = false;
var userData  = null;
/* 是否缓存页面内容 */
var BufferView = false;
var Now = function(){
	var d = new Date(),h,m,s;
	d.getHours()<10?h="0"+d.getHours():h = d.getHours();
	d.getMinutes()<10?m="0"+d.getMinutes():m = d.getMinutes();
	d.getSeconds()<10?s="0"+d.getSeconds():s=d.getSeconds();
	var t = "["+h+":"+m+":"+s+"]";
	return t;
};


function DebugLog(info){
	if(Debug){
		info&&$("#debugContent").html(Now()+info+"</br>"+$("#debugContent").html())&&console.log(Now()+info);
		
	}
}
var LoginPageStatus = false;
//Tracking 点击量
Tracking={
	BtnClick:function(buttonName){
		s.linkTrackVars='prop1,prop2'; 
		s.prop1=buttonName;//设置 prop1 为 button 名称 
		s.prop2=buttonName+s.pageName;
		s.tl(this,'o','click_button');
	},
};

(function(){
	window.onerror = function(msg, url, line) {
		var ErrorMsg = "Error="+msg+"</br>URL="+url+"</br>LINE="+line+"</br>"+$("#dataView").html();
		$("#alertBox").removeClass("hidden");
		$("#alertMessage").html("加载失败，请稍后重试");
		Debug = true;
	
		DebugLog(ErrorMsg);
	};
}());
DebugLog("V0325");


$(document).ready(function(){
	//delayLoaded();
	
	$(".closeBtn").unbind("mouseup").bind("mouseup",function(){
		$("#logoutBox").removeClass("hidden");
	});
	
	var contentHtml = $(HTMLContent);
    $(".Center").append(contentHtml);
    
    contentHtml.ready(function(){
    	if(Debug){
    		$("#debugView").removeClass("hidden");
    	}
    	
    	$("#loginIframe").html("<iframe id='loginPage' onload='loginLoaded()'></iframe>");
    	/*Debug View */
    	$("#showDebug").mouseup(function(){
    		$("#debugView").removeClass("small");
    		$("#hideDebug").removeClass("hidden");
    		$(this).addClass("hidden");
    	});
    	$("#hideDebug").mouseup(function(){
    		$("#debugView").addClass("small");
    		$("#showDebug").removeClass("hidden");
    		$(this).addClass("hidden");
    		DebugLog("bug test");
    	});
    	$("#logoutBox .alertBtn").mouseup(function(){
    		$(this).removeClass("selected");
    		if($(this).html()=="确定"){
    			gm.system.closeApp();
    		}else{
    			$("#logoutBox").addClass("hidden");
    		}
    	}).mousedown(function(){
    		$(this).addClass("selected");
    	});
    	
    	$("#debugPrev").mouseup(function(){
    		var debugView = $("#debugContent");
    		var top = parseInt(debugView.css("top"));
    		var h = 220;
    		if(top<40){
    			debugView.css({
    				"top":(top+h)+"px",
    			});
    		};
    	});
    	$("#debugClear").mouseup(function(){
    		var debugView = $("#debugContent");
    		debugView.html("");
    		debugView.css({
    			"top":"0px"
    		});
    	});
    	$("#debugNext").mouseup(function(){
    		var debugView = $("#debugContent");
    		var top = parseInt(debugView.css("top"));
    		var height = parseInt(debugView.css("height"));
    		var h = 220;
    		if((top*-1+220-40)<=height){
    			debugView.css({
    				"top":(top-h)+"px",
    			});
    		};
    	});
    	
    	//x$(".startPage").setStyle("display","block");
    	$("#okBtn").mouseup(function(){
    		$(this).removeClass("selected");
    		$("#alertBox").addClass("hidden");
    	}).mousedown(function(){
    		$(this).addClass("selected");
    	});
    	
    	$("#registerOKBtn").mouseup(function(){
    		$("#registerBox").addClass("hidden");
    	});
    	
    	arrowBtnEffect(".top_arrow",".bot_arrow");
    	
    	$(".playAllBtn").mousedown(function(){
    		$(this).addClass("playAllBtn_down");
    	}).mouseup(function(){
    		$(this).removeClass("playAllBtn_down");
    	});
    	
    	
		$(".backBtn").unbind("mousedown").bind("mousedown",function(){
			$(".backBtn").addClass("clicked");
		}).unbind("mouseup").bind("mouseup",function(){
			 $(".backBtn").removeClass("clicked");
			 Controler.goback();
		});
		$(".back").unbind("mousedown").bind("mousedown",function(){
			$(".back").addClass("clicked");
		}).unbind("mouseup").bind("mouseup",function(){
			$(".back").removeClass("clicked");
			Controler.goback();
		});
		keyBoardObj = $("#customkeyboard").keyboard({
            doneCallback: function (d) {
                //alert(d.target.input[0].value);
            	$("#View").css("display","block");
            	if($(d.target.relatedInput).attr("tag")=="username"){
            		$("#UserName").attr("value",d.target.input[0].value);
            		CurrentUserData.username = d.target.input[0].value;
            		DebugLog("UserInputUserName="+CurrentUserData.username+" \ "+$("#UserName").attr("value"));
            	}
            	//var loginPage = $(document.getElementById("loginPage").contentDocument);
            	if($(d.target.relatedInput).attr("tag")=="password"){
            		$("#Password").attr("value",d.target.input[0].value);
            		CurrentUserData.password = d.target.input[0].value;
            		DebugLog("UserInputPassword="+CurrentUserData.password+" \ "+$("#Password").attr("value"));
            	}
            	if($(d.target.relatedInput)&&$(d.target.relatedInput).attr("id")=="searchInput"){
            		Controler.preloadLayerShow($("#mainContainer"));
            		var queryStr = d.target.input[0].value;
                    (new SearchView()).searchKeyword(function(){
                    	Controler.preloadLayerHide($("#mainContainer"));
            		},queryStr,0,6);
            	}
            },
            EmptyValueCallback: function () {
                //alert("请输入内容");
            },
            returnCallback: function () {
            	
            }
        });
		
		
		var FooterHtml = '<div class="Footer" style="opacity:0;" class="hidden"><div class="search" id="searchGuidBtn"></div><div class="liveMusic" id="onLineMusicGuidBtn"></div><div class="myMusic" id="myMusicBtn"></div><div class="playGuid hasMusic hidden" id="playGuidBtn"></div><div class="baiduLogo" id="baiduLogoIcon"></div></div>';
		$("#mainContainer").append(FooterHtml);
		
		//addCommonEventListener
		$("#onLineMusicGuidBtn").unbind("mouseup").bind("mouseup",function(){
			Controler.transfer(new MusicOnlineIndexView());
		}).unbind("mousedown").bind("mousedown",function(){
			$(".Footer div").removeClass("current");
			$(this).addClass("current");
		});
		
		$("#myMusicBtn").unbind("mouseup").bind("mouseup",function(){
			Controler.transfer(new MyMusicView());
		}).unbind("mousedown").bind("mousedown",function(){
			$(".Footer div").removeClass("current");
			$(this).addClass("current");
		});
		
		$("#searchGuidBtn").unbind("mouseup").bind("mouseup",function(){
			Controler.transfer(new SearchView());
		}).unbind("mousedown").bind("mousedown",function(){
			$(".Footer div").removeClass("current");
			$(this).addClass("current");
		});
		
		Oauth_helper.BaiduMusic_getAccessTaken(function(data){
			$(".startPage").animate({opacity:0},400,function(){
				$(this).addClass("hidden");
			});
			$("#mainContainer").animate({opacity:1},600);
			Controler.preloadLayerShow($("#radioView"));
			
			$(".Footer").removeClass("hidden").animate({opacity:1},700);
			$(".Center").removeClass("hidden");
			
			Controler.transfer(new RadioView());
			
		});
	});
});

function arrowBtnEffect(toparrow,botarrow){
	$(toparrow).bind("mousedown",function(){
		if($(this).attr("class").indexOf("disabled")==-1){
			$(this).addClass("topArrow_down");
		}
	});
	$(toparrow).bind("mouseup",function(){
		if($(this).attr("class").indexOf("disabled")==-1){
			$(".top_arrow").removeClass("topArrow_down");
		}
	});
	
	$(botarrow).bind("mousedown",function(){
		if($(this).attr("class").indexOf("disabled")==-1){
			$(this).addClass("botArrow_down");
		}
	});
	$(botarrow).bind("mouseup",function(){
		if($(this).attr("class").indexOf("disabled")==-1){
			$(".bot_arrow").removeClass("botArrow_down");
		}
	});
}


var CurrentUserData = {};
function loginLoaded(){
	var hrefData = document.getElementById("loginPage").contentDocument.location.href;
	console.log("hrefData="+hrefData );
	var loginPage = $(document.getElementById("loginPage").contentDocument);
	var currentUrl =loginPage.context.URL;
	if((currentUrl.indexOf("baidu")!=-1)){
		var loginPage = $(document.getElementById("loginPage").contentDocument);
		var inputs = loginPage.find("input");
		for(var i=0;i<inputs.length;i++){
			
			var t = inputs[i];
			if(i==0){
				$(t).attr("tag","username");
			}else if(i==1){
				$(t).attr("tag","password");
			}
			keyBoardObj.RegisterKeyBoadr($(t));
		}
	};
	loginPage.find("body").css("overflow","hidden");
	loginPage.find(".third-login").css({
		"display":"none",
	});
	loginPage.find(".scope").css({
		"display":"none",
	});
	loginPage.find(".toolbar").css({
		"display":"none",
	});
			
	//loginSuccess&&get
	 function getQueryStr(str,url) {
            var rs = new RegExp("(^|)" + str + "=([^\&]*)(\&|$)", "gi").exec(url), tmp;
            if (tmp = rs) {
                return tmp[2];
            }
            // parameter cannot be found
            return "";
        }
	var userAccessTaken;
//	DebugLog("----->Refreshedn url:"+hrefData);
	userAccessTaken = getQueryStr("access_token",hrefData);
//	DebugLog("----->AccessTaken1:"+userAccessTaken);
	function getAccessTaken(){
		if(hrefData.indexOf("access_token")!=-1){
//			DebugLog("----->access_token exist!");
			var strlist = hrefData.split("&");
			for(i in strlist){
				DebugLog("strlist["+i+"]="+strlist[i]);
				if(strlist[i].indexOf("access_token")!=-1){
					var str = strlist[i].split("=");
//					DebugLog("str[0]="+str[0]);
//					DebugLog("----->AccessTaken2:"+str[1]);
					return str[1];
				}
			}
		}else{
			return null;
		}
	}
	var userAccessTaken2 = getAccessTaken();
//	DebugLog("----->userAccessTaken2="+userAccessTaken2);
	//loginSuccess
	if(userAccessTaken2){
		FirstTimeLogin = true;
		$("#loginBefore").addClass("hidden");
		Oauth_helper.User_accessTaken = userAccessTaken2;
		if(!userData){
			var view = new MyMusicView();
			Controler.transfer(view);
		}
		var username = $("#UserName")[0].value;
		var password = $("#Password")[0].value;
		DebugLog("userName="+username+" passWord="+password);
		$(".userName").html(username);
		if(!LOGINTEST){
			Storage.updateUserHistory(username,password);
			DebugLog("Storage.findUserHistory:"+username+password);
		}
		
		
	}
	DebugLog("AccessTaken:False");
	
	if(!LOGINTEST){
		if(!HasLogout){
			userData= Storage.findUserHistory();
		}
		if(userData){
			userData.username = Decrypt(userData.username);
			userData.password = Decrypt(userData.password);
		}
		
	}
	if(userData&&userData.username){
		CurrentUserData = userData;
		//test login 
		$(loginPage.find("input")[0]).attr("value",userData.username);
		$(loginPage.find("input")[1]).attr("value",userData.password);
		$("#UserName")[0].value = userData.username;
		$("#Password")[0].value = userData.password;
		$(".userName").html(userData.username);
		DebugLog("UserAccountInfo:username "+userData.username+"password "+userData.password);
		loginPage.find("button[type='submit']").click();
	};
	var remDivStr = new Array();
	remDivStr.push("<div style='color: #0f6eb2;position: absolute;margin-left: 20px;top: 8px;right: 120px;font-size: 23px;height: 30px;border-bottom: 1px solid #0f6eb2;' id='registerBtn'>注册</div>");
	loginPage.find("#Main").append(remDivStr.join(""));
	remDivStr = new Array();
	remDivStr.push("<div style='color:#f7461c;line-height:43px;'>(请牢记验证码)</div>");
	loginPage.find(".pass-verifycode").append(remDivStr.join(""));
	loginPage.find("#remenberIcon").css({
	});
	/*
	loginPage.find("#rememberIcon").css({
		"width": "10px",
		"height": "10px",
		"background": "#000",
		"float": "left",
		"margin-top": "3px",
		"margin-right": "4px",
		"border-radius": "9px",
		"border": "3px solid #fff",
	});
	*/
	
	//判断是否有记住的用户名
	loginPage.find("#registerBtn").unbind("mouseup").bind("mouseup",function(){
		$("#registerBox").removeClass("hidden");
	});
	DebugLog("LoginPage cssStyle-->End");

	console.log("LoginPageStatus"+LoginPageStatus);
	
	Oauth_helper.User_accessTaken && typeof loginSuccessFunc == "function" && loginSuccessFunc();
};
