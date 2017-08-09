(function () {
    'use strict';

    angular.module('globalApp').factory('careerPersonalityFactory', ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {

        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/queries/career-personality-survey';
        var factory = $resource(resourceUrl, null, {
            getQuestions: {
                url: resourceUrl + '/questions',
                method: 'GET',
                isArray: true
            },
            getAnswerTypes: {
                url: resourceUrl + '/answers',
                method: 'GET',
                isArray: true
            },
            scoreAnswers: {
                url: resourceUrl,
                method: 'POST',
                isArray: true
            },
            getAnswers: {
                url: $rootScope.productVariables.rootUrl + '/seeker/api/me/career-personality-survey',
                method: 'GET',
                isArray: true
            },
            saveAnswersAndScore: {
                url: $rootScope.productVariables.rootUrl + '/seeker/api/me/career-personality-survey',
                method: 'POST',
                isArray: true
            }
        });
        return factory;
    };

})();