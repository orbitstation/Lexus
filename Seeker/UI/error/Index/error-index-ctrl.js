(function () {
    "use strict";
    angular.module('miniSPA').controller('errorIndexCtrl', ['$scope', '$rootScope', 'registry', controller]);

    function controller($scope, $rootScope, registry) {

        if ($rootScope.registry.sessionStore.PageErrors) {
            $scope.error = angular.copy($rootScope.registry.sessionStore.PageErrors['500Error']);
            registry.remove('PageErrors', '', 'sessionStorage');
        }


    };

})();