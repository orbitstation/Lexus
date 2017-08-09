//  pre-resolve all Layout Configs : 
//
//
//
(function () {
    'use strict';
    angular.module('globalApp').service('resolveDataSource', ['$rootScope', '$q', 'dataSourceService', runFunction]);
    function runFunction($rootScope, $q, dataSourceService) {

        //                                                _______________________
        //_______________________________________________/   private functions   \_____________________
        //
        function createList(j, list) {
            //var deferred = $q.defer();

            if (list == undefined) {
                var list = new Array(1);
                list[0] = [];
                list[1] = [];
                list[2] = [];
                list[3] = [];

            };
            for (var x in j) {
                if (typeof j[x] === 'object') {
                    if (x === 'dataSource') {
                        var name = j[x].name;
                        var value = j[x].value;
                        var value2 = j[x].value2;
                        var itsNew = true;
                        for (var q in list) {
                            if ((name == list[q][0]) && (value == list[q][1])) {
                                itsNew = false;
                            }
                        }
                        if ((itsNew === true) && (name != "")) {
                            list[0].push(name);
                            list[1].push(value);
                            list[2].push(value2);
                            list[3].push(j);
                        }
                    }
                    else {
                        createList(j[x], list);
                    }
                }
            }

            return list;
            //return deferred.promise;
        }


        function getData(list) {
            var deferred = $q.defer();

            var fullList = [];
            for (var x=0 ; x<list[0].length; x++) {
                var serviceName = list[0][x];
                var variable = list[1][x];
                var variable2 = list[2][x];
                var locationInTree = list[3][x];

                fullList.push(promiseData(serviceName, variable, variable2, locationInTree));

            }

            $q.all(fullList).then(function (results) {
                return deferred.resolve();
            });

            return deferred.promise;
        }


        function promiseData(serviceName, variable, variable2, locationInTree) {
            var deferred = $q.defer();
            dataSourceService.dataSource(serviceName, variable, variable2).then(function (results) {
                locationInTree.items = results;
                return deferred.resolve();
            });
            return deferred.promise;
        }




        //                                                _____________________________
        //_______________________________________________/  layout Configs pre-resolve \_____________________
        //

        return {
            init: function () {
                var deferred = $q.defer();

                var list = createList($rootScope.meta);
                getData(list).then(function (results) {
                    return deferred.resolve();
                });

                return deferred.promise;
            },
        }
    }

})();
