/* Meta Data for the "Account Create" Flow miniSPA  */
angular.module('globalApp').run(function ($rootScope) {
    $rootScope.configTemp = {};

    $rootScope.configLayout = {
        middleName: {
            lookUpConfig: {
                serverId: 'MGS_CreateAcct_MiddleName_On',
                value: 'true'
            }
        },
    };


    $rootScope.configMeta = {
        middleName: {
            required: {
                lookUpConfig: {
                    serverId: 'MGS_CreateAcct_MiddleName_On',
                    value: 'true'
                }
            }
        },
    };


});