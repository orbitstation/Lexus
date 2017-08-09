(function () {
    'use strict';
    angular.module('globalApp').service('gotoAnchor', ['$rootScope', '$location', '$anchorScroll', runFunction]);
    function runFunction($rootScope, $location, $anchorScroll) {
        return {
            init: function () {
                $rootScope.gotoAnchor = function (id) {
                    if ($location.hash() !== id) {
                        // set the $location.hash to `newHash` and
                        // $anchorScroll will automatically scroll to it
                        $location.hash(id);
                    } else {
                        // call $anchorScroll() explicitly,
                        // since $location.hash hasn't changed
                        $anchorScroll();
                    }
                };
            }
        }
    }

})();
