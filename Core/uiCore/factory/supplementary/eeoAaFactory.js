(function () {
    'use strict';

    angular.module('globalApp').factory('eeoAa', ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/me/applications/eeoaa/';
        var factory = $resource(resourceUrl, null, {
                get: {
                    url: resourceUrl + ':jobId',
                    params: { jobId: '@jobId' },
                    method: 'GET'
                }
        });
        return factory;
    };

})();