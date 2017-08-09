(function () {
    angular.module('miniSPA').service('resumeBuilderDataStore', service);

    service.$inject = ['$q', '$rootScope'];

    function service($q, $rootScope) {
        var initialDataSet = false;
        var existingResume = false;

        //basic needed data
        var data = {
            resumeBasics: {
                resumeTitle: '',
                resumeActive: false,
                resumeConfidential: false,
                resumeStatus: 'Private'
            }
        };

        var previousData = {};
        var initialData = {};
        var start = angular.copy(data);

        //exposed
        return { 
            setObj: setObj,
            getObj: getObj,
            setInitialData: setInitialData,
            getInitialData: getInitialData,
            getData: getData,
            resetData: resetData,
            isExistingResume: isExistingResume,
            setAsNewResume: setAsNewResume,
            isMilitaryService: isMilitaryService
        }

        function setObj(obj) {
            previousData = angular.copy(data);
            angular.extend(data, obj);
        }

        function getObj(key) {
            return data[key];
        }

        function setInitialData(obj) {
            angular.extend(initialData, obj);
        }

        function getInitialData(key) {
            return initialData[key];
        }

        function getData() {
            return data;
        }

        function resetData() {
            existingResume = false;
            data = angular.copy(start);
        }

        function getPreviousData() {
            return previousData;
        }

        function isExistingResume() {
            return existingResume;
        }

        function setAsNewResume() {
            existingResume = true;
        }
        
        function isMilitaryService() {
            if ($rootScope.configLayout.militaryServiceEnabled.lookUpConfig.value == 'true') {
                return true;
            }
            return getData().user.militaryService.militaryServiceType;
        }
    }
})();