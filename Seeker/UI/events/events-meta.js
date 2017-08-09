(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            344824:{lookUpMsg:{id:344824}}, // Events
            354693:{lookUpMsg:{id:354693}}, // Upcoming Job Fairs and Workshops
            367324:{lookUpMsg:{id:367324}}, // Register
            367325:{lookUpMsg:{id:367325}}, // Unregister
            344838:{lookUpMsg:{id:344838}}, // Workshop
            359704:{lookUpMsg:{id:359704}}, // Job Fairs
            367332:{lookUpMsg:{id:367332}}, // seats left
            367333:{lookUpMsg:{id:367333}}, // out of
            367334:{lookUpMsg:{id:367334}}, // seats
            367335:{lookUpMsg:{id:367335}}, // Expand
            367336:{lookUpMsg:{id:367336}}, // Collapse
            367339:{lookUpMsg:{id:367339}}, // Phone: 
            372354:{lookUpMsg:{id:372354}}, // Event details
            360156:{lookUpMsg:{id:360156}}, // Cancel
            372517:{lookUpMsg:{id:372517}}, // Register now
            372519:{lookUpMsg:{id:372519}}, // Dates
            372520:{lookUpMsg:{id:372520}}, // Register for this workshop
            372521:{lookUpMsg:{id:372521}}, // Cancel from calendar
            372522:{lookUpMsg:{id:372522}}, // Back to Events List
            372524:{lookUpMsg:{id:372524}}, // Location
            338884:{lookUpMsg:{id:338884}}, // County
            347221:{lookUpMsg:{id:347221}}, // Website
            372525:{lookUpMsg:{id:372525}}, // Seats available
            155831:{lookUpMsg:{id:155831}}, // Start Date:
            98373: {lookUpMsg:{id: 98373}}, // End Date:
            372546:{lookUpMsg:{id:372546}}, // Save to Calendar
            372547:{lookUpMsg:{id:372547}}, // Registed for this workshop
            372548:{lookUpMsg:{id:372548}}, // Saved to calendar
            372643:{lookUpMsg:{id:372643}}, // Title
            372644:{lookUpMsg:{id:372644}}, // Region
            372646:{lookUpMsg:{id:372646}}, // Open
            372647:{lookUpMsg:{id:372647}}, // Search
            372648:{lookUpMsg:{id:372648}}, // Advanced filter
            372641:{lookUpMsg:{id:372641}}, // Clear all filters
            372889:{lookUpMsg:{id:372889}}, // You have saved this event
            372640: { lookUpMsg: { id: 372640 } },  // You are registered for this event
            378626: { lookUpMsg: { id: 378626 } },  // Registration actions
            367331: { lookUpMsg: { id: 367331 } }, // Within the next 7 days
            367330: { lookUpMsg: { id: 367330 } }, // Within the next 30 days
            367329: { lookUpMsg: { id: 367329 } } // Within the next 45 days 
        });

        //Events list
        angular.extend($rootScope.meta, {
            pageHeaderEvents: {
                title:{lookUpMsg:{id:344824}},       // Events
                introBody:{lookUpMsg:{id:354693}}   // Upcoming Job Fairs and Workshops in Washington
            },
            eventSortOrder: {
                label: { lookUpMsg: {id: 366979, text: "Sort By "} },
                required: false,
                max: "255",
                error: {
                    required:{lookUpMsg:{id:555}} // required
                },
                small: true,
                type: "text",
                defaultSelected: 'EventName',
                items: [
                  { text:{lookUpMsg:{id:367325}}, value: 'EventName:true' }, // Name A-Z
                  { text:{lookUpMsg:{id:367328}}, value: 'EventName:false' }, // Name Z-A
                  { text:{lookUpMsg:{id:367326}}, value: 'SeatsLeft:true' }, // Seats left
                  { text:{lookUpMsg:{id:367327}}, value: 'StartDate:false' } // Date
                ]
            },
            eventDateFilter: {
                label:{lookUpMsg:{id:344828, text: "Filter by Date"}},
                required: false,
                max: "255",
                error: {
                    required:{lookUpMsg:{id:555}} // required
                },
                small: true,
                type: "radio",
                defaultSelected: 30,
                items: [
                  { text:{lookUpMsg:{id:367331}}, value: 7 }, // Within the next 7 days
                  { text:{lookUpMsg:{id:367330}}, value: 30 }, // Within the next 30 days
                  { text:{lookUpMsg:{id:367329}}, value: 45 } // Within the next 45 days
                ]
            },
            eventTypeFilter: {
                label:{lookUpMsg:{id:739}}, // Search
                required: false,
                max: '255',
                isInline: true,
                isLegendInline: true,
                error: {
                    required:{lookUpMsg:{id:555}}, // required
                },
                type: 'radio',
                defaultSelected: '1',
                items: [
                    { text: { lookUpMsg: { id: 524, text: 'All' } }, value: '1' },
                    { text: { lookUpMsg: { id: 208949, text: 'Workshop' } }, value: '2' },
                    { text:{lookUpMsg:{id:182468, text: 'Events'}}, value: '3' }
                ]
            },
            eventTextFilter: {
                placeholder: {
                    lookUpMsg: { id: 376099, text: '' } // Enter name and select search filter to refine search results
                },
                type: 'text',
                required: false,
                hideErrorHolder: true,
                hideLabel: true
            },
            regionsFilter: {
                label: {
                    lookUpMsg: { id: 376100, text: '' } // Regions:
                },
                required: false,
                max: "255",
                error: {
                    required:{lookUpMsg:{id:555}} // required
                },
                small: true,
                type: "checkbox",
                defaultSelected: 1,
                items: [
                  { text:{lookUpMsg:{id:376101}}, value: 1 }, // Region 1
                  { text:{lookUpMsg:{id:376102}}, value: 2 }, // Region 2
                  { text:{lookUpMsg:{id:376103}}, value: 3 }, // Region 3
                  { text:{lookUpMsg:{id:376104}}, value: 4 }, // Region 4
                  { text:{lookUpMsg:{id:376105}}, value: 5 }, // Region 5
                  { text:{lookUpMsg:{id:376106}}, value: 6 }, // Region 6
                  { text:{lookUpMsg:{id:376107}}, value: 7 }, // Region 7
                  { text:{lookUpMsg:{id:376108}}, value: 8 }, // Region 8
                  { text:{lookUpMsg:{id:376109}}, value: 9 }, // Region 9
                  { text:{lookUpMsg:{id:376110}}, value: 10 } // Region 10
                ]
            }
        });
        //Event Detail
        angular.extend($rootScope.meta, {
            firstName: {
                label:{lookUpMsg:{id:154148}},
                disabled: true,
                hideErrorHolder: true
            },
            lastName: {
                label:{lookUpMsg:{id:154150}},
                disabled: true,
                hideErrorHolder: true
            },
            email: {
                label:{lookUpMsg:{id:154159}},
                disabled: true,
                hideErrorHolder: true
            },
            phone: {
                label:{lookUpMsg:{id:133902}},
                disabled: true,
                hideErrorHolder: true,
                mask: {
                    face: '(999) 999-9999'
                }
            }
        });
    }
})();