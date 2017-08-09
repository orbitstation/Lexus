(function () {
    "use strict";

    angular.module('miniSPA').controller('jobSearchSummaryCtrl', controller);

    controller.$inject = ['$scope', '$rootScope', '$location', 'savedJobsFactory', '$window', 'registry', 'jobSearchService', 'samlAuth', 'screenSize'];
    function controller($scope, $rootScope, $location, savedJobsFactory, $window, registry, jobSearchService, samlAuth, screenSize) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init page variables  \_____
        // Variables
        
        var searchNeeded = true;
        var pagePath = '/jobsearch/jobs';
        var pageIndex = $location.search().page_index;
        var lastQuery = registry.get("Jobsearch", "query", "sessionStorage");
        
        var pbsortFilter = jobSearchService.customFilter({
            title: 'Sorted by Vets Wanted',
            id: '100',
            urlToken: 'pbsort-{0}-1',
            type: 'PBSort',
        });

        var onpremFilter = jobSearchService.customFilter({
            title: 'Veterans Wanted',
            id: '99',
            urlToken: 'onprem-{0}-1',
            type: 'OnPrem',
        });

        $scope.ignoreLocationChange = false;
        $scope.vetJobCount = 0;
        $scope.pageOnlyTracking = false;
        $scope.staticFilters = [];
        $scope.savedSearches = [];
        $scope.maxSavedAgentsReached = false;
        $scope.agent = null;
        $scope.agentSaved = false;
        $scope.saveAfterLogin = false;
        $scope.pageSize = 25;
        $scope.pager = { currentPage: (pageIndex ? ~~(pageIndex - 1) : 0) };
        $scope.datasetSize = 0;
        $scope.agents = null;
        $scope.companyFilterNotSet = true;
            
        $scope.useOnpremIndex = $scope.configMeta.useOnpremIndex.lookUpConfig.value == 'true';
        $scope.usePriorityBoardSorting = $scope.configMeta.usePriorityBoardSorting.lookUpConfig.value == 'true';
        $scope.pbsort = ($scope.usePriorityBoardSorting) ? ((lastQuery) ? lastQuery.pbsort : true) : false;
        $scope.onprem = ($scope.useOnpremIndex) ? ((lastQuery) ? lastQuery.onprem : true) : false;

        $scope.ppcTrackingEnabled = $rootScope.configMeta.ppcTracking.lookUpConfig.value;
        $scope.ppcTrackingWithKosmosApiEnabled = $scope.configMeta.ppcTrackingWithKosmosApi.lookUpConfig.value;
        $scope.jobViewCore = $scope.configMeta.jobViewCore.lookUpConfig.value;
        $scope.jobViewDomain = $scope.configMeta.jobViewDomain.lookUpConfig.value;
        $scope.jobViewCloudDomain = $scope.configMeta.jobViewCloudDomain.lookUpConfig.value;

        $scope.saveJobs = {
            MaxJobSavesReached: false
        };
        $scope.busyLinks = {
            saveJob: false
        };

        $scope.showBanner = (/Mobi|Windows Phone|Android|iPhone|iPad/).test(navigator.userAgent);

        $scope.isMobileView = screenSize.on('xs, cxs', function (isMatch) {
            $scope.isMobileView = isMatch;
        });

        $scope.isTabletView = screenSize.on('sm', function (isMatch) {
            $scope.isTabletView = isMatch;
        });

        $scope.adSwitch = (function () {
            var adConfig = $scope.configMeta.adSwitch.lookUpConfig.value;
            var configObj = {};
            try {
                var temp = JSON.parse(adConfig);
                (temp && typeof temp === "object") && (configObj = temp);
            } catch (e) {
                return configObj;
            }
            return configObj;
        })();

        // Service has pointer to $scope (TEMP solution)
        jobSearchService.init($scope);

        // Methods
        $scope.addCompanyToSearch = function (name) {
            searchNeeded = true;
            jobSearchService.addCompanyToSearch(name);
        };

        $scope.removeFilter = function(filter){
            jobSearchService.removeFilter(filter, function () {
                searchNeeded = true;
                $scope.ignoreLocationChange = false;
                if (filter.type == 'PBSort') {
                    $scope.pbsort = false;
                } else if (filter.type == 'OnPrem') {
                    $scope.onprem = false;
                }
            });
        }
        $scope.removeFilters = function () {
            jobSearchService.removeFilters(function () {
                $scope.removeFilter(pbsortFilter);
                $scope.removeFilter(onpremFilter);
            });
        };

        $scope.gotoJobsearch = jobSearchService.gotoJobsearch;
        $scope.ppcTrackJobClick = jobSearchService.ppcTrackJobClick;
        
        $scope.changePage = function (iPage) {
            $scope.pageOnlyTracking = true;
            searchNeeded = true;
            $scope.ignoreLocationChange = false;
            jobSearchService.changePage(iPage);
        };

        $scope.saveJob = function (jobId, jobSource, job) {
            jobSearchService.saveJob(jobId, jobSource, job, function () {
                job.is_saved = true;
                redirectToLogin();
            });
        };

        $scope.applyFilter = function (filter, type, item, removePageNum) {
            jobSearchService.applyFilter(filter, type, item, removePageNum, function () {
                searchNeeded = true;
                $scope.ignoreLocationChange = false;
            });
        };

        $scope.veteransToggle = function () {
            $scope.pbsort = !$scope.pbsort;
            if ($scope.pbsort) {
                $scope.veteransSorted(pbsortFilter, true);
            } else {
                $scope.removeFilter(pbsortFilter);
            }
            $scope.onprem = !$scope.onprem;
            if ($scope.onprem) {
                $scope.veteransSorted(onpremFilter, true);
            } else {
                $scope.removeFilter(onpremFilter);
            }
        };

        $scope.veteransSorted = function (filter, removePageNum) {
            var agentId = ($location.search()['agentID']) ? Number($location.search()['agentID']) : null;
            if (filter.type == 'PBSort') {
                $scope.pbsort = true;
                var vetsort = { id: 1, name: 'Sorted by Vets Wanted', urlToken: pbsortFilter.values[0].urlToken };
                $scope.applyFilter(vetsort, null, null, removePageNum);
            } else if (filter.type == 'OnPrem') {
                $scope.onprem = true;
                $scope.applyFilter(onpremFilter.values[0], null, onpremFilter, removePageNum);
            }
            if (agentId) {
                $location.search('agentID', agentId);
            }
        };

        $scope.saveSearch = function () {
            if ($rootScope.isAuthenticated) {
                jobSearchService.saveAgent();
            }
            else {
                var isDelayed = true;
                jobSearchService.saveAgent(isDelayed);
                redirectToLogin();
            }
        };

        //                                                                               _______________
        // _____________________________________________________________________________/    Watchers   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(
            function () {
                jobSearchService.getSavedAgents();
                savedJobsFactory.get().$promise.then(function (result) {
                    $scope.saveJobs.currentSaved = result.items.length;
                    $scope.saveJobs.MaxSavesAllowed = result.maxItemsCount;
                    if ($scope.saveJobs.currentSaved >= $scope.saveJobs.MaxSavesAllowed) {
                        $scope.saveJobs.MaxJobSavesReached = true;
                    }
                });
            }
        );

        $rootScope.$watch('isLoaded', function (newValue, oldValue) {
            if (newValue) {
                if ($scope.pbsort) {
                    $scope.veteransSorted(pbsortFilter, false);
                } else if ($scope.onprem) {
                    $scope.veteransSorted(onpremFilter, false);
                }
                search();
                searchNeeded = false;
            }
        });

        //                                                                               _______________
        // _____________________________________________________________________________/     Events    \_____
        //
        $rootScope.$on('searchClicked', function () {
            searchNeeded = true;
            $rootScope.search.open = false;
        });

        $rootScope.$on('$locationChangeSuccess', function () {
            jobSearchService.getSavedAgents();
            if (!$scope.ignoreLocationChange && searchNeeded) {
                search();
            }
            $scope.ignoreLocationChange = false;
            searchNeeded = true;
        });

        $rootScope.$on('savedDelay', function (ev, args) {
            if (args.service === 'saveJob' && (args.data && args.data.job)) {
                jobSearchService.checkDelayedJob(args.data.job.id);
            }
            if (args.service === 'saveAgent') {
                $location.search('agentID', args.data.response);
            }
        });

        // Private methods
        function redirectToLogin() {
            samlAuth.login();
        }
        
        function search() {
            jobSearchService.search({
                pbsort: $scope.pbsort,
                onprem: $scope.onprem
            }, searchPromise);
            $scope.ignoreLocationChange = false;
        }

        function searchPromise($scope, query) {
            $scope.ignoreLocationChange = true;
            jobSearchService.trackSearch({
                jobCount: !$scope.pageOnlyTracking && ($scope.pbsort || $scope.onprem) ? $scope.vetJobCount : null
            });
            
            for (var i = 0; i < query.filters.length; i++) {
                if (query.filters[i].id == pbsortFilter.values[0].id) {
                    $scope.json.active_filters.unshift(pbsortFilter);
                    $scope.vetJobCount = $scope.json.number_found;
                }
                if (query.filters[i].id == onpremFilter.values[0].id) {
                    $scope.json.active_filters.unshift(onpremFilter);
                    $scope.vetJobCount = $scope.json.number_found;
                }
            }

            var aNewPath = pagePath.split('/');
            var pg = $location.search().page_index;
            $location.search("page_index", null);
            angular.forEach($scope.json.filters, function (value) {
                angular.forEach(value.values, function (item) {
                    if (item.urlToken && item.selected) {
                        var urlToken = item.urlToken;
                        var qsParam = jobSearchService.getQueryStringParams(urlToken);
                        if (qsParam) {
                            $location.search(qsParam.name, qsParam.value);
                        }
                    }
                });
            });

            $location.search("page_index", pg);

            $location.path(aNewPath.join('/'), false);
        }
    }
})();
