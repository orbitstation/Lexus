(function () {
    "use strict";
    angular.module('miniSPA').controller('sendResumeCtrl', ['$scope', '$rootScope', '$window', '$q', '$routeParams', 'authentication', 'UserAccount', 'resumesFactory', '$location', controller]);
    function controller($scope, $rootScope, $window, $q, $routeParams, authentication, UserAccount, resumesFactory, $location) { 
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init page variables  \_____
        //

        $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsSendPage;
        var resumeValue = $routeParams.value;
        var resumeHeaderTitle = $scope.meta.pageHeaderSend.title.lookUpMsg.value;
        $scope.emailResumeModel = {};
        $scope.resume = [];
        $scope.userAccount = [];
        $scope.emailResumeModel.resumeValue = resumeValue;
        $rootScope.track({ name: 'resumeSend' });
        $scope.resumeLoaded = false;
        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(function () {
            var promise1 = resumesFactory.getResume({ resumeValue: resumeValue, levelOfDetail: 'Basic' }).$promise.then(function (result) {
                $scope.resume = result;
                $scope.meta.pageHeaderSend.title.lookUpMsg.value = $scope.meta.pageHeaderSend.title.lookUpMsg.value + " : '" + $scope.resume.resumeBasics.resumeTitle + "'";

            });

            var promise2 = UserAccount.get().$promise.then(function (data) {
                $scope.userAccount = data;
                $scope.emailResumeModel.fromEmailAddress = data.emailAddress;

            });

            $q.all([promise1, promise2]).then(function () {
                $scope.resumeLoaded = true;
            });
        });

        //                                                                               ________________________
        // _____________________________________________________________________________/                        \_____

        $scope.$on('$destroy', function () {
            $scope.meta.pageHeaderSend.title.lookUpMsg.value = resumeHeaderTitle;
        });

        $scope.sendResume = function () {
            resumesFactory.send($scope.emailResumeModel).$promise.then(function (data) {
                $location.path('/resumes');
            });
        };

        $scope.cancel = function () {
            $location.path('/resumes');
        };
    }


})();