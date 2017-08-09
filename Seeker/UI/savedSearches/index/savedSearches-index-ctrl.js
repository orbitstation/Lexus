(function () {
    "use strict";
    angular.module('miniSPA').controller('savedSearchesIndexCtrl', ['$scope', '$rootScope', '$location', '$uibModal', 'agentsFactory', '$window', controller]);
    function controller($scope, $rootScope, $location, $uibModal, agentsFactory, $window) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  
        $scope.meta.breadCrumbsExtended = [];
        $scope.agents = [];
        $scope.agentsCount = 0;
        $scope.maxAgentsCount = 10;

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(function () {
            agentsFactory.getAll().$promise.then(function (result) {
                $scope.agents = result.items;
                $scope.agentsCount = result.items.length;
                $scope.maxAgentsCount = result.maxItemsCount;
            });
        });

        //                                                                               ________________________
        // _____________________________________________________________________________/    Misc. Functions     \_____
        // 

        $scope.delete = function (id) {
            this.open(function () {
                var data = { agentID : id };
                agentsFactory.delete({}, data, function () {
                    $location.path('/SavedSearches');
                });
            });
        };

        $scope.gotoJobsearch = function (id) {
            var data = { agentID: id };
            agentsFactory.getAgent(data).$promise.then(
                function (result) {
                    var jobsearchUrl = result.lexus_url;
                    $window.location.href = jobsearchUrl;
                });
        };

        $scope.open = function (onSuccess) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                appendTo: $('#main-content'),
                resolve: {
                }
            });

            modalInstance.result.then(function () {
                onSuccess();
            });
        };
    }
})();
