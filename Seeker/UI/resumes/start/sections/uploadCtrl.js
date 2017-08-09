(function () {
    angular.module('miniSPA').controller('Upload', ResumeProfileSettingsController);
    //careerInfo
    ResumeProfileSettingsController.$inject = ['$scope', '$rootScope', 'resumeBuilderDataStore', 'resumesFactory', 'utilityService', '$uibModal', '$log', '$q', 'documentUpload', '$window'];

    function ResumeProfileSettingsController($scope, $rootScope, resumeBuilderDataStore, resumesFactory, utilityService, $uibModal, $log, $q, documentUpload, $window) {
        //view model
        var vm = this;
        //data store service
        var dataStore = resumeBuilderDataStore;
        var levelOfDetail = 'UploadedDocument';
        var accordionName = 'upload';
        var accordionMeta = $rootScope.meta;
        var accordionOptions = accordionMeta.accordion[accordionName];
        var initialCareerData = {};
        var referenceType = 'Resume';

        //vm bindings
        vm.data = {};
        vm.maxItems = 1;
        vm.accordionMeta = accordionMeta;

        //vm functions
        vm.downloadFile = downloadFile;
        vm.onUploadError = onUploadError;
        vm.onUploadSuccess = onUploadSuccess;
        vm.deleteFunction = deleteFunction;

        //Resume related document id
        vm.accordionMeta.extraUploadParams.referenceValue = dataStore.getData().resumeValue;

        checkForData();
        $scope.$on('moveToNextSection', function (event, data) {
            if (data.clickedFrom === accordionName) {
                saveResume();
            }
        });

        if (dataStore.getData().documents === undefined || dataStore.getData().documents === null) {
            getDocuments();
        } else {
            vm.data.documents = dataStore.getData().documents;
            checkForData();
        }

        //on accordion open/close
        utilityService.onOpenCloseWatcher(function () { return accordionOptions.isOpen }, onOpen, onClose, $scope);
        function onOpen() { }
        function onClose() {
            dataStore.setObj(vm.data);
            checkForData();
        }

        function getDocuments() {
            return documentUpload.query({ referenceType: referenceType, referenceValue: dataStore.getData().resumeValue }).$promise.then(
                function (data) {
                    vm.data.documents = data;
                    dataStore.setObj(vm.data);
                },
                function (error) {
                    console.log(error);
                }
            );
        }

        //triggers a modal and returning promises
        function saveResume() {
            removeBtnBusy();
        }

        function removeBtnBusy() {
            $rootScope.busyLinks.mainBusyAction = false;
        }

        function deleteFunction(id) {
            confirmDelete(function () {
                var payload = { documentId: id };
                documentUpload.delete({ referenceType: referenceType, referenceValue: dataStore.getData().resumeValue }, payload, function () {
                    getDocuments();
                });
            });
        }

        //Modal confirmation
        function confirmDelete(onSuccess) {
            var modalInstance = $uibModal.open({
                templateUrl: 'verify-delete-modal.html',
                controller: 'ModalInstanceCtrl'
            });
            modalInstance.result.then(function () {
                onSuccess();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function downloadFile(docId) {
            return documentUpload.download({ documentId: docId }).$promise.then(
                function (data) {
                    var blob = data.response.blob;
                    var fileName = data.response.fileName || 'download.bin';

                    //using saveAs.js (part of upcoming HTML5 API, but so far a polyfill in filesaver.min.js)                
                    $window.saveAs(blob, fileName);
                },
                function (error, status, config, statusText) {
                    $log.log('Error: Unable to download file.');
                }
            );
        }

        function onUploadError(error) {
            if (!vm.errorList) {
                vm.errorList = [];
            }
            vm.errorList.push(error);
        }

        function onUploadSuccess() {
            getDocuments().then(function () {
            });
        }

        function checkForData() {
            accordionOptions.hasData = (vm.data.documents && vm.data.documents.length);
        }
    }

})();