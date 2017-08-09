(function (angular) {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);

    function run($rootScope) {

        angular.extend($rootScope.meta, {

            messages: {
                AccordionGoButton: { lookUpMsg: { id: 370480 } }, // save and continue

                371123: { lookUpMsg: { id: 371123 } }, // Error
                347957: { lookUpMsg: { id: 347957 } }, // customized alert seen on every page
                371124: { lookUpMsg: { id: 371124 } }, // Sorry... The server has returned an unexpected result.
                371125: { lookUpMsg: { id: 371125 } }, // Please try again later....
                377624: { lookUpMsg: { id: 377624 } }, //'You have entered data on the page without saving. Do you want to continue without saving?'
                180040: { lookUpMsg: { id: 180040 } }, // Seeker
                100750: { lookUpMsg: { id: 100750 } }, // Employers
                100749: { lookUpMsg: { id: 100749 } }, // Login
                161568: { lookUpMsg: { id: 161568 } }, // Military.com
                120175: { lookUpMsg: { id: 104616 } }, // of
                320405: { lookUpMsg: { id: 320405 } }, // Sign In
                361964: { lookUpMsg: { id: 361964 } }, // Toggle search
                103555: { lookUpMsg: { id: 103555 } }, // CREATE AN ACCOUNT
                364563: { lookUpMsg: { id: 364563 } }, // Request Access
                205119: { lookUpMsg: { id: 205119 } }, // Forgot Password?
                204843: { lookUpMsg: { id: 204843 } }, // Create an account
                157552: { lookUpMsg: { id: 157552 } }, // You've entered invalid email and/or password information. Please try again.
                373636: { lookUpMsg: { id: 373636 } }, // Your account has been disabled.
                361352: { lookUpMsg: { id: 361352 } }, // select language
                369991: { lookUpMsg: { id: 369991 } }, // Find a job
                347078: { lookUpMsg: { id: 347078 } }, // Keywords
                352181: { lookUpMsg: { id: 352181 } }, // Refresh
                352182: { lookUpMsg: { id: 352182 } }, // We haven't detected any activity recently.  To avoid an automatic log out, refresh your session.
                361253: { lookUpMsg: { id: 361253 } }, // Time remaining
                352183: { lookUpMsg: { id: 352183 } }, // Refresh
                353122: { lookUpMsg: { id: 353122 } }, // Logged out
                353120: { lookUpMsg: { id: 353120 } }, // You were logged out for inactivity. Please log back in.
                353121: { lookUpMsg: { id: 353121 } }, // Log in
                302216: { lookUpMsg: { id: 302216 } }, // Accessibility
                185459: { lookUpMsg: { id: 185459 } }, // Profile
                376301: { lookUpMsg: { id: 376301 } }, // My calendar
                313500: { lookUpMsg: { id: 313500 } }, // Edit profile
                165227: { lookUpMsg: { id: 165227 } }, // Logout
                //TODO = move below to its meta section
                //document upload
                365792: { lookUpMsg: { id: 365792 } }, // Add file to list:
                181227: { lookUpMsg: { id: 181227 } }, // Browse
                319437: { lookUpMsg: { id: 319437 } }, // Google Drive
                320202: { lookUpMsg: { id: 320202 } }, // Dropbox
                365793: { lookUpMsg: { id: 365793 } }, // --- or Drag and Drop Files Here ---
                555: { lookUpMsg: { id: 555 } }, // required
                370222: { lookUpMsg: { id: 370222 } }, //Search jobs
                // 404 error page Messages
                371126: { lookUpMsg: { id: 371126 } }, // Error - All or part of the services layer is down.
                371128: { lookUpMsg: { id: 371128 } }, // Sorry... The server has returned an unexpected result.
                371129: { lookUpMsg: { id: 371129 } }, // Please try again later....
                194808: { lookUpMsg: { id: 194808 } }, //Channelized site name
                //urls
                377586: { lookUpMsg: { id: 377586 } }, //   /home#/
                //menu
                377811: { lookUpMsg: { id: 377811 } },
                377812: { lookUpMsg: { id: 377812 } },
                377813: { lookUpMsg: { id: 377813 } },

                //header msg
                379752: { lookUpMsg: { id: 379752 } },

                //footer
                253446: { lookUpMsg: { id: 253446 } },

                //new msg id footer
                //379701: { lookUpMsg: { id: 379701 } },


                378970: { lookUpMsg: { id: 378970 } },
                378971: { lookUpMsg: { id: 378971 } }
            }
        });

        angular.extend($rootScope.meta, {
            tracking: {
                events: {
                    agentCreated: {
                        adobe: {
                            events: "event5",
                            eVar25: function (event) { return "JT:_K:" + event.keywords + "_Loc:" + event.location; }
                        }
                    },
                    resumeFinished: {
                        adobe: {
                            events: "event4",
                            prop6: function (event) { return event.resumeStatus; }
                        }
                    },
                    resumeCreated: {
                        adobe: {
                            events: "event15"
                        }
                    },
                    resumeStatusChange: {
                        adobe: {
                            prop6: function (event) { return event.resumeStatus; }
                        }
                    },
                    resumeSend: {
                        adobe: {
                            prop6: "Send"
                        }
                    },
                    jobView: {
                        adobe: {
                            events: "event3",
                            eVar24: function (event) { return event.pageIndex; }
                        }
                    },
                    jobSearch: {
                        adobe: {
                            events: function (event) { return event.tag; },
                            eVar18: function (event) { return event.location; },
                            eVar21: function (event) { return event.keywords; },
                            eVar24: function (event) { return event.pageIndex; },
                            eVar26: function (event) { return event.jobCount; }
                        }
                    },
                    jobTitleSearched: {
                        adobe: {
                            eVar19: function (event) { return event.title; }
                        }
                    },
                    noJobsFound: {
                        adobe: {
                            events: "event14",
                            eVar18: function (event) { return event.location; },
                            eVar21: function (event) { return event.keywords; }
                        }
                    },
                    applyStart: {
                        adobe: {
                            events: "event6"
                        }
                    },
                    applyFinished: {
                        adobe: {
                            events: "event7"
                        }
                    },
                    applyJobviaSavedJobs: {
                        adobe: {
                            events: "event16"
                        }
                    },
                    accountCreated: {
                        adobe: {
                            events: "event20"
                        }
                    },
                    budgetCalculator: {
                        adobe: {
                            events: function (event) { return event.tag; },
                            eVar19: function (event) { return event.salary; }
                        }
                    },
                    occupationSearch: {
                        adobe: {
                            events: function (event) { return event.tag; },
                            eVar16: function (event) { return event.industry; },
                            eVar17: function (event) { return event.keyword; }
                        }
                    },
                    careerPersonality: {
                        adobe: {
                            events: function (event) { return event.tag; }
                        }
                    }
                }
            },
            calendar: {
                today: { lookUpMsg: { id: 375978 } }, // Today
                pdf: { lookUpMsg: { id: 375979 } }, // Export to PDF
                save: { lookUpMsg: { id: 272 } }, //Save
                cancel: { lookUpMsg: { id: 275 } }, // Cancel
                destroy: { lookUpMsg: { id: 85 } }, // Delete
                deleteWindowTitle: { lookUpMsg: { id: 375983 } }, // Delete appointment
                ariaSlotLabel: { lookUpMsg: { id: 0, text: 'Selected from {0:t} to {1:t}' } },
                ariaEventLabel: { lookUpMsg: { id: 0, text: '{0} on {1:D} at {2:t}' } },
                views: {
                    day: { lookUpMsg: { id: 458 } }, // Day
                    week: { lookUpMsg: { id: 175827 } }, // Week
                    workWeek: { lookUpMsg: { id: 363468 } }, // Work Week
                    agenda: { lookUpMsg: { id: 363471 } }, // Agenda
                    month: { lookUpMsg: { id: 457 } }, // Month
                    timeline: { lookUpMsg: { id: 363472 } }, // Timeline
                    timelineWeek: { lookUpMsg: { id: 375984 } }, // Timeline Week
                    timelineWorkWeek: { lookUpMsg: { id: 375985 } }, // Timeline Work Week
                    timelineMonth: { lookUpMsg: { id: 375986 } } // Timeline Month
                },
                recurrenceMessages: {
                    deleteWindowTitle: { lookUpMsg: { id: 375987 } }, // Delete Recurring Item
                    deleteWindowOccurrence: { lookUpMsg: { id: 375988 } }, // Delete current occurrence
                    deleteWindowSeries: { lookUpMsg: { id: 375989 } }, // Delete the series
                    editWindowTitle: { lookUpMsg: { id: 375990 } }, // Edit Recurring Item
                    editWindowOccurrence: { lookUpMsg: { id: 375991 } }, // Edit current occurrence
                    editWindowSeries: { lookUpMsg: { id: 375992 } } // Edit the series
                },
                editable: { confirmation: { lookUpMsg: { id: 375993 } } }, // Are you sure you want to delete this record?
                editor: {
                    title: { lookUpMsg: { id: 45 } }, // Title
                    start: { lookUpMsg: { id: 182522 } }, // Start
                    end: { lookUpMsg: { id: 375994 } }, // End
                    allDayEvent: { lookUpMsg: { id: 375995 } }, // All day appointment
                    description: { lookUpMsg: { id: 70127 } }, // Description
                    repeat: { lookUpMsg: { id: 375996 } }, // Repeat
                    timezone: { lookUpMsg: { id: 0, text: ' ' } },
                    startTimezone: { lookUpMsg: { id: 375997 } }, // Start timezone
                    endTimezone: { lookUpMsg: { id: 375998 } }, // End timezone
                    separateTimezones: { lookUpMsg: { id: 375999 } }, // Use separate start and end time zones
                    timezoneEditorTitle: { lookUpMsg: { id: 376000 } }, // Timezones
                    timezoneEditorButton: { lookUpMsg: { id: 376001 } }, // Time zone
                    timezoneTitle: { lookUpMsg: { id: 376002 } }, // Time zones
                    noTimezone: { lookUpMsg: { id: 376003 } }, // No timezone
                    editorTitle: { lookUpMsg: { id: 99135 } } // Appointment
                },
                monster: {
                    edit: { lookUpMsg: { id: 360415, text: 'Edit' } },
                    careerPlanActivity: {
                        confirmDeleteTitle: { lookUpMsg: { id: 246651 } }, // Confirm delete
                        confirmDeleteBody: { lookUpMsg: { id: 375982 } } // Do you want to delete this activity for your career plan goal ?
                    },
                    careerPlanGoal: {
                        confirmDeleteTitle: { lookUpMsg: { id: 246651 } }, // Confirm delete
                        confirmDeleteBody: { lookUpMsg: { id: 376004 } } // Do you want to delete this career plan goal ?
                    },
                    careerPlanGoalWithActivities: {
                        confirmDeleteTitle: { lookUpMsg: { id: 376005 } }, // Delete goal and all activities
                        confirmDeleteBody: { lookUpMsg: { id: 376006 } } // This action will delete this goal and the following activities:
                    },
                    monsterDbAppointment: {
                        confirmDeleteTitle: { lookUpMsg: { id: 246651 } }, // Confirm delete
                        confirmDeleteBody: { lookUpMsg: { id: 376007 } } // Do you want to delete this appointment ?
                    }
                }
            },
            logo: {
                src: 'https://securemedia.newjobs.com/id/mgs/' + $rootScope.registry.localStore.global.context.ChannelID + '/logo-mgs-dt.png',
                alt: { lookUpMsg: { id: 361668 } } // Logo
            },
            logoMobile: {
                src: 'https://securemedia.newjobs.com/id/mgs/' + $rootScope.registry.localStore.global.context.ChannelID + '/logo-mgs-mob.png',
            },
            keywordsMeta: {
                placeholder: { lookUpMsg: { id: 370224, text: "" } }, // Title, keyword
                titlefield: 'text',
                minlength: 2,
                remoteItemsWrapper: 'items'
            },
            locationMeta: {
                placeholder: { lookUpMsg: { id: 370223 } }, // Location
                titlefield: 'text',
                minlength: 2,
                remoteItemsWrapper: 'items'
            },
            recommendedJobs: {
                title: { lookUpMsg: { id: 204442 } } // Recommended Jobs
            },
            alerts: {
                impersonation: { lookUpMsg: { id: 364315 } } // Currently using the following account: <strong>{0}</strong>
            },
            locale: {
                jobPostingDateFormat: 'MM/DD/YYYY'
            },
            //Login Parts
            loginEmail: {
                label: { lookUpMsg: { id: 154159 } }, // Email
                placeholder: { lookUpMsg: { id: 154159 } }, // Email
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // Required
                },
                type: 'text'
            },
            loginPassword: {
                label: { lookUpMsg: { id: 426 } }, // Password
                placeholder: { lookUpMsg: { id: 426 } }, // Password
                required: true,
                max: '255',
                error: {
                    required: { lookUpMsg: { id: 555 } } // Required
                },
                type: 'password'
            },
            signInButton: {
                label: { lookUpMsg: { id: 129835 } }, // Sign In
                validation: 'login.$invalid',
                isBusy: false
            },
            // ERRORS
            errors: {
                404: { lookUpMsg: { id: 365216 } } // Requested URL does not exist
            },
            // Job Apply check
            jobApply: {
                part1: { lookUpMsg: { id: 370975 } }, // You had started applying to
                part2: { lookUpMsg: { id: 370976 } }, // in
                part3: { lookUpMsg: { id: 370977 } }, // but your application is not complete.
                part4: { lookUpMsg: { id: 370979 } }, // to complete the application now.
                part5: { lookUpMsg: { id: 370980 } }, // if you do not want to apply for this job.
                click: { lookUpMsg: { id: 370978 } } // Click here
            },
            // this is the menu config that will come from a messageId
            menuConfig: { lookUpMsg: { id: 377812 } },

            // this is the Master list of all MiniSpa's (used for both select list and lookup table)
            navMasterItems: { lookUpMsg: { id: 377811 } }
        });
    }
})(angular);


