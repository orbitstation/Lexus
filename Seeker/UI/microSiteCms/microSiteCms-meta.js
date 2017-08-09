(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            339822: { lookUpMsg: { id: 339822 } }, // Back
            154678: { lookUpMsg: { id: 154678 } }, // Logged In
        });

        angular.extend($rootScope.meta, {

            pageHeader: {
                title: { lookUpMsg: { id: 267584 } },       // Edit Account
                introBody: { lookUpMsg: { id: 204974 } },   //
            },

        });
    }
})();