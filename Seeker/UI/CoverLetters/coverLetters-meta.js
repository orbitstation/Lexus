(function() {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);

    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            159289:{lookUpMsg:{id:157799}}, // Submit
            157862:{lookUpMsg:{id:157862}}, // (50 character limit)
            160042:{lookUpMsg:{id:160042}}, // Title is for your reference only. It is <b>not</b> visible to employers.
            158991:{lookUpMsg:{id:158991}}, // Character Count:
            157864:{lookUpMsg:{id:157864}}, // (4,000 character limit)
            // index Page
            157799:{lookUpMsg:{id:157799}}, // Letters
            157819:{lookUpMsg:{id:157819}}, // Letters
            157204:{lookUpMsg:{id:157204}}, // You have saved
            104616:{lookUpMsg:{id:104616}}, // of
            157824:{lookUpMsg:{id:157824}}, // possible cover letters.
            169642:{lookUpMsg:{id:169642}}, // Create A New Cover Letter
            157940:{lookUpMsg:{id:157940}}, // Edit
            157854:{lookUpMsg:{id:157854}}, // Send
            50022:{lookUpMsg:{id:50022}}, // Copy
            344391:{lookUpMsg:{id:344391}}, // Delete
            204134:{lookUpMsg:{id:204134}}, // Last Modified
            315145:{lookUpMsg:{id:315145}}, // OK
            162574:{lookUpMsg:{id:162574}}, // Cancel
            365782:{lookUpMsg:{id:365782}}, // Are you sure you want to delete the selected cover letter?
            246651:{lookUpMsg:{id:246651}}, // Confirm Delete
            // send Page
            157871:{lookUpMsg:{id:157871}}, // Send Letter
            // edit page
            157865:{lookUpMsg:{id:157865}}, // Edit Letter
            157868:{lookUpMsg:{id:157868}},
            // create
            157866:{lookUpMsg:{id:157866}}, // Create Letter
            //view 
            368244:{lookUpMsg:{id:368244}}, // View Cover Letter
            //upSell text
            363999:{lookUpMsg:{id:363999}}, // Cover Letters are great! 
            364000:{lookUpMsg:{id:364000}}, // this is why cover letters are so go, you should create an account and use Cover Letters
            377395:{lookUpMsg:{id:377395}}, //Templates
            361345:{lookUpMsg:{id:361345}}, //Back
            41107: {lookUpMsg:{id:41107}},  //Save Letter
            354321:{lookUpMsg:{id:354321}} //Send Email
        });

        angular.extend($rootScope.meta, {
            breadCrumbsCreatePage: [{ "display":{lookUpMsg:{id:157866 } }, "url": '' }], //Create Letter
            breadCrumbsEditPage:   [{ "display":{lookUpMsg:{id:157865 } }, "url": '' }], //Edit Letter
            breadCrumbsSendPage:   [{ "display":{lookUpMsg:{id:157871 } }, "url": '' }], //Send Letter
            breadCrumbsViewPage:   [{ "display":{lookUpMsg:{id:368244 } }, "url": '' }], //View Cover Letter
            pageHeader: {
                title:{lookUpMsg:{id:157799 } },       // Cover Letters
                introBody:{lookUpMsg:{id:157819 } }   // Create up to 5 cover letters to include with your resume in job applications.
            },
            pageHeaderView: {
                title:{lookUpMsg:{id:368244 } },       // View Cover Letter
                introBody:{lookUpMsg:{id:368245 } }   //
            },
            pageHeaderEdit: {
                title:{lookUpMsg:{id:157865 } },       // Edit Letter
                introBody:{lookUpMsg:{id:157868 } }   //
            },
            pageHeaderSend: {
                title:{lookUpMsg:{id:157871 } },  // Send Letter
                introBody: { lookUpMsg: { id: 121015 } }   // 
            },
            pageHeaderCreate: {
                title:{lookUpMsg:{id:157866}}, // Create Letter
                introBody:{lookUpMsg:{id:157867}} // Choose a cover letter title and then select either a starting template, type manually, or copy and paste from an existing letter. 
            },
            title: {
                label:{lookUpMsg:{id:157861}}, // Title
                required: true,
                mask: '',
                max: 50,
                error: {
                    required:{lookUpMsg:{id:157181}} // Please enter a Letter Title.
                },
                type: 'text'
            },
            body: {
                label:{lookUpMsg:{id:157863}}, // Enter text:
                required: true,
                rows: 10,
                max: 4000,
                maxMessage:{lookUpMsg:{id:104616}}, // of
                error: {
                    required:{lookUpMsg:{id:371264}} // Body is required
                }
            },
            richTextBody: {
                label:{lookUpMsg:{id:157863}}, // Enter text:
                required: true,
                rows: 10,
                max: 4000,
                richTextBoxOn: true,
                of:{lookUpMsg:{id:104616}}, // of
                maxMessage:{lookUpMsg:{id:104616}}, // of
                error: {
                    required:{lookUpMsg:{id:371264}}, // Body is required
                    maxLength:{lookUpMsg:{id:371266}} // Max length exceeded
                },
                options: {
                    height: 300
                }
            },
            emailSubject: {
                name: 'emailSubject',
                label:{lookUpMsg:{id:157873}}, // Subject
                required: true,
                max: 50,
                error: {
                    required:{lookUpMsg:{id:376095}} // Please enter a Subject.
                },
                type: 'text'
            },
            emailAddress: {
                name: 'emailAddress',
                label:{lookUpMsg:{id:157872}}, // Email Address
                required: true,
                max: 150,
                error: {
                    required:{lookUpMsg:{id:157280}} // Email Address is required.
                },
                type: 'email',
                pattern: 'email'
            },
            template: {
                label:{lookUpMsg:{id:160045}}, // Templates
                required: 'false',
                type: 'text',
                items: [
                    { name: { lookUpMsg: { id: 160107, text: 'Choose template' } } },
                    { name: { lookUpMsg: { id: 376194, text: 'Cover letter 1' } }, value: 1 },
                    { name: { lookUpMsg: { id: 376195, text: 'Cover letter 2' } }, value: 2 }
                ]
            }
        });
    }
})();