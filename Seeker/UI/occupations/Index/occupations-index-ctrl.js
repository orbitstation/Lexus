(function () {
    "use strict";
    angular.module('miniSPA').controller('occupationsIndexCtrl', ['$scope', '$rootScope', '$location', '$window', 'careerPersonalityFactory', controller]);
    function controller($scope, $rootScope, $location, $window, careerPersonalityFactory) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init page variables  \_____
        //
        $scope.meta.breadCrumbsExtended = [];
        $scope.model = {};
        $scope.chartSettings = [];

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(init, clean);
          
        function init() {
            getCareerPersonality();
        }

        function clean() {
            $scope.chartSettings = [];
        }

        //                                                                               ________________________
        // _____________________________________________________________________________/     Misc. Functions    \_____

        $scope.industrySearch = function () {
            if ($scope.model.industry) {
                $rootScope.track({ name: 'occupationSearch', industry: $scope.meta.industry.items.find(function (item) { return item.value === $scope.model.industry }).text })
                $location.url("/occupations/search?industry=" + $scope.model.industry + "&sortOrder=relevance");
            }
        };

        $scope.keywordSearch = function () {
            if ($scope.model.keyword) {
                $rootScope.track({ name: 'occupationSearch', keyword: $scope.model.keyword })
                $location.url("/occupations/search?sortOrder=relevance&keyword=" + $scope.model.keyword);
            }
        };

        $scope.militarySearch = function () {
            if ($scope.model.militaryKeyword) {
                $rootScope.track({ name: 'occupationSearch', tag: 'event13' })
                $location.url("/occupations/search?sortOrder=relevance&branch=" + $scope.model.military + "&keyword=" + $scope.model.militaryKeyword);
            }
        };
        
        function getCareerPersonality() {
            careerPersonalityFactory.getAnswers().$promise.then(function (answers) {
                if (answers.length) {
                    careerPersonalityFactory.scoreAnswers(answers).$promise.then(function (data) {
                        processPersonality(data);
                    });
                }
            });
        }

        function processPersonality(data) {
            var categoryScoreMax = 1;
            var tempSetting = [];
            for (var item in data) {
                if (data[item]['score']) {
                    var i = {
                        name: data[item].scoreTypeName,
                        value: Math.ceil((data[item].score / categoryScoreMax)),
                        description: data[item].description,
                        type: data[item].scoreType,
                        color: '#444'
                    }

                    tempSetting.push(i);
                }
            }
            $scope.chartSettings = tempSetting;
        }

        $scope.$watch("model.industry", function (newValue) {
            $scope.meta.industryButton.disabled = !(newValue);
        });

        $scope.$watch("model.keyword", function (newValue) {
            $scope.meta.keywordButton.disabled = !newValue || newValue === "";
        });

        $scope.$watch("model.militaryKeyword", function (newValue) {
            $scope.meta.militaryButton.disabled = !newValue || newValue === "";
        });
    }
})();