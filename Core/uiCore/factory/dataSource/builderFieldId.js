(function () {
    'use strict';

    angular.module('globalApp').factory("builderFieldId", ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + "/core/api/lookups/builderfields/:lookUp";
        return $resource(resourceUrl, {}, {
            get: { method: 'GET', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false },
        });
    };
})();



