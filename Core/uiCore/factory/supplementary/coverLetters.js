(function () {
    'use strict';

    angular.module('globalApp').factory('coverLetters', ['$resource', '$rootScope', coverLettersFactory]);

    function coverLettersFactory($resource, $rootScope) {

        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/me/coverletters';
        var factory = $resource(resourceUrl + '/:coverLetterId', { coverLetterId: '@coverLetterId' }, {
            create: {
                method: 'POST'
            },
            templates: {
                url: resourceUrl + '/templates',
                method: 'GET',
                isArray: true
            },
            deleteLetter: {
                url: resourceUrl + '/:coverLetterId/',
                params: { coverLetterId: '@coverLetterId' },
                method: 'DELETE'
            },
            update: {
                url: resourceUrl + '/:coverLetterId/',
                params: { coverLetterId: '@coverLetterId' },
                method: 'PUT'
            },
            clone: {
                url: resourceUrl + '/:coverLetterId/clone',
                params: {coverLetterId: '@coverLetterId'},
                method: 'POST'
            },
            sendLetter: {
                url: resourceUrl + '/:coverLetterId/sendemail',
                params: { coverLetterId: '@coverLetterId' },
                method: 'POST'
            }
        });
        return factory;
    };

})();