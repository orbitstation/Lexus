(function () {
    "use strict";
    angular.module('miniSPA').run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
        var original = $location.path;
        $location.path = function (path, reload) {
            if (reload === false) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                    $route.current = lastRoute;
                    un();
                });
            }
            return original.apply($location, [path]);
        };
    }]);
    angular.module('miniSPA').controller('occupationsSearchCtrl', ['$scope', '$rootScope', '$log', 'utilityService', '$timeout', '$location', 'occupationsFactory', 'getOccupationByIndustryCode', 'compareOccupationsPersistor', '_', controller]);

    function controller($scope, $rootScope, $log, utilityService, $timeout, $location, occupationsFactory, getOccupationByIndustryCode, compareOccupationsPersistor, _) {

        $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsResultsPage;
        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages);

        $scope.pageSize = 20;
        $scope.currentPage = 0;
        $scope.items = [];
        $scope.industryName = "";
        $scope.label = "";
        $scope.$watch("meta.messages['347200'].lookUpMsg.value", labelRefresh);
        $scope.$watch("meta.messages['347201'].lookUpMsg.value", labelRefresh);
        $scope.$watch("meta.messages['347202'].lookUpMsg.value", labelRefresh);
        $scope.$watch("meta.messages['368362'].lookUpMsg.value", labelRefresh);
        $scope.$watch("meta.military.items.length", labelRefresh);
        $scope.$watch("items.length", labelRefresh);
        $rootScope.meta.occupationSearchResults.compareButton.disabled = true;
        $scope.sortOrder = {
            filter: null
        };
        $scope.selected = compareOccupationsPersistor.selected;

        $scope.$watch('sortOrder.filter', function (newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
                var search = $location.search();
                search.sortOrder = newValue;
                $location.search(search);
                init();
            }
        });

        $scope.$watch('currentPage', function (n) {
            if (_.isNumber(n)) {
                var search = $location.search();
                search.page = parseInt(n) + 1;
                $location.search(search);
                init();
            }
        });

        $scope.remove = function (code) {
            var i;
            var item;
            for(i = 0; i < $scope.items.length; i++)
            {
                item = $scope.items[i];
                if (item.code === code)
                {
                    item.checked = false;
                }
            }
        };

        $scope.change = function () {
            for(var i = 0; i < $scope.items.length; i++)
            {
                var item = $scope.items[i];
                var index = -1;
                for (var j = 0; j < compareOccupationsPersistor.selected.length; j++) {
                    if (compareOccupationsPersistor.selected[j].code === item.code)
                    {
                        index = j;
                        break;
                    }
                }
                if (item.checked && index === -1) {
                    compareOccupationsPersistor.add({ code: item.code, title: item.title });
                }
                if (!item.checked && index >= 0) {
                    compareOccupationsPersistor.remove(item.code);
                }
            }
        };

        function labelRefresh() {
            var search = $location.search();
            if (search.industry) {
                $scope.label = $rootScope.meta.messages['347200'].lookUpMsg.value.format($scope.items.length, $scope.industryName);
                return;
            }
            if (search.branch && search.keyword) {
                if ($rootScope.meta.military.items)
                {
                    for(var i = 0; i < $rootScope.meta.military.items.length; i++)
                    {
                        if ($rootScope.meta.military.items[i].value === search.branch)
                        {
                            var branchName = $rootScope.meta.military.items[i].text;
                            if ($scope.items.length === 0) {
                                $scope.label = $rootScope.meta.messages['347201'].lookUpMsg.value.format(search.keyword, branchName);
                            }
                            else {
                                $scope.label = $rootScope.meta.messages['347202'].lookUpMsg.value.format($scope.items.length, search.keyword, branchName);
                            }
                            break;
                        }
                    }
                }
                return;
            }

            if (search.keyword)
            {
                $scope.label = $rootScope.meta.messages['347200'].lookUpMsg.value.format($scope.items.length, search.keyword);
                return;
            }

            if (search.area)
            {
                $scope.label = $rootScope.meta.messages['368362'].lookUpMsg.value.format($scope.items.length, search.area);
            }
        }

        function process(data) {
            for (var i = 0; i < data.length; i++) {
                var value = data[i];
                value.url = '/occupations/career-detail/' + utilityService.tokenize(value.title) + "-id-" + value.code;
                value.checked = false;
                value.range = '';
                if (value.annualWageLowEnd && value.annualWageHighEnd) {
                    value.range = value.annualWageLowEnd.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }) +
                     ' - ' +
                     value.annualWageHighEnd.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
                }
                for (var j = 0; j < compareOccupationsPersistor.selected.length; j++)
                {
                    if (value.code === compareOccupationsPersistor.selected[j].code)
                    {
                        value.checked = true;
                        break;
                    }
                }
            }
            return data;
        }

        $scope.setPage = function (page) {
            $scope.currentPage = page;
        }

        function init() {
            $scope.items = [];

            var search = $location.search();
            $scope.sortOrder.filter = search.sortOrder;
            $scope.currentPage = (function getPage() {
                var number = 0;
                if (search.page) {
                    var proto = parseInt(search.page);
                    if (_.isNumber(proto)) {
                        number = proto - 1;
                    }
                }
                return number;
            })();

            var resourceUrl;
            if (search.industry) {
                $scope.isLoaded = false;
                $scope.done = {
                    data: false,
                    lookup: false
                };

                getOccupationByIndustryCode.get({ industryCode: search.industry, sortOrder: search.sortOrder }).$promise
                .then(function (data) {
                    $scope.items = process(data);
                    $scope.done.data = true;
                    if ($scope.done.lookup) {
                        $scope.isLoaded = true;
                    }
                    labelRefresh();
                });
                occupationsFactory.getByIndustry({ industry: search.industry }).$promise
                .then(function (data) {
                    $scope.industryName = data.text;
                    $scope.done.lookup = true;
                    if ($scope.done.data) {
                        $scope.isLoaded = true;
                    }
                    labelRefresh();
                });

                return;
            }

            if (search.branch && search.keyword) {
                $scope.isLoaded = false;
                occupationsFactory.getByMilitary({ keywords: search.keyword, branchCode: search.branch, sortOrder: search.sortOrder }).$promise.then(function (data) {
                    $scope.items = process(data);
                    $scope.isLoaded = true;
                    labelRefresh();
                });
                return;
            }

            if (search.keyword) {
                $scope.isLoaded = false;
                occupationsFactory.getByKeywords({ keywords: search.keyword, sortOrder: search.sortOrder }).$promise.then(function (data) {
                    $scope.items = process(data);
                    $scope.isLoaded = true;
                    labelRefresh();
                });
                return;
            }

            if (search.area) {
                $scope.isLoaded = false;
                occupationsFactory.getByArea({ area: search.area, sortOrder: search.sortOrder }).$promise.then(function (data) {
                    $scope.items = process(data);
                    $scope.isLoaded = true;
                    labelRefresh();
                });
                return;
            }
        }

        init();
    }
})();