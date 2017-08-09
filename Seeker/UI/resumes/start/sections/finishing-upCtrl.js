(function () {
    angular.module('miniSPA').controller('FinishingUp', FinishingUpController);

    FinishingUpController.$inject = ['$scope', '$rootScope', 'resumeBuilderDataStore', 'resumesFactory', '$routeParams', '$location', 'utilityService', 'documentUpload', 'registry', '$log', '$q', '$uibModal', '$window', '$timeout'];

    function FinishingUpController($scope, $rootScope, resumeBuilderDataStore, resumesFactory, $routeParams, $location, utilityService, documentUpload, registry, $log, $q, $uibModal, $window, $timeout) {
        //view model
        var vm = this;
        //data store service
        var dataStore = resumeBuilderDataStore;
        var accordionName = 'finishingUp';
        var accordionMeta = $rootScope.meta;
        var accordionOptions = accordionMeta.accordion[accordionName];
        var builderResumeType = 'ResumeBuilder';
        var noRevert = 'noRevert';
        var initialUserData = {};
        var initialCareerData = {};
        var initialLanguageData = {};
        var resumeValue = dataStore.getData().resumeValue;
        var resumeStatuses = {
            statusConfidential: 'Confidential',
            statusPublic: 'Public',
            statusPrivate: 'Private'
        };

        vm.resumeEditGlobalFormHasError = false;
        vm.redirectToApply = false;
        vm.data = dataStore.getData();
        vm.downloadFile = downloadFile;
        vm.gotoStatus = gotoStatus;
        vm.goToAccordionStep = goToAccordionStep;
        vm.saveResume = saveResume;
        vm.saveToDoc = saveToDoc;
        vm.cancel = cancel;
        vm.newResume = dataStore.isExistingResume();
        vm.showAddress = (showAddress)();
        processData();
        checkForData();

        //MGSMIL-382 - are we in the apply flow
        var apply = registry.get('global', 'currentApply', 'sessionStorage');
        
        var applyHasId = (function applyHasId() {
            if (apply) {
                if (apply.id > 0) {
                    return true;
                } else {
                    var regex = /([0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12})/i;
                    var match = regex.test(apply.id);
                    return match;
                }
            }
            return false;
        })();

        vm.inApplyFlow = ((apply) && (applyHasId));
        vm.applyCompleteUrl = (apply) ? apply.url : "";

        $scope.$on("resumeEditGlobalForm:HasError", function (event, data) {
            vm.resumeEditGlobalFormHasError = true;
        });

        $scope.$on("resumeEditGlobalForm:HasNoError", function (event, data) {
            vm.resumeEditGlobalFormHasError = false;
        });

        //on accordion open/close
        utilityService.onOpenCloseWatcher(function () { return accordionOptions.isOpen }, onOpen, onClose, $scope);
        function onOpen() {
            vm.data = dataStore.getData();
            if (typeof vm.data.availability === "undefined") { vm.data.availability = []; }
            processData();
        }

        function onClose() {
            dataStore.setObj(vm.data);
            checkForData();
        }

        function cancel() {
            $location.path('/resumes');
        };

        function getDocuments() {
            return documentUpload.query({ referenceType: 'Resume', referenceValue: resumeValue }).$promise.then(
                function (result) {
                    vm.data.documents = result;
                },
                function (error) {
                    console.log(error);
                }
            );
        }

        function processStatus() {
            switch (vm.data.resumeBasics.resumeStatus) {
                case resumeStatuses.statusConfidential:
                    vm.data.resumeBasics.resumeActive = true;
                    vm.data.resumeBasics.resumeConfidential = true;
                    break;
                case resumeStatuses.statusPublic:
                    vm.data.resumeBasics.resumeActive = true;
                    vm.data.resumeBasics.resumeConfidential = false;
                    break;
                case resumeStatuses.statusPrivate:
                    vm.data.resumeBasics.resumeActive = false;
                    vm.data.resumeBasics.resumeConfidential = false;
                    break;
            }
        }

        function processPreview() {
            vm.resumePreview = angular.copy(vm.data);
        }

        function processData() {
            processStatus();
            if (vm.data.resumeType === builderResumeType) {
                processPreview();
            } else {
                getDocuments();
                if (vm.data.documents && vm.data.documents.length > 0 && vm.data.documents[0].fileType !== '.pdf') {
                    resumesFactory.getResume({ resumeValue: dataStore.getData().resumeValue, levelOfDetail: 'uploadeddocument' }).$promise.then(function (data) {
                        vm.data.preview = data.preview;
                    });
                }
            }
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
                    //$scope.labelType = 'alert-danger';
                    //$scope.uploadMsg = "Error: Unable to download file.";
                    $log.log('Error: Unable to download file.');
                }
            );
        };

        function gotoStatus(value, status) {
            if (status === 'Incomplete') {
                $location.path('/edit/' + value);
            } else {
                $location.path('/status/' + value);
            }
        };

        function goToAccordionStep(step) {
            if (step == 'upload') {
                accordionMeta.accordion['upload'].isOpen = true;
            }
        };

       function updateStatus() {
            //set the resume status (in the model)
            var basics = vm.data.resumeBasics;
            if (basics.resumeActive === true) {
                if (basics.resumeConfidential === true) {
                    basics.resumeStatus = resumeStatuses.statusConfidential;
                }
                else {
                    basics.resumeStatus = resumeStatuses.statusPublic;
                }
            }
            else {
                basics.resumeStatus = resumeStatuses.statusPrivate;
            }
        }

        function parseDate(educations) {
            for (var i = 0; i < educations.items.length; i++) {
                var date = educations.items[i].endDate;
                if (date) {
                    educations.items[i].endDay = date.getDate();
                    educations.items[i].endMonth = date.getMonth() + 1;
                    educations.items[i].endYear = date.getFullYear();
                }
            }
        }

        function parseCertDate(certs) {
            for (var i = 0; i < certs.items.length; i++) {
                var date = certs.items[i].date;
                if (date) {
                    certs.items[i].monthAcquired = date.getMonth() + 1;
                    certs.items[i].yearAcquired = date.getFullYear();
                }
            }
        }

        function handleDates() {
            if (vm.data.experience.standardExperiences && vm.data.experience.standardExperiences.items.length > 0) {
                for (var i = 0; i < vm.data.experience.standardExperiences.items.length; i++) {
                    if (vm.data.experience.standardExperiences.items[i].startDate) {
                        var sdate = new Date(vm.data.experience.standardExperiences.items[i].startDate);
                        var sday = sdate.getDate() + 2;
                        var smonth = sdate.getMonth();
                        var syear = sdate.getFullYear();
                        var st = new Date(syear, smonth, sday);
                        vm.data.experience.standardExperiences.items[i].startDate = st;
                    }

                    if (vm.data.experience.standardExperiences.items[i].endDate) {
                        var edate = new Date(vm.data.experience.standardExperiences.items[i].endDate);
                        var eday = edate.getDate() + 2;
                        var emonth = edate.getMonth();
                        var eyear = edate.getFullYear();
                        var et = new Date(eyear, emonth, eday);
                        vm.data.experience.standardExperiences.items[i].endDate = et;
                    }
                }
            }
            if (vm.data.education.standardEducations && vm.data.education.standardEducations.items.length > 0) {
                parseDate(vm.data.education.standardEducations);
            }
            if (vm.data.education.militaryEducations && vm.data.education.militaryEducations.items.length > 0) {
                parseDate(vm.data.education.militaryEducations);
            }
            if (vm.data.certifications && vm.data.certifications.items.length > 0) {
                parseCertDate(vm.data.certifications);
            }
        }

        function onConfirm(redirectToApply) {
            doSaveResume(redirectToApply);
        }

        function onDecline(data) {
            //checking for reject argument ('noRevert')
            if (data !== noRevert) {
                vm.data.user = angular.copy(initialUserData);
                vm.data.careerInfo = angular.copy(initialCareerData);
                vm.data.languages = angular.copy(initialLanguageData);
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
                    return onReject('noRevert');
                }
            });
        }

        function removeBtnBusy() {
            $rootScope.busyLinks.mainBusyAction = false;
            $rootScope.busyLinks.mainResumeSave = false;
        }

        function saveResume(redirectToApply) {
            initialCareerData = dataStore.getInitialData('careerInfo');
            initialUserData = dataStore.getInitialData('user');
            initialLanguageData = dataStore.getInitialData('languages');
            initialUserData.militaryService = angular.copy(vm.data.user.militaryService);

            //OCSREGRES-465
            if (!('county' in initialUserData.address)) {
                initialUserData.address['county'] = vm.data.user.address.county;
            }

            //MGSPROD-1553
            if (!('alternatePhone1' in initialUserData.phoneNumber) && 'alternatePhone1' in vm.data.user.phoneNumber && vm.data.user.phoneNumber.alternatePhone1.length === 0) {
                initialUserData.phoneNumber['alternatePhone1'] = vm.data.user.phoneNumber.alternatePhone1;
            }

            if (!('alternatePhone2' in initialUserData.phoneNumber) && 'alternatePhone2' in vm.data.user.phoneNumber && vm.data.user.phoneNumber.alternatePhone2.length === 0) {
                initialUserData.phoneNumber['alternatePhone2'] = vm.data.user.phoneNumber.alternatePhone2;
            }

            vm.redirectToApply = redirectToApply;
            //console.log('resumeCount:' + $rootScope.resumeCount);
            //console.log('initialCareerData:');
            //console.log(initialCareerData);
            //console.log('vm.data.careerInfo:');
            //console.log(vm.data.careerInfo);
            //console.log('!angular.equals(initialCareerData, vm.data.careerInfo):' + !angular.equals(initialCareerData, vm.data.careerInfo));
            //console.log('initialLanguageData:');
            //console.log(initialLanguageData);
            //console.log('vm.data.languages:');
            //console.log(vm.data.languages);
            //console.log('!angular.equals(initialLanguageData, vm.data.languages):' + !angular.equals(initialLanguageData, vm.data.languages));

            //console.log('initialUserData:');
            //console.log(initialUserData);
            //console.log('vm.data.user:');
            //console.log(vm.data.user);
            //console.log('!angular.equals(initialUserData, vm.data.user):' + !angular.equals(initialUserData, vm.data.user));
            //console.log('!angular.equals(initialUserData.address, vm.data.user.address):' + !angular.equals(initialUserData.address, vm.data.user.address));
            //console.log('!angular.equals(initialUserData.demographic, vm.data.user.demographic):' + !angular.equals(initialUserData.demographic, vm.data.user.demographic));
            //console.log('!angular.equals(initialUserData.disability, vm.data.user.disability):' + !angular.equals(initialUserData.disability, vm.data.user.disability));
            //console.log('!angular.equals(initialUserData.education, vm.data.user.education):' + !angular.equals(initialUserData.education, vm.data.user.education));
            //console.log('!angular.equals(initialUserData.farmWorker, vm.data.user.farmWorker):' + !angular.equals(initialUserData.farmWorker, vm.data.user.farmWorker));
            //console.log('!angular.equals(initialUserData.hearAboutUs, vm.data.user.hearAboutUs):' + !angular.equals(initialUserData.hearAboutUs, vm.data.user.hearAboutUs));
            //console.log('!angular.equals(initialUserData.militaryService, vm.data.user.militaryService):' + !angular.equals(initialUserData.militaryService, vm.data.user.militaryService));
            //console.log('!angular.equals(initialUserData.phoneNumber, vm.data.user.phoneNumber):' + !angular.equals(initialUserData.phoneNumber, vm.data.user.phoneNumber));
            //console.log('!angular.equals(initialUserData.programAssistance, vm.data.user.programAssistance):' + !angular.equals(initialUserData.programAssistance, vm.data.user.programAssistance));
            //console.log('!angular.equals(initialUserData.ssnCitizenship, vm.data.user.ssnCitizenship):' + !angular.equals(initialUserData.ssnCitizenship, vm.data.user.ssnCitizenship));

            //MGSOCSPP-3083
            if (($rootScope.resumeCount > 1) && (!angular.equals(initialCareerData, vm.data.careerInfo)
                || !angular.equals(initialLanguageData, vm.data.languages)
                || ((vm.data.resumeType === 'ResumeBuilder') && !angular.equals(initialUserData, vm.data.user)))) {
                return modalConfirm(onConfirm, onDecline);
            } else {
                doSaveResume();
            }
        }

        function doSaveResume() {
            updateStatus();
            //processEducationsAndExperiences();
            handleDates();

            var resumemodel = vm.data;
           
            return resumesFactory.updateResume({ resumeValue: vm.data.resumeValue }, resumemodel).$promise.then(function (data) {
                if (vm.newResume) {
                    $rootScope.track({ name: 'resumeFinished', resumeStatus: vm.data.resumeBasics.resumeStatus });
                }
                $rootScope.busyLinks.mainBusyAction = false;
                $rootScope.busyLinks.mainResumeSave = false;
                if (vm.redirectToApply) {
                    window.location = vm.applyCompleteUrl;
                }
                else {
                    $location.path("/resumes");
                }
            }, function (error) {
                $q.reject(error);
                console.log('error', error);
            });
        }

        function saveToDoc() {
            if (vm.data.resumeType === 'UploadResume')
                return;

            return resumesFactory.save({ resumeValue: vm.data.resumeValue }).$promise.then(
               function (result) {
                   var blob = result.response.blob;
                   var fileName = result.response.fileName || 'download.bin';
                   $window.saveAs(blob, fileName);
               },
                function (error, status, config, statusText) {
                    $log.log("Error: Unable to download Word doc.");
                });
        };

        function showAddress() {
            if (vm.data.user.noAddress !== undefined) {
                return vm.data.user.noAddress === 2009;
            } else {
                return true;
            }
        }

        function checkForData() {
            accordionOptions.hasData = (vm.data.resumeBasics.resumeActive !== undefined || vm.data.resumeBasics.resumeConfidential !== undefined);
        }
    }
})();