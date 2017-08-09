(function () {
    "use strict";
    angular.module('miniSPA').controller('schoolsIndexCtrl', ['$scope', '$rootScope', '$location', 'schoolsFactory', '$uibModal', '_', controller]);
    function controller($scope, $rootScope, $location, schoolsFactory, $uibModal, _) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  
        $scope.schools = [];
        $scope.schoolsCount = 0;
        $scope.maxSchoolsCount = 10;
        $scope.modelTemp = [];
        $scope.selectedCode = [];

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        getSchools();
        $rootScope.$on('login_success', function () {
            getSchools();
        });

        function getSchools() {
            if ($rootScope.isAuthenticated) {
                schoolsFactory.get().$promise.then(function (results) {
                    $scope.schools = results;
                    $scope.schoolsCount = results.length;
                    $scope.maxSchoolsCount = 10;
                });
            }
        }

        //                                                                               ________________________
        // _____________________________________________________________________________/    Misc. Functions     \_____
        // 
        $scope.delete = function (schoolId, programId) {
            openModal(function () {
                var data = { schoolId: schoolId, programId: programId };
                schoolsFactory.delete({}, data, function () {
                    var removeObj = _.find($scope.schools, data);
                    _.remove($scope.schools, removeObj);
                    $scope.schoolsCount = $scope.schools.length;
                });
            });
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