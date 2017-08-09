(function (angular) {
    'use strict';

    angular.module('globalApp').factory('trainingProgramsFactory',
        ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var factory = $resource('', null, {
            getFilterLookups: {
                method: 'GET',
                url: $rootScope.productVariables.rootUrl + '/trainer/api/lookups/aws-program-search-fields',
            },
            getProgramDetail: {
                method: 'GET',
                url: $rootScope.productVariables.rootUrl + '/trainer/api/programs/GetProgramDetail/:id',
                params: {
                    id: '@id'
                }
            },
            searchForPrograms: {
                method: 'POST',
                url: $rootScope.productVariables.rootUrl + '/trainer/api/search/aws/programs',
            },
            getSavedPrograms: {
                method: 'GET',
                url: $rootScope.productVariables.rootUrl + '/trainer/api/me/saved-programs?pageIndex=:pageIndex',
                params: {
                    pageIndex: '@pageIndex'
                }
            },
            deleteSavedProgram: {
                method: 'DELETE',
                url: $rootScope.productVariables.rootUrl + '/trainer/api/me/saved-program?programId=:programId',
                params: {
                    programId: '@programId'
                }
            },
            saveProgram: {
                method: 'POST',
                url: $rootScope.productVariables.rootUrl + '/trainer/api/me/saved-program?programId=:programId',
                params: {
                    programId: '@programId'
                }
            },
            getWidgetData: {
                method: 'GET',
                url: $rootScope.productVariables.rootUrl + '/trainer/api/me/saved-programs-widget?limit=:limit',
                params: {
                    limit: '@limit'
                },
                isArray: true
            }
        });
        return factory;
    };
})(angular);



