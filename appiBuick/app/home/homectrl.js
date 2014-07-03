// 视图控件定义
ibuickApp.controller('CtrlHomeView', function ($scope, $location, $timeout, gmInfoFactory, remoteServiceFactory, popup, iBuickData) {
	$scope.LatLng = {Lat:0, Lng:0};
	
	init();
	//$scope.helpview = true;
	
	/*
	$scope.$on('$viewContentLoaded', function() {
		// console.log('view changed');
		//init();
		$timeout(function() {
			gmInfoFactory.recordPV("APP首页");
		}, 1);
	});
	*/
	
	function init() {
		//gmInfoFactory.watchSpeedChange();
		if(iBuickData.helpview && iBuickData.helpview.helpthem === "yes") {
			$scope.helpview = false;
		} else {
			$scope.helpview = true;
		}
		
		gmInfoFactory.recordPV("APP首页");
		window.hidespinner();
	};
	
	function saveHelpViewData() {
		if($scope.helpview == false) {
			$scope.helpview = true;
			iBuickData.helpview.helpthem = "no";
			iBuickData.saveHelpViewData();
		}
	};
	
	// 拨打热线电话
	$scope.hotline = function (phone) {
		saveHelpViewData();
		popup.popup({
			success:{fn:function() { $scope.callit(phone);}},
			title:"确认",
			message:"请问要拨打这个电话吗?"
		});
	};
	
	// 关闭程序
	$scope.shutdownApp = function() {
		//window.showspinner();
		saveHelpViewData();
		if(iBuickData.sharedObject.ttsHandle) {
			gm.voice.stopTTS(iBuickData.sharedObject.ttsHandle);
		}
		gmInfoFactory.shutdownApplication();
		//$timeout(function() {
		//	gmInfoFactory.shutdownApplication();
		//}, 20);
	};
	
	// 跳转至相关页面
	$scope.gotoview = function(hash) {
		saveHelpViewData();
		//window.showspinner();
		
		//$timeout(function() {
		//	$location.path(hash);
		//}, 20);
		
		gmInfoFactory.checkNetwork().then(function() {
			
			window.showspinner();
			// $location.path(hash);
			
			$timeout(function() {
				$location.path(hash);
			}, 20);
			
		}, function() {
			$timeout(function() {
				popup.popup({
					templateUrl:"app/common/confirmpopup.html",
					title:"该功能未联网状态下无法使用",
	    			success:{fn:function() {}},
				});}, 50);
		});
	};
	
	$scope.gotoview2 = function(hash) {
		saveHelpViewData();
		
		window.showspinner();
		// $location.path(hash);
		$timeout(function() {
			$location.path(hash);
		}, 20);
	};
	
	// 拨打电话
	$scope.callit = function (phone) {
		gmInfoFactory.makePhoneCall(phone).then(function() {
			gm.system.requestFocus(function(){}, function(){});
		}, function() {
			gm.system.requestFocus(function(){}, function(){});
		});
	};

	/*

	$scope.readit = function(){
		gmInfoFactory.checkNetwork().then(function(){
				window.location.href="#/indicatorlight";
		},function(){
				window.location.href="#/dealer/:reloadit/:rowindex";
		});
	};
			
	
	// 处理离开逻辑
	$scope.$on('$locationChangeStart', function(scope, next, current) {
		// 如果是地图视图，如果地图javascript没有装载进来那么不跳转
		var re = /\/map/i;
		var found = next.match(re);
		if (found != null) {
			if ($window.mapscriptloaded != true) {
				if($window.scriptloaderror == true) {
					// 重新装载
					$window.loadGaodeScript();
				}
				scope.preventDefault();
			}
		}
	});

	// 在切换到这个view，并渲染好后
	$scope.$on('$viewContentLoaded', function() {
		//setTimeout(init(), 200);
	});
	
	$scope.$on('speedStatus', function(speedStatus){
		popup.popup({
			templateUrl:"app/common/confirmpopup.html",
			success:{fn:function() {}},
		});
	});
	*/
});
