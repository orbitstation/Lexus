(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            //upSell text
            363999:{lookUpMsg:{id:363999}}, // Cover Letters are great! 
            364000:{lookUpMsg:{id:364000}}, // this is why cover letters are so go, you should create an account and use Cover Letters
            346856: { lookUpMsg: { id: 346856 } },  // Assessments
            339822: { lookUpMsg: { id: 339822 } } // Back
        });

        angular.extend($rootScope.meta, {
            pageHeaderAssessments: {
                title: { lookUpMsg: { id: 346856 } },       // Assessments
                introBody: { lookUpMsg: { id: 204974 } }   // Default Must Have Text...
            }
        });
    }
})();