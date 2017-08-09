//  pre-resolve all Layout Configs : 
//
//
//
(function () {
    'use strict';
    angular.module('globalApp').service('resolveLayoutConfigs', ['$rootScope', '$q', 'channelConfig', runFunction]);
    function runFunction($rootScope, $q, channelConfig) {

        //                                                _______________________
        //_______________________________________________/   private functions   \_____________________
        //
        function createList(j, list) {
            if (list == undefined) { var list = [] };
            for (var x in j) {
                if (typeof j[x] === 'object') {
                    if (x === 'lookUpConfig') {
                        var id = j[x].serverId;
                        var itsNew = true;
                        for (var q in list) {
                            if (id == list[q]) { itsNew = false; }
                        }
                        if ((itsNew === true) && (id != "")) { list.push(id); }
                    }
                    else { createList(j[x], list) }
                }
            }
            return (list);
        }


        function getData(list) {
            var deferred = $q.defer();
            if ((list !== undefined) && (list.length > 0)) {
                channelConfig.post(list).$promise.then(function (data) {
                    return deferred.resolve(data);
                });
            } else {
                return deferred.resolve($rootScope.configLayout);
            }
            return deferred.promise;
        }



        function placeData(j, returnedData) {
            for (var x in j) {
                if (typeof j[x] === 'object') {
                    if (x === 'lookUpConfig') {
                        var id = j[x].serverId;
                        var value = j[x].value;
                        if (id) {
                            var cfg = lookup(id, returnedData);
                            if (cfg) {
                                j[x].value = cfg;
                            }
                        }
                    }
                    else { placeData(j[x], returnedData) }
                }
            }
        }


        function lookup(alias, returnedData) {
            var j = returnedData;
            if (j) {
                for (var r = 0; r < j.length; r++) {
                    if (j[r].channelConfigAlias == alias) {
                        if (j[r].channelConfigValue) {
                            return (j[r].channelConfigValue);
                        }
                    }
                }
            }
            return "Not Found";
        }


        //                                                _____________________________
        //_______________________________________________/  layout Configs pre-resolve \_____________________
        //

        return {
            init: function () {
                var deferred = $q.defer();
                getData(createList($rootScope.configLayout)).then(function (results) {
                    placeData($rootScope.configLayout, results);
                    return deferred.resolve()
                });
                return deferred.promise;
            },
        }
    }

})();
