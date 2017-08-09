(function () {
    'use strict';
    angular.module("globalApp").service("logInWatcher", ['$rootScope', '$window', 'registry', 'delayedSave', service]);
    function service($rootScope, $window, registry, delayedSave) {
        return {
            init: function () {
                $rootScope.logInWatcher = function (initFunction, onLogout) {
                    //if ($rootScope.isAuthenticated) {
                    //    callInitFunction();
                    //}

                    function callInitFunction()
                    {
                        if (initFunction)
                        {
                            initFunction();
                        }
                    }

                    $rootScope.$watch('isAuthenticated', function (newValue, oldValue) {
                        if (newValue === false && oldValue === true) {
                            // they clicked the log out button
                            registry.purge();
                            //pass if you like to do stuff on logout
                            if (onLogout) {
                                onLogout();
                            }
                            //$window.location.reload();  // or a redirect
                            window.location.assign('/home');
                        }
                        if (newValue === true) {
                            // they have just logged in
                            delayedSave.init().then(callInitFunction);
                        }
                    });
                };
            }
        };
    }
})();



