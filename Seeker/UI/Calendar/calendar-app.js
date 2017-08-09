(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute', 'globalApp', 'kendo.directives'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/calendar/';
        var dir = '/UI' + miniSPA;
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider.
        when(miniSPA, {
            title: '363459',
            templateUrl: dir + 'index/calendar-index.html',
            controller: 'calendarIndexCtrl'
        }).
        otherwise({
            title: '363459',
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

