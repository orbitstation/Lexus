(function () {
    'use strict';
    angular.module('globalApp').directive("ocsCheckBox", ['$rootScope', 'templateUrlService', directiveFunction]);

    function directiveFunction($rootScope, templateUrlService) {
        return {
            restrict: "E",
            scope: {
                meta: "=",
                model: "="
            },
            templateUrl: templateUrlService.get('ocs-CheckBox.html'),
            replace: true,
            link: function (scope, element, attrs) {
                if ($rootScope.IdCounter === undefined) { $rootScope.IdCounter = 0; }
                scope.elementID = "elem_" + $rootScope.IdCounter++;

                // check off the defaults based on the initial model
                scope.$watch("model", function (newValue, oldValue) {

                    if (newValue) {
                        if (scope.model.length > 0) {
                            scope.temp = {};

                            for (var y = 0; y < scope.meta.items.length; y++) {
                                for (var x = 0; x < scope.model.length; x++) {
                                    if (scope.model[x] == scope.meta.items[y].value) {
                                        scope.temp[y] = scope.model[x];
                                        break;
                                    }
                                    else {
                                        scope.temp[y] = false;
                                    }
                                }
                            }
                            scope.modelTemp = scope.temp;
                        }

                        // in case model of the checkbox group is set to empty (model = []) by a controller - this doesn't affect 
                        // single check box (isSingleSelect), because it is a boolean instead of an object, so length doesn't apply.
                        if (scope.model.length === 0) {
                            scope.modelTemp = {};
                        }
                    } else {
                        if (scope.meta && scope.meta.required) {
                            scope.singleItemForm.$setValidity('required', false);
                        }
                    }
                });

                    
                // update the model when the check boxes when user clicks a checkbox
                scope.$watch("modelTemp", function (newValue, oldValue) {
                    var t = new Array();

                    for (var w in newValue) {
                        if (newValue[w]) {
                            t.push(newValue[w]);
                        }
                    }
                    
                    if (t.length >= 0) {
                        if (scope.meta && scope.meta.isSingleSelect) { //support for single checked checkbox
                            scope.model = t[0];
                        } else {
                            scope.model = t;
                        }                        
                    }

                    if ((!scope.model || scope.model.length === 0) && scope.meta && scope.meta.required) {
                        scope.singleItemForm.$setValidity('required', false);
                    }
                    else {
                        scope.singleItemForm.$setValidity('required', true);
                    }

                }, true);
            }
        };
    };

})();

