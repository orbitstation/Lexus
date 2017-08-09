(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', '$location', run]);
    function run($rootScope, $location) {
        angular.extend($rootScope.meta.messages, {
            AccordionGoButton:{lookUpMsg:{id:370661 } }, // Next Section
            359482:{lookUpMsg:{id:359482}}, // This job is expired, but you can see it because youre running a debug build.
            364088:{lookUpMsg:{id:364088}}, // Posted:
            365635:{lookUpMsg:{id:365635}}, // Apply
            364090:{lookUpMsg:{id:364090}}, // Save
            365636:{lookUpMsg:{id:365636}}, // Saved
            364091:{lookUpMsg:{id:364091}}, // Email job
            366340:{lookUpMsg:{id:366340}}, // Print
            364093:{lookUpMsg:{id:364093}}, // Back to search
            158427:{lookUpMsg:{id:158427}}, //Ethnicity
            158437:{lookUpMsg:{id:158437}}, //EEO main text
            158426:{lookUpMsg:{id:158426}}, //Learn more
            158425:{lookUpMsg:{id:158425}}, //EEO header text
            //Email share modal
            364556:{lookUpMsg:{id:364556}}, // Share This Job with a Friend
            364561:{lookUpMsg:{id:364561}}, // Send
            364973:{lookUpMsg:{id:364973}}, // Job Summary
            364974:{lookUpMsg:{id:364974}}, // Company Details
            364975:{lookUpMsg:{id:364975}}, // Job Details
            365464:{lookUpMsg:{id:365464}}, // Online apply
            365465:{lookUpMsg:{id:365465}}, // Apply with resume \'{0}\'
            365467:{lookUpMsg:{id:365467}}, // Cover letter for application
            365468:{lookUpMsg:{id:365468}}, // Save for later
            365474:{lookUpMsg:{id:365474}}, // Create new resume
            365475:{lookUpMsg:{id:365475}}, // Create new cover letter
            365509:{lookUpMsg:{id:365509}}, // You\'ve already applied to this position with this resume.
            365510:{lookUpMsg:{id:365510}}, // Thank you for your application.
            361446:{lookUpMsg:{id:361446}}, // Continue on employer\'s site
            364506:{lookUpMsg:{id:364506}}, // To finish your job application, this employer requires the completion of additional interview questions at their website.
            313338:{lookUpMsg:{id:313338}}, // You have successfully applied for this job
            319227:{lookUpMsg:{id:319227}}, // Return to Search Results
            371230:{lookUpMsg:{id:371230}}, // Apply to this position
            702:   {lookUpMsg:{id:   702}}, // Cancel
            371371:{lookUpMsg:{id:371371}}, // Load Template
            371372:{lookUpMsg:{id:371372}}, // Remove the cover letter from this application
            371373:{lookUpMsg:{id:371373}}, // Save this as a new cover letter template
            371374:{lookUpMsg:{id:371374}}, // Update this cover letter template
            371375:{lookUpMsg:{id:371375}}, // Save this as a new cover letter template
            371376:{lookUpMsg:{id:371376}}, // You have saved the maximum number of cover letters
            375301:{lookUpMsg:{id:375301}}, // Veterans Apply Now
            339822:{lookUpMsg:{id:339822}}, // Back
            371031:{lookUpMsg:{id:371031}}, // You do not have any resumes saved to your account please
            371032:{lookUpMsg:{id:371032}}, // Create a New Resume.
            371033:{lookUpMsg:{id:371033}}, // Please Select an exsiting resume or
            371034:{lookUpMsg:{id:371034}}, // Manage your resumes
            371035:{lookUpMsg:{id:371035}}, // This Jos Has Been Saved
            306385:{lookUpMsg:{id:306385}}, // Captcha Image Popup
            371231:{lookUpMsg:{id:371231}}, // Saved
            151900:{lookUpMsg:{id:151900}}, //Invalid email address(es)
            370217:{lookUpMsg:{id:370217}}, //Veteran Wanted
            253912:{lookUpMsg:{id:253912}}, //Create Date
            354555:{lookUpMsg:{id:354555}}, //File Type
            361288:{lookUpMsg:{id:361288}}, //Doc Size
            157853:{lookUpMsg:{id:157853}}, //Delete
            376443:{lookUpMsg:{id:376443}},  //Use existing resume
            376444:{lookUpMsg:{id:376444}},  //upload new resume
            211742:{lookUpMsg:{id:211742}},  //job view
            346842: { lookUpMsg: { id: 346842 } },  //job search
            376844: { lookUpMsg: { id: 376844 } },  //Manage your Resumes
            376860: { lookUpMsg: { id: 376860 } },  //Note
            376861: { lookUpMsg: { id: 376861 } },  //Managing your resume will bring you out of the application flow.
            154148: { lookUpMsg: { id: 154148 } },  //Firstname
            154150: { lookUpMsg: { id: 154150 } },  //Lastname
            354142: { lookUpMsg: { id: 354142 } },   //Close

            379208: { lookUpMsg: { id: 379208 } },
            379209: { lookUpMsg: { id: 379209 } },
            365227: { lookUpMsg: { id: 365227 } }   //template for page title

        });

        angular.extend($rootScope.meta, {
            pageHeader: {
                title:{lookUpMsg:{id:364973 } }, // Job Summary 
                //introBody:{lookUpMsg:{id:0 } }  //
            },
            pageHeaderApply: {
                title:{lookUpMsg:{id:365635 } }, // Apply
                //introBody:{lookUpMsg:{id:0 } }  //
            },
            pageHeaderApplyByMail: {
                title:{lookUpMsg:{id:365635 } }, //Apply 
                //introBody:{lookUpMsg:{id:0 } }  //
            },
            accordion: {
                resume: {
                    isOpen: true,
                    show: true,
                    configShow: true,
                    touched: false,
                    formName: 'resumeForm',
                    heading:{lookUpMsg:{id:371263, text: 'Choose a Resume' } },
                    //noButton: true,
                    url: '/UI/jobView/apply/sections/chooseResume.html'
                },
                coverletter: {
                    show: true,
                    configShow: true,
                    touched: false,
                    isOptional: true,
                    formName: 'coverLetterForm',
                    heading:{lookUpMsg:{id:371262, text: 'Choose a cover letter (optional)' } },
                    //noButton: true,
                    url: '/UI/jobView/apply/sections/chooseCoverLetters.html'
                },
                eeo: {
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'eeoForm',
                    heading:{lookUpMsg:{id:202420, text: 'Equal Employment Opportunity / Affirmative Action' } },
                    //noButton: true,
                    url: '/UI/jobView/apply/sections/EEO.html'
                },
                questions: {
                    show: false,
                    configShow: true,
                    touched: false,
                    isOptional: true,
                    formName: 'questionsForm',
                    heading:{lookUpMsg:{id:304214, text: 'Screening Questionnaire' } },
                    //noButton: true,
                    url: '/UI/jobView/apply/sections/questions.html'
                }
            },
            resume: {
                label: { lookUpMsg: { id: 367453 } }, // Resume title 367453
                required: false,
                max: '100',
                error: {
                    required:{lookUpMsg:{id:367454 } } // Please enter a resume title.
                },
                type: 'text',
                disabled: false,
                voidDefault: 0,
                defaultSelected: 0,
                items: []
            },
            templates: {
                label:{lookUpMsg:{id:370982 } }, // Select a Cover Letter Template
                required: false,
                max: '100',
                error: {
                    required:{lookUpMsg:{id:367454 } } // Please enter a resume title.
                },
                type: 'text',
                disabled: false,
                addDefault:{lookUpMsg:{id:366341 } }, // -- SELECT --
                //voidDefault: '0',
                items: {}
            },
            coverLettertitle: {
                label:{lookUpMsg:{id:157861}}, // Title
                required: true,
                mask: '',
                max: 50,
                error: {
                    required:{lookUpMsg:{id:157181}} // Please enter a Letter Title.
                },
                type: 'text'
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
                    height: 300,
                    menubar: false,
                    skin_url: $rootScope.registry.localStore.global.context.cdnUrl + '/styles/tinymce/skins/lightgray',
                    theme: 'modern',
                    forced_root_block: '',
                    plugins: [
                        'advlist autolink lists link charmap print preview hr anchor pagebreak',
                        'searchreplace visualblocks visualchars code contextmenu',
                        'paste textcolor colorpicker textpattern'
                    ],
                    toolbar1: 'insertfile undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link',
                    toolbar2: 'print preview | forecolor backcolor'
                }
            },
            documentUpload: {
                maxItems: 1,
                maxFileSize: 500000,
                allowedTypes: ['doc', 'docx', 'pdf', 'txt', 'rtf'],
                hideTitle: true,
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
            sendTo: {
                label:{lookUpMsg:{id:364557}}, // Send this job to
                required: true,
                max: '255',
                error: {
                    required:{lookUpMsg:{id:555}} // required
                },
                help: {
                    title:{lookUpMsg:{id:0}},
                    content:{lookUpMsg:{id:364559}} // Enter the email address of the recipient(s). Separate each address with a comma.
                },
                type: 'text'
            },
            sendFrom: {
                label:{lookUpMsg:{id:364558}}, // Enter your email address
                required: true,
                disabled: false,
                max: '255',
                error: {
                    required:{lookUpMsg:{id:555 } }
                },
                help: {
                    title:{lookUpMsg:{id:0}},
                    content:{lookUpMsg:{id:364560}} // This address will be used for mail delivery only. It will not be used for any other purpose.
                },
                type: 'email'
            },
            ethnicity: {
                label:{lookUpMsg:{id:158427 } },
                required: true,
                error: {
                    required:{lookUpMsg:{id:555 } } // required
                },
                dataSource: { name: "getLookupByName", value: "eeoethnicity" }
            },
            gender: {
                label:{lookUpMsg:{id:340435}}, // Gender
                required: true,
                isInline: true,
                error: {
                    required:{lookUpMsg:{id:555 } } // required
                },
                dataSource: { name: "getLookupByName", value: "eeogender" }
            },
            veteran: {
                label:{lookUpMsg:{id:158431}}, // Gender
                required: true,
                isInline: true,
                error: {
                    required:{lookUpMsg:{id:555 } } // required
                },
                dataSource: { name: "getLookupByName", value: "eeoveteranStatus" }
            },
            disability: {
                label:{lookUpMsg:{id:158434}}, // Gender
                required: true,
                error: {
                    required:{lookUpMsg:{id:555 } } // required
                },
                dataSource: { name: "getLookupByName", value: "eeodisability" }
            },
            //FirstName
            firstName: {
                label: { lookUpMsg: { id: 154148 } }, // First Name (meta)
                placeholder: { lookUpMsg: { id: 154148 } }, // First Name (meta)
                required: true,
                mask: '',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text'
            },
            //LastName
            lastName: {
                label: { lookUpMsg: { id: 154150 } }, // Last Name (default)
                placeholder: { lookUpMsg: { id: 154150 } }, // Last Name
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text'
            }
        });
    }
})();