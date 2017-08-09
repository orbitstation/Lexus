(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute', 'globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/error/';
        var dir = '/UI' + miniSPA;
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider.
        when(miniSPA, {
            title:'371123',
            templateUrl: dir + 'index/error-index.html',
            controller: 'errorIndexCtrl'
        }).
        otherwise({
            title: '371123',
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

