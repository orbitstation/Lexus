(function (angular) {
    'use strict';
    angular.module('globalApp')
        .run(['$rootScope', 'registry', 'delayedSave', 'savedJobsFactory', 'jobSearchFactory', '$window',
            function ($rootScope, registry, delayedSave, savedJobsFactory, jobSearchFactory, $window) {

                //list of items to save on login if exist
                var toSaveKeys = ['saveJob', 'saveAgent'];

                delayedSave.addPersistor('saveJob', function (itemForSaveObj) {
                    return savedJobsFactory.saveJob(itemForSaveObj).$promise.then(function (response) {
                        $rootScope.$broadcast('savedDelay', { data: response, service: 'saveJob' });
                    },
                    function (response) {
                        $rootScope.topMasterErrors.push({ type: 'alert-danger', text: ((response && response.data && response.data.message) ? response.data.message : '') });
                    });
                });

                delayedSave.addPersistor('saveAgent', function (itemForSaveObj) {
                    return jobSearchFactory.createAgent(itemForSaveObj).$promise.then(function (response) {
                        $rootScope.$broadcast('savedDelay', { data: response, service: 'saveAgent' });
                    },
                    function (response) {
                        $rootScope.topMasterErrors.push({ type: 'alert-danger', text: ((response && response.data && response.data.message) ? response.data.message : '') });
                    });
                });

                $rootScope.$watch('isAuthenticated', function (newValue, oldValue) {
                    if (oldValue) {
                        //Saving items in local/session storage
                        if ($rootScope.isAuthenticated && !isEmpty(registry.getAll('localStorage').delayedSave)) {
                            delayedSave.init().then(function () {
                                for (var i in toSaveKeys) {
                                    registry.removeDelayedSave(toSaveKeys[i], 'localStorage');
                                }
                            });
                        }
                    }
                });

                //Header animation options
                $rootScope.headerOptions = {
                    offset: 36
                };

                //$window.FastClick.attach($window.document.body);

                if ('addEventListener' in document) {
                    document.addEventListener('DOMContentLoaded', function () {
                        FastClick.attach(document.body);
                    }, false);
                }
            }]);

    function isEmpty(obj) {
        for (var x in obj) { if (obj.hasOwnProperty(x)) return false; }
        return true;
    }

})(angular);
