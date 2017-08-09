(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            348852:{lookUpMsg:{id:348852}}, // Saved Schools
            364328:{lookUpMsg:{id:364328}}, // My Saved School
            364329:{lookUpMsg:{id:364329}}, // This is the school information and programs offered by the school.
            364318:{lookUpMsg:{id:364318}}, // Your saved schools are shown below. To view the saved schools details, click the title.
            364320:{lookUpMsg:{id:364320}}, // Are you sure you want to delete the selected saved school?
            364319:{lookUpMsg:{id:364319}}, // possible saved schools
            157926:{lookUpMsg:{id:157926}}, // Delete
            157204:{lookUpMsg:{id:157204}}, // You have saved
            104616:{lookUpMsg:{id:104616}}, // of
            364212:{lookUpMsg:{id:364212}}, // Compare Jobs
            349256:{lookUpMsg:{id:349256}}, // Start Occupation Search
            364213:{lookUpMsg:{id:364213}}, // Add to compare
            348967:{lookUpMsg:{id:348967}}, // You don\'t have any schools saved. Visit <a href="/OccupationSearch/OccupationSearch.aspx">Occupation Search</a> to save schools to your Backpack.
            347220:{lookUpMsg:{id:347220}}, // School Type
            347218:{lookUpMsg:{id:347218}}, // School Size
            347219:{lookUpMsg:{id:347219}}, // Other Degrees Offered
            347221:{lookUpMsg:{id:347221}}, // Website
            256512:{lookUpMsg:{id:256512}}, // Links
            103539:{lookUpMsg:{id:103539}}, // Address
            347222:{lookUpMsg:{id:347222}}, // Program Name
            364637:{lookUpMsg:{id:364637}}, // Ocupation:
            346429:{lookUpMsg:{id:346429}}, // Saved
            347223:{lookUpMsg:{id:347223}}, // Length
            347224:{lookUpMsg:{id:347224}}, // Award Level
            288221:{lookUpMsg:{id:288221}}, // Admissions
            288222:{lookUpMsg:{id:288222}}, // Financial Aid
            289051:{lookUpMsg:{id:289051}}, // School Information
            364326:{lookUpMsg:{id:364326}}, // Programes Offered
            280958:{lookUpMsg:{id:280958}}, // Apply
            315145:{lookUpMsg:{id:315145}}, // OK
            162574: { lookUpMsg: { id: 162574 } }, // Cancel
            339822: { lookUpMsg: { id: 339822 } }, // Back
            365751: { lookUpMsg: { id: 365751 } }, // Confirm delete
            379091: { lookUpMsg: { id: 379091 } },
            379092: { lookUpMsg: { id: 379092 } }
        });

        angular.extend($rootScope.meta, {
            pageHeader: {
                title:{lookUpMsg:{id:348852 } },       // Saved Schools
                introBody:{lookUpMsg:{id:364318 } }   // 
            },
            savedSchoolHeader: {
                title:{lookUpMsg:{id:364328 } },       // Saved School
                introBody:{lookUpMsg:{id:364329 } }   // 
            }
        });
    }
})();