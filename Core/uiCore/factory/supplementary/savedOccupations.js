(function () {
    'use strict';

    angular.module('globalApp').factory('savedOccupationsFactory', ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/me/occupations';
        var factory = $resource(resourceUrl, null,
            {
                'get': { method: 'GET', isArray: true },
                'delete': {
                    url: resourceUrl + '/:code',
                    params: { code: '@code' },
                    method: 'DELETE'
                },
                'save': {
                    url: resourceUrl + '/:code',
                    params: { code: '@code' },
                    method: 'POST'
                }
            }
        );
        return factory;
    };

})();