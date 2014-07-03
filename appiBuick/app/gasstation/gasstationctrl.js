ibuickApp.controller('CtrlGasStationView', function($scope, $route, $routeParams, $location, gmInfoFactory, 
						remoteServiceFactory, iBuickData, popup, $timeout, $window) {
	$scope.Latlng = {Lat:0, Lng:0};
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
	
	$scope.currentStation = {};
	//iBuickData.sharedObject.searchLatlng  = {};
	
	$scope.$on('$viewContentLoaded', function() {
		$timeout(function() {init();}, 0.5);
	});
	
	//$scope.$evalAsync(init());
	
	function init() {
		// $log.log($routeParams.reloadit);
		// reloadit = 1，从服务器重新装载数据，以当前的经度，纬度作为条件
		// reloadit = 2, 使用某个地址的经度，纬度作为条件
		// reloadit = 3, 从收藏里获取数据
		// 其它值，从地图等页面返回，无需重新装载数据
		// 1. 设置filter 0 , 1 or 2
		
		gmInfoFactory.recordPV("找加油站");
		
		window.hidespinner();
		
		$scope.index   = 0;
		iBuickData.sharedObject.searchFilter = $routeParams.filter;
		
		if($routeParams.reloadit == 1) {
			iBuickData.sharedObject.totalgasstations = 0;
			iBuickData.sharedObject.gasstationviewmode = "nearby";
			$scope.pagetitle = "附近加油站";
			iBuickData.sharedObject.gasStations = [];
			$scope.errormsg = "请求服务器数据中......";
			loadDataFromServer($scope.Latlng.Lat, $scope.Latlng.Lng, 1);
		} else if($routeParams.reloadit == 2) {
			iBuickData.sharedObject.totalgasstations = 0;
			iBuickData.sharedObject.searchLatlng  = {};
			iBuickData.sharedObject.gasstationviewmode = "search";
			$scope.pagetitle = "目的地加油站";
			iBuickData.sharedObject.gasStations = [];
			var lat = $routeParams.lat;
			var lng = $routeParams.lng;
			iBuickData.sharedObject.searchLatlng.Lat = lat;
			iBuickData.sharedObject.searchLatlng.Lng = lng;
			$scope.errormsg = "请求服务器数据中......";
			loadDataFromServer(lat, lng, 1);
		} else if($routeParams.reloadit == 3) {
			iBuickData.sharedObject.totalgasstations = 0;
			iBuickData.sharedObject.gasstationviewmode = "fav";
			$scope.pagetitle = "收藏的加油站";
			iBuickData.sharedObject.gasStations = [];
			gmInfoFactory.getLatlng().then(function (latlng) {
				$scope.Latlng = latlng;
			});
			loadDataFromFavor();
		} else {
			// 没有数据的时候，要做一些处理
			//$log.log($routeParams.rowindex)
			$scope.pagetitle = iBuickData.sharedObject.lastPageTitle;
			var rowind = 0;
			if($routeParams.rowindex) {
				rowind = parseInt($routeParams.rowindex + "");
			}
			// 设置scroller和item
			$scope.totalno   = iBuickData.sharedObject.totalgasstations;
			$scope.maxno   = iBuickData.sharedObject.gasStations.length;
			$scope.initpos = rowind;
			$scope.index   = rowind;
			$scope.pagetitle = iBuickData.sharedObject.lastPageTitle;
			// 不管什么时候，都要去读取位置信息
			gmInfoFactory.getLatlng().then(function (latlng) {
				$scope.Latlng = latlng;
			});
			if(iBuickData.sharedObject.totalgasstations <= 0) {
				$scope.loading  = true;
				$scope.errormsg = "没有加油站数据";
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
				if(iBuickData.sharedObject.gasstationviewmode === "nearby") {
					return remoteServiceFactory.getGasStations($scope.Latlng.Lng, $scope.Latlng.Lat, pageno, iBuickData.sharedObject.searchFilter);
				} else {
					return remoteServiceFactory.getGasStations(lat, lng, pageno, iBuickData.sharedObject.searchFilter);
				}
			}).
			then(function(response) {
				//$log.log(response);
				if (response.data.ats.code === "1") {
					if (response.data.ats.total > 0) {
						iBuickData.sharedObject.totalgasstations = response.data.ats.total;
						var data = response.data.ats.gaslist.item;
						if ((data instanceof Array) && response.data.ats.gaslist.item.length > 0) {
							for (var station in data) {
								setOneItem(data[station]);
							}
						} else if(angular.isObject(data)) {
							setOneItem(data);
						}
						$scope.totalno = iBuickData.sharedObject.totalgasstations;
						$scope.maxno = iBuickData.sharedObject.gasStations.length;
					}
				} else {
					// return $q.reject();
				}
			}).
			then(function() {
				$scope.spinif = false;
				// $log.log(iBuickData.sharedObject.gasStations);
				if(iBuickData.sharedObject.totalgasstations > 0) {
		  			setData((pageno-1) * 20); 
		  			$scope.initpos = (pageno-1) * 20;
		  			$scope.index = (pageno-1) * 20;
		  		} else {
		  			$scope.errormsg = "没有加油站数据";
		  		}
			}, function() {
				$scope.spinif = false;
				$scope.errormsg = "获取加油站数据失败";
			});
	};
	
	function setOneItem(theitem) {
		var tmp = {};
		tmp.brandid   = theitem.brandid;
		
		// $log.log(item);
		// 这里最好根据price id来做
		tmp.p93 = '';
		tmp.p97 = '';
		tmp.p92 = '';
		if(theitem.pricelist.item){
			tmp.pricelist   = theitem.pricelist;
			if(angular.isArray(theitem.pricelist.item)) {
				
				for (var index in theitem.pricelist.item) {
					var tmppriceitem = theitem.pricelist.item[index];
					if(tmppriceitem.gastypeid === "1") {
						tmp.p93 = tmppriceitem.price;
					}
					if(tmppriceitem.gastypeid === "2") {
						tmp.p97 = tmppriceitem.price;
					}
					if(tmppriceitem.gastypeid === "17") {
						tmp.p92 = tmppriceitem.price;
					}
				}
			} else {
				var tmppriceitem = theitem.pricelist.item;
				if(tmppriceitem.gastypeid === "1") {
					tmp.p93 = tmppriceitem.price;
				}
				if(tmppriceitem.gastypeid === "2") {
					tmp.p97 = tmppriceitem.price;
				}
				if(tmppriceitem.gastypeid === "17") {
					tmp.p92 = tmppriceitem.price;
				}
			}
			
		}
		
		tmp.address   = theitem.address;
		tmp.dist      = theitem.dist;
		tmp.latitude  = theitem.latitude;
		tmp.longitude = theitem.longitude;
		tmp.name      = theitem.name;
		tmp.gasid     = theitem.gasid;
		//$log.log(tmp.brandid);
		if(tmp.brandid==1){
			tmp.stationtype = "中石化";
		}else if(tmp.brandid==2){
			tmp.stationtype = "中石油";
		}else if(tmp.brandid==3){
			tmp.stationtype = "中化道达尔";
		}
		//tmp.stationtype = theitem.name.substr(0,3);
		//$log.log(tmp);
		iBuickData.sharedObject.gasStations.push(tmp);
	};
	
	// 设置某个单元数据
	function setData(index) {
		$scope.loading = false;
		$scope.imgSrc = "addfav.png";
		
		//$log.log(iBuickData.sharedObject.gasStations[index]);
		if(angular.isDefined(iBuickData.sharedObject.gasStations[index].dist)) {
			if(iBuickData.sharedObject.gasStations[index].dist != ""){
				$scope.currentStation.dist = iBuickData.sharedObject.gasStations[index].dist;
			}
		}
		
		if(angular.isDefined(iBuickData.sharedObject.gasStations[index].pricelist) && iBuickData.sharedObject.gasStations[index].pricelist != "") {

	    	/*
	    	if(iBuickData.sharedObject.gasStations[index].pricelist.item) {
	    		$scope.currentStation.p93  = iBuickData.sharedObject.gasStations[index].p93 + "元/升";
	    		$scope.currentStation.p97  = iBuickData.sharedObject.gasStations[index].p97 + "元/升";
	    	}  else {
	    		$scope.currentStation.p93  = "无";
	    		$scope.currentStation.p97  = "无";
	    	}
	    	*/
			if(iBuickData.sharedObject.gasStations[index].pricelist.item) {
				if(iBuickData.sharedObject.gasStations[index].p92 != "") {
					$scope.currentStation.p1  = iBuickData.sharedObject.gasStations[index].p92 + "元/升";
					$scope.currentStation.n1  = "92#";
				} else {
					$scope.currentStation.p1  = iBuickData.sharedObject.gasStations[index].p93 + "元/升";
					$scope.currentStation.n1  = "93#";
				}
				$scope.currentStation.p2  = iBuickData.sharedObject.gasStations[index].p97 + "元/升";
				$scope.currentStation.n2  = "97#";
			} else {
				$scope.currentStation.p1  = "无";
	    		$scope.currentStation.p2  = "无";
	    		$scope.currentStation.n1  = "93#";
	    		$scope.currentStation.n2  = "97#";
			}
		}	
		
    	$scope.currentStation.brandid = iBuickData.sharedObject.gasStations[index].brandid;
    	$scope.currentStation.name    = iBuickData.sharedObject.gasStations[index].name;
    	$scope.currentStation.address = iBuickData.sharedObject.gasStations[index].address;
    	$scope.currentStation.id      = index;
    	$scope.currentStation.longitude  = iBuickData.sharedObject.gasStations[index].longitude;
    	$scope.currentStation.latitude   = iBuickData.sharedObject.gasStations[index].latitude;
    	$scope.currentStation.gasid   = iBuickData.sharedObject.gasStations[index].gasid;
    	$scope.currentStation.stationtype = iBuickData.sharedObject.gasStations[index].stationtype;
    	
    	if($scope.currentStation.stationtype) {
			$scope.iftype = false;
		}else{
			$scope.iftype = true;
		}

		// iBuickData.loadFavorGasStations();
		var favorGasStations = iBuickData.favorGasStations;
		if (favorGasStations instanceof Array) {
			for (var station in favorGasStations) {
				if (favorGasStations[station].gasid === $scope.currentStation.gasid) {
					$scope.imgSrc = "canfav.png";
				}
			}
		}
	};
	
	function setMoreData(index) {
		if(index >= iBuickData.sharedObject.gasStations.length && index < iBuickData.sharedObject.totalgasstations) {
			var pagenum = parseInt(index / 20) + 1;
			//$log.log(pagenum);
			if(iBuickData.sharedObject.gasstationviewmode === "nearby"){
				loadDataFromServer($scope.Latlng.Lat, $scope.Latlng.Lng, pagenum);
			}
			if(iBuickData.sharedObject.gasstationviewmode === "search"){
				loadDataFromServer(iBuickData.sharedObject.searchLatlng.Lat, iBuickData.sharedObject.searchLatlng.Lng, pagenum);
			}
		} else {
			// $log.log(index)
			setData(index);
		}
	};
	
	// 左侧滑块滚动后，会调用该函数
	$scope.rowindex = function(index) {
		if(index > iBuickData.sharedObject.totalgasstations - 1) {
			return;
		}
		if($scope.spinif == true) {
			return;
		}
		$scope.imgSrc = "addfav.png";
		$scope.index = index;
		$scope.$apply(index);
		if(iBuickData.sharedObject.gasstationviewmode === "nearby" || iBuickData.sharedObject.gasstationviewmode === "search") {
			setMoreData(index);
		} else {
			setData(index);
		}
		
		$scope.$apply($scope.currentStation);
		$scope.$apply($scope.imgSrc);
	};
	
	$scope.doFavor = function() {
		//$log.log(iBuickData.favorGasStations)
		var favlength = iBuickData.favorGasStations.length;		
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
					iBuickData.favorGasStations.push(iBuickData.sharedObject.gasStations[$scope.index]);
					iBuickData.saveFavorGasStations();
				}
			} else {
				$scope.imgSrc = "addfav.png";
				// remove current data
				var favorGasStations = iBuickData.favorGasStations;
				if (favorGasStations instanceof Array) {
					for ( var station in favorGasStations) {
						if (favorGasStations[station].gasid == $scope.currentStation.gasid) {
							iBuickData.favorGasStations.splice(station, 1);
						}
					}
				}
				iBuickData.saveFavorGasStations();
				if(iBuickData.sharedObject.gasstationviewmode == "fav") {
					iBuickData.sharedObject.gasStations = [];
					loadDataFromFavor();
				}
			}
	};
	
	$scope.popFilter = function() {
		if($scope.spinif == true) {
			return;
		}
		if(iBuickData.sharedObject.gasstationviewmode == "fav") {
			$timeout(function() {
				popup.popup({
					templateUrl:"app/common/confirmpopup.html",
					title:"加油站收藏不支持排序",
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
						if(iBuickData.sharedObject.gasstationviewmode === "nearby") {
							hash = "/gasstation/1/0/121.59365415573121/31.217425958989562/0";
							
							window.showspinner();
							//$location.path(hash);
							$timeout(function() {
								$location.path(hash);
							}, 20);
						} else if(iBuickData.sharedObject.gasstationviewmode === "search") {
							hash = "/gasstation/2/0/" + iBuickData.sharedObject.searchLatlng.Lat + "/" + iBuickData.sharedObject.searchLatlng.Lng +  "/0";
							
							window.showspinner();
							//$location.path(hash);
							$timeout(function() {
								$location.path(hash);
							}, 20);
						}
					}
				},
				cancel : {
					fn : function() {
						var hash;
						if(iBuickData.sharedObject.gasstationviewmode === "nearby") {
							hash = "/gasstation/1/0/121.59365415573121/31.217425958989562/1";
							
							window.showspinner();
							//$location.path(hash);
							$timeout(function() {
								$location.path(hash);
							}, 20);
						} else if(iBuickData.sharedObject.gasstationviewmode === "search") {
							hash = "/gasstation/2/0/" + iBuickData.sharedObject.searchLatlng.Lat + "/" + iBuickData.sharedObject.searchLatlng.Lng +  "/1";
							
							window.showspinner();
							//$location.path(hash);
							$timeout(function() {
								$location.path(hash);
							}, 20);
						}
					}
				},
			});
		}
		
	};
	
	//显示收藏加油站
	$scope.favorlist = function() {
		if($scope.spinif == true) {
			return;
		}
		var favorGasStations = iBuickData.favorGasStations;
		if (favorGasStations instanceof Array) {
			if(favorGasStations.length === 0) {
				$scope.loading = true;
				$scope.errormsg = "没有收藏的加油站";
				$scope.pagetitle = "收藏的加油站";
				iBuickData.sharedObject.totalgasstations = 0;
				iBuickData.sharedObject.gasstationviewmode = "fav";
				iBuickData.sharedObject.gasStations = [];
				$scope.maxno = 0;
				$scope.initpos = 0;
			} else {
				iBuickData.sharedObject.gasstationviewmode = "fav";
				$scope.pagetitle = "收藏的加油站";
				iBuickData.sharedObject.gasStations = [];
				loadDataFromFavor();
			}
		}
	};
	
	function loadDataFromFavor() {
		var favorGasStations = iBuickData.favorGasStations;
		for (var station in favorGasStations) {
			iBuickData.sharedObject.gasStations.push(favorGasStations[station]);
		}
		iBuickData.sharedObject.totalgasstations = favorGasStations.length;
		$scope.maxno = iBuickData.sharedObject.totalgasstations;
		$scope.totalno = iBuickData.sharedObject.totalgasstations;
		//$log.log($scope.maxno);
		if(iBuickData.sharedObject.totalgasstations > 0) {
  			setData(0); // 每页20个
  			$scope.initpos = 0;
  			$scope.index = 0;
  		} else {
  			// 没有收藏到加油站了
  			$scope.loading = true;
			$scope.errormsg = "没有收藏的加油站";
			$scope.maxno = 0;
			$scope.initpos = 0;
  			$scope.index = 0;
  		}
	};
	
	// 显示线路
	$scope.checkpath = function () {
		if($scope.spinif == true) {
			return;
		}
		if(window.mapscriptloaded == false) {
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
	    	if(iBuickData.sharedObject.gasstationviewmode === "fav") {
				iBuickData.sharedObject.mapReturnUrl = "/gasstation/3/" + $scope.index + "/121.59365415573121/31.217425958989562/" + iBuickData.sharedObject.searchFilter;
			} else {
				iBuickData.sharedObject.mapReturnUrl = "/gasstation/0/" + $scope.index + "/121.59365415573121/31.217425958989562/" + iBuickData.sharedObject.searchFilter;
			}
			iBuickData.sharedObject.mapmode = "path";
			iBuickData.sharedObject.location = {};
			iBuickData.sharedObject.location.longitude  = $scope.Latlng.Lng;
			iBuickData.sharedObject.location.latitude   = $scope.Latlng.Lat;
			iBuickData.sharedObject.destenation = {longitude: iBuickData.sharedObject.gasStations[$scope.index].longitude, latitude:iBuickData.sharedObject.gasStations[$scope.index].latitude};	
		
			//$log.log(iBuickData.sharedObject.location);
			//$log.log(iBuickData.sharedObject.destenation);
			iBuickData.sharedObject.lastPageTitle = $scope.pagetitle;
			
			window.showspinner();
			//$location.path("/map");
			$timeout(function() {
				$location.path("/map");
			}, 20);
		}
    };
    
    /*
    $scope.checkpath = function() {
		gmInfoFactory.checkNetwork().then(function() {
			$scope.gotoPath();
		}, function() {
			$timeout(function() {
				popup.popup({
					templateUrl:"app/common/confirmpopup.html",
					title:"该功能未联网状态下无法使用",
	    			success:{fn:function() {}},
				});}, 50);
		});
	};
	*/
    
    $scope.search = function() {
    	if($scope.spinif == true) {
			return;
		}
    	if(iBuickData.sharedObject.gasstationviewmode === "fav") {
        	iBuickData.sharedObject.searchListReturnUrl = "/gasstation/3/" + $scope.index + "/121.59365415573121/31.217425958989562/" + iBuickData.sharedObject.searchFilter;
		} else {
	    	iBuickData.sharedObject.searchListReturnUrl = "/gasstation/0/" + $scope.index + "/121.59365415573121/31.217425958989562/" + iBuickData.sharedObject.searchFilter;
		}
    	iBuickData.sharedObject.searchFrom = "gasstation";
    	iBuickData.sharedObject.lastPageTitle = $scope.pagetitle;
    	
    	window.showspinner();
    	//$location.path('/keyboard');
    	$timeout(function() {
			$location.path("/keyboard");
		}, 20);
    };
    
	//显示当前加油站条目的标注点地图
	$scope.markermap = function() {
		if($scope.spinif == true) {
			return;
		}
		if(iBuickData.sharedObject.gasStations.length <=0) {
			return;
		}
		if(window.mapscriptloaded == false){
			$timeout(function() {
				popup.popup({
					templateUrl:"app/common/confirmpopup.html",
					title:"加载地图失败",
					success:{fn:function() {
						$window.loadGaodeScript();
					}},
				});}, 30);	
		} else {
			if(iBuickData.sharedObject.gasstationviewmode === "fav") {
				iBuickData.sharedObject.mapReturnUrl = "/gasstation/3/" + $scope.index + "/121.59365415573121/31.217425958989562/";
			} else {
				iBuickData.sharedObject.mapReturnUrl = "/gasstation/0/" + $scope.index + "/121.59365415573121/31.217425958989562/";
			}
			iBuickData.sharedObject.mapmode = "marker";
			iBuickData.sharedObject.markers = [];
			iBuickData.sharedObject.marktype = 2;
			
			var marker = {};
			marker.longitude = iBuickData.sharedObject.gasStations[$scope.index].longitude;
			marker.latitude  = iBuickData.sharedObject.gasStations[$scope.index].latitude;
			marker.name      = iBuickData.sharedObject.gasStations[$scope.index].name;
			marker.telephone = "";
			marker.address   = iBuickData.sharedObject.gasStations[$scope.index].address;
			
			iBuickData.sharedObject.markers.push(marker);
			
			// 设置为重点：
			iBuickData.sharedObject.location = {longitude:iBuickData.sharedObject.gasStations[$scope.index].longitude, latitude:iBuickData.sharedObject.gasStations[$scope.index].latitude };
			//$log.log(JSON.stringify(iBuickData.sharedObject.markers));
			iBuickData.sharedObject.lastPageTitle = $scope.pagetitle;
			
			window.showspinner();
			//$location.path("/map");
			$timeout(function() {
				$location.path("/map");
			}, 20);
		}
	};
	
	// 返回逻辑处理
	$scope.back = function() {
		if(iBuickData.sharedObject.gasstationviewmode === "fav") {
			$route.reload();
			var hash = iBuickData.sharedObject.mapReturnUrl = "/gasstation/1/" + $scope.index + "/121.59365415573121/31.217425958989562/";
			
			window.showspinner();
			//$location.path(hash);
			$timeout(function() {
				$location.path(hash);
			}, 20);
		} else {
			window.showspinner();
			//$location.path("/home");
			$timeout(function() {
				$location.path("/home");
			}, 20);
		}
	};
					
});
