(function () {
    "use strict";
    angular.module('miniSPA').controller('coverLettersCreateCtrl', ['$scope', '$rootScope', '$window', 'coverLetters', '$location', '$filter', controller]);
    function controller($scope, $rootScope, $window, coverLetters, $location, $filter) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  

        $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsCreatePage;

        $scope.letter = new coverLetters();
        $scope.templates = {
            items: [],
            selectedItem: null
        };

        $scope.busyLinks = {
            create: false
        };

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(function () {
            //load the templates select list
            coverLetters.templates().$promise.then(
                function (result) {
                    $scope.templates.items = result;
                }
            );
        });

        function backToSummary() {
            var absoluteUrl = new RegExp('^(?:[a-z]+:)?//', 'i');
            var returnUrl = $location.search().returnUrl;
            if (returnUrl && !absoluteUrl.test(returnUrl)) {
                $window.location = returnUrl;
                return;
            }
            $location.path('/coverletters');
        }

        //                                                                               ________________________
        // _____________________________________________________________________________/         Create         \_____
        //create a new letter. Issues a POST to /api/coverletters
        $scope.addLetter = function () {
            $scope.letter.$save(function () {
                // on success go back to cover letter list
                backToSummary();
            });
        };

        //                                                                               ________________________
        // _____________________________________________________________________________/     Misc. functions    \_____

        // set the defaults when the "template" select is changed
        $scope.onTemplateChange = function () {
            if ($scope.templates.selectedItem !== null)
            {
                $scope.letter.title = $scope.templates.selectedItem.title;
                // TinyMCE has trouble parsing out the linebreaks, need to take care of it manually
                $scope.letter.body = $scope.templates.selectedItem.body.split(/\n/g).join('<br/>');
            }
        };

        // back button function
        $scope.close = function () {
            backToSummary();
        };
        
    }

})();