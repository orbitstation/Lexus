(function () {
    "use strict";
    /* Meta Data for the "Account Create" Flow miniSPA  */
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            354965: { lookUpMsg: { id: 354965 } }, // Mailing Address
            365639: { lookUpMsg: { id: 365639 } }, // Primary Address
            365640: { lookUpMsg: { id: 365640 } }, // Add a mailing address if your Home Information is not where you receive your mail
            365641: { lookUpMsg: { id: 365641 } }, // Add a Mailing Address
            365642: { lookUpMsg: { id: 365642 } }, // Remove This Mailing Address
            365643: { lookUpMsg: { id: 365643 } }, // Add a Primary Address
            365644: { lookUpMsg: { id: 365644 } }, // I do not have a Primary Address
            352246: { lookUpMsg: { id: 352246 } }, // Some employers proactively recruit for candidates with disabilities. Do you wish to have your resume/application available to those employers?
            339697: { lookUpMsg: { id: 339697 } }, // Please be aware that we will not share your specific disability information with any employees.  But by disclosing your disability, you may be eligible for additional resources and/or services.
            304626: { lookUpMsg: { id: 304626 } }, // Add another phone
            364081: { lookUpMsg: { id: 364081 } }, // Create Account
            364082: { lookUpMsg: { id: 364082 } }, // Edit Account
            364325: { lookUpMsg: { id: 364325 } }, // Send text messages to this number
            364976: { lookUpMsg: { id: 364976 } }, // We are sorry but we cannot create your account at this time.
            364977: { lookUpMsg: { id: 364977 } }, // Sorry, you must be authorized to work in the U.S. to create an account.
            344962: { lookUpMsg: { id: 344962 } }, // Pos Modal Header
            344963: { lookUpMsg: { id: 344963 } }, // Pos Modal Body
            344964: { lookUpMsg: { id: 344964 } }, // Pos Modal Footer
            365259: { lookUpMsg: { id: 365259 } }, // Enter this information about your (Military) spouse
            159422: { lookUpMsg: { id: 159422 } },
            136611: { lookUpMsg: { id: 136611 } }, // Buttons
            374989: { lookUpMsg: { id: 374989 } }, //Change Password
            365625: { lookUpMsg: { id: 365625 } }, // Your profile was saved.
            365626: { lookUpMsg: { id: 365626 } }, // Your profile was not saved. There was a server error.
            365627: { lookUpMsg: { id: 365627 } }, // Cannot create account at this time. There was a server error.
            375009: { lookUpMsg: { id: 375009 } }, //Success
            371123: { lookUpMsg: { id: 371123 } }, //Error
            375010: { lookUpMsg: { id: 375010 } }, //Password has been changed
            162574: { lookUpMsg: { id: 162574 } }, //Cancel
            204843: { lookUpMsg: { id: 204843 } }, //Create an Account
            364090: { lookUpMsg: { id: 364090 } }, // Save
            315145: { lookUpMsg: { id: 315145 } }, // Ok

            379218: { lookUpMsg: { id: 379218 } },
            379219: { lookUpMsg: { id: 379219 } },

            AccordionGoButton: { lookUpMsg: { id: 370661 } } // Next Section
        });

        angular.extend($rootScope.meta, {
            pageHeader: {
                title: { lookUpMsg: { id: 364082 } },       // Edit Account
                introBody: { lookUpMsg: { id: 159422 } }   // Your free site membership starts here! Create your account to view the latest job openings, post a resume online, explore careers and career advice, and much, much more.
            },
            passwordChangeHeader: {
                title: { lookUpMsg: { id: 374989 } } //Change Password
            },
            breadCrumbsAccountSetup: [{ "display": { lookUpMsg: { id: 364082 } }, "url": '' }],
            breadCrumbsChangePassword: [
                { "display": { lookUpMsg: { id: 364082 } }, 'url': '/account' },
                { "display": { lookUpMsg: { id: 374989 } } }],
            accordion: {
                userVerification: {
                    curentActive: true,
                    show: true,
                    configShow: true,
                    touched: false,
                    formName: 'varificationForm',
                    heading: { lookUpMsg: { id: 378967 } },
                    isOpen: true,
                    isDisabled: false,
                    hasData: true,
                    isNumeric: true,
                    url: 'UI/Account/page1/sections/account-verification.html'
                },
                loginInformation: {
                    curentActive: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'loginInformationForm',
                    heading: { lookUpMsg: { id: 328693 } },
                    //isOpen: false,
                    isDisabled: true,
                    hasData: true,
                    isNumeric: true,
                    url: 'UI/Account/page1/sections/account-logIn.html'
                },
                residentialInformation: {
                    curentActive: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'residentialInformationForm',
                    heading: { lookUpMsg: { id: 353920 } },
                    //isOpen: false,
                    isDisabled: true,
                    hasData: true,
                    isNumeric: true,
                    url: 'UI/Account/page1/sections/account-residential.html'
                },
                contactInformation: {
                    curentActive: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'contactInformationForm',
                    heading: { lookUpMsg: { id: 324 } },
                    //isOpen: false,
                    isDisabled: true,
                    hasData: true,
                    isNumeric: true,
                    url: 'UI/Account/page1/sections/account-contact.html'
                },
                militaryService: {
                    curentActive: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'militaryServiceForm',
                    heading: { lookUpMsg: { id: 161056 } },
                    //isOpen: false,
                    isDisabled: true,
                    hasData: true,
                    isNumeric: true,
                    url: 'UI/Account/page1/sections/account-military.html'
                },
                farmWorkers: {
                    curentActive: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'farmWorkersForm',
                    heading: { lookUpMsg: { id: 339823 } },
                    //isOpen: false,
                    isDisabled: true,
                    hasData: true, isNumeric: true,
                    url: 'UI/Account/page1/sections/account-farmWorker.html'
                },
                Disability: {
                    curentActive: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'disabilityForm',
                    heading: { lookUpMsg: { id: 127093 } },
                    //isOpen: false,
                    isDisabled: true,
                    hasData: true, isNumeric: true,
                    url: 'UI/Account/page1/sections/account-disability.html'
                },
                Demographics: {
                    curentActive: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'demographicsForm',
                    heading: { lookUpMsg: { id: 189339 } },
                    //isOpen: false,
                    isDisabled: true,
                    hasData: true,
                    isNumeric: true,
                    url: 'UI/Account/page1/sections/account-demographics.html'
                },
                Education: {
                    curentActive: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'educationForm',
                    heading: { lookUpMsg: { id: 378968 } },
                    //isOpen: false,
                    isDisabled: true,
                    hasData: true,
                    isNumeric: true,
                    url: 'UI/Account/page1/sections/account-education.html'
                },
                programAssistance: {
                    curentActive: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'programAssistanceForm',
                    heading: { lookUpMsg: { id: 355337 } },
                    //isOpen: false,
                    isDisabled: true,
                    hasData: true, isNumeric: true,
                    url: 'UI/Account/page1/sections/account-programAssistance.html'
                },
                whereDidYouHearAboutUs: {
                    curentActive: false,
                    show: false,
                    configShow: true,
                    touched: false,
                    formName: 'whereDidYouHearAboutUsForm',
                    heading: { lookUpMsg: { id: 130913 } },
                    //isOpen: false,
                    isDisabled: true,
                    hasData: true,
                    isNumeric: true,
                    url: 'UI/Account/page1/sections/account-hearAboutUs.html'
                }
            },
            //User ID
            userId: {
                label: { lookUpMsg: { id: 195301 } }, // User Id
                placeholder: { lookUpMsg: { id: 97528 } }, // UserID
                required: false,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text'
            },
            //                                  ____________________
            //---------------------------------/  User Verification \--------------------------------------
            //FirstName
            firstName: {
                label: { lookUpMsg: { id: 154148 } }, // First Name (meta)
                placeholder: { lookUpMsg: { id: 154148 } }, // First Name (meta)
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text'
            },
            //Middle Name
            middleName: {
                label: { lookUpMsg: { id: 193959 } }, // Middle Name
                placeholder: { lookUpMsg: { id: 193959 } }, // Middle Name
                required: false,
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
            },
            //SSN
            socialSecurity: {
                label: { lookUpMsg: { id: 115976 } }, // Social Security Number (default)
                placeholder: { lookUpMsg: { id: 115976 } }, // Social Security Number
                required: true,
                max: '9',
                pattern: 'ssn',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    pattern: { lookUpMsg: { id: 375703 } } // You must enter a Valid SSN
                },
                type: 'password',
                help: {
                    title: { lookUpMsg: { id: 376060 } }, // SSN Help
                    content: { lookUpMsg: { id: 376061 } } // Hello This is a of the system
                }
            },
            //SSN Confirm
            socialSecurityConfirm: {
                label: { lookUpMsg: { id: 339442 } }, // Re-Enter Social Security Number
                placeholder: { lookUpMsg: { id: 339442 } }, // Re-Enter Social Security Number
                required: true,
                max: '9',
                pattern: 'ssn',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    pattern: { lookUpMsg: { id: 376062 } } // The two SSN fields must match
                },
                type: 'password'
            },
            //DOB
            DOB: {
                label: { lookUpMsg: { id: 153581 } }, // Date of Birth
                placeholder: { lookUpMsg: { id: 155767 } }, // mm/dd/yyyy
                required: 'true',
                max: '10',
                minDate: '',
                maxDate: 'today',
                dateMode: 'year',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    mask: { lookUpMsg: { id: 375730 } } // You must enter a Valid Date
                },
                type: 'text'
            },
            // Are you US Citizen
            usCitizen: {
                label: { lookUpMsg: { id: 195301 } }, // Are You a U.S. Citizen
                required: true,
                max: '255',
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "111" }
            },
            // Are you Authorized to work
            authorizedToWork: {
                label: { lookUpMsg: { id: 304429 } }, // Are you Authorized To Work in the United States?
                required: true,
                max: '255',
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text',
                dataSource: { name: "builderFieldId", value: "111" }
            },
            //                                  ____________________
            //---------------------------------/  Login Information \--------------------------------------
            //User Name
            userName: {
                label: { lookUpMsg: { id: 159285 } }, // Username
                required: true,
                max: '20',
                type: 'text',
                error: {
                    required: { lookUpMsg: { id: 162562 } } // Username is required
                }
            },
            //Old Password
            passwordOld: {
                label: { lookUpMsg: { id: 374988 } }, //Old password
                required: true,
                placeholder: { lookUpMsg: { id: 327425 } }, // Enter Password
                max: '20',
                type: 'password',
                error: {
                    required: { lookUpMsg: { id: 201015 } } // a minimum of 8 and a maximum of 20 characters
                }
            },
            //Password
            password: {
                label: { lookUpMsg: { id: 158223 } }, // Password
                required: true,
                placeholder: { lookUpMsg: { id: 327425 } }, // Enter Password
                max: '20',
                type: 'password',
                error: {
                    required: { lookUpMsg: { id: 201015 } } // a minimum of 8 and a maximum of 20 characters
                }
            },
            //Confirm Password
            passwordConfirm: {
                label: { lookUpMsg: { id: 158224 } }, // Re-enter Password
                required: true,
                placeholder: { lookUpMsg: { id: 327425 } }, // Enter Password
                max: '20',
                type: 'password',
                error: {
                    required: { lookUpMsg: { id: 362400 } } // Re-enter password is required
                }
            },
            //Password Assist
            passwordAssist: {
                requirementTitle: { lookUpMsg: { id: 361991 } }, // Password Requirements
                RequirementMessages: [
                    { messageId: 361997, text: 'characters' },
                    { messageId: 361996, text: 'Minimum of' },
                    { messageId: 361998, text: 'No more than' },
                    { messageId: 361999, text: 'Contains uppercase and lowercase letters' },
                    { messageId: 362000, text: 'Contains numbers' },
                    { messageId: 362001, text: 'Contains special characters' },
                    { messageId: 362002, text: 'Doesn\'t contain spaces' },
                    { messageId: 362005, text: 'Passwords match' }]
            },
            //Security Question
            securityQuestionId: {
                label: { lookUpMsg: { id: 328750 } }, // Choose a Secret Question
                required: true,
                dataSource: { name: 'getLookup', value: 'forgotpassquestions' },
                voidDefault: '0',
                error: {
                    required: { lookUpMsg: { id: 194363 } } // Secret question is a required field.
                }
            },
            //Secuity Answer
            securityAnswer: {
                label: { lookUpMsg: { id: 328751 } }, // Your Answer
                required: true,
                error: {
                    required: { lookUpMsg: { id: 361944 } } // Your answer is required
                }
            },
            //                                  __________
            //---------------------------------/  Details \--------------------------------------
            // Email 
            emailNew: {
                label: { lookUpMsg: { id: 154159 } }, // Email Address
                placeholder: { lookUpMsg: { id: 154159 } },
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    pattern: { lookUpMsg: { id: 376063 } }, // Please type valid email
                    emailexists: { lookUpMsg: { id: 330711 } }
                },
                pattern: 'email',
                email: 'true'
            },
            email: {
                label: { lookUpMsg: { id: 154159 } }, // Email Address
                placeholder: { lookUpMsg: { id: 154159 } },
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    pattern: { lookUpMsg: { id: 376063 } } // Please type valid email
                },
                pattern: 'email'
            },
            //Confirm Email
            confirmEmail: {
                label: { lookUpMsg: { id: 164574 } }, // Confirm Email Address
                placeholder: { lookUpMsg: { id: 154159 } },
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    match: { lookUpMsg: { id: 376064 } } // the email adresses must match
                },
                type: 'text'
            },
            //                                  _____________________
            //---------------------------------/  Contact Information\--------------------------------------
            // Primary Phone #
            primaryPhone: {
                label: { lookUpMsg: { id: 133902 } }, // Primary Phone
                placeholder: { lookUpMsg: { id: 70882 } }, // Phone Number
                required: true,
                mask: { face: '(999) 999-9999' },
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
                voidDefault: '0',
                dataSource: { name: 'getLookup', value: 'phonetypes' },
                error: {
                    required: { lookUpMsg: { id: 339275 } } // Phone type is required
                }
            },
            //Preffered Contatct Method
            preferredContactMethod: {
                label: { lookUpMsg: { id: 215514 } }, // Preferred Contact Method
                required: true,
                dataSource: { name: 'getLookup', value: 'contactpreferenceformats' },
                voidDefault: '0',
                error: {
                    required: { lookUpMsg: { id: 345002 } } // Preferred Contact Method is required
                }
            },
            //Phone # 2
            telephoneNumber2: {
                label: { lookUpMsg: { id: 269566 } }, // Telephone Number 2
                required: false,
                mask: { face: '(999) 999-9999' },
                max: '50',
                type: 'text',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                }
            },
            //Phone Type 2
            telephoneNumber2Type: {
                label: { lookUpMsg: { id: 354555 } }, // Type
                required: false,
                voidDefault: '0',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                select: 3,
                dataSource: { name: 'getLookup', value: 'phonetypes' }
            },
            //Phone # 3
            telephoneNumber3: {
                label: { lookUpMsg: { id: 269567 } },
                required: false,
                mask: { face: '(999) 999-9999' },
                max: '50',
                type: 'text',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                }
            },
            //Phone Type 3
            telephoneNumber3Type: {
                label: { lookUpMsg: { id: 354555 } }, // Type
                required: false,
                voidDefault: '0',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                select: 6,
                dataSource: { name: 'getLookup', value: 'phonetypes' }
            },
            //                                  __________________________
            //---------------------------------/  Residential Information \--------------------------------------
            homeAddressAutocomplete: {
                label: { lookUpMsg: { id: 378474 } },
                required: true,
                max: '255',
                help: {
                    content: { lookUpMsg: { id: 378475 } } // Helper how to use google autocomplete
                }
            },
            mailAddressAutocomplete: {
                label: { lookUpMsg: { id: 378605 } },
                required: true,
                max: '255',
                help: {
                    content: { lookUpMsg: { id: 378475 } } // Helper how to use google autocomplete
                }
            },
            // Country
            country: {
                label: { lookUpMsg: { id: 154156 } }, // Country
                required: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                voidDefault: '0',
                defaultSelected: 164,
                dataSource: { name: 'getLookup', value: 'country' }
            },
            // Home Address
            homeAddress: {
                label: { lookUpMsg: { id: 154151 } }, // Home Address Line 1
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text'
            },
            // Home Address 2 
            homeAddress2: {
                label: { lookUpMsg: { id: 197146 } }, // Home Address Line 2
                required: false,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text'
            },
            // City
            city: {
                label: { lookUpMsg: { id: 154153 } }, // City/Town
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text'
            },
            // State
            stateInternational: {
                label: { lookUpMsg: { id: 154154 } }, // State/Province
                max: '255',
                type: 'text'
            },
            // State
            state: {
                label: { lookUpMsg: { id: 154154 } }, // State/Province
                required: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                dataSource: { name: 'getStates', value: '164' },
                voidDefault: '0'
            },
            // Postal Code International
            postalCodeInternational: {
                label: { lookUpMsg: { id: 253956 } }, // Postal/Zip Code
                max: '255',
                type: 'text'
            },
            // Postal Code
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
            // County
            county: {
                label: { lookUpMsg: { id: 338884 } },
                required: false,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555, text: 'required' } }
                },
                type: 'text',
                disabled: 'true'
            },
            //                                  ___________________
            //---------------------------------/  Mailing Address  \--------------------------------------
            // Mailing Home Address
            mailingHomeAddress: {
                label: { lookUpMsg: { id: 339102 } }, // Mailing Address Line 1
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text'
            },
            // Mailing Home Address 2
            mailingHomeAddress2: {
                label: { lookUpMsg: { id: 339103 } }, // Mailing Address Line 2
                required: false,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text'
            },
            // Mailing City
            mailingCity: {
                label: { lookUpMsg: { id: 90 } }, // City/Town
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text'
            },
            // Mailing State
            mailingState: {
                label: { lookUpMsg: { id: 61001 } }, // State/Province
                required: true,
                max: '255',
                dataSource: { name: 'getStates', value: '164' },
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text'
            },
            // Mailing Postal Code
            mailingPostalCode: {
                label: { lookUpMsg: { id: 70267 } }, // Postal/Zip Code
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // Required
                    wrong: { lookUpMsg: { id: 376065 } }, // Please enter a valid ZipCode
                    nomatch: { lookUpMsg: { id: 375694 } }, // Not matching selected state
                    minlength: { lookUpMsg: { id: 375695 } } // Min 5 digits
                },
                type: 'text',
                help: {
                    title: { lookUpMsg: { id: 375895 } }, // Look Up your zip code
                    content: { lookUpMsg: { id: 376078 } } // Look up your zip code on <a href="https://tools.usps.com/go/ZipLookupAction!input.action?mode=0&refresh=true" target="_blank" class=""> USPS.com </a>
                }
            },
            // Mailing Country
            mailingCountry: {
                label: { lookUpMsg: { id: 154156 } }, // Country
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text',
                voidDefault: '0',
                defaultSelected: 164,
                dataSource: { name: 'getLookup', value: 'country' }
            },
            //mailling County
            mailingCounty: {
                label: { lookUpMsg: { id: 338884 } }, // County
                required: false,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text',
                disabled: 'true'
            },
            //                                  ________________
            //---------------------------------/  Farm Workers  \--------------------------------------
            // Is FarmWorker?
            farmWorker: {
                label: { lookUpMsg: { id: 339698 } }, // Have you worked on a farm or as a migrant/migrant food processor at least 25 days in the past 12 months?
                required: true,
                max: '',
                isInline: true,
                type: '',
                error: {
                    required: { lookUpMsg: { id: 352423 } } // Farm worker is a required field
                },
                dataSource: { name: "builderFieldId", value: "45105" }
            },
            // Is Farm Worker Type?
            farmWorkerType: {
                label: { lookUpMsg: { id: 352245 } }, // Which one (farm work or food processing) did you or do you do most?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 307960 } } // This field is required.
                },
                dataSource: { name: "builderFieldId", value: "49739" }
            },
            // Has Recent FarmWork?
            farmWorkRecentlyEmployed: {
                label: { lookUpMsg: { id: 339699 } }, // Was at least half your earned income in the last 12 months from farm, orchard, ranch, plant and/or nursery work and NOT with the same farm year round?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 307960 } } // This field is required.
                },
                dataSource: { name: "builderFieldId", value: "49736" }
            },
            //Has Lack Of FarmWork?
            farmWorkerLackOfWork: {
                label: { lookUpMsg: { id: 339700 } }, // Was at least half your earned income in the last 12 months from animal slaughtering (except poultry), frozen fruit, juice and vegetable manufacturing, or fruit and vegetable canning?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 307960 } } // This field is required.
                },
                dataSource: { name: "builderFieldId", value: "49737" }
            },
            //Has Work Away From Home?
            farmWorkAwayFromHome: {
                label: { lookUpMsg: { id: 339701 } }, // Did you travel beyond normal commuting distance from your permanent home to accept any work listed in questions above in the last 12 months?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 307960 } } // This field is required.
                },
                dataSource: { name: "builderFieldId", value: "49738" }
            },
            //                                  ____________________________
            //---------------------------------/  Military Service Section  \--------------------------------------
            //Military Service Types
            //Are you one of the following:
            militaryServiceType: {
                label: { lookUpMsg: { id: 365218 } }, // Are you one of the following:
                required: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                addDefault: { lookUpMsg: { id: 366341 } }, // -- SELECT --
                dataSource: { name: "builderFieldId", value: "55730" }
            },
            /// ActiveDuty (Title 10 Activation)
            /// Are you Active Duty Military, Veteran, Spouse of a Veteran, or National Guard member who has been called to Active Duty (Title 10 Activation)?
            activeDuty: {
                label: { lookUpMsg: { id: 339702 } }, // Are you Active Duty Military, Veteran, Spouse of a Veteran, or National Guard member who has been called to Active Duty (Title 10 Activation)?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "45106" }
            },
            /// Transitioning Service Member
            ///  Are you within 24 months of retirement or 12 months of discharge from the military (Transitioning Service Member?)
            transitionalServiceMember: {
                label: { lookUpMsg: { id: 339705 } }, // Are you within 24 months of retirement or 12 months of discharge from the military (Transitioning Service Member?)
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "45106" }
            },
            // Transition Type
            transitionType: {
                label: { lookUpMsg: { id: 339716 } }, // Transition Type
                required: false,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                addDefault: { lookUpMsg: { id: 366341 } }, // -- SELECT --
                dataSource: { name: "builderFieldId", value: "49953" }
            },
            // Projected Discharge Date
            transitionDischargeDate: {
                label: { lookUpMsg: { id: 339719 } }, // Projected Discharge Date
                placeholder: { lookUpMsg: { id: 155767 } }, // mm/dd/yyyy
                required: 'true',
                max: '255',
                minDate: 'today',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    mask: { lookUpMsg: { id: 375730 } } // You must enter a Valid Date
                },
                type: 'text'
            },
            //TransitionAssistanceProgram
            transitionAssistanceProgram: {
                label: { lookUpMsg: { id: 339720 } }, // Have you attended a Transition Assistance Program (TAP) within the last three years?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "49954" }
            },
            // Veteran
            veteran: {
                label: { lookUpMsg: { id: 339706 } }, // In the past, have you served on active duty in the armed forces and were discharged or released (Veteran)?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "45110" }
            },
            //Most Recent Character of Service Received
            characterOfService: {
                label: { lookUpMsg: { id: 340445 } }, // Most Recent Character of Service Received
                required: false,
                isInline: true,
                addDefault: { lookUpMsg: { id: 366341 } }, // -- SELECT --
                error: {
                    required: { lookUpMsg: { id: 340708 } } // required
                },
                type: 'select',
                //dataSource: { name: "builderFieldId", value: "55155" }
                dataSource: { name: "getCustomReferenceListItems", value: "MGS_ETO_MostRecCOSRecd" }
            },
            // Multiple Tours Of Duty
            multipleToursOfDuty: {
                label: { lookUpMsg: { id: 340439 } }, // Did you serve more than 1 tour of duty?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "111" }
            },
            // Military Service Start Date
            militaryCampaignStartDate: {
                label: { lookUpMsg: { id: 340440 } }, // Military Service Start Date
                placeholder: { lookUpMsg: { id: 155767 } }, // mm/dd/yyyy
                required: 'false',
                //mask: 'usDate',
                maxDate: 'today',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    mask: { lookUpMsg: { id: 375730 } } // You must enter a Valid Date
                },
                type: 'text'
            },
            // Military Service End Date
            militaryCampaignEndDate: {
                label: { lookUpMsg: { id: 340441 } }, // Military Service End Date
                placeholder: { lookUpMsg: { id: 155767 } }, // mm/dd/yyyy
                required: 'false',
                //mask: 'usDate',
                maxDate: 'today',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    mask: { lookUpMsg: { id: 375730 } } // You must enter a Valid Date
                },
                type: 'text'
            },
            //Second Entry Date
            militarySecondEntryDate: {
                label: { lookUpMsg: { id: 340454 } }, // Second entry date
                placeholder: { lookUpMsg: { id: 155767 } }, // mm/dd/yyyy
                required: 'false',
                //mask: 'usDate',
                maxDate: 'today',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    mask: { lookUpMsg: { id: 375730 } } // You must enter a Valid Date
                },
                type: 'text'
            },
            //Second Discharge Date
            militarySecondDischargeDate: {
                label: { lookUpMsg: { id: 340455 } }, // Second discharge date
                placeholder: { lookUpMsg: { id: 155767 } }, // mm/dd/yyyy
                required: 'false',
                //mask: 'usDate',
                maxDate: 'today',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    mask: { lookUpMsg: { id: 375730 } } // You must enter a Valid Date
                },
                type: 'text'
            },
            // Third entry Date
            militaryThirdEntryDate: {
                label: { lookUpMsg: { id: 340456 } }, // Third entry date
                placeholder: { lookUpMsg: { id: 155767 } }, // mm/dd/yyyy
                required: 'false',
                //mask: 'usDate',
                maxDate: 'today',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    mask: { lookUpMsg: { id: 375730 } } // You must enter a Valid Date
                },
                type: 'text'
            },
            //Third Discharge Date
            militaryThirdDischargeDate: {
                label: { lookUpMsg: { id: 340457 } }, // Third discharge date
                placeholder: { lookUpMsg: { id: 155767 } }, // mm/dd/yyyy
                required: 'false',
                //mask: 'usDate',
                maxDate: 'today',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    mask: { lookUpMsg: { id: 375730 } } // You must enter a Valid Date
                },
                type: 'text'
            },
            //Military Campaign Badge
            militaryCampaignBadge: {
                label: { lookUpMsg: { id: 340442 } }, // Did you receive a military campaign badge?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "49749" }
            },
            //Branch Of Service
            militaryBranchOfService: {
                label: { lookUpMsg: { id: 340443 } }, // Branch of Service
                required: false,
                addDefault: { lookUpMsg: { id: 366341 } }, // -- SELECT --
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'select',
                dataSource: { name: "builderFieldId", value: "49945" }
            },
            //Active In Military Reserves
            activeMilitaryReserves: {
                label: { lookUpMsg: { id: 340444 } }, // Are you active in Military Reserves?
                required: false,
                addDefault: { lookUpMsg: { id: 366341 } }, // -- SELECT --
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'select',
                dataSource: { name: "getCustomReferenceListItems", value: "MGS_ETO_ActiveMilReserve" }
            },
            // Disabled Veteran
            disabledVeteran: {
                label: { lookUpMsg: { id: 340446 } }, // Are you a Disabled Veteran
                required: false,
                addDefault: { lookUpMsg: { id: 366341 } }, // -- SELECT --
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'select',
                dataSource: { name: "getCustomReferenceListItems", value: "MGS_ETO_DisabledVeteran" }
            },
            //homelessVeteran
            militaryHomeless: {
                label: { lookUpMsg: { id: 340447 } }, // Are you a Homeless Veteran?
                required: false,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "50571" }
            },
            //vacationalRehab
            vacationalRehab: {
                label: { lookUpMsg: { id: 340448 } }, // Were you referred by Veteran\'s Voc Rehab (Chapter 31)?
                required: false,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "53889" }
            },
            //transitionAssistance
            transitionAssistanceWorkShop: {
                label: { lookUpMsg: { id: 340449 } }, // Have you attended a Transition Assistance Program (TAP) Workshop within the last three years?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "52848" }
            },
            // Title 10 Activation
            title10Activation: {
                label: { lookUpMsg: { id: 339707 } }, // Are you now, or have you served, in a National Guard Reserve unit that was called to or is on Active Duty due to armed conflict and/or crisis involving national security (Title 10 Activation)?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "45111" }
            },
            // Title 10 Activation
            spouseOfDisabledVet: {
                label: { lookUpMsg: { id: 339711 } }, // Are you the spouse of a veteran who has a total service connected disability, is a Missing in Action captured in the line of duty by a hostile force or a Prisoner of War, or who died from a service connected disability?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "45112" }
            },
            //National Guard
            nationalGuard: {
                label: { lookUpMsg: { id: 339703 } }, // Are you a current member of the [Your State] National Guard?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "45107" }
            },
            //Military Spouse
            militarySpouse: {
                label: { lookUpMsg: { id: 339704 } }, // Are you the spouse or dependent of someone in active-duty military service, or National Guard/Reserves who is currently activated?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "45108" }
            },
            //Military Spouse relationship
            militarySpouseRelationship: {
                label: { lookUpMsg: { id: 344273 } }, // Relationship
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                dataSource: { name: "builderFieldId", value: "46702" },
                addDefault: { lookUpMsg: { id: 366341 } } // -- SELECT --
            },
            //                                  _______________________
            //---------------------------------/  Demographic Section  \--------------------------------------
            //Gender
            gender: {
                label: { lookUpMsg: { id: 340435 } }, // Gender
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                dataSource: { name: "getLookupByName", value: "eeogender" }
            },
            // Ethnicity
            ethnicity: {
                label: { lookUpMsg: { id: 339828 } }, // Ethnicity
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 354547 } } // required
                },
                items: [
                    { text: { lookUpMsg: { id: 182218 } }, value: '79' }, // Hispanic or Latino
                    { text: { lookUpMsg: { id: 354545 } }, value: '80' }, // Non-Hispanic or Latino
                    { text: { lookUpMsg: { id: 124807 } }, value: '81' } // Decline to Identify
                ]
            },
            // Race
            race: {
                label: { lookUpMsg: { id: 340434 } }, // Race
                required: true,
                max: '255',
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 354548 } } // required
                },
                dataSource: { name: "builderFieldId", value: "50249" }
            },
            // EmploymentStatus
            employmentStatus: {
                label: { lookUpMsg: { id: 354556 } }, // Employment Status
                required: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                dataSource: { name: "builderFieldId", value: "50541" }
            },
            // English Proficiency
            limitedEnglishProficiency: {
                label: { lookUpMsg: { id: 354562 } }, // Do you have limited English Proficiency?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: '',
                dataSource: { name: "builderFieldId", value: "50521" }

            },
            // Translation Assistance
            isNeedTranslationAssistance: {
                label: { lookUpMsg: { id: 354563 } }, // Need Translation Assistance
                required: true,
                isInline: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'select',
                dataSource: { name: 'builderFieldId', value: '50522' }
            },
            // Translation Assistance Languages
            translationAssistanceLanguage: {
                label: { lookUpMsg: { id: 357555 } }, // Need Translation Assistance Languages
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'select',
                dataSource: { name: "builderFieldId", value: "50568" }
            },
            // Enrolled In School
            isEnrolledInSchool: {
                label: { lookUpMsg: { id: 354564 } }, // Are you currently enrolled in school?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: '',
                dataSource: { name: "builderFieldId", value: "50523" }
            },
            // School Type
            schoolType: {
                label: { lookUpMsg: { id: 354724 } }, // School type?
                required: true,
                type: 'text',
                voidDefault: '0',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                addDefault: { lookUpMsg: { id: 366341 } }, // -- SELECT --
                dataSource: { name: "builderFieldId", value: "50569" }
            },
            // Highi School Dropout
            isHighSchoolDropout: {
                label: { lookUpMsg: { id: 354712 } }, // High School Dropout?
                required: true,
                max: '',
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: '',
                dataSource: { name: "builderFieldId", value: "50570" }
            },
            //HomeLess
            isHomeless: {
                label: { lookUpMsg: { id: 354565 } }, // Are you homeless?
                required: true,
                max: '',
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: '',
                dataSource: { name: "builderFieldId", value: "50524" }
            },
            // Highest Education Level
            highestEducationLevel: {
                label: { lookUpMsg: { id: 154462 } }, // What is your highest degree completed?
                required: true,
                max: '',
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text',
                voidDefault: '0',
                dataSource: { name: "getLookup", value: "educationallevels" }
            },
            // Runaway
            isRunaway: {
                label: { lookUpMsg: { id: 354566 } }, // Are you a runaway?
                required: true,
                max: '',
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "50525" }
            },
            // Convict
            isConvict: {
                label: { lookUpMsg: { id: 354567 } }, // Were you previously convicted?
                required: true,
                max: '',
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'radio',
                dataSource: { name: "builderFieldId", value: "50526" }
            },
            //                                  ______________
            //---------------------------------/  Disability  \--------------------------------------
            // Disability Status
            disabilityStatus: {
                label: { lookUpMsg: { id: 173938 } }, // Do You Have a Disability?
                required: false,
                max: '255',
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text',
                defaultChecked: '26949',
                dataSource: { name: "builderFieldId", value: "45104" }
            },
            // Is Disability Searchable?
            disabilitySearchable: {
                label: { lookUpMsg: { id: 376077 } }, // Make Your Disability Searchable?
                required: false,
                max: '255',
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                type: 'text',
                defaultChecked: '',
                dataSource: { name: "builderFieldId", value: "49735" }
            },
            //                                  ______________________
            //---------------------------------/  Program Assistance  \--------------------------------------
            // Assistance Eligibility
            programAssistanceEligibility: {
                label: { lookUpMsg: { id: 355338 } }, // Would you like to determine your possible eligibility for future services?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 307960 } } // This field is required.
                },
                type: 'text',
                dataSource: { name: "builderFieldId", value: "50823" }
            },
            // Unemployed for 4 months
            unemployed4Months: {
                label: { lookUpMsg: { id: 355308 } }, // If you are currently unemployed, have you been unemployed for 4 months or longer?
                required: true,
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 307960 } } // This field is required.
                },

                dataSource: { name: "builderFieldId", value: "50824" }
            },
            // UI InsuranceBenefits
            uiBenefits: {
                label: { lookUpMsg: { id: 355309 } }, // Are you receiving General Assistance (GA), Refugee Cash Assistance (RCA) and/or Basic Food Assistance?
                required: true,
                max: '',
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 307960 } } // This field is required.
                },
                type: 'text',
                dataSource: { name: "builderFieldId", value: "50825" }
            },
            // Low Income Household
            lowIncomeHousehold: {
                label: { lookUpMsg: { id: 355310 } }, // Are you a member of a low-income household?
                required: true,
                max: '',
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 307960 } } // This field is required.
                },
                type: 'text',
                dataSource: { name: "builderFieldId", value: "50826" }
            },
            //Receiving TANF
            receivingTANF: {
                label: { lookUpMsg: { id: 355311 } }, // Are you receiving TANF?
                required: true,
                max: '',
                isInline: true,
                error: {
                    required: { lookUpMsg: { id: 307960 } } // This field is required.
                },
                type: 'text',
                dataSource: { name: "builderFieldId", value: "50827" }
            },
            //                                  _____________________________
            //---------------------------------/  Where Did You Hear About Us\--------------------------------------
            //Hear About Us Content
            hearAboutContent: {
                label: { lookUpMsg: { id: 130914 } }, // Where did you hear about us?
                required: false,
                max: '255',
                type: 'text',
                error: {
                    required: { lookUpMsg: { id: 260311 } } // Where did you hear about us is required.
                },
                dataSource: { name: "builderFieldId", value: "6801" }
            },
            //                                  ______________
            //---------------------------------/  User Terms  \--------------------------------------
            // User Terms Message
            userTermsMessage: {
                label: { lookUpMsg: { id: 359349 } }, // In order to serve you better, we share some of your personal information with select partners offering additional employment and training services. Partners are prohibited from sharing this information with anyone not involved in the procurement and provisioning of these services.
                required: true,
                max: '',
                type: '',
                error: {
                    required: { lookUpMsg: { id: 307960 } } // This field is required.
                },
                items: [
                   { text: { lookUpMsg: { id: 378887 } }, value: 'true' }
                ],
                isSingleSelect: true
            },
            //                                  ______________
            //---------------------------------/  Accept Terms  \--------------------------------------
            // Accept Terms
            acceptTerms: {
                label: { lookUpMsg: { id: 274426 } }, // I accept <a href='#' target='_blank'>terms and agreements</a>
                required: true,
                max: '',
                type: '',
                error: {
                    required: { lookUpMsg: { id: 362402 } } // Terms and Agreements is required
                },
                items: [
                   { text: { lookUpMsg: { id: 378887 } }, value: 'true' }
                ],
                isSingleSelect: true
            },
            priorityOfService: {
                isEnabled: false
            }
        });

        angular.extend($rootScope.meta.messages, {
            378257: { lookUpMsg: { id: 378257 } },  // Military service
            378260: { lookUpMsg: { id: 378260 } },  // I am wounded warrior
            378259: { lookUpMsg: { id: 378259 } }   // Are you wounded warrior?
        });
        angular.extend($rootScope.meta, {
            passwordChangeHeader: {
                title: { lookUpMsg: { id: 374989 } } //Change Password
            },
            pageHeader: {
                title: { lookUpMsg: { id: 364082 } },       // Edit Account
                introBody: { lookUpMsg: { id: 159422 } }   // Your free site membership starts here! Create your account to view the latest job openings, post a resume online, explore careers and career advice, and much, much more.
            },
            // Military
            usMilitaryInvolvement: {
                label: { lookUpMsg: { id: 378258 } }, //
                required: true,
                voidDefault: '0',
                error: {
                    required: { lookUpMsg: { id: 555 } } // required
                },
                dataSource: { name: "getLookupByName", value: "usmilitaryinvolvements" }
            },
            availabilityToWorkDate: {
                label: { lookUpMsg: { id: 378261 } }, // Available to work
                placeholder: { lookUpMsg: { id: 155767 } }, // mm/dd/yyyy
                required: true,
                minDate: 'today',
                max: '16',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    mask: { lookUpMsg: { id: 375730 } } // You must enter a Valid Date
                }
            }
        });
    }
})();
