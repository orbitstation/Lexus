(function () {
    'use strict';
    var directiveId = 'ocsUneque';
    angular.module('globalApp').directive(directiveId, ['$parse', directiveFunction]);

    function directiveFunction($parse) {
	    return {
	        require: '?ngModel',
	        restrict: 'A',
	        link: link
	    };

	    //ctrl is provided with an (? = optional) ngModel
	    function link(scope, elem, attrs, ctrl) {
	        // if ngModel is not defined, we don't need to do anything
	        if (!ctrl) { return; }
	        if (!attrs[directiveId]) { return; }

	        var validator = function (value) {
	            var unequeList = attrs.ocsUneque;
	            if (unequeList && value) {
	                unequeList = JSON.parse(unequeList);
	                var foundaMatch = true;
	                for (var x in unequeList) {
	                    if (unequeList[x].toUpperCase() == value.toUpperCase()) {
	                        foundaMatch = false;
	                    }
	                }
	                ctrl.$setValidity('isUneque', foundaMatch);
	            }
	            return value;
	        };

	        ctrl.$parsers.unshift(validator);
	        ctrl.$formatters.push(validator);

	        scope.$parent.$watch(attrs[directiveId], function () {
	            validator(ctrl.$viewValue);
	        });

	        scope.$watch(function () { return attrs.ocsUneque }, function (n, o) {
	            validator(ctrl.$viewValue);
	        });


	    }
	};
})();
