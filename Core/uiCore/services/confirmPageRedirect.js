(function () {
    angular.module('globalApp').service('confirmPageRedirect', confirmPageRedirect);

    confirmPageRedirect.$inject = ['$rootScope', '$window'];

    function confirmPageRedirect($rootScope, $window) {
        var unregisterWatcher;
        var unregisterRouteChange;
        var changeFlag = false;
        return {
            init: init,
            destroy: destroy
        }
        
        function init(rootVariable, configValue) {
            //destroy();
            var defaultMessage = $rootScope.msg(377624) || 'You have entered data on the page without saving. Do you want to continue without saving?';
            if (configValue == 'true') {
                unregisterRouteChange = $rootScope.$on('$routeChangeStart', function (event, next, current) {
                    if (current.loadedTemplateUrl !== undefined && changeFlag) {
                        var changeRoute = $window.confirm(defaultMessage);
                        if (!changeRoute) {
                            // cancel redirect event
                            event.preventDefault();
                        } else if (changeRoute) {
                            destroy();
                        }
                    }
                });

                unregisterWatcher = $rootScope.$watch(function () { return $rootScope[rootVariable] }, function (n, o) {
                    if (n === true && n !== o) {
                        changeFlag = true;
                        $window.onbeforeunload = function (evt) {
                            var message = defaultMessage;
                            if (typeof evt == 'undefined') {
                                evt = $window.event;
                            }
                            if (evt) {
                                evt.returnValue = message;
                            }
                            return message;
                        }
                    } else if (n === undefined || n === false) {
                        changeFlag = false;
                        $window.onbeforeunload = null;
                    }
                });
            }
        }

        // destroy watchers and event handlers on confirmation to redirect
        function destroy() {
            if (typeof unregisterRouteChange === 'function' && typeof unregisterWatcher === 'function') {
                changeFlag = false;
                unregisterRouteChange();
                unregisterWatcher();
            }  
        }
    }
})();