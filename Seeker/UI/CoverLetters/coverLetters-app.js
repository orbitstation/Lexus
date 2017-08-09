(function () {
    "use strict";
    var app = angular.module('miniSPA', ['ngRoute', 'globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/coverletters/';
        var dir = '/UI' + miniSPA;
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider.
        when(miniSPA + 'create', {
            title: '157866',
            templateUrl: dir + 'create/coverLetters-create.html',
            controller: 'coverLettersCreateCtrl'
        }).
        when(miniSPA + 'edit/:id', {
            title: '157865',
            templateUrl: dir + 'edit/coverLetters-edit.html',
            controller: 'coverLettersEditCtrl'
        }).
        when(miniSPA + 'view/:id', {
            title: '368244',
            templateUrl: dir + 'view/coverLetters-view.html',
            controller: 'coverLettersViewCtrl'
        }).
        when(miniSPA + 'send/:id', {
            title: '157871',
            templateUrl: dir + 'send/coverLetters-send.html',
            controller: 'coverLettersSendCtrl'
        }).
        when(miniSPA, {
            title: '157799',
            templateUrl: dir + 'index/coverLetters-index.html',
            controller: 'coverLettersIndexCtrl'
        }).
        otherwise({
            title: '157799',
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
