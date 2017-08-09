(function () {
    "use strict";
    angular.module('miniSPA').controller('assessmentsIndexCtrl', ['$scope', '$rootScope', controller]);

    function controller($scope, $rootScope) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  

 $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsAssessments;
        

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
       $rootScope.logInWatcher(
            function () {

            }
        );

    }
})();