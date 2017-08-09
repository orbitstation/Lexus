(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute','globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/schools/';
        var dir = '/UI' + miniSPA;
        $routeProvider.
        when(miniSPA, {
            title:'348852',
            templateUrl: dir + 'index/schools-index.html',
            controller: 'schoolsIndexCtrl'
        }).
        when(miniSPA + 'view/:oneTcode/:id', {
            title: '364328',
            templateUrl: dir + 'view/schools-view.html',
            controller: 'schoolsViewCtrl'
        }).
        otherwise({
            title: '348852',
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

