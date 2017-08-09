(function () {
    "use strict";
    angular.module('globalApp').factory('events', ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/queries/public-events';
        var factory = $resource(resourceUrl, {}, {
            query: {
                method: 'POST',
                url: $rootScope.productVariables.rootUrl + '/seeker/api/queries/public-events',
                isArray: false
            },
            register: {
                method: 'PUT',
                url: $rootScope.productVariables.rootUrl + '/seeker/api/me/public-events/:eventId',
                params: { eventId: '@eventId' },
            },
            unregister: {
                method: 'DELETE',
                url: $rootScope.productVariables.rootUrl + '/seeker/api/me/public-events/:eventId',
                params: { eventId: '@eventId' },
            },
            getEvent: {
                method: 'GET',
                url: $rootScope.productVariables.rootUrl + '/seeker/api/queries/public-events/:eventId',
                params: { eventId: '@eventId' }
            }
        });
        return factory;
    };
})();