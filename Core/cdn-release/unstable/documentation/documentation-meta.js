/* Meta Data for the "Account Create" Flow miniSPA  */
(function () {
    angular.module('globalApp').run(['$rootScope', run]);

    function run($rootScope) {
        angular.extend($rootScope.meta, {
            messages: {
                157861: { lookUpMsg: { id: 157861, text: 'Title', value: '' } },
            },

            msg1: { lookUpMsg: { id: 154148, text: 'First Name (default)' } },

            button1: {
                label: { lookUpMsg: { id: 175703, text: '(default Message)' } },
                validation: 'globalForm.$invalid',
                isBusy: false
            },

            firstName: {
                label: { lookUpMsg: { id: 154148, text: 'First Name (default)' } },
                placeholder: { lookUpMsg: { id: 154148, text: 'First Name (default)' } },
                required: false,
                mask: '',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555, text: 'required' } },
                },
                type: 'text'
            },

            email: {
                label: { lookUpMsg: { id: 154159, text: 'Email Address' } },
                placeholder: { lookUpMsg: { id: 154159, text: 'Email' } },
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 0, text: 'required' } },
                    pattern: { lookUpMsg: { id: 0, text: 'Please type valid email' } }
                },
                type: 'email'
            },


            middleName: {
                label: { lookUpMsg: { id: 0, text: 'Middle Name' } },
                placeholder: { lookUpMsg: { id: 0, text: 'Middle Name' } },
                required: 'false',
                mask: '',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 0, text: 'required' } },
                },
                type: 'text'
            },
            lastName: {
                label: { lookUpMsg: { id: 154150, text: 'Last Name' } },
                placeholder: { lookUpMsg: { id: 154150, text: 'Last Name' } },
                required: 'true',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 0, text: 'required' } },
                },
                type: 'text'
            },

            testSelect: {
                label: { lookUpMsg: { id: 0, text: 'Branch of service' } },
                required: 'false',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 0, text: 'required' } }
                },
                type: 'text',
                defaultSelected: 86758,
                dataSource: { name: 'getCustomReferenceListItems', value: 'MGS_ETO_BranchOfService' },
                //items: [
                //    { text: 'What is the name of your favorite pet?', value: 'one' },
                //    { text: 'What is the name of the city/town where you were born?', value: 'two' },
                //],
                items: [
                    { text: 'What is the name of your favorite pet?', value: "1" },
                    { text: 'What is the name of the city/town where you were born?', value: "2" }
                ]
            },

            textArea: {
                label: { lookUpMsg: { id: 154148, text: 'First Name (default)' } },
                placeholder: { lookUpMsg: { id: 154148, text: 'First Name (default)' } },
                rows: 10,
                required: false,
                max: '255',
                maxMessage: { lookUpMsg: { id: 0, text: 'of' } },
                error: {
                    required: { lookUpMsg: { id: 555, text: 'required' } },
                },
                type: 'text'
            },

            DOB: {
                label: { lookUpMsg: { id: 153581, text: 'Date of Birth' } },
                placeholder: { lookUpMsg: { id: 0, text: 'mm/dd/yyyy' } },
                required: 'true',
                //mask: 'usDate',
                max: '10',
                minDate: '',
                maxDate: 'today',
                error: {
                    required: { lookUpMsg: { id: 0, text: 'required' } },
                    mask: { lookUpMsg: { id: 0, text: 'You must enter a Valid Date' } }
                },
                type: 'text'
            },
            citizen: {
                label: { lookUpMsg: { id: 195301, text: 'Are You a U.S. Citizen' } },
                required: 'true',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 0, text: 'required' } }
                },
                type: 'text',
                dataSource: { name: 'builderFieldId', value: '45104' },
                items: [
                    { 'text': 'Yes', 'value': true },
                    { 'text': 'No', 'value': false }
                ]
            },


            passwordAssist:
            {
                requirementTitle: { lookUpMsg: { id: 361991, text: 'Password Requirements' } },
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
            password:
            {
                label: { lookUpMsg: { id: 158223, text: 'Password' } },
                required: 'true',
                placeholder: { lookUpMsg: { id: 327425, text: 'Enter Password' } },
                max: '20',
                type: 'password',
                error: {
                    required: { lookUpMsg: { id: 201015, text: 'a minimum of 8 and a maximum of 20 characters' } },
                }
            },
            passwordConfirm: {
                label: { lookUpMsg: { id: 158224, text: 'Re-enter Password' } },
                required: 'true',
                placeholder: { lookUpMsg: { id: 327425, text: 'Enter Password' } },
                max: '20',
                type: 'password',
                error: {
                    required: { lookUpMsg: { id: 362400, text: 'Re-enter password is required' } }
                }
            },
            state: {
                label: { lookUpMsg: { id: 0, text: 'State/Province' } },
                required: 'true',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 0, text: 'required' } }
                },
                dataSource: { name: 'getStates', value: '164' },
                type: 'text',
                defaultSelected: '40',
                items: [
                ]
            },
            postalCode: {
                label: { lookUpMsg: { id: 0, text: 'Postal/Zip Code' } },
                required: 'true',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 0, text: 'Required' } },
                    nomatch: { lookUpMsg: { id: 0, text: 'Not matching selected state' } },
                    minlength: { lookUpMsg: { id: 0, text: 'Min 5 digits' } }
                },
                type: 'text'
            },
            county: {
                label: { lookUpMsg: { id: 0, text: 'County' } },
                required: 'false',
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 0, text: 'required' } }
                },
                type: 'text',
                disabled: 'true',
                items: [

                ]
            },

            richTextMeta: {
                label: { lookUpMsg: { id: 154148, text: 'First Name (default)' } },
                placeholder: { lookUpMsg: { id: 154148, text: 'First Name (default)' } },
                required: 'true',
                error: {
                    required: { lookUpMsg: { id: 555, text: 'required' } },
                },
                options: {
                    height: 300,
                    theme: 'modern',
                    plugins: [
                      'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                      'searchreplace wordcount visualblocks visualchars code fullscreen',
                      'insertdatetime media nonbreaking save table contextmenu directionality',
                      'emoticons template paste textcolor colorpicker textpattern imagetools'
                    ],
                    toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    toolbar2: 'print preview media | forecolor backcolor emoticons'
                }
            },

            autoCompleteRemoteCall: {
                label: { lookUpMsg: { id: 0, text: 'Locations' } },
                placeholder: { lookUpMsg: { id: 0, text: 'Select location' } },
                required: 'true',
                error: {
                    required: { lookUpMsg: { id: 0, text: 'Required' } }
                },
                titlefield: 'text',
                valuefield: 'id',
                minlength: 2,
                remoteItemsWrapper: 'items'
            },

            autoCompleteLocalItems: {
                label: { lookUpMsg: { id: 0, text: 'Names' } },
                placeholder: { lookUpMsg: { id: 0, text: 'Select name' } },
                required: 'true',
                error: {
                    required: { lookUpMsg: { id: 0, text: 'Required' } }
                },
                searchfields: 'text',
                titlefield: 'text',
                valuefield: 'id',
                minlength: 1,
                items: [
                    { 'text': 'John', id: 1 }, { 'text': 'Joshua', id: 2 }, { 'text': 'Jeremy', id: 3 }
                ]
            },

            autoCompleteDataSource: {
                label: { lookUpMsg: { id: 0, text: 'States' } },
                placeholder: { lookUpMsg: { id: 0, text: 'Select state' } },
                required: 'true',
                error: {
                    required: { lookUpMsg: { id: 0, text: 'Required' } }
                },
                dataSource: { name: 'getStates', value: '164' },
                searchfields: 'text',
                titlefield: 'text',
                valuefield: 'value',
                minlength: 1
            },


            accordion: {
                userVerification: {
                    curentActive: true,
                    show: true,
                    touched: false,
                    formName: 'varificationForm',
                    heading: 'User Verification',
                    isOpen: true,
                    isDisabled: false,
                    cssClass: '',
                    url: 'UI/Account/page1/sections/account-details.html'
                },
                loginInformation: {
                    curentActive: true,
                    show: true,
                    touched: false,
                    formName: 'loginInformationForm',
                    heading: 'Login Information',
                    isOpen: false,
                    isDisabled: true,
                    cssClass: '',
                    url: 'UI/Account/page1/sections/account-logIn.html'
                },
                details: {
                    curentActive: true,
                    show: true,
                    touched: false,
                    formName: 'detailsForm',
                    heading: 'Details',
                    isOpen: false,
                    isDisabled: true,
                    cssClass: '',
                    url: 'UI/Account/page1/sections/account-details.html'
                },
            }
        });
    }
})();

