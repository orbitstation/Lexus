(function () {
    angular.module('miniSPA').controller('languages', languages);

    languages.$inject = ['$scope', '$rootScope', 'resumeBuilderDataStore', 'resumesFactory', 'utilityService', 'dataSourceService', '$uibModal', '$q'];
    function languages($scope, $rootScope, resumeBuilderDataStore, resumesFactory, utilityService, dataSourceService, $uibModal, $q) {

        //view model
        var vm = this;
        //data store service
        var dataStore = resumeBuilderDataStore;
        var accordionName = 'languages';
        var accordionMeta = $rootScope.meta;
        var accordionOptions = accordionMeta.accordion[accordionName];
        var languagesMeta = accordionMeta.languages;
        var watchers = [];

        var languageHolder = {
            languageId: null,
            languageName: null,
            proficiencyId: null
        };

        //data bootstraper
        vm.data = {
            languages: dataStore.getData().languages
        };
        dataStore.setInitialData(angular.copy(vm.data));
        vm.dynamicMeta = [];
        vm.thisForm = accordionOptions.formName;

        //vm functions
        vm.addLanguage = addLanguage;
        vm.removeLanguage = removeLanguage;

        accordionOptions.fn = saveResume;

        checkForData();
        initLanguages();

        //do stuff on open / close
        utilityService.onOpenCloseWatcher(function () { return accordionOptions.isOpen }, onOpen, onClose, $scope);

        function onOpen() {
            vm.data.languages = dataStore.getData().languages;
            watchLanguages();
        }

        function onClose() {
            dataStore.setObj(vm.data);
            checkForData();
            utilityService.destroyWatchers(watchers);
        }

        function saveResume() {
            if (!angular.equals(dataStore.getInitialData('languages'), vm.data.languages)) {
                if ($rootScope.resumeCount > 1) {
                    return modalConfirm(onConfirm, onDecline);
                }
                else {
                    onConfirm();
                    return $q.reject('goNext');
                }
            } else {
                $rootScope.busyLinks.mainBusyAction = false;
                return $q.reject('goNext');
            }
        }

        function initLanguages() {
            for (var x in vm.data.languages.items) {
                var temp = {};
                angular.copy(languagesMeta, temp);
                vm.dynamicMeta.push(temp);
                vm.dynamicMeta[x].label = {
                    lookUpMsg:{
                        value: languagesMeta.label.lookUpMsg.value
                    }
                }
            }
            aChangeInLanguages(vm.data.languages.items);
        }

        function addLanguage() {
            var temp = {};
            vm.data.languages.items.push(angular.copy(languageHolder));
            angular.copy(languagesMeta, temp);
            vm.dynamicMeta.push(temp);
        }

        function watchLanguages() {
            var languagesWatch = $scope.$watch('vm.data.languages.items', function (n, o) {
                if (o !== undefined) {
                    aChangeInLanguages(n);
                    watchers.push(languagesWatch);
                }
            }, true);
        }

        function aChangeInLanguages(newItems) {
            // create short list of used langages
            var usedLang = [];
            for (var y in vm.data.languages.items) {
                if (vm.data.languages.items[y].proficiencyId == 0) {
                    vm.data.languages.items[y].proficiencyId = null;
                }
                usedLang.push(vm.data.languages.items[y].languageId);
            }

            // enable all, in all lists (back to baseline)
            for (var w in vm.dynamicMeta) {
                for (var e in vm.dynamicMeta[w].items) {
                    if (vm.dynamicMeta[w].items[e].value) {
                        utilityService.setItemsDisable(vm.dynamicMeta[w].items[e].value, vm.dynamicMeta[w].items, false);
                    }
                }
            }

            // disabled - the used languages - but do not disable the one that is selected in the pull down
            for (var x in newItems) {
                var selectedLang = usedLang[x];
                for (var q in usedLang) {
                    if (usedLang[q] != selectedLang) {
                        if (usedLang[q]) {
                            utilityService.setItemsDisable(usedLang[q], vm.dynamicMeta[x].items, true);
                        }
                    }
                }
            }
        }

        function removeLanguage(language) {
            for (var i = 0; i < vm.data.languages.items.length; i++) {
                if (vm.data.languages.items[i] == language) {
                    vm.data.languages.items.splice(i, 1);
                }
            }
            accordionOptions.formName.$setDirty();
        }

        function checkForData() {
            accordionOptions.hasData = (vm.data.languages.items.length) ? true : false;
        }

        function onConfirm() {
            resumesFactory.updateLanguageSection({}, vm.data.languages).$promise.then(function (data) {
                $rootScope.busyLinks.mainBusyAction = false;
                dataStore.setObj(vm.data);
                dataStore.setInitialData(angular.copy(vm.data));
            }, function (error) {
                console.log('error', error);
                $q.reject(error);
            });
        }

        function onDecline(mode) {
            $rootScope.busyLinks.mainBusyAction = false;
            if (mode !== 'noRevert') {
                vm.data.languages = angular.copy(dataStore.getInitialData('languages'));
            }
            dataStore.setObj(vm.data);
            return $q.reject();
        }

        //Modal setup
        function modalConfirm(onSuccess, onReject) {
            var modalInstance = $uibModal.open({
                backdrop: 'static',
                templateUrl: 'profile-modal.html',
                controller: 'ModalInstanceCtrl'
            });

            return modalInstance.result.then(function () {
                onSuccess();
            }, function (mode) {
                if (!mode || mode != 'close') {
                    return onReject();
                } else {
                    return onReject('noRevert');
                }
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }
})();