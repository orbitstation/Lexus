(function () {
    "use strict";
    angular.module('miniSPA').controller('careerPersonalityIndexCtrl', ['$scope', '$rootScope', '$location', 'careerPersonalityFactory', controller]);

    function controller($scope, $rootScope, $location, careerPersonalityFactory) {
        $scope.meta.breadCrumbsExtended = [];
        $rootScope.track({ name: 'careerPersonality', tag: 'event8' })
        if ($rootScope.isAuthenticated) {
            $rootScope.isBusy = true;
            careerPersonalityFactory.getAnswers().$promise.then(function (data) {
                if (data.length === 0) {
                    // no answers - go to questions
                    $location.path('/careerPersonality/questions');
                }
                else {
                    $location.path('/careerPersonality/results');
                }
            });
        }
        else {
            if ($rootScope.registry.sessionStore.delayedSave.careerPersonality) {
                $location.path('/careerPersonality/results');
            }
            else {
                $location.path('/careerPersonality/questions');
            }
        }
    }
})();