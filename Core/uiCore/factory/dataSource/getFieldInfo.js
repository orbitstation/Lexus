(function () {
    'use strict';

    angular.module('globalApp').factory("getFieldInfo", ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/lookups/custom-lookups/list-by-name/:lookUp';
        return $resource(resourceUrl, {}, {
            get: { method: 'GET', isArray: true, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false },
        });
    };
})();



