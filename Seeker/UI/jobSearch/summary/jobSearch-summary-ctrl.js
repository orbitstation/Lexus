(function () {
    "use strict";

    angular.module('miniSPA').controller('jobSearchSummaryCtrl',
        ['$scope', '$rootScope', '$location', 'savedJobsFactory', 'authentication', '$timeout', 'registry', 'jobSearchService', 'utilityService', controller]);

    function controller($scope, $rootScope, $location, savedJobsFactory, authentication, $timeout, registry, jobSearchService, utilityService) {

        //                                                                               ________________________
        // _____________________________________________________________________________/   Init page variables  \_____
        // Variables
        var pagePath = "/jobsearch/jobs";
        var rxSortOrder = /[/]sort-by-([a-z]+)/;
        var defaultSort = "relevance";
        var pageIndex = $location.search().page_index;
        var appContext = registry.getAll('localStorage').global.context;
        
        // Service has pointer to $scope (TEMP solution)
        jobSearchService.init($scope);
        addBreadCrumb();

        $scope.pageOnlyTracking = false;
        $scope.ignoreLocationChange = false;
        $scope.detail = true;
        $scope.staticFilters = [];
        $scope.savedSearches = [];
        $scope.agent = null;
        $scope.agentSaved = false;
        $scope.saveAfterLogin = false;
        $scope.pageSize = 25;
        $scope.pager = { currentPage: (pageIndex ? ~~(pageIndex - 1) : 0) };
        $scope.datasetSize = 0;
        $scope.companyFilterNotSet = true;
        $scope.busyLinks = {
            saveJob: false
        };
        $scope.saveJobs = {
            MaxJobSavesReached: false
        };

        $scope.ppcTrackingEnabled = $scope.configMeta.ppcTracking.lookUpConfig.value;
        $scope.ppcTrackingWithKosmosApiEnabled = $scope.configMeta.ppcTrackingWithKosmosApi.lookUpConfig.value;
        $scope.jobViewCore = $scope.configMeta.jobViewCore.lookUpConfig.value;
        $scope.jobViewDomain = $scope.configMeta.jobViewDomain.lookUpConfig.value;
        $scope.jobViewCloudDomain = $scope.configMeta.jobViewCloudDomain.lookUpConfig.value;
        $scope.showSalaryResearch = $scope.configMeta.showSalaryResearch.lookUpConfig.value;

        $scope.sort = jobSearchService.getSortOrder();

        // Methods
        $scope.addCompanyToSearch = jobSearchService.addCompanyToSearch;
        $scope.gotoJobsearch = jobSearchService.gotoJobsearch;
        $scope.ppcTrackJobClick = jobSearchService.ppcTrackJobClick;
        $scope.changePage = function (iPage) {
            $scope.pageOnlyTracking = true;
            jobSearchService.changePage(iPage);
        };

        $scope.removeFilter = jobSearchService.removeFilter;

        $scope.removeFilters = function () {
            jobSearchService.removeFilters(function () {
                
            });
        };
        
        $scope.setSortOrder = function (sortOrder) {
            var location = jobSearchService.getFiltersFromPath();
            var prefix = pagePath;
            if (sortOrder !== defaultSort) {
                $scope.sort = 'date';
                prefix += "/sort-by-" + sortOrder;
            } else {
                $scope.sort = 'relevance';
            }

            $location.path(prefix + location, false);
        };
        $scope.applyFilter = jobSearchService.applyFilter;
        
        $scope.saveJob = function (jobId, jobSource, job) {
            jobSearchService.saveJob(jobId, jobSource, job, function () {
                $rootScope.login.boxOpen = true;
                $scope.busyLinks.saveJob = false;
                utilityService.scrollTop();
                //window.scrollTo(0, 0);
            });
        };


        $scope.saveSearch = function ($event) {
            if (authentication.isAuthenticated()) {
                jobSearchService.saveAgent();
            }
            else {
                $scope.saveAfterLogin = true;
                $rootScope.login.boxOpen = true;
                $rootScope.login.callout = {
                    type: "saveAgent",
                    data: $scope.agent
                };
            }
            $event.preventDefault();
            $event.stopPropagation();
        };


        search();

        //                                                                               _______________
        // _____________________________________________________________________________/    Watchers   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(
           function () {
               $scope.isAuthenticated = true;
               jobSearchService.getSavedAgents();
               savedJobsFactory.get().$promise.then(function (result) {
                   $scope.saveJobs.currentSaved = result.items.length;
                   $scope.saveJobs.MaxSavesAllowed = result.maxItemsCount;
                   if ($scope.saveJobs.currentSaved >= $scope.saveJobs.MaxSavesAllowed) {
                       $scope.saveJobs.MaxJobSavesReached = true;
                   }
               });

              search();
           }
       );

        //                                                                               _______________
        // _____________________________________________________________________________/     Events    \_____
        //
        $rootScope.$on('$locationChangeSuccess', function () {
            utilityService.scrollTop();
            jobSearchService.getSavedAgents();
            if (!$scope.ignoreLocationChange) {
                search();
            }
            $scope.ignoreLocationChange = false;
        });

        $rootScope.$on('login_success', function () {
            if ($scope.agent && $scope.saveAfterLogin && !$scope.agentSaved) {
                $scope.saveAfterLogin = false;
                jobSearchService.saveAgent();
            }

            var destroyBreadCrumbsWatch = $rootScope.$watch('meta.breadCrumbs', function (n) {
                if (n) {
                    addBreadCrumb();
                    destroyBreadCrumbsWatch();
                }
            });
        });

        if ($scope.sort === null) {
            $scope.sort = defaultSort;
        }

        function addBreadCrumb() {
            //MGSOCSPP-3350  Add a job search link to the breadcrumbs
            $rootScope.meta.breadCrumbs.push({
                display: {
                    id: 0, value: $rootScope.meta.messages[346842].lookUpMsg.value
                }, url: ''
            }); //job search
        }

        function search() {
            jobSearchService.search({}, searchPromise);
            $scope.ignoreLocationChange = false;
        }

        function searchPromise($scope) {
            $scope.ignoreLocationChange = true;
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