(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute','globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/account/';
        var dir = '/UI' + miniSPA;
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider
            .when(miniSPA, {
                title:"364082",
                templateUrl: dir + 'account-create.html',
                controller: 'accountCreate',
                controllerAs: 'vm'
            })
            .when(miniSPA + 'change-password', {
                title: '374989',
                templateUrl: dir + 'changePassword/changePassword.html',
                controllerAs: 'vm',
                controller: 'changePasswordCtrl'
            })
            .otherwise({
                title: "364082",
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

        /// Append Page Level Constants To Root Scope Constants
        angular.extend($rootScope.constants, {
            //Veteran
            TITLE10ACTIVATION_ACTIVE: '84288',
            TITLE10ACTIVATION_VETERAN: '84289',
            //Farm Workers
            FARM_WORK_TYPE_WORKER: '86350',
            FARM_WORK_TYPE_PROCESSOR: '86351',
        });
        


    }

})();







