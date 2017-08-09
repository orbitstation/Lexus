(function () {
    angular.module('miniSPA').controller('changePasswordCtrl', changePasswordCtrl);

    changePasswordCtrl.$inject = ['$scope', '$rootScope', '$location', 'userFactory'];

    function changePasswordCtrl($scope, $rootScope, $location, userFactory) {
        //View Model bindings
        var vm = this;
        vm.passwordChangeForm;
        vm.changeStatus = [];
        vm.password = {};

        //$scope.$on('$destroy', function () {
        //    $rootScope.meta.breadCrumbsExtended = null;
        //});
        
        //vm Functions
        vm.changePassword = changePassword;

        changeBreadcrumbs();

        function changePassword(oldPassword, newPassword) {
            var payLoad = { oldPassword: oldPassword, newPassword: newPassword };
            userFactory.changePassword(payLoad)
                .$promise
                .then(passwordChangeSuccess, passwordChangeFail);
        }


        function passwordChangeSuccess(msg) {
            vm.changeStatus = [];
            if (msg.length === 0) {
                $location.path('/').replace();
            } else {
                vm.changeStatus.push({
                    type: 'alert-danger',
                    text: '<strong>' + $rootScope.msg(371123) + ': </strong>' + msg
                });
                resetForm();
            }
        }

        function resetForm() {
            vm.password.old = '';
            vm.password.new = '';
            vm.password.confirm = '';
            var form = vm.passwordChangeForm;
            if (form.$setPristine) {
                form.$setPristine();
            }
        }


        function passwordChangeFail(msg) {
            console.log(msg);
        }

        function changeBreadcrumbs() {
            $rootScope.meta.breadCrumbsExtended = $rootScope.meta.breadCrumbsChangePassword;
        }

        
    }
})();