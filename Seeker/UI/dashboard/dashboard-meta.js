(function () {
    "use strict";

    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            367913: { lookUpMsg: { id: 367913 } }, // Create my resume & make it searchable
            367914: { lookUpMsg: { id: 367914 } }, // Search for jobs
            367915: { lookUpMsg: { id: 367915 } }, // Save a job search and get alerts
            367916: { lookUpMsg: { id: 367916 } }, // Apply to jobs
            369028: { lookUpMsg: { id: 369028 } }, // Get started
            369029: { lookUpMsg: { id: 369029 } }, // Manage
            369088: { lookUpMsg: { id: 369088 } }, // My job search
            369199: { lookUpMsg: { id: 369199 } }, // My career tools
            369556: { lookUpMsg: { id: 369556 } }, // Saved Occupations
            369565: { lookUpMsg: { id: 369565 } }, // Saved Schools
            369567: { lookUpMsg: { id: 369567 } }, // Hourly rate:
            369572: { lookUpMsg: { id: 369572 } }, // Budget Calculator
            369568: { lookUpMsg: { id: 369568 } }, // Target gross salary
            369569: { lookUpMsg: { id: 369569 } }, // Target net salary
            369570: { lookUpMsg: { id: 369570 } }, // Target hourly rate
            369571: { lookUpMsg: { id: 369571 } }, // Monthly expenses
            370016: { lookUpMsg: { id: 370016 } }, // My Goals
            367491: { lookUpMsg: { id: 367491 } }, // Career Personality
            370579: { lookUpMsg: { id: 370579 } }, // Messaged content
            370580: { lookUpMsg: { id: 370580 } }, // Bacon ipsum dolor amet sirloin hamburger kielbasa.
            370581: { lookUpMsg: { id: 370581 } }, // Andouille pork fatback doner, ball tip let mignon turducken pork chop alcatra ribeye cow pork belly porchetta brisket. Ball tip leberkas tenderloin ribeye short loin cow. Pork loin tongue pork.
            370582: { lookUpMsg: { id: 370582 } }, // View all
            374827: { lookUpMsg: { id: 374827 } }, // Saved Programs
            375000: { lookUpMsg: { id: 375000 } }, // Expired
            344621: { lookUpMsg: { id: 344621 } }, // edit
            370116: { lookUpMsg: { id: 370116 } }, // Get Started
            370117: { lookUpMsg: { id: 370117 } }, // Edit my answers
            376293: { lookUpMsg: { id: 376293 } }, // To do:
            376294: { lookUpMsg: { id: 376294 } },// Upcoming area events
            376295: { lookUpMsg: { id: 376295 } },// Workshop:
            376296: { lookUpMsg: { id: 376296 } },// Training:
            376297: { lookUpMsg: { id: 376297 } },// Event:
            169802: { lookUpMsg: { id: 169802 } },// Saved Jobs:
            370226: { lookUpMsg: { id: 370226 } },// Saved Searches:
            377779: { lookUpMsg: { id: 377779 } },//Check my applications
            376302: { lookUpMsg: { id: 376302 } },// Assess my skills
            376298: { lookUpMsg: { id: 376298 } },// What’s my career personality?
            376299: { lookUpMsg: { id: 376299 } },// Research careers
            376300: { lookUpMsg: { id: 376300 } },// What do I need to earn?
            376301: { lookUpMsg: { id: 376301 } },// My calendar
            376303: { lookUpMsg: { id: 376303 } },// Upcoming dates
            376305: { lookUpMsg: { id: 376305 } },// Goal:
            376304: { lookUpMsg: { id: 376304 } }, // View calendar
            370268: { lookUpMsg: { id: 370268 } }, // My checklist
            361666: { lookUpMsg: { id: 361666 } },  // My Dashboard
            185636: { lookUpMsg: { id: 185636 } }, // Resumes
            713: { lookUpMsg: { id: 713 } }, //Cover letters
            346835: { lookUpMsg: { id: 346835 } }, //Documents
            104869: { lookUpMsg: { id: 104869 } }, //Saved Searches
            160734: { lookUpMsg: { id: 160734 } },// Application History
            377769: { lookUpMsg: { id: 377769 } }, //Dashboard_My_job_search
            376534: { lookUpMsg: { id: 376534 } }, // (Dashboard_Saved_Occupations_Intro) Integer vitae ante ut lorem congue feugiat. Nulla dolor ex, interdum vitae enim ac, dictum hendrerit arcu. Donec dictum orci lacus, et auctor mi accumsan eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus at nulla risus. Cras et faucibus libero. Etiam semper tincidunt condimentum.
            376535: { lookUpMsg: { id: 376535 } }, // (Dashboard_Saved_Schools_Intro) Integer vitae ante ut lorem congue feugiat. Nulla dolor ex, interdum vitae enim ac, dictum hendrerit arcu. Donec dictum orci lacus, et auctor mi accumsan eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus at nulla risus. Cras et faucibus libero. Etiam semper tincidunt condimentum.
            376536: { lookUpMsg: { id: 376536 } }, // (Dashboard_Budget_Calc_Intro) Integer vitae ante ut lorem congue feugiat. Nulla dolor ex, interdum vitae enim ac, dictum hendrerit arcu. Donec dictum orci lacus, et auctor mi accumsan eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus at nulla risus. Cras et faucibus libero. Etiam semper tincidunt condimentum.
            376537: { lookUpMsg: { id: 376537 } }, // (Dashboard_Goals_Intro) Integer vitae ante ut lorem congue feugiat. Nulla dolor ex, interdum vitae enim ac, dictum hendrerit arcu. Donec dictum orci lacus, et auctor mi accumsan eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus at nulla risus. Cras et faucibus libero. Etiam semper tincidunt condimentum.
            376538: { lookUpMsg: { id: 376538 } }, // (Dashboard_Career_Personality_Intro) Integer vitae ante ut lorem congue feugiat. Nulla dolor ex, interdum vitae enim ac, dictum hendrerit arcu. Donec dictum orci lacus, et auctor mi accumsan eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus at nulla risus. Cras et faucibus libero. Etiam semper tincidunt condimentum.
            376539: { lookUpMsg: { id: 376539 } }, // (Dashboard_saved_Programs_Intro) Integer vitae ante ut lorem congue feugiat. Nulla dolor ex, interdum vitae enim ac, dictum hendrerit arcu. Donec dictum orci lacus, et auctor mi accumsan eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus at nulla risus. Cras et faucibus libero. Etiam semper tincidunt condimentum.

            379143: { lookUpMsg: { id: 379143 } },
            379144: { lookUpMsg: { id: 379144 } }
        });

        angular.extend($rootScope.meta, {
            breadCrumbExtended: {
                disable: true
            },
            accordionDashboard: {
                myJobSearch: {
                    curentActive: false,
                    show: true,
                    configShow: true,
                    isOpen: true,
                    formName: 'nameForm',
                    heading: { lookUpMsg: { id: 369088, text: 'My job search' } },
                    isDisabled: false,
                    isNumeric: false,
                    url: '/UI/dashboard/index/sections/myJobSearch.html',
                    noButton: true
                },
                myCareerTools: {
                    curentActive: false,
                    show: true,
                    configShow: true,
                    formName: 'nameForm',
                    heading: { lookUpMsg: { id: 376097, text: 'My career tools' } },
                    isDisabled: false,
                    isNumeric: false,
                    url: '/UI/dashboard/index/sections/myCareerTools.html',
                    noButton: true
                },
                customize: {
                    curentActive: false,
                    show: true,
                    configShow: true,
                    formName: 'nameForm',
                    heading: { lookUpMsg: { id: 376098, text: 'Customize my dashboard' } },
                    isDisabled: false,
                    isNumeric: false,
                    url: '/UI/dashboard/index/sections/customize.html',
                    noButton: true
                }
            }
        });
    }
})();