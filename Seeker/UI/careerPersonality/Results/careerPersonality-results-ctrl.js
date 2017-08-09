(function () {
    "use strict";
    angular.module('miniSPA').controller('careerPersonalityResultsCtrl',
        ['$scope', '$rootScope', '$window', 'careerPersonalityFactory', '$location', 'delayedSave', controller]);

    function controller($scope, $rootScope, $window, careerPersonalityFactory, $location, delayedSave) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  
        $scope.meta.breadCrumbsExtended = $scope.meta.breaCrumbsResults;
        $scope.isAuth = false;
        $scope.allLoaded = false;

        var answersSize = 60;
        $scope.categoryScoreMax = 1;
        $scope.answers;
        $scope.results = [];
        $scope.chartSettings = [];

        function init() {
            $scope.isAuth = $rootScope.isAuthenticated;
            if ($rootScope.careerPersonality && $rootScope.careerPersonality.answers && $rootScope.careerPersonality.answers.length == answersSize) {
                $scope.answers = $rootScope.careerPersonality.answers;
            }

            if ($scope.isAuth) {
                if ($scope.answers) {
                    saveAndScore();
                } else {
                    careerPersonalityFactory.getAnswers().$promise.then(function (data) {
                        if (data && data.length) {
                            $scope.answers = data;
                            scoreAnswers();
                        } else {
                            $location.path('/careerPersonality/questions');
                        }
                    });
                }
            } else {
                if ($rootScope.registry.sessionStore.delayedSave.careerPersonality && !$scope.answers) {
                    $scope.answers = $rootScope.registry.sessionStore.delayedSave.careerPersonality;
                }

                if ($scope.answers) {
                    scoreAnswers();
                } else {
                    $location.path('/careerPersonality/questions');
                }
            }
        }

        function scoreAnswers() {
            careerPersonalityFactory.scoreAnswers($scope.answers).$promise.then(function (data) {
                processData(data);
            });
        }

        function saveAndScore() {
            careerPersonalityFactory.saveAnswersAndScore($scope.answers).$promise.then(function (data) {
                processData(data);
            });
        }

        function processData(data) {
            $scope.results = data;
            var tempSetting = [];
            for (var item in data) {
                if (typeof data[item]['score'] == 'number') {
                    var i = {
                        name: data[item].scoreTypeName,
                        value: Math.ceil((data[item].score / $scope.categoryScoreMax)),
                        description: data[item].description,
                        type: data[item].scoreType,
                        color: '#444'
                    }

                    tempSetting.push(i);
                }
            }
            $scope.chartSettings = tempSetting;
            $scope.allLoaded = true;
        }

        $scope.delayedSave = function () {
            $rootScope.login.boxOpen = true;
        }

        $scope.goToOccupations = function (name) {
            $rootScope.track({ name: 'careerPersonality', tag: 'event11' })
            $window.location = '/occupations/search?sortOrder=relevance&area=' + name;
        }

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____

        // Mimic logInWatcher isAuthenticated $watch.
        if ($rootScope.isAuthenticated) {
            delayedSave.init().then(init);
        } else {
            init();
        }

        $rootScope.$on('login_success', function () { delayedSave.init().then(init); });
        // /Mimic logInWatcher
    }
})();