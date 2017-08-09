(function () {
    'use strict';
    var directiveId = 'ocsMsg';
    angular.module('globalApp').directive(directiveId, ['$parse', '$rootScope', '$log', directiveFunction]);
    
    function directiveFunction($parse, $rootScope, $log) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var value = String($parse(attrs[directiveId])(scope));
                //to get list of IDS
                var msgArr = [];
                angular.forEach(value.split(","), function (value) {
                    msgArr.push(Number(value));
                });
            }
        };
    };

})();
