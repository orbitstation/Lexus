(function () {
    angular.module('miniSPA').controller('ResumeBasics', ResumeBasicsController);

    ResumeBasicsController.$inject = ['$scope', '$rootScope', 'resumeBuilderDataStore', 'resumesFactory', '$routeParams', '$location', 'utilityService', '_'];

    function ResumeBasicsController($scope, $rootScope, resumeBuilderDataStore, resumesFactory, $routeParams, $location, utilityService, _) {
        //view model
        var vm = this;
        //data store service
        var dataStore = resumeBuilderDataStore;
        var levelOfDetail = 'Basic';
        var accordionName = 'nameAndStatus';
        var accordionMeta = $rootScope.meta;
        var accordionOptions = accordionMeta.accordion[accordionName];

        //vm bindings
        //data bootstraper
        vm.data = {};
        vm.isExistingResume = (dataStore.getData().resumeValue) ? true : false;

        //vm functions
        vm.startResume = startResume;
        

        $scope.$on('moveToNextSection', function (event, data) {
            if (data.clickedFrom === accordionName) {
                saveResume();
            }
        });

        $scope.$on('resumeServerData', function (event, data) {
            vm.data.resumeBasics = data.resumeBasics;
            vm.isExistingResume = true;
            checkForData();
        });

        //on accordion open/close
        utilityService.onOpenCloseWatcher(function () { return accordionOptions.isOpen }, onOpen, onClose, $scope);

        function onOpen() { }

        function onClose() {
            dataStore.setObj(vm.data);
            checkForData();
        }

        function startResume(type) {
            dataStore.setAsNewResume();
            emmitor(type);
        }

        function emmitor(resumeType, resumeValue) {
            $scope.$emit('resumeStarted', { resumeType: resumeType, resumeBasics: vm.data.resumeBasics });
        }

        function saveResume() {
            dataStore.setObj(vm.data);
            resumesFactory.updateResumeTitle({ resumeValue: dataStore.getData().resumeValue, resumeTitle: vm.data.resumeBasics.resumeTitle }).$promise.then(function (data) {
                $rootScope.busyLinks.mainBusyAction = false;
            }, function (error) {
                console.log('error', error);
            });
        }

        function checkForData() {
            accordionOptions.hasData = (vm.data.resumeBasics.resumeTitle) ? true : false;
        }
    }
})();