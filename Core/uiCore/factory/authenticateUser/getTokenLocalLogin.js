(function () {
    'use strict';

    angular.module('globalApp').factory('getTokenLocalLogin', ['$resource', '$rootScope', 'errorDispatch', factoryFunction]);

    function factoryFunction($resource, $rootScope, errorDispatch) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/security/local-login';
        var factory = $resource(resourceUrl, null,
            {
                post: { method: 'POST', isArray: false, interceptor: { responseError: errorDispatch.alertError }, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }
            }
        );
        return factory;
    };

})();


