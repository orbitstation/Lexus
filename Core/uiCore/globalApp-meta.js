(function () {
    angular.module('globalApp').run(['$rootScope', '$window', run]);

    function run($rootScope, $window) {
        $rootScope.meta = {
            messages: {
                555: { lookUpMsg: { id: 555, text: 'required' } }
            }
        };
    }
})();


