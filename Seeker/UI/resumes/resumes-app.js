(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute', 'globalApp', 'angularFileUpload'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/resumes/'
        var dir = '/UI' + miniSPA;
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider
        .when(miniSPA, {
            title: '158471',
            templateUrl: dir + 'index/resumes-index.html',
            controller: 'resumesSummaryCtrl'
        })
        .when(miniSPA + 'start', {
            title: '156393',
            templateUrl: dir + 'start/resumes-start.html',
            controller: 'resumesStartCtrl'
        })
        .when(miniSPA + 'start/:resumeValue', {
            title: '368246',
            templateUrl: dir + 'start/resumes-start.html',
            controller: 'resumesStartCtrl'
        })
        .when(miniSPA + 'send/:value', {
            title:'368249',
            templateUrl: dir + 'send/resumes-send.html',
            controller: 'sendResumeCtrl'
        })
        .when(miniSPA + 'rating/:value', {
            title: '356189',
            templateUrl: dir + 'rating/resumes-rating.html',
            controller: 'rateResumeCtrl'
        })
        .when(miniSPA + 'view/:value', {
            title:'320230',
            templateUrl: dir + 'view/resumes-view.html',
            controller: 'viewResumeCtrl'
        })
        .when(miniSPA + 'status/:value', {
            title:'155892',
            templateUrl: dir + 'status/resumes-status.html',
            controller: 'statusResumeCtrl'
        })
        .when(miniSPA + 'edit/:value', {
            title: '368246',
            templateUrl: dir + 'edit/resumes-edit.html',
            controller: 'editResumeCtrl'
        })
        .otherwise({
            title: '158471',
            redirectTo: miniSPA
        });
    }]).run(['$rootScope', '$route','titleService', run]);

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
