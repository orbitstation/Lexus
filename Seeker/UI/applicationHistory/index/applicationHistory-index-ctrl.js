(function () {

    "use strict";
    angular.module('miniSPA').controller('applicationHistoryIndexCtrl', ['$scope', '$rootScope','applicationHistory', 'productVariables', '$log', 'BrowserDetect', '$timeout', '$window', 'authentication', '$interpolate', controller]);

    function controller($scope, $rootScope, applicationHistory, productVariables, $log, BrowserDetect, $timeout, $window, authentication, $interpolate) {

        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  
        $scope.meta.breadCrumbsExtended = $scope.meta.breaCrumbsAppHistory;

        $scope.data = {};
        $scope.data.totalItemsCount = -1;
        $scope.pagination = {};
        $scope.pagination.currentPage = 0;
        $scope.pagination.pageSize = 5;
        $scope.pagination.visiblePages = 3;
        $scope.pagination.maxVisiblePages = 5;
        $scope.pagination.showFirstLast = true;
        $scope.pagination.counter = "";


        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(
            function () {
                getData($scope.pagination.currentPage, $scope.pagination.pageSize);
            }
        );

        function getData(currentPage, pageSize) {
            $scope.data.items = [];
            $scope.data.totalItemsCount = 0;

            applicationHistory.get({ page: currentPage + 1, pageSize: pageSize }, {}).$promise.then(
                function (result) {
                    $scope.data = result;         
                    setPaginator();
                    $rootScope.isLoaded = true;
                }
            );
        }        


        //                                                                               ________________________
        // _____________________________________________________________________________/       Pagination       \_____
        // 
        // 
        $scope.$watch(function getCurrentPage() { return $scope.pagination.currentPage; }, function (newVal, oldVal) {
            if (newVal !== oldVal) {
                getData($scope.pagination.currentPage, $scope.pagination.pageSize);
            }
        });

        function setPaginator() {
            var pagesCount = getPagesCount($scope.data.totalItemsCount, $scope.pagination.pageSize);
            $scope.pagination.counter = getPaginationCounterText();
            $scope.pagination.visiblePages = getNumOfVisiblePages(pagesCount, $scope.pagination.maxVisiblePages);
            $scope.pagination.showFirstLast = getShowFirstLast(pagesCount, $scope.pagination.maxVisiblePages);
            $scope.pagination.counter = getParsedText($scope.pagination.counter);
        }

        function getParsedText(text) {
            return $interpolate(text)($scope);
        }

        function getPaginationCounterText() {
            var paginationCounterText;
            paginationCounterText = $rootScope.meta.messages[350266].lookUpMsg.value;
            paginationCounterText = paginationCounterText.replace("{0}", "{{data.totalItemsCount}}");
            return paginationCounterText;
        }

        function getPagesCount(totalItemsCount, pageSize) {
            return Math.ceil(totalItemsCount / pageSize);
        }

        function getNumOfVisiblePages(pagesCount, maxVisiblePages) {
            return pagesCount <= maxVisiblePages ? pagesCount : maxVisiblePages;
        }

        function getShowFirstLast(pagesCount, maxVisiblePages) {
            return pagesCount > maxVisiblePages ? true : false;
        }

    }

})();
