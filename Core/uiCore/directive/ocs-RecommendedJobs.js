(function () {
    "use strict";
    globalApp.directive("ocsRecommendedJobs", ['$rootScope', 'jobSearchFactory', 'authentication', 'utilityService', 'templateUrlService', directiveFunction]);

    function directiveFunction($rootScope, jobSearchFactory, authentication, utilityService, templateUrlService) {
        return {
            //replace: true,
            restrict: "E",
            scope: {
                meta: "="
            },
            templateUrl: templateUrlService.get('ocs-RecommendedJobs.html'),
            link: controller
        };

        function controller($scope, element, attrs) {
            function init() {
                reset();
                $scope.doneLoading = false;
                jobSearchFactory.recommendedJobs().$promise.then(function (data) {
                    angular.forEach(data, function (value) {
                        value.url = '/jobView/' + utilityService.tokenize(value.title) + '-id-' + value.source.toLowerCase() + '-' + value.id;
                    });
                    $scope.jobs = data;
                    $scope.doneLoading = true;
                    if (data.length > 0) {
                        $(element).css('display', 'display');
                    }  
                });
            }
            function reset() {
                $(element).parent().find('li').eq(1);
                $scope.jobs = [];
                $scope.doneLoading = true;
            }
            authentication.setup(init, reset, false);
        }
    };
})();
