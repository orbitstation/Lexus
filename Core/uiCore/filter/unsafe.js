(function () {
    'use strict';
    globalApp.filter('unsafe', ['$sce', function ($sce) {
        return function (val) {
            if (val) {
                val = val.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ");
                val = val.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, " ");
                return $sce.trustAsHtml(val);
            }
        };
    }]);
})();
