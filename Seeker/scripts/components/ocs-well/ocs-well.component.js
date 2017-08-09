(function () {
    angular.module('globalApp').component('ocsWell', {
        bindings:{
            className: '<'
        },
        transclude: true,
        templateUrl: '/scripts/components/ocs-well/ocs-well.component.html',
        controller: function ctrl() {
            var ctrl = this;

            ctrl.$onInit = onInit;


            function onInit() {
                ctrl.default = (ctrl.className) ? ctrl.className : true;
                
            }
        }
    });
})();


