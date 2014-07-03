var CurrentAjax = {
	Ajax : {},
	Count:0,
	add:function(func){
		typeof func=="function"&&(CurrentAjax.Ajax = func);
		CurrentAjax.Count = 0;
	},
	send:function(){
		CurrentAjax.Count+=1;
		typeof CurrentAjax.Ajax=="function" && CurrentAjax.Ajax();
	},
	reSend:function(){
		CurrentAjax.Count += 1;
		CurrentAjax.Ajax();
	},
	clear:function(){
		CurrentAjax.Count = 0;
	}
};

var AjaxComplete = function(status){
	switch (status){
	  case "success"://console.log("ajax success");
	  		break;
	  case "error"://console.log("ajax error");
		  	msg = "请求失败，请检查网络连接!";
			$("#loadingMsg").html(msg);
			$(".startMsg").html(msg);
			setTimeout(function(){
				 Controler.preloadLayerHide(Controler.preloadTarget);
				 if(Controler.prevView.length>0){
					 Controler.goback();
				 }
			},6000);
	  		break;
	  case "timeout"://
	  		var msg = "";
	  		
	  		if(CurrentAjax.Count<10){
	  			msg = "请求超时，正在重新加载..";
	  			$("#loadingMsg").html(msg);
	  			CurrentAjax.reSend();
	  		}else{
	  			msg = "请求失败，请检查网络连接!";
	  			$("#loadingMsg").html(msg);
	  			setTimeout(function(){
	  				Controler.preloadLayerHide(Controler.preloadTarget);
	  				Controler.goback();
	  			},6000);
	  			CurrentAjax.clear();
	  		}
	  		$(".startMsg").html(msg);
	  		
	  		break;
	  };
};