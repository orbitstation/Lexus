(function () {
    'use strict';

    angular.module('globalApp').factory('httpInterceptor', ['$q', '$rootScope', 'authenticationStorage', 'registry', '$window', factoryFunction])
        .config(['$httpProvider', configFunction]);
            
    function factoryFunction($q, $rootScope, authenticationStorage, registry, $window) {
        return {
            request: function (config) {
                if (config.url.indexOf($rootScope.productVariables.serviceHost) >= 0) {
                    config.headers['ChannelID'] = $rootScope.productVariables.ChannelID;
                    config.headers['AppID'] = $rootScope.productVariables.ApplicationID;

                    //console.log(config);

                    var token = authenticationStorage.getToken();
                    if (token) {
                        config.headers['Authorization'] = 'Bearer ' + token;
                    }
                }
                return config;
            },
            responseError: function (response) {
                // this will init the variable for the error at the top of the screen.
                if (!$rootScope.topErrorList) { $rootScope.topErrorList = [] };

                if (response.status != 400){
                    var tempErrorString = response.status + ' : ' + response.statusText + ' ===> ' + response.config.url;
                    $rootScope.topErrorList.push({ error: response.status, text: tempErrorString, type: 'alert-danger', message: (response.statusText) ? response.statusText : '', message2: ((response.data) && (response.data.message)) ? response.data.message : '' });
                }

                // globaly handle a 500 error
                if (response.status == 500) {
                    registry.set('PageErrors', '500Error', response , 'sessionStorage');
                    //$window.location.href = '/error';
                }

                if (response.config.url.indexOf($rootScope.productVariables.serviceHost) >= 0 && (response.status === 401 || response.status === 403)) {
                    if (response.config.handle401Locally || response.config.handle403Locally) {
                        // Skip the error message as we've received notice that the calling function is going to handle the error.
                        $rootScope.topErrorList.pop();
                    }
                    else {
                        authenticationStorage.clear();
                    }
                }
                return $q.reject(response);
            }
        };
    };

    function configFunction($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    };


})();