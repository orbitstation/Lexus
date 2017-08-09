(function () {
    'use strict';

    angular.module('globalApp').factory('userFactory',['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api';
        var factory = $resource(resourceUrl, null,
            {
                'getByToken': {
                    url: resourceUrl + '/user/:token',
                    params: { agentID: '@token' },
                    method: 'GET'
                },
                changePassword: {
                    url: $rootScope.productVariables.rootUrl + '/core/api/me/password',
                    isArray: true,
                    method: 'PUT'
                }
            }
        );
        return factory;
    };


})();