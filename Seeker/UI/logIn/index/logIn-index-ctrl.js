(function () {
    "use strict";
    angular.module('miniSPA').controller('logInIndexCtrl', ['$scope', 'samlAuth', controller]);
    function controller($scope, samlAuth) {
        if (samlAuth.isAuthenticatingUsingSaml()) {
            samlAuth.login();
        }
    }  
})();