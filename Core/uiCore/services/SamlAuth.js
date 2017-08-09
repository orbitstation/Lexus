(function () {
    'use strict';
    angular.module("globalApp").service("samlAuth", ['$rootScope', '$window', '$cookies', 'authentication', 'authenticationStorage', 'registry', service]);
    function service($rootScope, $window, $cookies, authentication, authenticationStorage, registry) {

        var loginPath = '/saml/signin?ReturnUrl=';
        var logoutPath = '/saml/redirect/sloresponse?ReturnUrl=';
        var idpAuthCookieConfig = 'idpAuthCookieName';
        var samlAuthConfig = 'authenticateUsingSAML';
        var seekerCookieName = 'samlseeker';


        this.init = function () {
            this.loginHandler();
        }

        this.authenticateUsingSaml = function () {
            var samlConfig = $rootScope.cfg(samlAuthConfig);
            return (samlConfig !== "undefined" && samlConfig !== null && samlConfig.toLowerCase() == "true");
        }

        this.isAuthenticatingUsingSaml = function () {
            var samlConfig = $rootScope.cfg(samlAuthConfig);
            return (samlConfig !== "undefined" && samlConfig !== null && samlConfig.toLowerCase() == "true");
        }

        this.isAuthenticatedAtIdp = function () {
            var idpAuthCookie = $cookies.get($rootScope.cfg(idpAuthCookieConfig));
            if (idpAuthCookie !== undefined) {
                return true;
            }
            return false;
        }

        this.isAuthenticatedLocally = function () {
            return authentication.isAuthenticated();
        }

        this.isAuthenticatedAtIdpAndLocally = function (initiateLogin) {
            if (this.isAuthenticatedAtIdp()) {
                if (authentication.isAuthenticated()) {
                    return true;  // authenticated locally and at idp
                }
                else {
                    if (initiateLogin && $cookies.get(seekerCookieName) == null) {
                        this.login();
                    }
                    return false;  // authenticated at idp but not locally
                }
            }
            return false;  // not authenticated at idp
        }

        this.login = function () {
            var samlurl = getSamlUrl(loginPath) + $window.encodeURIComponent($window.location.href);
            //console.log(samlurl);
            $window.location.href = samlurl;
        }

        this.logout = function () {
            authenticationStorage.clear();
            var samlurl = getSamlUrl(logoutPath) + $window.encodeURIComponent("/samllogout");
            //console.log(samlurl);
            $window.location.href = samlurl;
        }

        this.loginHandler = function () {
            var seeker = $cookies.get(seekerCookieName);
            if (seeker != undefined) {
                // get the seeker object
                var seekerobj = angular.fromJson(seeker);
                $cookies.put(seekerCookieName, undefined, { path: "/", domain: getCookieDomain(true) });

                //remove the seeker cookie
                $cookies.remove(seekerCookieName, { path: "/", domain: getCookieDomain(true) });
                registry.set('global', 'trackUserID', seekerobj.trackingID, 'sessionStorage');

                authentication.loginCallback(seekerobj.authentication, seekerobj)
            }
        };

        function getSamlUrl(path) {
            var context = registry.get('global', 'context', 'localStorage');
            var host = (context) ? context["Domain"] : null;
            if (host) {
                return "https://" + host + path;
            }
            else {
                return path;
            }
        }

        function getCookieDomain(usingSaml) {
            var domain = $window.location.hostname;

            if (usingSaml) {
                //for saml channels use the root domain
                var matches = domain.match(/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/i);
                var rootDomain = (matches) ? matches[0] : domain;
                //console.log(rootDomain);
                return rootDomain;
            } else {
                //for non-saml channels use the full domain
                //console.log(domain);
                return domain;
            }
        }

    }
})();



