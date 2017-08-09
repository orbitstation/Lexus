(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute', 'globalApp', 'ppcTracking'])
    .config(['$routeProvider', 'ppcConfigProvider', function ($routeProvider, ppcConfigProvider) {
        var dir = '/UI/jobSearch3/';
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider.
        otherwise({
            title: '254828',
            templateUrl: function (urlattr) {
                return dir + 'summary/jobSearch-summary.html';
            },
            controller: 'jobSearchSummaryCtrl',
            controllerAs: 'vm',
            reloadOnSearch: false
        });

        //if (window.localStorage.registry && JSON.parse(window.localStorage.registry).global.context.EnvironmentType !== 'Production') {
        //    var env = JSON.parse(window.localStorage.registry).global.context.EnvironmentType;
        //    var dev = 'https://cloudapi.awsdevus.party2001.com/api/';
        //    var qa = 'https://cloudapi.awsqaus.mwwaws.com/api/';

        //    //replacing production path based on enviroment
        //    ppcConfigProvider.setServerUrl((env === 'Development') ? dev : qa);
        //}

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
