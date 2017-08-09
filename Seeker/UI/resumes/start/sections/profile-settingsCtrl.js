(function () {
    angular.module('miniSPA').controller('ResumeProfileSettings', ResumeProfileSettingsController);
    //careerInfo
    ResumeProfileSettingsController.$inject = ['$scope', '$rootScope', 'resumeBuilderDataStore', 'resumesFactory', 'utilityService', '$uibModal', '$log', '$q'];

    function ResumeProfileSettingsController($scope, $rootScope, resumeBuilderDataStore, resumesFactory, utilityService, $uibModal, $log, $q) {
        //view model
        var vm = this;
        //data store service
        var dataStore = resumeBuilderDataStore;
        var levelOfDetail = 'CareerInfo';
        var accordionName = 'profileSettings';
        var noRevert = 'noRevert';
        var accordionMeta = $rootScope.meta;
        var accordionOptions = accordionMeta.accordion[accordionName];
        var initialCareerData = {};

        //vm bindings
        //data bootstraper
        vm.data = {};

        //attaching save function to the accordion settings
        accordionOptions.fn = saveResume;

        getData(true);
        checkForData();
        function getData(updateInitialData) {
            //get data from db if dataStore doesn't have it
            if (dataStore.getData().careerInfo === undefined || dataStore.getData().careerInfo === null) {
                resumesFactory.getResume({ resumeValue: dataStore.getData().resumeValue, levelOfDetail: levelOfDetail }).$promise.then(function (data) {
                    vm.data.careerInfo = data;
                    if (updateInitialData) {
                        initialCareerData = angular.copy(data);
                        dataStore.setInitialData({ careerInfo: initialCareerData });
                    }
                });
            } else {
                if (updateInitialData) {
                    initialCareerData = angular.copy(dataStore.getData().careerInfo);
                    dataStore.setInitialData({ careerInfo: initialCareerData });
                }
                vm.data.careerInfo = dataStore.getData().careerInfo;
            }
        }

        //on accordion open/close
        utilityService.onOpenCloseWatcher(function () { return accordionOptions.isOpen }, onOpen, onClose, $scope);
        function onOpen() {
            getData(false);
        }

        function onClose() {
            dataStore.setObj(vm.data);
            checkForData();
        }

        //triggers a modal and returning promises
        function saveResume() {
            initialCareerData = dataStore.getInitialData('careerInfo');
            if (!angular.equals(initialCareerData, vm.data.careerInfo)) {
                if ($rootScope.resumeCount > 1) {
                    return modalConfirm(onConfirm, onDecline);
                }
                else {
                    onConfirm();
                    removeBtnBusy();
                    return $q.reject('goNext');
                }
            } else {
                removeBtnBusy();
                return $q.reject('goNext');
            }
        }

        function onConfirm() {
            var payload = { careerInfo: vm.data.careerInfo };
            return resumesFactory.updateCareerInfo({ resumeValue: dataStore.getData().resumeValue }, payload).$promise.then(function (data) {
                removeBtnBusy();
                initialCareerData = angular.copy(data.careerInfo);
                dataStore.setInitialData({ careerInfo: initialCareerData });
                vm.data.careerInfo = data.careerInfo;
            },
            function (error) {
                $q.reject(error);
            });
        }

        function onDecline(data) {
            //checking for reject argument ('noRevert')
            if (data !== noRevert) {
                vm.data.careerInfo = angular.copy(initialCareerData);
            }
            removeBtnBusy();
            return $q.reject();
        }

        //Modal setup
        function modalConfirm(onSuccess, onReject) {
            var modalInstance = $uibModal.open({
                backdrop: 'static',
                templateUrl: 'profile-modal.html',
                controller: 'ModalInstanceCtrl'
            });

            return modalInstance.result.then(function () {
                onSuccess();
            }, function (mode) {
                if (!mode || mode != 'close') {
                    return onReject();
                } else {
                    return onReject(noRevert);
                }
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function removeBtnBusy() {
            $rootScope.busyLinks.mainBusyAction = false;
        }

        function checkForData() {
            var careerLevel = (vm.data.careerInfo.careerLevelId && vm.data.careerInfo.careerLevelId !== -1);
            var willingToRelocate = (vm.data.careerInfo.willingToRelocate !== undefined);
            var willingToTravelId = (vm.data.careerInfo.willingToTravelId && vm.data.careerInfo.willingToTravelId !== -1);
            var securityClearanceId = (vm.data.careerInfo.securityClearanceId && vm.data.careerInfo.securityClearanceId !== 0);

            accordionOptions.hasData = (careerLevel || willingToRelocate || willingToTravelId || securityClearanceId);
        }
    }

})();
