(function () {
    "use strict";
    angular.module('miniSPA').controller('savedSearchesEditCtrl', ['$scope', '$rootScope', 'agentsFactory', '$location', '$log', '$routeParams', '$window', 'authentication', controller]);
    function controller($scope, $rootScope, agentsFactory, $location, $log, $routeParams, $window, authentication) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  
        $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsEdit;
        var agentId = $routeParams.id;
        $scope.agent = {};

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(function () {
            var data = { agentID: agentId };
            agentsFactory.getAgent({ agentID: agentId }).$promise.then(function (result) {
                $scope.agent = result;
            });
        });

        //                                                                               ________________________
        // _____________________________________________________________________________/    Misc. Functions     \_____
        // 


        $scope.saveRun = function () {
            agentsFactory.updateAgent($scope.agent).$promise.then(function (result) {
                var jobsearchUrl = $scope.agent.lexus_url;
                $window.location.href = jobsearchUrl;
            });
        };

        $scope.save = function () {
            agentsFactory.updateAgent($scope.agent).$promise.then(function (result) {
                $location.path('/savedSearches');
            });
        };

        $scope.back = function () {
            $location.path('/savedSearches');
        };

        $scope.getRadius = function (radius) {
            var ret = 25;
            if (radius > 0) {
                ret = radius;
            }
            return ret;
        };


    }


})();