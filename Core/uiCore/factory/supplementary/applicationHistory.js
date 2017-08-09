(function () {
    'use strict';

    angular.module('globalApp').factory('applicationHistory', ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/me/applications';
        var factory = $resource(resourceUrl, null, {
                        
                get: {                    
                    method: 'GET',
                    isArray: false
                },
                saveCloudApplication: {
                    url: resourceUrl + '/cloud/:jobId',
                    params: { jobId: '@jobId' },
                    method: 'POST'
                }, saveCloudAWMApplication: {
                    url: resourceUrl + '/cloud/awm/:jobId',
                    params: { jobId: '@jobId' },
                    method: 'POST'
                },
                saveCoreApplication: {
                    url: resourceUrl + '/core/:jobId',
                    params: { jobId: '@jobId' },
                    method: 'POST'
                }
        });
        return factory;
    };

})();