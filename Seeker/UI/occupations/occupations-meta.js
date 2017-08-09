(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            348857:{lookUpMsg:{id:348857}}, // Saved Occupations
            364195:{lookUpMsg:{id:364195}}, // Your saved occupations are shown below. To view the saved occupation details, click the title.
            364196:{lookUpMsg:{id:364196}}, // Are you sure you want to delete the selected saved occupation?
            364205:{lookUpMsg:{id:364205}}, // possible saved occupations
            157926:{lookUpMsg:{id:157926}}, // Delete
            157204:{lookUpMsg:{id:157204}}, // You have saved
            104616:{lookUpMsg:{id:104616}}, // of
            364212:{lookUpMsg:{id:364212}}, // Compare Now
            349256:{lookUpMsg:{id:349256}}, // Start Occupation Search
            364213:{lookUpMsg:{id:364213}}, // Add to compare
            348880:{lookUpMsg:{id:348880}}, // Compare
            372175:{lookUpMsg:{id:372175}}, // Select up to 2 occupations to compare.
            360368:{lookUpMsg:{id:360368}}, // Occupational Search
            360369:{lookUpMsg:{id:360369}}, // Search thousands of occupations by industry or keyword.
            322909:{lookUpMsg:{id:322909}}, // Industry Search
            360439:{lookUpMsg:{id:360439}}, // Military Search
            322910:{lookUpMsg:{id:322910}}, // Keyword Search
            368208:{lookUpMsg:{id:368208}}, // Occupational Search Results
            360440:{lookUpMsg:{id:360440}}, // Enter the name or code of your military classification to view suggested civilian careers with similar work.
            360441:{lookUpMsg:{id:360441}}, // Use <a href="https://www.onetonline.org/crosswalk">https://www.onetonline.org/crosswalk</a> website to find a code for your military classification
            356219:{lookUpMsg:{id:356219}}, // Find My Career
            356220: { lookUpMsg: { id: 356220 } }, // Are you a butcher, a baker or a candlestick maker? Answer these questions and find out which careers suit you best.
            376538: { lookUpMsg: { id: 376538 } }, // Integer vitae ante ut lorem congue feugiat. Nulla dolor ex, interdum vitae enim ac, dictum hendrerit arcu. Donec dictum orci lacus, et auctor mi accumsan eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus at nulla risus. Cras et faucibus libero. Etiam semper tincidunt condimentum.
            370117: { lookUpMsg: { id: 370117 } }, // Edit my answers
            361145: { lookUpMsg: { id: 361145 } }, // *Ranges with asterisk are national averages, all others are TX salary ranges.
            377468: { lookUpMsg: { id: 377468 } }, // Back to occupation search
            377469: { lookUpMsg: { id: 377469 } }, // Back to my search results
            356221:{lookUpMsg:{id:356221}}, // Career Assessment Tool
            347179:{lookUpMsg:{id:347179}}, //InDemand
            347181:{lookUpMsg:{id:347181}}, // Green Job
            347180:{lookUpMsg:{id:347180}}, // Bright Outlook
            347182:{lookUpMsg:{id:347182}}, // Apprenticeship
            367167:{lookUpMsg:{id:367167}}, // Green icon description
            367168:{lookUpMsg:{id:367168}}, // InDemand icon description
            367169:{lookUpMsg:{id:367169}}, // Bright Outlook icon description
            367170:{lookUpMsg:{id:367170}}, // Apprenticeship Program icon description
            347200: { lookUpMsg: { id: 347200 } },  // These {0} careers might be a good match for {1}.
            368362: { lookUpMsg: { id: 368362 } },  // These {0} occupations might be a good match for {1}
            347201: { lookUpMsg: { id: 347201 } }, // No similar civilian careers were found for {0} for {1}
            347202: { lookUpMsg: { id: 347202 } }, // {0} civilian careers were found similar to {1} for {2}
            346853:{lookUpMsg:{id:346853}}, // Occupational Search
            349011:{lookUpMsg:{id:349011}}, // Search thousands of occupations by industry or keyword.
            325398:{lookUpMsg:{id:325398}}, // Occupation (In order of best match)
            360791:{lookUpMsg:{id:360791}}, // InDemand
            325126:{lookUpMsg:{id:325126}}, // Average Salary Range*
            194815:{lookUpMsg:{id:194815}},
            356255:{lookUpMsg:{id:356255}},
            137216:{lookUpMsg:{id:137216}}, // Basic Info
            356256:{lookUpMsg:{id:356256}}, // Skills levels
            356258:{lookUpMsg:{id:356258}}, // Overlapping skills
            356259:{lookUpMsg:{id:356259}}, 
            363532:{lookUpMsg:{id:363532}}, // Summary
            202482:{lookUpMsg:{id:202482}}, // Overview
            363533:{lookUpMsg:{id:363533}}, // Detail
            330019:{lookUpMsg:{id:330019}}, // Related
            163047:{lookUpMsg:{id:163047}}, // Industries
            347186:{lookUpMsg:{id:347186}}, // Skills
            347187:{lookUpMsg:{id:347187}}, // Abilities
            347188:{lookUpMsg:{id:347188}}, // Knowledge
            347189:{lookUpMsg:{id:347189}}, // Education
            319954:{lookUpMsg:{id:319954}}, // Pay
            347194:{lookUpMsg:{id:347194}}, // State employment trends
            347195:{lookUpMsg:{id:347195}}, // Personality
            347196:{lookUpMsg:{id:347196}}, // Tools
            272067:{lookUpMsg:{id:272067}}, // Technology
            347190:{lookUpMsg:{id:347190}}, // Work experience
            347191:{lookUpMsg:{id:347191}}, // Training
            347217:{lookUpMsg:{id:347217}}, // Education training
            319960:{lookUpMsg:{id:319960}}, // Currently employed
            319961:{lookUpMsg:{id:319961}}, // Projected openings
            346906:{lookUpMsg:{id:346906}}, // Find {0} jobs
            347185:{lookUpMsg:{id:347185}}, // Work acivities
            376199:{lookUpMsg:{id:376199}}, // Work Style
            347198:{lookUpMsg:{id:347198}}, // Additional resources
            319931:{lookUpMsg:{id:319931}}, // saved
            319930:{lookUpMsg:{id:319930}}, // save
            364633:{lookUpMsg:{id:364633}}, // No overlapping skills
            333025:{lookUpMsg:{id:333025}}, // Education and Traning
            364705:{lookUpMsg:{id:364705}},
            347220:{lookUpMsg:{id:347220}}, // School Type
            347218:{lookUpMsg:{id:347218}}, // School Size
            347219:{lookUpMsg:{id:347219}}, // Other Degrees Offered
            347221:{lookUpMsg:{id:347221}}, // Website
            347222:{lookUpMsg:{id:347222}}, // Program Name
            347223:{lookUpMsg:{id:347223}}, // Length
            347224:{lookUpMsg:{id:347224}}, // Award Level
            288221:{lookUpMsg:{id:288221}}, // Admissions
            288222:{lookUpMsg:{id:288222}}, // Financial Aid
            289051:{lookUpMsg:{id:289051}}, // School Information
            364326:{lookUpMsg:{id:364326}}, // Programes Offered
            280958:{lookUpMsg:{id:280958}}, // Apply
            347225:{lookUpMsg:{id:347225}}, // No schools found
            313738:{lookUpMsg:{id:313738}}, // No data available
            365617:{lookUpMsg:{id:365617}}, // There are no schools for the selected state
            315145:{lookUpMsg:{id:315145}}, // OK
            162574:{lookUpMsg:{id:162574}}, // Cancel
            366431:{lookUpMsg:{id:366431}}, // Occupation Saved
            366985:{lookUpMsg:{id:366985}}, // Add to my saved occupations
            367017:{lookUpMsg:{id:367017}}, // Find related jobs
            365751: { lookUpMsg: { id: 365751 } }, // Confirm delete
            256512: { lookUpMsg: { id: 256512 } }, // Links
            368560: { lookUpMsg: { id: 368560 } }, // Phone
            103539: { lookUpMsg: { id: 103539 } }, // Address
            379089: { lookUpMsg: { id: 379089 } },
            379090: { lookUpMsg: { id: 379090 } }

        });

        angular.extend($rootScope.meta, {
            breadCrumbsSearchPage: [{ "display":{lookUpMsg:{id:346853  } }, "url": '' }], //Occupational Search
            breadCrumbsDetailsPage: [{ "display": { lookUpMsg: { id: 378957 } }, "url": '' }], // dev note: this is filled in by the controller
            breadCrumbsComparePage: [{ "display":{lookUpMsg:{id:194815 } }, "url": '' }], //Compare Occupations
            breadCrumbsResultsPage: [{ "display":{lookUpMsg:{id:368208 } }, "url": '' }], //Occupational Search Results
            breadCrumbsEduPage: [{ "display":{lookUpMsg:{id:333025 } }, "url": '' }],     //Education and Training
            breadCrumbsSavedPage: [{ "display":{lookUpMsg:{id:348857 } }, "url": '' }],   //Education and Training
            pageHeader: {
                title:{lookUpMsg:{id:346853 } }
              //  introBody:{lookUpMsg:{id:346853 } },
            },
            pageHeaderSearch: {
                title:{lookUpMsg:{id:368208 } },     // Occupational Search Results
                introBody:{lookUpMsg:{id:349011 } } // Search thousands of occupations by industry or keyword.
            },
            pageHeaderEdu: {
                title:{lookUpMsg:{id:333025 } },     // Education and Training
                introBody:{lookUpMsg:{id:364705 } } // The following are training programs applicable
            },
            pageHeaderCompare: {
                title:{lookUpMsg:{id:194815 } },     // Compare Occupations
                introBody:{lookUpMsg:{id:356255 } } // Compare average salaries, see how much education...
            },
            pageHeaderSaved: {
                title:{lookUpMsg:{id:348857 } },     // Saved Occupations
                introBody:{lookUpMsg:{id:364195 } } // Your saved occupations are shown below. To view ...
            },
            industry: {
                hideErrorHolder: true,
                dataSource: { name: 'getOccupationIndustries' }
            },
            industryButton: {
                label:{lookUpMsg:{id:363957}}, // GO
                validation: 'globalForm.$invalid'
            },
            keyword: {
                hideErrorHolder: true,
                placeholder:{lookUpMsg:{id:363959}}, // (e.g. doctor, build houses)
            },
            keywordButton: {
                label:{lookUpMsg:{id:363957}}, // GO
                validation: 'globalForm.$invalid'
            },
            militaryButton: {
                label:{lookUpMsg:{id:363957}}, // GO
                validation: 'globalForm.$invalid'
            },
            military: {
                hideErrorHolder: true,
                hideLabel:true,
                dataSource: { name: 'getOccupationMilitaryBranches' }
            },
            militaryKeyword: {
                hideErrorHolder: true,
                hideLabel: true,
                placeholder:{lookUpMsg:{id:360451}} // (e.g. 0963, radio chief)
            },
            occupationDetail: {
                title:{lookUpMsg:{id:360368}}, // Statewide occupation search
                subtitle:{lookUpMsg:{id:367581}}, // Subtitle
                introBody:{lookUpMsg:{id:367582}} // Intro Body ...
            },
            occupationSearchResults: {
                leaf: "https://securemedia.newjobs.com/ID/mgs/" + $rootScope.registry.localStore.global.context.ChannelID + "/occupationSearch/ico-leaf-16.jpg",
                sun: "https://securemedia.newjobs.com/ID/mgs/" + $rootScope.registry.localStore.global.context.ChannelID + "/occupationSearch/ico-sun-16.jpg",
                book: "https://securemedia.newjobs.com/ID/mgs/" + $rootScope.registry.localStore.global.context.ChannelID + "/occupationSearch/ico-book-16.jpg",
                exclamation: "https://securemedia.newjobs.com/ID/mgs/" + $rootScope.registry.localStore.global.context.ChannelID + "/occupationSearch/ico-exclamation-16.jpg",
                compareButton: {
                    label:{lookUpMsg:{id:364212}}, // Compare Now
                    disabled: true
                },
                occupationTitleMaxLength: 40
            },
            state: {
                label:{lookUpMsg:{id:234}}, // State
                required: false,
                max: '255',
                error: {
                    required:{lookUpMsg:{id:555}} // required
                },
                type: 'text',
                dataSource: { name: 'getStatesAbbr', value: '164' },
                voidDefault: '0',
                defaultSelected: 'TX',
                items: []
            },
            testSelect: {
                label:{lookUpMsg:{id:366979}}, // Sort By
                required: "false",
                max: "255",
                error: {
                    required: {
                        lookUpMsg: { id: 555, text: '' } // required
                    }
                },
                small: true,
                type: "text",
                defaultSelected: 'relevance',
                //"dataSource": {
                //    "name": "getCustomReferenceListItems",
                //    "value": "MGS_ETO_BranchOfService"
                //},
                items: [
                  { text: { lookUpMsg: { id: 111159, text: 'Relevance' } }, value: 'relevance' },
                  { text: { lookUpMsg: { id: 376191, text: 'In Demand' } }, value: 'inDemand' },
                  { text: { lookUpMsg: { id: 376192, text: 'Salary - Descending' } }, value: 'salaryDescending' },
                  { text: { lookUpMsg: { id: 376193, text: 'Salary - Ascending' } }, value: 'salaryAscending' }
                ]
            }

        });
    }
})();