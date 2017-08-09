(function () {

    angular.module('globalApp').service('timeoutManager', ['$rootScope', '$timeout', '$interval', 'authentication', '$uibModal', 'registry', timeoutManager]);

    function timeoutManager($rootScope, $timeout, $interval, authentication, $uibModal, registry) {
        var service = this;

        //                                                                               _______________
        // _____________________________________________________________________________/   Public API  \_____

        service.start = start;
        service.stop = stop;
        service.isServiceRunning = isServiceRunning;
        service.checkLoggedOutInfo = checkLoggedOutInfo;


        //                                                                               _______________________
        // _____________________________________________________________________________/   Internal variables  \_____

        var _const = {
            MINUTE_IN_MILISECONDS: 60 * 1000
        };

        //settings which will not get overriden by configuration via _options
        var _base = {
            checkActivityTimeInterval: _const.MINUTE_IN_MILISECONDS
        };

        //settings that are taken as defaults if _options configuration: a) does not define them or b) defines incorrect values
        var _defaults = {
            showWarning: true,
            timeToWarning: 10 * _const.MINUTE_IN_MILISECONDS,
            timeToLogOut: 20 * _const.MINUTE_IN_MILISECONDS
        };

        //settings that are taken from parameter given by caller when starting the service by timeoutManager.start(options)
        var _options = {};

        //final settings that are used by service
        //they are defined by merging of _base -> _options -> _defaults
        var _settings = {};


        var _status = {
            started: false,
            userIsActive: false,
            warningStarted: false
        };
        

        //                                                                               _______________________
        // _____________________________________________________________________________/   $rootScope binding  \_____

        $rootScope.timeoutManager = {};
        $rootScope.timeoutManager.timeRemainingBeforeLogout = "";


        //                                                                               _________________________
        // _____________________________________________________________________________/   Public API functions  \_____


        function start(options) {
            _processOptions(options);
            if (_settings.showWarning) {
                _finalizeSettings();
                _initStatus();
                _watchActivity();
                _checkActivity();
            }
        }


        function stop() {
            _status.started = false;
            _stopWarning();
        }


        function isServiceRunning() {
            return _status.started;
        }

        function checkLoggedOutInfo() {
            if (registry.get("public", "showLoggedOutModal", "localStorage") === true) {
                service.LoggedOutModalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'modalTimeoutLoggedOut.html',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                    }
                });
                service.LoggedOutModalInstance.result.then(function () {
                    registry.set('public', 'showLoggedOutModal', false, 'localStorage');
                }, function () {
                    registry.set('public', 'showLoggedOutModal', false, 'localStorage');
                });
            }
        }

        //                                                                               ______________________
        // _____________________________________________________________________________/   Private functions  \_____


        function _processOptions(options) {
            if (typeof (options) !== 'undefined' && typeof (options) === 'object') {
                _options = _checkOptions(options);
            }
            angular.merge(_settings, _defaults, _options, _base);
        }

        function _checkOptions(options) {
            var optionsChecked = options;
            optionsChecked = _checkShowWarning(optionsChecked);
            optionsChecked = _checkTimeToWarning(optionsChecked);
            optionsChecked = _checkTimeToLogOut(optionsChecked);
            return optionsChecked;
        }

        function _checkShowWarning(options) {
            var showWarning;
            switch (typeof (options.showWarning)) {
                case "boolean":
                    showWarning = options.showWarning;
                    break;
                case "string":
                    showWarning = options.showWarning.trim().toLowerCase() == 'true' ? true : false;
                    break;

            }
            if (typeof (showWarning) !== 'undefined') {
                options.showWarning = showWarning;
            }

            return options;
        }

        function _toNumber(value) {
            var numberValue = 0;
            switch (typeof (value)) {
                case "string":
                    numberValue = Number(value.trim());
                    break;
                case "number":
                    numberValue = value;
                    break;
            }
            return numberValue;
        }

        function _checkTimeToWarning(options) {
            var timeToWarning = _toNumber(options.timeToWarning);
            if (timeToWarning > 0) {
                options.timeToWarning = timeToWarning;
            } else {
                delete options.timeToWarning;
            }
            return options;
        }

        function _checkTimeToLogOut(options) {
            var timeToLogOut = _toNumber(options.timeToLogOut);
            if (timeToLogOut > 0) {
                options.timeToLogOut = timeToLogOut;
            } else {
                delete options.timeToLogOut;
            }
            return options;
        }

        function _finalizeSettings() {
            _settings = _compareWarningLogoutTimes(_settings);
            _countTimesInMinutes();
        }

        function _compareWarningLogoutTimes(options) {
            if (options.timeToLogOut <= options.timeToWarning) {
                options.timeToLogOut = options.timeToWarning + _const.MINUTE_IN_MILISECONDS;
            }
            return options;
        }

        function _countTimesInMinutes() {
            _settings.minutesOfInactivityBeforeWarning = _milisecondsToMinutes(_settings.timeToWarning);
            _settings.minutesOfInactivityBeforeLogout = _milisecondsToMinutes(_settings.timeToLogOut);
        }

        function _milisecondsToMinutes(timeInMiliseconds) {
            return Math.round(timeInMiliseconds / _const.MINUTE_IN_MILISECONDS);
        }

        function _initStatus() {
            _status.started = true;
            _resetRemainingTime();
        }

        function _checkActivity(checkActivityTimeInterval) {
            if (typeof (checkActivityTimeInterval) === 'undefined') {
                checkActivityTimeInterval = 0;
            }
            $timeout(function () {
                _checkActivityUnit();
                if (service.isServiceRunning()) {
                    _checkActivity(_settings.checkActivityTimeInterval);
                }
            }, checkActivityTimeInterval);
        }

        function _checkActivityUnit() {
            if (_status.userIsActive === false) {
                _checkForWarningTime();
                _checkForLogoutTime();
                _decreaseRemainingTime();
            } else {
                _prolong();
                _setUserIsInactive();
            }
        }

        function _checkForWarningTime() {
            if (_status.numOfTimeUnitsBeforeWarning <= 0 && !_status.warningStarted) {
                _startWarning();
            }
        }

        function _checkForLogoutTime() {
            if (_status.numOfTimeUnitsBeforeLogout <= 0) {
                _startLogoutProcess();
            }
        }

        function _startLogoutProcess() {
            service.stop();
            _manageLoggedOutModal();
            _callLogout();
        }

        function _callLogout() {
            //$rootScope.isAuthenticated = false;
            authentication.logout();
        }


        function _decreaseRemainingTime() {
            _decreaseNumOfTimeUnitsBeforeWarning();
            _decreaseNumOfTimeUnitsBeforeLogout();
        }

        function _decreaseNumOfTimeUnitsBeforeWarning() {
            if (_status.numOfTimeUnitsBeforeWarning > 0) {
                _status.numOfTimeUnitsBeforeWarning--;
            }
        }

        function _decreaseNumOfTimeUnitsBeforeLogout() {
            if (_status.numOfTimeUnitsBeforeLogout > 0) {
                _status.numOfTimeUnitsBeforeLogout--;
            }
        }

        function _resetRemainingTime() {
            _status.numOfTimeUnitsBeforeWarning = _settings.minutesOfInactivityBeforeWarning;
            _status.numOfTimeUnitsBeforeLogout = _settings.minutesOfInactivityBeforeLogout;
        }

        function _prolong() {
            _resetRemainingTime();
            _stopWarning();
        }

        function _setUserIsActive() {
            _status.userIsActive = true;
        }

        function _setUserIsInactive() {
            _status.userIsActive = false;
        }

        function _getTimeRemainingBeforeLogout() {
            var time = { totalSeconds: _status.timeRemainingBeforeLogout };
            time.minutes = Math.floor(_status.timeRemainingBeforeLogout / 60);
            var seconds = _status.timeRemainingBeforeLogout % 60;
            time.seconds = seconds > 9 ? seconds : "0" + seconds;
            return time;
        }

        function _countTimeRemainingBeforeLogout() {
            return _status.numOfTimeUnitsBeforeLogout * 60;
        }

        function _setTimeRemainingBeforeLogout() {
            _status.timeRemainingBeforeLogout = _countTimeRemainingBeforeLogout();
            $rootScope.timeoutManager.timeRemainingBeforeLogout = _getFormattedTimeRemainingBeforeLogout();
        }

        function _decreaseTimeRemainingBeforeLogout() {
            _status.timeRemainingBeforeLogout--;
        }

        function _getFormattedTimeRemainingBeforeLogout() {
            var remainingTime = _getTimeRemainingBeforeLogout();
            var remainingTimeText = remainingTime.minutes + ":" + remainingTime.seconds;
            return remainingTimeText;
        }

        function _startDecreasingTimeRemainingBeforeLogout() {
            service.TimeRemainingBeforeLogoutCountdown = $interval(_updateTimeRemainingBeforeLogout, 1000);
        }

        function _updateTimeRemainingBeforeLogout() {
            _decreaseTimeRemainingBeforeLogout();
            $rootScope.timeoutManager.timeRemainingBeforeLogout = _getFormattedTimeRemainingBeforeLogout();
        }

        function _manageTimeRemainingBeforeLogout() {
            _setTimeRemainingBeforeLogout();
            _startDecreasingTimeRemainingBeforeLogout();
        }

        function _manageWarningModal() {
            service.WarningModalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modalTimeoutWarning.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                }
            });
            service.WarningModalInstance.result.then(function () {
                _prolong();
            }, function () {
                _prolong();
            });
            ///_resetRemainingTime(); /// MGSOCSPP-3362: Lexus:  ticker on expired session starts counting UP when reaches zero 
        }

        function _manageLoggedOutModal() {
            service.LoggedOutModalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modalTimeoutLoggedOut.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                }
            });
            service.LoggedOutModalInstance.result.then(function () {
                registry.set('public', 'showLoggedOutModal', false, 'localStorage');
            }, function () {
                registry.set('public', 'showLoggedOutModal', false, 'localStorage');
            });
            _resetRemainingTime();
        }

        function _startWarning() {
            _status.warningStarted = true;
            _manageTimeRemainingBeforeLogout();
            _manageWarningModal();
        }

        function _stopWarning() {
            _status.warningStarted = false;
            if(service.WarningModalInstance){
                service.WarningModalInstance.close();
            }
            $interval.cancel(service.TimeRemainingBeforeLogoutCountdown);
        }

        function _watchActivity() {
            _watchClick();
            _watchKeydown();
            _watchScroll();
        }

        function _watchClick() {
            $(document).on("click", function () {
                _setUserIsActive();
            });
        }

        function _watchKeydown() {
            $(document).on("keydown", function () {
                _setUserIsActive();
            });
        }

        function _watchScroll() {
            $(window).scroll(function () {
                _setUserIsActive();
            });
        }

    }

})();