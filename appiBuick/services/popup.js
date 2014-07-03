/*
 *  这里把popup窗口封装成了一个服务-popup
 *  
 *  Popup会弹出一个临时窗口，并有一个半透明背景。默认的情况下有取消和确认按钮。点击后，pop窗口都会消失，包括其中创建的scope变量。
 *  Popup支持使用默认的窗口，也支持由自定义的模板的窗口，同时也支持自己写的controller
 *  popup有两个调用参数：options，和passedInLocals
 *  关于options参数的定义，请参加函数实现中的var defaults部分。
 * 
 */

ibuickApp.factory('popup', function($document, $compile, $rootScope, $controller) {
	
	var factory = {};
	
	factory.popup = function(options, passedInLocals) {
		
		var body = $document.find('body');
		
		var defaults = {
			success:{fn:null},   // 成功之后调用的函数
			cancel:{fn:null},    // 失败之后调用的函数
			controller:null,     // 如果使用自定义的controller，那么在这里传入
			templateUrl:null,    // 如果使用自定义的template，那么在这里传入
			title:null,          // 默认调用的时候，可以显示的标题在这里传入
			message:null         // 默认调用的时候，可以显示的消息文本在这里传入
		};
		
		options = angular.extend({}, defaults, options); 
		
		var popupbody = (function() {
			if(options.templateUrl) {
				return '<div class="popup-body" ng-include="\'' + options.templateUrl + '\'"></div>';
			} else {
				return '<div class="popup-body" ng-include="\'services/popup.html\'"></div>';
			}
		})();
		
		var popupEl    = angular.element(popupbody);
		var backdropEl = angular.element('<div class="popup-backdrop">');

		// 关闭
		var closeFn = function () {
			popupEl.remove();
			backdropEl.remove();
		};
		
		var scope = options.scope || $rootScope.$new();
		
		scope.title   =  (options.title  != null)  ? options.title : "标题";
		scope.message =  (options.message != null) ? options.message : "内容";
		scope.$modalClose = closeFn;
	      
		scope.$modalCancel = function () {
			var callFn = options.cancel.fn || closeFn;
			callFn.call(this);
			scope.$modalClose();
		};
		
		scope.$modalSuccess = function () {
			var callFn = options.success.fn || closeFn;
			scope.$modalClose();
	        callFn.call(this);
		};

		if (options.controller) {
			locals = angular.extend({$scope: scope}, passedInLocals);
			ctrl = $controller(options.controller, locals);
			// Yes, ngControllerController is not a typo
			popupEl.contents().data('$ngControllerController', ctrl);
		}
		
		$compile(popupEl)(scope);
		$compile(backdropEl)(scope);
		body.append(popupEl);
		body.append(backdropEl);
	};
	
	return factory;
});