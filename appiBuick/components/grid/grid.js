ibuickApp.directive('sgmGrid', function() {
	return {
		restrict: 'A',
		replace: true,
		transclude: true,
		scope: {
			griditems: "=",
			itemclicked: "&"
		},
		template: '<div class="default-grid">',
		link: function(scope, element, attrs) {
			var gridEl = null;
			var rootEl = angular.element(element);
			
			scope.$watch("griditems", function () {
                if (scope.griditems) {
                	removeGridItems();
                	addGridItems();
                }
            });
			
			function removeGridItems() {
				if(gridEl){
					gridEl.remove();
				}
			};
			
			function addGridItems() {
				if(angular.isArray(scope.griditems)) {
					gridEl = angular.element("<div class='default-grid'>");
					rootEl.append(gridEl);
					
					for(var i=0; i<scope.griditems.length;i++) {
						var listr = "<div class='default-griditem'>";
						listr += "<img class='griditemimage' src='assests/images/indicatorlight/" + scope.griditems[i].photo + "'>";
						listr += "</div>";
						var griditem = angular.element(listr);
						gridEl.append(griditem);

						// 绑定事件
						griditem.bind('click', ( function (theitem) {
							return function(event) {
								scope.itemclicked({item:theitem});
							};
						})(scope.griditems[i]));
					}
				}
			};
		}
	};
});