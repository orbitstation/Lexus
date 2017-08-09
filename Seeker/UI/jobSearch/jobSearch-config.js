(function (angular) {
    "use strict";
    angular.module('globalApp').run(['$rootScope', function ($rootScope) {

        // this is an independant look up table of configs for the template layout
        angular.extend($rootScope.configLayout, {
        });

        // this needs to mirror the meta object, it will overwrite the end point in the meta object
        angular.extend($rootScope.configMeta, {
            JobsearchAdvertisement: {
                isEnabled: { lookUpConfig: { value: '', serverId: 'MGS_JobSearch_Show_Advertisement' } }
            },
            ppcTracking: { lookUpConfig: { value: '', serverId: 'IMPRESSION_TRACKING_ENABLED' } },
            ppcTrackingWithKosmosApi: { lookUpConfig: { value: '', serverId: 'IMPRESSION_TRACKING_WITH_KOSMOS_API_ENABLED' } },
            jobViewCore: { lookUpConfig: { value: '', serverId: 'MGS_UseCoreJobView' } } ,
            jobViewDomain: { lookUpConfig: { value: '', serverId: 'JobViewDomain' } },
            showSalaryResearch: { lookUpConfig: { value: '', serverId: 'MGS_Jobsearch_PayscaleSalaryLink_On' } },
            jobViewCloudDomain: { lookUpConfig: { value: '', serverId: 'JobViewCloudDomain' } },
        });

    }]);
})(angular);

(function (angular) {
    "use strict";
    /* Meta Data for the "Account Create" Flow miniSPA  */
    angular.module('globalApp').run(['$rootScope', function ($rootScope) {
        $rootScope.config = {
            jobSearch: {
                summary: {
                    example1: {
                        serverId: '',
                        value: 'true'
                    }
                }
            }
        };
    }]);
})(angular);