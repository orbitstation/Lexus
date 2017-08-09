//usage
//ocs-match="modelNameThatWeWantToMatch"  <input type="text/password ect..."/> 
//provide error handeling on the front end ex: ng-show="formName.$error.match"
(function () {
    'use strict';
    var directiveId = 'ocsMatch';
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
	        
	        //$parse converts angular expression into a function.
	        var firstInput = $parse(attrs[directiveId]);

	        //format function for incomplete dates (MM/YYYY)
	        var dateFormat = function (a, b) {
	            var sValue = (typeof a == "string") ? a.split('/') : 0;
	            var sTemp = (typeof b == "string") ? b.split('/') : 0;
	            var evalue = a;
	            var etemp = b;

	            if (sValue.length == 2) {
	                evalue = sValue[0] + '/' + a;
	            }
	            if (sTemp.length == 2) {
	                etemp = sTemp[0] + '/' + b;
	            }

	            var formated = {};
	            formated.a = evalue;
	            formated.b = etemp;;

	            return formated;
	        }

	        // match is sending object instead of model e.g. match="{ model: model.startDate, operator: 'dateGreaterThan'}"
	        var operators = {
	            "default": function (a, b) { return a == b },
	            "dateMatch": function (a, b) { return Date.parse(a) == Date.parse(b) },
	            "dateGreaterThan": function (a, b) {
	                var dates = dateFormat(a, b);

	                return Date.parse(dates.a) >= Date.parse(dates.b);
	            },
	            "dateLesserThan": function (a, b) {
	                var dates = dateFormat(a, b);

	                return Date.parse(dates.a) <= Date.parse(dates.b);
	            }
	        }

	        var validator = function (value) {
	            //retrieves the value of the first input control (scope) default
	            //(value = 1st field) comparing to (temp = 2nd field)
	            var selector = (scope.$parent.match === undefined) ? firstInput(scope.$parent) : firstInput(scope);
	            var isValidObject = (typeof selector === "object" && selector.operator in operators);
	            var temp = isValidObject ? selector.model : selector;

	            // prevent displaying validation if one field does not have any value (for date comparison)
	            var isNull = isValidObject && ((typeof temp === 'undefined' || temp === null) || value === null);

	            var v = isValidObject ? operators[selector.operator](value, temp) : operators['default'](value, temp);

	            //sets the value of the “match” form state control that contributes
	            //to the validity of the input control, also referenced by
	            //the ng-show attribute (to show or hide the hint)
	            ctrl.$setValidity('match', isNull ? true : v);

	            return value;
	        };

	        ctrl.$parsers.unshift(validator);
	        ctrl.$formatters.push(validator);

	        if (scope.$parent.match === undefined) {
	            scope.$parent.$watch(attrs[directiveId], function () {
	                validator(ctrl.$viewValue);
	            });
	        } else {
	            scope.$watch(attrs[directiveId], function () {
	                validator(ctrl.$viewValue);
	            });
	        }
	    }
	};
})();
