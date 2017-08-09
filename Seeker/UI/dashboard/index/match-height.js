(function (angular) {
    "use strict";
    angular.module('globalApp').directive('matchHeight', ['screenSize', directive]);
    function directive(screenSize) {
        return {
            link: link
        };

        function link(scope, elem, attrs) {
            var defaults = {
                breakOn: attrs.breakOn || 'xs',
                resizeOn: attrs.resizeOn || 'sm,md,lg'
            };

            if (!screenSize.is(defaults.breakOn)) {
                resize();
            }

            screenSize.on(defaults.resizeOn, function (isMatch) {
                if (isMatch) {
                    resize();
                } else {
                    elem.css('height', 'auto');
                }
            });

            function resize() {
                elem.height(($(attrs.matchHeight).innerHeight() - attrs.removeSpace));
            }
        }
    }
})(angular);