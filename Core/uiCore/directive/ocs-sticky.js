(function () {
    angular.module('globalApp').directive('ocsSticky',
        ['$timeout', sticky]);

    function sticky($timeout) {
        return {
            link: link,
            scope: {
                update: "=",
                slideInside: "@"
            }
        }

        function link(scope, elem, attr) {
            $timeout(sticky, 1000); 

            function sticky() {
                angular.element(document).ready(function () {
                    elem.wrap('<div class="wrap"></div>'); // wrap it up
                    var inclosure = $(scope.slideInside);

                    $('<div class="sticky-stop"></div>').insertAfter(inclosure);// stop it!

                    var wrap = elem.parent();
                    var parent = wrap.parent();
                    parent.css({ 'position': 'static' });
                    var sidebarheight, mainheight;
                    var topOffset = attr.offset;
                    var cushion = 0; // cushion for spapping to the bottom 

                    function measureheight() {
                        wrap.css({ 'width': parent.width() });
                        sidebarheight = elem.outerHeight() + cushion;
                        mainheight = inclosure.outerHeight();
                        if (mainheight - sidebarheight > 0) {
                            inclosure.waypoint(function (direction) {
                                $(this).toggleClass('sticky', direction === 'down');
                            });
                            $('.sticky-stop').waypoint(function (direction) {
                                inclosure.toggleClass('at-bottom', direction === 'down');
                            }, {
                                offset: function () {
                                    return sidebarheight;
                                }
                            })
                        } else {
                            $().waypoint('destroy');
                        }
                    };

                    measureheight();

                    //used for inclosure height change.
                    scope.$watch('update', function (newVal, oldVal) {
                        if (newVal !== oldVal) {
                            $timeout(measureheight, 10);
                        }
                    });
                    $(window).resize(measureheight);
                });
            }
        }
    }
})();