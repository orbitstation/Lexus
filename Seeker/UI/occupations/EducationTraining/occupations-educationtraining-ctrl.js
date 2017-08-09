(function () {
    "use strict";
    angular.module('miniSPA').controller('educationtrainingctrl', ['$scope', '$rootScope', 'productVariables', '$log', '$timeout', '$window', '$routeParams', 'schoolLookupFactory', 'schoolsFactory', controller]);

    function controller($scope, $rootScope, productVariables, $log, $timeout, $window, $routeParams, schoolLookupFactory, schoolsFactory) {

        $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsEduPage;
        
        $scope.meta.pageLoaded = false;

        var occupationCode = $routeParams.code;
        $scope.schools = [];
        $scope.savedSchools = [];
        $scope.schoolsLoaded = false;
        $scope.useAllStates = true;
        $scope.model = {};
        $scope.model.selectedState = 'TX';

        $rootScope.$on('login_success', function () {
            init();
        });

        function init() {
            $rootScope.isAuthenticated && getSavedSchools();
            schoolLookupFactory.getSchools({ occupationCode: occupationCode }).$promise.then(
                function (result) {
                    $scope.schools = result.schoolModelList;
                    $scope.useAllStates = result.useAllStates;
                    $scope.schoolsLoaded = true;
                    $scope.meta.pageLoaded = true;
                }
            );
        }

        function getSavedSchools() {
            schoolsFactory.get().$promise.then(function (results) {
                $scope.savedSchools = results;
                $scope.savedSchoolsCount = results.length;
                $scope.maxSavedSchoolsCount = 10;
            });
        }

        $scope.save = function (schoolId, program) {
            var data = { occupationCode: occupationCode, schoolId: schoolId, programId: program.programId };
            schoolsFactory.save({}, data, function () {
                program.isSaved = true;
                init();
            });
        };

        $scope.stateFilter = function (data) {
            if (data.state === $scope.model.selectedState) {
                return true;
            } else if ($scope.model.selectedState === 'Show All') {
                return true;
            } else {
                return false;
            }
        };

        init();
    }
})();