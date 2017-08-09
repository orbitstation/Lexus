(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages,{
            //These are defaults don't use them
            267584:{lookUpMsg:{id:368242}}, // Header
            204974:{lookUpMsg:{id:204974}}, // Default p tag Text
            //These are defaults don't use them
            339822: { lookUpMsg: { id: 339822 } }, // Back
            369112:{lookUpMsg:{id:369112}} // About Us
        });

        angular.extend($rootScope.meta, {
        });
    }
})();