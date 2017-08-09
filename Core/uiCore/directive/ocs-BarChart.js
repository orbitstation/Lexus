(function () {
    'use strict';
    angular.module('globalApp').directive('ocsBarChart', ['$parse', '$rootScope', '$timeout', 'templateUrlService', directiveFunction]);

    function directiveFunction($parse, $rootScope, $timeout, templateUrlService) {
        return {
            restrict: 'E',
            templateUrl: templateUrlService.get('ocs-BarChart.html'),
            scope: {
                settings: '=',
            },
            link: function (scope, element, attrs) {
                scope.openAccordion = function (tab) {
                    // Load-bearing settimeout. if you it it without it,
                    // it tries to do another apply before the first one finishes
                    $timeout(function () {
                        $('[heading^="' + tab + '"] a').click();
                    });
                }

                scope.$on("barsRendered", function () {
                    var $bars = element.find('.progress-bar');
                    var counter = 0;
                    angular.forEach($bars, function (elem) {
                        $(elem).width(scope.settings[counter].value +'%');
                        counter++;
                    });
                });
                
            }
        };
    };

})();
