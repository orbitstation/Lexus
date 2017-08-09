(function (angular) {
    "use strict";
    /* Meta Data for the "Account Create" Flow miniSPA  */
    angular.module('globalApp').run(['$rootScope', function ($rootScope) {
    
        // this is an indipendant look up table of configs for the template layout
        angular.extend($rootScope.configLayout, {
            userVerification: {
                socialSecurity: { lookUpConfig: { value: 'true', serverId: '' } },
                socialSecurityConfirm: { lookUpConfig: { value: 'true', serverId: '' } },
                dateOfBirth: { lookUpConfig: { value: 'true', serverId: '' } },
                usCitizen: { lookUpConfig: { value: 'true', serverId: '' } },
                authorizedToWork: { lookUpConfig: { value: 'true', serverId: '' } },
            },
            logIn: {
                firstName: { lookUpConfig: { value: 'true', serverId: '' } },
                middleName: { lookUpConfig: { value: 'false', serverId: '' } },
                lastName:   { lookUpConfig: { value: 'true', serverId: '' } },
                email: { lookUpConfig: { value: 'true', serverId: '' } },
                emailConfirm: { lookUpConfig: { value: 'true', serverId: '' } },
                userName: { lookUpConfig: { value: 'false', serverId: '' } },
                password: { lookUpConfig: { value: 'true', serverId: '' } },
                passwordConfirm: { lookUpConfig: { value: 'true', serverId: '' } },
                passwordAssist: { lookUpConfig: { value: 'true', serverId: '' } },
                securityQuestion: { lookUpConfig: { value: 'true', serverId: '' } },
                securityAnswer: { lookUpConfig: { value: 'true', serverId: '' } },
            },
            addressInformation: {
                homeless: { lookUpConfig: { value: 'true', serverId: '' } },
                homeAddress: { lookUpConfig: { value: 'true', serverId: '' } },
                homeAddress2: { lookUpConfig: { value: 'true', serverId: '' } },
                city: { lookUpConfig: { value: 'true', serverId: '' } },
                state: { lookUpConfig: { value: 'true', serverId: '' } },
                postalCode: { lookUpConfig: { value: 'true', serverId: '' } },
                county: { lookUpConfig: { value: 'true', serverId: '' } },
                country: { lookUpConfig: { value: 'true', serverId: '' } },
                showHideMailingAddress: { lookUpConfig: { value: 'true', serverId: '' } },
                mailingHomeAddress: { lookUpConfig: { value: 'true', serverId: '' } },
                mailingHomeAddress2: { lookUpConfig: { value: 'true', serverId: '' } },
                mailingCity: { lookUpConfig: { value: 'true', serverId: '' } },
                mailingState: { lookUpConfig: { value: 'true', serverId: '' } },
                mailingPostalCode: { lookUpConfig: { value: 'true', serverId: '' } },
                mailingCounty: { lookUpConfig: { value: 'true', serverId: '' } }
            },
            contactInfo: {
                primaryPhone: { lookUpConfig: { value: 'true', serverId: '' } },
                primaryPhoneType: { lookUpConfig: { value: 'true', serverId: '' } },
                isMobile: { lookUpConfig: { value: 'true', serverId: '' } },
                secondPhone: { lookUpConfig: { value: 'true', serverId: '' } },
                telephoneNumber2: { lookUpConfig: { value: 'true', serverId: '' } },
                telephoneNumber2Type: { lookUpConfig: { value: 'true', serverId: '' } },
                thirdPhone: { lookUpConfig: { value: 'true', serverId: '' } },
                telephoneNumber3: { lookUpConfig: { value: 'true', serverId: '' } },
                telephoneNumber3Type: { lookUpConfig: { value: 'true', serverId: '' } },
                preferredContactMethod: { lookUpConfig: { value: 'true', serverId: '' } }
            },
            military: {
                nationalGuard: { lookUpConfig: { value: 'false', serverId: '' } }
            },
            farmWorkers: {
                farmWorker: { lookUpConfig: { value: 'true', serverId: '' } },
                farmWorkerFollowUp: { lookUpConfig: { value: 'true', serverId: '' } },
                farmWorkerType: { lookUpConfig: { value: 'false', serverId: '' } },
                farmWorkRecentlyEmployed: { lookUpConfig: { value: 'true', serverId: '' } },
                farmWorkerLackOfWork: { lookUpConfig: { value: 'true', serverId: '' } },
                farmWorkAwayFromHome: { lookUpConfig: { value: 'true', serverId: '' } }
            },
            disability: {
                disabilityStatus: { lookUpConfig: { value: 'true', serverId: '' } },
                disabilitySearchable: { lookUpConfig: { value: 'false', serverId: '' } },
                pleaseBeAware: { lookUpConfig: { value: 'true', serverId: '' } }
            },
            demographics: {
                gender: { lookUpConfig: { value: 'true', serverId: '' } },
                race: { lookUpConfig: { value: 'true', serverId: '' } },
                ethnicity: { lookUpConfig: { value: 'true', serverId: '' } },
                isConvict: { lookUpConfig: { value: 'true', serverId: '' } },
                isHomeless: { lookUpConfig: { value: 'false', serverId: '' } },
                limitedEnglishProficiency: { lookUpConfig: { value: 'false', serverId: '' } },
                isNeedTranslationAssistance: { lookUpConfig: { value: 'false', serverId: '' } },
                translationAssistanceLanguage: { lookUpConfig: { value: 'false', serverId: '' } },
                isRunaway: { lookUpConfig: { value: 'false', serverId: '' } }
            },
            education: {
                isEnrolledInSchool: { lookUpConfig: { value: 'true', serverId: '' } },
                schoolType: { lookUpConfig: { value: 'true', serverId: '' } },
                highestEducationLevel: { lookUpConfig: { value: 'true', serverId: '' } },
                isHighSchoolDropout: { lookUpConfig: { value: 'true', serverId: '' } },
                unemployed4Months: { lookUpConfig: { value: 'true', serverId: '' } },
                employmentStatus: { lookUpConfig: { value: 'true', serverId: '' } },
            },
            programAssistance: {
                programAssistanceEligibility: { lookUpConfig: { value: 'false', serverId: '' } },
                uiBenefits: { lookUpConfig: { value: 'false', serverId: '' } },
                lowIncomeHousehold: { lookUpConfig: { value: 'false', serverId: '' } },
                receivingTANF: { lookUpConfig: { value: 'true', serverId: '' } }
            },
            whereDidYouHearAboutUs: {
                hearAboutContent: { lookUpConfig: { value: 'true', serverId: '' } }
            },
            legal: {
                acceptTerms: { lookUpConfig: { value: 'false', serverId: '' } },
                privacy: { lookUpConfig: { value: 'true', serverId: '' } }
            },
        });


        // this needs to mirror the meta object, it will overwrite the end point in the meta object
        angular.extend($rootScope.configMeta, {
            priorityOfService: {
                isEnabled: { lookUpConfig: { value: '', serverId: 'EnablePOS' } }
            }

        });
    }]);
})(angular);