(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute','globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var dir = '/UI/spaStatus/';
        $routeProvider.
        when('/menuCreator', {
            templateUrl: dir + 'menuCreator/spaStatus-menuCreator.html',
            controller: 'menuCreatorIndexCtrl'
        }).            
        otherwise({
            templateUrl: dir + 'index/spaStatus-index.html',
            controller: 'spaStatusIndexCtrl'
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
