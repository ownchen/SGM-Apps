var Storage = {
		filePath : "dir/subdir/myfile.txt",
        searchHistory:"dir/subdir/SearchHistory.txt",
        writeFile : function (v, path) {
        	//test
        	if(path=="dir/subdir/myfile.txt"){
        		alert("dir/subdir/myfile.txt");
        	}
        	gm.io.writeFile(path || this.searchHistory, encodeURIComponent(v));
        },
        readFile : function (path) {
            //test
        	return decodeURIComponent(gm.io.readFile(path || this.searchHistory) || "[]");
        },
        findSearchHistory: function(title){
        	//test
        	var json = JSON.parse(this.readFile(Storage.searchHistory));
        	for(var index in json)
        		if (json[index].title == title) 
        			return json[index];
        	return {};
        	
        },
        findUserHistory: function(){
        	//test
        	var json = JSON.parse(this.readFile(Storage.filePath));
        	
        	if(json&&json.length>0){
        		return json[0];
        	}else{
        		return null;
        	}
        },
        updateSearchHistory: function(data){
        	//test
        	
        	var json = JSON.parse(this.readFile(Storage.searchHistory));
        	
        	for(var index in json){
        		if (data.title == json[index].title){
        			for(var s in json[index])
        				json[index][s] = data[s]; 
        		} 
        	}
        	Storage.writeFile(JSON2.stringify(json),Storage.searchHistory);
        },
        updateUserHistory: function(username,password){
        	//test
        	
        	var json = JSON.parse(this.readFile(Storage.filePath));
        	var data = {"username":Encrypt(username),"password":Encrypt(password)};
        	json[0] = data;
//        	if(username&&password){
//	        	json.username = username;
//	        	json.password = password;
//        	}        	
        	Storage.writeFile(JSON2.stringify(json),Storage.filePath);
        	
        },
        addSearchHistory : function (data) {
        	//test
            var json = this.readFile() || "[]";
           // data.date = "'"+new Date()+"'";
            json = JSON.parse(json);
            json.unshift(data);
            if(json.length>4){
            	json.pop();
            }
            Storage.writeFile(JSON2.stringify(json),Storage.searchHistory);
            
        },
        saveSearchHistory: function(data){
        	if (Storage.findSearchHistory(data.title).title)
        		Storage.updateSearchHistory(data);
        	else
        		Storage.addSearchHistory(data);
        }
};