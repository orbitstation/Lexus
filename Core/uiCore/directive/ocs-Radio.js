(function () {
    'use strict';
    globalApp.directive("ocsRadio", ['$rootScope', 'templateUrlService', directiveFunction]);

    function directiveFunction($rootScope, templateUrlService) {
        return {
            restrict: "E",
            scope: {
                meta: "=",
                model: "="
            },
            templateUrl: templateUrlService.get('ocs-Radio.html'),
            replace: true,
            link: function (scope) {
                if ($rootScope.IdCounter === undefined) { $rootScope.IdCounter = 0; }
                scope.elementID = "elem_" + $rootScope.IdCounter++;
                scope.elementLegendID = "elem_" + $rootScope.IdCounter++;

                //if (scope.meta.defaultSelected) {
                //    scope.model = scope.meta.defaultSelected;
                //}

            }
        };

    };

})();
