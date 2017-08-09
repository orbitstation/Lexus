(function () {
    angular.module('globalApp').component('ocsOccupationDetailActions', {
        bindings: {
            meta: '<',
            msg: '<',
            save: '<',
            change: '<'
        },
        transclude: true,
        templateUrl: '/scripts/components/ocs-occupation-detail-actions/ocs-occupation-detail-actions.component.html',
        controller: function ctrl() {
        }
    });
})();


