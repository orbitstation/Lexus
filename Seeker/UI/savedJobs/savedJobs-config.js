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


(function () {
    "use strict";

    /* Meta Data for the "Account Create" Flow miniSPA  */
    angular.module('globalApp').run(['$rootScope', function ($rootScope) {
        $rootScope.configTemp = {};

        $rootScope.config = {
            middleName: {
                lookUpConfig: {
                    name: 'middleName',
                    channelConfigID: 'MGS_CreateAcct_MiddleName_On',
                    channelConfigValue: 'true'
                }
            },
            firstName: {
                lookUpConfig: {
                    name: 'firstName',
                    channelConfigID: 'MGS_CreateAcct_FirstName_On',
                    channelConfigValue: 'true'
                }
            },


        };

        //load messages specified in metadata
        //$rootScope.getAndMergeConfigs($rootScope.meta, $rootScope.messages);

    }]);
})(angular);