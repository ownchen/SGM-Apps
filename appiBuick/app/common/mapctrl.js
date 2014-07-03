/*
 * 可以使用动态路由跳转到地图视图
 * 通过iBuickData.sharedObject来传递数据，可以传入的有location, destination
 */
ibuickApp.controller('CtrlMapView', function ($scope, $timeout, remoteServiceFactory, iBuickData, $location, gmInfoFactory) {
	//$scope.pathlist = [];

	$scope.zoominplus = 0;
	$scope.zoomminus  = 0;
	
	$scope.marktype = 0;
	
	//var zoomcount = 0;
	
	// 改变视野
	$scope.zoomin = function() {
		//zoomcount ++;
		//if(zoomcount < 8) {
			$scope.zoominplus ++;
		//} else {
		//	zoomcount = 7;
		//}
		
	};
	
	$scope.zoomout = function() {
		//zoomcount --;
		//if(zoomcount > -5) {
			$scope.zoomminus ++;
		//} else {
		//	zoomcount = -4;
		//}
		
	};
	
	$scope.back = function() {
		var hash = iBuickData.sharedObject.mapReturnUrl;
		if(hash) {
			window.showspinner();
			//$location.path(hash);
			$timeout(function() {
				$location.path(hash);
			}, 20);
		} else {
			window.showspinner();
			//$location.path('/home');
			$timeout(function() {
				$location.path("/home");
			}, 20);
		}
	};
	
    //init();
	$scope.$on('$viewContentLoaded', function() {
		window.hidespinner();
		$timeout(function() {init();}, 0.5);
	});

    function init() {
		// 1. 设置当前位置
    	$scope.marktype = iBuickData.sharedObject.marktype;
    	
		if(iBuickData.sharedObject.location) {
			$scope.location = iBuickData.sharedObject.location;
		} else {
			$scope.location = {longitude: 121.60079956054688, latitude:31.214361335028343 }; // 上海
		}
		
    	if(iBuickData.sharedObject.mapmode == "marker") {
    		// 4. 获取marks
        	if(iBuickData.sharedObject.markers && angular.isArray(iBuickData.sharedObject.markers)) {
        		$scope.markers = iBuickData.sharedObject.markers;
        	}
    	} else {
    		// 2. 设置目的位置
    		if(iBuickData.sharedObject.destenation) {
    			$scope.destenation = iBuickData.sharedObject.destenation;
    		} else {
    			$scope.destenation =  {longitude: 121.6807995605468, latitude:31.244361335028343 };
    		}

    		// 3. 获取路径数据数组
    		remoteServiceFactory.getPathArray($scope.location.longitude,    $scope.location.latitude, 
    									      $scope.destenation.longitude, $scope.destenation.latitude ).then(function(response){
    			if(response.data.ats.code === "1") {
    				$scope.pathlist = response.data.ats.path_list.path;
    				//$log.log($scope.pathlist);
    			}
    		}, function(){
    	    });
    	}
    }; 
    
    $scope.makephonecall = function (telephone) {
    	gmInfoFactory.makePhoneCall(telephone).then(function(){
			gm.system.requestFocus(function(){}, function(){});
		}, function() {
			gm.system.requestFocus(function(){}, function(){});
		});
    };
    
});
