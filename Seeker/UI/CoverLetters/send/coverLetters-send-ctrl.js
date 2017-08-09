(function () {
    "use strict";
    angular.module('miniSPA').controller('coverLettersSendCtrl', ['$scope', '$rootScope', '$routeParams', 'coverLetters', '$location', '$log', controller]);
    function controller($scope, $rootScope, $routeParams, coverLetters, $location, $log) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  

        $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsSendPage;

        var coverLetterId = $routeParams.id;
        $scope.letter = [];
        $scope.emailCoverLetterInfo = {};

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(function () {
            coverLetters.get({ coverLetterId: coverLetterId })
            .$promise.then(
                function (result) {
                    //success handler
                    $scope.letter = result;
                },
                function (error) {
                    //error handler
                    $log.log(error);
                }
            );
        });


        //                                                                               ________________________
        // _____________________________________________________________________________/          Send          \_____
        // send the cover letter
        $scope.sendLetter = function () {
            coverLetters.sendLetter({ coverLetterId: coverLetterId }, $scope.emailCoverLetterInfo).$promise.then(function (data) {
                $location.path('/coverletters');
            });
        };

        //                                                                               ________________________
        // _____________________________________________________________________________/     Misc. Functions    \_____
        // back button function
        $scope.close = function () {
            $location.path('/coverletters');
        };

    }
})();