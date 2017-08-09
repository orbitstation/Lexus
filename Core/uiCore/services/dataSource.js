(function (angular) {
    'use strict';
    // this runs based on the "dataSource" value in the meta table, it will get the values and overwrite the current entrys in the meta table
    angular.module('globalApp').service("dataSourceService", [function () {
        var providers = {};

        return {
            addProvider: function(type, fn) {
                if (typeof fn !== "function")
                {
                    throw new Error("fn should be function.");
                }
                providers[type] = fn;
            },
            dataSource: function (type, newValue, newValue2) {
                //console.log(type + ' ' + newValue + ' ' + newValue2);
                var provider = providers[type];
                if (typeof provider === "undefined")
                {
                    throw new Error("Unknown dataSource provider - " + type);
                }

                return provider(newValue, newValue2);
            }
        };
    }]);
})(angular);