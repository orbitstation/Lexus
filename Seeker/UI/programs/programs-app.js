(function () {
    "use strict";
    var miniSPA = '/programs/';
    var dir = '/UI' + miniSPA;
    angular.module('miniSPA', ['ngRoute', 'globalApp'])
        .factory('filterRetainer', ['$rootScope', 'cacheService', function ($rootScope, cacheService) {
            var cacheType = $rootScope.productVariables.caching.cacheTypesEnum.privateCache;
            var cacheProvider = cacheService.provider(cacheType);
            var key = 'programs_search_filter';

            var result = {
                filter: {},
                init: function () {
                    var filter = cacheProvider.get(key);
                    if (typeof filter !== 'undefined') {
                        this.filter = filter
                    } else {
                        this.filter = {};
                    }
                },
                remove: function () {
                    this.filter = {};
                    this.save();
                },
                manage: function (collection, name) {
                    if (collection.length === 0) {
                        delete this.filter[name];
                    } else {
                        this.filter[name] = collection;
                    }
                    this.save();
                },
                save: function () {
                    cacheProvider.addOrUpdate(key, this.filter);
                }
            }
            result.init();

            return result;
        }])
    .factory('compareProgramsPersistor', ['$rootScope', 'cacheService', function ($rootScope, cacheService) {
        var cacheType = $rootScope.productVariables.caching.cacheTypesEnum.privateCache;
        var cacheProvider = cacheService.provider(cacheType);
        var key = 'compare_programs';
        
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
    .directive('spaProgramCompare', [function () {
        return {
            restrict: 'E',
            scope: {
                meta: '=',
                onRemove: '&'
            },
            templateUrl: dir + 'shared/spa-ProgramCompare.html',
            controller: ['$scope', '$rootScope', '$location', 'compareProgramsPersistor', controller],
            link: function (scope, element, attrs) {
            }
        };

        function controller($scope, $rootScope, $location, compareProgramsPersistor)
        {
            $scope.selected = compareProgramsPersistor.selected;
            $scope.shorten = function (text, maxLength) {
                if (text && maxLength > 4) {
                    if (text.length > maxLength) {
                        text = text.substr(0, maxLength - 4) + ' ...';
                    }
                }
                return text;
            };
            $scope.compare = function () {

                var urlString = (function createUrlString() {
                    var string = "/programs/compare";
                    for (var i in $scope.selected) {
                        var add = "/{" + i + "}";
                        string += add;
                    }
                    return string;
                })();

                $location.url(urlString.format($scope.selected[0].code, $scope.selected[1].code, $scope.selected[2] && $scope.selected[2].code, $scope.selected[3] && $scope.selected[3].code));
            };
            $scope.remove = function (code) {
                compareProgramsPersistor.remove(code);
                $scope.onRemove({ code: code });
            };
        }
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
        when(miniSPA + 'search', {
            title: '373630',
            templateUrl: dir + 'search/programs-search.html',
            controller: 'programsSearchCtrl',
            reloadOnSearch: false
        }).
        when(miniSPA + 'compare/:code1/:code2/:code3?/:code4?', {
            title: '374274',
            templateUrl: dir + 'compare/programs-compare.html',
            controller: 'programsCompareCtrl'
        }).
        when(miniSPA + 'program-detail/:code', {
            title: '374275',
            templateUrl: dir + 'programdetail/program-detail.html',
            controller: 'programDetailCtrl',
            reloadOnSearch: false
        }).
        when(miniSPA + 'saved', {
            title: '374273',
            templateUrl: dir + 'saved/program-saved.html',
            controller: 'programSavedCtrl'
        }).
        otherwise({
            title: '373630',
            redirectTo: miniSPA + 'search'
        });
    }]).run(['$rootScope', '$route', '$location', 'titleService', run]);

    function run($rootScope, $route, $location, titleService) {
        // Execute PreResolve Phase
        $rootScope.isLoaded = false;
        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages).then(function () {
            $rootScope.isLoaded = true;
            $rootScope.$watch(function () { return $route.current.title }, function (newVal) {
                titleService.setTitle("", newVal);
            });
        });

        $rootScope.$on('$locationChangeSuccess', function (e, current, previous) {
            $rootScope.meta.backPath = (function getPrevPath() {
                var preFilter = previous.match(/programs\/saved|programs\/search/);
                if (preFilter) {
                    return preFilter[0];
                }
            })();
        });
    }

})();

