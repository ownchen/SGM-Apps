var $Debug = true;

function attachAppTray() {
	if (!$Debug) {
		return;
	}
	var topFrame = window.parent.window;
	var appTray = topFrame.document.getElementById("app_window_top_row");
	if (appTray && !appTray.onclick) {
		appTray.onclick = function() {
			this.style.visibility = "hidden";
		};
	}
}

//window.onerror = function(msg, url, line) {
//	appendLog("ERROR: " + msg + "\n" + url + ":" + line);
//	return true;
//}
