(function () {
    "use strict";
    angular.module('miniSPA').controller('savedJobsIndexCtrl', ['$scope', '$rootScope', '$log', 'savedJobsFactory', '$location', '$uibModal', 'productVariables', 'authentication', 'utilityService', controller]);
    function controller($scope, $rootScope, $log, savedJobsFactory, $location, $uibModal, productVariables, authentication, utilityService) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  

        $scope.jobs = [];
        $scope.itemsCount = 0;
        $scope.maxItemsCount = 5;
        $scope.pageLoaded = false;

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(function () {
            savedJobsFactory.get().$promise.then(function (result) {
                $scope.jobs = [];

                for (var i in result.items) {
                    var item = result.items[i].job;
                    item.savedDate = result.items[i].modifiedDate;
                    
                    if (item.source.toLowerCase() == 'core') {
                        item.constructedUrl = '/jobView/' + utilityService.tokenize(item.title) + '-job-' + utilityService.tokenize(item.location) + '-sei-id-' + item.source.toLowerCase() + '-' + item.core_position_id + '/saved';
                        item.jobId = item.core_position_id;
                    } else {
                        item.constructedUrl = '/jobView/' + utilityService.tokenize(item.title) + '-job-' + utilityService.tokenize(item.location) + '-id-' + item.source.toLowerCase() + '-' + item.id + '/saved';
                        item.jobId = item.id;
                    }
                    $scope.jobs.push(item);
                }

                $scope.itemsCount = result.items.length;
                $scope.maxItemsCount = result.maxItemsCount;
                $scope.pageLoaded = true;
            });
        });

        //                                                                               ________________________
        // _____________________________________________________________________________/    Misc. Functions     \_____
        // 



        // Delete a saved job
        $scope.deleteSavedJob = function (id, source) {
            this.open(function () {
                var data = { jobId: id, source: source };
                savedJobsFactory.delete({}, data, function () {
                    $location.path('/savedJobs'); //redirect to summary
                });
            });
        };

        //check if the job is expired
        $scope.isJobExpired = function (expdate) {
            if (expdate === 'undefined')
                return false;

            var today = new Date();
            var jobexpdate = new Date(expdate);

            if (today > jobexpdate) {
                return true;
            } else {
                return false;
            }
        };
       

        // modal window open function
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
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }
})();