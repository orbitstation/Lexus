(function (angular) {
    "use strict";
    angular.module('globalApp').service('trackService', ['$rootScope', '$window', '$location', '$q', 'registry', function ($rootScope, $window, $location, $q, registry) {
        var _sinks = [];
        var _activeSinks = [];
        var _sinkLookup = {};
        var _ready = false;
        var _queue = [];
       
        function track(event) {
            if (typeof event !== "object") {
                throw new Error('event should be of \'object\' type');
            }
            if (typeof event.name !== "string") {
                throw new Error('event.name should be string');
            }
            if (_ready) {
                angular.forEach(_activeSinks, function (sink) {
                    try {
                        sink.track(event);
                    }
                    catch (e) {
                        console.error(e);
                    }
                });
            }
            else {
                _queue.push(event);
            }
        }

        return {
            addSink: function(sink) {
                _sinks.push(sink);
            },
            configure: function(configs) {
                for(var i = 0; i < configs.length; i++)
                {
                    var config = configs[i];
                    var promises = [];
                    angular.forEach(_sinks, function (sink) {
                        if (sink.name === config.name)
                        {
                            var deferred = $q.defer();
                            promises.push(deferred.promise);
                            sink.configure(config).then(function () {
                                if (!_sinkLookup[sink.name]) {
                                    _activeSinks.push(sink);
                                    _sinkLookup[sink.name] = true;
                                }
                                deferred.resolve();
                            });
                        }
                    });
                    $q.all(promises).then(function () {
                        _ready = true;
                        if (_queue.length > 0) {
                            angular.forEach(_queue, function (item) {
                                track(item);
                            });
                            _queue = [];
                        }
                    });
                }
            },
            init: function () {
                $rootScope.track = track;
            }
        };
    }]);
})(angular);