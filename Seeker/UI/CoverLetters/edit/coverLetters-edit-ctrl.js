(function () {
    "use strict";
    angular.module('miniSPA').controller('coverLettersEditCtrl', ['$scope', '$rootScope', 'coverLetters', '$location', '$routeParams', controller]);
    function controller($scope, $rootScope, coverLetters, $location, $routeParams) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  

        $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsEditPage;
        

        var coverLetterId = $routeParams.id;
        $scope.letter = null;

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(function () {
            coverLetters.get({ coverLetterId: coverLetterId }).$promise.then(
            function (result) {
                $scope.letter = result;
            });
        });

        //                                                                               ________________________
        // _____________________________________________________________________________/          Edit          \_____

        $scope.editLetter = function () { //create a new letter. Issues a POST to /api/coverletters
            var data = { coverLetterId: coverLetterId };
            $scope.letter.$update(data, function () {
                $location.path('/coverletters'); // on success go back to cover letter list
            });
        };

        //                                                                               ________________________
        // _____________________________________________________________________________/     Misc. Functions    \_____

        $scope.cancel = function () {
            $location.path('/coverletters');
        };

        $scope.close = function () {
            $location.path('/coverletters');
        };


    }


})();