(function () {
    'use strict';
    angular.module('globalApp').directive('ocsLogin', ['$rootScope', '$httpParamSerializer', '$location', 'authentication', 'registry', '$window', 'templateUrlService', directiveFunction]);

    function directiveFunction($rootScope, $httpParamSerializer, $location, authentication, registry, $window, templateUrlService) {
        return {
            restrict: "E",
            scope: {
                meta: "=",
            },
            templateUrl: templateUrlService.get('ocs-Login.html'),
            replace: true,
            link: function (scope, element, attrs) {
                var preFillEmail = registry.get('global', 'logInEmail', 'sessionStorage');
                if (preFillEmail !== undefined) {
                    scope.userName = preFillEmail;
                    registry.remove('global', 'logInEmail', 'sessionStorage');
                } else {
                    scope.userName = "";
                }
              
                scope.password = "";
                
                scope.createAccount = function () {
                    var location = '/account/?' + $httpParamSerializer({ callout: { type: 'redirect', data: $location.absUrl() } });
                    if ($rootScope.login && $rootScope.login.callout) {
                        location = '/account/?' + $httpParamSerializer({ callout: $rootScope.login.callout });
                    }
                    $window.location = location;
                };

                // for login authentication 
                scope.authenticateLogin = function () {
                    authentication.login(scope.userName, scope.password).then(
                    function (result) {
                        //console.log(result.success);
                        if (result.success) {
                            //$window.location.href = result.url;
                        }
                        else {
                            var reasons = {
                                'USERDISABLED': function () { scope.error = true, scope.errorMessage = $rootScope.msg(373636); }, 
                                'default': function () { scope.error = true, scope.errorMessage = $rootScope.msg(157552); }
                            };
                            (result.reason !== undefined && reasons[result.reason.toUpperCase()] || reasons['default'])();
                            scope.isBusy = false;
                        }
                    });
                };
            }
        };

    };

})();


