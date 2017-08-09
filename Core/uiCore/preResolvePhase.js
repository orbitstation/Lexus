(function () {

    angular.module('globalApp').run(['$rootScope', 'channelConfig', 'dataSourceService', 'resolveLayoutConfigs', '$q', 'cacheService', '_', 'menuCreator', 'resolveMetaMessages', 'resolveMetaConfigs', 'resolveDataSource', 'resolveTracking', 'timeoutManager', 'authenticationStorage', 'registry', 'samlAuth',
    function ($rootScope, channelConfig, dataSourceService, resolveLayoutConfigs, $q, cacheService, _, menuCreator, resolveMetaMessages, resolveMetaConfigs, resolveDataSource, resolveTracking, timeoutManager, authenticationStorage, registry, samlAuth) {

        var dashboardUrl = '/dashboard/';
        var homeUrl = '/home/';
        //
        //                                                                      _________________
        // ____________________________________________________________________/  Init variables \___________
        if (!$rootScope.config) { $rootScope.config = {}; }
        if (!$rootScope.serverMessagesObj) { $rootScope.serverMessagesObj = {}; }

        //
        //                                                                      ____________________
        // ____________________________________________________________________/  pre-resolve Phase \___________

        $rootScope.preResolvePhase = function (metaObject, msgObject, cfgObject) {

            // reset page errors
            registry.remove('PageErrors', '', 'sessionStorage');
            $rootScope.topErrorList = [];

            //dataScourceList = findAlldataSource($rootScope.meta);

            // Clear out informational error messages
            $rootScope.topMasterErrors = [];
            return $q.all([
                    resolveMetaMessages.init(),
                    resolveLayoutConfigs.init(),
                    resolveMetaConfigs.init(),
                    resolveDataSource.init(),
                    resolveTracking.init()
            ]).then(function (results) {

                $rootScope.meta.menuConfig = menuCreator.initialize($rootScope.meta.menuConfig);
                $rootScope.meta.navMasterItems = menuCreator.initialize($rootScope.meta.navMasterItems);
                if ($rootScope.meta.menuLogged) {
                    $rootScope.meta.menuLogged = menuCreator.initialize($rootScope.meta.menuLogged);
                }

                $rootScope.meta.breadCrumbs = menuCreator.createBreadCrumbs($rootScope.meta.menuConfig, $rootScope.meta.navMasterItems);
                $rootScope.$watch('isAuthenticated', function (newValue, oldValue) {
                    if (newValue === true) {
                        changeUrl(newValue);
                        timeoutManager.start({
                            showWarning: $rootScope.cfg('sessionTimeout.showWarning'),
                            timeToWarning: $rootScope.cfg('sessionTimeout.timeToWarning'),
                            timeToLogOut: $rootScope.cfg('sessionTimeout.timeToLogOut')
                        });
                    }
                    if (oldValue === false && newValue === false) {
                        changeUrl();
                        timeoutManager.checkLoggedOutInfo();
                    }
                });

                samlAuth.init();
                $rootScope.$broadcast('preResolved');

                function changeUrl(logged) {
                    var notSAML = !samlAuth.isAuthenticatingUsingSaml();
                    if (notSAML) {
                        if (logged) {
                            $rootScope.meta.menuConfig[0].bucket.url = dashboardUrl;
                        } else {
                            $rootScope.meta.menuConfig[0].bucket.url = homeUrl;
                        }
                    }
                    $rootScope.meta.nav1 = menuCreator.create($rootScope.meta.menuConfig, $rootScope.meta.navMasterItems);
                    $rootScope.meta.breadCrumbs = menuCreator.createBreadCrumbs($rootScope.meta.menuConfig, $rootScope.meta.navMasterItems);
                }

                return results;
            });
        };

    }]);


})();

