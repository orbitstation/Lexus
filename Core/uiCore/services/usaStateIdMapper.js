(function () {
    angular.module('globalApp').service('usaStateIdMapper', service);

    service.$inject = [];

    function service() {
        return {
            map: function (stateAbbreviation) {
                var states = {
                    'AL': 2, // Alabama
                    'AK': 3, // Alaska
                    'AZ': 5, // Arizona
                    'AR': 6, // Arkansas
                    'CA': 11, // California
                    'CO': 17, // Colorado
                    'CT': 18, // Connecticut
                    'DE': 19, // Delaware
                    'FL': 23, // Florida
                    'GA': 24, // Georgia
                    'HI': 27, // Hawaii
                    'ID': 29, // Idaho
                    'IL': 30, // Illinois
                    'IN': 31, // Indiana
                    'IA': 32, // Iowa
                    'KS': 34, // Kansas
                    'KY': 35, // Kentucky
                    'LA': 36, // Louisiana
                    'ME': 37, // Maine
                    'MD': 39, // Maryland
                    'MA': 40, // Massachusetts
                    'MI': 42, // Michigan
                    'MN': 44, // Minnesota
                    'MS': 45, // Mississippi
                    'MO': 46, // Missouri
                    'MT': 47, // Montana
                    'NE': 50, // Nebraska
                    'NV': 51, // Nevada
                    'NH': 53, // New Hampshire
                    'NJ': 54, // New Jersey
                    'NM': 55, // New Mexico
                    'NY': 57, // New York
                    'NC': 59, // North Carolina
                    'ND': 60, // North Dakota
                    'OH': 68, // Ohio
                    'OK': 69, // Oklahoma
                    'OR': 71, // Oregon
                    'PA': 72, // Pennsylvania
                    'RI': 80, // Rhode Island
                    'SC': 86, // South Carolina
                    'SD': 87, // South Dakota
                    'TN': 91, // Tennessee
                    'TX': 92, // Texas
                    'UT': 94, // Utah
                    'VT': 96, // Vermont
                    'VA': 99, // Virginia
                    'WA': 101,// Washington
                    'WV': 102,// West Virginia
                    'WI': 105,// Wisconsin
                    'WY': 106,// Wyoming

                    // Commonwealth/Territory
                    'AS': 960,// American Samoa
                    'DC': 20, // District of Columbia
                    'FM': 577,// Federated States of Micronesia
                    'GU': 959,// Guam
                    'MH': '', // Marshall Islands
                    'MP': '', // Northern Mariana Islands
                    'PW': '', // Palau
                    'PR': 75, // Puerto Rico
                    'VI': 98, // Virgin Islands

                    // Military "State"
                    'AE': 575,// Armed Forces Africa / Armed Forces Europe / Armed Forces Middle East
                    'AA': 574,// Armed Forces Americas
                    'AL': 575,// Armed Forces Canada
                    'AP': 576 // Armed Forces Pacific
                }

                return states[stateAbbreviation];
            }
        }
    }
})();