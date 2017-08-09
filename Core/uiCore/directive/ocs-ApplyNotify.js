(function () {
    'use strict';
    angular.module('globalApp').directive('ocsApplyNotify', ['$parse', '$rootScope', '$timeout', 'templateUrlService', 'registry', '$location', directiveFunction]);

    function directiveFunction($parse, $rootScope, $timeout, templateUrlService, registry, $location) {
        return {
            restrict: 'E',
            templateUrl: templateUrlService.get('ocs-ApplyNotify.html'),
            scope: {
                meta: "=",
            },
            link: function (scope, element, attrs) {
                scope.show = false;
                var apply = registry.get('global', 'currentApply', 'sessionStorage');

                ShowHide($location.absUrl());

                scope.cancel = function () {
                    scope.show = false;
                    scope.job = {};
                    registry.remove('global', 'currentApply', 'sessionStorage');
                    registry.remove('global', 'currentApplyState', 'sessionStorage');
                    apply = {}; 
                }

                scope.finish = function () {
                    window.location = scope.job.url;
                }

                scope.$watch(function () {
                    return $location.absUrl();
                }, function (newValue, oldValue) {
                    ShowHide(newValue);
                });

                var applyHasId = (function applyHasId() {
                    if (apply) {
                        if (apply.id > 0) {
                            return true;
                        } else {
                            var regex = /([0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12})/i;
                            var match = regex.test(apply.id);
                            return match;
                        }
                        return false;
                    }
                })();

                function ShowHide(currentLocation) {
                    if (apply && applyHasId > 0 && ShowOnThisPage(currentLocation) && $rootScope.isAuthenticated) {
                        scope.show = true;
                        scope.job = apply;
                    }
                    else {
                        scope.show = false;
                        scope.job = {};
                    }
                };

                function ShowOnThisPage(currentLocation) { //MGSMIL-382
                    var noShowPages = ["/resumes/start", "/resumes/view", "/apply"];
                    var currentPage = currentLocation.toLowerCase();

                    for (var i in noShowPages) {
                        if (currentPage.indexOf(noShowPages[i]) > 0) {
                            return false;
                        }
                    }

                    return true;
                };
            }
        };
    };
})();
