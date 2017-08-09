(function () {
    'use strict';

    var LOGIN = {
        Lexus: 0,
        Sso: 1
    };

    function authenticationStorage($window, $rootScope, registry, $cookies) {
        var factory = {};
        
        function getKey(key) {
            return $cookies.get(key);
        }

        factory.getAuthenticationType = function () {
            try {
                return $cookies.get('login_type_key', { path: "/" });
            } catch (err) {
                return null;
            }
        };

        factory.setAuthenticationType = function (type) {
            $cookies.put('login_type_key', type, { path: "/" });
        };

        factory.getMillisecondsToProlong = function () {
            var prolongDate = this.getProlongDate();
            if (prolongDate) {
                return prolongDate.getTime() - (new Date()).getTime();
            }
            return null;
        };

        factory.setProlongDate = function (date) {
            if (!(date instanceof Date)) {
                throw Error('date should be of Date type.');
            }
            $cookies.put('prolong_date_key', date.getTime(), { path: "/" });
        };

        factory.getProlongDate = function () {
            try {
                var milliseconds = $cookies.get('prolong_date_key', { path: "/" }); //$rootScope.registry.sessionStore.authentication.prolong_date_key;
            }
            catch (err) {
                return null;
            }
            var result = new Date();
            result.setTime(parseInt(milliseconds));
            return result;
        };

        factory.getImpersonation = function () {
            var result = $cookies.get('webadmin_impersonation_key', { path: "/" }); //$rootScope.registry.sessionStore.authentication.webadmin_impersonation_key;
            if (result) {
                return JSON.parse(result);
            }
            return {};
        };

        factory.setImpersonation = function (impersonation) {
            var value = null;
            if (impersonation) {
                value = JSON.stringify(impersonation);
            }
            $cookies.put('webadmin_impersonation_key', value, { path: "/" });
        };

        factory.getToken = function () {
            var type = this.getAuthenticationType();
            if (type != null) {
                if (type == LOGIN.Lexus) {
                    try {
                        return $cookies.get('login_token_key', { path: "/" });
                    }
                    catch (err) {
                        return null
                    }
                }
                if (type == LOGIN.Sso) {
                    //return $window.mgr.access_token;
                }
            }
        };

        factory.clearRedirectUrl = function () {
            $cookies.remove('redirect_key', { path: "/" });
        };

        factory.setRedirectUrl = function (url) {
            $cookies.put('redirect_key', url, { path: "/" });
        };

        factory.getRedirectUrl = function () {
            return $cookies.get('redirect_key', { path: "/" });
        };

        factory.setLexusToken = function (token) {
            $cookies.put('login_token_key', token, {path: "/"});
        };

        factory.setUser = function (user) {
            $cookies.put('user_key', JSON.stringify(user));
        };

        factory.getUser = function () {
            try {
                var user = $cookies.get('user_key', { path: "/" });
            }
            catch (err) {
                return null;
            }
            if (user) {
                return JSON.parse(user);
            }
            return null;
        };

        factory.clear = function () {
            $window.mgr.removeToken();
            $cookies.remove('login_token_key', { path: "/" });
            $cookies.remove('webadmin_impersonation_key', { path: "/" });
            $cookies.remove('login_type_key', { path: "/" });
            $cookies.remove('prolong_date_key', { path: "/" });
            $cookies.remove('user_key', { path: "/" });
            $cookies.remove('redirect_key', { path: "/" });
        };

        return factory;
    };
    authenticationStorage.$inject = ['$window', '$rootScope', 'registry', '$cookies'];
    angular.module('globalApp').factory('authenticationStorage', authenticationStorage);


    //
    //
    //   _______________________________________________________________________________________
    //


    function authenticationFactory($window, $resource, $rootScope, $timeout, $location, $injector, authenticationStorage, registry) {
        var factory = {};

        var renewalPromise = null;

        factory.scheduleRenewal = function () {
            if (!renewalPromise && authenticationStorage.getMillisecondsToProlong()) {
                renewalPromise = $timeout(function () {
                    var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/security/prolong-token';
                    var prolong = $resource(resourceUrl, {}, {
                        post: { method: 'POST', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false, handle401Locally: true }
                    });
                    return prolong.post()
                    .$promise
                    .then(function (data) {
                        factory.loginCallback(data);
                        return data.success;
                    }, function (data) {
                        if (data && data.status == 401) {
                            // auth has timed out, logout and force user to login
                            factory.logout();
                        }
                    });
                }, authenticationStorage.getMillisecondsToProlong())
            }
        };


        factory.setup = function (fOnLoggedIn, fOnLoggedOut, allowAnonymous) {
            if (fOnLoggedIn) {
                $rootScope.$on("login_success", fOnLoggedIn);
            }
            if (fOnLoggedOut) {
                $rootScope.$on("logout_success", fOnLoggedOut);
            }

            if (!this.isAuthenticated()) {
                authenticationStorage.setRedirectUrl($location.absUrl());
                if (!$rootScope.login) {
                    $rootScope.login = {};
                }
                if (!allowAnonymous) {
                    //$rootScope.login.boxOpen = true;
                }
                if (fOnLoggedOut) {
                    fOnLoggedOut();
                }
            } else {
                if (fOnLoggedIn) {
                    fOnLoggedIn();
                }
            }
        };

        factory.loginCallback = function (authentication, user) {
            if (authentication && authentication.success) {
                authenticationStorage.setAuthenticationType(LOGIN.Lexus);
                authenticationStorage.setLexusToken(authentication.token);
                //registry.set('Authenticate', 'token', token, 'sessionStorage');
                authenticationStorage.setImpersonation(authentication.webAdminImpersonation);
                $rootScope.isAuthenticated = factory.isAuthenticated();
                var now = new Date();
                now.setSeconds(now.getSeconds() + authentication.expiresInSeconds / 2);
                authenticationStorage.setProlongDate(now);
                if (renewalPromise) {
                    $timeout.cancel(renewalPromise);
                    renewalPromise = null;
                }
                factory.scheduleRenewal();
                if (user) {
                    authenticationStorage.setUser(user);
                }
            }
        };

        factory.login = function (email, password) {
            var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/security/local-login';
            var localLogin = $resource(resourceUrl, {}, {
                post: { method: 'POST', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }
            });
            return localLogin.post({ email: email, password: password })
            .$promise
            .then(function (response) {
                var success = response.authentication && response.authentication.success;
                if (success) {
                    factory.loginCallback(response.authentication, response);
                    $rootScope.$broadcast('login_success', authenticationStorage.getUser().registrationType);

                    var url = authenticationStorage.getRedirectUrl();
                    if (!url) {
                        url = '/dashboard/';
                    }
                    authenticationStorage.clearRedirectUrl();
                    return { success: success, url: url };
                }
                
                // for user disabled
                if (!success && response.authentication.failureReason) {
                    return { success: false, reason: response.authentication.failureReason };
                } else {
                    return { success: false };
                }
            });
        };

        factory.impersonate = function (webAdminAuthenticationToken) {
            var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/security/impersonate';
            var impersonateCall = $resource(resourceUrl, {}, {
                post: { method: 'POST', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }
            });
            return impersonateCall.post({ auth: webAdminAuthenticationToken })
            .$promise
            .then(function (response) {
                if (response.authentication && response.authentication.success) {
                    factory.loginCallback(response.authentication, response);
                    $window.location = '/';
                }
            });
        };

        factory.isAuthenticated = function () {
            var token = authenticationStorage.getToken();
            var result = (typeof token !== "undefined") && token !== null && token !== "";
            return result;
        };

        factory.impersonation = function () {
            if (!factory.isAuthenticated()) {
                return {};
            }
            return authenticationStorage.getImpersonation();
        };

        factory.logout = function () {
            var samlAuth = $injector.get('samlAuth');
            var isUsingSaml = samlAuth.isAuthenticatingUsingSaml();

            var type = authenticationStorage.getAuthenticationType();
            if (type == LOGIN.Sso) {
                $window.mgr.redirectForLogout();
                return;
            }
            if (type == LOGIN.Lexus) {
                if (isUsingSaml) {
                    authenticationStorage.clear();
                    samlAuth.login();
                } else {
                    authenticationStorage.clear();
                    $rootScope.isAuthenticated = false;
                    $rootScope.$broadcast('logout_success');
                    $location.path('/').replace();
                }
            }
        };

        $rootScope.isAuthenticated = factory.isAuthenticated();
        $rootScope.impersonation = factory.impersonation();

        return factory;
    };

    authenticationFactory.$inject = ['$window', '$resource', '$rootScope', '$timeout', '$location', '$injector', 'authenticationStorage', 'registry'];
    angular.module('globalApp').factory('authentication', authenticationFactory);
})();