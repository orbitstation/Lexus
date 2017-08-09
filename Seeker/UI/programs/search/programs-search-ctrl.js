(function () {
    "use strict";

    angular.module('miniSPA').controller('programsSearchCtrl', controller);

    controller.$inject = ['$scope', '$rootScope', '$log', 'utilityService', '$uibModal', 'trainingProgramsFactory', 'compareProgramsPersistor', 'filterRetainer'];
    function controller($scope, $rootScope, $log, utilityService, $uibModal, trainingProgramsFactory, compareProgramsPersistor, filterRetainer) {
        $scope.meta.breadCrumbsExtended = [];
        
        $scope.filter = {
            advancedFilterOpened: false,
            singleAdd: { programName: '' },
            collections: {
                providers: [],
                fundingSources: [],
                industries: [],
                certifications: [],
                schoolTypes: [],
                regions: [],
            }
        };

        $scope.activeFilters =  {};
        $scope.pageSize = $rootScope.configLayout.searchPageSize.lookUpConfig.value;

        var storage = {};
        var pristineFilter = angular.copy($scope.filter);

        $scope.$watch('filter.collections', function (newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
                for(var i in newValue) {
                    if (oldValue === undefined || oldValue[i] === undefined) {
                        manageFilter(newValue[i], i);
                    } else if (newValue[i].length !== oldValue[i].length) {
                        manageFilter(newValue[i], i);
                    }
                }
            }
        }, true);

        $scope.doAddToCollection = function (target) {
            var selector = $scope.filter.singleAdd[target];
            if (selector && ((typeof selector !== 'object' && selector.toString().length) || typeof selector === 'object')) {
                var model = $scope.activeFilters && $scope.activeFilters[target] !== undefined && target !== 'programName' ? angular.copy($scope.activeFilters[target]) : [];

                if (typeof selector === 'number') {
                    var meta = $scope.meta[target];
                    if (meta.max && selector.toString().length == meta.max) {
                        addToActiveFilter({ text: selector });
                    }
                }

                if (typeof selector === 'object' && selector.id) {
                    addToActiveFilter(selector);
                }

                if (typeof selector === 'string') {
                    addToActiveFilter({ text: selector });
                }

                function addToActiveFilter(input) {
                    model.push(input);
                    $scope.activeFilters[target] = angular.copy(model);
                    filterRetainer.manage(model, target);
                    target !== 'programName' && ($scope.filter.singleAdd[target] = '');
                }

                
            }
        };

        function manageFilter(newValue, name) {
            var temp = []
            angular.forEach(newValue, function (selectedItem) {
                angular.forEach($scope.meta[name].items, function (metaItem) {
                    if (metaItem.value === selectedItem) {
                        temp.push(metaItem);
                    }
                });
            });
            $scope.activeFilters[name] = angular.copy(temp);
            filterRetainer.manage(temp, name);
        }

        function setActiveFilters() {
            var filters = {
                cipCodes: [],
                providers: [],
                fundingSources: [],
                oNetCodes: [],
                industries: [],
                certifications: [],
                schoolTypes: [],
                regions: [],
                zipCodes: [],
                programName: []
            };

            if (Object.keys(filterRetainer.filter).length > 0) {
                filters = angular.copy(reloadRetainedSearch(filters));
                $scope.filter.advancedFilterOpened = true;
            }
            $scope.activeFilters = angular.copy(filters);
        }

        function reloadRetainedSearch(filters) {
            var activeFilters = angular.copy(filters);
            var retainedFilterCollection = filterRetainer.filter;

            for (var i in Object.keys(retainedFilterCollection)) {
                var name = Object.keys(retainedFilterCollection)[i];
                if ($scope.filter.collections[name]) {
                    var temp = [];
                    for (var x in retainedFilterCollection[name]) {
                        temp.push(retainedFilterCollection[name][x].value);
                    }
                    $scope.filter.collections[name] = angular.copy(temp);
                }
                activeFilters[name] = angular.copy(retainedFilterCollection[name]);
            }

            return activeFilters;
        }

        $scope.$watch('filter.advancedFilterOpened', function (newVal, oldVal) {
            if (newVal !== undefined) 
            {
                if (newVal) {
                    $scope.updateHeight = false;
                } else {
                    $scope.updateHeight = true;
                }
            }
        });

        $scope.removeFromActiveFilter = function (key, value, index) {
            if (value !== undefined) {
                var model = angular.copy($scope.filter.collections[key]);
                for (var i in model) {
                    if (model[i] === value) {
                        model.splice(i, 1);
                    }
                }
                $scope.filter.collections[key] = angular.copy(model);
            } else {
                $scope.activeFilters[key].splice(index, 1);
                filterRetainer.manage($scope.activeFilters[key], key);
            }
        };

        function setFilter(filterData) {
            var temp = [];
            for (var i = 0; i < filterData.length; i++) {
                var item = filterData[i];
                if (item.value !== null) {
                    temp.push(item);
                }
            }
            return temp;
        }

        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages);
        
        $scope.items = [];

        $rootScope.meta.programSearchResults.compareButton.disabled = true;

        $scope.selected = compareProgramsPersistor.selected;

        $scope.remove = function (code) {
            var i;
            var item;
            for(i = 0; i < $scope.items.length; i++)
            {
                item = $scope.items[i];
                if (item.id === code)
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
                for (var j = 0; j < compareProgramsPersistor.selected.length; j++) {
                    if (compareProgramsPersistor.selected[j].code === item.id)
                    {
                        index = j;
                        break;
                    }
                }
                if (item.checked && index === -1) {
                    compareProgramsPersistor.add({ code: item.id, title: item.name });
                }
                if (!item.checked && index >= 0) {
                    compareProgramsPersistor.remove(item.id);
                }
            }
        };

        $scope.doFilterClear = function () {
            var tempCollection = angular.copy($scope.filter.collections);

            for (var i in tempCollection) {
                tempCollection[i].length > 0 && (tempCollection[i] = []);
            }

            $scope.filter.collections = angular.copy(tempCollection);

            var temp = angular.copy($scope.activeFilters);
            for (var i in temp) {
                temp[i].length !== 0 && (temp[i] = []);
            }

            $scope.activeFilters = angular.copy(temp);
            filterRetainer.remove();
        };

        function process(data) {
            for (var i = 0; i < data.length; i++) {
                var value = data[i];
                value.url = '/programs/program-detail/' + utilityService.tokenize(value.name) + "-id-" + value.id;
                value.checked = false;
               
                for (var j = 0; j < compareProgramsPersistor.selected.length; j++)
                {
                    if (value.id === compareProgramsPersistor.selected[j].code)
                    {
                        value.checked = true;
                        break;
                    }
                }
            }
            return data;
        }

        $rootScope.logInWatcher(function () {
            trainingProgramsFactory.getFilterLookups().$promise.then(function (data) {
                var filters = ['industries', 'schoolTypes', 'certifications', 'fundingSources', 'regions', 'providers'];
                for (var i in filters) {
                    var items = setFilter(data[filters[i]].items);
                    items.sort(function (a, b) { return a.text.localeCompare(b.text); });
                    $scope.meta[filters[i]].items = angular.copy(items);
                    pristineFilter[filters[i]] = angular.copy(items);
                }
                setActiveFilters();
            });
        });

        $scope.$watch('activeFilters', function (newValue, oldValue) {
            if (newValue && $rootScope.isAuthenticated && Object.keys(newValue).length !== 0) {
                doSearch();
            }
        }, true);

        $scope.advancedFilterToggle = function () {
            $scope.filter.advancedFilterOpened = !$scope.filter.advancedFilterOpened;
        };

        function doSearch() {
            var data = setFilters();
            trainingProgramsFactory.searchForPrograms(data).$promise.then(function (results) {
                $scope.items = results.programs && results.programs.length > 0 ? process(results.programs) : [];
                $scope.currentPage = (getPage(results.pages)) -1;
                $scope.totalNumberFound = results.totalNumberFound;
            });
        }

        function getPage(pages) {
            for (var i in pages) {
                if (pages[i].isActive) {
                    return pages[i].pageNumber;
                }
            }
        }

        $scope.setPage = function (pageNo) {
            $scope.pageChange = pageNo + 1;
            doSearch();
        };

        function setFilters() {
            var filters = {
                cipCodes: (function () { return getIds('cipCodes'); })(),
                providerIds: (function () { return getIds('providers'); })(),
                fundingSourceIds: (function () { return getIds('fundingSources'); })(),
                oNetCodes: (function () { return getIds('oNetCodes'); })(),
                industryIds: (function () { return getIds('indutries'); })(),
                certificationIds: (function () { return getIds('certifications'); })(),
                schoolTypeIds: (function () { return getIds('schoolTypes'); })(),
                regionIds: (function () { return getIds('regions'); })(),
                zipCodes: (function () { return getIds('zipCodes'); })(),
                pageIndex: (function () { return getNewPage(); })(),
                programName: (function () { return $scope.activeFilters['programName'][0] ? $scope.activeFilters['programName'][0].text : ''; })()
            }
            
            function getNewPage() {
                if (!$scope.pageChange && !$scope.currentPage) {
                    return 1;
                } else {
                    return $scope.pageChange;
                }
            }

            function getIds(type) {
                var ids = [];
               
                if ($scope.activeFilters[type] && $scope.activeFilters[type].length > 0) {
                    for (var i in $scope.activeFilters[type]) {
                        if ($scope.activeFilters[type][i].value) {
                            ids.push($scope.activeFilters[type][i].value);
                        } else if ($scope.activeFilters[type][i].id) { 
                            ids.push($scope.activeFilters[type][i].id);
                        } else {
                            ids.push($scope.activeFilters[type][i].text);
                        }
                    }
                }

                return ids;
            }
            return filters;
        }

        // -------------------------------------- Advanced filter watchers -------------------------------------------------

        $rootScope.$watch('meta.cipCodes.autoCompleteData', function (newValue, oldValue) {
            if (newValue) {
                if (newValue.length === 0 && typeof oldValue !== 'undefined') {
                    storage = angular.copy({ collection: oldValue, target: 'cipCodes' });
                }
            }
        });

        $rootScope.$watch('meta.occupationCode.autoCompleteData', function (newValue, oldValue) {
            if (newValue) {
                if (newValue.length === 0 && typeof oldValue !== 'undefined') {
                    storage = angular.copy({ collection: oldValue, target: 'oNetCodes' });
                }
            }
        });

        $scope.$watch('filter.singleAdd.cipCodes.text', function (newValue, oldValue) {
            if (newValue && oldValue !== undefined && storage.collection !== undefined) {
                function filter(item) {
                    if (item.text === newValue) {
                        return true;
                    }
                    return false;
                }

                var autoCompleteSelection = storage.collection.filter(filter);

                $scope.filter.singleAdd.cipCodes.id = autoCompleteSelection[0].value;
                
            }
        });

        $scope.$watch('filter.singleAdd.oNetCodes.text', function (newValue, oldValue) {
            if (newValue && oldValue !== undefined && storage.collection !== undefined) {
                function filter(item) {
                    if (item.text === newValue) {
                        return true;
                    }
                    return false;
                }

                var autoCompleteSelection = storage.collection.filter(filter);

                $scope.filter.singleAdd.oNetCodes.id = autoCompleteSelection[0].value;
            }
        });

        // --------------------------------------------------------------------------------------------------------------
    }


})();