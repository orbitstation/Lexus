(function () {
    angular.module('globalApp').service('confirmPageRedirect', confirmPageRedirect);

    confirmPageRedirect.$inject = ['$rootScope', '$window'];

    function confirmPageRedirect($rootScope, $window) {
        var unregisterWatcher;
        return {
            init: init,
            destroy: destroy
        }
        
        function init(rootVariable) {
            var defaultMessage = $rootScope.msg(377624) || 'You have entered data on the page without saving. Do you want to continue without saving?';
            var changeStart = false;

            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                if (current.loadedTemplateUrl !== undefined && changeStart) {
                    var changeRoute = $window.confirm(defaultMessage);
                    if (!changeRoute) {
                        //cancel redirect event
                        event.preventDefault();
                    } else {
                        $rootScope[rootVariable] = false;
                    }
                }
            });
            
            unregisterWatcher = $rootScope.$watch(function () { return $rootScope[rootVariable] }, function (n, o) {
                if (n === true && n !== o) {
                    changeStart = true;
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
                    $window.onbeforeunload = null;
                    changeStart = false;
                }
            });
        }

        function destroy() {
            unregisterWatcher();
        }
    }
})();