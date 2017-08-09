(function (angular) {
    angular.module("globalApp").run(['$rootScope', function ($rootScope) {
        $rootScope.channelsTest.lexusdemo = 'lexusdemo';
    }]);
})(angular);