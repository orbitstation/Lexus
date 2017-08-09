(function () {
    "use strict";
    angular.module('globalApp').directive("ocsBreadCrumbs", ['templateUrlService', directiveFunction]);

    function directiveFunction(templateUrlService) {
        return {
            restrict: "E",
            scope: {
                meta: "=",
            },
            templateUrl: templateUrlService.get('ocs-BreadCrumbs.html'),
            //replace: true,
            transclude: false,
            link: function (scope, element, attrs) {
            }
        };
    };

})();
