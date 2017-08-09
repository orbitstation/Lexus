(function () {
    angular.module('miniSPA').controller('TargetEmployerInfoController', TargetEmployerInfoController);

    TargetEmployerInfoController.$inject = ['$scope', '$rootScope', 'resumeBuilderDataStore', 'resumesFactory', 'utilityService', '$filter'];
    function TargetEmployerInfoController($scope, $rootScope, resumeBuilderDataStore, resumesFactory, utilityService, $filter) {
        //view model
        var vm = this;
        //data store service
        var dataStore = resumeBuilderDataStore;
        var levelOfDetail = {
            TargetJob: 'TargetJob',
            Salary: 'Salary',
            Availability: 'Availability'
        };
        var accordionName = 'targetEmployerInfo';
        var accordionMeta = $rootScope.meta;
        var accordionOptions = accordionMeta.accordion[accordionName];
        var watchers = [];

        vm.data = {};

        getData();

        function getData() {
            getTargetJobData();
            getSalaryData();
            getAvailabilityData();
            checkForData();
        }

        function getTargetJobData() {
            if (dataStore.getData().targetJob === undefined) {
                resumesFactory.getResume({ resumeValue: dataStore.getData().resumeValue, levelOfDetail: levelOfDetail.TargetJob }).$promise.then(function (data) {
                    vm.data = data;
                    dataStore.setObj(data.targetJob);
                });
            } else {
                vm.data.targetJob = dataStore.getData().targetJob;
            }
        }

        function getSalaryData() {
            if (dataStore.getData().salary === undefined) {
                resumesFactory.getResume({ resumeValue: dataStore.getData().resumeValue, levelOfDetail: levelOfDetail.Salary }).$promise.then(function (data) {
                    vm.data.salary = data.salary;
                    dataStore.setObj(data.salary);
                });
            } else {
                vm.data.salary = dataStore.getData().salary;
            }
        }

        function getAvailabilityData() {
            if (dataStore.getData().availability === undefined) {
                resumesFactory.getResume({ resumeValue: dataStore.getData().resumeValue, levelOfDetail: levelOfDetail.Availability }).$promise.then(function (data) {
                    vm.data.availability = (data.availability) ? data.availability : [];
                    dataStore.setObj(vm.data.availability);
                });
            } else {
                vm.data.availability = dataStore.getData().availability;
            }
        }

        $scope.$on("moveToNextSection", function (event, data) {
            if (data.clickedFrom == accordionName) {
                saveResume();
            }
        });

        //do stuff on open / close
        utilityService.onOpenCloseWatcher(function () { return accordionOptions.isOpen }, onOpen, onClose, $scope);

        function onOpen() {
        }

        function onClose() {
            dataStore.setObj(vm.data);
            checkForData();
        }

        function saveResume() {
            dataStore.setObj(vm.data);
            var payload = {
                resumeValue: dataStore.getData().resumeValue,
                targetJob: dataStore.getData().targetJob,
                availability: dataStore.getData().availability,
                salary: dataStore.getData().salary
            };
            resumesFactory.updateTargetEmployer({ resumeValue: dataStore.getData().resumeValue }, payload).$promise.then(function (data) {
                $rootScope.busyLinks.mainBusyAction = false;
            }, function (error) {
                console.log('error', error);
            });
        }

        function checkForData() {
            var availability = vm.data.availability && vm.data.availability.length;
            var salary = utilityService.checkForValuesByType(dataStore.getData().salary, 'number');
            var amount = utilityService.checkForValuesByType(dataStore.getData().salary, 'string');
            var targetJob = utilityService.checkForValuesByType(vm.data.targetJob, 'boolean');
            accordionOptions.hasData = (availability || salary || targetJob || amount);
        }
    }
})();
