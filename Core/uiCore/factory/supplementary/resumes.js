(function () {
    'use strict';

    angular.module('globalApp').factory('resumesFactory', ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/me/resumes';
        var factory = $resource(resourceUrl, null,
            {
                'getResumes': { method: 'GET' },
                'getResumesForApplication': {
                    url: resourceUrl + '?forApplicationOnPositionAdID=:positionAdID',
                    params: { positionAdID: '@positionAdID' },
                    method: 'GET'
                },
                'delete': {
                    url: resourceUrl + '/:resumeValue/delete',
                    params: { resumeValue: '@resumeValue' },
                    method: 'POST',
                    isArray: true
                },
                'createResume': {
                    url: resourceUrl,
                    method: 'POST'
                },
                'copy': {
                    url: resourceUrl + '/:resumeValue/copy',
                    params: { resumeValue: '@resumeValue' },
                    method: 'POST'
                },
                'statusChange': {
                    url: resourceUrl + '/:resumeValue/status/:status',
                    params: { resumeValue: '@resumeValue', status: '@status' },
                    method: 'POST'
                },
                'send': {
                    url: resourceUrl + '/send',
                    method: 'PUT',
                    isArray: false,
                    requestType: 'json',
                    responseType: 'json',
                    contentType: "json/application"
                },
                'getResumeRating': {
                    url: resourceUrl + '/:resumeValue/getRating',
                    params: { resumeValue: '@resumeValue' },
                    method: 'GET'
                },
                'getResumePdfNumOfPages': {
                    url: resourceUrl + '/:resumeValue/pdf-resume-pageNo',
                    params: { resumeValue: '@resumeValue' },
                    method: 'GET'
                },
                'getResumePdfPageAsImage': {
                    url: resourceUrl + '/:resumeValue/pdfresume/:pageNo',
                    params: { resumeValue: '@resumeValue', pageNo: '@pageNo' },
                    method: 'GET',
                    responseType: 'arraybuffer',
                    isArray: false
                },
                'getResume': {
                    url: resourceUrl + '/:resumeValue?levelOfDetail=:levelOfDetail',
                    params: { resumeValue: '@resumeValue', levelOfDetail: '@levelOfDetail' },
                    method: 'GET'
                },
                //NOTE: to update smaller sections ex. user: {}, the object must also contain a sibling basic info object
                'updateResume': {
                    url: resourceUrl + '/:resumeValue',
                    params: { resumeValue: '@resumeValue' },
                    method: 'PUT'
                },
                'validateCompletness': {
                    url: $rootScope.productVariables.rootUrl + '/seeker/api/me/validate-completness-for-create-resume',
                    method: 'POST',
                    isArray: true
                },
                'save': {
                    url: resourceUrl + '/:resumeValue/generateworddoc',
                    params: { resumeValue: '@resumeValue' },
                    method: 'GET',
                    responseType: 'arraybuffer',
                    cache: false,
                    transformResponse: function (data, headers) {
                        var blob = null;
                        if (data) {
                            blob = new Blob([data], {
                                type: headers('content-type') || 'application/msword; charset=utf-8'
                            });
                        }
                        var fileName = getFileNameFromHeader(headers('content-disposition'));
                        var result = {
                            blob: blob,
                            fileName: fileName
                        };

                        return {
                            response: result
                        };
                    }
                },
                referencesInfo: {
                    url: resourceUrl + '/:resumeValue/reference-section',
                    params: '@resumeValue',
                    method: 'POST'
                },
                updateEducationInfo: {
                    url: resourceUrl + '/:resumeValue/education-section',
                    params: '@resumeValue',
                    method: 'POST'
                },
                updateCertificationInfo: {
                    url: resourceUrl + '/:resumeValue/certification-section',
                    params: '@resumeValue',
                    method: 'POST'
                },
                updateCareerInfo: {
                    url: resourceUrl + '/:resumeValue/career-info',
                    params: { resumeValue: '@resumeValue', resumeDetail: '@resumeDetail' },
                    method: 'PUT'
                },
                updateTargetEmployer: {
                    url: resourceUrl + '/:resumeValue/target-employer',
                    params: '@resumeValue',
                    method: 'PUT'
                },
                updateResumeTitle: {
                    url: resourceUrl + '/:resumeValue/resumetitle',
                    params: { resumeValue: '@resumeValue', resumeTitle: '@resumeTitle' },
                    method: 'POST'
                },
                updateResumeSummary: {
                    url: resourceUrl + '/:resumeValue/summary',
                    params: { resumeValue: '@resumeValue' },
                    method: 'PUT'
                },
                updateAwardsInfo: {
                    url: resourceUrl + '/:resumeValue/award-section',
                    params: { resumeValue: '@resumeValue'},
                    method: 'POST'
                },
                getResumeSkills: {
                    url: resourceUrl + '/:resumeValue/skills',
                    params: { resumeValue: '@resumeValue' },
                    method: 'GET'
                },
                updateResumeSkills: {
                    url: resourceUrl + '/:resumeValue/skill-section',
                    params: { resumeValue: '@resumeValue' },
                    method: 'POST'
                },
                updateExperience: {
                    url: resourceUrl + '/:resumeValue/experience',
                    params: { resumeValue: '@resumeValue' },
                    method: 'POST'
                },
                updateMilitaryExperience: {
                    url: resourceUrl + '/:resumeValue/military-experiences',
                    params: { resumeValue: '@resumeValue' },
                    method: 'POST'
                },
                updateExperienceSection: {
                    url: resourceUrl + '/:resumeValue/experience-section',
                    params: { resumeValue: '@resumeValue' },
                    method: 'POST'
                },
                updateLanguageSection: {
                    url: $rootScope.productVariables.rootUrl + '/seeker/api/me/language-section',
                    method: 'POST'
                }

            }
        );
        return factory;
    };

    function getFileNameFromHeader(header) {
        if (!header) return null;
        var result = header.split(";")[1].trim().split("=")[1];
        return result.replace(/"/g, '');
    }

})();