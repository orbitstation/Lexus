(function () {
    angular.module('miniSPA').controller('resumeObjectiveSummary', resumeObjectiveSummary);

    resumeObjectiveSummary.$inject = ['$scope', '$rootScope', 'resumeBuilderDataStore', 'resumesFactory', 'utilityService'];
    function resumeObjectiveSummary($scope, $rootScope, resumeBuilderDataStore, resumesFactory, utilityService) {

        //view model
        var vm = this;
        //data store service
        var dataStore = resumeBuilderDataStore;
        var accordionName = 'objectiveSummary';
        var accordionMeta = $rootScope.meta;
        var accordionOptions = accordionMeta.accordion[accordionName];
        var watchers = [];

        //data bootstraper
        vm.data = { resumeSummary: dataStore.getData().resumeSummary };

        checkForData();

        $scope.$on("moveToNextSection", function (event, data) {
            if (data.clickedFrom == accordionName) {
                saveResume();
            }
        });

        //do stuff on open / close
        utilityService.onOpenCloseWatcher(function () { return accordionOptions.isOpen }, onOpen, onClose, $scope);

        function onOpen() { }

        function onClose() {
            dataStore.setObj({ resumeSummary: vm.data.resumeSummary });
            checkForData();
        }

        function checkForData() {
            accordionOptions.hasData = (vm.data.resumeSummary) ? true : false;
        }

        function saveResume() {
            resumesFactory.updateResumeSummary({ resumeValue: dataStore.getData().resumeValue }, { resumeSummary: vm.data.resumeSummary }).$promise.then(function (data) {
                $rootScope.busyLinks.mainBusyAction = false;
            }, function (error) {
                console.log('error', error);
            });
        }
    }
})();