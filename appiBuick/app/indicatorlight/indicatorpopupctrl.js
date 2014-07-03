ibuickApp.controller('CtrlIndicatorPopupView',function($scope, $timeout, gmInfoFactory,iBuickData) {
	
	$scope.imgurl = locals.url;
	$scope.speedStatus = locals.speed;
	var rs = 0;
	var btnimg = "assests/images/ttsbtn.png";
	
	var resizeTimer = null;
	
	$scope.btnimg = btnimg;
	
	gm.system.watchSpeed(function(speed) {
		if(speed == 0) {
			$scope.speedStatus = false;
			$scope.$apply($scope.speedStatus);
		}
		else{
			$scope.speedStatus = true;
			$scope.$apply($scope.speedStatus);
		}
	},function(){
	});
	
	// 开始朗读/关闭朗读按钮处理
	$scope.readit = function() {
		if (resizeTimer) {
            clearTimeout(resizeTimer);
        }
        resizeTimer = setTimeout(function() {
        	if(rs == 0) {
        		//gm.voice.stopTTS(iBuickData.sharedObject.ttsHandle);
    			$timeout(function () {
    				$scope.btnimg = "assests/images/closetts.png";
    				//gmInfoFactory.startTTS($scope.title + $scope.message)
    				iBuickData.sharedObject.ttsHandle = gm.voice.startTTS(function(){
    				   $scope.btnimg = "assests/images/ttsbtn.png";
    				   $scope.$apply($scope.btnimg);
    				}, function(){   					
    				}, $scope.title + $scope.message);
    				rs = 1;        			
    			}, 500);
    		}
    		else{
    			$timeout(function(){
    				$scope.btnimg = "assests/images/ttsbtn.png";
    				gm.voice.stopTTS(iBuickData.sharedObject.ttsHandle);
        			rs = 0;
    			},500);   			
    		};
        }, 800);
	};
	
	$scope.closeapp = function() {
		gmInfoFactory.shutdownApplication();
		//window.showspinner();
		//$timeout(function() {
		//	gmInfoFactory.shutdownApplication();
		//}, 20);
	};
	
});
