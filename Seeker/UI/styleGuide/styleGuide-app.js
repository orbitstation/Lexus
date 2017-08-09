(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute','globalApp'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        var dir = '/UI/styleGuide/';
        $routeProvider.
        when('/styleguide', {
            title: '175703',
            templateUrl: dir + 'landing/styleGuide.html',
            controller: 'styleGuideCtrl'
        }).
        otherwise({
            title: '175703',
            redirectTo: '/styleguide'
        });

    }]).run(['$rootScope', '$http', '$route', 'titleService', run]);

    function run($rootScope, $http, $route, titleService) {

        $rootScope.isLoaded = false;
        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages).then(function () {
            $rootScope.isLoaded = true;
            $rootScope.$watch(function () { return $route.current.title }, function (newVal) {
                titleService.setTitle("", newVal);
            });
        });
    }

})();

