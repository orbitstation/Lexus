(function () {
    'use strict';

    angular.module('globalApp').service('cachedResource', ['$resource', '$rootScope', 'cacheService', cachedResourceFactory]);

    function cachedResourceFactory($resource, $rootScope, cacheService) {

        return function (url, paramDefaults, actions, options) {

            var cacheType = $rootScope.productVariables.caching.cacheTypesEnum.httpPrivateCache;
            var cacheProvider = cacheService.provider(cacheType);
            var cache = cacheProvider.cache;

            var invalidateCacheInterceptor = {
                response: function (response) {
                    cacheProvider.remove(response.config.url);
                    console.log('cache removed', response.config.url);

                    //if item has been modified, then invalidate the parent item list as well
                    if (response.config.method === 'PUT' || response.config.method === 'DELETE') {
                        var parentKey = response.config.url.substring(0, response.config.url.lastIndexOf('/'));
                        cacheProvider.remove(parentKey);
                    }

                    //immediatelly cache the newly created item
                    if (response.config.method === 'POST') {
                        var cacheKey = response.headers().location;
                        if (cacheKey) {
                            cacheProvider.addOrUpdate(cacheKey, response.data);
                        }                        
                    }

                    return response;
                }
            };

            actions = angular.merge({}, {}, actions, {
                'get': { method: 'GET', cache: cache },
                'query': { method: 'GET', cache: cache, isArray: true },
                'save': { method: 'POST', interceptor: invalidateCacheInterceptor },
                'update': { method: 'PUT', interceptor: invalidateCacheInterceptor },
                'remove': { method: 'DELETE', interceptor: invalidateCacheInterceptor },
                'delete': { method: 'DELETE', interceptor: invalidateCacheInterceptor }
            });

            return $resource(url, paramDefaults, actions, options);
        };        

    };

})();