(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute', 'globalApp', 'slickCarousel'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/home/';
        var dir = '/UI' + miniSPA;
        $routeProvider.
        when(miniSPA, {
            title: '369877',
            templateUrl: dir + 'index/home-index.html',
            controller: 'homeIndexCtrl'
        }).
        otherwise({
            title: '369877',
            redirectTo: miniSPA
        });
    }])
        .run(['$rootScope', '$route', 'titleService', run])
        .config(['slickCarouselConfig', function (slickCarouselConfig) {
            //slickCarouselConfig.dots = true;
        }]);;

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
