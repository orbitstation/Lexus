(function () {
    angular.module('miniSPA').controller('experienceCtrl', experience);

    experience.$inject = ['$scope', '$rootScope', 'resumeBuilderDataStore', 'resumesFactory', 'utilityService', 'dataSourceService', 'autoCompleteFactory'];
    function experience($scope, $rootScope, resumeBuilderDataStore, resumesFactory, utilityService, dataSourceService, autoCompleteFactory) {

        // set up the Scope variables (vm = $scope)
        var vm = this;
        var dataStore        = resumeBuilderDataStore;
        var accordionName    = 'experience';
        var accordionMeta    = $rootScope.meta;
        var accordionOptions = accordionMeta.accordion[accordionName];

        accordionOptions.fn = saveResume;

        // templated bindable functions
        vm.data = {
            experience: dataStore.getData().experience
        };
        vm.thisForm = accordionOptions.formName;
        vm.isMilitaryService = dataStore.isMilitaryService();
        vm.view = {};
        
        //custom bindable functions
        vm.addExperience = addExperience;
        vm.removeExperience = removeExperience;
        vm.addExperienceSkill = addExperienceSkill;
        vm.removeExperienceSkill = removeExperienceSkill;

        vm.skillHandler = skillHandler;
        vm.skillFormatter = skillFormatter;
        vm.responseFormatter = responseFormatter;


        // initilize the experience section
        activate();

        //                                                                               ____________________________
        // _____________________________________________________________________________/  Experience tab Functions  \_____

        function activate() {
            preProccessData();
            if (vm.view.experiences.items.length > 0) { vm.data.experience.noRelevantExperience = false } else { vm.data.experience.noRelevantExperience = true };

            //do stuff on open / close
            utilityService.onOpenCloseWatcher(function () { return accordionOptions.isOpen }, onOpen, onClose, $scope);

            function onOpen() {
                preProccessData();
            }

            function onClose() {
                postProccessData();
                delete vm.view.experiences;
                checkForData();
            }

            // watch for country change and load states
            $scope.$watch('vm.view.experiences.items', function (newValues, oldValues) {
                if (oldValues) {
                    for (var x in newValues) {
                        if (newValues[x].expType == 'standard') {
                            // standard
                            if ((newValues[x].companyCountryId != undefined) && (oldValues[x].companyCountryId != undefined)) {     // dont execute on first "undifined" pass
                                if (newValues[x].companyCountryId != oldValues[x].companyCountryId) {                               // do execute if the row's country has been changed
                                    getStates(x, newValues[x].companyCountryId, 'experience');
                                    newValues[x].companyState = null;
                                };
                            };
                        }
                        else {
                            // military
                            if ((newValues[x].lastDutyStationCountryId != undefined) && (oldValues[x].lastDutyStationCountryId != undefined)) {     // dont execute on first "undifined" pass
                                if (newValues[x].lastDutyStationCountryId != oldValues[x].lastDutyStationCountryId) {                               // do execute if the row's country has been changed
                                    getStates(x, newValues[x].lastDutyStationCountryId, 'experienceMilitary');
                                    newValues[x].lastDutyStationStateId = null;
                                }
                            };
                        };
                    };
                };
            }, true);

            checkForData();
        }



        function getStates(x, country, source) {  // note: this must be its own function to solve a scoping issue with variable x
            $scope.meta.expStates[x].items = [];
            if (x!=null && country!=null && source!=null) {
                if (source == "experience") {
                    dataSourceService.dataSource('getStatesText', country).then(
                        function (results) {
                            $scope.meta.expStates[x].items = results;
                            processNoStates(x);
                        }
                    );
                }
                else {
                    dataSourceService.dataSource('getStates', country).then(
                        function (results) {
                            $scope.meta.expStates[x].items = results;
                            processNoStates(x);
                        }
                    );
                }
            }
        };

        function processNoStates(experienceIndex) {
            if ($scope.meta.expStates[experienceIndex].items.length <= 1) {
                if (vm.view.experiences) {
                    vm.view.experiences.items[experienceIndex].companyState = "";
                }
            }
        }

        function saveResume() {
            postProccessData();
            return resumesFactory.updateExperienceSection({ resumeValue: dataStore.getData().resumeValue }, vm.data.experience).$promise.then(function (data) {
                vm.data.experience = data;
                dataStore.setObj(vm.data);
                //change disabled button back 
                $rootScope.busyLinks.mainBusyAction = false;
            }, function (error) {
                console.log('error', error);
                //$scope.errors.push({ text: error.data.message, type: 'alert-danger' });
            });
        }


        function postProccessData() {
            // post proccess Experience ( experiences -> military and standard )
            if (vm.view.experiences) {
                vm.data.experience.standardExperiences.items = [];
                vm.data.experience.militaryExperiences.items = [];
                for (var x in vm.view.experiences.items) {
                    if (vm.view.experiences.items[x].expType == "standard") {
                        if (vm.view.experiences.items[x].isPresentWorkingCompany == true) {
                            vm.view.experiences.items[x].endDate = null;
                        };
                        if (vm.view.experiences.items[x].canContactSupervisor !== 2008) {
                            vm.view.experiences.items[x].supervisorPhoneNumber = null;
                            vm.view.experiences.items[x].supervisorName = null;
                        }

                        vm.data.experience.standardExperiences.items.push(vm.view.experiences.items[x]);
                    } else {
                        if (vm.view.experiences.items[x].isPresentExperience == true) {
                            vm.view.experiences.items[x].milEndDate = null;
                        };
                        vm.data.experience.militaryExperiences.items.push(vm.view.experiences.items[x]);
                    }
                }
                if (vm.view.experiences.items.length == 0 && !vm.data.experience.noRelevantExperience) {
                    vm.data.experience.noRelevantExperience = true;
                }
            }
            dataStore.setObj(vm.data);
        }



        function preProccessData() {
            vm.view.experiences = {};
            vm.view.experiences.items = [];
            vm.view.experiences.maxItemsCount = vm.data.experience.standardExperiences.maxItemsCount;
            $scope.meta.expStates = [];

            // set up the country and state drop downs (for experience accordian)
            for (var x in vm.data.experience.standardExperiences.items) {
                // standard
                vm.view.experiences.items.push(vm.data.experience.standardExperiences.items[x]);
                var l = vm.view.experiences.items.length-1;
                vm.data.experience.standardExperiences.items[l].expType = 'standard';
                $scope.meta.expStates[l] = {};
                $scope.meta.expStates[l] = angular.copy($scope.meta.expState);
                $scope.meta.expStates[l].items = [];
                getStates(l, vm.data.experience.standardExperiences.items[x].companyCountryId, 'experience');
            }
            for (var y in vm.data.experience.militaryExperiences.items) {
                // military
                vm.data.experience.militaryExperiences.items[y].expType = 'military';
                vm.view.experiences.items.push(vm.data.experience.militaryExperiences.items[y]);
                var l = vm.view.experiences.items.length-1;
                $scope.meta.expStates[l] = {};
                $scope.meta.expStates[l] = angular.copy($scope.meta.expState);
                $scope.meta.expStates[l].items = [];
                getStates(l, vm.data.experience.militaryExperiences.items[y].lastDutyStationCountryId, 'experienceMilitary');
            }
        }




        // add an experience
        function addExperience(value) {
            if (value == 'standard') {
                // standard
                vm.view.experiences.items.push({ expType: 'standard' });
                var l = vm.view.experiences.items.length - 1;
                $scope.meta.expStates[l] = angular.copy($scope.meta.companyStateText);
                getStates(l, 164, 'experience');
            } else {
                // military
                vm.view.experiences.items.push({ expType: 'military' });
                var l = vm.view.experiences.items.length - 1;
                $scope.meta.expStates[l] = angular.copy($scope.meta.companyStateText);
                getStates(l, 164, 'experienceMilitary');
            }
        };


        // remove an experience object
        function removeExperience(id) {
            vm.view.experiences.items.splice(id, 1);
            $scope.meta.expStates.splice(id, 1);
            accordionOptions.formName.$setDirty();
        }



        // add a Skill object
        function addExperienceSkill(key) {
            if (vm.view.experiences.items[key].skills == undefined) { vm.view.experiences.items[key].skills = {};}
            vm.view.experiences.items[key].skills.newitem = 1;
            if ($scope.meta.experience == undefined) { $scope.meta.experience = [] };
            if ($scope.meta.experience[key] == undefined) { $scope.meta.experience[key] = [] };
            if ($scope.meta.experience[key].skillnamearray == undefined) { $scope.meta.experience[key].skillnamearray = [] };
            if (vm.view.experiences.items[key].skills == undefined) { vm.view.experiences.items[key].skills = {} };
            if (vm.view.experiences.items[key].skills.items == undefined) { vm.view.experiences.items[key].skills.items = [] };
            $scope.meta.experience[key].skillnamearray.push(angular.copy($scope.meta.skillname));
            vm.view.experiences.items[key].skills.items.push({});
        }


        // remove a Skill object
        function removeExperienceSkill(key, skillkey) {
            vm.view.experiences.items[key].skills.items.splice(skillkey, 1);
            accordionOptions.formName.$setDirty();
        }

        function skillHandler(userInputString, timeoutPromise) {
            return autoCompleteFactory.skills({ query: userInputString, maxResults: 5 }, { timeout: timeoutPromise }).$promise;
        }

        function skillFormatter(result) {
            return responseFormatter(result, $rootScope.meta.skillName);
        }

        function responseFormatter(result, meta) {
            if (!meta) return result;

            //unwrap root node
            var itemsWrapper = meta.remoteItemsWrapper;
            var unwrappedData = itemsWrapper ? result[itemsWrapper] : result;

            //removes html tags from the input string
            function htmlToPlaintext(text) {
                return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            }

            var mappedData = [];
            var textField = meta.titlefield;
            var valueField = meta.valuefield;

            //remove html tags
            angular.forEach(unwrappedData, function (value, key) {
                mappedData.push({ id: value[valueField], text: htmlToPlaintext(value[textField]) });
            }, mappedData);

            return mappedData;
        }

        function checkForData() {
            accordionOptions.hasData = (vm.data.experience.militaryExperiences.items.length || vm.data.experience.standardExperiences.items.length) ? true : false;
        }


    }
})();