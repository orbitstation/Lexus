(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            360065:{lookUpMsg:{id: 360065}}, // Career Plan & Goals
            360066:{lookUpMsg:{id: 360066}}, // Some text
            360176:{lookUpMsg:{id: 360176}}, // You can create a maximum of 10 goals...
            121355:{lookUpMsg:{id: 121355}}, // Status:
            364942:{lookUpMsg:{id: 364942}}, // Not Started
            364943:{lookUpMsg:{id: 364943}}, // In Progress
            364944:{lookUpMsg:{id: 364944}}, // On Hold
            364945:{lookUpMsg:{id: 364945}}, // Defer
            364946:{lookUpMsg:{id: 364946}}, // Completed
            360183:{lookUpMsg:{id: 360183}}, // Due Date:
            360156:{lookUpMsg:{id: 360156}}, // Cancel
            344391:{lookUpMsg:{id: 344391}}, // Delete
            50022:{lookUpMsg:{id: 50022}}, // Copy
            365645:{lookUpMsg:{id: 365645}}, // Remove
            365646:{lookUpMsg:{id: 365646}}, // Save
            365652:{lookUpMsg:{id: 365652}}, // Add
            329846:{lookUpMsg:{id: 329846}}, // Description
            334509:{lookUpMsg:{id: 334509}}, // Summary
            365521:{lookUpMsg:{id: 365521}}, // Activities
            365522:{lookUpMsg:{id: 365522}}, // My career plan
            365523:{lookUpMsg:{id: 365523}}, // manage my goals
            365524:{lookUpMsg:{id: 365524}}, // out of
            365526:{lookUpMsg:{id: 365526}}, // maximum
            362109:{lookUpMsg:{id: 362109}}, // Add goal
            360118:{lookUpMsg:{id: 360118}}, // How to write effective goals
            360258:{lookUpMsg:{id: 360258}}, // Add Goal Activities
            365647:{lookUpMsg:{id: 365647}}, // My goal
            365649:{lookUpMsg:{id: 365649}}, // Add from available groups
            365650:{lookUpMsg:{id: 365650}}, // Recommended activities
            365651:{lookUpMsg:{id: 365651}}, // Create activity
            365653:{lookUpMsg:{id: 365653}}, // Delete Confirmation
            125210:{lookUpMsg:{id: 125210}}, // Are you sure you want to delete
            365655:{lookUpMsg:{id: 365655}}, // activity
            365656:{lookUpMsg:{id: 365656}}, // goal
            365657:{lookUpMsg:{id: 365657}}, // Go back
            365699:{lookUpMsg:{id: 365699}}, // To remove some activities please cancel and remove from the activities list.
            365935:{lookUpMsg:{id: 365935}}, // Goal has been created, additional options are now available for this goal.
            360420:{lookUpMsg:{id: 360420}}, // If selection of "goal verification type" is other than "None", please upload all documents below.
            364094:{lookUpMsg:{id: 364094}}, // Saved Documents
            364095:{lookUpMsg:{id: 364095}}, // Upload and manage your documents
            360766:{lookUpMsg:{id: 360766}}, // You have uploaded
            104616: { lookUpMsg: { id: 104616 } }, // of
            365794:{lookUpMsg:{id: 365794}}, // documents.
            118647:{lookUpMsg:{id: 118647}}, // KB
            157853:{lookUpMsg:{id: 157853}}, // Delete
            253912:{lookUpMsg:{id: 253912}}, // Date Uploaded:
            365795:{lookUpMsg:{id: 365795}}, // Do you really want to delete....
            246651:{lookUpMsg:{id: 246651}}, // Confirm Delete
            315145:{lookUpMsg:{id: 315145}}, // Ok
            162574:{lookUpMsg:{id: 162574}}, // Cancel
            366341: { lookUpMsg: { id: 366341 } }, // -- Select --
            157940: { lookUpMsg: { id: 157940 } }, // Edit
            354555: { lookUpMsg: { id: 354555 } }, // Type
            361288: { lookUpMsg: { id: 361288 } }, // Size
            378627: { lookUpMsg: { id: 378627 } }, // <h4>By changing Goal verification type to none, your uploaded documents will be removed.</h4><h3>Do you really want to delete your documents?</h3>

            379087: { lookUpMsg: { id: 379087 } },
            379088: { lookUpMsg: { id: 379088 } }

        });

        angular.extend($rootScope.meta, {
            breadCrumbsCreatePage: [{ "display":{lookUpMsg:{id: 360065 } }, "url": '' }],   //Career Plan & Goals
            goalName: {
                label:{lookUpMsg:{id: 360124}}, // Goal Name
                placeholder:{lookUpMsg:{id: 376085}}, // Please name your goal
                required: true,
                //mask: '',
                max: '255',
                error: {
                    required:{lookUpMsg:{id: 555}} // required
                },
                type: 'text',
                help: {
                    //title:{lookUpMsg:{id: 360124}}, // Some goal info
                    content:{lookUpMsg:{id: 360125}}  // Provide a name for your goal.  This should be a brief name in 30 characters or less.
                }
            },
            targetDate: {
                label:{lookUpMsg:{id: 360128}}, // Target Date
                placeholder:{lookUpMsg:{id: 155767}}, // mm/dd/yyyy
                required: 'true',
                //mask: 'usDate',
                max: '10',
                minDate: '',
                //maxDate: 'today',
                //dateMode: 'day',
                error: {
                    required:{lookUpMsg:{id: 555}}, // required
                    mask:{lookUpMsg:{id: 375730}} // You must enter a Valid Date
                },
                type: 'text'
            },
            goalStatus: {
                label: {
                    lookUpMsg: { id: 376086, text: '' } // Goal Status
                },
                required: "true",
                max: "255",
                error: {
                    required:{lookUpMsg:{id: 555, text: '' } } // required
                },
                type: "text",
                dataSource: { name: "getLookupCareerPlanByName", value: "statuses" }
            },
            goalType: {
                label:{lookUpMsg:{id: 376087}}, // Goal Type
                help: {
                    content:{lookUpMsg:{id: 360132}} // Select if this is a personal, professions, or educational oriented goal
                },
                required: "true",
                max: "255",
                error: {
                    required:{lookUpMsg:{id: 555}} // required
                },
                type: "text",
                dataSource: { name: "getLookupCareerPlanByName", value: "types" }
            },
            goalDescription: {
                label:{lookUpMsg:{id: 360133}}, // Short Description
                placeholder:{lookUpMsg:{id: 376088}}, // Please type in some goal description
                of:{lookUpMsg:{id: 104616}}, // of
                help: {
                    //title:{lookUpMsg:{id: 360133}}, // Provide short summary
                    content:{lookUpMsg:{id: 360134}} // Provide short summary
                },
                rows: 2,
                maxMessage:{lookUpMsg:{id: 160293 } },
                counter: true,
                max: '200'
            },
            goalSummary: {
                label:{lookUpMsg:{id: 360135}}, // Summary
                placeholder:{lookUpMsg:{id: 376089}}, // Please type in some goal summary
                of:{lookUpMsg:{id: 104616}}, // of
                help: {
                    //title:{lookUpMsg:{id: 360135 } },
                    content:{lookUpMsg:{id: 360136}} // Detail the specific activities needed to meet this goal in 200 characters or less.  How does this goal relate to your work, personal life, and/or accountability?
                },
                rows: 2,
                maxMessage:{lookUpMsg:{id: 160293 } },
                required: true,
                counter: true,
                max: '200',
                error: {
                    required:{lookUpMsg:{id: 555}} // required
                }
            },
            goalStrategies: {
                label:{lookUpMsg:{id: 360141}}, // Goal Strategies
                placeholder:{lookUpMsg:{id: 376090}}, // Please type in some strategies
                of:{lookUpMsg:{id: 104616}}, // of
                help: {
                    //title:{lookUpMsg:{id: 360141 } },
                    content:{lookUpMsg:{id: 360142}} // Detail how you plan to achieve this goal in 200 characters or less.  If there are barriers, detail how you plan on overcoming those obstacles?  What activities are needed to achieve your goal?
                },
                rows: 2,
                maxMessage:{lookUpMsg:{id: 160293 } },
                required: true,
                counter: true,
                max: '200',
                error: {
                    required:{lookUpMsg:{id: 555}} // required
                }
            },
            goalVerification: {
                label:{lookUpMsg:{id: 360144}}, // Goal Verification
                help: {
                    content: {
                        lookUpMsg: { id: 360145, text: '' } // If there are any documents that pertain to this goal, you can make that selection here and then upload the document for your records.
                    }
                },
                required: "true",
                error: {
                    required:{lookUpMsg:{id: 555}} // required
                },
                dataSource: { name: "getLookupCareerPlanByName", value: "verification-types" }
            },
            saveGoal: {
                label:{lookUpMsg:{id: 376091}}, // Save goal
                validation: 'globalForm.$invalid'
            },
            accordion: {
                "deafultActivities": {
                    "curentActive": true,
                    "show": true,
                    "touched": false,
                    "formName": "deafultActivities",
                    "heading": "Default Activities",
                    "isOpen": true,
                    'noButton': true,
                    //"isDisabled": true,
                    "cssClass": "",
                    "url": "UI/careerPlan/careerGoal/includes/defaultActivities.html"
                }
            },
            activityName: {
                label:{lookUpMsg:{id: 376092}}, // Activity Name
                placeholder:{lookUpMsg:{id: 376093}}, // Please name your activity
                required: true,
                hideErrorHolder: true,
                max: '255',
                error: {
                    required:{lookUpMsg:{id: 555}}, // required
                },
                type: 'text'
            },
            activitiyDescription: {
                label:{lookUpMsg:{id: 70127}}, // Description
                //required: 'true',
                type: 'text',
                hideErrorHolder: true
            },
            activityNotes: {
                label:{lookUpMsg:{id: 41117}}, // Notes
                placeholder:{lookUpMsg:{id: 376094}}, // Please type in some activities notes
                rows: 2,
                max: '200',
                hideErrorHolder: true
            },
            activityDueDate: {
                label:{lookUpMsg:{id: 360128}}, // Target Date
                placeholder:{lookUpMsg:{id: 155767}}, // mm/dd/yyyy
                max: '10',
                minDate: '',
                maxDate: '',
                type: 'text',
                hideErrorHolder: true
            },
            docName: {
                label:{lookUpMsg:{id: 344382}}, // Document Name
                required: 'true',
                mask: '',
                max: '100',
                error: {
                    required:{lookUpMsg:{id: 370267}} // Please enter a Document Name.
                },
                type: 'text'
            },
            docFormat: {
                label:{lookUpMsg:{id: 361289}}, // Format
                type: 'text',
                disabled: true
            },
            docSize: {
                label:{lookUpMsg:{id: 361288}}, // Size
                type: 'text',
                disabled: true
            },
            recommendedActivities: {
                label:{lookUpMsg:{id: 365698}}, // Select existing activities or create a custom activity.
                required: false,
                dataSource: { name: "getLookupCareerPlanByName", value: "recommended-activities" }
            }
        });
    }
})();