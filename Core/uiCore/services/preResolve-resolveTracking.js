(function (angular) {
    'use strict';
    angular.module('globalApp').service('resolveTracking', ['$rootScope', '$q', 'trackFactory', 'registry', 'trackService', runFunction]);

    function runFunction($rootScope, $q, trackFactory, registry, trackService) {
        return {
            init: function () {
                var deferred = $q.defer();
                var configs = registry.get('global', 'trackingConfigs', 'sessionStorage');
                if (configs) {
                    trackService.configure(configs);
                    return deferred.resolve($rootScope.trackingConfigs);
                }
                else {
                    trackFactory.getTrackingConfigs().$promise.then(function (results) {

                        //  this checks for an inline script and base64 encodes it, (needed to allow cookies to function)
                        for (var x in results) {
                            if (results[x].inlineScript) {
                                results[x].inlineScript = btoa(results[x].inlineScript);
                            }
                        }

                        registry.set('global', 'trackingConfigs', results, 'sessionStorage');
                        trackService.configure(results);
                        return deferred.resolve($rootScope.trackingConfigs);
                    });
                    return deferred.promise;
                }
            }
        };
    }
})(angular);
