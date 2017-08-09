(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);

    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            AccordionGoButton: { lookUpMsg: { id: 370480 } }, // save and continue
            354391: { lookUpMsg: { id: 354391 } }, // Add Reference
            155682: { lookUpMsg: { id: 155682 } }, // Type:
            60063: { lookUpMsg: { id: 60063 } }, // Professional
            70167: { lookUpMsg: { id: 70167 } }, // Personal
            100049: { lookUpMsg: { id: 100049 } }, // Phone:
            70734: { lookUpMsg: { id: 70734 } }, // Email:
            155680: { lookUpMsg: { id: 155680 } }, // Reference Name:
            370929: { lookUpMsg: { id: 370929 } }, // Reference Company:
            370930: { lookUpMsg: { id: 370930 } }, // Reference Title:
            370303: { lookUpMsg: { id: 370303 } }, // Remove education
            369440: { lookUpMsg: { id: 369440 } }, // Add education
            370304: { lookUpMsg: { id: 370304 } }, // Add mil education
            370305: { lookUpMsg: { id: 370305 } }, // Remove experience
            337966: { lookUpMsg: { id: 337966 } }, // type
            370263: { lookUpMsg: { id: 370263 } }, // ResumeBuilder
            370264: { lookUpMsg: { id: 370264 } }, // UploadResume
            370244: { lookUpMsg: { id: 370244 } }, // awards
            370245: { lookUpMsg: { id: 370245 } }, // Add any membership, award and/or distinction you may have
            370247: { lookUpMsg: { id: 370247 } }, // Delete this entry
            371705: { lookUpMsg: { id: 371705 } }, // Add Award
            70367: { lookUpMsg: { id: 70367 } }, // Certification
            160570: { lookUpMsg: { id: 160570 } }, // Certifications
            161853: { lookUpMsg: { id: 161853 } },
            369906: { lookUpMsg: { id: 369906 } }, // Delete this certification
            369907: { lookUpMsg: { id: 369907 } }, // Add/Edit your certifications
            204522: { lookUpMsg: { id: 204522 } }, // Add certification
            155645: { lookUpMsg: { id: 155645 } }, // Referances
            267584: { lookUpMsg: { id: 267584 } }, // Header Message
            204974: { lookUpMsg: { id: 204974 } }, // Default Must Have Text...
            1728: { lookUpMsg: { id: 1728 } }, // Relocate:
            158633: { lookUpMsg: { id: 158633 } }, // Career Info
            70105: { lookUpMsg: { id: 70105 } }, // Desired Status
            70100: { lookUpMsg: { id: 70100 } }, // Desired Job Type
            70098: { lookUpMsg: { id: 70098 } }, // Target Job
            135597: { lookUpMsg: { id: 135597 } }, // Current Career Level
            134243: { lookUpMsg: { id: 134243 } }, // Desired Salary/Wage
            163132: { lookUpMsg: { id: 163132 } }, // Summary
            70158: { lookUpMsg: { id: 70158 } }, // References
            185982: { lookUpMsg: { id: 185982 } }, // Type of Training:
            202287: { lookUpMsg: { id: 202287 } }, // Course Title
            185819: { lookUpMsg: { id: 185819 } }, // Military Education
            181481: { lookUpMsg: { id: 181481 } }, // Responsibilities
            374848: { lookUpMsg: { id: 374848 } }, // Discharge Status
            186863: { lookUpMsg: { id: 186863 } }, // Rank
            202257: { lookUpMsg: { id: 202257 } }, // MOC
            202255: { lookUpMsg: { id: 202255 } }, // Branch
            70129: { lookUpMsg: { id: 70129 } }, // Present
            71545: { lookUpMsg: { id: 71545 } }, // Resume
            282622: { lookUpMsg: { id: 282622 } }, // Build Resume
            320454: { lookUpMsg: { id: 320454 } }, // Upload Resume
            158489: { lookUpMsg: { id: 158489 } }, // Create a Resume
            362897: { lookUpMsg: { id: 362897 } }, // Choose the method that is right for you
            158471: { lookUpMsg: { id: 158471 } }, // Resumes
            158470: { lookUpMsg: { id: 158470 } }, // Only one resume can be <b>public</b> ...
            157204: { lookUpMsg: { id: 157204 } }, // You have saved
            157932: { lookUpMsg: { id: 157932 } }, // of
            157205: { lookUpMsg: { id: 157205 } }, // possible resumes.
            161022: { lookUpMsg: { id: 161022 } }, // Are you sure you want to delete the selected resume?
            158474: { lookUpMsg: { id: 158474 } }, // Status
            107: { lookUpMsg: { id: 107 } },    // Views
            157940: { lookUpMsg: { id: 157940 } }, // Edit
            157852: { lookUpMsg: { id: 157852 } }, // Copy
            157853: { lookUpMsg: { id: 157853 } }, // Delete
            164890: { lookUpMsg: { id: 164890 } }, // Print
            157854: { lookUpMsg: { id: 157854 } }, // Send
            171395: { lookUpMsg: { id: 171395 } }, // Save As Word Doc
            202324: { lookUpMsg: { id: 202324 } }, // Saves
            155892: { lookUpMsg: { id: 155892 } }, // Resume Status
            253912: { lookUpMsg: { id: 253912 } }, // Date Uploaded: 
            156394: { lookUpMsg: { id: 156394 } }, // Update
            262243: { lookUpMsg: { id: 262243 } }, // Email Resume
            263872: { lookUpMsg: { id: 263872 } }, // A copy of your resume can be sent ...
            262244: { lookUpMsg: { id: 262244 } }, // Resumes will not be emailed as Confidential.
            155055: { lookUpMsg: { id: 155055 } }, // Cancel
            155637: { lookUpMsg: { id: 155637 } }, // Send
            319780: { lookUpMsg: { id: 319780 } }, // Rate
            363846: { lookUpMsg: { id: 363846 } }, // New
            320404: { lookUpMsg: { id: 320404 } }, // Rating
            356189: { lookUpMsg: { id: 356189 } }, // Resume Rating (header)
            364904: { lookUpMsg: { id: 364904 } }, // Feedback for this resume
            332738: { lookUpMsg: { id: 332738 } }, // Additional guidelines to keep in mind when writing resumes
            320771: { lookUpMsg: { id: 320771 } }, // Avoid being too short
            320772: { lookUpMsg: { id: 320772 } }, // Resumes under four hundred words work against the candidates...
            320773: { lookUpMsg: { id: 320773 } }, // Try a professional headline instead of an objective
            320774: { lookUpMsg: { id: 320774 } }, // Our studies consistently show objectives lower the...
            320775: { lookUpMsg: { id: 320775 } }, // Don't use first person language
            320776: { lookUpMsg: { id: 320776 } }, // It's improper to use first person language (i.e. me, myself, I) in your resume.
            364905: { lookUpMsg: { id: 364905 } }, // Here are some more tips regarding this resume
            364906: { lookUpMsg: { id: 364906 } }, // You scored higher than {0}% of other resumes we've rated.
            332736: { lookUpMsg: { id: 332736 } }, // Your resume rating
            333006: { lookUpMsg: { id: 333006 } }, // Brevity
            333010: { lookUpMsg: { id: 333010 } }, // Depth
            333008: { lookUpMsg: { id: 333008 } }, // Impact
            364937: { lookUpMsg: { id: 364937 } }, // Stupendous!
            364938: { lookUpMsg: { id: 364938 } }, // Great!
            364939: { lookUpMsg: { id: 364939 } }, // Average
            364940: { lookUpMsg: { id: 364940 } }, // Needs help
            364941: { lookUpMsg: { id: 364941 } }, // It looks like your resume has been updated since the last time it was rated.
            319779: { lookUpMsg: { id: 319779 } }, // Rate again
            99536: { lookUpMsg: { id: 99536 } }, // Last Modified
            370518: { lookUpMsg: { id: 370518 } }, // Primary Address
            370519: { lookUpMsg: { id: 370519 } }, // Mailing Address
            368560: { lookUpMsg: { id: 368560 } }, // Phone
            365795: { lookUpMsg: { id: 365795 } },
            246651: { lookUpMsg: { id: 246651 } }, // Confirm Delete
            315145: { lookUpMsg: { id: 315145 } }, // Ok
            162574: { lookUpMsg: { id: 162574 } }, // Cancel
            253979: { lookUpMsg: { id: 253979 } }, // Resume Builder
            274444: { lookUpMsg: { id: 274444 } }, // Resume Builder help extra text
            154378: { lookUpMsg: { id: 154378 } }, // Contact Info
            347548: { lookUpMsg: { id: 347548 } }, // The following information is automatically applied to all resumes...
            347549: { lookUpMsg: { id: 347549 } }, // update your profile.
            343710: { lookUpMsg: { id: 343710 } }, // About You
            154438: { lookUpMsg: { id: 154438 } }, // Resume Basic
            159461: { lookUpMsg: { id: 159461 } }, // Career Info
            343680: { lookUpMsg: { id: 343680 } }, // The following information is automatically applied to all resumes.
            154467: { lookUpMsg: { id: 154467 } }, // Target Job
            154468: { lookUpMsg: { id: 154468 } }, // Tell us about the type of job you'd like to find.&nbsp
            154461: { lookUpMsg: { id: 154461 } }, // Education
            367450: { lookUpMsg: { id: 367450 } }, // Your profile is not complete.
            367451: { lookUpMsg: { id: 367451 } }, // Please fix errors below first
            367452: { lookUpMsg: { id: 367452 } }, // Edit my profile
            367460: { lookUpMsg: { id: 367460 } }, // Confidential - Employers can search for and view your resume, but your contact information, references, and your current employer will not be visible
            367575: { lookUpMsg: { id: 367575 } }, // Post my resume
            367576: { lookUpMsg: { id: 367576 } }, // Resume information
            367577: { lookUpMsg: { id: 367577 } }, // Submit information in order to access file upload.
            367578: { lookUpMsg: { id: 367578 } }, // Visible - Employers can search for and view your resume
            158816: { lookUpMsg: { id: 158816 } }, // Private
            344275: { lookUpMsg: { id: 344275 } }, // Incomplete
            337950: { lookUpMsg: { id: 337950 } }, // Limited
            158815: { lookUpMsg: { id: 158815 } }, // Public
            // create Resume Page (name and status tab)
            367651: { lookUpMsg: { id: 367651 } }, // Save and continue
            367648: { lookUpMsg: { id: 367648 } }, // Create my resume online
            367649: { lookUpMsg: { id: 367649 } }, // Upload existing resume file
            367811: { lookUpMsg: { id: 367811 } }, // View and edit your current user profile settings
            367812: { lookUpMsg: { id: 367812 } }, // The following information is automatically applied to all resumes and will be updated on your user profile
            367847: { lookUpMsg: { id: 367847 } }, // Help employers find you faster
            367848: { lookUpMsg: { id: 367848 } }, // The Following information is automatically applied to your current resume
            111534: { lookUpMsg: { id: 111534 } }, // language
            367719: { lookUpMsg: { id: 367719 } }, // Add language
            368207: { lookUpMsg: { id: 368207 } }, // At least one of the languages was selected more than once.
            303888: { lookUpMsg: { id: 303888 } }, // Add skill
            157709: { lookUpMsg: { id: 157709 } }, // Skill
            373097: { lookUpMsg: { id: 373097 } }, // Add any skills that are relevant to your experience.
            373098: { lookUpMsg: { id: 373098 } }, // Add any skills that you possess.
            368069: { lookUpMsg: { id: 368069 } }, // Remove
            73244: { lookUpMsg: { id: 73244 } }, // Employee
            70335: { lookUpMsg: { id: 70335 } }, // Intern
            185871: { lookUpMsg: { id: 185871 } }, // Temporary/contract
            134371: { lookUpMsg: { id: 134371 } }, // Seasonal
            106109: { lookUpMsg: { id: 106109 } }, // Full-time
            106110: { lookUpMsg: { id: 106110 } }, // Part-time
            253319: { lookUpMsg: { id: 253319 } }, // Per diem
            368266: { lookUpMsg: { id: 368266 } }, // Your resume was saved successfully.
            370325: { lookUpMsg: { id: 370325 } }, // Changes to resume profile Settings
            370326: { lookUpMsg: { id: 370326 } },// The changes you have made will be applied to your all resumes
            //Finising up
            154123: { lookUpMsg: { id: 154123 } }, // Career Level
            155319: { lookUpMsg: { id: 155319 } }, // I am willing to travel
            155318: { lookUpMsg: { id: 155318 } }, // I am willing to relocate
            134824: { lookUpMsg: { id: 134824 } }, // Security Clearance
            159277: { lookUpMsg: { id: 159277 } }, // US Military Service
            207479: { lookUpMsg: { id: 207479 } }, // What languages do you speak?
            134083: { lookUpMsg: { id: 134083 } }, // Language Proficiency
            378859: { lookUpMsg: { id: 378859 } }, // Remove Language
            283547: { lookUpMsg: { id: 283547 } }, // Additional Skills
            41116: { lookUpMsg: { id: 41116 } }, // Skills
            70284: { lookUpMsg: { id: 70284 } }, // Skill level
            375616: { lookUpMsg: { id: 375616 } }, // Skills Used
            250590: { lookUpMsg: { id: 250590 } }, // Last used
            198491: { lookUpMsg: { id: 198491 } }, // Years of experience
            367849: { lookUpMsg: { id: 367849 } }, // Target job type (check all that apply)
            374872: { lookUpMsg: { id: 374872 } }, // Target job type
            367850: { lookUpMsg: { id: 367850 } }, // Target job schedule (check all that apply)
            374873: { lookUpMsg: { id: 374873 } }, // Target job schedule 
            320359: { lookUpMsg: { id: 320359 } }, // Target Salary
            158942: { lookUpMsg: { id: 158942 } }, // Salary rate
            367851: { lookUpMsg: { id: 367851 } }, // Availability (check all that apply)
            158935: { lookUpMsg: { id: 158935 } }, // Availability 
            377817: { lookUpMsg: { id: 377817 } }, // language 
            136019: { lookUpMsg: { id: 136019 } }, // Languages
            133988: { lookUpMsg: { id: 133988 } }, // Languages (optional)
            368676: { lookUpMsg: { id: 368676 } }, // Employers are often looking for multilingual candidates.  Tell us about your ability to speak or read various languages.  
            369031: { lookUpMsg: { id: 369031 } }, // Information will be updated to your profile and will be shared across all of your resumes.
            105916: { lookUpMsg: { id: 105916 } }, // Page
            113457: { lookUpMsg: { id: 113457 } }, // Previous Page
            113458: { lookUpMsg: { id: 113458 } }, // Next Page
            369145: { lookUpMsg: { id: 369145 } }, // Zoom
            310946: { lookUpMsg: { id: 310946 } }, // Zoom In
            310947: { lookUpMsg: { id: 310947 } }, // Zoom Out
            216831: { lookUpMsg: { id: 216831 } }, // Resume Preview
            369385: { lookUpMsg: { id: 369385 } }, // Work objective or summary
            369386: { lookUpMsg: { id: 369386 } }, // Enter work objective or summary
            369387: { lookUpMsg: { id: 369387 } }, // Enter/edit your objective/summary:
            364325: { lookUpMsg: { id: 364325 } }, // Send text messages to this number
            315695: { lookUpMsg: { id: 315695 } }, // Contact method
            349430: { lookUpMsg: { id: 349430 } }, //Channelized message : You must fill out either phone number or email
            195300: { lookUpMsg: { id: 195300 } }, // Note: If your resume is confidential, this information will not be visible to recruiters performing resume searches.
            370069: { lookUpMsg: { id: 370069 } }, // Add professional experience
            370070: { lookUpMsg: { id: 370070 } }, // Add military experience
            103695: { lookUpMsg: { id: 103695 } }, // Military experience
            370166: { lookUpMsg: { id: 370166 } }, // Save to profile and continue building resume
            370253: { lookUpMsg: { id: 370253 } }, // Save to profile
            370167: { lookUpMsg: { id: 370167 } }, // Make no changes to original profile
            370168: { lookUpMsg: { id: 370168 } }, // Changes to user profile
            370188: { lookUpMsg: { id: 370188 } },  // The changes you have made will be updated on your user profile and automatically applied to all resumes.
            370478: { lookUpMsg: { id: 370478 } }, //Make no changes to original profile
            370479: { lookUpMsg: { id: 370479 } }, //Save and continue building resume
            118645: { lookUpMsg: { id: 118645 } }, // Download
            370730: { lookUpMsg: { id: 370730 } }, // This resume has no file uploaded. 
            156393: { lookUpMsg: { id: 156393 } }, // Create Resume
            368246: { lookUpMsg: { id: 368246 } }, // Edit Resume
            368249: { lookUpMsg: { id: 368249 } }, // Send Resume
            320230: { lookUpMsg: { id: 320230 } }, // View resume
            365794: { lookUpMsg: { id: 365794 } }, // documents
            360766: { lookUpMsg: { id: 360766 } }, // You have uploaded
            // view page
            265588: { lookUpMsg: { id: 265588 } }, // resume
            370889: { lookUpMsg: { id: 370889 } }, // Resume HeadLine
            370890: { lookUpMsg: { id: 370890 } }, // Objective
            //MGSMIL-382
            374815: { lookUpMsg: { id: 374815 } }, // Save and return to apply
            374816: { lookUpMsg: { id: 374816 } }, // Apply to job
            339822: { lookUpMsg: { id: 339822 } }, // Back
            312578: { lookUpMsg: { id: 312578 } }, // View Resume
            367255: { lookUpMsg: { id: 367255 } }, // $
            370065: { lookUpMsg: { id: 370065 } }, // locationOfLastDutyStation 375565
            375565: { lookUpMsg: { id: 375565 } }, //Enter total credits earned
            286231: { lookUpMsg: { id: 286231 } }, //Reference
            377399: { lookUpMsg: { id: 377399 } }, //Remove Reference
            377400: { lookUpMsg: { id: 377400 } }, //Contact method selected
            378335: { lookUpMsg: { id: 378335 } }, //Profile settings
            378336: { lookUpMsg: { id: 378336 } }, //Employer information 
            378337: { lookUpMsg: { id: 378337 } }, //U.S. Citizen:
            378338: { lookUpMsg: { id: 378338 } }, //Authorized to work:
            378339: { lookUpMsg: { id: 378339 } }, //Share
            362914: { lookUpMsg: { id: 362914 } }, //Send
            378387: { lookUpMsg: { id: 378387 } }, //View and save your resume
            378388: { lookUpMsg: { id: 378388 } }, //This is the information employers will see. You can go back and edit any section before saving.
            361288: { lookUpMsg: { id: 361288 } }, // Size
            354555: { lookUpMsg: { id: 354555 } }, // Type
            251352: { lookUpMsg: { id: 251352 } }, // Experience
            378606: { lookUpMsg: { id: 378606 } }, // Award
            378860: { lookUpMsg: { id: 378860 } }, // Remove Award
            378620: { lookUpMsg: { id: 378620 } }, // view resume rating
            378621: { lookUpMsg: { id: 378621 } }, //Rating not available - Not an uploaded resume
            159111: { lookUpMsg: { id: 159111 } },
            154002: { lookUpMsg: { id: 154002 } },
            379077: { lookUpMsg: { id: 379077 } },
            379078: { lookUpMsg: { id: 379078 } },
            379238: { lookUpMsg: { id: 379238 } }, // Save as PDF

        });

        angular.extend($rootScope.meta, {
            breadCrumbsCreatePage: [{ "display": { lookUpMsg: { id: 156393 } }, "url": '' }], // Create Resume
            breadCrumbsEditPage: [{ "display": { lookUpMsg: { id: 368246 } }, "url": '' }], // Edit Resume
            breadCrumbsSendPage: [{ "display": { lookUpMsg: { id: 368249 } }, "url": '' }], // Send Resume
            breadCrumbsStatusPage: [{ "display": { lookUpMsg: { id: 155892 } }, "url": '' }], // Send Status
            breadCrumbsViewPage: [{ "display": { lookUpMsg: { id: 217, text: 'View Resume' } }, "url": '' }], // Edit Resume
            pageHeader: {
                title: { lookUpMsg: { id: 158471 } }, // Resumes
                introBody: { lookUpMsg: { id: 158470 } } // Only one resume can be public (searchable...
            },
            pageHeaderStartNew: {
                title: { lookUpMsg: { id: 156393 } }, // Create Resume
                introBody: { lookUpMsg: { id: 368247 } } // 
            },
            pageHeaderStartEdit: {
                title: { lookUpMsg: { id: 368246 } }, // Edit Resume
                introBody: { lookUpMsg: { id: 368247 } } // 
            },
            pageHeaderSend: {
                title: { lookUpMsg: { id: 368249 } }, // Send Resume
                introBody: { lookUpMsg: { id: 263872 } } // 
            },
            pageHeaderStatus: {
                title: '', // Send Status
                introBody: { lookUpMsg: { id: 0 } } // 
            },

            //                                                  _________________________
            //_________________________________________________/  create page accordion  \____________________________

            accordion: {
                nameAndStatus: {
                    curentActive: false,
                    show: true,
                    configShow: true,
                    touched: false,
                    isOpen: true,
                    formName: 'nameForm',
                    heading: { lookUpMsg: { id: 367659 } },
                    //isDisabled: true,
                    isNumeric: true,
                    url: '/UI/resumes/start/sections/resume-basics.html',
                    noButton: true
                },
                upload: {
                    curentActive: true,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'uploadForm',
                    heading: { lookUpMsg: { id: 157104 } }, // Post resume
                    isOpen: false,
                    isDisabled: false,
                    isNumeric: true,
                    url: '/UI/resumes/start/sections/upload.html'
                },
                profileInformation: {
                    curentActive: true,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'profileInformationForm',
                    heading: { lookUpMsg: { id: 324 } }, // Contact information
                    isOpen: false,
                    isDisabled: false,
                    isNumeric: true,
                    url: '/UI/resumes/start/sections/profile-information.html',
                    onNextStepWait: true
                },
                objectiveSummary: {
                    curentActive: true,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'objectiveSummaryForm',
                    heading: { lookUpMsg: { id: 369384 } },
                    isOpen: false,
                    isDisabled: false,
                    isNumeric: true,
                    url: '/UI/resumes/start/sections/objective-Summary.html'
                },
                gettingStarted: {
                    curentActive: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'gettingStartedForm',
                    heading: { lookUpMsg: { id: 70464 } },
                    isOpen: false,
                    isDisabled: false,
                    isNumeric: true,
                    url: '/UI/resumes/start/sections/getting-started.html'
                },
                experience: {
                    curentActive: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'experienceForm',
                    heading: { lookUpMsg: { id: 71887 } },
                    isOpen: false,
                    isDisabled: false,
                    isNumeric: true,
                    url: '/UI/resumes/start/sections/experience.html',
                    onNextStepWait: true
                },
                education: {
                    curentActive: false,
                    noButton: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'educataionForm',
                    heading: { lookUpMsg: { id: 70119 } },
                    isOpen: false,
                    isDisabled: false,
                    isNumeric: true,
                    url: '/UI/resumes/start/sections/education.html',
                    onNextStepWait: true
                },
                certification: {
                    curentActive: false,
                    isOptional: true,
                    noButton: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'certificationForm',
                    heading: { lookUpMsg: { id: 369898 } }, // Certifications (optional)
                    isOpen: false,
                    isDisabled: false,
                    isNumeric: true,
                    url: '/UI/resumes/start/sections/certification.html'
                },
                skills: {
                    curentActive: true,
                    isOptional: true,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'skillsForm',
                    heading: { lookUpMsg: { id: 41116 } }, // skils
                    isOpen: false,
                    isDisabled: false,
                    isNumeric: true,
                    url: '/UI/resumes/start/sections/skills.html'
                },
                languages: {
                    curentActive: true,
                    isOptional: true,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'languagesForm',
                    heading: { lookUpMsg: { id: 133988 } }, // Languages
                    isOpen: false,
                    isDisabled: false,
                    isNumeric: true,
                    url: '/UI/resumes/start/sections/languages.html',
                    onNextStepWait: true
                },
                awards: {
                    curentActive: true,
                    isOptional: true,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'awardsForm',
                    heading: { lookUpMsg: { id: 206339 } }, // Awards
                    isOpen: false,
                    isDisabled: false,
                    isNumeric: true,
                    url: '/UI/resumes/start/sections/awards.html'
                },
                references: {
                    curentActive: false,
                    isOptional: true,
                    noButton: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'referencesForm',
                    heading: { lookUpMsg: { id: 370572 } }, // References (optional)
                    isOpen: false,
                    isDisabled: false,
                    isNumeric: true,
                    url: '/UI/resumes/start/sections/references.html'
                },
                targetEmployerInfo: {
                    curentActive: true,
                    isOptional: true,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'targetEmployerInfoForm',
                    heading: { lookUpMsg: { id: 368732 } }, // Target Employer Information
                    isOpen: false,
                    isDisabled: false,
                    isNumeric: true,
                    url: '/UI/resumes/start/sections/targetEmployerInfo.html'
                },
                profileSettings: {
                    curentActive: true,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'profileSettingsForm',
                    heading: { lookUpMsg: { id: 367846 } }, // Resume profile settings
                    isOpen: false,
                    isDisabled: false,
                    isNumeric: true,
                    url: '/UI/resumes/start/sections/profile-settings.html',
                    onNextStepWait: true
                },
                finishingUp: {
                    curentActive: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'finishingUpForm',
                    heading: { lookUpMsg: { id: 370616 } },
                    isDisabled: false,
                    isNumeric: true,
                    lastOne: true,
                    url: '/UI/resumes/start/sections/finishing-up.html'
                }
            },
            //                                                  ___________________________
            //_________________________________________________/  nameAndStatus Accordion  \____________________________
            // this is visable on both flows (create and upload)

            resumeTitle: {
                label: { lookUpMsg: { id: 367453 } }, // Resume title
                required: true,
                max: '100',
                error: {
                    required: { lookUpMsg: { id: 367454 } } // Please enter a resume title.
                },
                type: 'text',
                disabled: false
            },
            resumeActive: {
                label: { lookUpMsg: { id: 367656 } }, // Make this my resume searchable?
                help: {
                    title: { lookUpMsg: { id: 370266 } }, // Only one resume can be searchable by employers.
                    content: { lookUpMsg: { id: 375432 } } // By selecting to make your resume searchable, you will allow recruiters to find your resume during resume searches. ...
                },
                required: true,
                error: { required: { lookUpMsg: { id: 555 } } }, // required
                isInline: true,
                items: [
                    { text: { lookUpMsg: { id: 367657 } }, value: true }, // Yes
                    { text: { lookUpMsg: { id: 367658 } }, value: false } // No
                ]
            },
            resumeConfidential: {
                label: { lookUpMsg: { id: 367652 } }, // Resume visibility status
                required: true,
                items: [
                    { text: { lookUpMsg: { id: 367578 } }, value: false }, // Visible - Employers can search for and view your resume
                    { text: { lookUpMsg: { id: 367460 } }, value: true }   // Confidential - Employers can search for and view your resume, but your contact information, references, and your current employer will not be visible
                ]
            },
            //                                                  ____________________
            //_________________________________________________/  Upload Accordion  \____________________________
            // (upload flow only)
            documentUpload: {
                maxItems: 1,
                maxFileSize: 500000,
                allowedTypes: ['doc', 'docx', 'pdf', 'txt', 'rtf'],

                docName: {
                    label: { lookUpMsg: { id: 344382 } }, // Document Name
                    required: 'true',
                    mask: '',
                    max: '100',
                    error: {
                        required: { lookUpMsg: { id: 370267 } } // Please enter a Document Name.
                    },
                    type: 'text'
                },
                docFormat: {
                    label: { lookUpMsg: { id: 361289 } }, // Format
                    type: 'text',
                    disabled: true
                },
                docSize: {
                    label: { lookUpMsg: { id: 361288 } }, // Size
                    type: 'text',
                    disabled: true
                }
            },
            extraUploadParams: {
                type: 'Resume',
                referenceType: 'Resume',
                referenceValue: null
            },
            //                                                  ___________________________
            //_________________________________________________/  optional info Accordion  \____________________________
            // (upload flow only)

            careerLevel: {
                label: { lookUpMsg: { id: 154123 } }, // Career Level:
                required: false,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                dataSource: { name: "getLookupByName", value: "careerlevels" },
                items: []
            },
            willingTravel: {
                label: { lookUpMsg: { id: 155319 } }, // I am willing to travel:
                dataSource: { name: "getLookupByName", value: "willingtotravel" },
                items: []
            },
            willingRelocate: {
                label: { lookUpMsg: { id: 155318 } }, // I am willing to relocate:
                isInline: false,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                items: [
                    { text: { lookUpMsg: { id: 367657 } }, value: 'true' },
                    { text: { lookUpMsg: { id: 367658 } }, value: 'false' }
                ]
            },
            securityClearance: {
                label: { lookUpMsg: { id: 134824 } }, // Security Clearancel:
                required: false,
                voidDefault: '-1',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                dataSource: { name: "getLookupByName", value: "securityclearances" },
                items: []
            },
            usMilitaryInvolvement: {
                dataSource: { name: "getLookupByName", value: "usmilitaryinvolvements" },
                items: []
            },
            languages: {
                label: { lookUpMsg: { id: 207479 } }, // What language do you speak?
                required: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                dataSource: { name: "getLookupByName", value: "languages" },
                items: [],
                voidDefault: '-1'
            },
            languageProficiency: {
                label: { lookUpMsg: { id: 134083 } }, // Language proficiency
                required: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                dataSource: { name: "getLookupByName", value: "language-proficiencies" },
                voidDefault: '-1',
                items: []
            },
            skillName: {
                label: { lookUpMsg: { id: 41116 } }, // skill
                placeholder: { lookUpMsg: { id: 204541 } }, // Enter skill
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    isUneque: { lookUpMsg: { id: 368413 } } // There can be only one skill with given name.
                },
                type: 'text',
                autoComplete: 'skills',
                customValidatorNames: [''],
                unequeFrom: [],
                titlefield: 'text',
                minlength: 2,
                remoteItemsWrapper: 'items',
                overrideSuggestions: true,
                validationMode: 'text'
            },
            skillLevelID: {
                label: { lookUpMsg: { id: 70284 } }, // Skill level
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                dataSource: { name: "getLookupByName", value: "skill-levels" },
                required: true,
                voidDefault: '-1',
                items: []
            },
            skillUsedID: {
                label: { lookUpMsg: { id: 250590 } }, // Last used
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                dataSource: { name: "getLookupByName", value: "skills-used" },
                required: true,
                voidDefault: '-1',
                items: []
            },
            skillYearsExperience: {
                label: { lookUpMsg: { id: 198491 } }, // Years of experience
                required: true,
                placeholder: { lookUpMsg: { id: 367919 } }, // Enter years of experience
                mask: '',
                max: '100',
                min: '1',
                pattern: 'integerOnly',
                error: {
                    //required:{lookUpMsg:{id:375298}} // Must be a number from 1 - 100
                    required: { lookUpMsg: { id: 375394 } } // Must be a whole number from 1 - 100
                },
                //decimal: true,
                type: 'number',
                disabled: false
            },
            salary: {
                label: { lookUpMsg: { id: 320359 } }, // Target salary
                placeholder: { lookUpMsg: { id: 367920 } }, // 0000.00
                //decimal: true,
                max: '8',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    pattern: { lookUpMsg: { id: 375296 } } // Invalid Currency Format
                },
                pattern: 'currency'
            },
            resumesalaryTypes: {
                label: { lookUpMsg: { id: 158942 } }, // Salary rate
                required: false,
                error: { required: { lookUpMsg: { id: 555 } } }, // required
                dataSource: { name: "getLookupByName", value: "resumesalarytypes" },
                //  voidDefault: '-1',
                items: []
            },
            availability: {
                label: { lookUpMsg: { id: 367851 } }, // Availability
                required: false,
                error: { required: { lookUpMsg: { id: 555 } } }, // required
                type: 'text',
                dataSource: { name: "builderFieldId", value: "47186" },
                items: []
            },
            //  below is saved meta data that could be used for the create resume tabs
            //_____________________________________________________________________________

            fromEmailAddress: {
                name: 'fromEmailAddress',
                label: { lookUpMsg: { id: 262245 } }, // From Email Address
                required: 'true',
                max: '100',
                error: {
                    required: { lookUpMsg: { id: 376130 } }, // From Email Address is required.
                    pattern: { lookUpMsg: { id: 376131 } } // Please enter valid email.
                },
                type: 'email',
                disabled: true
            },
            toEmailAddress: {
                name: 'toEmailAddress',
                label: { lookUpMsg: { id: 262246 } }, // To Email Address
                required: 'true',
                max: '100',
                error: {
                    required: { lookUpMsg: { id: 376132 } }, // To Email Address is required.
                    pattern: { lookUpMsg: { id: 376131 } } // Please enter valid email.
                },
                type: 'email',
                pattern: 'email'
            },
            emailSubject: {
                name: 'emailSubject',
                label: { lookUpMsg: { id: 262247 } }, // Subject
                max: '100',
                type: 'text'
            },
            button1: {
                label: { lookUpMsg: { id: 70088 } }, // Submit
                validation: 'sendForm.$invalid'
            },
            resumeStatus: {
                label: { lookUpMsg: { "id": 154440 } },
                required: true,
                max: "255",
                error: {
                    required: { lookUpMsg: { "id": 555 } } // required
                },
                type: "text",
                items: [
                    { text: { lookUpMsg: { id: 367653 } }, value: "'Public'" },  // Public - Employers can search for and view your resume
                    { text: { lookUpMsg: { id: 367654 } }, value: "'Limited'" }, // Limited - Employers can search for and view your resume, but your contact information, references, and your current employer will not be visible
                    { text: { lookUpMsg: { id: 367655 } }, value: "'Private'" }  // Private - Employers cannot search for or view your resume
                ]
            },
            resumeUpload: {
                maxItems: 1,
                maxFileSize: 500000,
                allowedTypes: ['doc', 'docx', 'pdf', 'txt', 'rtf']
            },
            firstName: {
                label: { lookUpMsg: { id: 154148 } }, // First Name (meta)
                required: true
            },
            lastName: {
                label: { lookUpMsg: { id: 154150 } }, // Last Name (default)
                required: true
            },
            addressAutocomplete: {
                label: { lookUpMsg: { id: 378474 } },
                required: true,
                max: '255',
                help: {
                    content: { lookUpMsg: { id: 378475 } } // Helper how to use google autocomplete
                }
            },
            homeAddress: {
                label: { lookUpMsg: { id: 154151 } }, // Home Address Line 1
                required: true
            },
            homeAddress2: {
                label: { lookUpMsg: { id: 197146 } }, // Home Address Line 2
                required: false
            },
            city: {
                label: { lookUpMsg: { id: 154153 } }, // City/Town
                required: true
            },
            state: {
                label: { lookUpMsg: { id: 154154 } }, // State/Province
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text',
                //dataSource: { name: 'getStates', value: '164' },
                dataSource: { name: 'getStates', value: '0' },
                voidDefault: '-1'
            },
            postalCodeInternational: {
                label: { lookUpMsg: { id: 253956 } }, // Postal/Zip Code
                max: '255',
                error: {},
                type: 'text',
                required: false
            },
            postalCode: {
                label: { lookUpMsg: { id: 253956 } }, // Postal/Zip Code
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // Required
                    wrong: { lookUpMsg: { id: 376065 } }, // Please enter a valid ZipCode
                    nomatch: { lookUpMsg: { id: 376066 } }, // Not matching selected state
                    minlength: { lookUpMsg: { id: 376067 } } // Min 5 digits
                },
                type: 'text',
                help: {
                    title: { lookUpMsg: { id: 375895 } }, // Look Up your zip code
                    content: { lookUpMsg: { id: 375896 } } // Look up your zip code on <a href="https://www.USPS.com" target="_blank">USPS.com</a>
                }
            },
            county: {
                label: { lookUpMsg: { id: 338884 } }, // County
                required: true
            },
            country: {
                label: { lookUpMsg: { id: 154156 } }, // Country
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text',
                voidDefault: '0',
                //defaultSelected: 164,
                defaultSelected: 0,
                dataSource: { name: 'getLookup', value: 'country' }
            },
            //                                  _____________________
            //---------------------------------/  Contact Information\--------------------------------------
            // Primary Phone #
            primaryPhone: {
                label: { lookUpMsg: { id: 133902 } }, // Primary Phone
                placeholder: { lookUpMsg: { id: 70264 } }, // Phone Number
                required: true,
                mask: {
                    face: '(999) 999-9999'
                },
                max: '50',
                type: 'text',
                error: {
                    required: { lookUpMsg: { id: 356493 } } // Please enter a valid phone number.  NOTE: Phone numbers must contain 10 digits.
                }
            },
            //Primary Phone Type
            primaryPhoneType: {
                label: { lookUpMsg: { id: 354555 } }, // Type
                required: true,
                max: '30',
                type: 'text',
                //voidDefault: '0',
                dataSource: { name: 'getLookup', value: 'phonetypes' },
                error: {
                    required: { lookUpMsg: { id: 339275 } } // Phone type is required
                }
            },
            //Preffered Contatct Method
            preferredContactMethod: {
                label: { lookUpMsg: { id: 215514 } }, // Preferred Contact Method
                required: true,
                type: 'text',
                dataSource: { name: 'getLookup', value: 'contactpreferenceformats' },
                //voidDefault: '0',
                error: {
                    required: { lookUpMsg: { id: 345002 } } // Preferred Contact Method is required
                }
            },
            //Phone # 2
            telephoneNumber2: {
                label: { lookUpMsg: { id: 269566 } }, // Telephone Number 2
                required: false,
                mask: {
                    face: '(999) 999-9999'
                },
                max: '30',
                type: 'text',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                }
            },
            //Phone Type 2
            telephoneNumber2Type: {
                label: { lookUpMsg: { id: 354555 } }, // Type
                required: false,
                max: '30',
                type: 'text',
                //voidDefault: '0',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                //select: 3,
                dataSource: { name: 'getLookup', value: 'phonetypes' }
            },
            //Phone # 3
            telephoneNumber3: {
                label: { lookUpMsg: { id: 269567 } }, // Telephone Number 3
                required: false,
                mask: {
                    face: '(999) 999-9999'
                },
                max: '30',
                type: 'text',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                }
            },
            //Phone Type 3
            telephoneNumber3Type: {
                label: { lookUpMsg: { id: 354555 } }, // Type
                required: false,
                //voidDefault: '0',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                //select: 6,
                dataSource: { name: 'getLookup', value: 'phonetypes' }
            },
            email: {
                label: { lookUpMsg: { id: 154159 } }, // Email Address
                error: {
                    required: { lookUpMsg: { id: 376132 } }, // To Email Address is required.
                    pattern: { lookUpMsg: { id: 376133 } } // Please enter valid email.
                },
                required: true,
                type: 'email'
            },
            militaryService: {
                label: { lookUpMsg: { id: 154126 } } // US Military Service:
            },
            workStatus: {
                label: { lookUpMsg: { id: 152446 } } // Work Status:
            },
            resumeUploadButton: {
                label: { lookUpMsg: { id: 367471 } } // Submit
            },
            resumeObjective: {
                //label:{lookUpMsg:{id:369387}}, // Enter/edit your objective/summary:
                required: false,
                rows: 6,
                max: 2000,
                richTextBoxOn: true,
                of: { lookUpMsg: { id: 104616 } }, // of
                maxMessage: { lookUpMsg: { id: 160293 } }, // max
                error: {
                    required: { lookUpMsg: { id: 371264 } }, // Body is required
                    maxLength: { lookUpMsg: { id: 371266 } } // Max length exceeded
                },
                trimtext: '',
                options: {
                    height: 300,
                    menubar: false,
                    statusbar: false,
                    skin_url: $rootScope.registry.localStore.global.context.cdnUrl + '/styles/tinymce/skins/lightgray',
                    theme: 'modern',
                    forced_root_block: '',
                    plugins: [
                      'advlist autolink lists link charmap print preview hr anchor pagebreak',
                      'searchreplace visualblocks visualchars code contextmenu',
                      'paste textcolor colorpicker textpattern'
                    ],
                    toolbar1: 'bold italic underline | bullist numlist | link'
                }
            },
            //REFERENCES
            referenceName: {
                label: { lookUpMsg: { id: 154305 } }, // Full Name:
                required: true
            },
            referenceCompany: {
                label: { lookUpMsg: { id: 154307 } } // Company Name:
            },
            referenceTitle: {
                label: { lookUpMsg: { id: 154306 } } // Title:
            },
            referenceHasPhone: {
                required: false,
                type: 'checkbox',
                items: [
                    { text: { lookUpMsg: { id: 100049 } }, value: true }  //Phone
                ]
            },
            referencePhone: {
                label: { lookUpMsg: { id: 133902 } }, // Phone Number
                required: true,
                mask: {
                    face: '(999) 999-9999'
                },
                max: '50',
                type: 'text',
                error: {
                    required: { lookUpMsg: { id: 356493 } } // Please enter a valid phone number.  NOTE: Phone numbers must contain 10 digits.
                }
            },
            referenceHasEmail: {
                required: false,
                type: 'checkbox',
                items: [
                        { text: { lookUpMsg: { id: 70734 } }, value: true }  //Email
                ]
            },
            referenceEmail: {
                label: { lookUpMsg: { id: 154309 } }, // Email Address:
                error: {
                    required: { lookUpMsg: { id: 376130 } }, // From Email Address is required.
                    pattern: { lookUpMsg: { id: 376131 } } // Please enter valid email.
                },
                type: 'email',
                required: true
            },
            // Convict
            referenceType: {
                label: { lookUpMsg: { id: 154310 } }, // Were you previously convicted?
                required: true,
                max: '',
                isInline: true,
                error: { required: { lookUpMsg: { id: 341724 } } }, // required
                type: 'radio',
                items: [
                    { text: { lookUpMsg: { id: 70166 } }, value: '1' }, // Personal:
                    { text: { lookUpMsg: { id: 70167 } }, value: '2' }  // Professional:
                ]
            },
            //Awards
            awardName: {
                label: { lookUpMsg: { id: 370248 } },
                required: true,
                max: '2000',
                counter: true,
                of: { lookUpMsg: { id: 104616 } }, // of
                rows: 6
            },
            //Certifications
            certName: {
                label: { lookUpMsg: { id: 369473 } }, // cert name
                required: true,
                remoteItemsWrapper: 'items',
                titlefield: 'text',
                valuefield: 'text',
                validationMode: 'text'
            },
            certInstitutionName: {
                label: { lookUpMsg: { id: 369920 } }, // school name
                required: true,
                remoteItemsWrapper: 'items',
                titlefield: 'text',
                valuefield: 'text'
            },
            certDate: {
                label: { lookUpMsg: { id: 369921 } }, // cert date
                placeholder: { lookUpMsg: { id: 370068 } }, // MM/YYYY
                required: 'true',
                max: '10',
                dateMode: 'year',
                minMode: 'month',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    mask: { lookUpMsg: { id: 268363 } } // Invalid Date
                },
                type: 'text'
            },
            certSummary: {
                label: { lookUpMsg: { id: 155647 } }, // summary
                placeholder: { lookUpMsg: { id: 370052 } }, // Describe your certification
                of: { lookUpMsg: { id: 104616 } }, // of
                help: {
                    content: { lookUpMsg: { id: 375434 } } // Provide short summary
                },
                rows: 2,
                maxMessage: { lookUpMsg: { id: 160293 } },
                counter: true,
                max: '2000'
            },
            //STANDARD EDUCATION SECTION
            eduSchoolName: {
                label: { lookUpMsg: { id: 154464 } },
                required: true,
                max: '100',
                error: {
                    required: { lookUpMsg: { id: 376133 } } // Please enter a School/Program name.
                },
                type: 'text'
            },
            eduCityName: {
                label: { lookUpMsg: { id: 193968 } },
                required: true,
                max: '100',
                error: {
                    required: { lookUpMsg: { id: 376134 } } // Please enter a City/Town.
                },
                type: 'text'
            },
            eduState: {
                label: { lookUpMsg: { id: 158293 } },
                required: true,
                error: { required: { lookUpMsg: { id: 555 } } }, // required
                dataSource: { name: 'getStatesText', value: '164' },
                voidDefault: '0'
            },
            eduCountry: {
                label: { lookUpMsg: { id: 154156 } }, // Country
                required: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                voidDefault: '0',
                defaultSelected: 164,
                dataSource: { name: 'getLookup', value: 'country' }
            },
            eduDegreeLevel: {
                label: { lookUpMsg: { id: 155878 } },
                required: true,
                error: {
                    required: { lookUpMsg: { id: 368066 } } // required
                },
                addDefault: { lookUpMsg: { id: 366341 } }, // -- SELECT --
                dataSource: { name: "getLookupByName", value: "degreelevels" },
                voidDefault: '0'
            },
            eduEndDate: {
                label: { lookUpMsg: { id: 155833 } }, // End Date
                placeholder: { lookUpMsg: { id: 370068 } }, // MM/YYYY
                required: 'true',
                max: '10',
                minMode: 'month',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    mask: { lookUpMsg: { id: 268363 } } // Invalid Date
                },
                type: 'text'
            },
            eduMajor: {
                label: { lookUpMsg: { id: 195337 } },
                max: '100',
                type: 'text'
            },
            eduMinor: {
                label: { lookUpMsg: { id: 195338 } },
                max: '100',
                type: 'text'
            },
            eduHonors: {
                label: { lookUpMsg: { id: 187179 } },
                dataSource: { name: "getLookupByName", value: "honors" }
            },
            eduTotalCredits: {
                label: { lookUpMsg: { id: 187177 } },
                //required: true,
                placeholder: { lookUpMsg: { id: 375565 } },
                max: '1000',
                min: '1',
                error: {
                    softError: { lookUpMsg: { id: 375299 } } // Must be a number from 1 - 1000
                },
                type: 'number'
            },
            eduGPA: {
                label: { lookUpMsg: { id: 187176 } },
                max: '10',
                min: '1',
                step: '.1',
                error: {
                    softError: { lookUpMsg: { id: 375300 } }, // Must be a number from 1 - 10
                },
                type: 'number'
            },
            eduGPAMax: {
                label: { lookUpMsg: { id: 195339 } },
                max: '10',
                min: '1',
                step: '.1',
                error: {
                    softError: { lookUpMsg: { id: 375300 } } // Must be a number from 1 - 10
                },
                type: 'number'
            },
            awardedCreditsType: {
                label: { lookUpMsg: { id: 187178 } },
                items: [
                    { text: { lookUpMsg: { id: 195341 } }, value: 4669 },
                    { text: { lookUpMsg: { id: 195342 } }, value: 4670 },
                    { text: { lookUpMsg: { id: 195343 } }, value: 4671 }
                ]
            },
            awardedCreditsOther: {
                label: { lookUpMsg: { id: 195343 } },
                max: '100',
                type: 'text'
            },
            relevantCoursework: {
                label: { lookUpMsg: { id: 195344 } },
                placeholder: { lookUpMsg: { id: 369990 } },
                of: { lookUpMsg: { id: 120175 } },
                help: {
                    content: { lookUpMsg: { id: 369990 } }
                },
                rows: 4,
                maxMessage: { lookUpMsg: { id: 160293 } },
                counter: true,
                max: '2000'
            },
            //Military Education
            nameTitleOfSchool: {
                label: { lookUpMsg: { id: 369919 } }, // nameTitleOfSchool
                required: true,
                error: {
                    required: { lookUpMsg: { id: 376135 } } // Please enter a School name
                },
                type: 'text'
            },
            courseTitle: {
                label: { lookUpMsg: { id: 203065 } }, // courseTitle
                required: true,
                error: {
                    required: { lookUpMsg: { id: 376136 } } // Please enter a Course title
                },
                type: 'text'
            },
            trainingTypeId: {
                label: { lookUpMsg: { id: 185982 } }, // trainingTypeId
                required: 'true',
                isInline: false,
                error: {
                    required: { lookUpMsg: { id: 162744 } } // required
                },
                items: [
                    { text: { lookUpMsg: { id: 186323 } }, value: '1' },
                    { text: { lookUpMsg: { id: 186324 } }, value: '2' }  
                ]
            },
            apprenticeshipCourse: {
                label: { lookUpMsg: { id: 185985 } } // apprenticeshipCourse
            },
            eduMilEndDate: {
                label: { lookUpMsg: { id: 115855 } }, // Completion Date
                placeholder: { lookUpMsg: { id: 370068 } }, // MM/YYYY
                max: '10',
                minMode: 'month',
                error: {
                    required: { lookUpMsg: { id: 162744 } }, // required
                    mask: { lookUpMsg: { id: 268363 } } // Invalid Date
                },
                type: 'text'
            },
            //MILITARY Experience
            militaryExperienceId: {
                label: { lookUpMsg: { id: 376137 } }, // militaryExperienceId
                required: true
            },
            branchId: {
                label: { lookUpMsg: { id: 370059 } }, // branchId
                required: true,
                addDefault: { lookUpMsg: { id: 366341 } }, // - SELECT -
                voidDefault: '0',
                defaultSelected: 0,
                dataSource: { name: 'getCustomLookupOnId', value: '27473' }
            },
            rankId: {
                label: { lookUpMsg: { id: 370060 } }, // rank Id
                required: true,
                addDefault: { lookUpMsg: { id: 366341 } }, // - SELECT -
                voidDefault: '0',
                defaultSelected: 0,
                dataSource: { name: 'getCustomLookupOnIdParentId', value: '27474', value2: '60015' }
            },
            militaryOccupationCode: {
                label: { lookUpMsg: { id: 370062 } }, // Military Occupation Code
                required: true,
                max: 10
            },
            statusId: {
                label: { lookUpMsg: { id: 370063 } }, // statusId
                required: true,
                voidDefault: '0',
                addDefault: { lookUpMsg: { id: 366341 } }, // - SELECT -
                defaultSelected: 0,
                dataSource: { name: 'getCustomLookupOnId', value: '27475' }
            },
            milStartDate: {
                label: { lookUpMsg: { id: 155831 } }, // Start Date:
                placeholder: { lookUpMsg: { id: 370068 } }, // MM/YYYY
                required: 'true',
                max: '10',
                minMode: 'month',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    mask: { lookUpMsg: { id: 268363 } }, // You must enter a Valid Date
                    match: { lookUpMsg: { id: 376138 } } // Start date should be less than end date
                },
                type: 'text'
            },
            milEndDate: {
                label: { lookUpMsg: { id: 155832 } }, // Start Date:
                placeholder: { lookUpMsg: { id: 370068 } }, // MM/YYYY
                required: 'true',
                max: '10',
                minMode: 'month',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    mask: { lookUpMsg: { id: 268363 } } // You must enter a Valid Date
                },
                type: 'text'
            },
            isPresentExperience: {
                label: { lookUpMsg: { id: 370061 } }, // isPresentExperience
                type: "text",
                required: true,
                isInline: true,
                items: [
                    { text: { lookUpMsg: { id: 367657 } }, value: "true" },
                    { text: { lookUpMsg: { id: 367658 } }, value: "false" }
                ]
            },
            unitName: {
                label: { lookUpMsg: { id: 370064 } }, // unitName
                required: true
            },
            unitPhone: {
                label: { lookUpMsg: { id: 370067 } }, // unitPhone
                mask: {
                    face: '(999) 999-9999'
                }
            },
            locationOfLastDutyStation: {
                label: { lookUpMsg: { id: 370065 } }, // locationOfLastDutyStation
                required: true
            },
            lastDutyStationCountryId: {
                label: { lookUpMsg: { id: 154156 } }, // Country
                required: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                voidDefault: '0',
                defaultSelected: 164,
                dataSource: { name: 'getLookup', value: 'country' }
            },
            lastDutyStationStateId: {
                label: { lookUpMsg: { id: 158293 } },
                required: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                voidDefault: '0'
            },
            responsibilities: {
                label: { lookUpMsg: { id: 370066 } }, // responsibilities
                max: 3000,
                of: { lookUpMsg: { id: 104616 } }, // of
                rows: 4,
                maxMessage: { lookUpMsg: { id: 160293 } }, // max
                counter: true,
                required: "true",
                error: { required: { lookUpMsg: { id: 555 } } } // required
            },
            // standard experience
            expState: {
                label: { lookUpMsg: { id: 158293 } },
                required: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                dataSource: { name: 'getStatesText', value: '164' },
                voidDefault: '0'
            },
            companyName: {
                label: { lookUpMsg: { id: 154455 } }, // Company Name:
                required: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                }
            },
            companyCity: {
                label: { lookUpMsg: { id: 154153 } }, // City/Town:
                required: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                }
            },
            companyStateText: {
                label: { lookUpMsg: { id: 154154 } }, // State/Province:
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text',
                dataSource: { name: 'getStatesText', value: '164' },
                voidDefault: '0'
            },
            companyState: {
                label: { lookUpMsg: { id: 154154 } }, // State/Province:
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text',
                dataSource: { name: 'getStates', value: '164' },
                voidDefault: '0'
            },
            companyCountry: {
                label: { lookUpMsg: { id: 154156 } }, // Country:
                required: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                voidDefault: '0',
                defaultSelected: 164,
                dataSource: { name: 'getLookup', value: 'country' }
            },
            jobTitle: {
                label: { lookUpMsg: { id: 362760 } }, // Job title
                required: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                }
            },
            expstartDate: {
                label: { lookUpMsg: { id: 155831 } }, // Start Date:
                placeholder: { lookUpMsg: { id: 370068 } }, // MM/YYYY
                required: 'true',
                max: '10',
                minMode: 'month',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    mask: { lookUpMsg: { id: 268363 } }, // You must enter a Valid Date
                    match: { lookUpMsg: { id: 376138 } } // Start date should be less than end date
                },
                match: { model: 'expendDate', operator: 'dateGreaterThan' },
                type: 'text'
            },
            expendDate: {
                label: { lookUpMsg: { id: 98373 } }, // End Date:
                placeholder: { lookUpMsg: { id: 370068 } }, // MM/YYYY
                required: 'true',
                max: '10',
                minMode: 'month',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    mask: { lookUpMsg: { id: 268363 } } // You must enter a Valid Date
                },
                type: 'text'
            },
            isPresentWorkingCompany: {
                label: { lookUpMsg: { id: 370056 } }, // Presently Working at this compan
                isInline: true,
                required: "true",
                items: [
                    { text: { lookUpMsg: { id: 367657 } }, value: 'true' },
                    { text: { lookUpMsg: { id: 367658 } }, value: 'false' }
                ]
            },
            amount: {
                label: { lookUpMsg: { id: 195331 } }, // Salary
                placeholder: { lookUpMsg: { id: 367920 } }, // 0000.00
                //decimal: true,
                max: '8',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    pattern: { lookUpMsg: { id: 375296 } } // Invalid Currency Format
                },
                type: 'text',
                pattern: 'currency'
            },
            salaryPeriod: {
                label: { lookUpMsg: { id: 370058 } }, // salary Period,
                type: 'text',
                dataSource: { name: "getLookupByName", value: "experiencesalarytypes" },
                items: [
                ]
            },
            currencyType: {
                label: { lookUpMsg: { id: 370481 } }, // Currency
                type: 'text',
                //defaultSelected: 25151, // this is handeled in the controler, due to timing issues
                dataSource: { name: "getLookupByName", value: "experiencecurrencies" },
                items: [
                ],
                defaultSelected: 25151
            },
            averageHoursPerWeek: {
                label: { lookUpMsg: { id: 195332 } },
                required: false,
                max: '100',
                min: '0',
                step: '0',
                pattern: 'integerOnly',
                error: {
                    required: { lookUpMsg: { id: 375394 } } // Must be a whole number from 1 - 100
                },
                type: 'number'
            },
            companyDescription: {
                label: { lookUpMsg: { id: 154458 } },  // Describe this work experience:
                placeholder: { lookUpMsg: { id: 370072 } }, // Describe your role
                max: 3000,
                of: { lookUpMsg: { id: 104616 } }, // of
                rows: 4,
                maxMessage: { lookUpMsg: { id: 160293 } }, // max
                counter: true,
                required: "true",
                error: {
                    required: { lookUpMsg: { id: 555 } }  // required
                }
            },
            payPlan: {
                label: { lookUpMsg: { id: 195336 } } // Pay Plan and Grade:
            }
        });
    }
})();