/* Meta Data for the "Contact Us" Flow miniSPA  */
(function (angular) {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            175703: { lookUpMsg: { id: 175703 } }, // Contact Us
            362911: { lookUpMsg: { id: 362911 } }, // To offer comments about this site
            362912: { lookUpMsg: { id: 362912 } }, // Site's Help Desk info
            362913: { lookUpMsg: { id: 362913 } } // Email form
        });
        angular.extend($rootScope.meta, {
            pageHeader: {
                title: { lookUpMsg: { id: 175703 } },
                introBody: { lookUpMsg: { id: 362911 } },
            },

            metaUrl: {
                label: { lookUpMsg: { id: 0, text: 'URL Name' } }, // 
                placeholder: { lookUpMsg: { id: 0, text: '' } }, //
                required: 'true',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                }
            },
            metaTags: {
                label: { lookUpMsg: { id: 0, text: 'MetaTags' } }, // 
                placeholder: { lookUpMsg: { id: 0, text: '' } }, //
                required: '',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                }
            },
            metaInNav: {
                label: { lookUpMsg: { id: 0, text: 'Should it be in the Navigation bar?' } }, // 
                placeholder: { lookUpMsg: { id: 0, text: '' } }, //
                required: 'true',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                },
                items: [
                    { text: { lookUpMsg: { id: 0, text: 'Yes' } }, value: '0' },
                    { text: { lookUpMsg: { id: 0, text: 'No' } }, value: '1' },
                ]

            },
            mataNavChannel: {
                label: { lookUpMsg: { id: 0, text: 'Select the navigation channel' } }, // 
                placeholder: { lookUpMsg: { id: 0, text: '' } }, //
                required: 'true',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                },
                defaultSelected: '0',
                items: [
                    { text: { lookUpMsg: { id: 0, text: 'My job search' } }, value: '0' },
                    { text: { lookUpMsg: { id: 0, text: 'My Career Tools' } }, value: '1' },
                    { text: { lookUpMsg: { id: 0, text: 'Resourses' } }, value: '2' },
                ]
            },
            metaPlacement: {
                label: { lookUpMsg: { id: 0, text: 'New' } }, // 
                placeholder: { lookUpMsg: { id: 0, text: '' } }, //
                required: 'false',
                type: 'number',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                }
            },
            metaNotes: {
                label: { lookUpMsg: { id: 0, text: 'Notes' } }, // 
                placeholder: { lookUpMsg: { id: 0, text: '' } }, //
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                }
            },




            topBannerTitle: {
                label: { lookUpMsg: { id: 0, text: 'Title' } }, // 
                placeholder: { lookUpMsg: { id: 0, text: 'Page Title' } }, //
                required: 'true',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                }
            },






            urlFilter: {
                //label: { lookUpMsg: { id: 0, text: 'URL' } }, // 
                //dataSource: { name: 'getLookup', value: 'contactpreferenceformats' },
                //customReferenceList: '',
                //voidDefault: '0',
                items: [
                    { text: { lookUpMsg: { id: 0, text: 'All URLs' } }, value: '0' },
                    { text: { lookUpMsg: { id: 0, text: 'Youth Microsite' } }, value: 'Youth Microsite' },
                    { text: { lookUpMsg: { id: 0, text: 'Military' } }, value: 'Military' },
                ]
            },


            editorFilter: {
                //label: { lookUpMsg: { id: 0, text: 'Editor' } }, // 
                //dataSource: { name: 'getLookup', value: 'contactpreferenceformats' },
                //customReferenceList: '',
                items: [
                    { text: { lookUpMsg: { id: 0, text: 'All Editors' } }, value: '0' },
                    { text: { lookUpMsg: { id: 0, text: 'MBoston' } }, value: 'MBoston' },
                    { text: { lookUpMsg: { id: 0, text: 'JDuffyperez' } }, value: 'JDuffyperez' },
                    { text: { lookUpMsg: { id: 0, text: 'MMouse' } }, value: 'MMouse' },
                ]
            },


            statusFilter: {
                //label: { lookUpMsg: { id: 0, text: 'Status' } }, // 
                //dataSource: { name: 'getLookup', value: 'contactpreferenceformats' },
                //customReferenceList: '',
                voidDefault: '-Please Select One-',
                items: [
                    { text: { lookUpMsg: { id: 0, text: 'All Status' } }, value: '0' },
                    { text: { lookUpMsg: { id: 0, text: 'Draft' } }, value: 'Draft' },
                    { text: { lookUpMsg: { id: 0, text: 'Draft [Pending]' } }, value: 'Pending' },
                    { text: { lookUpMsg: { id: 0, text: 'Published' } }, value: 'Published' },
                    { text: { lookUpMsg: { id: 0, text: 'Archived' } }, value: 'Archived' },
                ]
            },



            dateFilter: {
                //label: { lookUpMsg: { id: 0, text: 'Date' } }, // 
                //dataSource: { name: 'getLookup', value: 'contactpreferenceformats' },
                //customReferenceList: '',
                items: [
                    { text: { lookUpMsg: { id: 0, text: 'All Dates' } }, value: '0' },
                    { text: { lookUpMsg: { id: 0, text: 'Yesterday' } }, value: '1' },
                    { text: { lookUpMsg: { id: 0, text: 'Last 3 days' } }, value: '3' },
                    { text: { lookUpMsg: { id: 0, text: 'Last 7 days' } }, value: '7' },
                ]
            },










            firstName: {
                label: { lookUpMsg: { id: 154148 } }, // First Name (default1)
                placeholder: { lookUpMsg: { id: 154148 } }, // First Name (default2)
                required: 'true',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                },
                type: 'text'
            },
            lastName: {
                label: { lookUpMsg: { id: 154150 } }, // Last Name (default)
                placeholder: { lookUpMsg: { id: 154150 } }, // Last Name
                required: 'true',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                },
                type: 'text'
            },
            userEmail: {
                label: { lookUpMsg: { id: 154159 } }, // Email Address
                placeholder: { lookUpMsg: { id: 154159 } }, // Your email address
                required: 'true',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                    pattern: { lookUpMsg: { id: 117078 } } // Not a valid email
                },
                pattern: 'email',
                type: 'text'
            },
            reason: {
                label: { lookUpMsg: { id: 160194 } }, // My question/comment is about
                required: 'true',
                //dataSource: { name: 'getLookup', value: 'contactpreferenceformats' },
                //customReferenceList: '',
                error: {
                    required: { lookUpMsg: { id: 160243 } } // Please select the reason
                },
                voidDefault: '-Please Select One-',
                items: [
                    { text: { lookUpMsg: { id: 160293 } }, value: '-Please Select One-' },
                    { text: { lookUpMsg: { id: 284183 } }, value: 'Username/password' },
                    { text: { lookUpMsg: { id: 284184 } }, value: 'Creating an account' },
                    { text: { lookUpMsg: { id: 284185 } }, value: 'Resume' },
                    { text: { lookUpMsg: { id: 284186 } }, value: 'Job Search' },
                    { text: { lookUpMsg: { id: 284187 } }, value: 'Applying for a job' },
                    { text: { lookUpMsg: { id: 284188 } }, value: 'Budget tool' },
                    { text: { lookUpMsg: { id: 284189 } }, value: 'Assessments' },
                    { text: { lookUpMsg: { id: 284190 } }, value: 'Career plan' },
                    { text: { lookUpMsg: { id: 284193 } }, value: 'Calendar' },
                    { text: { lookUpMsg: { id: 348884 } }, value: 'Technical issues' },
                    { text: { lookUpMsg: { id: 284196 } }, value: 'Other' }
                ]
            },
            userComment: {
                label: { lookUpMsg: { id: 160196 } }, // Enter question/comment
                placeholder: { lookUpMsg: { id: 160196 } }, // Type your question/comment
                of: { lookUpMsg: { id: 104616 } }, // of
                rows: 8,
                maxMessage: { lookUpMsg: { id: 160293 } },
                required: true,
                max: '2000',
                counter: true,
                error: {
                    required: { lookUpMsg: { id: 555 } }, // required
                }
            },
            button1: {
                label: { lookUpMsg: { id: 362914 } }, // (Send)
                validation: 'globalForm.$invalid'
            },



            pageName: {
                label: { lookUpMsg: { id: 0, text: 'URL / Page Name' } }
            },
            hasMenuItem: {
                items: [
                    { text: { lookUpMsg: { id: 0, text: 'Show on Menu' } }, value: 'true' },
                ]
            },
            liveStatus: {
                label: { lookUpMsg: { id: 0, text: 'Live Status' } },
                required: 'true',
                error: {
                    required: { lookUpMsg: { id: 160243 } } // Please select the reason
                },
                items: [
                    { text: { lookUpMsg: { id: 0, text: 'Online' } }, value: 'online' },
                    { text: { lookUpMsg: { id: 0, text: 'Offline' } }, value: 'offline' },
                ]
            },


        });
    }
})(angular);