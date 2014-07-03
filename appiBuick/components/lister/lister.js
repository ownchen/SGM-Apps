ibuickApp.directive('sgmLister', function() {
	return {
		restrict: 'A',
		replace: true,
		transclude: true,
		scope: {
			pos: "=",
			listitems: "=",
			rowclicked: "&"
		},
		templateUrl: 'components/lister/lister.html',
		link: function(scope, element, attrs) {
			var listEl = null;
			var rootEl = angular.element(element.find('div')[0]);
			var divheight = 0;
			divheight += 40;
			
			scope.$watch("listitems", function () {
                if (scope.listitems)
                	removeListItems();
                	addListItems();
            });
			
			scope.$watch("pos", function() {
				if(rootEl) {
					var step = -156;
					var posY = 0;
					if(scope.pos == 0) {
						posY = 0;
					} else if(scope.pos == scope.listitems.length-1) {
						posY = -1 * divheight + 238;
					} else {
						posY = step * scope.pos + 52;
					}
					rootEl.css("top", posY + "px");
				}
			});
			
			function removeListItems() {
				if(listEl) {
					listEl.remove();
				}
			};
			
			function addListItems() {
				if(angular.isArray(scope.listitems)) {
					listEl = angular.element("<div>");
					rootEl.append(listEl);
					for(var i=0; i<scope.listitems.length;i++) {
						var listr = "<div class='default-listitem'>";
						listr += scope.listitems[i].title;
						listr += "</div>";
						var listitem = angular.element(listr);
						listEl.append(listitem);

						// 绑定事件
						listitem.bind('click', ( function (indexi) {
							return function(event) {
								scope.rowclicked({index:indexi});
							};
						})(scope.listitems[i].id));
						
						divheight += 78;
					}
					divheight += 30;
				}
			};
		}
	};
});