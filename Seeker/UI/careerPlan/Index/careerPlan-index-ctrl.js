(function () {
    "use strict";
    angular.module('miniSPA').controller('careerPlanCtrl', ['$scope', '$rootScope', '$uibModal', 'careerPlan', '$location', controller]);
    function controller($scope, $rootScope, $uibModal, careerPlan, $location) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  
        $scope.meta.breadCrumbsExtended = [];
        //
        $scope.goalStatusList = ['', '364942', '364943', '364944', '364945', '364946'];
        $scope.model = {};

        $scope.reachedMax = true;

        $scope.createGoal = function () {
            $location.path('/careerPlan/goal/');
        };

        $scope.goToGoal = function (id) {
            //console.log(id);
            $location.path('/careerPlan/goal/' + id);
        };

        $scope.deleteGoal = function (id) {
            var del = $uibModal.open({
                backdrop: 'static',
                keyboard: false,
                templateUrl: 'goalModal.html',
                controller: ['$scope', 'items', '$uibModalInstance', function ($scope, items, $uibModalInstance) {
                    //find object with needed id
                    $scope.goal = _.find(items, _.matchesProperty('id', id));
                    $scope.delete = function () {
                        //find the correct index to remove from the list
                        var index = _.findIndex(items, {'id': id});
                        careerPlan.deleteGoal({ goalId: id }).$promise.then(function (data) {
                            items.splice(index, 1);
                            $uibModalInstance.close(items);
                        }, function (error) {
                            console.log(error);
                        });
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }],
                size: 'sm',
                resolve: {
                    items: function () {
                        return $scope.model.items;
                    }
                }
            });

            del.result.then(function (selectedItems) {
                $scope.model.items = selectedItems;
            });
        };

        $scope.cloneGoal = function (id) {
            //find the correct object to clone
            var findObj = {};

            //copy object to clone
            //cleanup data for insertion
            angular.copy(_.find($scope.model.items, _.matchesProperty('id', id)), findObj);
            findObj.id = 0;

            careerPlan.createGoal(findObj).$promise.then(function (data) {
                $location.path('/careerPlan/goal/' + data.id);
                //init();
            }, function (error) {
                console.log(error);
            });
        };

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(init);


        function init() {
            careerPlan.getGoals().$promise.then(function (data) {
                $scope.model = data;
                $scope.$watchCollection('model.items', function (newVal, oldVal) {
                    if (newVal !== undefined) {
                        $scope.reachedMax = (newVal.length === data.maxItemsCount) ? true : false;
                    }
                });
            });
        }
    }
})();