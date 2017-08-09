(function () {
    "use strict";
    angular.module('miniSPA').controller('schoolsViewCtrl', ['$scope', '$rootScope', 'schoolLookupFactory', '$routeParams', '$location', controller]);
    function controller($scope, $rootScope, schoolLookupFactory, $routeParams, $location) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  

        var occupationCode = $routeParams.oneTcode;
        var schoolId = $routeParams.id;
        $scope.school = {};

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(function () {
            schoolLookupFactory.getSchool({ occupationCode: occupationCode, schoolId: schoolId }).$promise.then(
                function (result) {
                    //console.log(result);
                    $scope.school = result;
                }
            );
        });

        //                                                                               ________________________
        // _____________________________________________________________________________/    Misc. Functions     \_____
        // 

        // back button function
        $scope.close = function () {
            $location.path('/schools');
        };

        // translate to html function
        $scope.toHtml = function (input) {
            return input.replace(/\r\n|\r|\n/g, '<br>');
        };

    }
})();