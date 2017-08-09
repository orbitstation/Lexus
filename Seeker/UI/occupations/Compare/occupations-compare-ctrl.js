(function () {
    "use strict";
    angular.module('miniSPA').controller('occupationsCompareCtrl', ['$scope', '$rootScope', '$log', '$timeout', '$routeParams', 'compareOccupations', 'searchQueryPersistor', controller]);

    function controller($scope, $rootScope, $log, $timeout, $routeParams, compareOccupations, searchQueryPersistor) {

        $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsComparePage;
        $scope.tableLoaded = false;
        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages);

        var code1 = $routeParams.code1;
        var code2 = $routeParams.code2;
        $scope.code1 = code1;
        $scope.code2 = code2;

        function init() {
            var backUrl = searchQueryPersistor.get();
            backUrl && ($scope.returnUrl = backUrl);
            
            var data = { code1: $scope.code1, code2: $scope.code2 };
            compareOccupations.get(data).$promise.then(function (results) {
                //console.log(results);
                $scope.compareData = results;
                $rootScope.track({ name: 'occupationSearch', tag: 'event12' });
                getHeights();
                $scope.tableLoaded = true;
            });
        }

        init();

        function getHeights() {
            $timeout(function () {
                var temp = {};
                for (var i = 0; i < 2; i++) {
                    var leftRowHeight = document.getElementById('left-row-' + i).offsetHeight;
                    var rightRowHeight = document.getElementById('right-row-' + i).offsetHeight;
                    (leftRowHeight > rightRowHeight) && (temp['right' + i] = leftRowHeight.toString() + 'px');
                    (leftRowHeight < rightRowHeight) && (temp['left' + i] = rightRowHeight.toString() + 'px');
                }
                $scope.heights = angular.copy(temp);
            });
        }
        
    }
})();