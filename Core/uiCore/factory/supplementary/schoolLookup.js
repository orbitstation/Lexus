(function () {
    'use strict';

    angular.module('globalApp').factory('schoolLookupFactory', ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/lookups/occupations';
        var factory = $resource(resourceUrl, null,
            {
                'getSchool': {
                    url: resourceUrl + '/:occupationCode/schools/:schoolId',
                    params: { schoolId: '@schoolId', occupationCode: '@occupationCode' },
                    method: 'GET'
                },
                'getSchools': {
                    url: resourceUrl + '/:occupationCode/schools',
                    params: { occupationCode: '@occupationCode' },
                    method: 'GET',
                    isArray: false
                }

            }
        );
        return factory;
    };

})();