(function(angular) {
    angular.module("globalApp").service("contextService", ["registry", function(registry) {
        return {
            init: function () {
                registry.set("global", "context", {
                    "ChannelID": 10338,
                    "CountryID": 164,
                    "ApplicationID": "Lexus",
                    "ChannelAlias": "LEXUSDEMO",
                    "ChannelAliases": ["CORE", "CORE-EN", "US-EN", "CS-USEN", "LEXUSCORE", "LEXUSDEMO"],
                    "EnvironmentType": "Development",
                    "Version": "1.0.0.0",
                    "UIConfiguration": "Debug",
                    "cdnUrl": "https://core.ui.lexus.monster.com/cdn-release/unstable",
                    "templateUrl": "https://core.ui.lexus.monster.com/uiCore/templates/"
                }, "localStorage");
            }
        };
    }]);
})(angular);
