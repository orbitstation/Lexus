(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope','$location', run]);

    function run($rootScope, $location) {
        angular.extend($rootScope.meta.messages, {
            182937:{lookUpMsg:{id:182937}}, // For better results, try broadening your search.
            182938:{lookUpMsg:{id:182938}}, // We're sorry, but we couldn't find any jobs that match your criteria.
            284057:{lookUpMsg:{id:284057}}, // Search filters
            370227:{lookUpMsg:{id:370227}}, // Save search
            363526:{lookUpMsg:{id:363526}}, // Remove filter
            363527:{lookUpMsg:{id:363527}}, // Next
            363528:{lookUpMsg:{id:363528}}, // Previous
            363529:{lookUpMsg:{id:363529}}, // jobs in
            363530:{lookUpMsg:{id:363530}}, // Found
            363531:{lookUpMsg:{id:363531}}, // jobs
            363532:{lookUpMsg:{id:363532}}, // Summary
            363533:{lookUpMsg:{id:363533}}, // Detail
            363534:{lookUpMsg:{id:363534}}, // Sort by
            363535:{lookUpMsg:{id:363535}}, // Date
            363536:{lookUpMsg:{id:363536}}, // Relevance
            363675:{lookUpMsg:{id:363675}}, // Search agent successfully saved!,
            370217:{lookUpMsg:{id:370217}}, // Veteran Wanted
            370218:{lookUpMsg:{id:370218}}, // Save
            370219:{lookUpMsg:{id:370219}}, // Saved
            375947:{lookUpMsg:{id:375947}}, // Sorted by Vets Wanted
            370220:{lookUpMsg:{id:370220}}, // Veterans Wanted only
            370221:{lookUpMsg:{id:370221}}, // View all filters
            370225:{lookUpMsg:{id:370225}}, // Refine search
            370226:{lookUpMsg:{id:370226}}, // Saved searches
            370499:{lookUpMsg:{id:370499}}, // Veterans
            365645:{lookUpMsg:{id:365645}}, // Remove
            370522:{lookUpMsg:{id:370522}}, // Remove all
            254828:{lookUpMsg:{id:254828}}, // Search Results
            70733: {lookUpMsg:{id:70733 }}, // Company Name
            353319:{lookUpMsg:{id:353319 } }, // Sorry, we didn't find any jobs matching your criteria
            377188:{lookUpMsg:{id:377188 } }, // Modified your search criteria and found
            353320: { lookUpMsg: { id: 353320 } }, // These are our newest jobs
            288378: { lookUpMsg: { id: 288378 } }, // clear all
            379398: { lookUpMsg: { id: 379398 } }, // Recent searches
            280695: { lookUpMsg: { id: 280695 } }, //in
            379603: { lookUpMsg: { id: 379603 } }, //All
            379604: { lookUpMsg: { id: 379604 } }, //Jobs
        });
        angular.extend($rootScope.meta, {
            pageHeader: {
                title:{lookUpMsg:{id:254828 } },  // Search Results
                introBody:{lookUpMsg:{id:0 } }   //
            },
            companyName: {
                label:{lookUpMsg:{id:70733 } },
                required: false,
                max: '100',
                type: 'text',
                disabled: false,
                hideErrorHolder: true,
                hideLabel: true
            }
        });
    }
})();