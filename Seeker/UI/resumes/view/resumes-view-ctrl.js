(function () {
    "use strict";
    angular.module('miniSPA').controller('viewResumeCtrl', ['$scope', '$rootScope', '$window', '$routeParams', 'authentication', 'UserAccount', 'resumesFactory', '$location', '$timeout', 'documentUpload', 'dataSourceService', 'registry', controller]);
    function controller($scope, $rootScope, $window, $routeParams, authentication, UserAccount, resumesFactory, $location, $timeout, documentUpload, dataSourceService, registry) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init page variables  \_____
        //
        //view model
        var vm = this;

        $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsViewPage;

        var resumeValue = $routeParams.value;
        $scope.resumePreview = [];
        $scope.previewLoaded = false;

        //MGSMIL-382 - are we in apply mode?
        var apply = registry.get('global', 'currentApply', 'sessionStorage');
        $scope.inApplyFlow = ((apply) && (apply.id > 0));
        $scope.applyCompleteUrl = (apply) ? apply.url : "";

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged In data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(function () {
            resumesFactory.getResume({ resumeValue: resumeValue, levelOfDetail: 'All' }).$promise.then(function (result) {
                vm.resumePreview = result;
                $scope.resumePreview = result;
                $scope.previewLoaded = true;

                // load the corect states for the retreved country
                dataSourceService.dataSource('getStates', result.user.address.country).then(function (states) {
                    $scope.meta.state.items = states;
                });

            });
        });


        //                                                                               ________________________
        // _____________________________________________________________________________/                        \_____

        $scope.rateResume = function () {
            resumesFactory.rate($scope.emailResumeModel).$promise.then(function (data) {
                $location.path('/resumes');
            });
        };

        // download file 
        $scope.downloadFile = function (docId) {
            return documentUpload.download({ documentId: docId }).$promise.then(
                function (data) {
                    var blob = data.response.blob;
                    var fileName = data.response.fileName || 'download.bin';

                    //using saveAs.js (part of upcoming HTML5 API, but so far a polyfill in filesaver.min.js)                
                    $window.saveAs(blob, fileName);
                },
                function (error, status, config, statusText) {
                    //$scope.labelType = 'alert-danger';
                    //$scope.uploadMsg = "Error: Unable to download file.";
                    $log.log('Error: Unable to download file.');
                }
            );
        };



    }


})();