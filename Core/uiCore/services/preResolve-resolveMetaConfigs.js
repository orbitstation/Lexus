//  pre-resolve all Layout Configs : 
//
//  meta Configs
//
(function () {
    'use strict';
    angular.module('globalApp').service('resolveMetaConfigs', ['$rootScope', '$q', 'channelConfig', runFunction]);
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


        function getData(configs) {
            var deferred = $q.defer();

            if ((configs.length > 0) && (configs !== undefined)) {
                channelConfig.post(configs).$promise.then(function (data) {
                    return deferred.resolve(data);
                });
            } else {
                return deferred.resolve();
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





        // this is the second stage,  it takes the values from the metaConfig and places the values in the same tree spot in the meta object.
        // this function recurses threw the metaConfig, collects the path to the endpoint in an array (path), and sends the path and value to the setJsonValue function.
        function superemposeConfigsAndMeta(j, targetMeta, path) {
            if (path == undefined) { path = [] };
            for (var x in j) {
                if (typeof j[x] === 'object') {
                    if (x === 'lookUpConfig') {
                        var id = j[x].serverId;
                        var value = j[x].value;
                        setJsonValue($rootScope.meta, path, value);
                    }
                    else {
                        path.push(x);
                        superemposeConfigsAndMeta(j[x], targetMeta, path);
                    }
                }
            }
        }


        // find a node in a json object based on an array (used as a map), and set the end point value
        function setJsonValue(j, path, value) {
            var n = 0;
            for (n in j) {
                //console.log(path);
                if (path.length > 0) {
                    if (n == path[0]) {
                        path.shift(); // drop the first array eliment becase its been found as a node
                        if (path.length == 0) {  // correct endpoint found
                            j[n] = value;
                        }
                        if (typeof j[n] == 'object') {  //  its an object so dig deeper
                            setJsonValue(j[n], path, value);
                        }
                        break;  // for effecency stop the loop if the node matches.
                    }
                }
            }
        }





        //                                                ____________________________
        //_______________________________________________/  Meta Configs pre-resolve  \_____________________
        //

        return {
            init: function () {
                var deferred = $q.defer();
                var list = createList($rootScope.configMeta);

                if (list.length > 0) {
                    getData(list).then(function (results) {
                        placeData($rootScope.configMeta, results);
                        //  note: this still needs work,  it needs to now update $rootScope.meta with the values from $rootScope.configMeta
                        superemposeConfigsAndMeta($rootScope.configMeta, $rootScope.meta);

                        return deferred.resolve()
                    });
                } else {
                    return deferred.resolve()
                }


                return deferred.promise;
            },

        }
    }

})();















//// overwrites the meta variables with the returned configs
//function placeData(config, nodeTree) {
//    if (!nodeTree) { nodeTree = []; }
//    var x = 0;
//    for (x in config) {
//        if (typeof config[x] === 'object') {
//            nodeTree.push(x);
//            if (x === 'lookUpConfig') {
//                var id = config[x].serverId;
//                var value = config[x].value;

//                if (value) {
//                    nodeTree.pop();  // remove the last node ('lookUpConfig ')
//                    setJsonValue($rootScope.meta, nodeTree, value);
//                }

//            }
//            placeData(config[x], nodeTree);
//        }
//    }
//}



//// find a node in a json object based on an array (used as a map), and set the end point value
//function setJsonValue(j, path, value) {
//    var n = 0;
//    for (n in j) {
//        //console.log(path);
//        if (path.length > 0) {
//            if (n == path[0]) {
//                path.shift(); // drop the first array eliment becase its been found as a node
//                if (path.length == 0) {  // correct endpoint found
//                    j[n] = value;
//                }
//                if (typeof j[n] == 'object') {  //  its an object so dig deeper
//                    setJsonValue(j[n], path, value);
//                }
//                break;  // for effecency stop the loop if the node matches.
//            }
//        }
//    }
//}



