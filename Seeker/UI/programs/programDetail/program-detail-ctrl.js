(function (angular) {
    'use strict';
    angular.module('miniSPA').controller('programDetailCtrl', ['$rootScope', '$scope', '$location', '$routeParams', '$uibModal', 'authentication', 'utilityService', 'compareProgramsPersistor', 'trainingProgramsFactory', controller]);

    function controller($rootScope, $scope, $location, $routeParams, $uibModal, authentication, utilityService, compareProgramsPersistor, trainingProgramsFactory) {

        $scope.programDetails = {}
        $scope.programValid = true;
        $scope.savedPrograms = 0;
        $scope.maxSaved = $rootScope.configLayout.maxSavedPrograms.lookUpConfig.value;
        $scope.selected = compareProgramsPersistor.selected;
        $scope.errors = [];

        $scope.backButton = (function () {
            var defaultPath = 'search';
            var backPath = $scope.meta.backPath;

            var options = {
                saved: function () { return { url: backPath, text: $rootScope.msg(374394) }; },
                search: function () { return { url: 'programs/search', text: $rootScope.msg(374658) }; }
            };

            var path = backPath !== undefined ? backPath.replace(/.*?#\//, '') : defaultPath;
            return (options[path] || options[defaultPath])();
        })();

        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages);

        $scope.savedOccupations = [];
        $scope.isSaved = false;

        $scope.canAddToCompare = false;
        $scope.meta.isCompared = false;

        $scope.remove = function (code) {
            refreshComparer();
        };

        $scope.change = function () {
            if (compareProgramsPersistor.contains($scope.id)) {
                compareProgramsPersistor.remove($scope.id);
            }
            else {
                compareProgramsPersistor.add({ code: $scope.id, title: $scope.programDetails.program.programName });
            }
            refreshComparer();
        };

        function refreshComparer() {
            $scope.canAddToCompare = canAddToCompare();
            $scope.meta.isCompared = compareProgramsPersistor.contains($scope.id);
        }

        function canAddToCompare() {
            if (compareProgramsPersistor.selected.length >= 4) {
                return false;
            }
            return !compareProgramsPersistor.contains($scope.id);
        }

        $scope.saveProgram = function () {
            if ($scope.id) {
                trainingProgramsFactory.saveProgram({ programId: $scope.id }).$promise.then(function (response) {
                    (response.result === 'Success') && ($scope.programDetails.isSaved = true);
                });
            }
        };

        function init() {
            $scope.doneLoading = false;
            refreshComparer();

            var data = { id: $scope.id };
            trainingProgramsFactory.getProgramDetail(data).$promise.then(function (result) {
                
                $scope.savedPrograms = result.numberOfSavedPrograms;

                var model = { program: angular.copy(result.programDetailModel), provider: angular.copy(result.providerDetailModel), isSaved: result.isProgramSaved };

                if (model.program.totalCost) {
                    model.program.totalCost = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(model.program.totalCost);
                }

                if (model.provider.contactInformation.phonePrimary.phoneNumber) {
                    var match = model.provider.contactInformation.phonePrimary.phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
                    var formatted = match[1] + "-" + match[2] + "-" + match[3];
                    model.provider.contactInformation.phonePrimary.phoneNumber = formatted;
                }
                
                $scope.programDetails = model;

                adjustBreadcrumbs();

            }, function (error) {
                $scope.programValid = false;
                $scope.errors.push({ type: 'alert-danger', text: 'No program retrieved for the given program ID.' });
            });
        }

        $rootScope.logInWatcher(function () {
            var regex = /id[-]([0-9]+)$/i;
            var match = regex.exec($routeParams.code);

            if (match) {
                $scope.id = parseInt(match[1]);
                init();
            }
        });
        
        $scope.tokenize = function (token) {
            return utilityService.tokenize(token);
        };

        function adjustBreadcrumbs() {
            if ($scope.programDetails && $scope.programDetails.program.programName) {
                var programDetailsTitleShortened = utilityService.getShortenedText($scope.programDetails.program.programName, $rootScope.meta.programSearchResults.programTitleMaxLength);
                $scope.meta.pageHeader.title.lookUpMsg = { id: 0, text: programDetailsTitleShortened };
                $scope.meta.breadCrumbsDetailsPage[0].display.lookUpMsg.text = programDetailsTitleShortened;
            }
            $scope.meta.breadCrumbsExtended =  $scope.meta.breadCrumbsDetailsPage;
        }

        $scope.viewAllLocations = function () {
            this.open(function () {
                data = $scope.programDetails;
            });
        };

        $scope.open = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: ['$scope', '$uibModalInstance', 'programName', 'addresses', function ($scope, $uibModalInstance, programName, addresses) {
                    $scope.programName = programName;
                    $scope.addresses = addresses;

                    $scope.ok = function () {
                        $uibModalInstance.dismiss();
                    }
                }],
                resolve: {
                    programName: function () {
                        return $scope.programDetails.program.programName;
                    },
                    addresses: function () {
                        return $scope.programDetails.program.locationAddresses;
                    }
                }
            });
        };

    }
})(angular);