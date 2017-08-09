(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            158474:{lookUpMsg:{id:158474}}, // Status:
            160734:{lookUpMsg:{id:160734}}, // Application History
            349101:{lookUpMsg:{id:349101}}, // Apply history placeholder text
            177835:{lookUpMsg:{id:177835}}, // You have not applied for any jobs in the last 30 days.
            367918:{lookUpMsg:{id:367918}}, // You have not applied for any jobs in the last 18 months.
            350266:{lookUpMsg:{id:350266}}, // You have applied to <strong>{0}</strong> jobs in the last <strong>18</strong> months
            98839:{lookUpMsg:{id:98839}}, // Apply Date
            98876:{lookUpMsg:{id:98876}}, // Status
            318996:{lookUpMsg:{id:318996}}, // Cover Letter
            107292:{lookUpMsg:{id:107292}}, // Resume
            512:{lookUpMsg:{id:512}}, // Job Title
            348119:{lookUpMsg:{id:348119}}, // Applied on
            176423:{lookUpMsg:{id:176423}}, // Applied
            51:{lookUpMsg:{id:51}}, // Company
            44:{lookUpMsg:{id:44}}, // Location
            364632:{lookUpMsg:{id:364632}}, // Pagination
            129571:{lookUpMsg:{id:129571}}, // deleted
            107436:{lookUpMsg:{id:107436}}, // expired
            266213: { lookUpMsg: { id: 266213 } },
            379081: { lookUpMsg: { id: 379081 } },
            379082: { lookUpMsg: { id: 379082 } }

        });
        angular.extend($rootScope.meta, {
            breadCrumbsAppHistory: [{ "display":{lookUpMsg:{id:160734 } }, "url": '' }], // Job Application History
            pageHeaderAppHistory: {
                title:{lookUpMsg:{id:160734 } },       // Job Application History
                introBody:{lookUpMsg:{id:349101 } }   // Apply history placeholder text...You have not applied for any jobs in the last 18 months.
            }
        });
    }
})();