var DebugStorage = {
		debugfile : "dir/debug/log.txt",
        writeFile : function (v, path) {
            //var result = gm.io.writeFile(path || this.debugfile, v);
        },
        readFile : function (path) {
            //return gm.io.readFile(path || this.debugfile) || "[]";
        },
        updateDebugFile: function(data){
        	var json = JSON.parse(this.readFile());
        	
        	for(var index in json){
        		if (data.title == json[index].title){
        			for(var s in json[index])
        				json[index][s] = data[s]; 
        		} 
        	}
        	DebugStorage.writeFile(JSON2.stringify(json));
        },
        findDebugFile: function(title){
        	var json = JSON.parse(this.readFile());
        	for(var index in json)
        		if (json[index].title == title) 
        			return json[index];
        	return {};
        },
        addDebugFile : function (data) {
            var json = this.readFile() || "[]";
           // data.date = "'"+new Date()+"'";
            json = JSON.parse(json);
            json.push(data);
            DebugStorage.writeFile(JSON2.stringify(json));
        },
        saveDebugFile: function(data){
        	if (DebugStorage.findDebugFile(data.title).title)
        		DebugStorage.updateDebugFile(data);
        	else
        		DebugStorage.addDebugFile(data);
        }
};

function Log(info){
	var data = {title:Date() ,info:info};
	//x$("#dataView").html("Date="+Date()+" Info="+info+"</br>"+x$("#dataView").html());
	DebugStorage.saveDebugFile(data);
}