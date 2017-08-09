(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);

    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            //These are defaults don't use them
            267584:{lookUpMsg:{id:267584}}, // Header
            204974:{lookUpMsg:{id:204974}}, // Default p tag Text
            //These are defaults don't use them
            364094:{lookUpMsg:{id:364094}}, // Saved Documents
            364095:{lookUpMsg:{id:364095}}, // Upload and manage your documents
            360766:{lookUpMsg:{id:360766}}, // You have uploaded
            157932:{lookUpMsg:{id:104616}}, // of
            365794:{lookUpMsg:{id:365794}}, // documents.
            354555:{lookUpMsg:{id:354555}}, // Type
            118647:{lookUpMsg:{id:118647}}, // KB
            157853:{lookUpMsg:{id:157853}}, // Delete
            253912:{lookUpMsg:{id:253912}}, // Date Uploaded:
            365795:{lookUpMsg:{id:365795}}, // Do you really want to delete....
            246651:{lookUpMsg:{id:246651}}, // Confirm Delete
            315145:{lookUpMsg:{id:315145}}, // Ok
            162574:{lookUpMsg:{id:162574}}, // Cancel
            379079: { lookUpMsg: { id: 379079 } },
            379080: { lookUpMsg: { id: 379080 } }

        });

        angular.extend($rootScope.meta, {
            pageHeaderSummary: {
                title:{lookUpMsg:{id:364094 } },       // Saved Documents
                introBody:{lookUpMsg:{id:364095 } }   // Upload and manage your documents
            },
            docName: {
                label:{lookUpMsg:{id:344382}}, // Document Name
                required: 'true',
                mask: '',
                max: '100',
                error: {
                    required:{lookUpMsg:{id:370267}} // Please enter a Document Name.
                },
                type: 'text'
            },
            docFormat: {
                label:{lookUpMsg:{id:361289}}, // Format
                type: 'text',
                disabled: true
            },
            docSize: {
                label:{lookUpMsg:{id:361288}}, // Size
                type: 'text',
                disabled: true
            }
        });
    }
})();