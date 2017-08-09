(function () {
    "use strict";
    angular.module('miniSPA').controller('occupationsSavedCtrl', ['$scope', '$rootScope', '$location', '$window', 'savedOccupationsFactory', '$uibModal', 'utilityService', '_', controller]);
    function controller($scope, $rootScope, $location, $window, savedOccupationsFactory, $uibModal, utilityService, _) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init page variables  \_____
        //

        $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsSavedPage;

        $scope.modelTemp = [];
        $scope.selectedCode = [];
        $scope.occupations = [];
        $scope.occupationsCount = 0;
        $scope.maxOccupationsCount = 0;


        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in data   \_____
        //  get the user's data if logged in
        getOccupations();
        $rootScope.$on('login_success', function () {
            getOccupations();
        })

        function getOccupations() {
            if ($rootScope.isAuthenticated) {
                return savedOccupationsFactory.get().$promise.then(function (results) {
                    $scope.occupations = results;
                    $scope.occupationsCount = results.length;
                    $scope.maxOccupationsCount = 10;
                }); 
            }
        }

        //                                                                               ________________________
        // _____________________________________________________________________________/     Misc. Functions    \_____




        $scope.tokenize = function (token) {
            return utilityService.tokenize(token);
        };

        $scope.countSelected = function (c) {
            if (c) {
                var limit = 2;
                var x;
                var count = 0;
                for (x in c) {
                    if (c[x] === true) { count++; }
                }
                if (limit <= count) {
                    return true;
                }
            }
            return false;
        };

        $scope.delete = function (code) {
            openModal(function () {
                var data = { code: code };
                savedOccupationsFactory.delete({}, data, function () {
                    var removeObj = _.find($scope.occupations, data);
                    _.remove($scope.occupations, removeObj);
                    $scope.occupationsCount = $scope.occupations.length;
                });
            });
        };

        $scope.compare = function () {
            var compareUrl = '/occupations/compare';
            for (var i = 0; i < $scope.selectedCode.length; i++) {
                compareUrl = compareUrl + '/' + $scope.selectedCode[i];
            }
            $window.location.href = compareUrl;
        };

        $scope.toggleSelection = function (code) {
            var idx = $scope.selectedCode.indexOf(code);
            if (idx > -1) {
                $scope.selectedCode.splice(idx, 1);
            }
            else {
                $scope.selectedCode.push(code);
            }
        };

        function openModal(onSuccess) {
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl'
            });

            modalInstance.result.then(function () {
                onSuccess();
            });
        };

    }
})();