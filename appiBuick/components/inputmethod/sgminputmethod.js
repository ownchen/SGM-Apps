ibuickApp.directive('sgmInputMethod', function ($compile) {
	return {
		restrict: 'A',
		templateUrl: 'components/inputmethod/sgminputmethod.html',
		replace:true,
		scope: {
			textinput: "=",
			searchit: "&",
			search: "&"
		}
	,
		link: function (scope, element, attrs) {
			
			
			
			//alert("aa")
//			var keyBoardObj = $("#customkeyboard").keyboard({
//				doneCallback: function (d) {
//					//alert(d.target.input[0].value);
//					scope.textinput = d.target.input[0].value;
//					//scope.$apply(scope.textinput);
//					scope.searchit({wordinput:scope.textinput});
//				},
//				EmptyValueCallback: function () {
//				},
//				returnCallback: function () {
//				}
//			});
		}
	};
});