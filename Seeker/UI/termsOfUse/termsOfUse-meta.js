(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            70689:{lookUpMsg:{id:70689}}, // Title
            208183:{lookUpMsg:{id:208183}}, // Sub Heaader
            208185:{lookUpMsg:{id:208185}} // Body Text
        });

        angular.extend($rootScope.meta, {
            pageHeader: {
                title: { lookUpMsg: { id: 70689 } },       // Edit Account
                introBody: { lookUpMsg: { id: 208183 } }   //
            }
        });
    }
})();

