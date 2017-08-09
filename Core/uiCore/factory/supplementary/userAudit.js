(function () {
    'use strict';

    angular.module('globalApp').factory('UserAudit', ['$resource', '$rootScope', '$q', factory]);

    function factory($resource, $rootScope, $q) {
        var resourceUrl = $rootScope.productVariables.rootUrl + "/seeker/api/me/";
        return $resource(resourceUrl, null,
             {
                 getHistory: {
                     url: resourceUrl + 'checklists',
                     method: 'POST',
                     isArray: true
                 },
                 getUserByEmail: {
                     url: resourceUrl + 'getbyemail?emailAddress=:emailAddress',
                     method: 'GET',
                     params: {
                         emailAddress: '@emailAddress'
                     }
                 }
             });
    };

})();

