(function (angular) {
    "use strict";
    angular.module('globalApp').run(['$rootScope', function ($rootScope) {

        // this is an independent look up table of configs for the template layout
        angular.extend($rootScope.configLayout, {
        });

        // this needs to mirror the meta object, it will overwrite the end point in the meta object
        angular.extend($rootScope.configMeta, {
            captcha: {
                provider: { lookUpConfig: { serverId: 'CaptchaProvider', value: 'None' } },
                googleKey: { lookUpConfig: { serverId: 'CaptchaProvider.Google.PublicKey', value: '' } },
            },
            useCoreJobView: { lookUpConfig: { serverId: 'MGS_UseCoreJobView', value: '' } },
            jobViewDomain: { lookUpConfig: { value: '', serverId: 'JobViewDomain' } },
            jobViewCloudDomain: { lookUpConfig: { value: '', serverId: 'JobViewCloudDomain' } },
            secureEntireWebSite: { lookUpConfig: { value: '', serverId: 'SecureEntireWebSite' } },
            maxResumes: { lookUpConfig: { value: '', serverId: 'MGS_Resumes_Max' } },
            maxCoverLetters: { lookUpConfig: { value: '', serverId: 'MGS_CoverLetters_Max' } },
        });

    }]);
})(angular);