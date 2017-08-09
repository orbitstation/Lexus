(function () {
    'use strict';

    angular.module('globalApp').factory("impersonate", ['$resource', '$rootScope', factoryFunction]);
    
    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/security/impersonate';
        return $resource(resourceUrl, {}, {
            post: { method: 'POST', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false },
        });
    };
})();

