(function () {
    "use strict"
    angular.module('miniSPA').controller('referencesCtrl', controller);
    controller.$inject = ['$scope', '$rootScope', 'resumeBuilderDataStore', 'resumesFactory', 'dataSourceService', 'utilityService'];

    function controller($scope, $rootScope, resumeBuilderDataStore, resumesFactory, dataSourceService, utilityService) {

        // set up the Scope variables (vm = $scope)
        var vm = this;
        var dataStore = resumeBuilderDataStore;
        var accordionName = 'references';
        var accordionMeta = $rootScope.meta;
        var accordionOptions = accordionMeta.accordion[accordionName];
        var watchers = [];

        // templated bindable functions
        vm.data = {
            references: dataStore.getData().references
        };
        vm.thisForm = accordionOptions.formName;

        //custom bindable functions 
        vm.saveResume = saveResume;
        vm.removeReference = removeReference;
        vm.addReference = addReference;


        // initilize the education section
        activate();


        //                                                                               ___________________________
        // _____________________________________________________________________________/  Education tab Functions  \_____

        function activate() {
            // templated save function when next section button is clicked
            $scope.$on("moveToNextSection", function (event, data) { if (data.clickedFrom == accordionName) { saveResume(); } });


            utilityService.onOpenCloseWatcher(function () { return accordionOptions.isOpen }, onOpen, onClose, $scope);
            function onOpen() { }

            function onClose() {
                checkForData();
            }

            $scope.$watch('vm.data.references.items', function (newValues, oldValues) {
                if (oldValues && oldValues) {
                    for (var x in newValues) {
                        vm.data.references.items[x].contactMethodSelected = true;
                        if ((!newValues[x].phone && !newValues[x].email)) {
                            vm.data.references.items[x].contactMethodSelected = false;
                        }
                        if (newValues[x].hasPhone == undefined) {
                            if (!newValues[x].phone) {
                                newValues[x].hasPhone = [false];
                            } else {
                                newValues[x].hasPhone = [true];
                            }
                        }
                        if (newValues[x].hasEmail == undefined) {
                            if (!newValues[x].email) {
                                newValues[x].hasEmail = [false];
                            } else {
                                newValues[x].hasEmail = [true];
                            }
                        }



                        if (newValues[x].hasPhone && newValues[x].hasEmail) {
                            if (newValues[x].hasPhone[0] == undefined && newValues[x].hasEmail[0] == undefined) {
                                newValues[x].contactMethodSelected = false;
                            }
                        }
                    }
                }
            }, true);

            checkForData();
        }


        function removeReference(id) {
            vm.data.references.items.splice(id, 1);
            accordionOptions.formName.$setDirty();
        };


        function addReference(value) {
            vm.data.references.items.push({hasPhone: [true], hasEmail: [true]});
        }


        function saveResume() {
            // scrub data that is not selected
            for (var x in vm.data.references.items) {
                if (vm.data.references.items[x].hasPhone && vm.data.references.items[x].hasPhone[0] == null) {
                    vm.data.references.items[x].phone = '';
                }
                if (vm.data.references.items[x].hasEmail && vm.data.references.items[x].hasEmail[0] == null) {
                    vm.data.references.items[x].email = '';
                }
            }
            
            resumesFactory.referencesInfo({ resumeValue: dataStore.getData().resumeValue }, vm.data.references).$promise.then(function (data) {
                //change disabled button back 
                $rootScope.busyLinks.mainBusyAction = false;
            }, function (error) {
                console.log('error', error);
                $scope.errors.push({ text: error.data.message, type: 'alert-danger' });
            });
        }

        function checkForData() {
            accordionOptions.hasData = (vm.data.references.items.length) ? true : false;
        }


    }
})();