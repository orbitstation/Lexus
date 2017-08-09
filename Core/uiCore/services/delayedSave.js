(function (angular) {
    'use strict';
    angular.module('globalApp').service('delayedSave', ['$rootScope', '$window', 'registry', '$q', service]);

    function service($rootScope, $window, registry, $q) {
        function compareNow(dateTime) {

            if (dateTime) {
                var momentA = moment(new Date(dateTime)).utc();
                var momentB = moment(new Date()).utc();
                if (momentA > momentB) return true;
                else if (momentA < momentB) return false;
                else return false;
            }
            else {
                return true;
            }
        }

        var service = this;
        service.persistors = {};
        service.addPersistor = function (name, persistFunction) {
            service.persistors[name] = persistFunction;
        };

        service.init = function () {
            var promises = [];
            
            // session storage: load delayed save "promises" list
            if ($rootScope.registry && $rootScope.registry.sessionStore && $rootScope.registry.sessionStore.delayedSave) {
                var delayedSaveItems = $rootScope.registry.sessionStore.delayedSave;
                for (var key in delayedSaveItems) {
                    if (delayedSaveItems.hasOwnProperty(key)) {
                        var promise = createSavePromise(key, delayedSaveItems[key], 'sessionStorage');
                        if (promise !== null) {
                            promises.push(promise);
                        }
                    }
                }
            }

            // local storage: load delayed save "promises" list
            if ($rootScope.registry && $rootScope.registry.localStore && $rootScope.registry.localStore.delayedSave) {
                var delayedSaveItems = $rootScope.registry.localStore.delayedSave;
                for (var key in delayedSaveItems) {
                    if (delayedSaveItems.hasOwnProperty(key)) {
                        var promise = createSavePromise(key, delayedSaveItems[key], 'localStorage');
                        if (promise !== null) {
                            promises.push(promise);
                        }
                    }
                }
            }
            return $q.all(promises);
        };

        function createSavePromise(itemForSaveName, itemForSaveObj, type) {
            if (typeof service.persistors[itemForSaveName] !== undefined) {
                var persistFunction = service.persistors[itemForSaveName];
                // if this save is already in progress, then bail out now
                if (itemForSaveObj.hasOwnProperty('saveInProgress') && itemForSaveObj.saveInProgress) {
                    return null;
                }
                    registry.setDelayedSaveInProgress(itemForSaveName, type);
                    return persistFunction(itemForSaveObj).then(function (data) {
                        broadcast(data, itemForSaveName);
                        registry.removeDelayedSave(itemForSaveName, type);
                    });
            }
            return null;
        }

        function broadcast(result, serviceName) {
            $rootScope.$broadcast('savedDelay', { data: result, service: serviceName });
        }

    }
})(angular);