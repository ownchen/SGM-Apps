function init()
{
}

// 程序模块定义，依赖外部模块md5
var ibuickApp = angular.module('ibuick', ['md5']);

// 程序视图路由切换路径定义
ibuickApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/home', {templateUrl: 'app/home/homeview.html', controller: 'CtrlHomeView'}).
		when('/parking/:reloadit/:rowindex/:lat/:lng/:filter', {templateUrl: 'app/parking/parkingview.html', controller: 'CtrlParkingListDetailView'}).
		when('/gasstation/:reloadit/:rowindex/:lat/:lng/:filter', {templateUrl: 'app/gasstation/gasstationview.html', controller: 'CtrlGasStationView'}).
		when('/dealer/:reloadit/:rowindex', {templateUrl: 'app/dealer/dealerview.html', controller: 'CtrlDealerView'}).
		when('/dealerconfig', {templateUrl: 'app/dealer/favordealerview.html',  controller: 'CtrlFavorDealerView'}).
		when('/indicatorlight', {templateUrl: 'app/indicatorlight/indicatorlightview.html', controller: 'CtrlIndicatorLightView'}).
		when('/keyboard', {templateUrl: 'app/common/searchinputview.html', controller: 'CtrlSearchInputView'}).
		when('/search', {templateUrl: 'app/common/searchlistview.html', controller: 'CtrlSearchListView'}).
		when('/map',  {templateUrl: 'app/common/mapview.html', controller: 'CtrlMapView'}).
		otherwise({redirectTo: '/home'});
}]);


