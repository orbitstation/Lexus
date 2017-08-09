(function () {
    'use strict';

    angular.module('globalApp').factory('jobViewFactory', ['$resource', '$rootScope', factoryFunction]);
    
    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/jobs';
        var factory = $resource(resourceUrl, {}, {
            getJob: {
                url: resourceUrl + '/:type/:id',
                params: { id: '@id', type: '@type' },
                method: 'GET'
            },
            getCloudJob: {
                url: resourceUrl + '/:type/:id',
                params: { id: '@id', type: '@type' },
                method: 'GET'
            }
        });
        return factory;
    };

})(); 