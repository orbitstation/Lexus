(function () {
    "use strict";
    angular.module('miniSPA').directive('eventsRow', function () {
        return {
            templateUrl: '/UI/events/index/events-row.html',
            scope: {
                meta: "=",
                item: "="
            },
            link: function (scope, el, attrs) {
            },
            controller: ['$scope', controller],
            restrict: 'E'
        };

        function controller($scope)
        {
            $scope.toggle = function () {
                $scope.item.expanded = !$scope.item.expanded;
            };
        }
    });
    angular.module('miniSPA').controller('eventsIndexCtrl', ['$scope', '$rootScope', 'events', controller]);
    function controller($scope, $rootScope, events) {

        $scope.selectedSortOrderFilter = 'StartDate:true';
        $scope.selectedDateFilter = 30;
        $scope.events = {
            items: [],
            totalItemsCount: 0,
            pageNumber: 0,
            isBusy: false
        };
        $scope.pageSize = 10;
        $scope.filter = {
            advancedFilterOpened: false,
            eventType: "1",
            keyWord: "",
            regions: [],
            regionsLabels: [],
            datesLabel: "",
            defaultDateFilter: 30
        };
                
        var refreshScope = {
            FullRefresh: 1,
            pagingRefresh: 2
        };

        $scope.$watch('events.pageNumber', function (newValue, oldValue) {
            if (oldValue !== newValue && !$scope.events.isBusy) {
                refresh(refreshScope.pagingRefresh);
            }
        });

        $scope.$watch('selectedSortOrderFilter', function (newValue, oldValue) {
            if (oldValue !== newValue) {
                refresh();
            }
        });

        $scope.$watch('selectedDateFilter', function (newValue, oldValue) {
            if (oldValue !== newValue) {
                refresh();
            }
        });

        $scope.$watch('filter.regions', function (newValue, oldValue) {
            if (oldValue !== newValue) {
                //processRegions();
            }
        }, true);

        $scope.advancedFilterToggle = function () {
            $scope.filter.advancedFilterOpened = !$scope.filter.advancedFilterOpened;
        }

        $scope.doFilterClear = function () {
            $scope.filter.keyWord = "";
            $scope.selectedDateFilter = $scope.filter.defaultDateFilter;
            clearFilterRegions();
            refresh();
        }

        $scope.doSearch = doSearch;

        function clearFilterRegions() {
            /*
            $(".filter-regions input[type=checkbox]").each(function (i) {
                $(this).prop("checked", false);
            });
            */
            $scope.filter.regions = [];
        }

        function process(items) {
            angular.forEach(items, function (i) {
                i.expanded = false;
                var start = new Date(i.start);
                var end = new Date(i.end);
                if (start.getYear() === end.getYear() && start.getMonth() === end.getMonth() && start.getDate() === end.getDate())
                {
                    i.friendlyDate = new moment(start).format("MM/DD/YYYY hh:mm a");
                    i.friendlyDate += " - " + new moment(end).format("hh:mm a");
                }
                else
                {
                    i.friendlyDate = new moment(start).format("MM/DD/YYYY hh:mm a");
                    i.friendlyDate = " - " + new moment(end).format("MM/DD/YYYY hh:mm a");
                }
            });
        }

        //function refreshBusy() {
        //    $rootScope.isLoaded = !$scope.events.isBusy;
        //}

        function refresh(scope) {
            if (typeof scope === "undefined") {
                scope = refreshScope.FullRefresh;
            }
            var includeTotalItemsCount = false;
            switch(scope) {
                case refreshScope.FullRefresh:
                    $scope.events.isBusy = true;
                    $scope.events.pageNumber = 0;
                    includeTotalItemsCount = true;
                    break;
                case refreshScope.pagingRefresh:
                    $scope.events.isBusy = true;
                    includeTotalItemsCount = true;
                    break;
            }
            switch ($scope.selectedDateFilter) {
                case 7:
                    $scope.filter.datesLabel = $rootScope.msg(367331);
                    break;
                case 30:
                    $scope.filter.datesLabel = $rootScope.msg(367330);
                    break;
                case 45:
                    $scope.filter.datesLabel = $rootScope.msg(367329);
                    break;
                default:
                    $scope.filter.datesLabel = $rootScope.msg(367330);
                    break;
            }
            //refreshBusy();
            var date = new Date();
            date.setDate(date.getDate() + $scope.selectedDateFilter);
            
            var parts = $scope.selectedSortOrderFilter.split(':');
            var selectedSortOrder = parts[0];
            var ascending = parts[1] === "true";
            var category = "";
            var keyWord = "";
            if ($scope.filter.keyWord) {
                keyWord = $scope.filter.keyWord;
            }
            category = $scope.filter.eventType;
            switch ($scope.filter.eventType) {
                case 1:
                    category = ""; //All
                    break;
                case 2:
                    category = "Workshop";
                    break;
                case 3:
                    category = "JobFair";
                    break;
                default:
                    category = ""; //All
            }
            events.query({
                sortOrder: selectedSortOrder,
                ascending: ascending,
                category: category,
                pageSize: $scope.pageSize,
                pageNumber: $scope.events.pageNumber,
                endDate: date.toISOString(),
                includeTotalItemsCount: includeTotalItemsCount,
                keyWord: keyWord
            }).$promise.then(function (data) {
                process(data.items);
                $scope.events.items = data.items;
                if (includeTotalItemsCount) {
                    $scope.events.totalItemsCount = data.totalItemsCount;
                }
                $scope.events.isBusy = false;
                //refreshBusy();
            });
        }

        function doSearch() {
            refresh();
        }

        function processRegions() {
            var regionsSelected = [];
            for (var i = 0; i < $scope.filter.regions.length; i++) {
                for (var j = 0; j < $scope.meta.regionsFilter.items.length; j++) {
                    if ($scope.filter.regions[i] == $scope.meta.regionsFilter.items[j].value) {
                        regionsSelected.push($scope.meta.regionsFilter.items[j].text.lookUpMsg.value);
                    }
                }
            }
            $scope.filter.regionsLabels = regionsSelected;
        }

        refresh();
    }
})();