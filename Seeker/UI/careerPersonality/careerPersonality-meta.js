(function () {
    "use strict";
    angular.module('globalApp').run(['$rootScope', run]);
    function run($rootScope) {
        angular.extend($rootScope.meta.messages, {
            367691:{lookUpMsg:{id:367691}},
            367522:{lookUpMsg:{id:367522}}, // Your career personality
            367523:{lookUpMsg:{id:367523}}, // Find a career you will love.
            367524:{lookUpMsg:{id:367524}}, // Answer 60 questions designed to find which careers suit your interests best. Remember, there are no wrong answers! Just be honest and think about what YOU really like to do.
            367525:{lookUpMsg:{id:367525}}, // Select your interests
            367526:{lookUpMsg:{id:367526}}, // Reset all
            367527:{lookUpMsg:{id:367527}}, // View my career personality results
            368239:{lookUpMsg:{id:368239}}, // Edit previous answers
            368240:{lookUpMsg:{id:368240}}, // Login or register to save
            368367:{lookUpMsg:{id:368367}}, // View
            368368:{lookUpMsg:{id:368368}}, // occupations
            367491:{lookUpMsg:{id:367491}} // Career Personality
        });

        angular.extend($rootScope.meta, {
            breaCrumbsResults: [{ "display":{lookUpMsg:{id:368248 } }, "url": '' }],  //Results
            pageHeaderResults: {
                title:{lookUpMsg:{id:368236}},       // Header Message
                introBody:{lookUpMsg:{id:368237}}   // Default Must Have Text...
            },
            pageHeader:{
                title:{lookUpMsg:{id:367522}},       // Your career personality
                introBody:{lookUpMsg:{id:367524}}   // Answer 60 questions designed...
            },
            answerType: {
                required: true,
                max: '255',
                isInline: true,
                error: {
                    required:{lookUpMsg:{id:555}} // required
                },
                type: 'text',
                dataSource: { name: "builderFieldId", value: "111" }
            }
        });
    }
})();