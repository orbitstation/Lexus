(function () {
    'use strict';
    angular.module('globalApp').directive("ocsDate", ['$rootScope', 'templateUrlService', directiveFunction]);

    function directiveFunction($rootScope, templateUrlService) {
        return {
            restrict: "E",
            scope: {
                meta: "=",
                model: "=",
                match: "@"
            },
            templateUrl: templateUrlService.get('ocs-Date.html'),
            replace: true,
            controller: ['$scope', function ($scope) {
          
                // this syncronizes the dateOptions with the meta, if the meta changes
                $scope.$watchCollection('meta', function (newVal, oldVal) {
                    var max = newVal.maxDate;
                    if (max) {
                        if (max != 'today') {
                            $scope.dateOptions.maxDate = new Date(max);
                        }
                    }
                    var min = newVal.minDate;
                    if (min) {
                        if (min != 'today') {
                            $scope.dateOptions.minDate = new Date(min);
                        }
                    }
                });

                var dateFormat = (function(){
                    var coll = $scope.meta.minMode;
                    if (coll) {
                        var types = {
                            'month': function(){ return 'MM/yyyy'},
                            'year': function(){ return 'yyyy'},
                            'default': function (){ return 'MM/dd/yyyy'}
                        }
                        return (types[coll] || types['default'])();
                    } else {
                        return 'MM/dd/yyyy';
                    }
                })();

                $scope.format = dateFormat;
                $scope.dateOptions = {
                    datepickerMode: $scope.meta.dateMode || 'day',
                    startingDay: 1,
                    showWeeks: false,
                    minMode:  $scope.meta.minMode || 'day' 
                };


                if ($scope.model !== undefined && $scope.model !== '' && $scope.model !== null) {
                    $scope.model = new Date($scope.model);
                } else {
                    $scope.model = null;
                }


                // max date
                if ($scope.meta.maxDate === 'today') {
                    angular.extend($scope.dateOptions, {
                        maxDate: new Date()
                    });
                }
                if ($scope.meta.maxDate !== 'today') {
                    angular.extend($scope.dateOptions, {
                        maxDate: new Date($scope.meta.maxDate),
                        minDate: new Date($scope.meta.minDate)
                    });
                }


                // min date
                if ($scope.meta.minDate === 'today') {
                    angular.extend($scope.dateOptions, {
                        minDate: new Date()
                    });
                }



            }],
            compile: function (element, attrs) {
                return {
                    pre: function preLink(scope, element, attrs) {
                        // look up mask name and resolve, if not found then pass value as is
                        if ($rootScope.productVariables.standardMask) {
                            var temp = $rootScope.productVariables.standardMask[scope.meta.mask];
                            scope.mask = (temp === undefined) ? scope.meta.mask : temp;
                        }

                        //allows to resize the form
                        scope.formSize = attrs.formSize;
                    },
                    post: function (scope, elem, attrs, ctrl) {
                        // this incriments the global counter and creates a new uneque ID
                        if ($rootScope.IdCounter === undefined) { $rootScope.IdCounter = 0; }
                        scope.elementID = "elem_" + $rootScope.IdCounter++;

                        scope.$watch('model', function (newVal, oldVal) {
                            //  set error if typed in date is higher/lesser than allowed minDate/maxDate - simple workaround for invalidating the form without setting the uib-datepicker-popup.
                            //  Feel free to replace with something more complex.
                            if (newVal > scope.dateOptions.maxDate || newVal < scope.dateOptions.minDate) {
                                scope.singleItemForm.$setValidity('dateDisabled', false);
                            } else {
                                scope.singleItemForm.$setValidity('dateDisabled', true);
                            }
                            
                            //  set error state if the model is null (backspace till empty)
                            if (newVal == null){
                                scope.singleItemForm.$valid = false;
                            }
                        });
                    }
                };
            }
        };
    };
})();



