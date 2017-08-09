(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);

    function run($rootScope) {

        angular.extend($rootScope.meta.messages, {
            1:{lookUpMsg:{id:123}}, // Acount Reset Pages
            12:{lookUpMsg:{id:1234}},
            363929:{lookUpMsg:{id:363929}}, // TBD
            363930:{lookUpMsg:{id:363930}}, // TBD
            339822: { lookUpMsg: { id: 339822 } }, // Back
            // username panel
            70203:{lookUpMsg:{id:70203}}, // Forgot Password
            338962:{lookUpMsg:{id:338962}}, // Did you forget your password? Enter the username below and we\'ll help you set a new one.
            338964:{lookUpMsg:{id:338964}}, // Actually, I have an email address.
            // email panel
            249154:{lookUpMsg:{id:249154}}, // To access your account, please enter your email address so that we may locate your account information.
            330640:{lookUpMsg:{id:330640}}, // Thanks! Your account information has been sent to your email address.
            160015:{lookUpMsg:{id:160015}}, // Email Address:
            338963:{lookUpMsg:{id:338963}}, // I don\'t have an email address.
            363763:{lookUpMsg:{id:363763}},
            168675:{lookUpMsg:{id:168675}},
            // reset password panel
            151887:{lookUpMsg:{id:151887}}, // Reset Password
            111097:{lookUpMsg:{id:111097}}, // Please provide a valid username
            330645:{lookUpMsg:{id:330645}}, // That answer did not match our records. Please try again. If you are having trouble, please contact GCS.
            70088:{lookUpMsg:{id:70088}}, // Submit
            //upSell text
            363999:{lookUpMsg:{id:363999}}, // Cover Letters are great!
            364000:{lookUpMsg:{id:364000}}, // this is why cover letters are so go, you should create an account and use Cover Letters
            // optOutAgents
            365472:{lookUpMsg:{id:365472}}, // OptOut Job Search Agents
            365473:{lookUpMsg:{id:365473}}, // this is the p tag for One Click Unsubscribe
        });
        angular.extend($rootScope.meta, {
            pageHeaderPassword: {
                title:{lookUpMsg:{id:151887 } },       // Edit Account
                introBody:{lookUpMsg:{id:111097 } }   //
            },
            pageHeaderForgot: {
                title:{lookUpMsg:{id:363929 } },       // Edit Account
                introBody:{lookUpMsg:{id:363930 } }   // Edit Account
            },
            pageHeader: {
                title:{lookUpMsg:{id:0 } },   
                introBody:{lookUpMsg:{id:0 } }
            },
            //Email
            emailAddress: {
                label:{lookUpMsg:{id:160015}}, // Email (default)
                placeholder:{lookUpMsg:{id:160015}}, // Email (default)
                required: true,
                mask: '',
                max: '255',
                error: {
                    required:{lookUpMsg:{id:555}} // required
                },
                type: 'email'
            },
            //Submit
            submit: {
                label:{lookUpMsg:{id:171751, value: "Submit" } }, // (default Message)
                validation: "globalForm.$invalid",
                isBusy: false
            },
            //User Name
            userName: {
                label:{lookUpMsg:{id:70011}}, // User Name
                placeholder:{lookUpMsg:{id:70011}}, // User Name
                required: true,
                mask: '',
                max: '255',
                error: {
                    required:{lookUpMsg:{id:555}} // required
                },
                type: 'text'
            },
            //Submit Username
            submitUserName: {
                label:{lookUpMsg:{id:171751, value: "Submit" } }, // (default Message)
                validation: "globalForm.$invalid",
                isBusy: false
            },
            //question
            secretQuestion: {
                label:{lookUpMsg:{id:328750}}, // Choose a Security Question: 
                required: true,
                mask: '',
                max: '255',
                disabled: true,
                error: {
                    required:{lookUpMsg:{id:555}} // required
                },
                type: 'text'
            },
            //Answer
            secretAnswer: {
                label:{lookUpMsg:{id:328751}},
                placeholder:{lookUpMsg:{id:328751}},
                required: true,
                mask: '',
                max: '255',
                error: {
                    required:{lookUpMsg:{id:555}} // required
                },
                type: 'text'
            },
            //Submit Username and SecretQA
            submitSecretQA: {
                label:{lookUpMsg:{id:171751, value: "Submit" } }, // (default Message)
                validation: "globalForm.$invalid",
                isBusy: false
            },
            //Password
            password: {
                label:{lookUpMsg:{id:396}}, // Password
                required: true,
                placeholder:{lookUpMsg:{id:327425}}, // Enter Password
                max: '20',
                type: 'password',
                error: {
                    required:{lookUpMsg:{id:201015}} // a minimum of 8 and a maximum of 20 characters
                }
            },
            //Confirm Password
            passwordConfirm: {
                label:{lookUpMsg:{id:398}}, // Re-enter Password
                required: true,
                placeholder:{lookUpMsg:{id:327425}}, // Enter Password
                max: '20',
                type: 'password',
                error: {
                    required:{lookUpMsg:{id:362400}} // Re-enter password is required
                }
            },
            //Password Assist
            passwordAssist: {
                requirementTitle:{lookUpMsg:{id:361991}}, // Password Requirements
                RequirementMessages: [
                    { messageId: 361997, text: 'characters' },
                    { messageId: 361996, text: 'Minimum of' },
                    { messageId: 361998, text: 'No more than' },
                    { messageId: 361999, text: 'Contains uppercase and lowercase letters' },
                    { messageId: 362000, text: 'Contains numbers' },
                    { messageId: 362001, text: 'Contains special characters' },
                    { messageId: 362002, text: 'Doesn\'t contain spaces' },
                    { messageId: 362005, text: 'Passwords match' }
                ]
            },
            button1: {
                label:{lookUpMsg:{id:70088}}, // Submit
                validation: 'globalForm.$invalid'
            },
            //                                                                  _________________________
            // ________________________________________________________________/  One Click Unsubscribe  \____________

            //stop Receiving emails?
            stopReceiving: {
                label:{lookUpMsg:{id:195301}}, // Are You a U.S. Citizen
            required: true,
            defaultSelected: "1",
            items: [
                    { text: { lookUpMsg: { id: 376196, text: '' } }, value: 1 },
                    { text: { lookUpMsg: { id: 376197, text: '' } }, value: 0 }
                ]
            },
            //stop Receiving emails - servey
            unsubscribeSurvey: {
                label:{lookUpMsg:{id:365489}}, // We value your opinion. Please take a moment to tell us why you are unsubscribing from this email: 
                required: false,
                max: '255',
                error: {
                    required:{lookUpMsg:{id:555}} // required
                },
                type: 'text',
                dataSource: { name: 'getLookup', value: 'AgentOptOutSurveyQuestions' },
                defaultSelected: 1
            }
        });
    }
})();