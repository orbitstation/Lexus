(function () {
    "use strict";
    angular.module('miniSPA').controller('accountPage1Ctrl',
        ['$scope', '$rootScope', '$window', 'UserAccount', '$location', 'getMessage', 'getStates', 'authentication', '$uibModal', '$log', 'dataSourceService', '$filter', 'jobSearchFactory', 'savedOccupationsFactory', 'usaStateIdMapper', controller]);

    function controller($scope, $rootScope, $window, UserAccount, $location, getMessage, getStates, authentication, $uibModal, $log, dataSourceService, $filter, jobSearchFactory, savedOccupationsFactory, usaStateIdMapper) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init page variables  \_____
        //
        // define the variables as collections before the ng-incude, this will bring the includes into the same scope.

        $scope.userAccount = {
            showMailingAddress: false,
            noAddress: 2009,
            phoneNumber: {
                primaryPhone: ''
            }
        };

        $scope.userIsVerified = false;

        $rootScope.errorList = [];

        $scope.newuser = true;

        $scope.busyLinks = {
            createUserAction: false,
            saveUserAction: false
        };

        // google address auto complete
        $scope.formValues = {};
        $scope.removeAddressOnStateChange = true;

        $rootScope.onHomeAddressSelection = function (item, addressModel) {
            $scope.removeAddressOnStateChange = false;
            var addr = addressModel;
            if (addr === undefined) {
                addr = {};
            }
            addr.homeAddress = item.address;
            addr.city = item.cityName;
            addr.state = usaStateIdMapper.map(item.regionName);
            addr.postalCode = item.zipCodeId;
            //addr.county = item.provName;
        };

        $rootScope.onMailaddressSelection = function (item, addressModel) {
            $scope.removeAddressOnStateChange = false;
            var addr = addressModel;
            if (addr === undefined) {
                addr = {};
            }
            addr.mailingHomeAddress = item.address;
            addr.mailingCity = item.cityName;
            addr.mailingState = usaStateIdMapper.map(item.regionName);
            addr.mailingPostalCode = item.zipCodeId;
            //addr.mailingCounty = item.provName;
        };

        //                                                                               _________________________
        // _____________________________________________________________________________/    Get logged-in data   \_____
        //  get the user's data if logged in


        $scope.failButtonPress = function () {
            pushError({ text: $rootScope.msg(365626), type: 'alert-danger' });
        }

        $scope.successButtonPress = function () {
            pushError({ text: $rootScope.msg(365625), type: 'alert-success' });
        }

        $rootScope.logInWatcher(init);

        function init() {
            for (var x in $scope.meta.accordion) {
                $scope.meta.accordion[x].isDisabled = false;
                $scope.meta.accordion[x].show = true;
            }
            UserAccount.get().$promise.then(function (data) {
                if (data) {
                    $scope.newuser = false;
                    data.showMailingAddress = false;
                    $scope.userIsVerified = true;

                    if (data.ssnCitizenship.dateOfBirth) {
                        var isoDate = setZeroTimezone(data.ssnCitizenship.dateOfBirth);
                        if (isoDate) {
                            var dobNormalized = new Date(normalizeISODate(isoDate));
                            data.ssnCitizenship.dateOfBirth = dobNormalized;
                        }
                    }
                    if (data.address && data.address.mailingHomeAddress) {
                        data.showMailingAddress = true;
                    }
                    data.confirmEmailAddress = data.emailAddress;

                    if (data.address && data.address.country) {
                        data.address.countryLoaded = true;
                        dataSourceService.dataSource('getStates', data.address.country).then(
                            function (results) {
                                $scope.meta.state.items = results;
                            }
                        );
                    }
                    if (data.address && data.address.mailingCountry) {
                        data.address.mailingCountryLoaded = true;
                        dataSourceService.dataSource('getStates', data.address.mailingCountry).then(
                            function (results) {
                                $scope.meta.mailingState.items = results;
                            }
                        );
                    }
                }

                $scope.userAccount = data;
            });
        }

        function pushError(alert) {
            for (var i = 0; i < $rootScope.errorList.length; i++) {
                if ($rootScope.errorList[i] === alert) {
                    // error is alredy in the collection
                    return;
                }
            }
            $rootScope.errorList.push(alert);
        }

        //                                                                               ________________________
        // _____________________________________________________________________________/      Update a User     \_____
        //
        $scope.updateUser = function () {
            //if (showPosAcknowledge()) return;
            UserAccount.put($scope.userAccount).$promise.then(function () {
                pushError({ text: $rootScope.msg(365625), type: 'alert-success' });
                $scope.busyLinks.saveUserAction = false;
                //$window.location.href = "/home";
            }, function () {
                pushError({ text: $rootScope.msg(365626), type: 'alert-danger' });
            });
        };

        //                                                                               ________________________
        // _____________________________________________________________________________/      Create a User     \_____
        //
        $scope.createUser = function () {
            //if (showPosAcknowledge()) return;
            if (!$scope.userAccount.education.schoolType) {
                $scope.userAccount.education.schoolType = 0;
            }
            UserAccount.post($scope.userAccount).$promise.then(function (data) {
                if (data && data.authentication) {
                    $rootScope.track({ name: 'accountCreated' });
                    authentication.loginCallback(data.authentication, data);
                    var calloutJson = $location.search().callout;
                    if (calloutJson) {
                        var callout = JSON.parse(calloutJson);
                        switch (callout.type) {
                            case "saveAgent":
                                jobSearchFactory.createAgent(callout.data).$promise.then(function (result) {
                                    $rootScope.track({ name: 'agentCreated', location: callout.data.location, keywords: callout.data.keywords });
                                    $window.location.href = '/savedsearches/';
                                });
                                break;
                            case "saveOccupation":
                                var code = { code: callout.data };
                                savedOccupationsFactory.save(code).$promise.then(function (result) {
                                    $window.location.href = '/occupations/saved';
                                });
                                break;
                            case "redirect":
                                var safeStart = $location.protocol() + "://" + $location.host();
                                if (callout.data.startsWith(safeStart)) {
                                    console.log(callout.data);
                                    $window.location.href = callout.data;
                                    break;
                                }
                        }
                    }
                    $window.location.href = '/dashboard/';
                }
                else
                    $window.location.href = '/';
            }, function () {
                pushError({ text: $rootScope.msg(365627), type: 'alert-danger' });
            });
        };

        //                                                                               ________________________
        // _____________________________________________________________________________/  Verification Section  \_____
        //
        $scope.meta.accordion.userVerification.fn = function () {
            $scope.userIsVerified = false;

            var dob = $scope.userAccount.ssnCitizenship.dateOfBirth;

            //unifying date across timezones
            if (dob) {
                var dobNormalized = normalizeDate(dob);
                $scope.userAccount.ssnCitizenship.dateOfBirth = dobNormalized;
            }

            // check if they are older then 13 Years old
            var yearString = moment(dob).fromNow();
            if (yearString.indexOf("years") == -1) {
                $scope.open('age');
                return;
            }

            var age = yearString.replace(/[^\d]/g, '');
            if (age <= 13) {
                $scope.open('age');
                return;
            }

            //check if they are authorized to work in the US
            if ($scope.userAccount.ssnCitizenship.authorizedToWork === 2009) {
                $scope.open('auth');
                return;
            }

            // Enable all accordion if verified e
            for (var x in $scope.meta.accordion) {
                $scope.meta.accordion[x].show = true;
            }
            $scope.userIsVerified = true;

        };

        //auto set the "authorized to work" based on "citizenship" selection 
        //2008 - Yes
        //2009 - No
        $scope.$watch('userAccount.ssnCitizenship.usCitizen', function (n, o) {
            if (n === '2008') {
                $scope.userAccount.ssnCitizenship.authorizedToWork = '2008';
            }
        });

        // modal window open function
        var modalOpened = false;
        $scope.open = function (page, callBack) {
            if (modalOpened) return;
            if (page == 'age') {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'myModalContent-age.html',
                    controller: 'ModalInstanceCtrl',
                    resolve: {}
                });
            }
            if (page == 'auth') {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'myModalContent-auth.html',
                    controller: 'ModalInstanceCtrl',
                    resolve: {}
                });
            }
            if (page == 'pos') {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'posModal.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'lg',
                    resolve: {}
                });
                modalOpened = true;
            }
            modalInstance.result.then(function () {
                if (typeof (callBack) === 'function') {
                    callBack();
                } else {
                    window.location.assign('/');
                }
                modalOpened = false;
            }, function () {
                modalOpened = false;
            });
        };

        //                                                                               ____________________________________
        // _____________________________________________________________________________/   Watchers to disable bad options  \_____
        // This is for the education an Employment Section

        $scope.$watch('userAccount.education.highestEducationLevel', function (newValue, oldValue) {
            if (newValue) {
                if (newValue != 12) {
                    $scope.userAccount.education.isHighSchoolDropout = 2009;
                }
                setEducationAbove($scope.userAccount.education.highestEducationLevel);
            }
        });

        $scope.$watch('userAccount.education.isEnrolledInSchool', function (newValue, oldValue) {
            if (newValue) {
                setEducationAbove($scope.userAccount.education.highestEducationLevel);
            }
        });

        $scope.$watch('userAccount.education.employmentStatus', function (newValue, oldValue) {
            if (newValue) {
                if (newValue === "86565") {
                    $scope.userAccount.education.unemployed4Months = 2009;
                }
            }
        });

        // create a black list of options (all education below the 'highest level')
        function setEducationAbove(highest) {
            var blackList = [];
            switch (highest) {
                case 12: blackList = [86587, 86590, 86591, 86592]; break;   // "some high School"
                case 1: blackList = [86586, 86588]; break;           // "high school"
                case 2: blackList = [86586, 86588]; break;                  // "cirtification"
                case 3: blackList = [86586, 86588]; break;                  // "Vocational"
                case 9: blackList = [86586, 86588]; break;                  // "Some College"
                case 4: blackList = [86586, 86588]; break;                  // "Associate Degree"
                case 5: blackList = [86586, 86588]; break;                  // "Bachelor's Degree"
                case 6: blackList = [86586, 86588]; break;                  // "Masters Degree"
                case 7: blackList = [86586, 86588]; break;                  // "Doctorate Degree"
                case 8: blackList = [86586, 86588]; break;                  // "Professional Degree"
            }

            for (var i in $scope.meta.schoolType.items) {
                var theItem = $scope.meta.schoolType.items[i];
                theItem.disabled = false;
                if (inArray(blackList, theItem.value)) {
                    theItem.disabled = true;
                }
            }

            // a helper function that finds if a value is in an array.
            function inArray(arr, findThis) { for (var x = 0; x <= arr.length; x++) { if (arr[x] == findThis) { return true; } } return false; }
        }

        //                                                                               ____________________________________
        // _____________________________________________________________________________/   Watchers to disable bad options  \_____
        // This is for the military Section


        // military end dates must be after start dates  (veteran)
        // first tour of duty
        $scope.$watch('userAccount.militaryService.militaryCampaignStartDate', function (newVal, oldVal) {
            if (newVal) {
                if (newVal != 'today') {
                    $scope.meta.militaryCampaignEndDate.minDate = new Date(newVal);
                }
            }
        });

        $scope.$watch('userAccount.militaryService.militaryCampaignEndDate', function (newVal, oldVal) {
            if (newVal) {
                if (newVal != 'today') {
                    $scope.meta.militaryCampaignStartDate.maxDate = new Date(newVal);
                }
            }
        });

        // second tour of duty
        $scope.$watch('userAccount.militaryService.militarySecondEntryDate', function (newVal, oldVal) {
            if (newVal) {
                if (newVal != 'today') {
                    $scope.meta.militarySecondDischargeDate.minDate = new Date(newVal);
                }
            }
        });

        $scope.$watch('userAccount.militaryService.militarySecondDischargeDate', function (newVal, oldVal) {
            if (newVal) {
                if (newVal != 'today') {
                    $scope.meta.militarySecondEntryDate.maxDate = new Date(newVal);
                }
            }
        });

        // third tour of duty
        $scope.$watch('userAccount.militaryService.militaryThirdEntryDate', function (newVal, oldVal) {
            if (newVal) {
                if (newVal != 'today') {
                    $scope.meta.militaryThirdDischargeDate.minDate = new Date(newVal);
                }
            }
        });

        $scope.$watch('userAccount.militaryService.militaryThirdDischargeDate', function (newVal, oldVal) {
            if (newVal) {
                if (newVal != 'today') {
                    $scope.meta.militaryThirdEntryDate.maxDate = new Date(newVal);
                }
            }
        });

        //                                                                               ____________________________________
        // _____________________________________________________________________________/   Watchers to disable bad options  \_____
        // This is for the address Section

        // clear out the state when a new (Primary) country is selected
        $scope.$watch('userAccount.showMailingAddress', function (newValue, oldValue) {
            if (oldValue && newValue == false) {
                delete $scope.userAccount.address.mailingHomeAddress;
                delete $scope.userAccount.address.mailingHomeAddress2;
                delete $scope.userAccount.address.mailingCity;
                delete $scope.userAccount.address.mailingState;
                delete $scope.userAccount.address.mailingPostalCode;
                delete $scope.userAccount.address.mailingCountry;
                delete $scope.userAccount.address.mailingCounty;
            }
        });

        // clear out the state when a new (Mailing) country is selected
        $scope.$watch('userAccount.address.mailingCountry', function (newValue, oldValue) {
            var loaded = false;
            if ($scope.userAccount.address) {
                loaded = $scope.userAccount.address.mailingCountryLoaded;
                $scope.userAccount.address.mailingCountryLoaded = false;
            }

            if (newValue && oldValue) {
                if (!loaded) {
                    $scope.userAccount.address.mailingHomeAddress = null;
                    $scope.userAccount.address.mailingHomeAddress2 = null;
                    $scope.userAccount.address.mailingCity = null;
                    $scope.userAccount.address.mailingCounty = null;
                    $scope.userAccount.address.mailingPostalCode = null;
                    $scope.userAccount.address.mailingState = null;
                }
                dataSourceService.dataSource('getStates', newValue).then(
                    function (results) {
                        $scope.meta.mailingState.items = results;
                    }
                 );
            }
        });

        // clear out the state when a new (Primary) country is selected
        $scope.$watch('userAccount.address.country', function (newValue, oldValue) {
            var loaded = false;
            if ($scope.userAccount.address) {
                loaded = $scope.userAccount.address.countryLoaded;
                $scope.userAccount.address.countryLoaded = false;
            }

            if (newValue && oldValue) {
                if (!loaded) {
                    $scope.userAccount.address.homeAddress = null;
                    $scope.userAccount.address.homeAddress2 = null;
                    $scope.userAccount.address.city = null;
                    $scope.userAccount.address.county = null;
                    $scope.userAccount.address.postalCode = null;
                    $scope.userAccount.address.state = null;
                }
                dataSourceService.dataSource('getStates', newValue).then(
                    function (results) {
                        $scope.meta.state.items = results;
                    }
                 );
            }
        });

        // when changing the state on addresses section , delete the county and zip (primary)
        $scope.$watch('userAccount.address.state', function (newValue, oldValue) {
            if ($scope.removeAddressOnStateChange) {
                if ($scope.newuser) {
                    if (newValue) {
                        delete $scope.userAccount.address.postalCode;
                        delete $scope.userAccount.address.county;
                    }
                } else {
                    if (newValue && oldValue) {
                        delete $scope.userAccount.address.postalCode;
                        delete $scope.userAccount.address.county;
                    }
                }
            }
            $scope.removeAddressOnStateChange = true;
            
        });

        // when changing the state on addresses section , delete the county and zip (mailing)
        $scope.$watch('userAccount.address.mailingState', function (newValue, oldValue) {
            if ($scope.removeAddressOnStateChange) {
                if ($scope.newuser) {
                    if (newValue) {
                        delete $scope.userAccount.address.mailingPostalCode;
                        delete $scope.userAccount.address.mailingCounty;
                    }
                } else {
                    if (newValue && oldValue) {
                        delete $scope.userAccount.address.mailingPostalCode;
                        delete $scope.userAccount.address.mailingCounty;
                    }
                }
            }
            $scope.removeAddressOnStateChange = true;
        });

        // check for no home address / mail me combanation
        $scope.$watch('userAccount.noAddress', function (newValue, oldValue) {
            if (newValue) {
                if ($scope.userAccount.noAddress == '2008') {
                    if ($scope.userAccount.address) {
                        // set Address model to null if noAddress , 
                        // note: this will be taken care of in a diffrent way, once the "model cleanup" story is implimented.
                        delete $scope.userAccount.address.homeAddress;
                        delete $scope.userAccount.address.homeAddress2;
                        delete $scope.userAccount.address.city;
                        delete $scope.userAccount.address.state;
                        delete $scope.userAccount.address.postalCode;
                        delete $scope.userAccount.address.country;
                        delete $scope.userAccount.address.county;
                    }
                    // if they have no address, and they have selected mail me, as there contact prefrence
                    $scope.setItemsDisable(6, $scope.meta.preferredContactMethod.items, true);
                    $scope.setItemsDisable(6, $scope.meta.primaryPhoneType.items, true);
                    $scope.setItemsDisable(6, $scope.meta.telephoneNumber2Type.items, true);
                    $scope.setItemsDisable(6, $scope.meta.telephoneNumber3Type.items, true);
                } else {
                    $scope.setItemsDisable(6, $scope.meta.preferredContactMethod.items, false);
                    $scope.setItemsDisable(6, $scope.meta.primaryPhoneType.items, false);
                    $scope.setItemsDisable(6, $scope.meta.telephoneNumber2Type.items, false);
                    $scope.setItemsDisable(6, $scope.meta.telephoneNumber3Type.items, false);
                }
            }
        });

        //                                                                               ____________________________________
        // _____________________________________________________________________________/   Watchers to disable bad options  \_____
        // This is for the contact Section (phone numbers)

        // utility function to set a meta.items disabled flag
        $scope.setItemsDisable = function (targetValue, itemsList, bool) {
            for (var y in itemsList) {
                var v = itemsList[y].value;
                if (v != undefined) {
                    if (v == targetValue) {
                        itemsList[y].disabled = bool;
                        break;
                    }
                }
            }
        };

        $scope.resetAllDisabled = function (itemsList, bool) {
            if (itemsList) {
                for (var y in itemsList) {
                    itemsList[y].disabled = bool;
                }
            }
        };

        // listen for the model to be instantiated, then add listeners for validation
        $scope.$watchCollection('userAccount.phoneNumber', function (newValues) {


            // listen on phone type changes, disable the other phone types, based on the ones selected (each type can only be used once)
            $scope.$watchGroup([
                'userAccount.phoneNumber.primaryPhoneType',
                'userAccount.phoneNumber.alternatePhone1Type',
                'userAccount.phoneNumber.alternatePhone2Type'], function (newValue, oldValue) {
                    $scope.resetAllDisabled($scope.meta.primaryPhoneType.items, false);
                    $scope.resetAllDisabled($scope.meta.telephoneNumber2Type.items, false);
                    $scope.resetAllDisabled($scope.meta.telephoneNumber3Type.items, false);
                    for (var x in newValue) {
                        if ((newValue[x] != undefined) && (newValue[x] != "")) {
                            if (x != 0) {
                                $scope.setItemsDisable(newValue[x], $scope.meta.primaryPhoneType.items, true);
                            }

                            if (x != 1) {
                                $scope.setItemsDisable(newValue[x], $scope.meta.telephoneNumber2Type.items, true);
                            }

                            if (x != 2) {
                                $scope.setItemsDisable(newValue[x], $scope.meta.telephoneNumber3Type.items, true);
                            }

                        }
                    }
                });


            // Alternate Phone Check: enables the alt phone contect method pulldown base on the presents of (alternatePhone1 or alternatePhone1)
            $scope.$watchGroup(['userAccount.phoneNumber.alternatePhone1', 'userAccount.phoneNumber.alternatePhone2'], function (newValue, oldValue) {
                var hasAltPhone = false;
                for (var x in newValue) {
                    if (newValue[x]) {
                        hasAltPhone = true;
                    }
                }

                if (hasAltPhone) {
                    $scope.setItemsDisable(4, $scope.meta.preferredContactMethod.items, false);
                } else {
                    $scope.setItemsDisable(4, $scope.meta.preferredContactMethod.items, true);
                }
            });

            // allow text Message Check: dis-ables the "text" on the prefered contect pull down if text message is not selected.
            $scope.$watch('userAccount.phoneNumber.isMobile', function (newValue, oldValue) {
                if (newValue == true) {
                    $scope.setItemsDisable(2, $scope.meta.preferredContactMethod.items, false);
                } else {
                    $scope.setItemsDisable(2, $scope.meta.preferredContactMethod.items, true);
                }
            });

            // mobile number Check: dis-ables "mobile" on contact method pull down if no moble number is selected (mobile is primary phone)
            $scope.$watchGroup(['userAccount.phoneNumber.primaryPhoneType', 'userAccount.phoneNumber.alternatePhone1Type', 'userAccount.phoneNumber.alternatePhone2Type'], function (newValue, oldValue) {
                var isMobile = false;
                for (var x in newValue) {
                    if (newValue[x] == 3) {
                        isMobile = true;
                    }
                }
                if (isMobile == true) {
                    // enable mobile contact option
                    $scope.setItemsDisable(8, $scope.meta.preferredContactMethod.items, false);
                } else {
                    // dis-enable mobile contact option
                    $scope.setItemsDisable(2, $scope.meta.preferredContactMethod.items, true);
                    $scope.setItemsDisable(8, $scope.meta.preferredContactMethod.items, true);
                }
            });
        });

        //                                                                               _______________________________
        // _____________________________________________________________________________/   priority of Service check   \_____
        //check if user is qualified for priority of service; and if so, open a popup to have him acknowledge

        $scope.$watch('userAccount', function (newVal, oldVal) {
            if (newVal) {
                var m = newVal.militaryService;
                if (m) {
                    var isVeteran = m.veteran == 2008;
                    var isSpouse = m.spouseOfDisabledVet == 2008;
                    var isTitle10 = m.title10Activation == 84288;
                    var hasDis = m.characterOfService == 86773;
                    var isPosUser = m.militaryServiceType && ((isVeteran || isSpouse || isTitle10) && !hasDis);

                    if (m.characterOfService) {
                        // you got priority of service status (after clicking acknolage)
                        if (isPosUser == true) {
                            if ((m.isIdentifiedPosUser == false) || (m.isIdentifiedPosUser == null)) {
                                $scope.open(
                                    'pos',
                                    function () { $scope.userAccount.militaryService.isIdentifiedPosUser = true; }
                                );
                            }
                        }
                            // you just lost Prioirity of service status
                        else {
                            $scope.userAccount.militaryService.isIdentifiedPosUser = false;
                        }
                    }
                }
            }
        }, true);

        function normalizeDate(inputDate) {
            if (inputDate) {
                if (inputDate.getTimezoneOffset() >= 0) {
                    var dateNormalised = new Date(inputDate.setHours(0, 0, 0, 0));
                } else {
                    var dateNormalised = new Date(inputDate.setHours(23, 0, 0, 0));
                }
                return dateNormalised;
            }
            return false;
        }

        function normalizeISODate(inputDate) {
            if (inputDate) {
                var jsDate = new Date(inputDate);
                if (jsDate.getTimezoneOffset() >= 0) {
                    jsDate.setUTCHours(12);
                } else {
                    jsDate.setUTCHours(9);
                }
                var dateNormalised = jsDate;
                return dateNormalised;
            }
            return false;
        }

        function setZeroTimezone(inputDate) {
            if (inputDate) {
                if (inputDate.slice(-1).toLowerCase() != "z") {
                    inputDate = inputDate + "Z";
                }
                return inputDate;
            }
            return false;
        }

    }
})();
