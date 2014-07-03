Tracer = function(){
	
	var infolist = new Array();
	var categories = {};
	
	this.clear = function(category){
		if (category){
			if (typeof(categories[category]) != "undefined"){
				categories[category] = new Array();
			}
		} else {
			for (var key in categories){
				categories[key] = new Array();
			}
		}
	};
	
	this.info = function(message, category){
		var item = newTraceItem(message);
		addTraceItem(item, category);
	};
	
	this.begin = function(message, category){
		var item = newTraceItem(message, "begin");
		addTraceItem(item, category);
	};
	
	this.end = function(message, category){
		var item = newTraceItem(message, "end");
		addTraceItem(item, category);
	};

	this.saveAs = function(filePath){
		gm.ngi.weibo.dataStorage.writeObject(filePath, infolist);
	};
	
	this.getCategories = function(){
		return categories;
	};
	
	this.listTraceInfo = function(category){
		return getCategory(category);
	};
	
	function getCategory(category){
		if (typeof(categories[category]) == "undefined"){
			categories[category] = new Array();
		}
		return categories[category];
	}
	
	function addTraceItem(item, category){
		var list = getCategory(category);
		var last = getCorrespondItem(item, list);
	    if (last) {
	        item.elapsed = item.time - last.time;
	    }
	    item.id = list.length + 1;
		list.push(item);
	}
	
	function getCorrespondItem(item, list){
		if (list.length == 0){
			return null;
		} else if (item.type == "begin"){
			return null;
		} else if (item.type == "info"){
			return list[list.length - 1];
		} else {
			for (var i = list.length - 1; i>=0; i--){
				if (list[i].type == "begin" && list[i].message == item.message){
					return list[i];
				}
			}
			return null;
		}
	}
	
	function newTraceItem(message, type){
	    var item = {
	            id: 0,
	            message: message,
	            time: (new Date()).getTime(),
	            type: type ? type : "info",
	            elapsed: 0
	        };
	    return item;
	};
	
	
};

function TracerPage(uploadSettings){
    function initTracer(){
		var btnShowTracer = $("<div id=\"btnShowTracer\">tracer</div>");
		btnShowTracer.appendTo($(document.body));

        // tracer
        $("#btnShowTracer").click(function(){
        	$("#tracer").show();
        	showTraceButtons();
        });
        $("#hideTracer").click(function(){
        	$("#tracer").hide();
        });
        $("#clearTraceLog").click(function(){
        	EmptyLogs();
        });
        $("#uploadTraceLog").click(function(){
        	uploadTraceLog();
        	EmptyLogs();
        });
        $("#tracelogContainer").initJsp(false, 300);
    }
    
    function EmptyLogs(){
    	tracer.clear();
    	$("#traceLog").empty();
		$("#tracelogContainer").reInitJsp();
    }
    
    function uploadTraceLog(){
    	if (uploadSettings.beforeUpload)
    		uploadSettings.beforeUpload();
    	
    	var json = JSON.stringify(tracer.getCategories());
//    	var baseUrl = "http://localhost:33968/api/TraceLog/Upload?appName=";
    	var baseUrl = "http://58.68.245.148/ngitracelog/api/TraceLog/Upload?appName=";
		var settings = {
				type: 'POST',
				contentType: "application/json",
				url: baseUrl + uploadSettings.appName,
				dataType: "json",
				data: json,
				complete: uploadSettings.afterUpload,
				processData: false,
		};
		$.ajax(settings);
    }
    
	function renderTraceLog(logs){
		$("#traceLog").html("");
		var str = "";
		if (!logs || !logs.length)
			return;
		for (var i=0;i<logs.length;i++){
			var item = logs[i];
			str += "<li>" + item.id + "- [" + item.type + "] " + item.message;
			if (item.type != "begin")
				str += ": " + item.elapsed + " ms </li>";
		}
		var total = logs[logs.length-1].time - logs[0].time;
		str += "<li> Total: " + total + "ms</li>";
		$("#traceLog").html(str);

	};
	
	function showTraceButtons(){
		$("#traceButtons").html("");
		var html = "";
		for (var category in tracer.getCategories()){
			html += "<button style='width:100px;height:30px' category='" + category + "'>" + category + "</button>"; 
		}
		$("#traceButtons").html(html);
	    $("#traceButtons button").click(function(){
	    	var category = $(this).attr("category");
			var logs = tracer.listTraceInfo(category);
			renderTraceLog(logs);
			$("#tracelogContainer").reInitJsp();
	    });
	    
	}
	
	initTracer();

};

tracer = new Tracer();
tracer.info("page initializing.", "startup");
