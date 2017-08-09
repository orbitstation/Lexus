(function () {
    "use strict";
    var miniSPA = '/occupations/';
    var dir = '/UI' + miniSPA;
    angular.module('miniSPA', ['ngRoute', 'globalApp'])
        .factory('searchQueryPersistor', ['$rootScope', 'cacheService', function($rootScope, cacheService){
            var cacheProvider = cacheService.provider($rootScope.productVariables.caching.cacheTypesEnum.privateCache);
            var key = 'occupation_search_querry';

            var result = {
                get: function () {
                    var url = cacheProvider.get(key);
                    return url;
                },
                set: function (string) {
                    cacheProvider.addOrUpdate(key, string);
                },
            }
            return result;
        }])
    .factory('compareOccupationsPersistor', ['$rootScope', 'cacheService', function ($rootScope, cacheService) {
        var cacheType = $rootScope.productVariables.caching.cacheTypesEnum.privateCache;
        var cacheProvider = cacheService.provider(cacheType);
        var key = 'compare_occupations';

        var result = {
            selected: [],
            init: function () {
                var selected = cacheProvider.get(key);
                if (typeof selected !== "undefined") {
                    this.selected = selected;
                }
                else {
                    this.selected = [];
                }
            },
            add: function (item) {
                this.selected.push(item);
                this.save();
            },
            contains: function(code)
            {
                for (var i = 0; i < this.selected.length; i++) {
                    if (this.selected[i].code === code) {
                        return true;
                    }
                }
                return false;
            },
            remove: function(code)
            {
                for(var i = 0; i < this.selected.length; i++)
                {
                    if (this.selected[i].code === code)
                    {
                        this.selected.splice(i, 1);
                        this.save();
                        break;
                    }
                }
            },
            save: function () {
                cacheProvider.addOrUpdate(key, this.selected);
            }
        };
        result.init();
        return result;
    }])
    .directive('spaOccupationCompare', [function () {
        return {
            restrict: 'E',
            scope: {
                meta: '=',
                onRemove: '&'
            },
            templateUrl: dir + 'shared/spa-OccupationCompare.html',
            controller: ['$scope', '$rootScope', '$location', 'compareOccupationsPersistor', 'searchQueryPersistor', controller],
            link: function (scope, element, attrs) {
            }
        };

        function controller($scope, $rootScope, $location, compareOccupationsPersistor, searchQueryPersistor)
        {
            $scope.selected = compareOccupationsPersistor.selected;
            $scope.shorten = function (text, maxLength) {
                if (text && maxLength > 4) {
                    if (text.length > maxLength) {
                        text = text.substr(0, maxLength - 4) + ' ...';
                    }
                }
                return text;
            };
            $scope.compare = function () {
                searchQueryPersistor.set($location.url());
                $location.url("/occupations/compare/{0}/{1}".format($scope.selected[0].code, $scope.selected[1].code));
            };
            $scope.remove = function (code) {
                compareOccupationsPersistor.remove(code);
                $scope.onRemove({ code: code });
            };
        }
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider.
        when(miniSPA, {
            title:'346853',
            templateUrl: dir + 'index/occupations-index.html',
            controller: 'occupationsIndexCtrl'
        }).
        when(miniSPA + 'search', {
            title:'368208',
            templateUrl: dir + 'search/occupations-search.html',
            controller: 'occupationsSearchCtrl',
            reloadOnSearch: false
        }).
        when(miniSPA + 'compare/:code1/:code2', {
            title:'194815',
            templateUrl: dir + 'compare/occupations-compare.html',
            controller: 'occupationsCompareCtrl'
        }).
        when(miniSPA + 'career-detail/:code', {
            title: '346853',
            templateUrl: dir + 'careerdetails/occupations-careerdetails.html',
            controller: 'occupationsCareerdetailsCtrl',
            reloadOnSearch: false
        }).
        when(miniSPA + 'saved', {
            title:'348857',
            templateUrl: dir + 'saved/occupations-saved.html',
            controller: 'occupationsSavedCtrl'
        }).
        when(miniSPA + 'education-training/:code', {
            title:'333025',
            templateUrl: dir + 'educationtraining/occupations-educationtraining.html',
            controller: 'educationtrainingctrl'
        }).
        otherwise({
            title: '346853',
            redirectTo: miniSPA
        });


    }]).run(['$rootScope', '$route', 'titleService', run]);

    function run($rootScope, $route, titleService) {
        // Execute PreResolve Phase
        $rootScope.isLoaded = false;
        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages).then(function () {
            $rootScope.isLoaded = true;
            $rootScope.$watch(function () { return $route.current.title }, function (newVal) {
                titleService.setTitle("", newVal);
            });
        });
    }

})();

