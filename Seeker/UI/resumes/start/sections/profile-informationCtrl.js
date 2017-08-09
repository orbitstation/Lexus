(function () {
    'use strict';
    angular.module('miniSPA').controller('ProfileInformation', ProfileInformationController);

    ProfileInformationController.$inject = ['$scope', '$rootScope', 'resumeBuilderDataStore', 'resumesFactory', 'UserAccount', 'utilityService', '$cookies', '$http', 'dataSourceService', '$uibModal', '$log', '$q', '_', 'usaStateIdMapper'];
    function ProfileInformationController($scope, $rootScope, resumeBuilderDataStore, resumesFactory, UserAccount, utilityService, $cookies, $http, dataSourceService, $uibModal, $log, $q, _, usaStateIdMapper) {
        //view model
        var vm = this;
        //data store service
        var dataStore = resumeBuilderDataStore;
        var levelOfDetail = 'ContactInfo';
        var accordionName = 'profileInformation';
        var noRevert = 'noRevert';
        var accordionMeta = $rootScope.meta;
        var accordionOptions = accordionMeta.accordion[accordionName];
        var watchers = [];
        var initialUserData = {};
        var removeAddressOnStateChange = true;

        //vm binding 
        vm.data = {};
        
        vm.onHomeAddressSelection = function (item, addressModel) {
            removeAddressOnStateChange = false;
            var addr = addressModel;
            if (addr === undefined) {
                addr = {};
            }
            addr.homeAddress = item.address;
            addr.city = item.cityName;
            addr.state = usaStateIdMapper.map(item.regionName);
            addr.postalCode = item.zipCodeId;
        };

        //attaching save function to the accordion settings
        accordionOptions.fn = saveResume;

        getData(true);

        //on accordion open/close
        utilityService.onOpenCloseWatcher(function () { return accordionOptions.isOpen }, onOpen, onClose, $scope);
        function onOpen() {
            getData(true);
            watchPhoneNumbers();
            watchCountries();
            watchState();
            if ($rootScope.registry.localStore.global.context.ChannelAlias === 'MGSMIL') {
                mgsMilRelated();
            }
        }

        function onClose() {
            dataStore.setObj({ user: vm.data.user });
            utilityService.destroyWatchers(watchers);
            checkForData();
        }

        function getData(updateInitialData) {
            //get data from db if dataStore doesn't have it
            if (dataStore.getData().user === undefined || dataStore.getData().user === null) {
                resumesFactory.getResume({ resumeValue: dataStore.getData().resumeValue, levelOfDetail: levelOfDetail }).$promise.then(function (data) {
                    vm.data = data;
                    dataStore.setObj(data);
                    if (updateInitialData) {
                        initialUserData = angular.copy(data.user);
                        dataStore.setInitialData({ user: initialUserData });
                    }
                    if (vm.data.user.address.country === 0) {
                        vm.data.user.address.country = 164;
                    }
                    getStates(vm.data.user.address.country);
                    checkForData();
                });
            } else {
                vm.data.user = dataStore.getData().user;
                if (updateInitialData) {
                    initialUserData = angular.copy(vm.data.user);
                    dataStore.setInitialData({ user: initialUserData });
                }
                if (vm.data.user.address.country === 0) {
                    vm.data.user.address.country = 164;
                }
                getStates(vm.data.user.address.country);
                checkForData();
            }
        }

        function watchCountries() {
            var destroyCountryWatcher = $scope.$watch(function () { return vm.data.user.address.country }, function (newCountry, oldCountry) {
                if (newCountry !== undefined && newCountry !== oldCountry) {
                    clearAddress('state');
                    getStates(newCountry);
                }
            });
            watchers.push(destroyCountryWatcher);
        }

        function watchState() {
            var destroyStateWatcher = $scope.$watch(function () { return vm.data.user.address.state }, function (n, o) {
                if (n > 0 && n !== o) {
                    if (removeAddressOnStateChange) {
                        vm.data.user.address.postalCode = '';
                        //clearAddress();
                    }
                    removeAddressOnStateChange = true;
                }
            });
            watchers.push(destroyStateWatcher);
        }

        function clearAddress(type) {
            var addr = vm.data.user.address;
            vm.homeAddress = null;
            addr.homeAddress = null;
            addr.city = null;
            if (type === 'state') {
                addr.state = 0;
            }
            addr.postalCode = null;
        }

        function getStates(val) {
            dataSourceService.dataSource('getStates', val).then(
                function (results) {
                    accordionMeta.state.items = results; 
                });
        }

        // listen on phone type changes, 
        // disable the other phone types, 
        // based on the ones selected (each type can only be used once)
        function watchPhoneNumbers() {
            var destroyPhoneNumbersWatcher = $scope.$watch(function () { return vm.data.user.phoneNumber }, function (newValues) {
                watchPhoneTypes(newValues);
            });
            watchers.push(destroyPhoneNumbersWatcher);
        }

        function watchPhoneTypes(phone) {
            var destroyPhoneTypesWatcher = $scope.$watchGroup([
                    function () { return phone.primaryPhoneType },
                    function () { return phone.alternatePhone1Type },
                    function () { return phone.alternatePhone2Type }
            ],
            function (newVal) {
                utilityService.resetAllDisabled(accordionMeta.primaryPhoneType.items, false);
                utilityService.resetAllDisabled(accordionMeta.telephoneNumber2Type.items, false);
                utilityService.resetAllDisabled(accordionMeta.telephoneNumber3Type.items, false);
                for (var x in newVal) {
                    if ((newVal[x] != undefined) && (newVal[x] != '') && (newVal[x] != null)) {
                        if (x != 0) {
                            utilityService.setItemsDisable(newVal[x], accordionMeta.primaryPhoneType.items, true);
                        }
                        if (x != 1) {
                            utilityService.setItemsDisable(newVal[x], accordionMeta.telephoneNumber2Type.items, true);
                        }
                        if (x != 2) {
                            utilityService.setItemsDisable(newVal[x], accordionMeta.telephoneNumber3Type.items, true);
                        }
                    }
                }
            });
            watchers.push(destroyPhoneTypesWatcher);
        }

        //Mil Only
        function mgsMilRelated() {
            var cookie = $cookies.get('LoginInfo');
            if (cookie) {
                $http({
                    method: 'GET',
                    url: $rootScope.productVariables.rootUrl + '/seeker/api/channels/mgsmil/me',
                    headers: { 'MilLogInfoCookie': cookie }
                }).then(function (success) {
                    //console.log(success);
                    vm.data.user.firstName = success.data.firstName;
                    vm.data.user.lastName = success.data.lastName;
                },
                function (err) {
                    console.log(err);
                });
            }
        }

        //triggers a modal and returning promises
        function saveResume() {
            //MGSOCSPP-3083
            if (!('county' in initialUserData.address)) {
                initialUserData.address['county'] = vm.data.user.address.county;
            }

            if (!('alternatePhone2' in initialUserData.phoneNumber) && 'alternatePhone2' in vm.data.user.phoneNumber && vm.data.user.phoneNumber.alternatePhone2.length === 0) {
                initialUserData.phoneNumber['alternatePhone2'] = vm.data.user.phoneNumber.alternatePhone2;
            }
               
            if (!('alternatePhone1' in initialUserData.phoneNumber) && 'alternatePhone1' in vm.data.user.phoneNumber && vm.data.user.phoneNumber.alternatePhone1.length === 0) {
                initialUserData.phoneNumber['alternatePhone1'] = vm.data.user.phoneNumber.alternatePhone1;
            }
            
            if (!angular.equals(initialUserData, vm.data.user)) {
                if ($rootScope.resumeCount > 1) {
                    return modalConfirm(onConfirm, onDecline);
                }
                else {
                    onConfirm();
                    removeBtnBusy();
                    return $q.reject('goNext');
                }
            } else {
                removeBtnBusy();
                return $q.reject('goNext');
            }
        }

        function onConfirm() {
            dataStore.setInitialData({ user: vm.data.user });
            return UserAccount.put(vm.data.user).$promise.then(function (data) {
                removeBtnBusy();
                initialUserData = angular.copy(data);
                dataStore.setInitialData({ user: initialUserData });
                vm.data.user = data;
            }, function (error) {
                $q.reject(error);
            });
        }

        function onDecline(data) {
            //checking for reject argument ('noRevert')
            if (data !== noRevert) {
                vm.data.user = angular.copy(initialUserData);
            }
            removeBtnBusy();
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

        function removeBtnBusy() {
            $rootScope.busyLinks.mainBusyAction = false;
        }

        function checkForData() {
            accordionOptions.hasData = !_.isEmpty(vm.data.user);
        }
    }
})();