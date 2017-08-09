(function () {
    "use strict";
    angular.module('miniSPA').controller('messageCenterIndexCtrl', ['$scope', '$rootScope', 'productVariables', '$log', 'BrowserDetect', '$timeout', '$window', controller]);
    function controller($scope, $rootScope, productVariables, $log, BrowserDetect, $timeout, $window) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  


        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(function () {

        });

        //                                                                               ________________________
        // _____________________________________________________________________________/                        \_____
        // 

    }
})();