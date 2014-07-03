ibuickApp.controller('CtrlDealerView', function ($scope, $routeParams, $timeout, $location, $window, gmInfoFactory, 
		remoteServiceFactory, iBuickData, popup) {
	
	$scope.Latlng = {};
	$scope.currentdealer = iBuickData.favorDealer;
	$scope.listlength    = 0;
	$scope.initpos       = 0;
	$scope.index         = 0;
	
	$scope.spinconfig = {lines:12,color: '#000'};
	$scope.loading    = true;
	$scope.errormsg   = "";
	$scope.ifshow = true;
	
	
	$scope.$on('$viewContentLoaded', function() {
		window.hidespinner();
		$timeout(function() {init();}, 0.5);
	});
	
	//init();
	/*
	 * 在转向该视图时，url参数为：
	 * reloadit: 1 = 重新从服务器上下载数据
	 * rowindex: 在不需要重新下载数据时，返回时，显示的是哪个元素
	 */
	function init() {
		gmInfoFactory.recordPV("查经销商");
		// $log.log($routeParams.reloadit);
		// reloadit = 1，重新装载数据
		if($routeParams.reloadit == 1) {
			iBuickData.sharedObject.dealers = [];
			// 1， 如果有常用经销商
			if(angular.isObject(iBuickData.favorDealer) && !angular.isUndefined(iBuickData.favorDealer.id)) {
				iBuickData.sharedObject.dealers.push(iBuickData.favorDealer);
			}
			$scope.errormsg = "请求服务器数据中......";
			loadDataFromServer();
		} else {
			// 不用重新装载
			var rowind = 0;
			if($routeParams.rowindex) {
				rowind = parseInt($routeParams.rowindex + "");
			}
			// 设置list和item
			setData(rowind);
			$scope.listlength = iBuickData.sharedObject.dealers.length;;
			$scope.initpos    = rowind;
			$scope.index      = rowind;
			gmInfoFactory.getLatlng().then(function (latlng) {
				$scope.Latlng = latlng;
			});
		}
	};

	// 从服务器装载数据
	function loadDataFromServer() {
		$scope.spinif = true;
		gmInfoFactory.getLatlng().
			then(function(latlng) {
		  		$scope.Latlng = latlng;
		  		return latlng;
		  	}).
		  	then(function(latlng) {
		  		return remoteServiceFactory.getDealersByLat(latlng.Lng, latlng.Lat);
		  	}).
		  	then(function(response) {
		  		//$log.log(response)
		  		if(response.status === 200) {
		  			if(angular.isDefined(response.data.dealer) && response.data.dealer.length > 0) {
		  				var data = response.data.dealer;
		  				//$log.log(data);
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
		  						iBuickData.sharedObject.dealers.push({'id':id, 'distance':distance, 'longitude':salelng, 'latitude':salelat, 'title':title, 'name':name, 'address':saleaddress,'telephone':servicetel});
		  					}
		  				}
		  			}
		  			// $log.log(iBuickData.sharedObject.dealers);
		  		}
		  		
		  		$scope.listlength = iBuickData.sharedObject.dealers.length;
		  		if($scope.listlength > 0) {
		  			setData(0);
		  		}
		  		return $scope.Latlng;
		  	}).
		  	then(function(latlng) {
		  		return remoteServiceFactory.getCurrentCity(latlng.Lng, latlng.Lat);
		  	}).
		  	then(function(response) {
		  		// $log.log(response)
		  		if(response.data.ats.code === "1") {
		  			iBuickData.sharedObject.city = response.data.ats.city;
		  			return iBuickData.sharedObject.city;
		  		} else {
		  			return "上海";
		  		}
		  	}).
		  	then(function(){
		  		$scope.spinif = false;
		  		if(iBuickData.sharedObject.dealers.length === 0) {
		  			$scope.errormsg = "没有经销商数据";
		  		}
		  	}, function() {
		  		$scope.spinif = false;
		  		//$log.log('网络请求出错');
		  		if(iBuickData.sharedObject.dealers.length === 0) {
		  			//todo: 加入弹出框，告知获取数据为空
		  			$scope.errormsg = "没有经销商数据";
		  		} else {
		  			$scope.listlength = iBuickData.sharedObject.dealers.length;
		  			if($scope.listlength > 0) {
			  			setData(0);
			  			$scope.initpos = 0;
			  		}
		  		}
		  	});
	};

	function setData(index) {
		$scope.loading = false;
		if(index == 0 && (angular.isObject(iBuickData.favorDealer) && !angular.isUndefined(iBuickData.favorDealer.id))) {
			$scope.title = "常用经销商";
			$scope.citydisplayname = "";
			$scope.btnimgurl = 'assests/images/changesetting.png';
			$scope.ifshow = true;
		}
		else {
			$scope.title = "附近经销商";
			$scope.citydisplayname = iBuickData.sharedObject.city;
			$scope.btnimgurl = 'assests/images/setasdefault.png';
			$scope.ifshow = false;
		}
		$scope.currentdealer = iBuickData.sharedObject.dealers[index];
		//$scope.$apply($scope.currentdealer);
	};
	  
	// 显示当前经销商信息
	$scope.rowindex = function(index) {
		if(index > iBuickData.sharedObject.dealers.length - 1) {
			return;
		}
		
		if($scope.spinif == true) {
			return;
		}
		$scope.index = index;
		$scope.$apply(index);
		setData(index);
		$scope.initpos = index -1;
		$scope.$apply($scope.currentdealer);
	};

	// 拨打电话
	$scope.callit = function (phone) {
		phone = phone.replace(/[\D|\s]/g, "");
		gmInfoFactory.makePhoneCall(phone).then(function() {
			gm.system.requestFocus(function(){}, function(){});
		}, function() {
			gm.system.requestFocus(function(){}, function(){});
		});
	};

	$scope.dial = function (phone) {
		popup.popup({
			title:'即将拨打电话',
			message:phone,
			success:{fn:function() { $scope.callit(phone);}},
		});
	};

	// 跳转到本市经销商视图
	$scope.showlocaldealer = function() {
		if (iBuickData.favorDealer && (iBuickData.favorDealer.id === $scope.currentdealer.id)) {
			iBuickData.sharedObject.dealerListReturnUrl = "/dealer/0";
			
			window.showspinner();
			//$location.path('/dealerconfig');
			$timeout(function() {
				$location.path("/dealerconfig");
			}, 20);
		}
		else {
			if(angular.isDefined(iBuickData.favorDealer) && iBuickData.favorDealer){
				iBuickData.sharedObject.dealers.unshift($scope.currentdealer);
			} else {
				iBuickData.sharedObject.dealers[0] = $scope.currentdealer;
			}
			iBuickData.updateFavorDealer($scope.currentdealer);
			
			setData(0);
			$scope.listlength = iBuickData.sharedObject.dealers.length;;
			$scope.initpos    = 0;
		}
	};

	//显示标注点地图
	$scope.markersmap = function() {
		if($scope.spinif == true) {
			return;
		}
		if(iBuickData.sharedObject.dealers.length <=0) {
			return;
		}
		if($window.mapscriptloaded == false) {
			$timeout(function() {
				popup.popup({
					templateUrl:"app/common/confirmpopup.html",
					title:"地图加载失败",
					success:{fn:function() {
						$window.loadGaodeScript();
					}},
				});}, 30);	
		}
		else {
			iBuickData.sharedObject.mapReturnUrl = "/dealer/0/" +$scope.index;
			iBuickData.sharedObject.mapmode = "marker";
			iBuickData.sharedObject.markers = [];
			iBuickData.sharedObject.marktype = 1;

			for(var i=0; i<iBuickData.sharedObject.dealers.length; i++) {
				var marker = {};
				marker.longitude = iBuickData.sharedObject.dealers[i].longitude;
				marker.latitude  = iBuickData.sharedObject.dealers[i].latitude;
				marker.name      = iBuickData.sharedObject.dealers[i].name;
				marker.telephone = iBuickData.sharedObject.dealers[i].telephone;
				marker.address   = iBuickData.sharedObject.dealers[i].address;

				iBuickData.sharedObject.markers.push(marker);
			}
			
			window.showspinner();
			//$location.path("/map");
			$timeout(function() {
				$location.path("/map");
			}, 20);
		}
	};

	//显示路径
	$scope.checkpath = function() {
		if(window.mapscriptloaded == false){
			$timeout(function() {
				popup.popup({
					templateUrl:"app/common/confirmpopup.html",
					title:"地图加载失败",
					success:{fn:function() {
						setTimeout($window.loadGaodeScript(), 200);
					}},
				});}, 30);	
		} else {
			iBuickData.sharedObject.mapReturnUrl = "/dealer/0/" + $scope.index;
			iBuickData.sharedObject.mapmode = "path";
			iBuickData.sharedObject.location = {};
			iBuickData.sharedObject.location.longitude  = $scope.Latlng.Lng;
	    	iBuickData.sharedObject.location.latitude   = $scope.Latlng.Lat;
			iBuickData.sharedObject.destenation = {longitude: $scope.currentdealer.longitude, latitude:$scope.currentdealer.latitude};
			
			window.showspinner();
			//$location.path("/map");
			$timeout(function() {
				$location.path("/map");
			}, 20);
		}
	};
	
	$scope.back = function() {
		window.showspinner();
		//$location.path("/home");
		$timeout(function() {
			$location.path("/home");
		}, 20);
	};
});

