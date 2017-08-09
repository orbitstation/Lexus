(function (angular) {
    "use strict";
    angular.module('globalApp').run(['$rootScope', function ($rootScope) {

        // this is an indipendant look up table of configs for the template layout
        angular.extend($rootScope.configLayout, {

            ResumeRatingEnabled: {
                lookUpConfig: {
                    serverId: 'RESUME_RATING_ENABLED',
                }
            },
            
            MGS_ResumeUpload_ContactInfo_On: {
                lookUpConfig: {value: 'false',
                    serverId: 'MGS_ResumeUpload_ContactInfo_On'
                }
            },
            MGS_CreateAcct_Citizenship_On: {
                lookUpConfig: {value: 'false',
                    serverId: 'MGS_CreateAcct_Citizenship_On'
                }
            },
            contactInfo: {
                primaryPhone: { lookUpConfig: { value: 'true', serverId: '' } },
                primaryPhoneType: { lookUpConfig: { value: 'true', serverId: '' } },
                isMobile: { lookUpConfig: { value: 'true', serverId: '' } },
                secondPhone: { lookUpConfig: { value: 'true', serverId: '' } },
                telephoneNumber2: { lookUpConfig: { value: 'true', serverId: '' } },
                telephoneNumber2Type: { lookUpConfig: { value: 'true', serverId: '' } },
                thirdPhone: { lookUpConfig: { value: 'true', serverId: '' } },
                telephoneNumber3: { lookUpConfig: { value: 'true', serverId: '' } },
                telephoneNumber3Type: { lookUpConfig: { value: 'true', serverId: '' } },
                preferredContactMethod: { lookUpConfig: { value: 'true', serverId: '' } }
            },
        });

        // this needs to mirror the meta object, it will overwrite the end point in the meta object
        angular.extend($rootScope.configMeta, {
        });

    }]);
})(angular);


