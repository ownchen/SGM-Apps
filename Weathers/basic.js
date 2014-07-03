/*
 * 天气初始化 
 */
var $Debug = true;

window.onerror = function(msg, url, line) {
	var str = "ERROR: " + msg + "\n" + url + ":" + line;
	tracer.info(str, "error");
	return true;
};

function buttonFeedback(htmlElem, downOpacity){
	return;
	if (!downOpacity){
		downOpacity = 0.3;
	}
	
	var downStyle = {paddingLeft:"+=5px", paddingTop:"+=5px", width:"-=5px", opacity:downOpacity};
	var upStyle = {paddingLeft:"-=5px", paddingTop:"-=5px", width:"+=5px", opacity:"1.0"};
	
	$(htmlElem).animate(downStyle, "normal", "linear").animate(upStyle, "slow", "linear");
}

function batchLoad(scripts, callback) {

	var count = 0;
	var length = scripts.length;

	for (index in scripts) {
		var js = document.createElement("script");
		js.type = "text/javascript";
		js.charset = "UTF-8";
		js.onload = function() {
			count++;
			if (count == length) {
				if (callback) {
					callback();
				}
			}
		};
		js.src = scripts[index];
		document.getElementsByTagName("head")[0].appendChild(js);
	}
}
