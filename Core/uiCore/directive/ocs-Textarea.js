(function () {
    "use strict";
    globalApp.directive("ocsTextarea", ['$rootScope', '$log', '$parse', 'templateUrlService', directiveFunction]);

    function directiveFunction($rootScope, $log, $parse, templateUrlService) {
        return {
            restrict: "E",
            scope: {
                meta: "=",
                model: "=",
                match: "@"
            },

            templateUrl: templateUrlService.get('ocs-Textarea.html'),

            replace: true,
            transclude: false,
            link: function (scope, element, attrs) {
                // this incriments the global counter and creates a new uneque ID
                if ($rootScope.IdCounter === undefined) { $rootScope.IdCounter = 0; }
                scope.elementId = "elem_" + $rootScope.IdCounter++;


                //allows to resize the form
                scope.formSize = attrs.formSize;

                // look up mask name and resolve, if not found then pass value as is
                //temp = $rootScope.productVariables.standardMask[scope.meta.mask];
                //if (temp == undefined) { scope.mask = scope.meta.mask; } else { scope.mask = temp; }

                // allows training sapce char on passwords
                if (scope.meta) {
                    if (scope.meta.type === "password") { scope.trim = false; }
                }

                if (attrs.options !== undefined) {
                    var options = $parse(attrs.options)(scope);
                    element.find('textarea').attr('rows', options.rows);
                }
            }
        };

    };

})();
