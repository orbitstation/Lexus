(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute','globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/careerPersonality/';
        var dir = '/UI' + miniSPA;
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider.
        when(miniSPA, {
            title: '367491',
            templateUrl: dir + 'index/careerPersonality-index.html',
            controller: 'careerPersonalityIndexCtrl'
        }).when(miniSPA + 'questions', {
            title: '367491',
            templateUrl: dir + 'questions/careerPersonality-questions.html',
            controller: 'careerPersonalityQuestionsCtrl'
        }).when(miniSPA + 'questions/:edit', {
            title: '367491',
            templateUrl: dir + 'questions/careerPersonality-questions.html',
            controller: 'careerPersonalityQuestionsCtrl'
        }).when(miniSPA + 'results', {
            title: '367491',
            templateUrl: dir + 'results/careerPersonality-results.html',
            controller: 'careerPersonalityResultsCtrl'
        }).
        otherwise({
            title: '367491',
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

