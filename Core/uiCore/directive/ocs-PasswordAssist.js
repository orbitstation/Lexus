(function () {
    angular.module('globalApp').directive("passwordAssist", ['$rootScope', 'templateUrlService', directiveFunction]);

    function directiveFunction($rootScope, templateUrlService) {
        return {
            restrict: "E",
            scope: {
                options: "=",
                model: "=",
                meta: "=",
                passwordconfirm: "=",
            },
            templateUrl: templateUrlService.get('ocs-PasswordAssist.html'),
            replace: true,
            link: function (scope, element, attrs) {
                //Setting up defaults
                var hasOptions = (scope.options !== undefined);
                scope.defaults = {
                    minLength: hasOptions ? scope.options.minLength || 8 : 8,
                    maxLength: hasOptions ? scope.options.maxLength || 20 : 20,
                    noSpaces: hasOptions ? scope.options.noSpaces || true : true,
                    digits: hasOptions ? scope.options.digits || true : true,
                    lowerUpperCases: hasOptions ? scope.options.lowerUpperCases || true : true,
                    nonWordCharacter: hasOptions ? scope.options.nonWordCharacter || true : true,
                    messageCharacters: scope.meta.RequirementMessages[0].text,
                    messageMinimumOf: scope.meta.RequirementMessages[1].text,
                    messageLengthShouldNotExceed: scope.meta.RequirementMessages[2].text,
                    messageContainsUppercaseAndLowercaseLetters: scope.meta.RequirementMessages[3].text,
                    messageContainsNumbers: scope.meta.RequirementMessages[4].text,
                    messageContainsSpecialCharacters: scope.meta.RequirementMessages[5].text,
                    messageDoesntContainSpaces: scope.meta.RequirementMessages[6].text,
                    messagePasswordsMatch: scope.meta.RequirementMessages[7].text
                };

                //Watching for model changes
                scope.$watch('model', function () {
                    if (scope.model !== undefined) {
                        scope.min = (scope.model.length >= scope.defaults.minLength) ? true : false;
                        scope.max = (scope.model.length <= scope.defaults.maxLength) ? true : false;
                        scope.spaces = (scope.defaults.noSpaces === true) ? !matchSpaces(scope.model) : matchSpaces(scope.model);
                        scope.upperLower = (scope.defaults.lowerUpperCases === true) ? !matchUpperLower(scope.model) : matchUpperLower(scope.model);
                        scope.digits = (scope.defaults.digits === true) ? !matchDigit(scope.model) : matchDigit(scope.model);
                        scope.characters = (scope.defaults.nonWordCharacter === true) ? !matchNonWordCharacter(scope.model) : matchNonWordCharacter(scope.model);
                        scope.isMatched = scope.passwordconfirm == scope.model;
                    }
                });

                scope.$watchGroup(['min', 'max', 'spaces', 'upperLower', 'digits', 'characters', 'isMatched'], function (bools) {
                    var isTrue = true;
                    for (var x in bools) {
                        if (!bools[x]) {
                            isTrue = false;
                            break;
                        }
                    }

                    if (!isTrue) {
                        scope.passwordAssistForm.$setValidity('passwordFormat', false);
                    } else {
                        scope.passwordAssistForm.$setValidity('passwordFormat', true);
                    }
                });

                scope.$watch('passwordconfirm', function () {
                    if (scope.passwordconfirm !== undefined) {
                        scope.isMatched = scope.passwordconfirm === scope.model;
                    }
                });
            }
        };
        // use positive look ahead to see if at least one space exists
        // NOTE: if used on the password type inputs add ng-trim="false" to detect all white spaces.
        function matchSpaces(e) {
            return (e.match(/^\S+$/) === null) ? true : false;
        }
        // use positive look ahead to see if at least one lower & upper case letters exists
        function matchUpperLower(e) {
            return (e.match(/^(?=.*[a-z])(?=.*[A-Z]).+$/) === null) ? true : false;
        }
        // use positive look ahead to see if at least one digit exists
        function matchDigit(e) {
            return (e.match(/^(?=.*\d).+$/) === null) ? true : false;
        }
        // use positive look ahead to see if at least one underscore or non-word character exists
        function matchNonWordCharacter(e) {
            return (e.match(/^(?=.*[_\W]).+$/) === null) ? true : false;
        }
    };

})();