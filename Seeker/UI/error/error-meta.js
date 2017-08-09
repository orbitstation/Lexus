(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            371123: { lookUpMsg: { id: 371123 } }, // Error
            371124: { lookUpMsg: { id: 371124 } }, // Sorry... The server has returned an unexpected result.
            371125: { lookUpMsg: { id: 371125 } }, // Please try again later....
        });
    }
})();