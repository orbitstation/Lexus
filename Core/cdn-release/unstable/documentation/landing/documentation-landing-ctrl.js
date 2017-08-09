(function () {
    angular.module('miniSPA').controller('documentationLandingCtrl',
        ['$scope', '$rootScope', controller]);

    function controller($scope, $rootScope) {
        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages);
    }
})();

