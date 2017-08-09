(function () {
    "use strict";
    angular.module('miniSPA').controller('cmsMultiPageCtrl', ['$scope', '$rootScope', '$route', 'titleService', 'cmsFactory', controller]);
    function controller($scope, $rootScope, $route, titleService, cmsFactory) {

        angular.extend($rootScope.meta, { cmsPage: 'editPage' });

        $scope.meta.jsonEdit = 'false';

        pageInit(getData());

        function pageInit(multiPageJson) {
            angular.extend($rootScope.meta, multiPageJson);
            // this extra pre-resolve is needed if you want to resolve in message ids in the page json.
            // if it turn out there will be no message Ids passed in then we should remove this pre-resove line.
            //$rootScope.preResolvePhase($rootScope.multiPageJson, $rootScope.messages).then(function () { });

            // todo: update the page title in the meta file
        }

        // registry.localStore.global.context.EnvironmentType == 'Development'


        //                                                                       _________________
        // _____________________________________________________________________/ get data Source \_______ 

        function getData() {
            return cmsFactory.get();
        }


        angular.extend($rootScope.meta, {
            pageAuditTrail: {
                small: true,
                hideLabel: true,
                hideErrorHolder: true,
                label: { lookUpMsg: { id: 0, text: 'Avalable Page Versions' } }, // 
                items: [
                    { text: 'Draft Versions', value: '' },
                    { text: 'Draft v4  - MBoston', value: '1' },
                    { text: 'Draft v3   - MBoston - [pending]', value: '2' },
                    { text: 'Draft v2   - JDuffyperez', value: '3' },
                    { text: 'Draft v1   - MBoston', value: '4' },
                ]
            },
            pageArchiveTrail: {
                small: true,
                hideLabel: true,
                hideErrorHolder: true,
                label: { lookUpMsg: { id: 0, text: 'Avalable Page Versions' } }, // 
                items: [
                    { text: 'Archived Versions', value: '' },
                    { text: '05/12/2017 - Archived - JDuffyperez', value: '6' },
                    { text: '05/11/2017 - Archived - MMouse', value: '7' },
                    { text: '05/10/2017 - Archived - MBoston', value: '8' },
                ]
            },
            templateList: {
                small: true,
                hideLabel: true,
                hideErrorHolder: true,
                label: { lookUpMsg: { id: 0, text: 'Templates' } }, // 
                items: [
                    { text: 'New From Template', value: '' },
                    { text: 'Microsite 1', value: '6' },
                    { text: 'Microsite 2', value: '7' },
                    { text: 'Microsite 3', value: '8' },
                ]
            }




        }
)









    }

})();