(function (angular) {
    "use strict";
    angular.module('miniSPA').service('resumesProfileIncompleteService', function () {
        var errors = [];
        return {
            errors: errors
        };
    });
})(angular);
