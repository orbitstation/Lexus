(function () {
    'use strict';
    angular.module('globalApp').directive("ocsAutocomplete", ['$rootScope', '$parse', 'templateUrlService', directiveFunction]);

    function directiveFunction($rootScope, $parse, templateUrlService) {
        return {
            restrict: "E",
            scope: {
                meta: "=",
                model: "=",
                searchString: "=",
                remoteApiHandler: "=",
                remoteResponseFormatter: "=",
                inputClass: "@",
                customValidatorStates: "=",
                onInputChanged: '=',
                tag: "@",
                duplicates: "=?",
                customId: "@"
            },
            templateUrl: templateUrlService.get('ocs-AutoComplete.html'),
            controller: ["$scope", function ($scope) {
                // this incriments the global counter and creates a new uneque ID
                if ($rootScope.IdCounter == undefined) {
                    $rootScope.IdCounter = 0;
                }
                $scope.elimentId = $scope.customId ? $scope.customId : "elem_" + $rootScope.IdCounter++;
            }],
            link: function (scope, elem, attrs) {
                if (scope.meta && typeof scope.meta.overrideSuggestions == 'undefined') {
                    scope.meta.overrideSuggestions = false;
                }
                if (!scope.duplicates) {
                    scope.duplicates = [];
                }
                //setting initialValue
                if (scope.searchString) {
                    scope.initialValue = scope.searchString;
                }

                //setting up the searchString value
                var setInputValue = function (inputValue) {
                    scope.searchString = inputValue;
                };

                scope.inputChanged = function (searchStr) {
                    setInputValue(searchStr);
                };
               
                scope.$watch("model", function (newValue) {
                    if (newValue && newValue.title) {
                        setInputValue(newValue.title);
                    }
                    /*  not working so well in accordions without manually triggering $apply after removing an item from collection 
                        otherwise the form will remain $invalid until something triggers another $digest cycle. 
                        Also, there are some changes in angucomplete-alt-custom.debug.js already which take care of validity, so that 
                        is another reason why not to set it here.

                    if ((!scope.model || scope.model.length === 0) && scope.meta && scope.meta.required) {
                        scope.singleItemForm.$setValidity('required', false);
                    } else {
                        scope.singleItemForm.$setValidity('required', true);
                    }
                    */
                    if (newValue && newValue.originalObject) {
                        scope.model = newValue.originalObject;
                    }
                    if (newValue && newValue.text) {
                        scope.model = newValue.text;
                    }
                });

                scope.$watch("searchString", function (newValue, oldValue) {
                    if (newValue !== oldValue)
                    {
                        if (scope.onInputChanged) {
                            scope.onInputChanged(newValue, scope.tag);
                        }
                    }
                });

                scope.$watch("duplicates", function (newValue, oldValue) {
                    if (newValue) {
                        if (scope.duplicates.length && (_.indexOf(scope.duplicates, scope.model) > -1)) {
                            scope.singleItemForm.$setValidity('isUneque', false);
                        } else {
                            scope.singleItemForm.$setValidity('isUneque', true);
                        }
                    }
                });

                //to add options
                if (attrs.options) {
                    var options = $parse(attrs.options)(scope);
                    if (options.class) {
                        elem.find('.form-group').addClass(options.class);
                    }
                }
                //lazy setting of the additional styles; this should overcome allignment issue on jobserach panel
                //elem.on('click', function(event) {
                //    if (scope.meta.dropdownStyle) {
                //        var dd = angular.element(document.querySelector('#' + scope.elimentId + '_dropdown'));
                //        if (dd) {
                //            dd.attr('style', scope.meta.dropdownStyle);
                //        }                            
                //    }
                //    elem.off('click');
                //});                    
            }

        };
    };

})();
