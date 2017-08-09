(function () {
    angular.module('globalApp').component('ocsIntroSection', {
        bindings: {
            meta: '<',
            title: '<',
            description: '<'
        },
        transclude: {
            'body': '?ocsIntroSectionBody',
            'dynamic': '?ocsDynamic',
            'well': '?ocsWell',
            'actions': '?ocsIntroSectionActions'
        },
        templateUrl: '/scripts/components/ocs-intro-section/ocs-intro-section.component.html',
        controller: ['$transclude', '$scope', function ($transclude, $scope) {
            var ctrl = this;

            ctrl.$onInit = onInit;

            function onInit() {
                ctrl.isWellPresent = function () {
                    return $transclude.isSlotFilled('well');
                };
                ctrl.isBodyPresent = function () {
                    return $transclude.isSlotFilled('body');
                };
                ctrl.isDynamicHeading = function () {
                    return $transclude.isSlotFilled('dynamic');
                };
                ctrl.isActionPresent = function () {
                    return $transclude.isSlotFilled('actions');
                };
            }
        }]
    });
})();

