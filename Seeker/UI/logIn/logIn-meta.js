(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            207426:{lookUpMsg:{id:207426}}, // Welcome to Monster!
            282198: { lookUpMsg: { id: 282198 } }, // Our goal is to help power your career search
            100065: { lookUpMsg: { id: 100065 } }, //You are logged in.
            205119: { lookUpMsg: { id: 205119 } } // Forgot Password?
        });

        angular.extend($rootScope.meta, {
            pageHeader: {
                title:{lookUpMsg:{id:207426}},       // Welcome to Monster!
                introBody:{lookUpMsg:{id:282198}},   // Our goal is to help power your career search...
            }
        });
    }
})();

