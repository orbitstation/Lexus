(function () {
    angular.module('miniSPA').controller('eventDetailsCtrl',
        ['$scope', '$rootScope', '$routeParams', 'events', 'UserAccount', controller]);

    function controller($scope, $rootScope, $routeParams, events, UserAccount) {
        var eventId = $routeParams.eventId;
        $scope.registrationError = [];

        //Buttons that should not double click
        $scope.busyLinks = {
            register: false,
            unregister: false
        };
        getDetails();

        $rootScope.logInWatcher(function () {
            if ($scope.clickedRegistrationForm) {
                getDetails().then(registerForm);
            }
        });

        //functions for view
        $scope.register = register;
        $scope.unregister = unregister;
        $scope.registerForm = registerForm;
        $scope.cancelRegistration = cancelRegistration;

        function register() {
            if (!$scope.event.isUserRegistered) {
                events.register({ 'eventId': eventId }).$promise.then(function (data) {
                    getDetails().then(function () {
                        $scope.busyLinks.register = false;
                        cancelRegistration();
                    });
                }, function (err) {
                    $scope.registrationError.push({
                        type: 'alert-danger',
                        text: err.message
                    });
                });
            }
        }

        function registerForm() {
            $scope.clickedRegistrationForm = true;
            if ($rootScope.isAuthenticated) {
                //Open workshop user info with register button
                if (!$scope.registrationComplete && $scope.isWorkshop && !$scope.event.isUserRegistered) {
                    $scope.registrationActive = true;
                    $scope.formUrl = '/UI/events/details/event-registration.html';
                    UserAccount.get().$promise.then(function (data) {
                        $scope.busyLinks.register = false;
                        $scope.user = data;
                    });
                }
                    //Register event
                else if (!$scope.event.isUserRegistered) {
                    register();
                }
            } else {
                $rootScope.login.boxOpen = true;
            }
        }

        function unregister() {
            if ($rootScope.isAuthenticated) {
                events.unregister({ 'eventId': eventId }).$promise.then(function (data) {
                    getDetails().then(function () {
                        $scope.busyLinks.unregister = false;
                    });
                });
            }
        }

        function cancelRegistration() {
            $scope.registrationActive = false;
            if ($scope.formUrl) {
                delete $scope.formUrl;
            }
        }

        function getDetails() {
            //Get event info and format dates.
            return events.getEvent({ 'eventId': eventId }).$promise.then(function (data) {
                $scope.event = data;
                //console.log(data);
                var startDate = moment(data.start);
                var endDate = moment(data.end);
                var formatDate = 'MMMM d, YYYY';
                var formatTime = 'h a';

                $scope.isSameDay = (endDate.diff(startDate, 'days') === 0) ? true : false;

                $scope.startDate = startDate.format(formatDate);
                $scope.startTime = startDate.format(formatTime);
                $scope.endDate = endDate.format(formatDate);
                $scope.endTime = endDate.format(formatTime);

                $scope.isWorkshop = (data.category.toLowerCase() == 'workshop') ? true : false;

                if (data.isUserRegistered && $scope.isWorkshop) {
                    $scope.status = 'workshopComplete';
                }
                else if (data.isUserRegistered && !$scope.isWorkshop) {
                    $scope.status = 'eventComplete';
                }
                else if ($scope.isWorkshop) {
                    $scope.status = 'workshopAction';
                }
                else {
                    $scope.status = 'eventAction';
                }
            });
        }
    }
})();