(function (angular) {
    "use strict";
    angular.module('miniSPA').controller('resumesProfileIncompleteCtrl', ['$scope', '$uibModalInstance', 'resumesProfileIncompleteService', function ($scope, $uibModalInstance, resumesProfileIncompleteService) {
        $scope.errors = resumesProfileIncompleteService.errors;

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);
})(angular);