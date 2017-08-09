(function () {
    angular.module('globalApp').controller('ErrorCtrl', controller);
    controller.$inject = ['$rootScope', '$scope', 'registry'];

    function controller($rootScope, $scope, registry) {
        $scope.back = function () {
            if ($rootScope.topErrorList.length) {
                window.history.back();
                $rootScope.topErrorList = [];
                if ($rootScope.registry.sessionStore.PageErrors) {
                    registry.remove('PageErrors', '', 'sessionStorage');
                }
            }
        }
    }
})();