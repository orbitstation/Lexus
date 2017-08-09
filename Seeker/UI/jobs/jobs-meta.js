/* Meta Data for the "Contact Us" Flow miniSPA  */
(function (angular) {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
        });
        angular.extend($rootScope.meta, {
            pageHeader: {
                title: { lookUpMsg: { id: 175703 } },
                introBody: { lookUpMsg: { id: 362911 } }
            }
        });
    }
})(angular);