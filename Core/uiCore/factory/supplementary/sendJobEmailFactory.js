(function () {
    'use strict';

    globalApp.factory("sendJobEmailFactory", ['$resource', '$rootScope', factoryFunction]);
    
    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/me/send-job-to-friend';
        return $resource(resourceUrl, {}, {
            post: { method: 'POST', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }
        });
    };

})();
