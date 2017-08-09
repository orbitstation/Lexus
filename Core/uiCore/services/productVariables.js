(function () {
    'use strict';
    angular.module("globalApp").service("productVariables", ['$rootScope', 'registry' ,service]);

    function service($rootScope, registry) {
        return {
            init: function () {
                // load the registry
                //registry.set('token', '123', 'sessionStorage');
                //registry.set('ApplicationID', contextService.context.ApplicationID, 'sessionStorage');
                //registry.set('ChannelAlias', contextService.context.ChannelAlias, 'sessionStorage');
                //registry.set('ChannelID', contextService.context.ChannelID, 'sessionStorage');
                //registry.set('EnvironmentType', contextService.context.EnvironmentType, 'sessionStorage');
                //registry.set('serviceHost', 'services.lexus.monster.com', 'sessionStorage');
                //registry.set('rootUrl', 'https://' + $rootScope.registry.sessionStore.serviceHost, 'sessionStorage');
                //registry.set('standardMask', { usPhone: "(999) 999-9999", ssn: "999-99-9999", usDate: '99/99/9999' }, 'sessionStorage');
                //registry.set('constants', { UBF_CRL_DEFAULT_YES: '2008', UBF_CRL_DEFAULT_NO: '2009' }, 'sessionStorage');

                ///Root Scope Constants
                $rootScope.constants = {
                    UBF_CRL_DEFAULT_YES: '2008',
                    UBF_CRL_DEFAULT_NO: '2009',
                };

                $rootScope.productVariables = {};
                $rootScope.productVariables.token = '123';
                var context = $rootScope.registry.localStore.global.context;
                $rootScope.productVariables.ApplicationID = context.ApplicationID;
                $rootScope.productVariables.ChannelAlias = context.ChannelAlias;
                //$rootScope.productVariables.ChannelAliases = contextService.context.ChannelAliases ;
                $rootScope.productVariables.DemoChannelID = 10338;
                $rootScope.productVariables.ChannelID = context.ChannelID;
                $rootScope.productVariables.CountryID = context.CountryID;
                $rootScope.productVariables.EnvironmentType = context.EnvironmentType;
                $rootScope.productVariables.serviceHost = context.ServiceUrl;
                $rootScope.productVariables.rootUrl         = 'https://' + $rootScope.productVariables.serviceHost;
                $rootScope.productVariables.standardMask    = {
                    usPhone: "(999) 999-9999",
                    ssn: "999-99-9999",
                    usDate: '99/99/9999'
                };

                //caching section
                var caching = $rootScope.productVariables.caching = {};
                caching.cacheTypesEnum = {
                    sharedCache: 'shared',
                    httpSharedCache: 'httpShared',
                    privateCache: 'private',
                    httpPrivateCache: 'httpPrivate'                    
                };
                caching.cacheTypesDef = [
                    {
                        //shared with manual approach; e.g. messages, channel configs
                        cacheType: caching.cacheTypesEnum.sharedCache,
                        enabled: 'true',
                        initOptions: {
                            maxAge: 120 * 60 * 1000, // Items added to this cache expire after 2 hours
                            cacheFlushInterval: 120 * 60 * 1000, // This cache will clear itself every hour
                            deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
                            storageMode: 'localStorage' // This cache will use `localStorage`.
                        }
                    },
                    {
                        //shared with automatic approach (http cache); cached by url; e.g. lookups
                        cacheType: caching.cacheTypesEnum.httpSharedCache,
                        enabled: 'true',
                        initOptions: {
                            capacity: 40, //Maximum number of items a cache can hold. Adding more items than the capacity will cause the cache to operate like an LRU cache, removing the least recently used items to stay under capacity
                            maxAge: 60 * 60 * 1000, // Items added to this cache expire after 1 hour
                            cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
                            deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
                            storageMode: 'localStorage' // This cache will use `localStorage`.
                        }
                    },
                    {
                        //private with manual approach; specific to given session or user; e.g. login info
                        cacheType: caching.cacheTypesEnum.privateCache,
                        enabled: 'true',
                        initOptions: {
                            storageMode: 'sessionStorage' // This cache will use `localStorage`.
                        }
                    },
                    {
                        //private with automatic approach (http cache); e.g. cover letters, documents
                        cacheType: caching.cacheTypesEnum.httpPrivateCache,
                        enabled: 'false',
                        initOptions: {
                            capacity: 5, //Maximum number of items a cache can hold. Adding more items than the capacity will cause the cache to operate like an LRU cache, removing the least recently used items to stay under capacity
                            maxAge: 10 * 60 * 1000, // Items added to this cache expire after 10 mins
                            cacheFlushInterval: 30 * 60 * 1000, // This cache will clear itself every hour
                            deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
                            storageMode: 'sessionStorage' // This cache will use `localStorage`.
                        }
                    }
                    ];                

////    ?auth=EAAQSNV.iBCEoimL1L5EJBEJuk5ouBJntFQY.vic6I5DhNRmzkyBh96az1WQ4E1YBkbRmqdOr8gfi9xjwdx1eg3qQA-- 
                //function getParameterByName(name) {
                //    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                //    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                //        results = regex.exec(location.search);
                //    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
                //}
                //var impersonationAuth = '{"auth":"' + getParameterByName('auth') + '"}';
                //if (impersonationAuth) {
                //    console.log('Sending:' + impersonationAuth);
                //    impersonate.post(impersonationAuth).$promise.then(function (data) {
                //        //console.log('Receving:' + data);
                //    });
                //}

            },
            add: function () {

            }
        }
    }
})();