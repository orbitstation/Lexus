(function ($) {
    'use strict';
    angular.module('globalApp').directive('ocsSpinner', ['$rootScope', '$parse', '$timeout', directiveFunction]);

    function directiveFunction($rootScope, $parse, $timeout) {
        return {
            scope: {
                isLoaded: "="
            },
            restrict: 'A',
            link: function (scope, element, attrs) {
                var timer;
                var spinner;
                var options = $parse(attrs.options)(scope);
                var initLoad = false;
                var templateSize = {};

                //default options
                var dOptions = {
                    top: '50%',
                    isOverlay: true,
                    minHeight: '200px'
                }
                //overwrite default options with passed in
                angular.merge(dOptions, options);

                //set DOM elements
                switch ($rootScope.configLayout.spinner) {
                    case 'dots':
                        spinner = $('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
                        templateSize.width = 70;
                        break;
                    case 'circle':
                        templateSize.width = 40;
                        spinner = $('<div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>');
                }
                var overlay = $("<div class='spinner-overlay'></div>");

                element.css({
                    'position': 'relative',
                    'min-height': dOptions.minHeight
                });

                var topCalc = 'calc(' + dOptions.top + ' - ' + (templateSize.height / 2) + 'px)';
                if (!templateSize.height) { topCalc = 50 };

                $(window).resize(function () {
                    spinner.css(recalculateDimentions());
                });

                if (!initLoad) {
                    initLoad = true;
                    spinner.css(recalculateDimentions());

                    if (dOptions.isOverlay) {
                        overlay.prependTo(element);
                    }
                    spinner.prependTo(element);

                    scope.$watch(function () {
                        return scope.isLoaded;
                    }, watcher);
                }

                function recalculateDimentions(){
                    templateSize.height = spinner.height();
                    var windowHeight = $(window).height()
                    var windowWidth = element.outerWidth();
                    var leftOffSet = ((windowWidth / 2) - (templateSize.width / 2));
                    if (leftOffSet < 0){leftOffSet = '45%'}
                    return { 'top': topCalc, 'left': leftOffSet };
                }

                function watcher(newVal) {
                    if (newVal === false) {
                        recalculateDimentions();
                        spinner.addClass('fade-in');
                        overlay.addClass('fade-in');

                    } else {
                        overlay.removeClass('fade-in');
                        spinner.removeClass('fade-in');
                    }
                }
            }
        };
    };

})(jQuery);
