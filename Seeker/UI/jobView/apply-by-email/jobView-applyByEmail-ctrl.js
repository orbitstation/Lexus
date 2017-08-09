(function () {
    "use strict";
    angular.module('miniSPA').controller('jobViewApplyByEmailCtrl', ['$scope', '$rootScope', 'productVariables', '$log', 'BrowserDetect', '$timeout', '$window', '$location', '$resource', '$sanitize', 'jobViewFactory', 'savedJobsFactory', '$routeParams', 'sendJobEmailFactory', 'UserAccount', 'vcRecaptchaService', 'applicationHistory', controller]);
    function controller($scope, $rootScope, productVariables, $log, BrowserDetect, $timeout, $window, $location, $resource, $sanitize, jobViewFactory, savedJobsFactory, $routeParams, sendJobEmailFactory, UserAccount, vcRecaptchaService, applicationHistory) {

        $scope.serviceErrorList = [];
        
    }
})();