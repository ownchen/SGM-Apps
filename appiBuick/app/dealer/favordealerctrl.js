ibuickApp.controller('CtrlFavorDealerView', function ($scope, gmInfoFactory, remoteServiceFactory, 
		iBuickData, popup, $location, $timeout) {

	$scope.dealers = [];
	
	$scope.listPos = 0;
	
	$scope.listlength = 0;
	$scope.initpos = 0;
	
	$scope.spinconfig = {lines:12,color: '#000'};
	$scope.loading = true;
	$scope.errormsg = "";
	
	
	$scope.$on('$viewContentLoaded', function() {
		window.hidespinner();
		$timeout(function() {init();}, 0.5);
	});
	

	//init();

	function init() {
		gmInfoFactory.recordPV("查经销商-重置常用经销商");
		
		$scope.errormsg = "请求服务器数据中......";
		iBuickData.sharedObject.localdealers = [];
		loadDataFromServer();
	};

	function loadDataFromServer() {
		$scope.spinif = true;

		gmInfoFactory.getLatlng().
			then(function(latlng) {
				$scope.Latlng = latlng;
				return latlng;
			}).
			then(function(latlng) {
				return remoteServiceFactory.getCurrentCity(latlng.Lng, latlng.Lat);
			}).
			then(function(response) {
				if(response.data.ats.code === "1") {
					$scope.city           = response.data.ats.city;
					$scope.cityadcode     = response.data.ats.cityadcode;
					$scope.provinceadcode = response.data.ats.provinceadcode;
					$scope.cityadcode     = iBuickData.transCityCode($scope.cityadcode, $scope.provinceadcode);
					// $log.log("city code:"+$scope.cityadcode);
					return $scope.cityadcode;
				} else {
					$scope.city = "上海";
					$scope.cityadcode = "3101";
					return $scope.cityadcode;
				}
			}).
			then(function(cityadcode) {
				return remoteServiceFactory.getDealersByCity(cityadcode);
			}).
			then(function(response) {
				if(response.status === 200) {
					if(angular.isDefined(response.data.dealer) && response.data.dealer.length > 0) {
						var data = response.data.dealer;
		      				if (data instanceof Array) {
		      					for (var dealer in data) {
		      						var salelng = data[dealer].salelng;
		      						var salelat = data[dealer].salelat;
		      						var name = data[dealer].name;
		      						var saleaddress = data[dealer].saleaddress;
		      						var servicetel = data[dealer].servicetel;
		      						var distance = data[dealer].distance;
		      						var id = data[dealer].id;
		      						var title = data[dealer].shortName;
		      						iBuickData.sharedObject.localdealers.push({'id':id, 'title':title, 'distance':distance, 'longitude':salelng, 'latitude':salelat, 'name':name, 'address':saleaddress,'telephone':servicetel});     						
		      					}
		      				}
		      			}
			    	}			  		
			  		$scope.listlength = iBuickData.sharedObject.localdealers.length;
		  			if($scope.listlength > 0) {
		  				$scope.listlength = ($scope.listlength -1)/2+0.5;
			  		}
			  		$scope.dealers = iBuickData.sharedObject.localdealers;
			  	}).
			  	then(function(){
				$scope.spinif = false;
				if(iBuickData.sharedObject.localdealers.length > 0) {
					$scope.loading = false;
				} else {
					$scope.errormsg = "该城市没有经销商";
				}
			}, function() {
				$scope.errormsg = "网络数据请求失败，请稍候尝试";
				$scope.spinif = false;
			});
	};

	$scope.rowindex = function (index) {
		if($scope.spinif == true) {
			return;
		}
		$scope.listPos = index;
		$scope.$apply($scope.listPos);
	};

	$scope.clickedrow = function (index) {
			var data = iBuickData.sharedObject.localdealers;
			for (var i=0; i<data.length;i++) {
				var id = data[i].id;
				if (index === id) {
					iBuickData.updateFavorDealer(data[i]);
					break;
				}
			}
			//UI frozen, delay 30ms
	    	$timeout(function() {
	    		popup.popup({
	    			templateUrl:"app/common/confirmpopup.html",
	    			title:"设置成功",
	    			success:{fn:function() {
	    				window.showspinner();
	    				//$location.path('/dealer/1/0');
	    				$timeout(function() {
	    					$location.path("/dealer/1/0");
	    				}, 20);
	    				}},
	    		});}, 50);
	};
		
	$scope.back = function() {
		//var hash = iBuickData.sharedObject.dealerListReturnUrl;
		
		//if(hash) {
		//	$location.path(hash);
		//} else {
		    window.showspinner();
			//$location.path('/dealer/1/0');
		    $timeout(function() {
				$location.path("/dealer/1/0");
			}, 20);
		//}
	};
	
	$scope.closeapp = function() {
		gmInfoFactory.shutdownApplication();
	};
});

