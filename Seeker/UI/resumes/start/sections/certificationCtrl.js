(function () {
    "use strict"
    angular.module('miniSPA').controller('certificationCtrl', controller);
    controller.$inject = ['$scope', '$rootScope', 'resumeBuilderDataStore', 'resumesFactory', 'dataSourceService', 'utilityService', 'autoCompleteFactory'];

    function controller($scope, $rootScope, resumeBuilderDataStore, resumesFactory, dataSourceService, utilityService, autoCompleteFactory) {

        // set up the Scope variables (vm = $scope)
        var vm = this;
        var dataStore = resumeBuilderDataStore;
        var accordionName = 'certification';
        var accordionMeta = $rootScope.meta;
        var accordionOptions = accordionMeta.accordion[accordionName];
        var watchers = [];

        // templated bindable functions
        vm.data = {
            certifications: dataStore.getData().certifications
        };

        //custom bindable functions 
        vm.addCertification = addCertification;
        vm.removeCertification = removeCertification;
        vm.certificationsHandler = certificationsHandler;
        vm.certificationsFormatter = certificationsFormatter;
        vm.certInstitutionNamesHandler = certInstitutionNamesHandler;
        vm.certInstitutionNamesFormatter = certInstitutionNamesFormatter;
        vm.saveResume = saveResume;

        // initilize the education section
        activate();

        //                                                                               ___________________________
        // _____________________________________________________________________________/  Education tab Functions  \_____

        function activate() {

            if (vm.data.certifications && vm.data.certifications.items.length > 0) {
                buildCertDate(vm.data.certifications);
            }

            // templated save function when next section button is clicked
            $scope.$on("moveToNextSection", function (event, data) { if (data.clickedFrom == accordionName) { saveResume(); } });

            //watch for open and close of acoordion (education) section
            $scope.$watch(function () { return accordionOptions.isOpen }, function (n, o) {
                // open
                if (n === true) {
                    buildCertDate(vm.data.certifications);
                } else if (n === false) {
                    //closed
                    utilityService.destroyWatchers(watchers);
                    checkForData();
                }
            });

            checkForData();
        }

        function certificationsHandler(userInputString, timeoutPromise) {
            return autoCompleteFactory.certifications({ query: userInputString, maxResults: 5 }, { timeout: timeoutPromise }).$promise;
        }

        function certificationsFormatter(result) {
            return responseFormatter(result, $rootScope.meta.certName);
        }

        function certInstitutionNamesHandler(userInputString, timeoutPromise) {
            return autoCompleteFactory.certificationinstitutions({ query: userInputString, maxResults: 5 }, { timeout: timeoutPromise }).$promise;
        }

        function certInstitutionNamesFormatter(result) {
            return responseFormatter(result, $rootScope.meta.certInstitutionName);
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

        function addCertification() {
            vm.data.certifications.items.push({});
        }

        function buildCertDate(certs) {
            for (var i = 0; i < certs.items.length; i++) {
                if (certs.items[i].monthAcquired > 0 && certs.items[i].yearAcquired > 0) {
                    var month = certs.items[i].monthAcquired - 1;
                    var year = certs.items[i].yearAcquired;
                    certs.items[i].date = new Date(year, month, 1);
                }
            }
        }

        function parseDate(certs) {
            for (var i = 0; i < certs.items.length; i++) {
                var date = certs.items[i].date;
                if (date) {
                    certs.items[i].monthAcquired = date.getMonth() + 1;
                    certs.items[i].yearAcquired = date.getFullYear();
                }
            }
        }

        function removeCertification(id) {
            vm.data.certifications.items.splice(id, 1);
            accordionOptions.formName.$setDirty();
        }

        function saveResume() {
            parseDate(vm.data.certifications);
            resumesFactory.updateCertificationInfo({ resumeValue: dataStore.getData().resumeValue }, vm.data.certifications).$promise.then(function (data) {
                //change disabled button back 
                $rootScope.busyLinks.mainBusyAction = false;
                dataStore.setObj(vm.data);
            }, function (error) {
                console.log('error', error);
                $scope.errors.push({ text: error.data.message, type: 'alert-danger' });
            });
        }

        function checkForData() {
            accordionOptions.hasData = (vm.data.certifications.items.length) ? true : false;
        }

    }
})();