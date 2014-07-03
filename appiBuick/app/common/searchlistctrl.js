ibuickApp.controller('CtrlSearchListView', function ($scope, remoteServiceFactory, gmInfoFactory, 
		iBuickData, $location, $timeout) {

	$scope.keywordresult = [];
	
	$scope.Latlng = {};
	$scope.listPos = 0;
	
	$scope.listlength = 0;
	$scope.initpos = 0;
	
	$scope.spinconfig = {lines:12,color: '#000'};
	$scope.loading = true;
	$scope.errormsg = "";
	
    //init();
	$scope.$on('$viewContentLoaded', function() {
		window.hidespinner();
		$timeout(function() {init();}, 0.5);
	});

    function init() {
    	$scope.errormsg = "搜索中......";
		iBuickData.sharedObject.searchResults = [];
		//var keyword = "上海南站";
		var keyword = iBuickData.sharedObject.searhKeyword;
		loadDataFromServer(keyword);
    };
    
    function loadDataFromServer(keyword) {
    	$scope.spinif = true;
    	
    	gmInfoFactory.getLatlng().
		then(function(latlng) {
	  		$scope.Latlng = latlng;
	  		return latlng;
	  	}).then(function(latlng) {
	  		return remoteServiceFactory.getCurrentCity(latlng.Lng, latlng.Lat);
	  	}).then(function(response) {
	  		//$log.log(response)
	  		if(response.data.ats.code === "1") {
	  			$scope.citycode = response.data.ats.citycode;
	  			return $scope.citycode;
	  		} else {
	  			$scope.citycode = "";
	  			return $scope.citycode;
	  		}
	  	}).then(function(citicode) {
	  		return remoteServiceFactory.searchKeywords(citicode, keyword);
	  	}).then(function(response) {
	  		//$log.log(response);
	  		if(response.data.ats.code === "1") {
	  			if(angular.isDefined(response.data.ats.tip_list.tip) && response.data.ats.tip_list.tip.length >0) {
	  				var tips = response.data.ats.tip_list.tip;
	  				if (tips instanceof Array) {
	  					for (var tip in tips) {
	  						iBuickData.sharedObject.searchResults.push({'id':tip, 'title':tips[tip]});
	  					}
	  				} else {
	  					iBuickData.sharedObject.searchResults.push({'id':0,'title':keyword});
	  				}
	  			} else {
	  				iBuickData.sharedObject.searchResults.push({'id':0,'title':keyword});
	  			}
	  		} else {
	  			iBuickData.sharedObject.searchResults.push({'id':0,'title':keyword});
	  		}
	  		//$log.log(iBuickData.sharedObject.searchResults);
	  		$scope.listlength = iBuickData.sharedObject.searchResults.length;
			if($scope.listlength > 0) {
				$scope.listlength = ($scope.listlength - 2)/2+0.5;
			}
	  		$scope.keywordresult = iBuickData.sharedObject.searchResults;
	  		return;
	  	}).then(function() {
	  		$scope.spinif = false;
			if(iBuickData.sharedObject.searchResults.length > 0) {
				$scope.loading = false;
			} else {
				$scope.errormsg = "没有搜索到相关的地址";
			}
	  	}, function() {
	  		$scope.errormsg = "网络数据请求失败，请稍候尝试";
			$scope.spinif = false;
	  	});
    };
    
	$scope.rowindex = function (index) {
		$scope.listPos = index;
		$scope.$apply($scope.listPos);
	};

	$scope.clickedrow = function (index) {
		if(angular.isDefined(iBuickData.sharedObject.searchResults[index]))
		var words = iBuickData.sharedObject.searchResults[index].title;
		//$log.log(words);
		$timeout(function () {
			getLatLngFromServer(words);
		}, 10);
	};
	
	$scope.back = function() {
		window.showspinner();
		//$location.path('/keyboard');
		$timeout(function() {
			$location.path("/keyboard");
		}, 20);
	};
	
	$scope.closeapp = function() {
		gmInfoFactory.shutdownApplication();
		//window.showspinner();
		//$timeout(function() {
		//	gmInfoFactory.shutdownApplication();
		//}, 20);
	};
	
	function getLatLngFromServer(searchword) {
		$scope.spinif = true;
		remoteServiceFactory.getLatLngOfAddress(searchword).then(function(response) {
			$scope.spinif = false;
			//$log.log(response);
			if(response.data.ats.code === "1") {
				if(angular.isDefined(response.data.ats.geocode) && angular.isObject(response.data.ats.geocode)) {
					if(angular.isDefined(response.data.ats.geocode.latitude) && angular.isDefined(response.data.ats.geocode.longitude)) {
						iBuickData.sharedObject.searchLatlng = {Lat:response.data.ats.geocode.latitude, Lng: response.data.ats.geocode.longitude};
						// $log.log(iBuickData.sharedObject.searchLatlng)
						var hash = "";
						if(iBuickData.sharedObject.searchFrom ===  "gasstation") {
							hash += "/gasstation/2/0/";
						}
						if(iBuickData.sharedObject.searchFrom ===  "parking") {
							hash += "/parking/2/0/";
						}
						hash += iBuickData.sharedObject.searchLatlng.Lng + "/" + iBuickData.sharedObject.searchLatlng.Lat + "/0";
						//$log.log(hash);
						window.showspinner();
						//$location.path(hash);
						$timeout(function() {
							$location.path(hash);
						}, 20);
					} else {
						$scope.loading = true;
						$scope.errormsg = "地理位置信息错误";
					}
				}
			} else {
				$scope.loading = true;
				$scope.errormsg = "没有取到相应的地理位置";
			}
		}, function() {
			$scope.spinif = false;
			$scope.loading = true;
			$scope.errormsg = "请求服务器数据失败";
		});
	};
	  
});
