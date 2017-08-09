(function () {
    "use strict";
    angular.module('miniSPA').controller('resetPasswordCtrl', ['$scope', '$routeParams', '$location', 'accountResetFactory', '$window', controller]);

    function controller($scope, $routeParams, $location, accountResetFactory, $window) {

        var token = $routeParams.token;

        $scope.reset = {
            password : ''
        };

        $scope.passwordChange = function() {
            $scope.submitMessage = null;
        };

        $scope.back = function () {
            $location.path('/accountReset');
        };       

        $scope.showSubmitMsg = false;
        $scope.submit = function () {
            accountResetFactory.resetpassword({ token: token, password: $scope.reset.password }).$promise.then(
            function (data) { //success
                $scope.showSubmitMsg = true;
                $scope.isSuccess = true;
                $scope.meta.button1.isBusy = true;
                if (!data.isError) {
                    $window.location.href = '/login/';
                } else {
                    $scope.isSuccess = false;
                    $scope.submitMessage = data.message;
                }
               
            },
            function (error) { //error
                $scope.isSuccess = false;
                $scope.submitMessage = error.data.message;
            })
            .then(function () {
                $scope.meta.button1.isBusy = false;
            });

        };

    }
})();