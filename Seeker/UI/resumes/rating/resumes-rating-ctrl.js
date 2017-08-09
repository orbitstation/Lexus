(function () {
    "use strict";
    angular.module('miniSPA').controller('rateResumeCtrl', ['$scope', '$rootScope', '$window', '$routeParams', 'authentication', 'UserAccount', 'resumesFactory', '$location', '$timeout', controller]);
    function controller($scope, $rootScope, $window, $routeParams, authentication, UserAccount, resumesFactory, $location, $timeout) { 
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init page variables  \_____
        //

        var resumeValue = $routeParams.value;
        $scope.resume = [];

        $scope.ratingImpact = 0;
        $scope.ratingDepth = 0;
        $scope.ratingBrevity = 0;

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged In data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(function () {
            resumesFactory.getResume({ resumeValue: resumeValue, levelOfDetail: 'Basic' }).$promise.then(function (result) {
                    $scope.resume = result;

                    $timeout(function() {
                        $scope.ratingImpact = result.rating.ratingImpact;
                        $scope.ratingDepth = result.rating.ratingDepth;
                        $scope.ratingBrevity = result.rating.ratingBrevity;
                    }, 2000);
                });
            }
        );


        //                                                                               ________________________
        // _____________________________________________________________________________/                        \_____

        $scope.rateResume = function () {
            resumesFactory.rate($scope.emailResumeModel).$promise.then(function (data) {
                $location.path('/resumes');
            });
        };
    }


})();