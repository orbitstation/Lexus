(function () {
    "use strict";
    angular.module('miniSPA').controller('accountLiteCtrl', controller);

    controller.$inject = ['$scope', '$rootScope', 'UserAccountLite', '$location', '$window', 'getStates', 'authentication', '$uibModal', 'jobSearchFactory', 'delayedSave'];

    function controller($scope, $rootScope, UserAccountLite, $location, $window, getStates, authentication, $uibModal, jobSearchFactory, delayedSave) {

        var vm = this;
        // busy button modal
        $scope.busyLinks = {
            saveUserAction: false,
            createUserAction: false
        };
        // global error list
        $rootScope.errorList = [];

        vm.updateUser = updateUser;
        vm.createUser = createUser;

        $scope.$on('$destroy', function () {
            $rootScope.errorList = [];
        });

        $rootScope.logInWatcher(onLogin, clearInfo);

        function clearInfo() {
            vm.user = {};
        }

        function onLogin() {
            getUser();
        }

        function getUser() {
            UserAccountLite.get().$promise.then(function (data) {
                vm.user = data;
                removeDate();
            });
        }

        function createUser() {
            removeDate();
            UserAccountLite.post(vm.user).$promise.then(function (data) {
                //console.log(data);
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
                                    if (callout.data.toLowerCase().indexOf('/home') > 0) {
                                        $window.location.href = '/dashboard';
                                    } else {
                                        $window.location.href = callout.data;
                                    }
                                    break;
                                }
                        }
                    }
                    else {
                        $window.location.href = '/dashboard/';
                    }

                }
                else {
                    $window.location.href = '/';
                }

            }, function () {
                pushError({ text: $rootScope.msg(365627), type: 'alert-danger' });
            });
        }

        function updateUser() {
            UserAccountLite.put(vm.user).$promise.then(function (data) {
                removeDate();
                pushError({ text: $rootScope.msg(365625), type: 'alert-success' });
                $scope.busyLinks.saveUserAction = false;
            }, function () {
                pushError({ text: $rootScope.msg(365626), type: 'alert-danger' });
            });
        }

        function pushError(alert) {
            for (var i = 0; i < $rootScope.errorList.length; i++) {
                if (angular.equals($rootScope.errorList[i], alert)) {
                    // error is alredy in the collection
                    return;
                }
            }
            $rootScope.errorList.push(alert);
        }

        function removeDate() {
            if (vm.user.militaryServiceLite.usMilitaryInvolvementID != 2) {
                delete vm.user.militaryServiceLite.availabilityToWorkDate;
            }
        }

    }
})();