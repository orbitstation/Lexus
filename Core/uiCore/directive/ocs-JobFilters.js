(function () {
    angular.module('globalApp').directive('ocsJobFilters', jobFilters);

    jobFilters.$inject = ['templateUrlService', '$parse', '$rootScope', 'utilityService', 'screenSize'];

    function jobFilters(templateUrlService, $parse, $rootScope, utilityService, screenSize) {
        var innerHtml = '.filters-content';
        return {
            scope: true,
            restrict: "E",
            templateUrl: templateUrlService.get('ocs-JobFilters.html'),
            link: function (scope, element, attrs) {
                if (attrs.freezeScreen) {
                    var $content = $(element).find(innerHtml);
                    var $html = $('html');
                    var $navbar = $('.main-header');
                    var $fixedParent;
                    var $mobileFilterHeader;
                    var $mainContent = $('#main-content');


                    if (screenSize.is('xs')) {
                        repositionFilters(true);
                    } else {
                        repositionFilters();
                    }
                    
                    $rootScope.$on('$locationChangeSuccess', function () {
                        utilityService.scrollTop($content);
                    });

                    closedStyles();

                    screenSize.when('lg, md, sm', function () {
                        closedStyles();
                        utilityService.removeInlineStyle($mainContent);
                    });

                    screenSize.when('xs', function () {
                        repositionFilters(true);
                    });

                    scope.$watch(function () { return $parse(attrs.freezeScreen)(scope); }, function (n, o) {
                        if (n === true) {
                            openStyles();
                        }
                        else {
                            closedStyles();
                        }
                    });

                    function repositionFilters(repositionContent) {
                        if (attrs.makeFixed) {
                            $fixedParent = $(attrs.makeFixed);
                            $fixedParent.css('top', $navbar.outerHeight());
                            if (repositionContent) {
                                $mobileFilterHeader = $fixedParent.find('.mobile-filters-header');
                                $mainContent.css('paddingTop', $mobileFilterHeader.outerHeight() + 15); //15px padding for mobile view
                            } else {
                                utilityService.removeInlineStyle($mainContent);
                            }
                        }
                    }

                    function closedStyles() {
                        $content.css({
                            'height': '0',
                            'overflow': 'hidden',
                            'transition': '0.35s height ease-out',
                            '-webkit-overflow-scrolling': 'auto'
                        });
                        $html.css('overflow', 'auto');
                    }

                    function openStyles() {
                        $content.css({
                            'height': 'calc(100vh - (' + utilityService.getElemPositionFromTop(element) + 'px))',
                            'overflow-y': 'scroll',
                            '-webkit-overflow-scrolling': 'touch'
                        });
                        $html.css('overflow', 'hidden');
                    }
                }
            }
        }
    }
})();