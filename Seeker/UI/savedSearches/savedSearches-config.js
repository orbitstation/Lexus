(function (angular) {
    "use strict";
    angular.module('globalApp').run(['$rootScope', function ($rootScope) {

        // this is an indipendant look up table of configs for the template layout
        angular.extend($rootScope.configLayout, {
        });

        // this needs to mirror the meta object, it will overwrite the end point in the meta object
        angular.extend($rootScope.configMeta, {
        });

    }]);
})(angular);

(function (angular) {
    "use strict";
/* Meta Data for the "Account Create" Flow miniSPA  */
    angular.module('globalApp').run(['$rootScope', function ($rootScope) {
        $rootScope.config = {
            contactUs: {
                landing: {
                    example1: {
                        serverId: '',
                        value: 'true'
                    }
                }
            }
        };
    }]);
})(angular);