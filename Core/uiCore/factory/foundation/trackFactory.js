(function (angular) {
    'use strict';

    angular.module('globalApp').factory('trackFactory', ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/config/tracking-configs';
          
        return $resource(resourceUrl, {}, {
            getTrackingConfigs: { method: 'GET', isArray: true, cache: false }
        });
    };

})(angular);