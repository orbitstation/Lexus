(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
        });

        angular.extend($rootScope.meta, {
            pageHeader: {
                title: { lookUpMsg: { id: 267584 } },       // Header
                introBody: { lookUpMsg: { id: 204974 } }   //
            }
        });
    }
})();