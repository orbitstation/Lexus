(function () {
    'use strict';
    angular.module('globalApp').directive('modal', ['$uibModal', directiveFunction]);

    function directiveFunction($uibModal) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                shown: '=',
                okModal: '&',
                cancelModal: '&'

            },
            link: function (scope, element, attrs, ctrl) {

                //if (scope.$parent) {
                //    scope.$parent.modalOkButton();
                //}

                //okModal();

                scope.$watch('shown', function () {
                    scope.open(scope.okModal, scope.cancelModal);
                });

                // modal window open function
                scope.open = function (onOk, onCancel) {
                    if (scope.shown) {

                        scope.shown = false;
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: attrs.name,
                            controller: ('modalController', ['$scope', '$rootScope', '$uibModalInstance',
                                function ($scope, $rootScope, $uibModalInstance) {

                                    $scope.ok = function () {
                                        $rootScope.modalScope = $scope;
                                        onOk();
                                        $uibModalInstance.dismiss();
                                    };

                                    $scope.cancel = function () {
                                        $rootScope.modalScope = $scope;
                                        onCancel();
                                        $uibModalInstance.dismiss('cancel');
                                    };
                                }])
                        });

                        //modalInstance.result.then(function () {
                        //    onSuccess();
                        //    scope.okModal();
                        //});
                    }
                };
            }
        }

    };

})();
