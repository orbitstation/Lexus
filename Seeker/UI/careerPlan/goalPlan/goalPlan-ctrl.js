(function () {
    "use strict";
    angular.module('miniSPA').controller('goalPlanCtrl', ['$scope', '$rootScope', 'careerPlan', controller]);
    function controller($scope, $rootScope, careerPlan) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  

        //
        $scope.goalStatusList = ['', '364942', '364943', '364944', '364945', '364946'];


        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(
            function () {
                careerPlan.get().$promise.then(function (data) {
                    $scope.data = data;
                });
            }
        );
    }
})();