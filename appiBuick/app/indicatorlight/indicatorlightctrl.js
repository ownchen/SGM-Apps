ibuickApp.controller('CtrlIndicatorLightView',function($scope, $location, $timeout, iBuickData, gmInfoFactory, popup) {
	
	$scope.indicators = [];
	$scope.initpos    = 0;
	
	$scope.$on('$viewContentLoaded', function() {
		$timeout(function() {init();}, 0.5);
	});
	
	//init();
	
	function init() {
		gmInfoFactory.recordPV("指示灯查询");
		window.hidespinner();
		$scope.indicators = iBuickData.getIndicators(0, 8);
		gm.system.watchSpeed(function(){},function(){});
	};
	
	// 根据滑块位置设置不同的数据
	$scope.rowindex = function(index) {
    	$scope.$apply(index);
    	switch(index) {
    	case 0:
    		$scope.indicators = iBuickData.getIndicators(0, 8);
    		break;
    	case 1:
    		$scope.indicators = iBuickData.getIndicators(8, 8);
    		break;
    	case 2:
    		$scope.indicators = iBuickData.getIndicators(16, 1);
    		break;
    	}
    	$scope.$apply($scope.indicators);
    };
    
    // 点击弹出详细信息展示框
    $scope.clickeditem = function (item) {
    	var rs = gmInfoFactory.getSpeed();
    	if(rs==0) {
    		speedStatus = false;
    	}
    	else{
    		speedStatus = true;
    	};
    	$timeout(function() {
    		popup.popup({
    			templateUrl:"app/indicatorlight/indicatorpopupview.html",
    			controller:'CtrlIndicatorPopupView',
    			success:{fn:function() {
    				if(iBuickData.sharedObject.ttsHandle) {
    					gm.voice.stopTTS(iBuickData.sharedObject.ttsHandle);
    				}
    				}},
    			title:item.title,
    			message:item.content
    		}, {url:item.photo,speed:speedStatus});
    	}, 20);
	};
	
	$scope.closeapp = function() {
		if(iBuickData.sharedObject.ttsHandle) { 
			gm.voice.stopTTS(iBuickData.sharedObject.ttsHandle);
		}
		gmInfoFactory.shutdownApplication();
		//window.showspinner();
		//$timeout(function() {
		//	gmInfoFactory.shutdownApplication();
		//}, 20);
	};
	
	$scope.back = function() {
		if(iBuickData.sharedObject.ttsHandle) { 
			gm.voice.stopTTS(iBuickData.sharedObject.ttsHandle);
		}
		window.showspinner();
		//$location.path("/home");
		$timeout(function() {
			$location.path("/home");
		}, 20);
	};
	
});