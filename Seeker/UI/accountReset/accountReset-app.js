(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute', 'globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/accountReset/';
        var dir = '/UI' + miniSPA;
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider.
        when(miniSPA + 'forgotPassword', {
            title: "70203",
            templateUrl: dir + 'forgotPassword/forgotPassword.html',
            controller: 'forgotPasswordCtrl'
        }).
        when(miniSPA + 'resetPassword/:token', {
            title: "151887",
            templateUrl: dir + 'resetPassword/resetPassword.html',
            controller: 'resetPasswordCtrl'
        }).
        when(miniSPA, {
            title:'363929',
            templateUrl: dir + 'index/index.html',
            controller: 'indexCtrl'
        }).
        otherwise({
            title: '363929',
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

