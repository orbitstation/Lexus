(function () {
    'use strict';

    angular.module('globalApp').factory('ContactUs', ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + "/seeker/api/contact-us";
        return $resource(resourceUrl, {}, {
            put: { method: 'PUT', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }
        });
    }

})();