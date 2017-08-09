(function () {
    "use strict";
    angular.module('miniSPA').controller('coverLettersViewCtrl', ['$scope', '$rootScope', 'coverLetters', '$routeParams', '$location', controller]);
    function controller($scope, $rootScope, coverLetters, $routeParams, $location) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  

        $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsViewPage;

        var coverLetterId = $routeParams.id;
        $scope.letter = {};
        $scope.letter.title = '';
        $scope.letter.body = '';

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(function () {
            coverLetters.get({ coverLetterId: coverLetterId }).$promise.then(
                function (result) {
                    //console.log(result);
                    $scope.letter = result;
                }
            );
        });


        //                                                                               ________________________
        // _____________________________________________________________________________/     Misc. Functions    \_____

        // back button function
        $scope.close = function () {
            $location.path('/coverletters');
        };

        // translate to html function
        $scope.toHtml = function (input) {
            return input.replace(/\r\n|\r|\n/g, '<br>');
        };

    }
})();