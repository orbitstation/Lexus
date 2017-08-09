(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            345797:{lookUpMsg:{id: 345797}},
            359208:{lookUpMsg:{id: 359208}},
            345821:{lookUpMsg:{id: 345821}},
            353293:{lookUpMsg:{id: 353293}},
            361445:{lookUpMsg:{id: 361445}}, // Add Loan
            345788:{lookUpMsg:{id: 345788}},
            345833:{lookUpMsg:{id: 345833}},
            345834:{lookUpMsg:{id: 345834}},
            345835:{lookUpMsg:{id: 345835}},
            345836:{lookUpMsg:{id: 345836}},
            345827:{lookUpMsg:{id: 345827}},
            319504:{lookUpMsg:{id: 319504}},
            376198:{lookUpMsg:{id: 376198}},
            367255:{lookUpMsg:{id: 367255}}, // $
            367256:{lookUpMsg:{id: 367256}}, // Monthly amounts, Loans & Credit Payments
            367266:{lookUpMsg:{id: 367266}}, // Add more amounts, loans & credit expenses
            367267:{lookUpMsg:{id: 367267}}, // Amount (to the nearest dollar)
            367268:{lookUpMsg:{id: 367268}}, // average monthly expense
            367269:{lookUpMsg:{id: 367269}}, // Housing & Utilities
            367270:{lookUpMsg:{id: 367270}}, // Add more housing & utilities expenses
            367271:{lookUpMsg:{id: 367271}}, // Add new amounts, loans & credit expenses
            367272:{lookUpMsg:{id: 367272}}, // Add new housing & utility expense
            344391:{lookUpMsg:{id: 344391}}, // Delete
            365646:{lookUpMsg:{id: 365646}}, // Save
            367273:{lookUpMsg:{id: 367273}}, // Reset form
            367570:{lookUpMsg:{id: 367570}}, // Your budget has been saved
            315145:{lookUpMsg:{id: 315145}}, // Ok
            369572:{lookUpMsg:{id: 369572}}  // Budget Calculator
        });

        angular.extend($rootScope.meta, {
            pageHeaderCalculator: {
                title:{lookUpMsg:{id: 345775}},       // BUDGET CALCULATOR
                introBody:{lookUpMsg:{id: 345777}}   // Answer a few questions in 3 easy steps...
            },
            maxLength: 10,
            customUility: {
                label:{lookUpMsg:{id: 361441}},
                placeholder:{lookUpMsg:{id: 376079}}, // Name added expense
                max: '50',
                required: false,
                hideErrorHolder: true
            },
            customAmmount: {
                label:{lookUpMsg:{id: 376080}}, // Ammount
                placeholder:{lookUpMsg:{id: 376081}}, // average monthly expense
                max: '10',
                decimal: true,
                required: false,
                hideErrorHolder: true
            },
            totalUtilities: {
                label:{lookUpMsg:{id: 376082}}, // Total monthly housing & utility expense
                readonly: true,
                hideErrorHolder: true
            },
            totalMisc: {
                label:{lookUpMsg:{id: 376083}}, // Total monthly costs, loans & credit expenses
                readonly: true,
                hideErrorHolder: true
            },
            customMisc: {
                label:{lookUpMsg:{id: 376084}}, // Additional miscellaneous expenses
                placeholder:{lookUpMsg:{id: 376084}}, // Name added expense
                max: '50',
                required: false,
                hideErrorHolder: true
            }
        });
    }
})();