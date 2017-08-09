(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute', 'globalApp', 'angularFileUpload'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/documents/';
        var dir = '/UI' + miniSPA;
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider.
        when(miniSPA, {
            title:'364094',
            templateUrl: dir + 'summary/documents-summary.html',
            controller: 'documentsSummaryCtrl'
        }).
        otherwise({
            title: '364094',
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

