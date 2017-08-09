(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);

    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            //upSell text
            363999:{lookUpMsg:{id:363999}}, // Cover Letters are great! 
            364000:{lookUpMsg:{id:364000}}, // this is why cover letters are so go, you should create an account and use Cover Letters
            368209: { lookUpMsg: { id: 368209 } }, //Message Center
            339822: { lookUpMsg: { id: 339822 } }, // Back
            154678: { lookUpMsg: { id: 154678 } } // Logged In
        });
        angular.extend($rootScope.meta, {
            pageHeader: {
                title:{lookUpMsg:{id:267584}},       // Header Message
                introBody:{lookUpMsg:{id:267584}}   //
            }
        });
    }
})();