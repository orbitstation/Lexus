(function () {
    "use strict";
    angular.module('miniSPA').controller('dashboardIndexCtrl',
        ['$scope',
            '$rootScope',
            '$q',
            'resumesFactory',
            'coverLetters',
            'documentUpload',
            'agentsFactory',
            'savedJobsFactory',
            'utilityService',
            'applicationHistory',
            'savedOccupationsFactory',
            'schoolsFactory',
            'budgetCalculatorFactory',
            'BudgetCalculatorService',
            'careerPlan',
            'careerPersonalityFactory',
            'UserAudit',
            'trainingProgramsFactory',
            'events',

            controller]);
    function controller($scope,
        $rootScope,
        $q,
        resumesFactory,
        coverLetters,
        documentUpload,
        agentsFactory,
        savedJobsFactory,
        utilityService,
        applicationHistory,
        savedOccupationsFactory,
        schoolsFactory,
        budgetCalculatorFactory,
        BudgetCalculatorService,
        careerPlan, 
        careerPersonalityFactory,
        UserAudit,
        trainingProgramsFactory,
        events) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  
        
        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in

        var sections = {
            Resumes: {
                itemLink: '/resumes/start/',
                link: '/resumes/index',
                inactiveLink: '/resumes/index',
                title: "185636", //"Resumes",
                idLocation: "resumeValue"
            },
            CoverLetters: {
                itemLink: '/CoverLetters/view/',
                link: '/CoverLetters/index',
                inactiveLink: '/CoverLetters/index',
                title: "713", //"Cover Letters",
                idLocation: "id"
            },
            Documents: {
                itemLink: '/Documents/',
                link: '/Documents/',
                inactiveLink: '/Documents/',
                title:"346835", //"Documents",
                idLocation: "id"
            },
            SavedSearches: {
                itemLink: '',
                link: '/SavedSearches/',
                inactiveLink: '/SavedSearches/',
                title: "104869", //"Saved Searches",
                idLocation: 'lexus_url'
            },
            SavedJobs: {
                itemLink: '',
                link: '/SavedJobs/',
                inactiveLink: '/SavedJobs/',
                title: "169802", //"Saved Jobs",
                idLocation: ''
            },
            ApplicationHistory: {
                itemLink: '/jobView/',
                link: '/applicationHistory/',
                inactiveLink: '/JobSearch/jobs',
                title: "160734", //"Application History",
                idLocation: 'jobViewLink'
            },
            Goals: {
                itemLink: '/careerPlan/goal/',
                link: '/careerPlan/',
                inactiveLink: '/careerPlan/',
                title: "370016", //"My Goals",
                idLocation: 'id'
            },
        };

        $scope.pageLoaded = false;

        $scope.thumbs = {
            limit: 4,
            start: 0,
            move: function (direction) {
                if (direction === 'right') {
                    if ($scope.thumbs.start + 4 < $scope.checkListSections.length) {
                        $scope.thumbs.start++;
                    }
                }

                if (direction === 'left') {
                    if ($scope.thumbs.start > 0) {
                        $scope.thumbs.start--;
                    } 
                }
            }
        }
        
        $scope.checkListSections = [
            {
                name: "activeresume",
                url: "resumes/index",
                text: "367913"
            },
             {
                 name: "jobview",
                 url: 'JobSearch/jobs',
                 text: "367914"
             },
            {
                name: "jobsearchagent",
                url: 'SavedSearches/',
                text: "367915"
            },
            {
                name: "jobapplication",
                url: 'applicationHistory/',
                text: "367916"
            }
        ];

        if ($rootScope.isAuthenticated) {
            init();
        }

        $rootScope.$on('login_success', function () {
            init();
        });

        function init() {
            $scope.myJobSearch = {};
            $scope.budgetCalculator = null;
            $scope.goals = [];
            return $q.all([
                getResumes(),
                getCoverLetters(),
                getDocuments(),
                getAgents(),
                getSavedJobs(),
                getApplicationHistory(),
                getSavedOccupations(),
                getSchools(),
                getBudget(),
                getCareerPlan(),
                getCareerPersonality(),
                getTrainingPrograms(),
                getUpcomingEvents()
            ]).then(function () {
                processChecklists($scope.checkListSections);
                $scope.pageLoaded = true;
            });
        }

        $scope.sectionLoaded = false;
        function getResumes() {
            var defer = $q.defer();
            resumesFactory.getResumes().$promise.then(function (data) {
                processSection(data, sections.Resumes);
                return defer.resolve();
            });
            return defer.promise;
        }
        
        function getCoverLetters() {
            var defer = $q.defer();
            coverLetters.get().$promise.then(function (data) {
                processSection(data, sections.CoverLetters);
                return defer.resolve();
            });
            return defer.promise;
        }
        
        function getDocuments() {
            var defer = $q.defer();
            documentUpload.query().$promise.then(function (data) {
                processDocuments(data, sections.Documents);
                return defer.resolve();
            });
            return defer.promise;
        }
        
        function getAgents() {
            var defer = $q.defer();
            agentsFactory.getAll().$promise.then(function (data) {
                processSection(data, sections.SavedSearches);
                return defer.resolve();
            });
            return defer.promise;
        }
        
        function getSavedJobs() {
            var defer = $q.defer();
            savedJobsFactory.get().$promise.then(function (data) {
                processSavedJobs(data);
                return defer.resolve();
            });
            return defer.promise;
        }
        
        function getApplicationHistory() {
            var defer = $q.defer();
            applicationHistory.get({ page: 0, pageSize: 3 }, {}).$promise.then(function (data) {
                processSection(data, sections.ApplicationHistory);
                return defer.resolve();
            });
            return defer.promise;
        }
        
        function getSavedOccupations() {
            var defer = $q.defer();
            savedOccupationsFactory.get().$promise.then(function (data) {
                $scope.savedOccupations = data;
                return defer.resolve();
            });
            return defer.promise;
        }
        
        function getSchools() {
            var defer = $q.defer();
            schoolsFactory.get().$promise.then(function (data) {
                for (var i in data) {
                    if (data[i].dateSaved) {
                        data[i].dateRaw = data[i].dateSaved;
                        data[i].dateSaved = moment(data[i].dateSaved).format("MMM Do, YYYY")
                    }
                }
                data.sort(dateSort);
                $scope.savedSchools = data;
                return defer.resolve();
            });
            return defer.promise;
        }
        
        function getBudget() {
            var defer = $q.defer();
            budgetCalculatorFactory.getExpenses().$promise.then(function (data) {
                $scope.budgetCalculator = BudgetCalculatorService.getCalculation(data.utilities, data.misc);
                $scope.budgetCalculator.filled = parseInt($scope.budgetCalculator.grossTargetSalary, 10) > 0;
                return defer.resolve();
            });
            return defer.promise;
        }
        
        function getCareerPlan() {
            var defer = $q.defer();
            careerPlan.getGoals().$promise.then(function (data) {
                $scope.goals = processGoals(data.items);
                return defer.resolve();
            });
            return defer.promise;
        }
        
        function getCareerPersonality() {
            var defer = $q.defer();
            careerPersonalityFactory.getAnswers().$promise.then(function (answers) {
                if (answers.length) {
                    careerPersonalityFactory.scoreAnswers(answers).$promise.then(function (data) {
                        processPersonality(data);
                    });
                }
                return defer.resolve();
            });
            return defer.promise;
        }
        
        function getTrainingPrograms() {
            var defer = $q.defer();
            trainingProgramsFactory.getWidgetData({ limit: 3 }).$promise.then(function (data) {
                $scope.savedPrograms = data;
                return defer.resolve();
            });
            return defer.promise;
        }

        function getUpcomingEvents() {
            var defer = $q.defer();
            var date = new Date();
            date.setDate(date.getDate() + 30);

            events.query({
                sortOrder: "StartDate",
                ascending: true,
                category: "",
                pageSize: 5,
                pageNumber: 0,
                endDate: date.toISOString(),
                includeTotalItemsCount: true,
                keyWord: ""
            }).$promise.then(function (data) {
                $scope.upcomingEvents = data;
                return defer.resolve();
            });
            return defer.promise;
        }

        function processChecklists(checkListSections) {
            var checkList = [];
            angular.forEach(checkListSections, function (obj) {
                checkList.push(obj.name);
            });

            //check if properties has been assigned
            if (!checkListSections[0].hasOwnProperty('status')) {
                UserAudit.getHistory(checkList).$promise.then(function (data) {
                    for (let i = 0; i < checkList.length; i++) {
                        if (data[i].name === checkList[i]) {
                            checkListSections[i].status = data[i].status;
                            //console.log(checkListSections[i]);
                        }
                    }
                }, function (err) {
                    console.log(err);
                });
            }
        }

        function processPersonality(data) {
            var categoryScoreMax = 1;
            var tempSetting = [];
            for (var item in data) {
                if (data[item]['score']) {
                    var i = {
                        name: data[item].scoreTypeName,
                        value: Math.ceil((data[item].score / categoryScoreMax)),
                        description: data[item].description,
                        type: data[item].scoreType,
                        color: '#444'
                    }

                    tempSetting.push(i);
                }
            }
            $scope.chartSettings = tempSetting;
        }


        function processSection(data, sectionType) {
            var section = {};
            section.title = sectionType.title;
            section.link = sectionType.link;
            section.inactiveLink = sectionType.inactiveLink;

            if (data.items.length > 0) {
                section.active = true;
                section.items = [];

                for (var item in data.items) {
                    var it = {};
                    var date = data.items[item].dateApplied || data.items[item].dateModified || data.items[item].date;
                    it.title = (data.items[item].resumeBasics && data.items[item].resumeBasics.resumeTitle) ? data.items[item].resumeBasics.resumeTitle : data.items[item].title || data.items[item].agent_name || data.items[item].jobTitle;
                    it.date = moment(date).format("MMM Do, YYYY");
                    it.dateRaw = data.items[item].dateModified;
                    it.itemLink = sectionType.itemLink + data.items[item][sectionType.idLocation];

                    section.items.push(it);
                }

                section.items.sort(function (a, b) {
                    var aa = new Date(a.dateRaw);
                    var bb = new Date(b.dateRaw);
                    if (aa < bb) return 1;
                    if (aa > bb) return -1;
                    return 0;
                });
            } else {
                section.active = false;
            }

            $scope.myJobSearch[section.title] = section;
        }

        function processDocuments(data) {
            var sectionType = sections.Documents;
            var section = {};

            section.title = sectionType.title;
            section.link = sectionType.link;
            section.inactiveLink = sectionType.inactiveLink;

            if (data.length > 0) {
                section.active = true;
                section.items = [];

                for (var item in data) {
                    var it = {};
                    if (data[item].name) {
                        it.title = data[item].name;
                        it.date = moment(data[item].createDate).format("MMM Do, YYYY");
                        it.dateRaw = data[item].createDate;
                        it.itemLink = sectionType.itemLink + data[item][sectionType.idLocation];

                        section.items.push(it);
                    }
                }

                section.items.sort(dateSort);
            } else {
                section.active = false;
            }

            $scope.myJobSearch[section.title] = section;
        }

        function processSavedJobs(data) {
            var sectionType = sections.SavedJobs;
            var section = {};

            section.title = sectionType.title;
            section.link = sectionType.link;
            section.inactiveLink = sectionType.inactiveLink;

            if (data.items.length > 0) {
                section.active = true;
                section.items = [];

                for (var item in data.items) {
                    var it = {};
                    it.title = data.items[item].job.title;
                    it.date = moment(data.items[item].modifiedDate).format("MMM Do, YYYY");
                    it.dateRaw = data.items[item].modifiedDate;

                    if (item.source == 'core') {
                        it.itemLink = '/jobView/' + utilityService.tokenize(data.items[item].job.title) + '-job-' + utilityService.tokenize(data.items[item].job.location) + '-sei-id-' + data.items[item].job.source.toLowerCase() + '-' + data.items[item].job.core_position_id;
                        //it.itemLink = '/jobView/sei-id-core' + data.items[item].job.core_position_id;
                    } else {
                        it.itemLink = '/jobView/' + utilityService.tokenize(data.items[item].job.title) + '-job-' + utilityService.tokenize(data.items[item].job.location) + '-id-' + data.items[item].job.source.toLowerCase() + '-' + data.items[item].job.id;
                    }

                    section.items.push(it);
                    
                }

                section.items.sort(dateSort);
            } else {
                section.active = false;
            }

            $scope.myJobSearch[section.title] = section;
        }

        function processGoals(data) {
            for (var i in data) {
                data[i].dateRaw = data[i].targetDueDate;
                data[i].date = moment(data[i].targetDueDate).format("MMM Do, YYYY");
            }

            return data.sort(dateSort);
        }

        function dateSort (a, b) {
            if (a.dateRaw < b.dateRaw) return 1;
            if (a.dateRaw > b.dateRaw) return -1;
            return 0;
        }

        $scope.getSavedOccupationUrl = function (name, code) {
            var url = '/occupations/career-detail/';
            url += name.toLowerCase().split(' ').join('-') + '-id-' + code;

            return url;
        }

        $scope.getSavedProgramUrl = function (name, id) {
            var url = '/programs/program-detail/';
            url += name.toLowerCase().split(' ').join('-') + '-id-' + id;

            return url;
        }
    }
})();