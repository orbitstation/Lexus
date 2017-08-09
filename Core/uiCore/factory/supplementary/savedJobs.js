(function () {
    'use strict';

    angular.module('globalApp').factory('savedJobsFactory', ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {

        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/me/jobs';
        var factory = $resource(resourceUrl + '/:jobId', {jobId: '@jobId' }, {
            templates: {
                url: resourceUrl,
                method: 'GET',
                isArray: true
            },
            saveJob: {
                url: resourceUrl + '/:jobType/:jobId',
                params: { jobId: '@jobId', jobType: '@jobType' },
                method: 'POST'
            },
            delete: {
                url: resourceUrl + '/:source/:jobId/delete',
                params: { jobId: '@jobId', source: '@source' },
                method: 'POST'
            }
        });
        return factory;
    };

})();