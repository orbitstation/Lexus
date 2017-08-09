(function () {
    angular.module('globalApp').component('ocsOccupationRelatedLinks', {
        bindings: {
            data: '<',
            msg: '<',
            tokenize: '<'
        },
        transclude: true,
        templateUrl: '/scripts/components/ocs-occupation-related-links/ocs-occupation-related-links.component.html',
        controller: function ctrl() {
        }
    });
})();


