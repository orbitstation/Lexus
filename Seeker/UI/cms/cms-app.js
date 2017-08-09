(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute', 'globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/cms/';
        var dir = '/UI' + miniSPA;
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider.
        when(miniSPA, {
            title: '175703',
            templateUrl: dir + 'multiPage/cms-multiPage.html',
            controller: 'cmsMultiPageCtrl'
        }).
        when(miniSPA + 'index', {
            title: '175703',
            templateUrl: dir + 'cmsIndex/cms-index.html',
            controller: 'cmsIndexCtrl'
        }).
        when(miniSPA + 'login', {
            title: '175703',
            templateUrl: dir + 'login/logIn-cms.html',
            controller: 'logInCmsCtrl'
        }).
        otherwise({
            title: '175703',
            redirectTo: miniSPA
        });
    }]).run(['$rootScope', '$http', '$route', 'titleService', run]);

    function run($rootScope, $http, $route, titleService) {
        $rootScope.isLoaded = false;
        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages).then(function () {
            $rootScope.isLoaded = true;
            $rootScope.$watch(function () { return $route.current.title }, function (newVal) {
                titleService.setTitle("", newVal);
            });
        });
    }

})();

