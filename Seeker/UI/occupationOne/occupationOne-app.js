(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute','globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var dir = '/UI/occupationOne/';
        $routeProvider
        .otherwise({
            templateUrl: dir + 'index/occupationOne-index.html',
            controller: 'occupationOneIndexCtrl'
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

