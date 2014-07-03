'use strict';

/* Filters */

angular.module('app.filters', []).
filter('interpolate', ['version', function (version) {
    return function (text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    };
}]).
filter('CHN', [function () {
    return function (id) {
    	for (var i = 0; i < app.langCHNObj.length; i++) {
    		if (id == app.langCHNObj[i].id) {
    			return app.langCHNObj[i].description;
    		}
    	}
        return "Not found";
    };
}]);
