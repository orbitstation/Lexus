(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute','globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/help/';
        var dir = '/UI' + miniSPA;
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider.
        when(miniSPA+ 'careerPlan', {
            templateUrl: dir + 'careerPlan/careerPlan.html',
            controller: 'helpCtrl'
        }).
        otherwise({
            redirectTo: miniSPA
        });
    }]).run(['$rootScope', run]);

    function run($rootScope) {
        // Execute PreResolve Phase
        $rootScope.isLoaded = false;
        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages).then(function () {
            $rootScope.isLoaded = true;
        });
    }

})();

