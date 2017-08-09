(function (angular) {
    "use strict";

    angular.module('miniSPA').controller('statusResumeCtrl', ['$scope', '$rootScope', '$window', '$routeParams', 'resumesFactory', '$location', 'authentication', statusResumeCtrl]);
    function statusResumeCtrl($scope, $rootScope, $window, $routeParams, resumesFactory, $location, authentication) {

        var resumeStatuses = {
            statusConfidential: 'Confidential',
            statusPublic: 'Public',
            statusPrivate: 'Private'
        };

        $scope.errors = [];
        $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsStatusPage;

        var resumeValue = $routeParams.value;

        $rootScope.$watch('meta.messages[\'155892\'].lookUpMsg.value', function (newValue, oldValue) {
            if (newValue !== oldValue)
            {
                refreshTitle();
            }
        });

        function refreshTitle()
        {
            var title = $rootScope.meta.messages['155892'].lookUpMsg.value;
            if ($scope.resume && $scope.resume.resumeBasics && title)
            {
                $rootScope.meta.pageHeaderStatus.title = title + ': "' + $scope.resume.resumeBasics.resumeTitle + '"';
            }
        }

        function reset() {
            $scope.resume = {
                resumeBasics: { resumeStatus: '' }
            };
            $scope.userAccount = [];
        }

        function updateStatus() {
            if ($scope.resume.resumeBasics.resumeActive === true) {
                if ($scope.resume.resumeBasics.resumeConfidential === true) {
                    $scope.resume.resumeBasics.resumeStatus = resumeStatuses.statusConfidential;
                }
                else {
                    $scope.resume.resumeBasics.resumeStatus = resumeStatuses.statusPublic;
                }
            }
            else {
                $scope.resume.resumeBasics.resumeStatus = resumeStatuses.statusPrivate;
            }
        }

        $scope.updateResumeStatus = function () {
            updateStatus();
            var data = { resumeValue: resumeValue, status: $scope.resume.resumeBasics.resumeStatus };
            resumesFactory.statusChange(data).$promise.then(
                function (result) { //success
                    $rootScope.track({ name: 'resumeStatusChange', resumeStatus: $scope.resume.resumeBasics.resumeStatus });
                    $location.path('/resumes');
                },
                function (error) { //error
                    $scope.errors.push({ text: error, type: 'alert-danger' });
                });
        };

        $scope.cancel = function () {
            $location.path('/resumes');
        };

        function processStatus() {
            switch ($scope.resume.resumeBasics.resumeStatus) {
                case resumeStatuses.statusConfidential:
                    $scope.resume.resumeBasics.resumeActive = true;
                    $scope.resume.resumeBasics.resumeConfidential = true;
                    break;
                case resumeStatuses.statusPublic:
                    $scope.resume.resumeBasics.resumeActive = true;
                    $scope.resume.resumeBasics.resumeConfidential = false;
                    break;
                case resumeStatuses.statusPrivate:
                    $scope.resume.resumeBasics.resumeActive = false;
                    $scope.resume.resumeBasics.resumeConfidential = false;
                    break;
            }
        }

        function init() {
            resumesFactory.getResume({ resumeValue: resumeValue, levelOfDetail: 'Basic' })
                .$promise.then(
                    function (result) {
                        $scope.resume = result;
                        refreshTitle();
                        processStatus();
                    },
                    function (error) {
                        $scope.errors.push({ text: error, type: 'alert-danger' });
                    });           
        }

        authentication.setup(init, reset);

    };
})(angular);