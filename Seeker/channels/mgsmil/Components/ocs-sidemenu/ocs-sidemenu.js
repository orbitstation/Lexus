(function () {
    "use strict"
    angular.module('globalApp').component('ocsSidemenu', {
        bindings: {
            shiftingClass: "@",
            menuTrigger: "=",
            menuItems: "=",
            menuLogged: "<"
        },
        templateUrl: '/channels/mgsmil/components/ocs-sidemenu/ocs-sidemenu.html',
        controller: ['$rootScope', '$scope', '$document', '$timeout', '$window', 'screenSize', '$location', 'samlAuth',
            function ($rootScope, $scope, $document, $timeout, $window, screenSize, $location, samlAuth) {
                //variables
                var ctrl = this;
                ctrl.home = true;
                ctrl.closeMenu = closeMenus;
                ctrl.menu = [];
                //for exposing the menu on mobile etc..
                //TODO: please use header as a wrapping component of this one.
                var html = $document.find('html');
                var htmlBody = $document.find('body');
                var menuItem;
                var shiftWrapper;
                var prevMenu;
                var animationTime = 400;
                var menuWidth = 80;
                var winHeight;
                var bodyWidth;
                var menuSelector = '.side-menu';
                var bodyWrapper = '.body-wrapper';
                var contentBlocker = '.content-blocker';

                ctrl.$onInit = function () {
                    ctrl.logout = function () {
                        samlAuth.logout();
                        //$window.location.href = '/saml/redirect/sloresponse?ReturnUrl=' + $window.encodeURIComponent('/samllogout');
                    };

                    //do stuff on load
                    menuItem = htmlBody.find('.side-menu');
                    reset(true);
                    var blocker = [
                        '<div class="content-blocker">',
                        '</div>'
                    ].join('');

                    htmlBody.prepend(blocker);

                    //for mobile
                    screenSize.when('sm, xs', function () {
                        //ensures no jumps on first menu open
                        updateDimentions();
                    });

                    //for dektop
                    screenSize.when('lg, md', function (s) {
                        reset(true);
                    });

                    htmlBody.on('keyup', function (ev) {
                        //on escape
                        if (ev.keyCode == 27) {
                            closeMenus();
                        }
                    });

                    //Build menu
                    var menuWatch = $scope.$watch(function () { return ctrl.menuItems }, function (n, o) {
                        if (n !== o && n !== undefined) {
                            var temp = {};
                            angular.copy(n, temp);
                            ctrl.menu = Object.keys(temp).map(function (k) {
                                return temp[k];
                            });

                            if (ctrl.menuLogged) {
                                ctrl.menu.unshift(
                                    ctrl.menuLogged,
                                    {
                                        display: 'Home',
                                        url: 'http://www.military.com',
                                    }
                                );
                            }
                            //Stop watching for new menu items
                            menuWatch();
                        }
                    });

                    $(contentBlocker).on('click touch touchstart', function (ev) {
                        ev.stopPropagation();
                        ev.preventDefault();
                        closeMenus();
                    });

                    $scope.$watch(function () { return ctrl.menuTrigger }, function (n, o) {
                        if (n === true) {
                            updateDimentions(true);
                            $(bodyWrapper).css({ 'width': bodyWidth() });
                            menuItem.css({ '-webkit-overflow-scrolling': 'touch' });
                            $(contentBlocker).show();
                           
                        } else {
                            $(contentBlocker).hide();
                        }
                    });


                    ctrl.goHome = function () {
                        ctrl.home = true;
                        for (var i in ctrl.menu) {
                            if (ctrl.menu[i].open) {
                                ctrl.menu[i].open = false;
                                break;
                            }
                        }
                    };

                    ctrl.open = function (toOpen) {
                        var thisItem = ctrl.menu[toOpen];
                        if (thisItem[toOpen] !== undefined) {
                            ctrl.home = false;
                            thisItem.open = true;
                        }
                    };
                }; //end of onInit

                

                function closeMenus() {
                    if ($rootScope.sideMenu) {
                        $rootScope.sideMenu.open = false;
                    }
                    if ($rootScope.search) {
                        $rootScope.search.open = false;
                    }
                    if (!$rootScope.$$phase) {
                        $rootScope.$digest();
                    }
                    menuItem.css({'-webkit-overflow-scrolling': 'auto'});
                }

                function updateDimentions(resetWidth) {
                    if (resetWidth) {
                        $(bodyWrapper).css({ 'width': 'auto' });
                    } else {
                        $(bodyWrapper).css({ 'width': bodyWidth() });
                    }
                    
                    menuItem.css({
                        'width': calculateDegree(menuWidth, bodyWidth()) + 'px',
                        'height': currentHeight()
                    });
                }

                function reset(resetWidth) {
                    closeMenus();
                    updateDimentions(resetWidth);
                }

                function bodyWidth() {
                    return $($window).width();
                }

                function currentHeight() {
                    return $($window).height();
                }

                function calculateDegree(percent, from) {
                    return (from * percent) / 100;
                }
            }]
    });
})();