(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute', 'globalApp'])
    .config(['$routeProvider', function ($routeProvider) {

        var miniSPA = '/savedJobs/';
        var dir = '/UI' + miniSPA;
        $routeProvider.
            when(miniSPA, {
                title:'205039',
                templateUrl: dir + 'index/savedJobs-index.html',
                controller: 'savedJobsIndexCtrl'
            }).
            otherwise({
                title: '205039',
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
