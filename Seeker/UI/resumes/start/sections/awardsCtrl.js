(function () {
    "use strict"
    angular.module('miniSPA').controller('awardsCtrl', controller);
    controller.$inject = ['$scope', '$rootScope', 'resumeBuilderDataStore', 'resumesFactory', 'dataSourceService', 'utilityService'];

    function controller($scope, $rootScope, resumeBuilderDataStore, resumesFactory, dataSourceService, utilityService) {

        // set up the Scope variables (vm = $scope)
        var vm = this;
        var dataStore = resumeBuilderDataStore;
        var accordionName = 'awards';
        var accordionMeta = $rootScope.meta;
        var accordionOptions = accordionMeta.accordion[accordionName];
        var watchers = [];

        // templated bindable functions
        vm.data = {
            awards: dataStore.getData().awards
        };
        vm.thisForm = accordionOptions.formName;

        //custom bindable functions 
        vm.addAward = addAward;
        vm.removeAward = removeAward;


        // initilize the education section
        activate();


        //                                                                               ___________________________
        // _____________________________________________________________________________/  Education tab Functions  \_____

        function activate() {
            // templated save function when next section button is clicked
            $scope.$on("moveToNextSection", function (event, data) {
                if (data.clickedFrom == accordionName) {
                    saveResume();
                }
            });

            //watch for open and close of acoordion (education) section
            $scope.$watch(function () { return accordionOptions.isOpen }, function (n, o) {
                // open
                if (n === true) {
                } else if (n === false) {
                    //closed
                    checkForData();
                }
            });
            checkForData();
        }


        function addAward() {
            vm.data.awards.items.push({});
        }


        function removeAward(id) {
            vm.data.awards.items.splice(id, 1);
            accordionOptions.formName.$setDirty();
        }


        function saveResume() {
            resumesFactory.updateAwardsInfo({ resumeValue: dataStore.getData().resumeValue }, vm.data.awards).$promise.then(function (data) {
                //change disabled button back 
                $rootScope.busyLinks.mainBusyAction = false;
            }, function (error) {
                console.log('error', error);
                $scope.errors.push({ text: error.data.message, type: 'alert-danger' });
            });
        }

        function checkForData() {
            accordionOptions.hasData = (vm.data.awards.items.length) ? true : false;
        }


    }
})();