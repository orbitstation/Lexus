(function () {
    angular.module('globalApp').directive('ocsRepeaterFinished', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit(attr.ocsRepeaterFinished);
                    });
                }
            }
        }
    }]);
})();