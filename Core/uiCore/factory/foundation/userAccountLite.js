(function () {
    'use strict';

    angular.module('globalApp').factory("UserAccountLite", ['$resource', '$rootScope', factoryFunction]);
    
    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/me/Lite';
        return $resource(resourceUrl, {}, {
            get: { method: 'GET', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false },
            post: { method: 'POST', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false },
            put: { method: 'PUT', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }

        });
    };

})();

