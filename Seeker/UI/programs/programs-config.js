(function (angular) {
    "use strict";
    angular.module('globalApp').run(['$rootScope', function ($rootScope) {

        // this is an indipendant look up table of configs for the template layout
        angular.extend($rootScope.configLayout, {
            searchPageSize: { lookUpConfig: { value: '', serverId: 'ETPL.SeekerProgramSearchResultsPageSize' } },
            maxSavedPrograms: { lookUpConfig: { value: '', serverId: 'ETPL.MaxSeekerSavedPrograms' } },
            savedProgramPageSize: { lookUpConfig: { value: '', serverId: 'ETPL.SeekerSavedProgramsPageSize ' } }
        });

        // this needs to mirror the meta object, it will overwrite the end point in the meta object
        angular.extend($rootScope.configMeta, {
            
        });

    }]);
})(angular);