(function (angular) {
    'use strict';

    angular.module('globalApp').factory('autoCompleteFactory', ['$resource', '$rootScope', factoryFunction]);
    
    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/queries/';

        return $resource(resourceUrl, null, {
            locations: {
                method: 'GET',
                url: resourceUrl + 'locations?countryId=:countryId&query=:query',
                params: {
                    countryId: '@countryId',
                    query: '@query'
                }
            },
            skills: {
                method: 'GET',
                url: resourceUrl + 'entities/skills?query=:query',
                params: {
                    query: '@query'
                }
            },
            certifications: {
                method: 'GET',
                url: resourceUrl + 'certifications?query=:query',
                params: {
                    query: '@query'
                }
            },
            certificationinstitutions: {
                method: 'GET',
                url: resourceUrl + 'certificationinstitutions?query=:query',
                params: {
                    query: '@query'
                }
            },
            enhancedsearchjobtitles: {
                method: 'GET',
                url: resourceUrl + 'enhancedsearchjobtitles?query=:query&maxResults=:maxResults',
                params: {
                    query: '@query',
                    maxResults: '@maxResults',
                }
            },
            cipCodes: {
                url: $rootScope.productVariables.rootUrl + '/trainer/api/queries/cip-codes?query=:query',
                method: 'GET',
                params: {
                    query: '@query'
                }
            },
            oNetCodes: {
                url: $rootScope.productVariables.rootUrl + '/trainer/api/queries/occupations?query=:query',
                method: 'GET',
                params: {
                    query: '@query'
                }
            }
        });
    };
})(angular);
