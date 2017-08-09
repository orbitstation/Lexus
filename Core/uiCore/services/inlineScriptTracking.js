(function (angular) {
    "use strict";
    angular.module('globalApp').service('inlineScriptTracking', ['$window', '$q', '$timeout', function ($window, $q, $timeout) {
        var _config = null;
        var _configured = false;

        function configure(config) {
            var deferred = $q.defer();
            if (!_configured) {
                _configured = true;

                // added base64 decoding of the script (needed for cookies to function)
                eval(atob(config.inlineScript));
            }
            deferred.resolve();
            return deferred.promise;
        }

        return {
            name: "InlineScript",
            configure: configure,
            track: function (event) {
                // empty on purpose - this is just for impressions 
            }
        };
    }]);
})(angular);