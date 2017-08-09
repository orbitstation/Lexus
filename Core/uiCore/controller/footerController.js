(function () {
    "use strict";
    angular.module('globalApp').controller('footerController', ['$scope', '$rootScope', '$uibModal', '$sce', controller]);

    function controller($scope, $rootScope, $uibModal, $sce) {
        $scope.currentYear = new Date().getFullYear();
        $scope.version = $rootScope.registry.localStore.global.context.Version;

        //var modalInstance = $uibModal.open({
        //    backdrop: 'static',
        //    keyboard: false,
        //    templateUrl: 'communicationError.html',
        //    controller: 'ModalInstanceCtrl',
        //    size: 'sm'
        //});
        
        $rootScope.$on('preResolved', function () {
            $rootScope.footerHtml = $sce.trustAsHtml($rootScope.msg(253446));
        });
    }

})();