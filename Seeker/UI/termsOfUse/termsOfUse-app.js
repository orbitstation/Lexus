(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute','globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/termsOfUse/';
        var dir = '/UI' + miniSPA;
        $routeProvider.
        when(miniSPA, {
            title: '70689',
            templateUrl: dir + 'index/termsOfUse-index.html',
            controller: 'termsOfUseIndexCtrl'
        }).
        otherwise({
            title: '70689',
            redirectTo: miniSPA
        });
    }]).run(['$rootScope', '$route', 'titleService', run]);

    function run($rootScope, $route, titleService) {
        // Execute PreResolve Phase
        $rootScope.isLoaded = false;
        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages).then(function () {
            $rootScope.isLoaded = true;
            $rootScope.$watch(function () { return $route.current.title }, function (newVal) {
                titleService.setTitle("", newVal);
            });
        });
    }

})();

