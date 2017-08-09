(function (angular) {
    'use strict';
    angular.module('globalApp').directive("ocsAlert", ['$rootScope', 'templateUrlService', directiveFunction]);

    function directiveFunction($rootScope, templateUrlService) {
        return {
            restrict: "E",
            scope: {
                meta: "=",
            },
            templateUrl: templateUrlService.get('ocs-Alert.html'),
            controller: ['$rootScope', '$scope', function ($rootScope, $scope) {
                $scope.impersonationAlert = '';
                $rootScope.$watch("impersonation.emailAddress", function () { updateImpersonationAlert($scope); });
                $rootScope.$watch("meta.alerts.impersonation.lookUpMsg.value", function () { updateImpersonationAlert($scope); });
            }]
        };

        function updateImpersonationAlert($scope)
        {
            var format = $rootScope.meta.alerts.impersonation.lookUpMsg.value;
            var email = null;
            if ($rootScope.impersonation)
            {
                email = $rootScope.impersonation.emailAddress;
            }
            if (format) {
                $scope.impersonationAlert = format.format(email);
            }
        }

    };

})(angular);
