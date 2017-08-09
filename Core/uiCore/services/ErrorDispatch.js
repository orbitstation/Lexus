//  pre-resolve all Layout Configs : 
//
//
//
(function () {
    'use strict';
    angular.module('globalApp').service('errorDispatch', [runFunction]);
    function runFunction() {
        //                                                _______________________
        //_______________________________________________/   private functions   \_____________________
        //

        //                                                ____________________
        //_______________________________________________/    ErrorDispatch   \_____________________
        //

        return {
            init: function () {
                //console.log("ErrorDispatch has initilized");
            },
            alertError: function (obj) {
                console.log('Communication - ERROR: ' + obj.config.url);



            },
        }
    }


})();



//
//  this is code that I hope to make use of,  it allows for an error "catch all" but also allows for a bypass of the catch. 
//  Right now it does not play well with the other  "$httpProvider.interceptors"  that is being used for batching of requests.


//(function () {
//    var HEADER_NAME = 'MyApp-Handle-Errors-Generically';
//    var specificallyHandleInProgress = false;

//    angular.module('globalApp').factory('RequestsErrorHandler', ['$q', '$rootScope', function ($q) {
//        return {
//            // --- The user's API for claiming responsiblity for requests ---
//            specificallyHandled: function (specificallyHandledBlock) {
//                specificallyHandleInProgress = true;
//                try {
//                    return specificallyHandledBlock();
//                } finally {
//                    specificallyHandleInProgress = false;
//                }
//            },

//            // --- Response interceptor for handling errors generically ---
//            responseError: function (rejection) {
//                var shouldHandle = (rejection && rejection.config && rejection.config.headers
//                    && rejection.config.headers[HEADER_NAME]);

//                if (shouldHandle) {
//                    // --- Your generic error handling goes here ---

//                    console.log("RequestsErrorHandler - Triggered");
//                    console.log(rejection.config.url);
//                    console.log(rejection.config);

//                    //if (!$rootScope.topErrorList) { $rootScope.topErrorList = [] };
//                    //$rootScope.topErrorList.push(rejection.config.url);


//                }

//                return $q.reject(rejection);
//            }
//        };
//    }]);

//    angular.module('globalApp').config(['$provide', '$httpProvider', function ($provide, $httpProvider) {
//        $httpProvider.interceptors.push('RequestsErrorHandler');

//        // --- Decorate $http to add a special header by default ---

//        function addHeaderToConfig(config) {
//            config = config || {};
//            config.headers = config.headers || {};

//            // Add the header unless user asked to handle errors himself
//            if (!specificallyHandleInProgress) {
//                config.headers[HEADER_NAME] = true;
//            }

//            return config;
//        }

//        // The rest here is mostly boilerplate needed to decorate $http safely
//        $provide.decorator('$http', ['$delegate', function ($delegate) {
//            function decorateRegularCall(method) {
//                return function (url, config) {
//                    return $delegate[method](url, addHeaderToConfig(config));
//                };
//            }

//            function decorateDataCall(method) {
//                return function (url, data, config) {
//                    return $delegate[method](url, data, addHeaderToConfig(config));
//                };
//            }

//            function copyNotOverriddenAttributes(newHttp) {
//                for (var attr in $delegate) {
//                    if (!newHttp.hasOwnProperty(attr)) {
//                        if (typeof ($delegate[attr]) === 'function') {
//                            newHttp[attr] = function () {
//                                return $delegate[attr].apply($delegate, arguments);
//                            };
//                        } else {
//                            newHttp[attr] = $delegate[attr];
//                        }
//                    }
//                }
//            }

//            var newHttp = function (config) {
//                return $delegate(addHeaderToConfig(config));
//            };

//            newHttp.get = decorateRegularCall('get');
//            newHttp.delete = decorateRegularCall('delete');
//            newHttp.head = decorateRegularCall('head');
//            newHttp.jsonp = decorateRegularCall('jsonp');
//            newHttp.post = decorateDataCall('post');
//            newHttp.put = decorateDataCall('put');

//            copyNotOverriddenAttributes(newHttp);

//            return newHttp;
//        }]);
//    }]);

//})();


