(function () {
    "use strict";
    angular.module('miniSPA').controller('occupationsCareerdetailsCtrl', ['$scope', '$rootScope', 'authentication', '$log', '$timeout', '$window', '$location', '$resource', '$routeParams', '$anchorScroll', 'getOccupationDetails', 'occupationsFactory', 'utilityService', 'compareOccupationsPersistor', 'savedOccupationsFactory', controller]);

    function controller($scope, $rootScope, authentication, $log, $timeout, $window, $location, $resource, $routeParams, $anchorScroll, getOccupationDetails, occupationsFactory, utilityService, compareOccupationsPersistor, savedOccupationsFactory) {

        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages);

        $scope.savedOccupations = [];
        $scope.isSaved = false;
        $scope.saveAfterLogin = false;
        $scope.url = $location.url();
        $scope.canAddToCompare = false;
        $scope.isCompared = false;

        $scope.remove = function (code) {
            refreshComparer();
        };

        $scope.change = function () {
            if (compareOccupationsPersistor.contains($scope.code))
            {
                compareOccupationsPersistor.remove($scope.code);
            }
            else
            {
                compareOccupationsPersistor.add({ code: $scope.code, title: $scope.occDetails.title });
            }
            refreshComparer();
        };

        function refreshComparer()
        {
            $scope.canAddToCompare = canAddToCompare();
            $scope.isCompared = compareOccupationsPersistor.contains($scope.code);
        }

        function canAddToCompare()
        {
            if (compareOccupationsPersistor.selected.length >= 2)
            {
                return false;
            }
            return !compareOccupationsPersistor.contains($scope.code);
        }

        function saveOccupation() {
            if ($scope.code) {
                var data = { code: $scope.code };
                savedOccupationsFactory.save(data).$promise.then(function (result) {
                    $scope.isSaved = true;
                });
            }
        }

        function init() {
            $scope.doneLoading = false;
            refreshComparer();
            $anchorScroll();
            var data = { code: $scope.code };
            getOccupationDetails.get(data).$promise.then(function (results) {
                //console.log(results);
                $scope.occDetails = results;
                adjustBreadcrumbs();
                $scope.doneLoading = true;
                $scope.updateStickyCont = true;
              });
            if (authentication.isAuthenticated()) {
                savedOccupationsFactory.get().$promise.then(function (results) {
                    //console.log(results);
                    $scope.occupations = results;
                    $scope.occupationsCount = results.length;
                    $scope.maxOccupationsCount = 10;
                    for (var i = 0; i < $scope.occupationsCount; i++) {
                        if ($scope.occupations[i].code === $scope.code) {
                            $scope.isSaved = true;
                        }
                    }
                },
                function (error) {
                    $log.log(error);
                });
            }
        }

        $rootScope.$on('login_success', function () {
            init();
            if ($scope.code && $scope.saveAfterLogin && !$scope.isSaved) {
                $scope.saveAfterLogin = false;
                saveOccupation();
            }
        });

        var regex = /id[-]([0-9]+)$/i;
        var match = regex.exec($routeParams.code);
        if (match) {
            $scope.code = match[1];
            init();
        }

        $scope.navSummaryClass = "active";
        $scope.navDetailClass = "";
        $scope.divSummaryClass = "tab-pane active";
        $scope.divDetailClass = "tab-pane";

        $scope.toggleDetail = function () {
            if ($scope.navDetailClass === "") {
                $scope.navDetailClass = "active";
                $scope.navSummaryClass = "";
                $scope.divSummaryClass = "tab-pane";
                $scope.divDetailClass = "tab-pane active";
            }
        };

        $scope.toggleSummary = function () {
            if ($scope.navSummaryClass === "") {
                $scope.navSummaryClass = "active";
                $scope.navDetailClass = "";
                $scope.divSummaryClass = "tab-pane active";
                $scope.divDetailClass = "tab-pane";
            }
        };
         
        $scope.save = function ($event) {
            if (authentication.isAuthenticated()) {
                saveOccupation();
            } else {
                $scope.saveAfterLogin = true;
                $rootScope.login.boxOpen = true;
                $rootScope.login.callout = {
                    type: "saveOccupation",
                    data: $scope.code
                };
            }
            $event.preventDefault();
            $event.stopPropagation();
        };

        $scope.tokenize = function (token) {
            return utilityService.tokenize(token);
        };

        function adjustBreadcrumbs() {
            if ($scope.occDetails && $scope.occDetails.title) {
                var occDetailsTitleShortened = utilityService.getShortenedText($scope.occDetails.title, $rootScope.meta.occupationSearchResults.occupationTitleMaxLength);
                //$rootScope.extraBreadCrumbs = [{ display: { value: occDetailsTitleShortened } }];
                
                
                $scope.meta.pageHeader.title.lookUpMsg.value = occDetailsTitleShortened;
                
                $scope.meta.breadCrumbsDetailsPage[0].display.lookUpMsg.value = occDetailsTitleShortened;
                $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsDetailsPage;


            }
        }

    }
})();