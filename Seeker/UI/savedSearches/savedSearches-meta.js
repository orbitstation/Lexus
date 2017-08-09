(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            306850:{lookUpMsg:{id:306850}}, // My Saved Searches
            364330:{lookUpMsg:{id:364330}}, // Your saved searches are shown below.
            200028:{lookUpMsg:{id:200028}},
            157204:{lookUpMsg:{id:157204}},
            157932:{lookUpMsg:{id:104616}}, // of
            157942:{lookUpMsg:{id:157942}},
            171463:{lookUpMsg:{id:171463}}, // None
            171462:{lookUpMsg:{id:171462}}, // Monthly
            171461:{lookUpMsg:{id:171461}}, // Bi-Weekly
            171460:{lookUpMsg:{id:171460}}, // Weekly
            171459:{lookUpMsg:{id:171459}}, // Daily
            347058:{lookUpMsg:{id:347058}}, // Email
            347059:{lookUpMsg:{id:347059}}, // On Demand
            157926:{lookUpMsg:{id:157926}}, // Delete
            157940:{lookUpMsg:{id:157940}}, // Edit
            347038:{lookUpMsg:{id:347038}}, // Type
            347039:{lookUpMsg:{id:347039}}, // Frequency
            104869:{lookUpMsg:{id:104869}}, // Saved Searches
            293372:{lookUpMsg:{id:293372}}, // Unsubscribe
            347082:{lookUpMsg:{id:347082}}, // Edit Saved Searches
            346964:{lookUpMsg:{id:346964}},
            315145:{lookUpMsg:{id:315145}}, // OK
            162574:{lookUpMsg:{id:162574}}, // Cancel
            866:{lookUpMsg:{id:866}}, // Save
            176527:{lookUpMsg:{id:176527}}, // Save and Run
            30305:{lookUpMsg:{id:30305}},
            347077:{lookUpMsg:{id:347077}}, // Job Title
            347078:{lookUpMsg:{id:347078}}, // Keywords
            347079:{lookUpMsg:{id:347079}}, // Location
            347080:{lookUpMsg:{id:347080}}, // Radius
            347081:{lookUpMsg:{id:347081}}, // Job Type
            1717:{lookUpMsg:{id:1717}}, // Contract
            70721:{lookUpMsg:{id:70721}}, // Full Time
            30028:{lookUpMsg:{id:30028}}, // Internship
            60032:{lookUpMsg:{id:60032}}, // Other
            70722:{lookUpMsg:{id:70722}}, // Part Time
            73245:{lookUpMsg:{id:73245}}, // Temp
            363679:{lookUpMsg:{id:363679}},
            364637:{lookUpMsg:{id:364637}}, // Occupation
            272187:{lookUpMsg:{id:272187}}, // Never
            365472:{lookUpMsg:{id:365472}}, // One Click Unsubscribe
            175689:{lookUpMsg:{id:175689}}, // Saved Search Notifications
            246651:{lookUpMsg:{id:246651}}, // Confirm Delete
            364722:{lookUpMsg:{id:364722}}, // Update preferences
            346429:{lookUpMsg:{id:346429}}, // Saved
            254822: { lookUpMsg: { id: 254822 } }, // miles
            365473:{lookUpMsg:{id:365473}}, // this is the p tag for One Click Unsubscribe
            117427:{lookUpMsg:{id:117427}}, // You have successfully unsubscribed
            117428:{lookUpMsg:{id:117428}}, // Thank you for choosing to maintain your subscription.
            163773:{lookUpMsg:{id:163773}}, // Error Message
            127121:{lookUpMsg:{id:127121}}, // Email Address
            129561: { lookUpMsg: { id: 129561 } }, // Company
            379085: { lookUpMsg: { id: 379085 } }, 
            379086: { lookUpMsg: { id: 379086 } }

        });
        angular.extend($rootScope.meta, {
            breadCrumbsEdit: [{ "display":{lookUpMsg:{id:306850 } }, "url": '' }], //Saved Searches

            pageHeaderSaved: {
                title:{lookUpMsg:{id:306850 } },       // Saved Searches
                introBody:{lookUpMsg:{id:364330 } }   // Your saved searches are shown below. To view your saved search results, click on the title.
            },
            pageHeaderEdit: {
                title:{lookUpMsg:{id:347082 } },       // Edit saved Search
                introBody:{lookUpMsg:{id:346964 } }   // Tell us about the type of job you are looking for. We’ll do the searching for you, and automatically notify you when the right jobs are posted. You can save up to 10 saved searches and can modify your search criteria at anytime.
            },
            title: {
                label:{lookUpMsg:{id:157972}}, // Title
                required: true,
                mask: '',
                max: 50,
                error: {
                    required:{lookUpMsg:{id:359733}} // Search Title is required
                },
                type: 'text'
            },
            select: {
                label:{lookUpMsg:{id:157959}}, // How often do you want to receive results
                required: true,
                max: 255,
                error: {
                    required:{lookUpMsg:{id:555}} // required
                },
                type: 'text',
                defaultSelected: 7,
                //dataSource: { name: '', value: '' },
                items: [
                  { text: { lookUpMsg: { id: 533, text: 'None' } }, value: 0 },
                  { text: { lookUpMsg: { id: 857, text: 'Daily' } }, value: 1 },
                  { text: { lookUpMsg: { id: 858, text: 'Weekly' } }, value: 7 },
                  { text: { lookUpMsg: { id: 859, text: 'Bi-Weekly' } }, value: 14 },
                  { text: { lookUpMsg: { id: 860, text: 'Monthly' } }, value: 30 }
                ]
            },
            //                                                                  _________________________
            // ________________________________________________________________/  One Click Unsubscribe  \____________
            //stop Receiving emails?
            optOut: {
                label:{lookUpMsg:{id:365697}}, // Do you want to stop receiving Saved Search Notifications at your email address?
                required: true,
                defaultSelected: "1",
                items: [
                    { text: { lookUpMsg: { id: 376196, text: '' } }, value: true },
                    { text: { lookUpMsg: { id: 376197, text: '' } }, value: false }
                ]
            },
            //stop Receiving emails - servey
            survey: {
                label:{lookUpMsg:{id:365489, text: '' } },
                required: false,
                max: '255',
                error: {
                    required:{lookUpMsg:{id:555 } }, // required
                },
                type: 'text',
                dataSource: { name: 'getLookup', value: 'AgentOptOutSurveyQuestions' },
                defaultSelected: 1
            },
            //stop Receiving emails?
            otherComment: {
                label:{lookUpMsg:{id:364626}}, // Comments
                required: true
            }
        });
    }
})();