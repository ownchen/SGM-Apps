ibuickApp.controller('CtrlParkingListDetailView', function($scope, $route, $routeParams, $location, $q, gmInfoFactory, 
						remoteServiceFactory, iBuickData, popup, $window, $timeout, $log) {
	$scope.Latlng = {};
	$scope.imgSrc = "addfav.png";
	
	// 设置左侧滚动条相关变量
	$scope.maxno   = 0;
	$scope.initpos = 0;
	$scope.index   = 0;
	$scope.totalno = 0;
	
	$scope.spinconfig = {lines:12,color: '#000'};
	$scope.loading    = true;
	$scope.errormsg   = "";
	$scope.iftype = true;
	
	$scope.currentParking = {};
	
	//iBuickData.sharedObject.searchLatlng  = {};
	
	$scope.$on('$viewContentLoaded', function() {
		$window.hidespinner();
		$timeout(function() {init();}, 0.5);
	});
	//init();
	
	function init() {
		gmInfoFactory.recordPV("找停车场");
		// $log.log($routeParams.reloadit);
		// reloadit = 1，从服务器重新装载数据，以当前的经度，纬度作为条件
		// reloadit = 2, 使用某个地址的经度，纬度作为条件
		// reloadit = 3, 从收藏里获取数据
		// 其它值，从地图等页面返回，无需重新装载数据
		// 1. 设置filter 0 , 1 or 2
		$scope.index   = 0;
		iBuickData.sharedObject.searchFilter = $routeParams.filter;
		
		if($routeParams.reloadit == 1) {
			iBuickData.sharedObject.totalParkings = 0;
			iBuickData.sharedObject.parkingviewmode = "nearby";
			$scope.pagetitle = "附近停车场";
			iBuickData.sharedObject.parkings = [];
			$scope.errormsg = "请求服务器数据中......";
			loadDataFromServer($scope.Latlng.Lat, $scope.Latlng.Lng, 1);
		} else if($routeParams.reloadit == 2) {
			iBuickData.sharedObject.totalParkings = 0;
			iBuickData.sharedObject.searchLatlng  = {};
			iBuickData.sharedObject.parkingviewmode = "search";
			$scope.pagetitle = "目的地停车场";
			iBuickData.sharedObject.parkings = [];
			var lat = $routeParams.lat;
			var lng = $routeParams.lng;
			iBuickData.sharedObject.searchLatlng.Lat = lat;
			iBuickData.sharedObject.searchLatlng.Lng = lng;
			$scope.errormsg = "请求服务器数据中......";
			loadDataFromServer(lat, lng, 1);
		} else if($routeParams.reloadit == 3) {
			iBuickData.sharedObject.totalParkings = 0;
			iBuickData.sharedObject.parkingviewmode = "fav";
			$scope.pagetitle = "收藏的停车场";
			iBuickData.sharedObject.parkings = [];
			gmInfoFactory.getLatlng().then(function (latlng) {
				$scope.Latlng = latlng;
			});
			loadDataFromFavor();
		} else {
			$scope.pagetitle = iBuickData.sharedObject.lastPageTitle;
			// $log.log($routeParams.rowindex)
			var rowind = 0;
			if($routeParams.rowindex) {
				rowind = parseInt($routeParams.rowindex + "");
			}
			//$log.log(iBuickData.sharedObject.parkings[rowind])
			// 设置scroller和item
			
			$scope.totalno   = iBuickData.sharedObject.totalParkings;
			$scope.maxno = iBuickData.sharedObject.parkings.length;
			$scope.initpos = rowind;
			$scope.index   = rowind;
			$scope.pagetitle = iBuickData.sharedObject.lastPageTitle;
			gmInfoFactory.getLatlng().then(function (latlng) {
				$scope.Latlng = latlng;
			});
			if(iBuickData.sharedObject.totalParkings <= 0) {
				$scope.loading  = true;
				$scope.errormsg = "没有停车场数据";
				return;
			}
			setData(rowind);
		}
	};
	
	// 从服务器获取数据
	// pageno:要获取的页数
	// lat,lng:经度，维度
	function loadDataFromServer(lat, lng, pageno) {
		$scope.spinif = true;
		iBuickData.sharedObject.currentPage = pageno; 
		gmInfoFactory.getLatlng().
			then(function (latlng) {
				$scope.Latlng = latlng;
		  		return latlng;
			}).
			then(function(latlng) {
				if(iBuickData.sharedObject.parkingviewmode === "nearby") {
					return remoteServiceFactory.getParkings($scope.Latlng.Lng, $scope.Latlng.Lat, pageno, iBuickData.sharedObject.searchFilter);
				} else {
					return remoteServiceFactory.getParkings(lat, lng, pageno, iBuickData.sharedObject.searchFilter);
				}
			}).
			then(function(response) {
				//$log.log(response);
				if (response.data.ats.code === "1") {
					if (response.data.ats.total > 0) {
						iBuickData.sharedObject.totalParkings = response.data.ats.total;
						var data = response.data.ats.parkings.item;
						if ((data instanceof Array) && response.data.ats.parkings.item.length > 0) {
							for (var parking in data) {
								setOneItem(data[parking]);
							} 
						} else if(angular.isObject(data)) {
							setOneItem(data);
						}
						$scope.totalno = iBuickData.sharedObject.totalParkings;
						$scope.maxno = iBuickData.sharedObject.parkings.length;
					}
				} else {
					//return $q.reject();
				}
			}).
			then(function() {
				$scope.spinif = false;
				//$log.log(iBuickData.sharedObject.parkings);
				if(iBuickData.sharedObject.totalParkings > 0) {
		  			setData((pageno-1) * 20); // 每页20个
		  			$scope.initpos = (pageno-1) * 20;
		  			$scope.index = (pageno-1) * 20;
		  		} else {
		  			$scope.errormsg = "没有停车场数据";
		  		}
			}, function() {
				// 这里要做提示，等下一步完善
				//$log.log("获取数据失败。");
				$scope.spinif = false;
				$scope.errormsg = "获取停车场数据失败";
			});
	};
	
	function setOneItem(item) {
		var tmp = {};
		tmp.address   = item.address;
		tmp.distance  = item.distance;
		tmp.id        = item.id;
		tmp.latitude  = item.latitude;
		tmp.longitude = item.longitude;
		tmp.name      = item.name;
		tmp.telephone = item.tel;
		if(angular.isObject(item.parkinfo)) {
			tmp.category           = item.parkinfo.category;
			tmp.charge             = item.parkinfo.charge;
			tmp.price_allday       = item.parkinfo.price_allday;
			tmp.price_dayfirsthour = item.parkinfo.price_dayfirsthour;
			tmp.price_dayhour      = item.parkinfo.price_dayhour;
			tmp.price_nighthour    = item.parkinfo.price_nighthour;
		} else {
			
		}
		iBuickData.sharedObject.parkings.push(tmp);
	};
	
	// 设置某个单元数据
	function setData(index) {
		$scope.loading = false;
		$scope.imgSrc = "addfav.png";
		
		$scope.currentParking.charge = "价格未知";
		
		if(angular.isDefined(iBuickData.sharedObject.parkings[index].price_allday) && iBuickData.sharedObject.parkings[index].price_allday != "") {
			$scope.currentParking.charge = iBuickData.sharedObject.parkings[index].price_allday + "元/天";
		}
		if(angular.isDefined(iBuickData.sharedObject.parkings[index].price_dayfirsthour) && iBuickData.sharedObject.parkings[index].price_dayfirsthour != "") {
			$scope.currentParking.charge = iBuickData.sharedObject.parkings[index].price_dayfirsthour + "元/小时";
		}
		$scope.currentParking.distance = iBuickData.sharedObject.parkings[index].distance + "米";
		//if(angular.isDefined(iBuickData.sharedObject.parkings[index].charge) && iBuickData.sharedObject.parkings[index].charge === "否") {
		//	$scope.currentParking.charge = "免费";
		//} else if(angular.isDefined(iBuickData.sharedObject.parkings[index].charge) && iBuickData.sharedObject.parkings[index].charge === "是") {
		//	$scope.currentParking.charge = iBuickData.sharedObject.parkings[index].price_dayfirsthour + "元/小时";
		//}
		if(angular.isDefined(iBuickData.sharedObject.parkings[index].price_allday) && iBuickData.sharedObject.parkings[index].price_allday != "") {
			$scope.priceallday = true;
			$scope.currentParking.priceallday = iBuickData.sharedObject.parkings[index].price_allday;
		} else {
			$scope.priceallday = false;
		}
		if(angular.isDefined(iBuickData.sharedObject.parkings[index].price_dayfirsthour) && iBuickData.sharedObject.parkings[index].price_dayfirsthour != "") {
			$scope.pricedayfirsthour = true;
			$scope.currentParking.pricedayfirsthour = iBuickData.sharedObject.parkings[index].price_dayfirsthour;
		} else {
			$scope.pricedayfirsthour = false;
		}
		if(angular.isDefined(iBuickData.sharedObject.parkings[index].price_dayhour) && iBuickData.sharedObject.parkings[index].price_dayhour != "") {
			$scope.pricedayhour = true;
			$scope.currentParking.pricedayhour = iBuickData.sharedObject.parkings[index].price_dayhour;
		} else {
			$scope.pricedayhour = false;
		}
		if(angular.isDefined(iBuickData.sharedObject.parkings[index].price_nighthour) && iBuickData.sharedObject.parkings[index].price_nighthour != "") {
			$scope.pricenighthour = true;
			$scope.currentParking.pricenighthour = iBuickData.sharedObject.parkings[index].price_nighthour;
		} else {
			$scope.pricenighthour = false;
		}
		$scope.priceinfo = !$scope.pricenighthour && !$scope.priceallday && !$scope.pricedayfirsthour && !$scope.pricedayhour;
		
		
		$scope.currentParking.parkingid = iBuickData.sharedObject.parkings[index].id;
		$scope.currentParking.name = iBuickData.sharedObject.parkings[index].name;
		$scope.currentParking.address = iBuickData.sharedObject.parkings[index].address;
		$scope.currentParking.id = index;
		$scope.currentParking.latitude = iBuickData.sharedObject.parkings[index].latitude;
		$scope.currentParking.longitude = iBuickData.sharedObject.parkings[index].longitude;
		$scope.currentParking.telephone = iBuickData.sharedObject.parkings[index].telephone;
		$scope.currentParking.category = iBuickData.sharedObject.parkings[index].category;
		

		if($scope.currentParking.category) {
			$scope.iftype = false;
		}else{
			$scope.iftype = true;
		}
		

		var favorParking = iBuickData.favorParking;
		if (favorParking instanceof Array) {
			for (var parking in favorParking) {
				if (favorParking[parking].id === $scope.currentParking.parkingid) {
					$scope.imgSrc = "canfav.png";
				}
			}
		}
	};
	
	function setMoreData(index) {
		if(index >= iBuickData.sharedObject.parkings.length && index < iBuickData.sharedObject.totalParkings) {
			var pagenum = parseInt(index / 20) + 1;
			//$log.log(pagenum);
			if(iBuickData.sharedObject.parkingviewmode === "nearby"){
				loadDataFromServer($scope.Latlng.Lat, $scope.Latlng.Lng, pagenum);
			}
			if(iBuickData.sharedObject.parkingviewmode === "search"){
				loadDataFromServer(iBuickData.sharedObject.searchLatlng.Lat, iBuickData.sharedObject.searchLatlng.Lng, pagenum);
			}
		} else {
			// $log.log(index)
			setData(index);
		}
	};
	
	// 左侧滑块滚动后，会调用该函数
	$scope.rowindex = function(index) {
		if(index > iBuickData.sharedObject.totalParkings - 1) {
			return;
		}
		if($scope.spinif == true) {
			return;
		}
		// $log.log(index)
		$scope.imgSrc = "addfav.png";
		$scope.index = index;
		$scope.$apply(index);
		if(iBuickData.sharedObject.parkingviewmode === "nearby" || iBuickData.sharedObject.parkingviewmode === "search") {
			setMoreData(index);
		} else {
			setData(index);
		}
		
		$scope.$apply($scope.currentParking);
		$scope.$apply($scope.imgSrc);
	};
	
	$scope.doFavor = function() {
		if($scope.spinif == true) {
			return;
		}
		var favlength = iBuickData.favorParking.length;	
		if ($scope.imgSrc == "addfav.png") {
			if(favlength>=20){
				$timeout(function() {
					popup.popup({
						templateUrl:"app/common/confirmpopup.html",
						title:"超过收藏个数限制！",
						success:{fn:function() {
							$window.loadGaodeScript();
						}},
					});}, 30);
			}else {
				$scope.imgSrc = "canfav.png";
				// current data added to array
				iBuickData.favorParking.push(iBuickData.sharedObject.parkings[$scope.index]);
				iBuickData.saveFavorParking();
			}
		} else {
			//$log.log($scope.currentParking)
			$scope.imgSrc = "addfav.png";
			// remove current data
			var favorParking = iBuickData.favorParking;
			if (favorParking instanceof Array) {
				for ( var parking in favorParking) {
					if (favorParking[parking].id == $scope.currentParking.parkingid) {
						//$log.log("parking " + parking);
						iBuickData.favorParking.splice(parking, 1);
					}
				}
			}
			iBuickData.saveFavorParking();
			if(iBuickData.sharedObject.parkingviewmode == "fav") {
				iBuickData.sharedObject.parkings = [];
				loadDataFromFavor();
			}
		}
	};
	
	$scope.popFilter = function() {
		if($scope.spinif == true) {
			return;
		}
		if(iBuickData.sharedObject.parkingviewmode == "fav") {
			$timeout(function() {
				popup.popup({
					templateUrl:"app/common/confirmpopup.html",
					title:"停车场收藏不支持排序",
					success:{fn:function() {
						
					}},
				});}, 30);
		} else {
			popup.popup({
				templateUrl : "app/common/filter.html",
				title:(iBuickData.sharedObject.searchFilter === "0"),
				success : {
					fn : function() {
						var hash;
						if(iBuickData.sharedObject.parkingviewmode === "nearby") {
							hash = "/parking/1/0/121.59365415573121/31.217425958989562/0";
							
							window.showspinner();
							$location.path(hash);
						} else if(iBuickData.sharedObject.parkingviewmode === "search") {
							hash = "/parking/2/0/" + iBuickData.sharedObject.searchLatlng.Lat + "/" + iBuickData.sharedObject.searchLatlng.Lng +  "/0";
							
							window.showspinner();
							$location.path(hash);
						}
					}
				},
				cancel : {
					fn : function() {
						var hash;
						if(iBuickData.sharedObject.parkingviewmode === "nearby") {
							hash = "/parking/1/0/121.59365415573121/31.217425958989562/1";
							
							window.showspinner();
							$location.path(hash);
						} else if(iBuickData.sharedObject.parkingviewmode === "search") {
							hash = "/parking/2/0/" + iBuickData.sharedObject.searchLatlng.Lat + "/" + iBuickData.sharedObject.searchLatlng.Lng +  "/1";
							
							window.showspinner();
							$location.path(hash);
						}
					}
				},
			});
		}
		
	};
	
	// 显示收藏停车场
	$scope.favorlist = function() {
		if($scope.spinif == true) {
			return;
		}
		var favorParking = iBuickData.favorParking;
		if (favorParking instanceof Array) {
			if(favorParking.length === 0) {
				$scope.loading = true;
				iBuickData.sharedObject.parkingviewmode = "fav";
				iBuickData.sharedObject.totalParkings = 0;
				iBuickData.sharedObject.parkings = [];
				$scope.errormsg = "没有收藏的停车场";
				$scope.pagetitle = "收藏的停车场";
				$scope.maxno = 0;
				$scope.initpos = 0;
			} else {
				iBuickData.sharedObject.parkingviewmode = "fav";
				$scope.pagetitle = "收藏的停车场";
				iBuickData.sharedObject.parkings = [];
				loadDataFromFavor();
			}
		}
	};
	
	function loadDataFromFavor() {
		var favorParking = iBuickData.favorParking;
		for (var parking in favorParking) {
			iBuickData.sharedObject.parkings.push(favorParking[parking]);
		}
		iBuickData.sharedObject.totalParkings = favorParking.length;
		$scope.maxno = iBuickData.sharedObject.totalParkings;
		$scope.totalno = iBuickData.sharedObject.totalParkings;
		//$log.log($scope.maxno)
		if(iBuickData.sharedObject.totalParkings > 0) {
  			setData(0); // 每页20个
  			$scope.initpos = 0;
  			$scope.index = 0;
  		} else {
  			$scope.loading = true;
			$scope.errormsg = "没有收藏的停车场";
  		}
	};
	
	// 显示线路
	$scope.checkpath = function() {
		if($scope.spinif == true) {
			return;
		}
		if($window.mapscriptloaded == false){
			$timeout(function() {
				popup.popup({
					templateUrl:"app/common/confirmpopup.html",
					title:"加载地图失败",
					success:{fn:function() {
						$window.loadGaodeScript();
					}},
				});}, 30);	
		}
		else {
			if(iBuickData.sharedObject.parkingviewmode === "fav"){
				iBuickData.sharedObject.mapReturnUrl = "/parking/3/" + $scope.index + "/121.59365415573121/31.217425958989562/" + iBuickData.sharedObject.searchFilter;
			}
			else{
				iBuickData.sharedObject.mapReturnUrl = "/parking/0/" + $scope.index + "/121.59365415573121/31.217425958989562/" + iBuickData.sharedObject.searchFilter;
			}
			iBuickData.sharedObject.mapmode = "path";
			iBuickData.sharedObject.location = {};
			iBuickData.sharedObject.location.longitude  = $scope.Latlng.Lng;
			iBuickData.sharedObject.location.latitude   = $scope.Latlng.Lat;
			iBuickData.sharedObject.destenation = {longitude: iBuickData.sharedObject.parkings[$scope.index].longitude, latitude:iBuickData.sharedObject.parkings[$scope.index].latitude};	
			
			iBuickData.sharedObject.lastPageTitle = $scope.pagetitle;
			
			//$log.log(iBuickData.sharedObject.location);
			//$log.log(iBuickData.sharedObject.destenation);
			window.showspinner();
			//$location.path("/map");
			$timeout(function() {
				$location.path("/map");
			}, 20);
		}
    };
    
    $scope.search = function() {
    	if($scope.spinif == true) {
			return;
		}
    	if(iBuickData.sharedObject.parkingviewmode === "fav"){
    		iBuickData.sharedObject.searchListReturnUrl = "/parking/3/" + $scope.index + "/121.59365415573121/31.217425958989562/" + iBuickData.sharedObject.searchFilter;
		}
		else{
			iBuickData.sharedObject.searchListReturnUrl = "/parking/0/" + $scope.index + "/121.59365415573121/31.217425958989562/" + iBuickData.sharedObject.searchFilter;
		}
    	iBuickData.sharedObject.searchFrom = "parking";
    	iBuickData.sharedObject.lastPageTitle = $scope.pagetitle;
    	
    	window.showspinner();
    	//$location.path('/keyboard');
    	$timeout(function() {
			$location.path("/keyboard");
		}, 20);
    };
    
  //显示当前停车场条目的标注点地图
	$scope.markermap = function() {
		if($scope.spinif == true) {
			return;
		}
		if(Object.getOwnPropertyNames($scope.currentParking).length <=0) {
			return;
		}
		if($window.mapscriptloaded == false){
			$timeout(function() {
				popup.popup({
					templateUrl:"app/common/confirmpopup.html",
					title:"加载地图失败",
					success:{fn:function() {
						$window.loadGaodeScript();
					}},
				});}, 30);	
		}
		else {
			if(iBuickData.sharedObject.parkingviewmode === "fav"){
				iBuickData.sharedObject.mapReturnUrl = "/parking/3/" + $scope.index + "/121.59365415573121/31.217425958989562/";
			}
			else{
				iBuickData.sharedObject.mapReturnUrl = "/parking/0/" + $scope.index + "/121.59365415573121/31.217425958989562/";
			}
			iBuickData.sharedObject.mapmode = "marker";
			iBuickData.sharedObject.markers = [];
			iBuickData.sharedObject.marktype = 3;
			iBuickData.sharedObject.markers.push($scope.currentParking);
			iBuickData.sharedObject.lastPageTitle = $scope.pagetitle;

			window.showspinner();
			//$location.path("/map");
			$timeout(function() {
				$location.path("/map");
			}, 20);
		}
	};
	
	$scope.back = function() {
		if(iBuickData.sharedObject.parkingviewmode === "fav") {
			$route.reload();
			var hash = iBuickData.sharedObject.mapReturnUrl = "/parking/1/" + $scope.index + "/121.59365415573121/31.217425958989562/";
			
			window.showspinner();
			$timeout(function() {
				$location.path(hash);
			}, 20);
			// $location.path(hash);
		} else {
			window.showspinner();
			//$location.path("/home");
			$timeout(function() {
				$location.path("/home");
			}, 20);
		}
	};
});
