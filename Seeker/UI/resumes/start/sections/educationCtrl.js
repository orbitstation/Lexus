(function () {
    "use strict";
    angular.module('miniSPA').controller('educationCtrl', controller);
    controller.$inject = ['$scope', '$rootScope', 'resumeBuilderDataStore', 'resumesFactory', 'dataSourceService', 'utilityService'];

    function controller($scope, $rootScope, resumeBuilderDataStore, resumesFactory, dataSourceService, utilityService) {
        // set up the Scope variables (vm = $scope)
        var vm = this;
        var dataStore = resumeBuilderDataStore;
        var accordionName    = 'education';
        var accordionMeta    = $rootScope.meta;
        var accordionOptions = accordionMeta.accordion[accordionName];
        var watchers         = [];

        // templated bindable variables
        vm.data = {
            education: dataStore.getData().education
        };

        vm.view = {};
        vm.isMilitaryService = dataStore.isMilitaryService();       
        vm.thisForm = accordionOptions.formName;

        accordionOptions.fn = saveResume;

        //custom bindable functions 
        vm.addEducation = addEducation;
        vm.change = function change(edu) { edu.state = '' };
        vm.removeEducation = removeEducation;

        // initilize the education section
        activate();
//                                                                               ___________________________
// _____________________________________________________________________________/  Education tab Functions  \_____

        function activate() {
            preProccessData();
            if (vm.view.educations.items.length > 0) { vm.data.education.noRelevantEducation = false } else { vm.data.education.noRelevantEducation = true };

            utilityService.onOpenCloseWatcher(function () { return accordionOptions.isOpen }, onOpen, onClose, $scope);
            function onOpen() {
                preProccessData();
            }

            function onClose() {
                utilityService.destroyWatchers(watchers);
                postProccessData();
                delete vm.view.educations;
                checkForData();
            }

            //        // education (civilian)  upcomming feture (please do not delete MGSOCSPP-2571)
            $scope.$watch('vm.view.educations.items', function (newValues, oldValues) {
                if (oldValues) {
                    for (var x in newValues) {
                        if ((newValues[x].countryId != undefined) && (oldValues[x].countryId != undefined)) {     // dont execute on first "undifined" pass
                            if (newValues[x].countryId != oldValues[x].countryId) {                               // do execute if the row's country has been changed
                                getStates(x, newValues[x].countryId, 'education');
                            };
                        };
                    };
                };
            }, true);

            checkForData();
        }

        function addEducation(value) {
            if (value == 'standard') {
                vm.view.educations.items.push({ eduType: 'standard' });
                // add the state drop downs
                dataSourceService.dataSource('getStatesText', 164).then(
                    function (results) {
                        var l = vm.view.educations.items.length - 1;
                        $scope.meta.eduStates[l] = angular.copy($scope.meta.eduState);
                        $scope.meta.eduStates[l].items = results;
                    }
                );

            } else {
                vm.view.educations.items.push({ eduType: 'military' });
            }
        };

        function buildEducationadDate(educations) {
            for (var i = 0; i < educations.items.length; i++) {
                var endMonth = 0;
                var endYear = 0;
                var endDay = 0;
                if (educations.items[i].endMonth > 0 && educations.items[i].endYear > 0) {
                    endMonth = educations.items[i].endMonth - 1;
                    endYear = educations.items[i].endYear;
                    endDay = 1;
                    if (educations.items[i].endDay != undefined && educations.items[i].endDay > 0) {
                        endDay = educations.items[i].endDay;
                    }
                    educations.items[i].endDate = new Date(endYear, endMonth, endDay);
                }
            }
        }

        function getStates(x, country, source) {  // note: this must be its own function to solve a scoping issue with variable x
            if (x && country && source) {
                dataSourceService.dataSource('getStatesText', country).then(
                    function (results) {
                        switch (source) {
                            case 'education':
                                $scope.meta.eduStates[x].items = results;
                                break;
                        }
                    }
                );
            }
        };

        function parseDate() {
            var e = vm.view.educations;
            for (var i = 0; i < e.items.length; i++) {
                var date = e.items[i].endDate;
                if (date) {
                    e.items[i].endDay = date.getDate();
                    e.items[i].endMonth = date.getMonth() + 1;
                    e.items[i].endYear = date.getFullYear();
                }
            }
        }

        function postProccessData() {
            // post proccess education ( educations -> military and standard )
            if (vm.view.educations) {
                vm.data.education.standardEducations.items = [];
                vm.data.education.militaryEducations.items = [];

                parseDate();

                for (var x in vm.view.educations.items) {
                    if (vm.view.educations.items[x].eduType == "standard") {
                        //removing the Other text when its not selected
                        if (vm.view.educations.items[x].systemForAwardedCreditId !== 4671)
                            delete vm.view.educations.items[x].otherSystemForAwardedCredit;
                        vm.data.education.standardEducations.items.push(vm.view.educations.items[x]);
                    } else {
                        vm.data.education.militaryEducations.items.push(vm.view.educations.items[x]);
                    }
                }
                if (vm.view.educations.items.length == 0 && !vm.data.education.noRelevantEducation) {
                    vm.data.education.noRelevantEducation = true;
                }
            }
            dataStore.setObj(vm.data);
        }

        function preProccessData() {
            // pre proccess education ( military and standard --> educations )
            //  there are two types of education (military and civilan), the data service returns
            //  them as two obects,  but for this page we need one object of interlaced types, so...
            //  here we pre-procces, and latar post proccess to bring two, to one and vs. versa
            vm.view.educations = {}; // different object, we store the data into, for better handling of save/close. 
            vm.view.educations.items = [];
            vm.view.educations.maxItemsCount = vm.data.education.standardEducations.maxItemsCount;
            $scope.meta.eduStates = [];
            // set up the country and state drop downs (for education accordian)
            for (var x in vm.data.education.standardEducations.items) {
                //  the db currently stores  this as a string, it should be type float
                if (vm.data.education.standardEducations.items[x].gpa) {
                    vm.data.education.standardEducations.items[x].gpa = parseFloat(vm.data.education.standardEducations.items[x].gpa);
                }
                //  the db currently stores  this as a string, it should be type float
                if (vm.data.education.standardEducations.items[x].gpaMax) {
                    vm.data.education.standardEducations.items[x].gpaMax = parseFloat(vm.data.education.standardEducations.items[x].gpaMax);
                }
                if (vm.data.education.standardEducations.items[x].totalCreditsEarned) {
                    vm.data.education.standardEducations.items[x].totalCreditsEarned = parseFloat(vm.data.education.standardEducations.items[x].totalCreditsEarned);
                }

                vm.data.education.standardEducations.items[x].eduType = 'standard';
                vm.view.educations.items.push(vm.data.education.standardEducations.items[x]);
                $scope.meta.eduStates[x] = {};
                $scope.meta.eduStates[x] = angular.copy($scope.meta.eduState);
                $scope.meta.eduStates[x].items = [];
                getStates(x, vm.data.education.standardEducations.items[x].countryId, 'education');
            }
            for (var y in vm.data.education.militaryEducations.items) {
                vm.data.education.militaryEducations.items[y].eduType = 'military';
                vm.view.educations.items.push(vm.data.education.militaryEducations.items[y]);
            }

            buildEducationadDate(vm.data.education.standardEducations);
            buildEducationadDate(vm.data.education.militaryEducations);
        }

        function removeEducation(id) {
            vm.view.educations.items.splice(id, 1);
            accordionOptions.formName.$setDirty();
        }

        function saveResume() {
            postProccessData();
            return resumesFactory.updateEducationInfo({ resumeValue: dataStore.getData().resumeValue }, vm.data.education).$promise.then(function (data) {
                //change disabled button back 
                vm.data.education = data;
                dataStore.setObj(vm.data);
                $rootScope.busyLinks.mainBusyAction = false;
            }, function (error) {
                console.log('error', error);
                //$scope.errors.push({ text: error.data.message, type: 'alert-danger' });
            });
        }

        function checkForData() {
            accordionOptions.hasData = (vm.data.education.militaryEducations.items.length || vm.data.education.standardEducations.items.length) ? true : false;
        }
    }
})();