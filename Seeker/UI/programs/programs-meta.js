(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            // general
            374273: { lookUpMsg: { id: 374273 } }, // Saved Programs
            366340: { lookUpMsg: { id: 366340 } }, // Print
            363932: { lookUpMsg: { id: 363932 } }, // Multiple locations
            378599: { lookUpMsg: { id: 378599 } }, // view all locations 
            378600: { lookUpMsg: { id: 378600 } }, // Manage saved training programs 
            378601: { lookUpMsg: { id: 378601 } }, // Share program info 
            378602: { lookUpMsg: { id: 378602 } }, // Email program 
            378603: { lookUpMsg: { id: 378603 } }, // Print program 
            378604: { lookUpMsg: { id: 378604 } }, // All locations for 
            374736: { lookUpMsg: { id: 374736 } }, // Bacon ipsum dolor amet sirloin hamburger kielbasa.
            374274: { lookUpMsg: { id: 374274 } }, // Programs
            364212: { lookUpMsg: { id: 364212 } }, // Compare Now
            374275: { lookUpMsg: { id: 374275 } }, // Program Detail
            157204: { lookUpMsg: { id: 157204 } }, // You have saved
            157932: { lookUpMsg: { id: 157932 } }, // of
            374801: { lookUpMsg: { id: 374801 } }, // out of
            374735: { lookUpMsg: { id: 374735 } }, // training programs
            374802: { lookUpMsg: { id: 374802 } }, // possible training programs
            374798: { lookUpMsg: { id: 374798 } }, // Saved to my Saved Training
            374800: { lookUpMsg: { id: 374800 } }, // Add to my Saved Training
            375000: { lookUpMsg: { id: 375000 } }, // Expired
            364213: { lookUpMsg: { id: 364213 } }, // Add to compare
            348880: { lookUpMsg: { id: 348880 } }, // Compare
            376515: { lookUpMsg: { id: 376515 } }, // Compare up to 4
            373630: { lookUpMsg: { id: 373630 } }, // Program Search
            373631: { lookUpMsg: { id: 373631 } }, // Search all eligible training programs
            315145: { lookUpMsg: { id: 315145 } }, // OK
            162574: { lookUpMsg: { id: 162574 } }, // Cancel
            365751: { lookUpMsg: { id: 365751 } }, // Confirm delete
            374795: { lookUpMsg: { id: 374795 } }, // Are you sure you want to delete the selected saved program?
            372641: { lookUpMsg: { id: 372641 } }, // Clear all filters
            157926: { lookUpMsg: { id: 157926 } }, // Delete
            374320: { lookUpMsg: { id: 374320 } }, // Provider name
            374321: { lookUpMsg: { id: 374321 } }, // Type of school
            374322: { lookUpMsg: { id: 374322 } }, // Course location
            374323: { lookUpMsg: { id: 374323 } }, // Total cost
            374324: { lookUpMsg: { id: 374324 } }, // Funding source
            374325: { lookUpMsg: { id: 374325 } }, // Recognition results
            374326: { lookUpMsg: { id: 374326 } }, // Start and End dates
            374327: { lookUpMsg: { id: 374327 } }, // Delivery type
            374393: { lookUpMsg: { id: 374393 } }, // Back to my search results
            374394: { lookUpMsg: { id: 374394 } }, // Back to my saved programs
            374648: { lookUpMsg: { id: 374648 } }, // Advanced filter
            374658: { lookUpMsg: { id: 374658 } }, // Back to search results
            374737: { lookUpMsg: { id: 374737 } }, // Select up to 4 programs to compare
            378624: { lookUpMsg: { id: 378624 } }, // Email this page

            // search results
            378662: { lookUpMsg: { id: 378662 } }, // Provider
            378661: { lookUpMsg: { id: 378661 } }, // Duration
            378660: { lookUpMsg: { id: 378660 } }, // Location
            378659: { lookUpMsg: { id: 378659 } }, // Funding source
            378657: { lookUpMsg: { id: 378657 } }, // Degree/Certificate
            378654: { lookUpMsg: { id: 378654 } }, // View more
            378655: { lookUpMsg: { id: 378655 } }, // All results for
            378656: { lookUpMsg: { id: 378656 } }, // Save and return
            378652: { lookUpMsg: { id: 378652 } }, // Search programs (label)
            378653: { lookUpMsg: { id: 378653 } }, // Search programs (button)
            378671: { lookUpMsg: { id: 378671 } }, // Add

            // general course info accordion
            374757: { lookUpMsg: { id: 374757 } }, // Start date:
            374758: { lookUpMsg: { id: 374758 } }, // End date:
            374759: { lookUpMsg: { id: 374759 } }, // Total cost:
            374760: { lookUpMsg: { id: 374760 } }, // Credit hours:
            374761: { lookUpMsg: { id: 374761 } }, // Recognition results:
            374762: { lookUpMsg: { id: 374762 } }, // Category:
            374763: { lookUpMsg: { id: 374763 } }, // ONET code:
            374764: { lookUpMsg: { id: 374764 } }, // Funding sources:
            374765: { lookUpMsg: { id: 374765 } }, // Description of degree/certificate/license

            // detailed course info accordion
            374766: { lookUpMsg: { id: 374766 } }, // Provider type:
            374767: { lookUpMsg: { id: 374767 } }, // Type of school:
            374768: { lookUpMsg: { id: 374768 } }, // Contact name:
            374769: { lookUpMsg: { id: 374769 } }, // Contact email:
            374770: { lookUpMsg: { id: 374770 } }, // Contact phone:
            374771: { lookUpMsg: { id: 374771 } }, // Accredation/licensing agency:
            374772: { lookUpMsg: { id: 374772 } }, // Accrediting body:
            374773: { lookUpMsg: { id: 374773 } }, // Average student:teacher ratio:
            374774: { lookUpMsg: { id: 374774 } }, // Value added services provided:
            374775: { lookUpMsg: { id: 374775 } }, // Bilingual capacity:
            374776: { lookUpMsg: { id: 374776 } }, // English as a second language (ESL) available:
            374777: { lookUpMsg: { id: 374777 } }, // Provider in compliance with the ADA:
            374778: { lookUpMsg: { id: 374778 } }, // Location accessible by public transportation:
            374779: { lookUpMsg: { id: 374779 } }, // Provider description
            374780: { lookUpMsg: { id: 374780 } }, // Delivery type:
            374781: { lookUpMsg: { id: 374781 } }, // Training/service methods:
            374782: { lookUpMsg: { id: 374782 } }, // Deliverables:
            374783: { lookUpMsg: { id: 374783 } }, // Industries the training is provided for:

            // saved programs
            374784: { lookUpMsg: { id: 374784 } }, // Provider:
            374785: { lookUpMsg: { id: 374785 } }, // Date saved:
            374786: { lookUpMsg: { id: 374786 } } // CIP code:
            
        });

        angular.extend($rootScope.meta, {
            accordion: {
                generalCourseInformation: {
                    curentActive: false,
                    show: true,
                    configShow: true,
                    touched: false,
                    formName: 'generalCourseForm',
                    heading: { lookUpMsg: { id: 378650, text: 'General course information' } },
                    isOpen: true,
                    isDisabled: false,
                    isNumeric: false,
                    url: 'UI/Programs/ProgramDetail/accordion/general-course-information.html'
                },
                loginInformation: {
                    curentActive: false,
                    show: true,
                    configShow: true,
                    touched: false,
                    formName: 'detailedCourseForm',
                    heading: { lookUpMsg: { id: 378651, text: 'Detailed course information' } },
                    isOpen: true,
                    isDisabled: false,
                    isNumeric: false,
                    url: 'UI/Programs/ProgramDetail/accordion/detailed-course-information.html'
                }
            },


            breadCrumbsSearchPage: [{ "display":{lookUpMsg:{id:373630 } }, "url": '' }], //Program Search
            breadCrumbsDetailsPage: [{ "display":{lookUpMsg:{id:0 } }, "url": '' }],   // dev note: this is filled in by the controller
            breadCrumbsComparePage: [{ "display":{lookUpMsg:{id:373638 } }, "url": '' }],  //Compare Programs
            breadCrumbsResultsPage: [{ "display":{lookUpMsg:{id:373629 } }, "url": '' }],  //Program Search Results
            breadCrumbsSavedPage: [{ "display":{lookUpMsg:{id:374273 } }, "url": '' }],    //Saved programs

            pageHeader: {
                title:{lookUpMsg:{id:373630 } },
                introBody:{lookUpMsg:{id:373630 } },
            },

            pageHeaderSearch: {
                title:{lookUpMsg:{id:373631 } },     // Search all eligible training programs
            },

            pageHeaderCompare: {
                title:{lookUpMsg:{id:373638 } },     // Compare Programs
            },

            pageHeaderSaved: {
                title:{lookUpMsg:{id:374273 } },     // Saved Programs
                introBody:{lookUpMsg:{id:374736 } }, // Sub header
            },

            eventTypeFilter: {
                label:{lookUpMsg:{id:739 } }, // Search
                required: false,
                max: '255',
                isInline: true,
                isLegendInline: true,
                error: {
                    required:{lookUpMsg:{id:555 } }, // required
                },
                type: 'radio',
                defaultSelected: '1',
                items: [
                    { text:{lookUpMsg:{id:524, text: 'All' } }, value: '1' },
                    { text:{lookUpMsg:{id:208949, text: 'Workshop' } }, value: '2' },
                    { text:{lookUpMsg:{id:182468, text: 'Events' } }, value: '3' }
                ]
            },

            eventTextFilter: {
                placeholder:{lookUpMsg:{id:376111}}, // Program name or keywords
                type: 'text',
                required: false,
                hideErrorHolder: true,
                hideLabel: true

            },

            zipCodes: {
                label:{lookUpMsg:{id:235}}, // Zip code:
                decimal: true,
                max: '5'
            },
            occupationCode: {
                label:{lookUpMsg:{id:376112}}, // Occupation code:
                searchByCode: true,
                autoComplete: 'oNetCodes',
            },
            cipCodes: {
                label:{lookUpMsg:{id:376113}}, // CIP code:
                searchByCode: true,
                autoComplete: 'cipCodes',
            },
            regions: {
                label:{lookUpMsg:{id:245865}}, // Region:
                items: [],
                limit: 3
            },
            distanceRadius: {
                label:{lookUpMsg:{id:376114}}, // Distance radius
                items: [
                    { id: 376115, value: 0, text: 'Within 10 miles' },
                    { id: 376116, value: 1, text: 'Within 20 miles' },
                    { id: 376117, value: 2, text: 'Within 30 miles' },
                ],
                disabled: true
            },
            providers: {
                label:{lookUpMsg:{id:376125}}, // Providers:
                items: [],
                limit: 3
            },
            industries: {
                label:{lookUpMsg:{id:376126}}, // Industry name:
                items: [],
                limit: 3
            },
            schoolTypes: {
                label:{lookUpMsg:{id:376127}}, // Institution type:
                items: [],
                limit: 3
            },
            certifications: {
                label:{lookUpMsg:{id:70288}}, // Certifications
                items: []
            },
            fundingSources: {
                label:{lookUpMsg:{id:376128}}, // Funding source:
                items: [],
                limit: 3
            },

            programSearchResults: {
                compareButton: {
                    label:{lookUpMsg:{id:376129}}, // Compare Now
                    disabled: true
                },
                programTitleMaxLength: 40
            },

            compareTable: {
                sectionHeaders: {
                    1:{lookUpMsg:{id:374328, text: 'Provider info' }, colspan: 3 },
                    2:{lookUpMsg:{id:374329, text: 'General Course info' }, colspan: 5 }
                },
                columnHeaders: {
                    1:{lookUpMsg:{id:374320, text: 'Provider name' } },
                    2:{lookUpMsg:{id:374321, text: 'Type of school' } },
                    3:{lookUpMsg:{id:374322, text: 'Course location' } },
                    4:{lookUpMsg:{id:374323, text: 'Total cost' } },
                    5:{lookUpMsg:{id:374324, text: 'Funding source' } },
                    6:{lookUpMsg:{id:374325, text: 'Recognition results' } },
                    7:{lookUpMsg:{id:374326, text: 'Start and End dates' } },
                    8:{lookUpMsg:{id:374327, text: 'Delivery type' } }

                }
            }
          

        });
    }
})();