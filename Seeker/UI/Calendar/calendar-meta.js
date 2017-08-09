(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            363459: { lookUpMsg: { id: 363459 } }
        });
        angular.extend($rootScope.meta, {
            pageHeaderCalendar: {
                title: { lookUpMsg: { id: 363459 } }  // Calendar
            },
            breadCrumbsCalendar: [
               { "display": { lookUpMsg: { id: 363459 } } }]
        });
    }
})();