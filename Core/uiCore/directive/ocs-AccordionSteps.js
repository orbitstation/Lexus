(function () {
    'use strict';
    angular.module('globalApp').directive("ocsAccordionSteps", ['$rootScope', 'templateUrlService', '$parse', '$timeout', directiveFunction]);

    function directiveFunction($rootScope, templateUrlService, $parse, $timeout) {
        return {
            restrict: "E",
            scope: {
                meta: "=",
                model: "=",
                configLayout: "=",
                accordionName: '='
            },
            templateUrl: templateUrlService.get('ocs-AccordionSteps.html'),
            replace: true,
            transclude: true,
            link: function (scope, element, attrs) {
                var getActiveStep = function (accordionMeta) {
                    var steps = new Array();
                    var onStep = 0;
                    for (var m in accordionMeta) {
                        if (accordionMeta[m].configShow == true && accordionMeta[m].show == true) {
                            steps.push(m);
                        }
                    }
                    for (var x = 0; x < steps.length - 1; x++) {
                        if (accordionMeta[steps[x]].isOpen == true) {
                            onStep = steps[x + 1];
                            break;
                        }
                    }

                    return onStep;
                }

                var setActiveStep = function (makeActive, accordionMeta) {
                    for (var m in accordionMeta) {
                        if (accordionMeta[m]) {
                            accordionMeta[m].isOpen = false;
                            accordionMeta[m].isdisabled = false;
                            accordionMeta[m].cssClass = false;
                            accordionMeta[m].curentActive = false;

                        }
                    }
                    if (accordionMeta[makeActive]) {
                        accordionMeta[makeActive].isOpen = true;
                        accordionMeta[makeActive].isDisabled = false;
                        accordionMeta[makeActive].curentActive = true;
                    }
                }

                scope.stepIndex = function (key) {
                    var index = 0;
                    for (var x in scope.meta[scope.accordionName]) {
                        if (scope.meta[scope.accordionName][x].show) {
                            index++;
                        }
                        if (x === key) {
                            return index;
                        }
                    }
                    return 0;
                };

                scope.moveToNextSection = function (clickedFrom, accordionMeta) {
                    $rootScope.$broadcast("moveToNextSection", { clickedFrom: clickedFrom });
                    //accordionMeta[clickedFrom].formName.$setDirty();
                    //accordionMeta[clickedFrom].touched = true;

                    var currentActive = getActiveStep(accordionMeta);
                    var steps = new Array();
                    var rememberNextOne = false;
                    for (var m in accordionMeta) {
                        if (m == currentActive) {
                            var nextOne = m;
                            break;
                        }
                    }

                    if (clickedFrom == 'userVerification' && nextOne === undefined) {
                        nextOne = 'loginInformation';
                    }

                    if (!accordionMeta[clickedFrom].onNextStepWait) {
                        // run the extra function if it exsists
                        if (accordionMeta[clickedFrom].fn) {
                            accordionMeta[clickedFrom].fn();
                        }
                        // move focus to the next one on the page
                        setActiveStep(nextOne, accordionMeta);
                    }

                    if (accordionMeta[clickedFrom].onNextStepWait) {
                        // run the extra function if it exsists
                        if (accordionMeta[clickedFrom].fn) {
                            var promise = accordionMeta[clickedFrom].fn();
                            promise.then(function (data) {
                                //go to next step
                                setActiveStep(nextOne, accordionMeta);
                            }, function (data) {
                                if (data === 'goNext') {
                                    setActiveStep(nextOne, accordionMeta);
                                }
                                //stay on current step
                            });
                        }
                    }

                }

                scope.initSteps = function (accordionMeta) {
                    var makeActive = getActiveStep(accordionMeta);
                    setActiveStep(makeActive, accordionMeta);
                    for (var m in accordionMeta) {
                        var formName = 'globalForm' + accordionMeta[m].formName + '.$valid';
                    }
                }
            }
        };
    };

})();
