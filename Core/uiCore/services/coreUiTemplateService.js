(function (angular) {
    "use strict";
    angular.module('globalApp').service('coreUiTemplateService', function () {
        // empty on purpose; real coreUiTemplateService will be created via gulp
        return { init: function () { } };
    });
})(angular);