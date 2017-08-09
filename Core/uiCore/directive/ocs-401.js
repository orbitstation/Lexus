(function () {
    'use strict';
    angular.module('globalApp').directive("ocs401", ['$rootScope', '$httpParamSerializer', '$location', '$window', 'templateUrlService', 'authentication', 'samlAuth', directiveFunction]);

    function directiveFunction($rootScope, $httpParamSerializer, $location, $window, templateUrlService, authentication, samlAuth) {
        return {
            restrict: "E",
            scope: {
                meta: "=",
                msgheader: "@",
                msgbody: "@"
            },
            templateUrl: ( !samlAuth.isAuthenticatingUsingSaml()) ? templateUrlService.get('ocs-401.html') : "",
            link: function (scope) {
                if (samlAuth.isAuthenticatingUsingSaml() && !samlAuth.isAuthenticatedLocally()) {
                    //console.log('initiating 401 login');
                    samlAuth.login();
                }

                scope.createAccount = function () {
                    var location = '/account/?' + $httpParamSerializer({ callout: { type: 'redirect', data: $location.absUrl() } });
                    if ($rootScope.login && $rootScope.login.callout) {
                        location = '/account/?' + $httpParamSerializer({ callout: $rootScope.login.callout });
                    }
                    $window.location = location;
                };
            }
        };
    };

})();