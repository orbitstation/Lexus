(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', function ($rootScope) {

        // this is an indipendant look up table of configs for the template layout
        angular.extend($rootScope.configLayout, {
        });

        // this needs to mirror the meta object, it will overwrite the end point in the meta object
        angular.extend($rootScope.configMeta, {
        });

    }]);
})();

(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', function ($rootScope) {
        $rootScope.config = {
            documentUpload: {
                maxItems: 15,
                maxFileSize: 500000,
                allowedTypes: ['doc', 'docx', 'pdf', 'txt', 'gif', 'jpg', 'rtf']
            }
        };
    }]);
})();