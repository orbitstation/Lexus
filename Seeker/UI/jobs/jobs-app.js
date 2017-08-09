(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute', 'globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/jobs/';
        var dir = '/UI' + miniSPA;
        $routeProvider.
        when(miniSPA, {
            title: '',
            templateUrl: dir + 'index/jobs-index.html',
            controller: 'jobsIndexCtrl',
            controllerAs: 'vm'
        }).
       /* when('/company', {
            title: '',
            templateUrl: dir + 'company/jobs-company-index.html',
            controller: 'jobsCompanyIndexCtrl',
            controllerAs: 'vm'
        }).
        when('/company/:letter', {
            title: '',
            templateUrl: dir + 'company/jobs-company-index.html',
            controller: 'jobsCompanyIndexCtrl',
            controllerAs: 'vm'
        }).*/
        otherwise({
            title: '',
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

