/* Meta Data for the "Contact Us" Flow miniSPA  */
(function (angular) {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            175703:{lookUpMsg:{id:175703}}, // Contact Us
            362911:{lookUpMsg:{id:362911}}, // To offer comments about this site
            362912:{lookUpMsg:{id:362912}}, // Site's Help Desk info
            362913:{lookUpMsg:{id:362913}} // Email form
        });
        angular.extend($rootScope.meta, {
            pageHeader: {
                title:{lookUpMsg:{id:175703}},
                introBody:{lookUpMsg:{id:362911}}
            },
            firstName: {
                label:{lookUpMsg:{id:154148}}, // First Name (default1)
                placeholder:{lookUpMsg:{id:154148}}, // First Name (default2)
                required: 'true',
                max: '255',
                error: {
                    required:{lookUpMsg:{id:555}} // required
                },
                type: 'text'
            },
            lastName: {
                label:{lookUpMsg:{id:154150}}, // Last Name (default)
                placeholder:{lookUpMsg:{id:154150}}, // Last Name
                required: 'true',
                max: '255',
                error: {
                    required:{lookUpMsg:{id:555}} // required
                },
                type: 'text'
            },
            userEmail: {
                label:{lookUpMsg:{id:154159}}, // Email Address
                placeholder:{lookUpMsg:{id:154159}}, // Your email address
                required: 'true',
                max: '255',
                error: {
                    required:{lookUpMsg:{id:555}}, // required
                    pattern:{lookUpMsg:{id:117078}} // Not a valid email
                },
                pattern: 'email',
                type: 'text'
            },
            reason: {
                label:{lookUpMsg:{id:160194}}, // My question/comment is about
                required: 'true',
                //dataSource: { name: 'getLookup', value: 'contactpreferenceformats' },
                //customReferenceList: '',
                error: {
                    required:{lookUpMsg:{id:160243}} // Please select the reason
                },
                voidDefault: '-Please Select One-',
                items: [
                    { text:{lookUpMsg:{id:160293 } }, value: '-Please Select One-' },
                    { text:{lookUpMsg:{id:284183 } }, value: 'Username/password' },
                    { text:{lookUpMsg:{id:284184 } }, value: 'Creating an account' },
                    { text:{lookUpMsg:{id:284185 } }, value: 'Resume' },
                    { text:{lookUpMsg:{id:284186 } }, value: 'Job Search' },
                    { text:{lookUpMsg:{id:284187 } }, value: 'Applying for a job' },
                    { text:{lookUpMsg:{id:284188 } }, value: 'Budget tool' },
                    { text:{lookUpMsg:{id:284189 } }, value: 'Assessments' },
                    { text:{lookUpMsg:{id:284190 } }, value: 'Career plan' },
                    { text:{lookUpMsg:{id:284193 } }, value: 'Calendar' },
                    { text:{lookUpMsg:{id:348884 } }, value: 'Technical issues' },
                    { text:{lookUpMsg:{id:284196 } }, value: 'Other' }
                ]
            },
            userComment: {
                label:{lookUpMsg:{id:160196}}, // Enter question/comment
                placeholder:{lookUpMsg:{id:160196}}, // Type your question/comment
                of:{lookUpMsg:{id:104616}}, // of
                rows: 8,
                maxMessage:{lookUpMsg:{id:160293 } },
                required: true,
                max: '2000',
                counter: true,
                error: {
                    required:{lookUpMsg:{id:555}}, // required
                }
            },
            button1: {
                label:{lookUpMsg:{id:362914}}, // (Send)
                validation: 'globalForm.$invalid'
            }
        });
    }
})(angular);