(function () {
    "use strict";
    angular.module('miniSPA', ['globalApp', 'angularFileUpload'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/careerPlan/';
        var dir = '/UI' + miniSPA;
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider
            .when(miniSPA + 'goal', {
                title: '360065',
                templateUrl: dir + 'careerGoal/careerGoal.html',
                controller: 'careerGoalCtrl'
            })
            .when(miniSPA + 'goal/:id', {
                title: '360065',
                templateUrl: dir + 'careerGoal/careerGoal.html',
                controller: 'careerGoalCtrl'
            })
            .when(miniSPA, {
                title: '360065',
                templateUrl: dir + 'index/careerPlan-index.html',
                controller: 'careerPlanCtrl'
            })
            .otherwise({
                title: '360065',
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

