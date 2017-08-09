(function () {
    'use strict';

    angular.module('globalApp').factory("channelConfig", ['$resource', '$rootScope', factoryFunction]);
    
    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + "/core/api/config/channel-configs/by-alias";
        return $resource(resourceUrl, {}, {
            post: { method: 'POST', isArray: true, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false },
            get: { url: resourceUrl + '/:alias', method: 'GET', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }
        });
    };
})();

