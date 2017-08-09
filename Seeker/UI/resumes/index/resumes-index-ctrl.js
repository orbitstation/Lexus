(function () {
    "use strict";
    angular.module('miniSPA').controller('resumesSummaryCtrl', ['$scope', '$rootScope', '$log', 'resumesFactory', '$location', '$uibModal', '$window', '$route', 'resumesProfileIncompleteService', 'titleService', '_', controller]);
    function controller($scope, $rootScope, $log, resumesFactory, $location, $uibModal, $window, $route, resumesProfileIncompleteService,titleService, _) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init page variables  \_____
        //
        $scope.meta.breadCrumbsExtended = [];
        $scope.resumes = [];
        $scope.resumeListLoaded = false;
        $scope.counter = {
            itemsCount: 0,
            //temp default value; this should come from server instead
            maxItemsCount: 10
        };

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged In data   \_____
        //  get the user's data if logged in
        getResumes();
        $rootScope.$on('login_success', function () {
            getResumes();
        });
        
        function getResumes() {
            if ($rootScope.isAuthenticated) {
                resumesFactory.getResumes().$promise.then(function (result) {
                    $scope.resumes = result;
                    $scope.resumeListLoaded = true;
                });
            }
        }

        //                                                                               ________________________
        // _____________________________________________________________________________/                        \_____

        $scope.save = function (value) {
            return resumesFactory.save({ resumeValue: value }).$promise.then(
               function (result) {
                   var blob = result.response.blob;
                   var fileName = result.response.fileName || 'download.bin';
                   $window.saveAs(blob, fileName);
               },
                function (error, status, config, statusText) {
                    $log.log("Error: Unable to download Word doc.");
                });
        };

        //$scope.onNew = function() {
        //    $rootScope.isLoaded = false;
        //    resumesFactory.validateCompletness().$promise.then(function (data) {
        //        $rootScope.isLoaded = true;
        //        if (data.length == 0) {
        //            $rootScope.startContext = {
        //                counter: $scope.counter
        //            };
        //            $location.path('/start');
        //        }
        //        else {
        //            resumesProfileIncompleteService.errors = [];
        //            angular.forEach(data, function (error) {
        //                resumesProfileIncompleteService.errors.push({ text: error, type: 'alert-danger' });
        //            });

        //            var modalInstance = $uibModal.open({
        //                animation: true,
        //                templateUrl: '/UI/resumes/profile-incomplete/resumes-profile-incomplete.html',
        //                controller: 'resumesProfileIncompleteCtrl'
        //            });

        //            modalInstance.result.then(function () {
        //                $window.location = '/account';
        //            });
        //        }
        //    });
        //};

        $scope.isNew = function(date) {
            var resumeDate = new Date(date);
            resumeDate.setDate(resumeDate.getDate() + 1);
            return resumeDate >= new Date();
        };

        $scope.delete = function (value) {
            openModal(function () {
                var data = { resumeValue: value };
                resumesFactory.delete({}, data, function () {
                    var removeObj = _.find($scope.resumes.items, { resumeValue: value });
                    _.remove($scope.resumes.items, removeObj);
                });
            });
        };

        $scope.copy = function (value) {
            var data = { resumeValue: value };
            resumesFactory.copy({}, data, function (data) {
                $scope.resumes.items.push(data);
            });
        };

        $scope.gotoStatus = function (value, status) {
            if (status === 'Incomplete') {
                $location.path('/resumes/edit/' + value);
                
            } else {
                $location.path('/resumes/status/' + value);
            }
        };

        function openModal (onSuccess) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                ariaLabelledBy: 'modal-header',
                ariaDescribedBy: 'modal-body',
                appendTo: $('#main-content')
            });

            modalInstance.result.then(function () {
                onSuccess();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.goStart = function () {
            if ($scope.resumes.items && $scope.resumes.items.length < $scope.resumes.maxItemsCount) {
                $location.path('/resumes/start');
            }
        };
    }
})();