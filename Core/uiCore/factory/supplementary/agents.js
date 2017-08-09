(function () {
    'use strict';

    angular.module('globalApp').factory('agentsFactory', ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/me/agents';
        var factory = $resource(resourceUrl, null,
            {
                'getAll': { method: 'GET', isArray: false },
                'delete': {
                    url: resourceUrl + '/:agentID',
                    params: { agentID: '@agentID' },
                    method: 'DELETE'
                },
                'getAgent': {
                    url: resourceUrl + '/:agentID',
                    params: { agentID: '@agentID' },
                    method: 'GET'
                },
                'updateAgent': {
                    method: 'POST'
                }
            }
        );
        return factory;
    };


})();