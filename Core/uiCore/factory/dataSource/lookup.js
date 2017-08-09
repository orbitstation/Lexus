
(function () {
    'use strict';
    angular.module('globalApp').factory("getLookupCareerPlanByName", ['$resource', '$rootScope', factoryFunction]);
    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/lookups/career-plan/:name';
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: true, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false
            }
        });
    };
})();

(function () {
    'use strict';
    angular.module('globalApp').factory("getLookupByName", ['$resource', '$rootScope', 'cacheService', factoryFunction]);
    function factoryFunction($resource, $rootScope, cacheService) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/lookups/:name';
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false
            }
        });
    }

})();

(function () {
    'use strict';
    angular.module('globalApp').factory("getLookup", ['$resource', '$rootScope', 'cacheService', 'errorDispatch', factoryFunction])

    function factoryFunction($resource, $rootScope, cacheService, errorDispatch) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/lookups/by-name/:name';
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: false, requestType: 'json', interceptor: { responseError: errorDispatch.alertError }, responseType: 'json', contentType: "json/application", cache: false
            }
        });
    }
})();

(function () {
    'use strict';

    angular.module('globalApp').factory("getLanguages", ['$resource', '$rootScope', 'cacheService', factoryFunction]);

    function factoryFunction($resource, $rootScope, cacheService) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/lookups/languages';
        //var cache = cacheService.provider($rootScope.productVariables.caching.cacheTypesEnum.httpSharedCache).cache;
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false
            }
        });
    };

})();

(function () {
    'use strict';

    angular.module('globalApp').factory("getLanguageProficiencies", ['$resource', '$rootScope', 'cacheService', factoryFunction]);

    function factoryFunction($resource, $rootScope, cacheService) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/lookups/language-proficiencies';
        //var cache = cacheService.provider($rootScope.productVariables.caching.cacheTypesEnum.httpSharedCache).cache;
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false
            }
        });
    };

})();

(function () {
    'use strict';

    angular.module('globalApp').factory("getStates", ['$resource', '$rootScope', 'cacheService', factoryFunction]);
    
    function factoryFunction($resource, $rootScope, cacheService) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/lookups/countries/:countryId/states';
        //var cache = cacheService.provider($rootScope.productVariables.caching.cacheTypesEnum.httpSharedCache).cache;
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }
        });
    };

})();

(function () {
    'use strict';

    angular.module('globalApp').factory("getStatesText", ['$resource', '$rootScope', 'cacheService', factoryFunction]);

    function factoryFunction($resource, $rootScope, cacheService) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/lookups/countries/:countryId/statestext';
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false
            }
        });
    };

})();

(function () {
    'use strict';

    angular.module('globalApp').factory("getStatesAbbr", ['$resource', '$rootScope', 'cacheService', factoryFunction]);
    
    function factoryFunction($resource, $rootScope, cacheService) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/lookups/countries/:countryId/states_abbr';
        //var cache = cacheService.provider($rootScope.productVariables.caching.cacheTypesEnum.httpSharedCache).cache;
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }
        });
    };

})();

(function () {
    'use strict';

    angular.module('globalApp').factory("geoLocation", ['$resource', '$rootScope', factoryFunction]);
    
    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/lookups/geolocations/:zipCode';
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }
        });
    };

})();

(function () {
    'use strict';

    angular.module('globalApp').factory("getOccupationIndustries", ['$resource', '$rootScope', 'cacheService', factoryFunction]);
    
    function factoryFunction($resource, $rootScope, cacheService) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/lookups/occupations/industries';
        //var cache = cacheService.provider($rootScope.productVariables.caching.cacheTypesEnum.httpSharedCache).cache;
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: true, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }
        });
    };
})();

    'use strict';

    angular.module('globalApp').factory("getOccupationMilitaryBranches", ['$resource', '$rootScope', 'cacheService', factoryFunction]);
    
    function factoryFunction($resource, $rootScope, cacheService) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/lookups/custom-lookups/52221';
        //var cache = cacheService.provider($rootScope.productVariables.caching.cacheTypesEnum.httpSharedCache).cache;
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: true, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }
        });
    };


(function () {
    'use strict';

    angular.module('globalApp').factory("getCustomLookupOnId", ['$resource', '$rootScope', 'cacheService', factoryFunction]);

    function factoryFunction($resource, $rootScope, cacheService) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/lookups/custom-lookups/:id';
        //var cache = cacheService.provider($rootScope.productVariables.caching.cacheTypesEnum.httpSharedCache).cache;
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: true, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false
            }
        });
    };
})();

(function () {
    'use strict';

    angular.module('globalApp').factory("getCustomLookupOnIdParentId", ['$resource', '$rootScope', 'cacheService', factoryFunction]);

    function factoryFunction($resource, $rootScope, cacheService) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/core/api/lookups/custom-lookups/:id/:parentId';
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: true, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false
            }
        });
    };
})();

(function () {
    'use strict';
    angular.module('globalApp').factory("compareOccupations", ['$resource', '$rootScope', factoryFunction]);
    
    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/lookups/occupations/compare/:code1/:code2';
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: false
            }
        });
    };
})();

(function () {
    'use strict';

    angular.module('globalApp').factory("getOccupationDetails", ['$resource', '$rootScope', factoryFunction]);
    
    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/lookups/occupations/:code';
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: false
            }
        });
    };
})();

(function () {
    'use strict';
    angular.module('globalApp').factory("getOccupationByIndustryCode", ['$resource', '$rootScope', 'cacheService', factoryFunction]);
    
    function factoryFunction($resource, $rootScope, cacheService) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/lookups/occupations/industries/:industryCode/occupations?sortOrder=:sortOrder';
        //var cache = cacheService.provider($rootScope.productVariables.caching.cacheTypesEnum.httpSharedCache).cache;
        return $resource(resourceUrl, {}, {
            get: {
                method: 'GET', isArray: true, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }
        });
    };
})();


