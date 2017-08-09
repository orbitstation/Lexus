(function () {
    "use strict";
    angular.module('miniSPA', [
      'ngRoute',
      'globalApp',
    ])
    .config(['$routeProvider', '$provide', configFunction])
    .run(['$routeProvider', '$rootScope', runFunction]);

    function configFunction($routeProvider, $provide) {
        $provide.factory('$routeProvider', function () {
            return $routeProvider;
        });
    }

    function runFunction($routeProvider, $rootScope) {
        var dir = $rootScope.registry.localStore.global.context.cdnUrl + '/documentation/';
        $routeProvider.
            when('/', {
                templateUrl: dir + 'landing/documentation-landing.html',
                controller: 'documentationLandingCtrl'
            }).
            when('/directives', {
                templateUrl: dir + 'directives/documentation-directives.html',
                controller: 'documentationDirectivesCtrl',
                reloadOnSearch: false
            }).
            when('/factories', {
                templateUrl: dir + 'factories/documentation-factories.html',
                controller: 'documentationFactoriesCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
})();