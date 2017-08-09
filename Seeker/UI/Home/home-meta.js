(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            //These are defaults don't use them
            267584:{lookUpMsg:{id:267584}}, // Header
            204974:{lookUpMsg:{id:204974}}, // Default p tag Text
            //These are defaults don't use them
            369877:{lookUpMsg:{id:369877}} //Home
        });
        angular.extend($rootScope.meta, {
            pageHeaderHome: {
                title:{lookUpMsg:{id:900}},  // Home
                introBody:{lookUpMsg:{id:0}}   // No message
            },
            breadCrumbExtended: {
                disable: true
            }
        });
    }
})();