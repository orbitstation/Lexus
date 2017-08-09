(function () {
    angular.module('miniSPA').controller('ResumeSkillsController', ResumeSkillsController);

    ResumeSkillsController.$inject = ['$scope', '$rootScope', 'resumeBuilderDataStore', 'resumesFactory', 'utilityService', 'autoCompleteFactory'];
    function ResumeSkillsController($scope, $rootScope, resumeBuilderDataStore, resumesFactory, utilityService, autoCompleteFactory) {
        //view model
        var vm = this;
        //data store service
        var dataStore = resumeBuilderDataStore;
        var accordionName = 'skills';
        var accordionMeta = $rootScope.meta;
        var accordionOptions = accordionMeta.accordion[accordionName];
        var watchers = [];

        vm.data = {};
        vm.duplicates = [];
        
        //custom bindable functions 
        vm.addSkill = addSkill;
        vm.removeSkill = removeSkill;
        vm.skillHandler = skillHandler;
        vm.skillFormatter = skillFormatter;
        vm.responseFormatter = responseFormatter;
        vm.thisForm = accordionOptions.formName;
        activate();


        function activate(){
            //do stuff on open / close
            utilityService.onOpenCloseWatcher(function () { return accordionOptions.isOpen }, onOpen, onClose, $scope);
            getResumeSkillsData();
            checkForData();
        }

        $scope.$on("moveToNextSection", function (event, data) {
            if (data.clickedFrom == accordionName) {
                saveResume();
            }
        });

        function watchSkillsItems() {
            var destroySkillsItemsWatcher = $scope.$watch('vm.data.skills.items', function (newValues, oldValues) {
                if (newValues) {
                    var duplicates = [];
                    var countBy = _.countBy(_.map(newValues, 'skillName'), _.identity);
                    _.forEach(countBy, function (value, key) {
                        if (value > 1) {
                            duplicates.push(key);
                        }
                    });
                    vm.duplicates = angular.copy(duplicates);
                }
            }, true);
            watchers.push(destroySkillsItemsWatcher);
        }

        function addSkill() {
            vm.data.skills.items.push({});
            vm.data.skills.newItem = 1;
        }

        function removeSkill(key) {
            vm.data.skills.items.splice(key, 1);
            accordionOptions.formName.$setDirty();
        }

        function getResumeSkillsData() {
            if (dataStore.getData().skills === undefined || dataStore.getData().skills === null) {
                resumesFactory.getResumeSkills({ resumeValue: dataStore.getData().resumeValue }).$promise.then(function (data) {
                    vm.data = data;
                    dataStore.setObj(data);
                    vm.data.skills.newItem = 0;
                });
            } else {
                vm.data.skills = dataStore.getData().skills;
            }
        }

        function onOpen() {
            watchSkillsItems();
        }

        function onClose() {
            dataStore.setObj(vm.data);
            utilityService.destroyWatchers(watchers);
            checkForData();
        }

        function saveResume() {
            dataStore.setObj(vm.data);
            var payload = {
                resumeValue: dataStore.getData().resumeValue,
                items: vm.data.skills.items
            };
            resumesFactory.updateResumeSkills(payload).$promise.then(function (data) {
                $rootScope.busyLinks.mainBusyAction = false;
            }, function (error) {
                console.log('error', error);
            });
        }

        function skillHandler(userInputString, timeoutPromise) {
            return autoCompleteFactory.skills({ query: userInputString, maxResults: 5 }, { timeout: timeoutPromise }).$promise;
        }

        function skillFormatter (result) {
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
            accordionOptions.hasData = (vm.data.skills.items.length) ? true : false;
        }

    }
})();