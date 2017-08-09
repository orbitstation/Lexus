(function () {
    'use strict';
    angular.module('globalApp').directive('ocsPager', ['$parse', '$rootScope', '$log', '$anchorScroll', 'templateUrlService', directiveFunction]);

    function directiveFunction($parse, $rootScope, $log, $anchorScroll, templateUrlService) {
        return {
            restrict: 'E',
            scope: {
                currentPage: '=currentpage',
                datasetSize: '=datasetsize',
                pageSize: '=pagesize',
                callback: '=?callback',
                pageNumberLimit: '=?pageNumberLimit'
            },

            templateUrl: templateUrlService.get('ocs-Pager.html'),

            link: function (scope, element, attrs) {

                scope.numberOfPages = Math.ceil(scope.datasetSize / scope.pageSize);
                scope.showFirstLast = eval(attrs['showfirstlast']);
                scope.showSeparators = attrs['showseparators'];
                scope.visiblePages = attrs['visiblepages'];
                scope.showLowerSeparator = false;
                scope.showUpperSeparator = false;

                scope.$watch("datasetSize", function (newValue, oldValue) {
                    scope.numberOfPages = Math.ceil(scope.datasetSize / scope.pageSize);

                    if (Number.isInteger(scope.pageNumberLimit) && scope.numberOfPages > scope.pageNumberLimit) {
                        scope.numberOfPages = scope.pageNumberLimit;
                    }
                });

                scope.setPage = function (p) {
                    if (p >= 0 && p < scope.numberOfPages) {
                        scope.currentPage = p;
                        if (typeof scope.callback == 'function') {
                            scope.callback(p);
                        }
                        $anchorScroll();
                    }
                }
                scope.range = function (currentPage) {
                    var pages = [];
                    var pageLimit = (scope.numberOfPages < scope.visiblePages) ? scope.numberOfPages : scope.visiblePages;
                    var half = Math.floor(pageLimit / 2);
                    var start = currentPage - half + 1 - pageLimit % 2;
                    var end = currentPage + half;

                    // handle boundary case
                    if (start <= 0) {
                        start = 1;
                        end = pageLimit;
                    }
                    if (end > scope.numberOfPages) {
                        start = scope.numberOfPages - pageLimit + 1;
                        end = scope.numberOfPages;
                    }

                    var itPage = start;
                    while (itPage <= end) {
                        pages.push(itPage);
                        itPage++;
                    }

                    scope.showLowerSeparator = (start > 1) ? true : false;
                    scope.showUpperSeparator = (end < scope.numberOfPages) ? true : false;;

                    return pages;
                }
            }
        };
    };

})();