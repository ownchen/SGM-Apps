ibuickApp.directive('sgmButton', function($log) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			var olimg = null;

			elem.bind('mousedown', function(e) {
				var top  = elem.prop('offsetTop');

				if(olimg) {
					olimg.remove();
				}
				
				olimg = angular.element('<img src="assests/images/highlight.png" />');
				olimg.css("position", "absolute");
				olimg.css("left", attrs.theLeft +"px");
				if(attrs.theTop) {
					olimg.css("top", attrs.theTop + "px");
					olimg.css("height","70px");
				} else {
					olimg.css("top", top + "px");
					olimg.css("height",elem.prop('height')+"px");
				}
				
				olimg.css("pointer-events", "none");
				elem.parent().append(olimg);
			});
			elem.bind('mouseup', function(e) {
				if(olimg) {
					olimg.remove();
				}
			});
			elem.bind('mouseout', function(e) {
				if(olimg) {
					olimg.remove();
				}
			});
			elem.bind('mouseleave', function(e) {
				if(olimg) {
					olimg.remove();
				}
			});
		}
	};
});