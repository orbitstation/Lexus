(function () {
    'use strict';

    angular.module('globalApp').service('lookUpGlobalJson', ['$rootScope', serviceFunction]);
    function serviceFunction($rootScope) {
        return {
            init: function () {
                // this is the global channel look-up function for the template system
                $rootScope.cfg = function (id) {
                    id = id.split(".");
                    var v = "";
                    var value = $rootScope.configLayout;
                    for (var x in id) {
                        value = value[id[x]];
                    }
                    
                    if (value) {
                        value = value.lookUpConfig.value;
                        return value
                    }

                    console.log("config '" +id+ "' not Resolved!");
                    return false;
                }

                //not really need anymore???
                $rootScope.getStorage = function (name) {
                    return $rootScope.registry.sessionStore.delayedSave[name];
                }

                // this is the global message look up function for the template system
                $rootScope.msg = function (id) {
                    //return $rootScope.meta.messages[id].lookUpMsg.value;

                    for (var x in $rootScope.serverMessagesObj) {
                        if ($rootScope.serverMessagesObj[x].id == id) {
                            return $rootScope.serverMessagesObj[x].text || $rootScope.serverMessagesObj[x].value;
                        }
                    }
                }


                // note: this should be removed, the new function is cfg()
                $rootScope.getLayoutConfig = function (theOne) {
                    return $rootScope.configLayout[theOne].lookUpConfig.value;
                }

                // note: this should be removed, the new function is cfg()
                // this is the global Config look up function for the template system
                $rootScope.getConfig = function (id) {
                    return findConfig(id, $rootScope.configLayout);
                }

            }
        }
    }

})();
