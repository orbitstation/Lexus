(function (angular) {
    'use strict';

    angular.module('globalApp').factory('occupationsFactory',
        ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var factory = $resource('', null, {
            getByIndustry: {
                method: 'GET',
                url: $rootScope.productVariables.rootUrl + '/seeker/api/lookups/occupations/industries/:industry',
                params: { 'industry' : '@industry' }
            },
            getByMilitary: {
                url: $rootScope.productVariables.rootUrl + '/seeker/api/queries/occupations/military',
                method: 'POST',
                isArray: true
            },
            getByKeywords: {
                url: $rootScope.productVariables.rootUrl + '/seeker/api/queries/occupations',
                method: 'POST',
                isArray: true
            },
            getByArea: {
                url: $rootScope.productVariables.rootUrl + '/seeker/api/queries/occupations/by-area',
                method: 'POST',
                isArray: true
            }
        });
        return factory;
    };
})(angular);



