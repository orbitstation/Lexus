(function () {
    'use strict';
    angular.module('globalApp').directive('ocsChart', ['$parse', '$rootScope', '$log', 'templateUrlService', directiveFunction]);

    function directiveFunction($parse, $rootScope, $log, templateUrlService) {
            return {
                restrict: 'E',
                templateUrl: templateUrlService.get('ocs-Chart.html'),
                link: function (scope, element, attrs) {
                    var id = attrs['id'];
                    var settings = $parse(attrs['settings'])(scope);

                    var baseSettings = { holderId: id, width: settings.width, height: settings.height };
                    var typeSettings = settings.typeSettings;

                    scope.set = new nfzChart(baseSettings)[settings.type](typeSettings, settings.mockData);
                }
            };
        };

})();
