(function () {
    "use strict";
    var miniSPA = '/jobView/';
    var dir = '/UI' + miniSPA;
    angular.module('miniSPA', ['ngRoute', 'globalApp', 'angularFileUpload'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider.
        when(miniSPA + ':token/apply', {
            templateUrl: dir + 'apply/jobView-apply.html',
            controller: 'jobViewApplyCtrl',
            title: '364973'
        }).
        when(miniSPA + ':token/apply-by-email', {
            templateUrl: dir + 'apply/jobView-apply.html',
            controller: 'jobViewApplyCtrl',
            title: '364973'
        }).
        otherwise({
            title: '364973',
            templateUrl: dir + 'index/jobView-index.html',
            controller: 'jobViewIndexCtrl'
        });
    }]).run(['$rootScope', '$route', 'titleService', run]);

    function run($rootScope, $route, titleService) {
        // Execute PreResolve Phase
        $rootScope.isLoaded = false;
        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages).then(function () {
            $rootScope.$on('$locationChangeSuccess', function () {
                setFooter(true);
            });
            
            $rootScope.isLoaded = true;
            $rootScope.$watch(function () { return $route.current.title }, function (newVal) {
                titleService.setTitle("", newVal);
            });
        });

        function setFooter(flag) {
            if ($rootScope.registry.localStore.global.context.ChannelAlias === 'MGSMIL') {
                $rootScope.configLayout.footer2.show.lookUpConfig.value = flag;
            } else {
                $rootScope.configLayout.footer.show.lookUpConfig.value = flag;
            }
        }
    }

})();

