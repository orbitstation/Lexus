(function () {
    'use strict';

    angular.module('globalApp').factory('budgetCalculatorFactory',
        ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/me/budget';
        var factory = $resource(resourceUrl, null,
            {
                getExpenses: {
                    url: resourceUrl,
                    method: 'GET'
                },
                saveExpenses: {
                    url: resourceUrl,
                    method: 'POST'
                }
            });
        return factory;
    };


})();