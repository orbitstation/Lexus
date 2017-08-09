(function () {
    "use strict";
    function modalInstanceCtrl($scope, $uibModalInstance) {
        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('close');
        };
    };

    modalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
    angular.module('globalApp').controller('ModalInstanceCtrl', modalInstanceCtrl);
})();