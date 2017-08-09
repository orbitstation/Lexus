(function (angular) {
    "use strict";
    angular.module("globalApp").service('templateUrlService', ['$rootScope', function ($rootScope) {
        var _overrides = [];

        return {
            addOverride: function (alias, overrideUrl) {
                if (typeof alias !== "string") {
                    throw new Error("alias is not a string");
                }
                if (typeof overrideUrl !== "string") {
                    throw new Error("overrideUrl is not a string");
                }
                alias = alias.toLowerCase();
                _overrides[alias] = overrideUrl;
            },
            get: function (alias) {
                if (typeof alias !== "string") {
                    throw new Error("alias is not a string");
                }
                alias = alias.toLowerCase();
                var result = _overrides[alias];
                if (typeof result === "undefined")
                {
                    return $rootScope.registry.localStore.global.context.templateUrl + alias;
                }
                return result;
            }
        };
    }]);
})(angular);