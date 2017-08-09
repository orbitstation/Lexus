(function () {
    "use strict"
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

    angular.module('miniSPA').service('jobSearchService', jobSearchService);

    function jobSearchService($rootScope, agentsFactory, $log, $location, jobSearchFactory, savedJobsFactory, authentication, utilityService, $window, $timeout, registry, $cookies, ppc, titleService) {
        var rxSortOrder = /[/]sort-by-([a-z]+)/;
        var pagePath = '/jobsearch/jobs';
        var fP = new Fingerprint2();
        var fpId;

        // Controller's scope
        var vm;

        return {
            init: init,
            addCompanyToSearch: addCompanyToSearch,
            gotoJobsearch: gotoJobsearch,
            ppcTrackJobClick: ppcTrackJobClick,
            removeFilters: removeFilters,
            changePage: changePage,
            saveJob: saveJob,
            saveAgent: saveAgent,
            getSavedAgents: getSavedAgents,
            trackSearch: trackSearch,
            search: search,
            removeFilter: removeFilter,
            applyFilter: applyFilter,
            customFilter: customFilter,
            getSortOrder: getSortOrder,
            getFiltersFromPath: getFiltersFromPath,
            regexFilter: regexFilter,
            checkDelayedJob: checkDelayedJob,
            getQueryStringParams: getQueryStringParams
        }

        function init(scope) {
            vm = scope;
        }

        function addCompanyToSearch(name) {
            var currentSearchCriterias = $location.search();
            angular.merge(currentSearchCriterias, { 'company': name });
            $location.search(currentSearchCriterias);
        }

        function gotoJobsearch(id) {
            var data = { agentID: id };
            agentsFactory.getAgent(data).$promise.then(
                function (result) {
                    $window.location.href = result.lexus_url;
                    vm.agentSaved = true;
                });
        }

        function ppcTrackJobClick(job, event) {
            //prevent href usage
            event.preventDefault();
            var ppcData = {
                dvfpid: fpId
            };
            //append data needed for ppc
            angular.merge(ppcData, job, $location.search(), registry.getAll('localStorage').global.context);
            ppc.trackPpcClick(vm, ppcData);
        }

        function removeFilters(callback) {
            $rootScope.search.keywords = '';
            $rootScope.search.location = '';
            $location.path('', false);
            $location.search('');
            if (callback && typeof callback === 'function') {
                callback();
            }
            removeFromSearchPanel();
        }

        function changePage(iPage) {
            var oSearch = $location.search();
            oSearch.page_index = iPage + 1;
            $location.search(oSearch);
        };

        function saveJob(jobId, jobSource, job, callback) {
            if ($rootScope.isAuthenticated) {
                savedJobsFactory.saveJob({ jobId: jobId, jobType: jobSource }).$promise.then(function (response) {
                    job.is_saved = true;

                    // increment saved jobs and check for over max count.
                    vm.saveJobs.currentSaved++;

                    if (vm.saveJobs.currentSaved >= vm.saveJobs.MaxSavesAllowed) {
                        vm.saveJobs.MaxJobSavesReached = true;
                    }

                }, function (response) {
                    $rootScope.topMasterErrors.push({ type: 'alert-danger', text: response.data.message });
                    job.is_saved = false;
                }).then(function () {
                    vm.busyLinks.saveJob = false;
                });
            } else {
                var saveObj = {
                    jobId: jobId,
                    jobType: jobSource,
                    expireOn: dateAdd(new Date(), 'minute', 10),
                    saveInProgress: false
                };
                registry.addDelayedSave('saveJob', saveObj, 'localStorage');

                if (callback && typeof callback === 'function') {
                    callback();
                }
            }
        }

        function saveAgent(isDelayed) {
            if (vm.agent && !isDelayed) {
                var agent = angular.copy(vm.agent);
                vm.agent = null;
                jobSearchFactory.createAgent(agent).$promise.then(function (result) {
                    $location.search('agentID', result.response);
                    vm.agentSaved = true;
                    $rootScope.track({ name: 'agentCreated', location: agent.location, keywords: agent.keywords });
                }, function (err) {
                    $rootScope.topMasterErrors.push({ type: 'alert-danger', text: response.data.message });
                }).then(function () {
                    getSavedAgents();
                });
            }
            if (isDelayed && !$rootScope.isAuthenticated) {
                var agentToSave = angular.copy(vm.agent);
                agentToSave.expireOn = dateAdd(new Date(), 'minute', 10);
                agentToSave.saveInProgress = false;
                registry.addDelayedSave('saveAgent', agentToSave, 'localStorage');
            }
        }

        function getSavedAgents() {
            if ($rootScope.isAuthenticated) {
                agentsFactory.getAll().$promise.then(function (result) {
                    vm.savedSearches = [];
                    vm.agents = result.items;
                    vm.maxSavedAgentsReached = (result.items.length === result.maxItemsCount);
                    var agentId = ($location.search()['agentID']) ? Number($location.search()['agentID']) : null;
                    angular.forEach(result.items, function (item) {
                        vm.savedSearches.push({
                            name: item.agent_name,
                            value: item.id
                        });
                        if (agentId === item.id) {
                            //vm.agentSaved = true;
                            vm.savedSearches[vm.savedSearches.length - 1].selected = true;
                        }
                    });
                });
            }
        }

        // One method to track them all. 
        // Triggers job search, vet job count and page index
        function trackSearch(extendTrack) {
            var payload = {
                name: 'jobSearch',
                tag: !vm.pageOnlyTracking ? 'event1' : null,
                location: $location.search().where,
                keywords: $location.search().q,
                pageIndex: $location.search().page_index ? $location.search().page_index : 1,
            }

            if (extendTrack) {
                angular.merge(payload, extendTrack);
            }

            $rootScope.track(payload);
            vm.pageOnlyTracking = false;
        }

        function search(additionalCustomParams, doAfterSearch) {
            fP.get(function (dvfpid) {
                fpId = dvfpid;
                vm.doneLoading = false;
                vm.companyFilterNotSet = true;

                var oQuery = prepareQuery(additionalCustomParams);

                registry.set("Jobsearch", "query", oQuery, "sessionStorage");

                jobSearchFactory.search(null, oQuery)
                    .$promise.then(function (result) {
                        vm.json = result;
                        vm.agent = result.agent;
                        vm.doneLoading = true;
                        vm.location = result.default_location;
                        vm.keywords = result.keywords;
                        vm.datasetSize = result.number_found;

                        if (result.jobs.length > 0 && $location.search().page_index === undefined) {
                            $location.search().page_index = 1;
                        }
                        vm.pager.currentPage = $location.search().page_index - 1;

                        if (oQuery.location === undefined) {
                            $rootScope.search.location = '';
                        } else {
                            $rootScope.search.location = oQuery.location;
                        }
                        if (oQuery.keywords === undefined) {
                            $rootScope.search.keywords = '';
                        } else {
                            $rootScope.search.keywords = oQuery.keywords;
                        }

                        vm.staticFilters = result.filters;

                        angular.forEach(result.jobs, function (value) {
                            if (value.jobtype == 1) //ppc direct click
                            {
                                value.url = value.core_jobview_url
                            }
                            else {
                                var location = '';
                                if (value.city && value.state) {
                                    location = utilityService.tokenize(value.city) + '-' + utilityService.tokenize(value.state);
                                } else if (value.city) {
                                    location = utilityService.tokenize(value.city);
                                } else {
                                    location = utilityService.tokenize(value.state);
                                }
                                var jobidentifier = (value.source.toLowerCase() == 'core') ? (value.id) : (value.cloud_posting_id);
                                value.url = '/jobView/' + utilityService.tokenize(value.title) + '-job-' + location + '-id-' + value.source.toLowerCase() + '-' + jobidentifier;
                                if (oQuery.page_index) {
                                    value.url += '?page_index=' + oQuery.page_index;
                                }
                            }
                        });



                        angular.forEach(vm.json.active_filters, function (value, key) {
                            if (value.qs_key === 'keywords') {
                                vm.keywords = value.values[0].name;
                            }
                            if (value.qs_key === 'location') {
                                var locationVal = value.values[0].name;
                                value.values[0].name = locationVal;
                                vm.location = locationVal;
                            }
                            if (value.qs_key === 'company') {
                                vm.companyFilterNotSet = false;
                                vm.search.company = '';
                            }
                        });

                        if (!result.jobs || result.jobs.length === 0) {
                            $rootScope.track({ name: 'noJobsFound', keywords: oQuery.keywords, location: oQuery.location });
                        }

                        if (doAfterSearch && typeof doAfterSearch === 'function') {
                            doAfterSearch(vm, oQuery);
                        }

                        if (authentication.isAuthenticated() && vm.agent) {
                            jobSearchFactory.getAgents().$promise.then(function (result) {
                                vm.agentSaved = false;
                                for (var i in result.items) {
                                    if (((vm.agent.radius === undefined && result.items[i].radius === undefined) || (vm.agent.radius === undefined && result.items[i].radius === null) || vm.agent.radius == result.items[i].radius)
                                        && ((vm.agent.keywords === undefined && result.items[i].keywords === '') || vm.agent.keywords == result.items[i].keywords)
                                        && ((vm.agent.location === undefined && result.items[i].location === '') || vm.agent.location == result.items[i].location)
                                        && ((vm.agent.company === undefined && result.items[i].company == '') || vm.agent.company == result.items[i].company)
                                        && (vm.agent.job_type_id == result.items[i].job_type_id)) {

                                        vm.agentSaved = true;
                                    } else {
                                        if (vm.savedSearches && vm.savedSearches.length > i) {
                                            vm.savedSearches[i].selected = false;
                                        }
                                    }

                                }
                            },
                          function (err) {
                              console.log(err);
                          });
                        }

                        return result;
                    },
                    function (error) {
                        //error handler
                        $log.log(error);
                    }).then(function (result) {
                        // Check if PPC channel Config is set.
                        if (result !== undefined && vm.ppcTrackingEnabled == 'true') {
                            var jobPosition = 0;
                            angular.forEach(result.jobs, function (value) {
                                jobPosition = jobPosition + 1;
                                value.jobPosition = jobPosition;
                                value.jobId = (value.id) ? (value.id) : 0;
                                value.postingId = value.cloud_posting_id;
                                value.jawsId = (value.cloud_job_id) ? (value.cloud_job_id) : 0;
                            });

                            var ppcData = {
                                dvfpid: dvfpid
                            };
                            //append data needed for ppc
                            angular.merge(ppcData, $location.search(), { jobs: result.jobs }, registry.getAll('localStorage').global.context);
                            if (vm.ppcTrackingEnabled) {
                                ppc.trackPpc(ppcData);
                            }
                            if (vm.ppcTrackingWithKosmosApiEnabled) {
                                ppc.trackPpcKosmos(ppcData);
                            }

                        }
                    });
            });

            
        }

        function removeFilter(filter, callback) {
            if (callback && typeof callback === 'function') {
                callback();
            }
            vm.agentSaved = false;
            if (filter.qs_key) {
                var mapped_qs_key;
                if (filter.qs_key == 'keywords') {
                    mapped_qs_key = "q";
                    vm.keywords = undefined;
                    $rootScope.search.keywords = '';
                    removeFromSearchPanel('searchPanelKeywords');
                }
                if (filter.qs_key == 'location') {
                    mapped_qs_key = "where";
                    vm.location = undefined;
                    $rootScope.search.location = '';
                    removeFromSearchPanel('searchPanelLocation');
                }
                if (filter.qs_key == 'company') {
                    mapped_qs_key = filter.qs_key;
                    vm.companyFilterNotSet = true;
                    vm.search.company = '';
                }
                var oSearch = cloneWithout($location.search(), "page_index");
                oSearch = cloneWithout(oSearch, mapped_qs_key);
                $location.search(oSearch);
                return;
            }

            var resetPageNum = (function () {
                var allowedFilters = [
                    'onprem-99-1'
                ];

                for (var i in allowedFilters) {
                    var allowedFilter = allowedFilters[i];

                    if (allowedFilter === filter.values[0].urlToken) {
                        return true;
                    }
                }
                return false;
            })();

            refreshFilters(filter.values[0].urlToken, false, resetPageNum);
        }

        function removeFromSearchPanel(input) {
            input ? $rootScope.$broadcast('angucomplete-alt:clearInput', input) : $rootScope.$broadcast('angucomplete-alt:clearInput');            
            titleService.setTitle("",  "");
        }

        function applyFilter(filter, type, item, removePageNum, callback) {
            vm.agentSaved = false;

            if (item) {
                for (var i in item.values) {
                    if (item.values[i].selected === true) {
                        item.values[i].selected = false;
                    }
                }
            }

            if (type === "TrovixJobTitles") {
                $rootScope.track({ name: 'jobTitleSearched', title: filter.name });
                var oSearch = cloneWithout(cloneWithout($location.search(), "page_index"), "q");
                oSearch.q = filter.name;
                $rootScope.search.keywords = filter.name;
                $location.search(oSearch);
                return true;
            }

            if (callback && typeof callback === 'function') {
                callback();
            }

            refreshFilters(filter.urlToken, true, (removePageNum) ? removePageNum : null);
            return true;
        };

        function customFilter(obj) {
            var newObj = {
                title: obj.title,
                values: [{
                    id: Number(obj.id),
                    urlToken: String.format(obj.urlToken, String(obj.id))
                }],
                type: obj.type,
                qs_key: null
            };
            return newObj;
        }

        function getSortOrder() {
            var match = regexSortOrder($location.path());

            if (match) {
                return match[1];
            }
            return null;
        }

        function getFiltersFromPath() {
            return $location.path().substring(pagePath.length).replace(rxSortOrder, "");
        }

        // Private methods
        function regexSortOrder(path) {
            return rxSortOrder.exec(path);
        }

        function removeAgentId() {
            $location.search('agentID', null);
        }

        function cloneWithout(oSource, sProperty) {
            var oClone = {};
            for (var k in oSource) {
                if (k !== sProperty) {
                    oClone[k] = oSource[k];
                }
            }
            return oClone;
        }

        function refreshFilters(urlToken, place, removePageNum) {
            var oSearch = $location.search();

            //add the filter as a querystring parameter
            var qsParam = getQueryStringParams(urlToken);
            if (qsParam) {
                oSearch = cloneWithout(oSearch, qsParam.name);
                if (place) {
                    oSearch[qsParam.name] = qsParam.value;
                }
            }

            if (oSearch.page_index) {
                if (removePageNum) {
                    oSearch = cloneWithout(oSearch, "page_index");
                }
            }
            vm.ignoreLocationChange = true;
            $location.search(oSearch);
            vm.ignoreLocationChange = false;
        }

        function mapMgsParamsToLexusAndClean(oSearch) {
            if (oSearch.cn) {
                oSearch.company = oSearch.cn;
                $location.search('cn', null);
            }
            if (oSearch.brd) {
                $location.search('brd', null);
            }
            if (oSearch.stp) {
                $location.search('stp', null);
            }
            if (oSearch.tm) {
                $location.search('tm', null);
            }
            if (oSearch.acnts) {
                $location.search('acnts', null);
            }
            if (oSearch.cy) {
                $location.search('cy', null);
            }
            if (oSearch.agentId) {
                $location.search('agentId', null);
            }
            if (oSearch.useCloudJobSearch) {
                $location.search('useCloudJobSearch', null);
            }
            if (oSearch.jt) {
                switch (oSearch.jt) {
                    case "1":
                        refreshFilters("job-type-contract-0-1", true);
                        break;
                    case "2":
                        refreshFilters("job-type-full-time-0-2", true);
                        break;
                    case "3":
                        refreshFilters("job-type-internship-0-3", true);
                        break;
                    case "4":
                        refreshFilters("job-type-other-0-4", true);
                        break;
                    case "5":
                        refreshFilters("job-type-part-time-0-5", true);
                        break;
                    case "6":
                        refreshFilters("job-type-temp-0-6", true);
                        break;
                    default:
                }
                $location.search('jt', null);
            }
            if (oSearch.rad) {
                switch (oSearch.rad) {
                    case "5":
                        refreshFilters("radius-5-miles-24-5", true);
                        break;
                    case "10":
                        refreshFilters("radius-10-miles-24-10", true);
                        break;
                    case "25":
                        refreshFilters("radius-25-miles-24-25", true);
                        break;
                    case "50":
                        refreshFilters("radius-50-miles-24-50", true);
                        break;
                    case "100":
                        refreshFilters("radius-100-miles-24-100", true);
                        break;
                    default:
                }
                $location.search('rad', null);
            }

        }

        function prepareQuery(queryCustomParams) {
            var oSearch = $location.search();

            mapMgsParamsToLexusAndClean(oSearch);

            var location = $location.path();

            var oQuery = {
                "location": oSearch.where,
                "keywords": oSearch.q,
                "company": oSearch.company,
                "page_index": oSearch.page_index,
                "url": $location.absUrl(),
                "filters": [],
                "debug_query": (oSearch.debug) ? true : false
            };

            if (queryCustomParams) {
                angular.merge(oQuery, queryCustomParams);
            }

            var showOrHideDebugFilters = ["duration", "ppc", "aggregate"];
            angular.forEach(showOrHideDebugFilters, function (key) {
                var value = oSearch[key];
                if (value === 'true') {
                    oQuery['force_' + key] = 'Show';
                }
                if (value === 'false') {
                    oQuery['force_' + key] = 'Hide';
                }
            });

            var sort = getSortOrder();
            if (sort) {
                oQuery.sort = sort;
            }

            if (oSearch['job-type']) {
                oQuery.filters.push({ id: 0, value: oSearch['job-type'] });
            }
            if (oSearch['date-posted']) {
                oQuery.filters.push({ id: 23, value: oSearch['date-posted'] });
            }
            if (oSearch.radius) {
                oQuery.filters.push({ id: 24, value: oSearch.radius });
            }
            if (oSearch.onprem) {
                oQuery.filters.push({ id: 99, value: oSearch.onprem });
            }

            //for (var i = 1; i < aPath.length; i++) {
            //    if (aPath[i] != '') {
            //        var match = regexFilter(aPath[i]);
            //        if (match) {
            //            oQuery.filters.push({
            //                id: match[1],
            //                value: match[2]
            //            });
            //        }
            //    }
            //}
            return oQuery;
        }

        function dateAdd(date, interval, units) {
            var ret = new Date(date); //don't change original date
            switch (interval.toLowerCase()) {
                case 'year': ret.setFullYear(ret.getFullYear() + units); break;
                case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); break;
                case 'month': ret.setMonth(ret.getMonth() + units); break;
                case 'week': ret.setDate(ret.getDate() + 7 * units); break;
                case 'day': ret.setDate(ret.getDate() + units); break;
                case 'hour': ret.setTime(ret.getTime() + units * 3600000); break;
                case 'minute': ret.setTime(ret.getTime() + units * 60000); break;
                case 'second': ret.setTime(ret.getTime() + units * 1000); break;
                default: ret = undefined; break;
            }
            return ret;
        }

        function regexFilter(path) {
            // we'll try looking for "filter-name-id.value"
            // and "filter-name-id-value"
            var rxFilters = [];
            rxFilters.push({ regex: /^.+[-]([0-9]+)\.([-]?[0-9]+)$/ });
            rxFilters.push({ regex: /^.+[-]([0-9]+)\-([-]?[0-9]+)$/ });

            for (var i = 0; i < rxFilters.length; i++) {
                var match = rxFilters[i].regex.exec(path);
                if (match) {
                    return match;
                }
            }
            return null;
        }

        function getQueryStringParams(urlToken) {
            var patterns = [/^([a-z]+\-[a-z]+).+[-][0-9]+\-([-]?[0-9]+)$/i,
                            /^(\w+).*[-][0-9]+\-([-]?[0-9]+)$/i];

            for (var i = 0; i < patterns.length; i++) {
                var match = urlToken.match(patterns[i]);
                if (match) {
                    var name = match[1].toLowerCase();
                    var value = match[2];
                    return {
                        name: name,
                        value: value
                    };
                }
            }

            return null;
        }

        function checkDelayedJob(jobID) {
            jobID = parseInt(jobID);
            
            if (!vm.json || !vm.json.jobs) {
                var jobsCollWatch = vm.$watch(function () { return vm.json }, function (res) {
                    if (res && res.jobs) {
                        markDelayedJob(jobID)

                        jobsCollWatch();
                    }
                });
            } else {
                markDelayedJob(jobID)
            }
        }

        function markDelayedJob(jobID) {
            for (let i in vm.json.jobs) {
                var job = vm.json.jobs[i];
                if (((job.cloud_job_id && job.cloud_job_id === jobID) || ((job.core_position_ad_id && job.core_position_ad_id === jobID))) && !job.is_saved) {
                    job.is_saved = true;
                    return;
                }
            }
        }
    }

    jobSearchService.$inject = [
            '$rootScope',
            'agentsFactory',
            '$log',
            '$location',
            'jobSearchFactory',
            'savedJobsFactory',
            'authentication',
            'utilityService',
            '$window',
            '$timeout',
            'registry',
            '$cookies',
            'ppc',
            'titleService'
    ];
})();