(function () {
    "use strict";
    angular.module('miniSPA').controller('coverLettersIndexCtrl', ['$scope', '$rootScope', 'coverLetters', 'cacheService', '$location', '$uibModal', controller]);
    function controller($scope, $rootScope, coverLetters, cacheService, $location, $uibModal) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  
        $rootScope.extraBreadCrumbs = [];
        $scope.meta.breadCrumbsExtended = [];

        var cacheType = $rootScope.productVariables.caching.cacheTypesEnum.httpPrivateCache;

        $scope.letters = [];
        $scope.itemsCount = 0;
        $scope.maxItemsCount = 5;

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data  \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(function () {
            coverLetters.get().$promise.then(
                function (result) {
                    //success handler
                    $scope.letters = result.items;
                    $scope.itemsCount = result.items.length;
                    $scope.maxItemsCount = result.maxItemsCount;
                }
            );
        }
        );

        //                                                                               ________________________
        // _____________________________________________________________________________/         Delete         \_____
        //  
        $scope.deleteLetter = function (id) {
            this.open(function () {
                var data = { coverLetterId: id };
                coverLetters.deleteLetter({}, data, function () {
                    $location.path('/coverletters'); //redirect to index
                });
            });
        };

        // modal window open function
        $scope.open = function (onSuccess) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                }
            });

            modalInstance.result.then(function () {
                onSuccess();
            });
        };

        //                                                                               ________________________
        // _____________________________________________________________________________/          Copy          \_____
        //  

        // copy a cover leter
        $scope.cloneLetter = function (id) {
            var data = { coverLetterId: id };
            coverLetters.clone({}, data, function () {
                cacheService.provider(cacheType).remove($rootScope.productVariables.rootUrl + '/seeker/api/me/coverletters');
                $location.path('/coverletters');
            });
        };

        //                                                                               ________________________
        // _____________________________________________________________________________/         Create         \_____
        //  
        $scope.createLetter = function () {
            $location.path('/coverletters/create');
        };
    }
})();