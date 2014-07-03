ibuickApp.directive('sgmButtonIcon', function() {
	return {
		restrict: 'A',
		scope: {            
		      imgUp: "@",
		      imgDown: "@",
		      btnclicked: "&"
		},
		link: function (scope, elem, attrs) {
			elem.bind('mousedown', function(e) {
				elem.attr("src", "assests/images/navbar/" +scope.imgDown);
			});
			elem.bind('mouseup', function(e) {
				elem.attr("src", "assests/images/navbar/" +scope.imgUp);
			});
			elem.bind('mouseout', function(e) {
				elem.attr("src", "assests/images/navbar/" +scope.imgUp);
			});
			elem.bind('click', ( function () {
				return function(e) {
					scope.$apply(scope.btnclicked());
				};
			})());
		}
	};
});