(function (angular) {
    'use strict';
    angular.module('globalApp').directive('ocsHelp', ['$rootScope', 'templateUrlService', directiveFunction]);
   
    function directiveFunction ($rootScope, templateUrlService) {
        return {
            restrict: 'E',
            scope: {
                meta: '='
            },
            templateUrl: templateUrlService.get('ocs-Help.html'),
            link: function (scope) {
            }
        }
    }
})(angular);