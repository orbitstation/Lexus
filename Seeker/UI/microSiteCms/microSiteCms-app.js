(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute','globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var dir = '/UI/microSiteCms/';
        $routeProvider.
        when('/', {
            templateUrl: dir + 'index/microSiteCms-index.html',
            controller: 'microSiteCmsIndexCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]).run(['$rootScope', run]);

    function run($rootScope) {
        // Execute PreResolve Phase
        $rootScope.isLoaded = false;
        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages).then(function () {
            $rootScope.isLoaded = true;
        });
    }

})();

