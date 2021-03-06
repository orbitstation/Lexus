﻿(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', function ($rootScope) {

        // this is an indipendant look up table of configs for the template layout
        angular.extend($rootScope.configLayout, {
            //MGS_ResumeUpload_ContactInfo_On: {
            //    lookUpConfig: {
            //        value: 'false',
            //        serverId: 'MGS_ResumeUpload_ContactInfo_On'
            //    }
            //},
        });

        // this needs to mirror the meta object, it will overwrite the end point in the meta object
        angular.extend($rootScope.configMeta, {
        });

    }]);
})();