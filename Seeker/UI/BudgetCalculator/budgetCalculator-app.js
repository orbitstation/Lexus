(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute', 'globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/budgetCalculator/';
        var dir = '/UI' + miniSPA;
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider.
        when(miniSPA, {
            title: '369572',
            templateUrl: dir + 'index/budgetCalculator-index.html',
            controller: 'budgetCalculatorIndexCtrl'
        }).
        otherwise({
            title: '369572',
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

