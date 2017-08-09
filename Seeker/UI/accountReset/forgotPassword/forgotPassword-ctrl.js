(function () {
    "use strict";
    angular.module('miniSPA').controller('forgotPasswordCtrl', ['$scope', 'accountResetFactory', '$location', controller]);

    function controller($scope, accountResetFactory, $location) {

        $scope.LoginId = '';
        $scope.secretQAModel = {};
        $scope.showPanel = 1;
        $scope.questionError = false;
        $scope.answerError = false;
        $scope.sentEmailSuccess = false;
        $scope.sentEmailError = false;

        // switch panels (1 = email , 2 = username , 3 = secretQuestion)
        $scope.show = function (z) {
            $scope.showPanel = z;
        };


        // send password link in an email (panel 1)
        $scope.sendResetPwdEmail = function (email) {
            accountResetFactory.sendResetEmail({ email: email }).$promise.then(
                function (result) {
                    if (!result.isError) {
                        $scope.sentEmailError = false;
                        $scope.sentEmailSuccess = true;
                    } else {
                        $scope.sentEmailError = true;
                    }
                },
                function (error) {
                    console.log(error);
                }
            );
        };

        // gets and shows the secret question, based on username (panel 2 -> panel 3)
        $scope.getSecretQuestion = function (userName) {
            $scope.userName = userName;
            accountResetFactory.getSecretQuestion({ userName: userName }).$promise.then(
            function (result) {
                if (result.question) {
                    $scope.secretQAModel = result;
                    $scope.secretQuestion = result.question;
                    $scope.showPanel = 3;
                }
                else {
                    $scope.questionError = true;
                }
            },
            function (error) {
                //console.log(error)
            });

        };


        // go button on secretQuestion page (panel 3)
        $scope.resetPasswordOnline = function (secretAnswer) {
            $scope.secretQAModel.answer = secretAnswer;
            accountResetFactory.resetPasswordOnline({ userName: $scope.userName }, $scope.secretQAModel).$promise.then(
                function (result) {
                    if (!result.isError) {
                        $location.path('/accountReset/resetPassword/' + result.message);
                    }
                    else {
                        $scope.answerError = true;
                    }
                },
                function (error) {
                    //error handler
                }
            );
        };


    }
})();