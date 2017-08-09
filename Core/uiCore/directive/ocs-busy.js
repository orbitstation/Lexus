(function () {
    'use strict';
    var directiveName = 'ocsBusy';
    angular.module('globalApp').directive(directiveName, ['$timeout', '$parse', '$rootScope', ocsBusyDirective]);

    //Attributes
    //ocs-busy="string" & ignore-disabled="expression"

    //Usage ocs-busy="string"
    //ocs-busy="string" using only 2 type of strings (used to find the right scope and manipulate the boolean value)

    //Examples:
    //1. ocs-busy='$root.busyLinks.mainBusyAction' 
    //(actually used for accordions, suggesting using it everywhere)
    //note: add the associated object in your controller as $rootScope.busyLinks = { mainBusyAction : false ;}
    //2. ocs-busy='busyLinks.save' 
    //must be seperated with 1 dot ex : $scope.busyLinks.save = false; in the actual controller.

    //Usage of optional attribute ignore-disabled="expression"
    //this allows to disable the disable on demand

    function ocsBusyDirective($timeout, $parse, $rootScope) {
        return {
            restrict: 'A',
            link: link
        };

        function searchScope(scope, key, type) {
            if (type = '$root') {
                return scope[key];
            } else {
                var parent = scope.$parent;
                if (scope[key]) {
                    return scope[key];
                } else {
                    searchScope(parent, key);
                }
            }
        }

        function link(scope, element, attrs) {
            var spinner = " <i class='fa fa-spinner fa-spin'></i>";
            var timer;
            var ignoreDisabled;
            var scopeObj;
            var targetKey;
            //find correct scope & object
            var correctScope;
            var currentState = null;

            //default settings
            var defaults = {
                spinnerDelay: 250
            };

            //Make sure the string is always 
            //Example: busyLinks: { register: false, saving: false, etc..}
            var busyObj = attrs[directiveName].split('.');
            if (busyObj[0] === '$root' && busyObj.length === 3) {
                scopeObj = busyObj[1];
                targetKey = busyObj[2];

                if ($rootScope[scopeObj] !== undefined) {
                    correctScope = searchScope($rootScope, scopeObj, '$root');
                    currentState = correctScope[targetKey];
                }

            } else {
                scopeObj = busyObj[0];
                targetKey = busyObj[1];
                correctScope = searchScope(scope, scopeObj);
                currentState = correctScope[targetKey];
            }


            if (currentState !== null) {
                //trigger disabled phase
                element.on('click', function (e) {
                    if (!ignoreDisabled) {
                        correctScope[targetKey] = true;
                        if (correctScope[targetKey]) {
                            timer = $timeout(function () {
                                element.append(spinner);     // adds a spinner to the button
                            }, defaults.spinnerDelay);

                            //check when to remove spinner & spinner render timer
                            var watch = scope.$watch(function () { return (correctScope[targetKey]) }, function (n, o) {
                                if (n === false) {
                                    element.find('i').remove();
                                    $timeout.cancel(timer);     // cancels the button's on click timer
                                    watch();
                                }
                            });
                        }
                    }
                });

                //check for (optional 'ignoreDisabled')
                if (attrs.ignoreDisabled !== undefined) {
                    scope.$watch(function () { return $parse(attrs.ignoreDisabled)(scope) }, function (n, o) {
                        if (n) {
                            ignoreDisabled = true;
                        } else {
                            ignoreDisabled = false;
                        }
                    });
                }

            }

        }
    };

})();

