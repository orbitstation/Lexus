(function () {
    'use strict';
    angular.module('globalApp').directive("ocsCheckBoxWithModal", ['$rootScope', '$uibModal', 'templateUrlService', directiveFunction]);

    function directiveFunction($rootScope, $uibModal, templateUrlService) {
        return {
            restrict: "E",
            scope: {
                meta: "=",
                model: "="
            },
            templateUrl: templateUrlService.get('ocs-CheckBoxWithModal.html'),
            replace: true,
            link: function (scope, element, attrs) {
                
                if ($rootScope.IdCounter === undefined) { $rootScope.IdCounter = 0; }
                scope.elementID = "elem_" + $rootScope.IdCounter++;

                scope.$watch('model', function (newValue, oldValue) {
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
                            
                            scope.trueModel = angular.copy(scope.temp);
                        } else {
                            scope.trueModel = [];
                        }
                    }
                });


                scope.$watch('trueModel', function (newValue) {
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
                             sortThis(t);
                        }
                    }
                }, true);

                function sortThis(input) {
                    var collection = angular.copy(scope.meta.items);
                    var model = angular.copy(input);
                    var temp = [];

                    function filterUnchecked(item) {
                        var used = false;
                        for (var z in model) {
                            if (model[z] === item.value) {
                                return true;
                            }
                        }
                        return false;
                    }

                    function filterChecked(item) {
                        var used = true;
                        for (var z in model) {
                            if (model[z] === item.value) {
                                return false;
                            }
                        }
                        return true;
                    }

                    var checked = collection.filter(filterUnchecked);

                    checked.sort(function (a, b) {
                        return a.text.localeCompare(b.text);
                    });
                    
                    var unchecked = collection.filter(filterChecked);

                    unchecked.sort(function (a, b) {
                        return a.text.localeCompare(b.text);
                    });

                    var modelArray = (function () {
                        var tempArray = [];
                        for (var i in checked) {
                            tempArray.push(checked[i].value);
                        }
                        return tempArray;
                    })();
                    
                    var output = checked.concat(unchecked);

                    scope.meta.items = angular.copy(output);
                    scope.model = angular.copy(modelArray);
                }

                scope.open = function () {
                    var modalInstance = $uibModal.open({
                        animation: false,
                        backdrop: false,
                        templateUrl: 'checkFilterModalContent.html',
                        controller: ['$scope', '$uibModalInstance', 'model', 'meta', function ($scope, $uibModalInstance, model, meta) {
                            $scope.collection = angular.copy(model);
                            var metaItems = (function () {
                                var items = angular.copy(meta.items);
                                items.sort(function (a, b) { return a.text.localeCompare(b.text); });
                                return items;
                            })();

                            $scope.meta = angular.copy(meta);

                            $scope.$watch('collection', function (newValue) {
                                if (newValue) {
                                    $scope.model = adjustModel(newValue);
                                }
                            });

                            function adjustModel(model) {
                                var model = angular.copy(model);
                                var modelObj = (function () {
                                    var isArray = Array.isArray(model);
                                    var tempObj = isArray ? {} : [];
                                    for (var i in model) {
                                        for (var x in metaItems) {
                                            if (model[i] === metaItems[x].value) {
                                                if (isArray) {
                                                    tempObj[x] = model[i];
                                                } else {
                                                    tempObj.push(model[i]);
                                                }
                                            }
                                        }
                                    }
                                    return tempObj;
                                })();
                                return modelObj;
                            }

                            $scope.items = (function () {
                                var items = angular.copy(metaItems);
                                var leftColumn = items.slice(0, Math.round(items.length / 2));
                                var rightColumn = items.slice(Math.round(items.length / 2), items.length);
                                return { left: leftColumn, right: rightColumn };
                            })();

                            $scope.return = function () {
                                $uibModalInstance.close(adjustModel($scope.model));
                            }
                        }],
                        resolve: {
                            model: function () {
                                var model = angular.copy(scope.model);
                                return model;
                            },
                            meta: function () {
                                var meta = angular.copy(scope.meta);
                                return meta;
                            }
                        }
                    });

                    modalInstance.result.then(function (results) {
                        scope.model = angular.copy(results);
                    });
                };
            }
        };
    };
})();

