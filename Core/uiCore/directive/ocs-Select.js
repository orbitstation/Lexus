(function () {
    "use strict";
    angular.module('globalApp').directive('ocsSelect', ['$rootScope', 'templateUrlService', '$timeout', directiveFunction]);
    
    function directiveFunction($rootScope, templateUrlService, $timeout) {
        return {
            restrict: "E",
            scope: {
                meta: "=",
                model: "=",
                focus: '@?',
                changeFn: "&"
            },
            templateUrl: templateUrlService.get('ocs-Select.html'),
            replace: true,
            controller: ["$scope", function ($scope) {
                // this incriments the global counter and creates a new uneque ID
                if ($rootScope.IdCounter === undefined) { $rootScope.IdCounter = 0; }
                $scope.elementID = "elem_" + $rootScope.IdCounter++;
            }],
            link: function (scope, element, attrs) {

                setFocus();
                setLabels();

                function setFocus() {
                    if (scope.focus && scope.focus == "1") {
                        $timeout(function () {
                            $("select:visible", element[0]).focus();
                        });
                    }
                }

                function setLabels() {
                    $timeout(function () {
                        $("option", element[0]).removeAttr("label");
                        $("option", element[0]).each(function (i) {
                            var labelGeneral = "";
                            if (scope.meta.label && scope.meta.label.lookUpMsg.value) {
                                labelGeneral = scope.meta.label.lookUpMsg.value.trim().slice(-1) == ":" ? scope.meta.label.lookUpMsg.value : scope.meta.label.lookUpMsg.value + ":";
                            }
                            var newLabel = labelGeneral + $(this).text();
                            $(this).attr("aria-label", newLabel);
                        });
                    });
                }

                // this is a manual way to add a default to the top of a select list.
                // (addDefault)
                if (scope.meta && scope.meta.addDefault && scope.meta.addDefault.lookUpMsg && scope.meta.addDefault.lookUpMsg.value) {
                    if (scope.meta.items && scope.meta.items.constructor === Array && scope.meta.items[0].value !== '' && scope.meta.items[0].value !== 0) {
                        
                        if (scope.meta.items[0].text != scope.meta.addDefault.lookUpMsg.value) {   // check if its already been added
                            scope.meta.items.unshift({ value: 0, text: scope.meta.addDefault.lookUpMsg.value });
                        }


                    }
                }

                // this fixes the angular bug that leaves a blank line on the top of a select list.
                scope.$watch("model", function (newVal, oldVal) {
                    if (!newVal && newVal !== oldVal) {
                        scope.model = scope.meta.items[0].value;
                    }
                });

                //Deep watch here so that the message change to static lists hits this
                scope.$watch("meta.items", function () {
                    if (scope.meta && scope.meta.items) {
                        // <- there are items
                        if (scope.meta.items[0]) {
                            // if there is a model value just set it
                            if (scope.model || scope.model == 0) {
                                //this will make an option on the list a "default", meaning its value is null, and will not be valid think (--select--)
                                if (scope.meta.voidDefault) {
                                    for (var x in scope.meta.items) {
                                        if (scope.meta.items[x].value == scope.meta.voidDefault) {
                                            scope.meta.items[x].value = '';
                                        };
                                    }
                                }
                            }
                            else {
                                var modelValue = '';
                                // is a data source list
                                if (scope.meta.items[0].text.lookUpMsg == undefined) {
                                    modelValue = scope.meta.items[0].value;
                                    if (scope.meta.voidDefault) {
                                        for (x in scope.meta.items) {
                                            if (scope.meta.items[x].value == scope.meta.voidDefault) {
                                                console.lig
                                                scope.meta.items[x].value = null;
                                            };
                                        }
                                        scope.singleItemForm.$setPristine();
                                    }
                                    else {
                                        modelValue = scope.meta.items[0].value;
                                    }
                                }
                                // its a manual list
                                else {
                                    modelValue = scope.meta.items[0].value;
                                    if (scope.meta.voidDefault) {
                                        for (x in scope.meta.items) {
                                            if (scope.meta.items[x].value == scope.meta.voidDefault) {
                                                scope.meta.items[x].value = null;
                                            };
                                        }
                                        scope.singleItemForm.$setPristine();
                                    }
                                    else {
                                        modelValue = scope.meta.items[0].value;
                                    }
                                }

                                //set the scope model
                                scope.model = (scope.meta.defaultSelected) ? scope.meta.defaultSelected : modelValue;
                            }
                        }
                    }
                }, true);
            }
        };

    };

})();




