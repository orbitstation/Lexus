(function () {
    'use strict';

    angular.module('globalApp').factory('careerPlan', ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + "/seeker/api/me/career-plan/goals";

        var factory = $resource(resourceUrl, null,
            {
                getGoals: {
                    url: resourceUrl,
                    method: 'GET'
                },
                getGoal: {
                    url: resourceUrl + '/:goalId',
                    params: { goalId: '@goalId' },
                    method: 'GET'
                },
                createGoal: {
                    url: resourceUrl,
                    method: 'POST'
                },
                updateGoal: {
                    url: resourceUrl + '/:goalId',
                    method: 'PUT'
                },
                deleteGoal: {
                    url: resourceUrl + '/:goalId',
                    params: { goalId: '@goalId' },
                    method: 'DELETE'
                },
                createActivities: {
                    url: resourceUrl + '/:goalId/activities',
                    params: { goalId: '@goalId', allActivitiesIncluded: '@allActivitiesIncluded' },
                    method: 'POST'
                },
                updateActivities: {
                    url: resourceUrl + '/:goalId/activities/:activityId',
                    params: { goalId: '@goalId', activityId: '@activityId' },
                    method: 'PUT'
                },
                removeActivity: {
                    url: resourceUrl + '/:goalId/activities/:activityId',
                    params: { goalId: '@goalId' , activityId: '@activityId'},
                    method: 'DELETE'
                }
            });
        return factory;
    };
})();
