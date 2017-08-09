(function () {
    "use strict";
    angular.module('miniSPA').controller('aboutUsIndexCtrl', ['$scope', '$http', '$rootScope', controller]);

    function controller($scope, $http, $rootScope) {
        $scope.test = 1;

        $scope.dropBass = function () {
            $http.get('/seeker/api/me/drop')
                .success(function (response) {
                    $scope.sound = response;
                });
        };

        $scope.click = function () {
            $rootScope.confirmPageRedirect = !$rootScope.confirmPageRedirect;
        };
    }


})();