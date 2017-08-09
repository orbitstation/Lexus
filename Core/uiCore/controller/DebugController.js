(function () {
    "use strict";
    angular.module('globalApp').controller('debugController', ['$scope', '$rootScope', 'utilityService', '$uibModal', 'registry', controller]);

    function controller($scope, $rootScope, utilityService, $uibModal, registry) {


        $scope.originalMessagesOn = true;

        $scope.toggleMessageDisplay = function () {

            $scope.originalMessagesOn = !$scope.originalMessagesOn;

            if ($scope.originalMessagesOn) {
                $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages).then(function () {
                    $rootScope.$broadcast('$$rebind::preResolved');
                    if (!$rootScope.$$phase) {
                        $rootScope.$digest();
                    }
                });
            }
            else {
                switchMeta($rootScope.meta);
                switchServerMessages($rootScope.serverMessagesObj);

                $rootScope.$broadcast('$$rebind::preResolved');
                if (!$rootScope.$$phase) {
                    $rootScope.$digest();
                }
            }
        };

        function switchMeta(j) {
            var changes = [];
            utilityService.forEach(j, function (obj) {
                if (obj && typeof obj.lookUpMsg === 'object') {
                    changes.push(obj.lookUpMsg);
                }
            });
            angular.forEach(changes, function (lookUpMsg) {
                var id = lookUpMsg.id;
                lookUpMsg.value = '[' + id + ']';
            });
        };


        function switchServerMessages(j) {
            var x = 0;
            for (x in j) {
                var id = j[x].id;
                j[x].text = '[' + id + ']';
            }
        };




        // registry model launch code
        $scope.openRegistryModal = function () {
            var modalInstance = $uibModal.open({
                backdrop: 'static',
                keyboard: false,
                templateUrl: 'headerRegistryModal.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg'
            });
            modalInstance.result.then(purge);
            function purge() {
                registry.purge();
                return
            }
        }
    }
})();