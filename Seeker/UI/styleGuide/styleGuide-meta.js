/* Meta Data for the "Contact Us" Flow miniSPA  */
(function (angular) {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            175703: { lookUpMsg: { id: 376141, text: 'Style Guide' } }
        });
        angular.extend($rootScope.meta, {
        });
    }
})(angular);