(function () {
    'use strict';

    angular.module("globalApp").service("cacheService", ['CacheFactory', '_', '$rootScope', cacheService]);    

// ReSharper disable once InconsistentNaming
    function cacheService(CacheFactory, _, $rootScope) {

        //$rootScope.productVariables.cacheTypes = {
        //    'shared': 0, //shared with manual approach; e.g. messages, channel configs
        //    'httpShared': 1, //shared with automatic approach (http cache); cached by url; e.g. lookups
        //    'private': 2, //private with manual approach; specific to given session or user; e.g. login info
        //    'httpPrivate': 3 //private with automatic approach (http cache); e.g. cover letters, documents
        //};

        //abstraction around the underlying caching factory(ies) providing unified access to the cache provider API
        var cacheProvider = function (cacheFactory) {
            var provider = {
                cache: cacheFactory, //provide access to the underlying cache factory
                get: get, //get cached item 
                addOrUpdate: addOrUpdate, //add or updates cache
                remove: remove, //remove cached item
                clearAll: clearAll //remove all cached item 
            };

            var nullProvider = {
                cache: null,
                get: function() { return null; }, 
                addOrUpdate: function() {}, 
                remove: function () {}, 
                clearAll: function () {}
            };

            function get(cacheKey) {                
                return cacheFactory.get(cacheKey);
            };

            function remove(cacheKey) {
                return cacheFactory.remove(cacheKey);
            };

            function addOrUpdate(cacheKey, cacheValue) {
                if (get(cacheKey)) {
                    remove(cacheKey);
                }
                return cacheFactory.put(cacheKey, cacheValue);
            };            

            function clearAll() {
                return cacheFactory.removeAll();
            };

            return (null === cacheFactory) ? nullProvider : provider;
        }

        //takes care of creating/providing access to the caching factory(ies)
        var cacheProviderFactory = function (cacheType) {

            //init the provider based on the $rootScope.productVariables.cacheTypes settings
            var cache = _.find($rootScope.productVariables.caching.cacheTypesDef, function (o) {
                return o.cacheType === cacheType;
            });

            if (!cache || cache.enabled === "false") return cacheProvider(null);

            var cacheFactory = CacheFactory.get(cacheType) || CacheFactory(cacheType, cache.initOptions);

            return cacheProvider(cacheFactory);
        }        

        //public accessor
        this.provider = function (cacheType) {
            return cacheProviderFactory(cacheType);
        }                        
    }

})();