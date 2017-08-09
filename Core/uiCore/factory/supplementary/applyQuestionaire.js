(function () {
    'use strict';

    angular.module('globalApp').factory('applyQuestionaire', ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/me/applications/screening-questionaire';
        var factory = $resource(resourceUrl, {}, {
            getQuestions: {
                url: resourceUrl + '/:jobId',
                params: { jobId: '@jobId'},
                method: 'GET',
                isArray: false
            },
            postQuestionResults:{
                url: resourceUrl + '/:jobId/:resumeValue',
                params: { jobId: '@jobId', resumeValue: '@resumeValue' },
                method: 'POST',
                isArray: false
            }
        });
        return factory;
    };

})();

