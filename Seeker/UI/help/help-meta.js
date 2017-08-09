/* Meta Data for the "Contact Us" Flow miniSPA  */
(function (angular) {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            //Career goal help html
            360184:{lookUpMsg:{id:360184}},
            360118:{lookUpMsg:{id:360118}} // How to write effective goals
    });
        angular.extend($rootScope.meta, {
            pageHeaderHelp: {
                title:{lookUpMsg:{id:360118}},       // How to write effective goals
                introBody:{lookUpMsg:{id:360184}}   // Learn how to write effective goals description
            }
        });
    }
})(angular);