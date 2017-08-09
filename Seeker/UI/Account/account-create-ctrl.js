(function () {
    angular.module('miniSPA').controller('accountCreate', accountCreate);

    accountCreate.$inject = ['$scope', '$rootScope', 'authenticationStorage'];

    function accountCreate($scope, $rootScope, authenticationStorage) {
        var vm = this;
        var accountsTypes = {
            fullRegPath: '../ui/account/page1/account-page1.html',
            liteRegPath: '../ui/account/accountLite/account-lite.html'
        }

        $rootScope.$on('login_success', function (ev, regType) {
            if (regType == 'lite') {
                vm.switchReg('lite');
            } else {
                vm.switchReg('full');
            }
        });

        vm.switchReg = function (type, form) {
            if (type === 'lite') {
                vm.lite = true;
                vm.createType = accountsTypes.liteRegPath;
            } else {
                vm.lite = false;
                vm.createType = accountsTypes.fullRegPath;
            }
            if (form) {
                form.$setPristine();
            }
        }

        if (authenticationStorage.getUser() && authenticationStorage.getUser().registrationType == 'lite') {
            vm.switchReg('lite');
        } else if (authenticationStorage.getUser() && authenticationStorage.getUser().registrationType == 'full') {
            vm.switchReg('full');
        }else{
            if ($rootScope.configLayout.enableLiteReg.lookUpConfig.value == 'true') {
                vm.switchReg('lite');
            } else {
                vm.switchReg('full');
            }
        }
        

    }
})();