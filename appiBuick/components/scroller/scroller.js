ibuickApp.directive('sgmScroller', function() {
	return {
		restrict: 'A',
		replace: true,
		transclude: true,
		scope: {
			initpos: "=",
			maxno: "=",
			busying: "=",
			currentrow: "&"
		},
		templateUrl: 'components/scroller/scroller.html',
		link: function(scope, element, attrs) {
			// 设置显示高度和宽度
			//element.css("height", scope.divHeight+"px");
			//element.css("width",  scope.divWidth+"px");
			var slider = element.find('div')[3];
			
			var uparrow =  angular.element(element.find('div')[0]);
			var downarrow =  angular.element(element.find('div')[2]);
			
			var steps = 118, startY = 0, posY = 0;
			var currentPos = 0;
			
			initSlider();
			
			function initSlider() {
				startY = 60;
				currentPos = scope.initpos;
				if(scope.maxno > 1 && scope.initpos >= 0) {
					steps  = 146 / (scope.maxno -1);
					
					posY = startY + scope.initpos * steps;
					slider.style.top = posY + "px";
				} else {
					steps = 0;
					slider.style.top = "60px";
				}
			}
			
			scope.$watch("maxno", function () {
                if (scope.maxno >= 0) {
                	initSlider();
                }
            });
			
			scope.$watch("initpos", function () {
                if (scope.initpos >= 0) {
                	initSlider();
                }
            });

			uparrow.bind('click', function(event) {
				if(scope.busying == true) {
					return;
				}
				//if(scope.maxno < 2) {
				//	return;
				//}
				currentPos--;
				if(currentPos < 0) {
					currentPos = 0;
				} 
				scope.currentrow({index:currentPos});
				posY = startY + currentPos * steps;
				slider.style.top = posY + "px";
			});
			
			downarrow.bind('click', function(event) {
				
				if(scope.busying == true) {
					return;
				}
				//if(scope.maxno < 2) {
				//	return;
				//}
				currentPos++;
				scope.currentrow({index:currentPos});
				if(currentPos > scope.maxno-1) {
					currentPos = scope.maxno-1;
				}
				
				posY = startY + currentPos * steps;
				slider.style.top = posY + "px";
			});

		}
	};
});