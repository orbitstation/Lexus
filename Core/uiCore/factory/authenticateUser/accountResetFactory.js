(function () {
    'use strict';

    angular.module('globalApp').factory('accountResetFactory',['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/security/forgot-password/';
        var factory = $resource(resourceUrl + '/:username', { userName: '@username' }, {
            getSecretQA: { url: resourceUrl, method: 'GET', isArray: true },

            resetPasswordOnline: {
                url: resourceUrl + 'reset/:userName',
                params: { userName: '@userName'},
                method: 'POST',
                data: '@secretQAModel' , isArray: false,
            },
            sendResetEmail: {
                url: resourceUrl + 'reset/:email',
                params: { email: '@email' },
                method: 'PUT',
                isArray: false
            },
            getSecretQuestion: {
                url: resourceUrl + ':userName',
                params: { userName: '@userName' },
                method: 'GET',
                isArray: false
            },
            resetpassword: {
                url: resourceUrl + 'resetpassword',
                params: { token: '@token', password: '@password' },
                method: 'PUT'
            }

        });
        return factory;
    };


})();