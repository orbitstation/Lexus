(function (angular) {
    "use strict";
    angular.module('globalApp').service('titleService', ['$rootScope',  function ($rootScope) {

        return {
            setTitle: function (keywords, title) {
                var pageTitle = '';
                if ($rootScope.meta.messages[title]) {
                    pageTitle = $rootScope.meta.messages[title].lookUpMsg.value;
                }
                var pageKeys = '';//$rootScope.meta.messages[keywords].lookUpMsg.value;
                var separator1 = (pageKeys === '') ? '' : ' - ';
                var separator2 =  ' | ';

                if ($rootScope.search && location.pathname.toLowerCase().indexOf('jobsearch') >= 0)
                {
                    pageTitle = '';
                    pageKeys = (($rootScope.search.keywords) ? $rootScope.search.keywords : $rootScope.meta.messages[379603].lookUpMsg.value) + ' ' + $rootScope.meta.messages[379604].lookUpMsg.value ;
                    pageKeys = pageKeys + (($rootScope.search.location) ?  ' ' + $rootScope.meta.messages[280695].lookUpMsg.value  + ' ' + $rootScope.search.location : '');
                    pageKeys = pageKeys.replace(/\b[a-z]/g, function (f) { return f.toUpperCase(); });
                }
                $rootScope.pageTitle = pageKeys + separator1 + pageTitle + separator2 + $rootScope.meta.messages[194808].lookUpMsg.value;
            }
        };
    }]);
})(angular);
