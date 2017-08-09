(function ($) {
    'use strict'
    angular.module('globalApp').directive('ocsBindToButton', ['$timeout', directiveFunction]);

    function directiveFunction($timeout) {
        return {
            restrict: 'A',
            scope: {
                list: '@',
                validation: '=',
                trigger: '@'
            },
            link: link
        }

        function link(scope, elem, attr) {

            $timeout(bindInputs, 500);

            function bindTo(elem, button) {
                elem.on('keypress', function (e) {
                    if (event.keyCode === 13 && (scope.validation.$valid === true || scope.validation === undefined)) {
                        button.click();
                    }
                });
            }

            function bindInputs() {
                var bind = (scope.list) ? elem.find(scope.list) : elem.find('input');
                var trigger = elem.find(scope.trigger);
                for (var i = 0, length = bind.length; i < length; i += 1) {
                    bindTo(bind.eq(i), trigger);
                }
            }
        }
    }

})(jQuery);
