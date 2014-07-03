// 和gm sdk lib访问相关的封装在此
ibuickApp.factory('gmInfoFactory', function($q, $rootScope) {
	
    var factory = {};
    
    factory.ttsHandle = 0;
    factory.speedHandle = 0;

    // 获取位置信息的经度和维度
    factory.getLatlng = function() {
    	var deferred = $q.defer();
    	gm.info.getCurrentPosition(function(pos) {
    		if(pos.coords.latitude == null || pos.coords.longitude == null ) {
    			var Latlng = {Lat:31.217425958989562, Lng:121.59365415573121};
    			deferred.resolve(Latlng);
    		} else {
    			var Latlng = {};
    			Latlng.Lat = pos.coords.latitude / 3600000;
    			Latlng.Lng = pos.coords.longitude / 3600000;
    			deferred.resolve(Latlng);
    		}
    	}, function(args) {
    		var Latlng = {Lat:31.217425958989562, Lng:121.59365415573121};
			deferred.resolve(Latlng);
    	}, {});
    	
    	return deferred.promise;
    };

    // 打电话
    factory.makePhoneCall = function(phoneNumber) {
    	var deferred = $q.defer();
    	gm.phone.dialPhoneNumber(function() {
    		deferred.resolve();
    	}, function() {
    		deferred.reject();
    	}, {phone:phoneNumber});
    	
    	return deferred.promise;
    };
    
    // TTS处理
    factory.startTTS = function(text) {
    	factory.ttsHandle = gm.voice.startTTS(function(){}, function(){}, text);
    };
    
    factory.stopTTS = function() {
    	if(factory.ttsHandle && factory.ttsHandle > 0){
    		gm.voice.stopTTS(factory.ttsHandle);
    	};
    };
    
    // 关闭程序
    factory.shutdownApplication = function() {
    	var deferred = $q.defer();
    	gm.system.closeApp(function(){
    		deferred.resolve();
    	});
    	
    	return deferred.promise;
    };
    
    // 检查网络状态
    factory.checkNetwork = function(){
    	var deferred = $q.defer();
    	gm.comm.getNetworkConnectivity(function(conn){
    		if(conn){
    			deferred.resolve();
    		}
    		else{
    			deferred.reject();
    		};},function(){}, "internet");
    	
    	return deferred.promise;
    };
    
    // 检测车的状态：停止，低速和高速
    factory.watchSpeedChange = function (sufn) {
    	gm.system.watchSpeed(sufn, function(){});
    };
    
  //获取当前行车速度
    factory.getSpeed = function(){
    	var speed = gm.system.getSpeed();
    	return speed;
    };
    
    // 页面访问跟踪
    factory.recordPV = function(channelName) {
    	window.s.pageName = "iBuick:" + channelName;
		window.s.channel  = channelName;
        var s_code = window.s.t();
    };
    
    return factory;
});

