﻿(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute','globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/aboutUs/';
        var dir = '/UI' + miniSPA;
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider.
        when(miniSPA, {
            title: "369112",
            templateUrl: dir + 'index/aboutUs-index.html',
            controller: 'aboutUsIndexCtrl'
        }).
        otherwise({
            title: "369112",
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

