(function (angular) {
    angular.module("globalApp").run(['$rootScope', function ($rootScope) {
        $rootScope.channelsTest = { core: 'core' };
    }]);
})(angular);