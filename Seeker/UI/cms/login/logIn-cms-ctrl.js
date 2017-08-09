(function () {
    "use strict";
    angular.module('miniSPA').controller('logInCmsCtrl', ['$scope', '$rootScope', 'registry', controller]);
    function controller($scope, $rootScope, registry) {

        angular.extend($rootScope.meta, { cmsPage: 'loginPage' });

        //registry.set('', 'context', true, 'localStorage');
        registry.set('global', 'cmsEditMode', true, 'localStorage');


    }
})();