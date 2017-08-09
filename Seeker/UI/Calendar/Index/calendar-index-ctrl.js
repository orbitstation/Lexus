(function () {
    "use strict";
    angular.module('miniSPA').controller('calendarIndexCtrl', ['$scope', '$rootScope', controller]);

    function controller($scope, $rootScope) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  

        changeBreadcrumbs();

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(
            function () {
              
            }
        );

        function changeBreadcrumbs() {
            $rootScope.meta.breadCrumbsExtended = $rootScope.meta.breadCrumbsCalendar
        }
    }
})();