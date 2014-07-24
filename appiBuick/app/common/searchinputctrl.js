ibuickApp.controller('CtrlSearchInputView', function ($scope, iBuickData, $location, $timeout, gmInfoFactory,popup) {
	
	//init();
	$scope.$on('$viewContentLoaded', function() {
		window.hidespinner();
		$timeout(function() {init();}, 0.5);
	});
	
	function init() {
		//$log.log($scope.inputkeyword);
		iBuickData.sharedObject.searhKeyword = 0;
	};
	
	$scope.searchit = function (wordinput) {
		iBuickData.sharedObject.searhKeyword = wordinput;
		
		/*
		$timeout(function () {
			$location.path('/search');
		}, 10);
		*/
		
	};
	
	$scope.search = function() {
		iBuickData.sharedObject.searhKeyword=document.getElementById("searhKeyword").value;
		console.log(iBuickData.sharedObject.searhKeyword)
//		alert(iBuickData.sharedObject.searhKeyword)
		$timeout(function () {
			if(angular.isUndefined(iBuickData.sharedObject.searhKeyword) || iBuickData.sharedObject.searhKeyword == "") {
				$timeout(function() {
					popup.popup({
						templateUrl:"app/common/confirmpopup.html",
						title:"请您输入关键字",
						success:{fn:function() {}},
					});}, 30);	
				return;
			}
			//$log.log(iBuickData.sharedObject.searhKeyword)
			window.showspinner();
			//$location.path('/search');
			$timeout(function() {
				$location.path("/search");
			}, 20);
		}, 10);
	};
	
	$scope.back = function() {
		var hash = iBuickData.sharedObject.searchListReturnUrl;
		
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
	
	$scope.closeapp = function() {
		gmInfoFactory.shutdownApplication();
	};
});
