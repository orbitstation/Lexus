(function(angular){
    'use strict'
    angular.module('miniSPA').controller('programSavedCtrl', controller);

    controller.$inject = ['$rootScope', '$scope', '$location', '$uibModal', '$window', 'trainingProgramsFactory', 'utilityService', 'compareProgramsPersistor'];
    
    function controller($rootScope, $scope, $location, $uibModal, $window, trainingProgramsFactory, utilityService, compareProgramsPersistor) {

        $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsSavedPage;

        $scope.selectedId = [];
        $scope.programs = [];
        $scope.programsCount = 0;
        $scope.maxProgramsCount = $rootScope.configLayout.maxSavedPrograms.lookUpConfig.value;
        $scope.page = 1;
        $scope.pageSize = $rootScope.configLayout.savedProgramPageSize.lookUpConfig.value;
        $scope.totalResults = 0;

        $rootScope.logInWatcher(function () {
            doSearch();
        });

        function doSearch() {
            trainingProgramsFactory.getSavedPrograms({ pageIndex: $scope.page }).$promise.then(function (results) {
                $scope.programs = results.savedPrograms;
                $scope.page = getPage(results.pages);
                $scope.totalResults = results.totalNumberFound;
                results.savedPrograms && ($scope.programsCount = results.savedPrograms.length);
                initCompare();
            });
        }

        function getPage(pageObj) {
            var page = 1;
            for (var i in pageObj) {
                (pageObj[i].isActive) && (page = pageObj[i].pageNumber);
                break;
            }
            return page;
        }

        $scope.setPage = function (pageNumber) {
            $scope.page = pageNumber + 1;
            doSearch();
        };

        $scope.tokenize = function (token) {
            return utilityService.tokenize(token);
        };

        $scope.countSelected = function (c) {
            if (c) {
                var limit = 4;
                var x;
                var count = 0;
                for (x in c) {
                    if (c[x].checked === true) { count++; }
                }

                if (count >= limit) {
                    return true;
                }
            }
            return false;
        };

        $scope.toggleSelection = function (id) {
            var idx = $scope.selectedId.indexOf(id);
            if (idx > -1) {
                $scope.selectedId.splice(idx, 1);
            }
            else {
                $scope.selectedId.push(id);
            }
        };

        $scope.delete = function (id) {
            this.open(function () {
                trainingProgramsFactory.deleteSavedProgram({ programId: id}, function () {
                    $location.path('/saved');
                    location.reload(true);
                });
            });
        };

        $scope.compare = function () {
            var compareUrl = '/programs/compare';
            for (var i = 0; i < $scope.selectedId.length; i++) {
                compareUrl = compareUrl + '/' + $scope.selectedId[i];
            }
            $window.location.href = compareUrl;
        };

        $scope.open = function (onSuccess) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                }
            });

            modalInstance.result.then(function () {
                onSuccess();
            });
        };

        function initCompare() {
            for (var i = 0; i < $scope.programs.length; i++) {
                var program = $scope.programs[i];
               
                for (var j = 0; j < compareProgramsPersistor.selected.length; j++) {
                    if (program.programId === compareProgramsPersistor.selected[j].code) {
                        program.checked = true;
                        break;
                    }
                }
            }
        }

        $scope.change = function () {
            for (var i = 0; i < $scope.programs.length; i++) {
                var item = $scope.programs[i];
                var index = -1;
                for (var j = 0; j < compareProgramsPersistor.selected.length; j++) {
                    if (compareProgramsPersistor.selected[j].code === item.programId) {
                        index = j;
                        break;
                    }
                }
                if (item.checked && index === -1) {
                    compareProgramsPersistor.add({ code: item.programId, title: item.programName });
                }
                if (!item.checked && index >= 0) {
                    compareProgramsPersistor.remove(item.programId);
                }
            }
        };

        $scope.remove = function (code) {
            var i;
            var item;
            for (i = 0; i < $scope.programs.length; i++) {
                item = $scope.programs[i];
                if (item.programId === code) {
                    item.checked = false;
                }
            }
        };
    }
})(angular);