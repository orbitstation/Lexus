(function () {
    "use strict";
    angular.module('miniSPA').controller('careerPersonalityQuestionsCtrl', ['$scope', '$rootScope', 'careerPersonalityFactory', '$routeParams', 'registry', '$location', controller]);

    function controller($scope, $rootScope, careerPersonalityFactory, $routeParams, registry, $location) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  

        $scope.meta.breadCrumbsExtended = [];
        var isEdit = ($routeParams.edit == 'edit');

        if (!$rootScope.hasOwnProperty('careerPersonality')) {
            $rootScope.careerPersonality = {};
        }

        $scope.questions = [];
        $scope.answerTypes = [];
        $scope.answers = [];
        $scope.allLoaded = false;
        $scope.allAnswered = false;
        $scope.currentPage = 0;
        $scope.pageSize = 60;
        $scope.form = {};

        if ($rootScope.hasOwnProperty('careerPersonality') && $rootScope.careerPersonality.hasOwnProperty('answers')) {
            $scope.answers = $rootScope.careerPersonality.answers;
        }
        function init() {
            careerPersonalityFactory.getAnswers().$promise.then(function (data) {
                if (data.length != 0) {
                    $scope.answers = data;
                    if ($scope.answers.length == 60 && !isEdit) {
                        $rootScope.careerPersonality.answers = $scope.answers;
                        $location.path('/careerPersonality/results');
                    }              
                } else {
                    if ($rootScope.registry.sessionStore.delayedSave.careerPersonality) {
                        $scope.answers = $rootScope.registry.sessionStore.delayedSave.careerPersonality;
                    }
                }
            });
        }

        //watch on dirty - Session start
        $scope.$watch(function () { return $scope.form.dirty }, function (newVal, oldVal) {
            if (newVal)
                $rootScope.track({ name: 'careerPersonality', tag: 'event9' })
        });

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        
        // Mimic logInWatcher
        // isAuthenticated $watch without delayed save. Do we even need it there?
        if ($rootScope.isAuthenticated) {
            init();
        } else {
            if ($rootScope.registry.sessionStore.delayedSave.careerPersonality) {
                $scope.answers = $rootScope.registry.sessionStore.delayedSave.careerPersonality;
            }
        }
        
        $rootScope.$on('login_success', function () { init(); });
        $rootScope.$on('logout_success', function () { $scope.resetAll(); });
        // /Mimic logInWatcher

        careerPersonalityFactory.getQuestions().$promise.then(function (result) {
            $scope.questions = result;
            if ($scope.answerTypes.length > 0) {
                $scope.allLoaded = true;
            }

            //For Debug only
            // if need to generate dummy records
            //for (var i = 0; i < $scope.pageSize - 1; i++) {
            //    $scope.answers[i] = Math.floor((Math.random() * 5) + 1);
            //}
        });

        careerPersonalityFactory.getAnswerTypes().$promise.then(function (result) {
            $scope.answerTypes = result;
            if ($scope.questions.length > 0) {
                $scope.allLoaded = true;
            }
        });

        $scope.resetAll = function () {
            $scope.answers.length = 0;

            for (var i = 0; i < $scope.questions.length; i++) {
                $scope.questions[i].error = false;
            }
        };

        $scope.clearError = function (index) {
            $scope.questions[index].error = false;
        }

        $scope.submit = function () {
            //Session complete
            $rootScope.track({ name: 'careerPersonality', tag: 'event10' })
            $rootScope.careerPersonality.answers = $scope.answers;
            $scope.allAnswered = true;
            for (var i = 0; i < $scope.pageSize; i++) {
                if (~~($scope.answers[i]) == 0) {
                    $scope.allAnswered = false;
                    $scope.questions[i].error = true;
                } 
            }

            if ($scope.allAnswered) {

                if (!$rootScope.isAuthenticated) {
                    registry.addDelayedSave('careerPersonality', $scope.answers, 'sessionStorage');
                }

                $location.path("/careerPersonality/results");
            } else {
                $scope.error = [{
                    text: $rootScope.msg(367691),
                    type: 'alert-danger'
                }];
            }

        };
    }
})();