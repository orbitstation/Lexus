(function () {
    'use strict';

    angular.module('globalApp').factory('schoolsFactory', ['$resource', '$rootScope', factoryFunction]);
    
    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/me/schools';

        var factory = $resource(resourceUrl, null,
            {
                'get': { method: 'GET', isArray: true },
                'delete': {
                    url: resourceUrl + '/:schoolId/:programId',
                    params: { schoolId: '@schoolId', programId : '@programId'},
                    method: 'DELETE'
                },
                'save': {
                    url: resourceUrl + '/:occupationCode/:schoolId/:programId',
                    params: {occupationCode: '@occupationCode', schoolId: '@schoolId', programId: '@programId' },
                    method: 'POST'
                }
            }
        );
        return factory;
    };

})();