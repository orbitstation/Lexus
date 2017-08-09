(function (angular) {
    'use strict';
    angular.module('globalApp').run(
        ['delayedSave', 'budgetCalculatorFactory', 'careerPersonalityFactory', 'savedJobsFactory', 'jobSearchFactory', '$rootScope',
    function (delayedSave, budgetCalculatorFactory, careerPersonalityFactory, savedJobsFactory, jobSearchFactory, $rootScope) {
        delayedSave.addPersistor('budgetCalc', function(itemForSaveObj) {
            return budgetCalculatorFactory.saveExpenses(itemForSaveObj).$promise;
        });
        delayedSave.addPersistor('careerPersonality', function (itemForSaveObj) {
            return careerPersonalityFactory.saveAnswersAndScore(itemForSaveObj).$promise;
        });
        delayedSave.addPersistor('saveJob', function (itemForSaveObj) {
            return savedJobsFactory.saveJob(itemForSaveObj).$promise.then(function (response) {
                $rootScope.$broadcast('savedDelay', { data: response, service: 'saveJob' });
            },
            function (response) {
                $rootScope.topMasterErrors.push({ type: 'alert-danger', text: ((response && response.data && response.data.message) ? response.data.message : '') });
            });
        });
        delayedSave.addPersistor('saveAgent', function (itemForSaveObj) {
            return jobSearchFactory.createAgent(itemForSaveObj).$promise.then(function (response) {
                $rootScope.$broadcast('savedDelay', { data: response.agentID, service: 'saveAgent' });
            },
            function (response) {
                $rootScope.topMasterErrors.push({ type: 'alert-danger', text: ((response && response.data && response.data.message) ? response.data.message : '') });
            });
        });
    }]);

    // configure tracking user id (equal to user id), when user logout reset it to zero, when user login set it to [id]
    angular.module('globalApp').run(['$rootScope', 'registry', 'UserAccount', function ($rootScope, registry, UserAccount) {
        $rootScope.$watch('isAuthenticated', function (newValue, oldValue) {
            if (newValue !== oldValue)
            {
                if (newValue)
                {
                    UserAccount.get({ levelOfDetail: 'id' }).$promise.then(function (data) {
                        var id = data.trackingID;
                        registry.set('global', 'trackUserID', id, 'sessionStorage');
                    });
                }
                else
                {
                    registry.set('global', 'trackUserID', 0, 'sessionStorage');
                }
            }
        });
    }]);

    angular.module('globalApp').config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false,
            rewriteLinks: false
        });
        $locationProvider.hashPrefix('');
    }]);

    // configure data sources
    angular.module('globalApp').run(['dataSourceService', 'getLookupCareerPlanByName', 'getLookup', 'getLookupByName', 'builderFieldId', 'getFieldInfo', 'getLanguages', 'getLanguageProficiencies', 'getStates', 'getStatesText', 'getStatesAbbr', 'getOccupationIndustries', 'getOccupationMilitaryBranches', 'getCustomLookupOnId', 'getCustomLookupOnIdParentId',
        function (dataSourceService, getLookupCareerPlanByName, getLookup, getLookupByName, builderFieldId, getFieldInfo, getLanguages, getLanguageProficiencies, getStates, getStatesText, getStatesAbbr, getOccupationIndustries, getOccupationMilitaryBranches, getCustomLookupOnId, getCustomLookupOnIdParentId) {

        dataSourceService.addProvider('getLookupCareerPlanByName', function (newValue) {
            return getLookupCareerPlanByName.get({ name: newValue }).$promise.then(function (data) {
                    return data;
            });
        });
        dataSourceService.addProvider('getLookup', function (newValue) {
            return getLookup.get({ name: newValue }).$promise.then(function (data) {
                return data.items;
            });
        });
        dataSourceService.addProvider('getLookupByName', function (newValue) {
            return getLookupByName.get({ name: newValue }).$promise.then(function (data) {
                return data.items;
            });
        });
        dataSourceService.addProvider('builderFieldId', function (newValue) {
            return builderFieldId.get({ lookUp: newValue }).$promise.then(function (data) {
                data = data.referenceList.referenceListItems;
                var t = [];
                var z;
                for (z = 0; z < data.length; z++) {
                    t.push({ text: data[z].displayedText, value: data[z].referenceListItemId });
                }
                return t;
            });
        });
        dataSourceService.addProvider('getCustomReferenceListItems', function (newValue) {
            return getFieldInfo.get({ lookUp: newValue }).$promise.then(function (data) {
                var t = new Object(new Array());
                var z;
                for (z = 0; z < data.length; z++) {
                    t[z] = new Object({ text: data[z].displayedText, value: data[z].referenceListItemId });
                }
                return t;
            });
        });
        dataSourceService.addProvider('getLanguages', function () {
            return getLanguages.get().$promise.then(function (data) {
                return data.items;
            });
        });
        dataSourceService.addProvider('getLanguageProficiencies', function () {
            return getLanguageProficiencies.get().$promise.then(function (data) {
                return data.items;
            });
        });
        dataSourceService.addProvider('getStates', function (newValue) {
            return getStates.get({ countryId: newValue }).$promise.then(function (data) {
                return data.items;
            });
        });

        dataSourceService.addProvider('getStatesIdAsValue', function (newValue) {
            return getStates.get({ countryId: newValue }).$promise.then(function (data) {
                var items = [];
                angular.forEach(data, function (value) {
                    items.push({ text: value.text, value: value.value });
                });
                return items;
            });
        });

        dataSourceService.addProvider('getStatesText', function (newValue) {
            return getStatesText.get({ countryId: newValue }).$promise.then(function (data) {
                return data.items;
            });
        });
        dataSourceService.addProvider('getStatesAbbr', function (newValue) {
            return getStatesAbbr.get({ countryId: newValue }).$promise.then(function (data) {
                return data.items;
            });
        });
        dataSourceService.addProvider('getOccupationIndustries', function () {
            return getOccupationIndustries.get().$promise.then(function (data) {
                var items = [];
                for (var x = 0; x < data.length; x++) {
                    items.push({ text: data[x].text, value: data[x].value });

                }

                return items;
            });
        });
        dataSourceService.addProvider('getOccupationMilitaryBranches', function () {
            return getOccupationMilitaryBranches.get().$promise.then(function (data) {
                var items = [];
                angular.forEach(data, function (value) {
                    items.push({ text: value.displayedText, value: value.displayRefCode });
                });
                return items;
            });
        });
        dataSourceService.addProvider('getCustomLookupOnId', function (newValue) {
            return getCustomLookupOnId.get({ id: newValue }).$promise.then(function (data) {
                var items = [];
                angular.forEach(data, function (value) {
                    items.push({ text: value.displayedText, value: value.referenceListItemId });
                });
                return items;
            });
        });
        dataSourceService.addProvider('getCustomLookupOnIdParentId', function (newValue, newValue2) {
            return getCustomLookupOnIdParentId.get({ id: newValue, parentId: newValue2 }).$promise.then(function (data) {
                var items = [];
                angular.forEach(data, function (value) {
                    items.push({ text: value.displayedText, value: value.referenceListItemId });
                });
                return items;
            });
        });

    }]);
})(angular);