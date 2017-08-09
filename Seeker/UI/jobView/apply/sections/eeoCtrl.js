(function () {
    angular.module('miniSPA').service('EEOService', EEO);

    function EEO() {
        var ctrl;
        function setCtrl(scope){
            ctrl = scope;
            console.log(ctrl.resumeUrlId);
        }

        return {
            setCtrl: setCtrl,
        }
    }
})();