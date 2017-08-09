(function () {
    "use strict";
    angular.module('miniSPA', ['globalApp'])
    .run(['$rootScope', '$location', 'authentication', run]);

    function run($rootScope, $location, authentication) {
        // Execute PreResolve Phase
        $rootScope.isLoaded = false;
        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages).then(function () {
            $rootScope.isLoaded = true;
        });
        var auth = $location.search().auth;
        authentication.impersonate(auth);
    }
})();