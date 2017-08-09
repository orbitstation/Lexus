(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            //These are defaults don't use them
            267584: { lookUpMsg: { id: 267584, text: 'Header' } },
            204974: { lookUpMsg: { id: 204974, text: 'Default p tag Text' } }
            //These are defaults don't use them
        });
        angular.extend($rootScope.meta, {
            spaGroups: {
                bucket1: {
                    minispa: { percent: '70', display: '', url: '', notes: '' },
                    minispa: { percent: '70', display: '', url: '', notes: '' },
                    minispa: { percent: '70', display: '', url: '', notes: '' },
                    minispa: { percent: '70', display: '', url: '', notes: '' },
                    minispa: { percent: '70', display: '', url: '', notes: '' },
                    minispa: { percent: '70', display: '', url: '', notes: '' },
                    minispa: { percent: '70', display: '', url: '', notes: '' }
                }
            }
        });
    }
})();