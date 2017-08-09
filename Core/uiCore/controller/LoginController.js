(function () {
    "use strict";
    angular.module('globalApp').controller('LoginController', loginController);

    loginController.$inject = ['$scope', '$rootScope', '$httpParamSerializer', 'authentication', 'authenticationStorage', 'samlAuth', '$uibModal', '$window', '$location', '$http', '$cookies', 'utilityService', 'screenSize'];
    function loginController($scope, $rootScope, $httpParamSerializer, authentication, authenticationStorage, samlAuth, $uibModal, $window, $location, $http, $cookies, utilityService, screenSize) {

        $scope.user = {};
        $scope.loginType = 'seeker';
        $scope.error = "";

        var body = document.getElementsByTagName("HTML")[0];

        //Navigation logic
        var $header = $('.main-header');

        screenSize.when('lg, md, sm', function () {
            utilityService.removeInlineStyle($('#main-navigation'));
            repositionMenu();
        });

        screenSize.when('xs', function () {
            repositionMenu(true);
        });

        if (screenSize.is('xs')) {
            repositionMenu(true);
        } else {
            repositionMenu();
        }

        $rootScope.navIsCollapsed = true;
        $scope.menuToggle = function () {
            $rootScope.navIsCollapsed = !$rootScope.navIsCollapsed;
            if (!$rootScope.navIsCollapsed) {
                body.style.overflow = 'hidden';
                repositionMenu(true);
            } else {
                body.style.overflow = 'auto';
            }
        }

        function repositionMenu(recalculate) {
            var height = $header.outerHeight();
            if (recalculate) {
                $('#main-navigation').css('top', height);
            } else {
                $rootScope.navIsCollapsed = true;
            }
        }
        //End of navigation logic

        if (!$rootScope.login) {
            $rootScope.login = { boxOpen: false };
        }

        $scope.bringMobileMenu = function () {
            $rootScope.sideMenuOpened = ($rootScope.sideMenuOpened) ? false : true;
        };

        $scope.logout = function () {
            if (samlAuth.isAuthenticatingUsingSaml()) {
                samlAuth.logout();
            } else {
                authentication.logout();
                $window.location.href = "/";
            }
        };

        $scope.login = function () {
            if (samlAuth.isAuthenticatingUsingSaml()) {
                samlAuth.login();
            }
            else {
                $window.location.href = "/login";
            }
        };
     
        $scope.isAuthenticated = function () {
            if (samlAuth.isAuthenticatingUsingSaml()) {
                //console.log('check saml auth');
                if ($scope.InitiatingSamlLogin == null) {
                    $scope.InitiatingSamlLogin = true;
                    //console.log("Initiating a SAML login");
                    return samlAuth.isAuthenticatedAtIdpAndLocally(true);
                }
                else {
                    return samlAuth.isAuthenticatedAtIdpAndLocally(false);
                }
            }
            //console.log('checking normal auth');
            return authentication.isAuthenticated();
        };

        $scope.getFullName = function () {
            if (authenticationStorage.getUser() !== null) {
                var user = authenticationStorage.getUser();
                return user.firstName + " " + user.lastName;
            }
        };

        $scope.getUserEmail = function () {
            if (authenticationStorage.getUser() !== null) {
                var user = authenticationStorage.getUser();
                return user.emailAddress;
            }
        };

        $scope.loginBoxToggle = function (open) {
            // clean callout if there was any if user choose to close login box
            if (!$rootScope.login.boxOpen) {
                $rootScope.login.callout = null;
            }
        }

        $scope.createAccount = function ($event) {
            var location = '/account/?' + $httpParamSerializer({ callout: { type: 'redirect', data: $location.absUrl() } });
            if ($rootScope.login.callout) {
                location = '/account/?' + $httpParamSerializer({ callout: $rootScope.login.callout });
            }
            $window.location = location;
            $event.preventDefault();
            $event.stopPropagation();
        };

        $scope.applyModel = function (e) {
            $scope.loginType = e.loginType;
            $scope.user.isBusy = false;
            $scope.error = "";
            $scope.loginForm.$setPristine();
        }

        function isSeeker() {
            return $scope.loginType === 'seeker';
        }

        $scope.go = function () {
            $scope.error = "";
            if ($scope.loginForm.$valid) {
                if (isSeeker()) {
                    authentication.login($scope.user.email, $scope.user.password).then(
                        function (result) {
                            $scope.user.isBusy = false;
                            if (result.success) {
                                $scope.error = "";
                                if (result.url.indexOf("account") !== -1) {
                                    location.reload(true);
                                }
                                if (location.pathname == "/" || location.pathname == "/home" || location.pathname == "/home/") {
                                    $window.location.href= result.url;
                                }
                            }
                            else {
                                var reasons = {
                                    'USERDISABLED': function () { return $rootScope.msg(373636); },
                                    'default': function () { return $rootScope.msg(157552); }
                                };
                                
                                $scope.error = (result.reason !== undefined && reasons[result.reason.toUpperCase()] || reasons['default'])();
                            }
                        },
                        function (error) {
                            console.log(error);
                            $scope.error = error.data.message;
                        }
                    );
                }
                else {
                    $scope.error = "No employer login.";
                    $scope.user.isBusy = false;
                }
            }
        };
    }
})();