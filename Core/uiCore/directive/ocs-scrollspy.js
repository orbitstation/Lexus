(function (angular) {
    "use strict";
    // reference: http://stackoverflow.com/questions/17470370/how-to-implement-a-scrollspy-in-angular-js-the-right-way
    angular.module('globalApp').directive('ocsScrollSpy', ['$window', '$timeout', '$http', function ($window, $timeout, $http) {
        return {
            restrict: 'A',
            controller: ['$scope', function ($scope) {
                $scope.spies = [];
                this.addSpy = function (spyObj) {
                    spyObj.id = /\s/.test(spyObj.id) ? spyObj.id.replace(/\s/g, "\\ ") : spyObj.id; // if id has 'invalid' space
                    $scope.spies.push(spyObj);
                };
            }],
            link: function (scope, elem, attrs) {
                var spyElems;
                spyElems = [];

                scope.$watch('spies', function (spies) {
                    var spy, _i, _len, _results;
                    _results = [];

                    for (_i = 0, _len = spies.length; _i < _len; _i++) {
                        spy = spies[_i];

                        if (spyElems[spy.id] == null) {
                            _results.push(spyElems[spy.id] = elem.find('#' + spy.id));
                        } else {
                            _results.push(void 0);
                        }
                    }
                    return _results;
                });

                // unbind custom fnc from scroll event on $scope.$destroy so it doesn't throw errors on other page in the same miniSPA;
                scope.$on('$destroy', function () {
                    $($window).off('scroll', scrollFnc);
                });

                // define fnc for scroll
                $($window).scroll(scrollFnc);

                function scrollFnc() {
                    var highlightSpy = null, spy, pos;

                    for (var i = 0; i < scope.spies.length; i++) {               // cycle through `spy` elements to find which to highlight
                        spy = scope.spies[i];
                        spy.out();                                               // remove the active class for each in loop
                        
                        // look again if length is 0. 
                        spyElems[spy.id] = spyElems[spy.id].length === 0 ? elem.find('#' + spy.id) : spyElems[spy.id];
                      
                        if (spyElems[spy.id].offset() === undefined) { continue; }
                        
                        if (spyElems[spy.id].length !== 0) {
                            if ((pos = spyElems[spy.id].offset().top) - $window.pageYOffset <= 5) {
                                spy.pos = pos;
                                
                                highlightSpy == null && (highlightSpy = spy);
                                highlightSpy.pos < spy.pos && (highlightSpy = spy);
                            }
                        }
                    }

                    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {     // select the last `spy` if the scrollbar is at the bottom of the page
                        spy.pos = pos;
                        highlightSpy = spy;
                    }

                    return highlightSpy != null ? highlightSpy["in"]() : void 0;
                }
            }
        };

    }]);

    angular.module('globalApp').directive('spy', ['$location', '$anchorScroll', function ($location, $anchorScroll) {
        return {
            restrict: "A",
            require: "^ocsScrollSpy",
            link: function (scope, elem, attrs, affix) {
                
                elem.click(function () {
                    scope.$apply(function () {
                        $location.hash(attrs.spy);
                    });
                    $anchorScroll();
                });

                affix.addSpy({
                    id: attrs.spy,
                    in: function () {
                        elem.addClass('active');
                    },
                    out: function () {
                        elem.removeClass('active');
                    }
                });
            }
        };
    }]);
})(angular);