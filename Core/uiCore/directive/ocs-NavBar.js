(function () {
    'use strict';
    angular.module('globalApp').directive('ocsNavbar', ['$rootScope', '$timeout', 'screenSize', 'templateUrlService', directiveFunction]);

    function directiveFunction($rootScope, $timeout, screenSize, templateUrlService) {
        return {
            restrict: 'E',
            scope: {
                meta: "=",
                settings: "="
            },
            templateUrl: templateUrlService.get('ocs-NavBar.html'),
            link: function (scope, elem, attrs) {
                //default settings
                scope.defaults = {
                    hoverDelay: 100,
                    removeInverse: false,
                    removeCarets: false,
                    enableHeaderLink: false,
                    innerMobileButtons: true
                };

                angular.merge(scope.defaults, scope.settings);

                
                $rootScope.isSearchCollapsed = true;

                var ua = navigator.userAgent;
                var isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);
                var timer;

                

                scope.open = function (item) {
                    if (!isiPad) {
                        if (item.status.isopen === false || item.status.isopen === undefined) {
                            timer = $timeout(function () {
                                item.status.isopen = true;
                            }, scope.defaults.hoverDelay);
                        }
                    }
                    
                };

                scope.close = function (item) {
                    if (!isiPad) {
                        $timeout.cancel(timer);
                        item.status.isopen = false;
                    }
                }

                scope.goToLink = function (obj) {
                    if (scope.defaults.enableHeaderLink) {
                        try {
                            var url = obj.item[0].url;
                            window.location = url;
                        } catch (err) {
                            console.log(err);
                        }
                    }
                }
            }
        };
    }

})();


