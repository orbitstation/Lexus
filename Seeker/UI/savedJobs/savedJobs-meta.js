(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            // Index Page
            205039:{lookUpMsg:{id:205039}}, // My Saved Jobs
            177824:{lookUpMsg:{id:177824}}, // Your saved jobs are shown below. To view a saved job, click the job title. Ready to apply? Click Apply Now!
            157932:{lookUpMsg:{id:157932}}, // of
            157931:{lookUpMsg:{id:157931}}, //  possible jobs.
            99473: {lookUpMsg:{id:99473}},  // Remove
            346429:{lookUpMsg:{id:346429}}, // Saved
            672:   {lookUpMsg:{id:672}},    // Expires
            157204:{lookUpMsg:{id:157204}},
            51:    {lookUpMsg:{id:51}},     // Company
            44:    {lookUpMsg:{id:44}},     // Location
            365750:{lookUpMsg:{id:365750}}, // Are you sure you want to delete the selected saved job?
            315145:{lookUpMsg:{id:315145}}, // OK
            162574:{lookUpMsg:{id:162574}}, // Cancel
            365751:{lookUpMsg:{id:365751}}, // Confirm delete
            107436:{lookUpMsg:{id:107436}}, // expired
            // oneClickUnsubscribe
            365472:{lookUpMsg:{id:365472}}, // One Click Unsubscribe
            365473:{lookUpMsg:{id:365473}}, // this is the p tag for One Click Unsubscribe
            379083: { lookUpMsg: { id: 379083 } },
            379084: { lookUpMsg: { id: 379084 } }


        });
        angular.extend($rootScope.meta, {
            pageHeaderSavedJobs: {
                title:{lookUpMsg:{id:205039 } },      // Saved Jobs
                introBody:{lookUpMsg:{id:177824 } }   // Your saved jobs are shown below. To view a saved job, click the job title. Ready to apply? Click Apply Now!
            }
        });
    }
})();