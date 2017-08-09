(function () {
    "use strict";
    angular.module('miniSPA').controller('contactUsLandingCtrl',
        ['$scope', '$rootScope', 'ContactUs', 'BrowserDetect', '$timeout', controller]);
    function controller($scope, $rootScope, ContactUs, BrowserDetect, $timeout) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  
        $scope.showSubmitMsg = false;
        $scope.contact = {};

        var agent = BrowserDetect().init();
        $scope.contact.browserType = agent.browser + " (version " + agent.version + ") - OS: " + agent.OS;

        //                                                                               ________________________
        // _____________________________________________________________________________/        Send Data       \_____
        // 
        //Copy starting point
        $scope.master = angular.copy($scope.contact);
        $scope.meta.errors = [];

        function pushAlert(alert) {
            $scope.meta.errors.push(alert);
        }       

        $scope.submitContactUs = function (form) {
            if ($scope.contact !== undefined) {
                $scope.isBusy = true;
                
                ContactUs.put($scope.contact).$promise.then(
                function (data) { //success
                    if (!data.isError) {
                        pushAlert({ text: data.message, type: 'alert-success' });
                    }
                },
                function (error) { //error
                    pushAlert({ text: error.data.message, type: 'alert-danger' });
                })
                .then(function () {
                    $scope.isBusy = false;
                });
            }
        };

        function reset(form) {
            $scope.contact = angular.copy($scope.master);
            form.$setPristine();
            //form.$setValidity();
            //form.$setUntouched();
        }
    }

})();