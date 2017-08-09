(function () {
    'use strict';
    angular.module('globalApp').directive('ocsButton', ['$timeout', '$parse', '$rootScope', 'templateUrlService', directiveFunction]);

    function directiveFunction($timeout, $parse, $rootScope, templateUrlService) {
        return {
            restrict: 'E',
            scope: {
                meta: "=",
                validation: "=",
                isBusy: "=?",
            },
            replace: true,
            templateUrl: templateUrlService.get('ocs-Button.html'),
            link: link
        };

        function link(scope, element, attrs) {
            var options = $parse(attrs['options'])(scope);
            var spinner = " <i class='fa fa-spinner fa-spin'></i>";
            var timer;

            scope.id = attrs.id;

            if (scope.isBusy !== undefined) {
                scope.isBusy = false;
            }

            if (options) {
                if (options.type === 'submit') {
                    element.attr('type', 'submit');
                }
                //to add clases from options
                element.addClass(options.classes);
            }

            //once async function resolves we update model isBusy
            scope.$watch(
                function () {
                    return scope.isBusy;
                },
                function handleAsync(newValue, oldValue) {
                    if (!angular.equals(newValue, oldValue) && scope.isBusy !== true) {
                        scope.isBusy = newValue;
                        element.find('i').remove();
                        $timeout.cancel(timer);      // cancels the button's on click timer
                    }
                });

            element.on('click', function (e) {       // creates timeout for fast responses to prevent flickering caused by the spinner element
                if(scope.meta.isBusy == false){      // prevents multiple clicks
                timer = $timeout(function () {
                    element.append(spinner);     // adds a spinner to the button
                }, 500);
                scope.$apply(function () {
                    scope.isBusy = true;
                });
                }
            });
        }
    };

})();

