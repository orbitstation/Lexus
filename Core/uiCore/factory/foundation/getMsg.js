(function () {
    'use strict';

    angular.module('globalApp').factory("getMessage", ['$resource', '$rootScope', factoryFunction]);
    
    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/config/messages';
        return $resource(resourceUrl, {}, {
            post: { method: 'POST', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }
        });
    };
})();

