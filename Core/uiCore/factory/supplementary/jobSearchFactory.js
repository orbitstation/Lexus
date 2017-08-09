(function () {
    'use strict';

    angular.module('globalApp').factory('jobSearchFactory', ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/queries/jobsearch';
        var factory = $resource(resourceUrl, null,{
                'search': { method: 'POST' },
                'createAgent': { method: 'PUT', url: $rootScope.productVariables.rootUrl + '/seeker/api/me/agents' },
                'getAgents': { method: 'GET', url: $rootScope.productVariables.rootUrl + '/seeker/api/me/agents' },
                'recommendedJobs': { method: 'POST', url: $rootScope.productVariables.rootUrl + '/seeker/api/me/recommended-jobs', isArray: true }
            }
        );
        return factory;
    };

})();