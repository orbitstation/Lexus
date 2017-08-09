(function () {
    "use strict";
    angular.module('miniSPA').controller('jobViewApplyCtrl',
        [
            '$scope',
            '$rootScope',
            '$location',
            '$window',
            'jobViewFactory',
            'resumesFactory',
            'coverLetters',
            'savedJobsFactory',
            'applicationHistory',
            'utilityService',
            'registry',
            '$q',
            'eeoAa',
            'EEOService',
            'applyQuestionaire',
            'documentUpload',
            'UserAccount',
            controller]);
    function controller(
        $scope,
        $rootScope,
        $location,
        $window,
        jobViewFactory,
        resumesFactory,
        coverLetters,
        savedJobsFactory,
        applicationHistory,
        utilityService,
        registry,
        $q,
        eeoAa,
        EEOService,
        applyQuestionaire,
        documentUpload,
        userAccount
        ) {

        $scope.model = {}; // this is the model
        $scope.jobSaved = false;
        $scope.pageLoaded = false;
        $scope.applySuccess = false;
        $scope.applyRedirect = false;
        $scope.applyContinueUrl = null;
        $scope.meta.templateHasLoaded = false;
        $scope.meta.resumesAreFull = false;
        $scope.moment = moment;
        $scope.meta.maxResumes = $rootScope.configMeta.maxResumes.lookUpConfig.value;
        $scope.meta.user;
        $scope.meta.firstName;
        $scope.meta.lastName;
        $scope.meta.showNamePanel = false;

        // for cover letter saving and sending
        $scope.meta.blankLetterSlots = 5;
        $scope.meta.itsANewCoverLetter = false;
        $scope.meta.itsanEditedCoverLetter = false;

        //Buttons that should not double click
        $scope.busyLinks = {
            saveJob: false,
            apply: false
        };

        $scope.jobPostingDateFormat = $rootScope.meta.locale.jobPostingDateFormat;
        $scope.serviceErrorList = [];

        var currentApplyState = 'currentApplyState';
        var registryNamespace = 'global';
        $scope.meta.currentCoverLetter = {};
        var tempEeoAaStatuses = {};

        $scope.resumeUrlId = 0;
        //    $scope.resumeUrlGuid = null;
        var regex = /id[-]core[-]([0-9]+)[/]apply(-by-email)?$/i;
        var match = regex.exec($location.path());
        if (match) {
            $scope.resumeUrlId = match[1];
            $scope.resumeUrlType = "core";
        }
        else {
            regex = /id[-]cloud[-]([0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12})[/]apply(-by-email)?$/i;
            match = regex.exec($location.path());
            if (match) {
                $scope.resumeUrlGuid = match[1];
                $scope.resumeUrlType = "cloud";
            }
        }

        //
        //                                                             _____________
        //____________________________________________________________/  page Init  \__________

        // page init if logged in
        $rootScope.logInWatcher(function () {
            return $q.all([
                getJobInfo(),
                getcoverLetterInfo(),
                $scope.meta.refreshResumeList(),
                getCoverLetterTemplates(),
                getEeoAAInfo(),
                getUserInfo()
            ]).then(function (results) {
                $scope.pageLoaded = true;
                $scope.meta.accordion.eeo.eeoAa = tempEeoAaStatuses;

                //console.log($scope.meta.accordion);
                if (registry.get(registryNamespace, currentApplyState, 'sessionStorage')) {

                    $scope.model = registry.get(registryNamespace, currentApplyState, 'sessionStorage');

                    // find if the selected coverLetter exists in the list.
                    var foundIt = false;
                    for (var x in $scope.meta.templates.items) {
                        if ($scope.model.letter && $scope.meta.templates.items[x].value == $scope.model.letter.id) {
                            foundIt = true;
                        }
                    }
                    if (foundIt == false) {
                        $scope.model.letter.id = 0;
                    }
                }

                if ($scope.meta.resume.items.length > 1) { $scope.meta.resumeSource = 'existing'; }
                else {
                    $scope.meta.resumeSource = 'upload';
                }
            });
        });

        //
        //                                                             _____________________________
        //____________________________________________________________/ Save current data for later \__________

        // Everytime the model has changed save into registry.
        $scope.$watch('model', function (n, o) {
            if (!angular.equals(n, o) && o !== undefined) {
                registry.set(registryNamespace, currentApplyState, $scope.model, 'sessionStorage');
            }
        }, true);

        //
        //                                                             ________________________
        //____________________________________________________________/ Save the job for later \__________

        $scope.saveJob = function () {
            savedJobsFactory.saveJob({ jobId: $scope.job.id, jobType: $scope.job.source }).$promise.then(function (response) {
                getJobInfo();
                $scope.jobIsSaved = true;
            },
            function (response) {
                $rootScope.topMasterErrors.push({ type: 'alert-danger', text: response.data.message });
            }).then(function () {
                $scope.busyLinks.saveJob = false;
            });
        };

        //
        //                                                             ___________________
        //____________________________________________________________/ Apply to the job  \_______________


        $scope.apply = function () {

            if ($scope.model.resume) {
                var type = (location.href.endsWith('email')) ? "Email" : "Online";
                if ($scope.job.awm) type = "ApplyWithMonster";

                var clId = ($scope.model.letter && $scope.model.letter.id > 2) ? $scope.model.letter.id : 0;
                var clTitle = '';
                var clBody = '';

                if ($scope.meta.templateHasLoaded) {
                    if (($scope.meta.itsANewCoverLetter) || ($scope.meta.itsanEditedCoverLetter)) {
                        clId = 0;
                        clTitle = $scope.model.letter.title;
                        clBody = $scope.model.letter.body;
                    } else {
                        clId = $scope.model.letter.id;
                        if (clId == 9999) { clId = 0 }; // this is for the blank coverletter, always save it as new
                    }
                }

                var payload = {
                    Type: type,
                    ResumeValue: $scope.model.resume,
                    CoverLetterID: clId,
                    CoverLetterTitle: clTitle,
                    CoverLetterBody: clBody,
                    GenderId: ($scope.model.eeo) ? $scope.model.eeo.genderId : undefined,
                    EthnicityId: ($scope.model.eeo) ? $scope.model.eeo.ethnicityId : undefined,
                    VeteranStatusID: ($scope.model.eeo) ? $scope.model.eeo.seteranStatusId : undefined,
                    DisibilityID: ($scope.model.eeo) ? $scope.model.eeo.disibilityId : undefined,
                    QuestionnaireID: ($scope.meta.questions && $scope.meta.questions.questionCollection) ? $scope.meta.questions.questionnaireId : 0,
                };

                if ($scope.job.source == "Cloud") {
                    //Hosted PPC
                    applicationHistory.saveCloudAWMApplication({ jobId: $scope.resumeUrlGuid }, payload).$promise.then(
                       function (applyResult) {

                           if ((applyResult.onContinueUrl) && (applyResult.onContinueUrl.length > 0)) {
                               //apply with monster
                               $rootScope.track({ name: 'applyRedirect' });
                               $scope.applyRedirect = true;
                               var queryParam = (applyResult.onContinueUrl.indexOf("?") > 0) ? "&requestUrl=" : "?requestUrl=";
                               $scope.applyContinueUrl = applyResult.onContinueUrl + queryParam + applyResult.requestUrl;
                           } else {
                               $rootScope.track({ name: 'applyFinished' });
                               $scope.applySuccess = true;
                               $scope.serviceErrorList = [];
                               getResumeInfo();
                           };
                           registry.remove(registryNamespace, 'currentApply', 'sessionStorage');
                           $scope.model.resume = undefined;
                       },
                       function (result) {
                           $scope.serviceErrorList.push({ text: 'there was an error in the apply process', value: result.items[x].resumeValue });
                       }
                   );
                }
                else {
                    applicationHistory.saveCoreApplication({ jobId: $scope.resumeUrlId }, payload).$promise.then(
                        function (applyResult) {
                            // this may need a promise if the redirect below stopes exicution on the page.
                            if ($scope.resumeUrlId > 0)   //duration job
                                if ($scope.meta.questions && $scope.meta.questions.questionCollection != null) {        // this posts the results of the questionaire
                                    $scope.meta.postQuestionResults($scope.resumeUrlId, $scope.model.resume, $scope.meta.questions);
                                }

                            if ((applyResult.onContinueUrl) && (applyResult.onContinueUrl.length > 0)) {
                                //apply with monster
                                $rootScope.track({ name: 'applyRedirect' });
                                $scope.applyRedirect = true;
                                var queryParam = (applyResult.onContinueUrl.indexOf("?") > 0) ? "&requestUrl=" : "?requestUrl=";
                                $scope.applyContinueUrl = applyResult.onContinueUrl + queryParam + applyResult.requestUrl;
                            } else {
                                $rootScope.track({ name: 'applyFinished' });
                                $scope.applySuccess = true;
                                $scope.serviceErrorList = [];
                                getResumeInfo();
                            };
                            registry.remove(registryNamespace, 'currentApply', 'sessionStorage');
                            $scope.model.resume = undefined;
                        },
                        function (result) {
                            $scope.serviceErrorList.push({ text: 'there was an error in the apply process', value: result.items[x].resumeValue });
                        }

                    );
                }

                //if the user data has been changed then update it
                if (($scope.meta.firstName != $scope.meta.user.firstName) ||
                    ($scope.meta.lastName != $scope.meta.user.lastName)) {
                    $scope.meta.user.firstName = $scope.meta.firstName;
                    $scope.meta.user.lastName = $scope.meta.lastName;
                    userAccount.put($scope.meta.user).$promise.then(
                        function (result) {
                        },
                        function (error) {
                        }
                    );
                }
            }
        }

        $scope.cancel = function () {
            // default to jobsearch
            var jsQuery = registry.get("Jobsearch", "query", "sessionStorage");
            var cancelUrl = (jsQuery && jsQuery.url && jsQuery.url.length > 0) ? jsQuery.url : "/JobSearch/jobs";
            // but try to return to jobview
            var jobViewUrl = registry.get('global', 'currentApply', 'sessionStorage').url;
            if (jobViewUrl) {
                cancelUrl = jobViewUrl.replace("/apply", "");
            }
            registry.remove(registryNamespace, 'currentApplyState', 'sessionStorage');
            registry.remove(registryNamespace, 'currentApply', 'sessionStorage');
            $window.location.href = cancelUrl;
        };

        $scope.redirectToCompleteApply = function () {
            $rootScope.track({ name: 'applyFinished' });
            $scope.applySuccess = true;
            $scope.applyRedirect = false;
            window.open($scope.applyContinueUrl, 'AwmClient', '');
        };

        $scope.returnToJobSearch = function ($event) {
            $event.preventDefault();
            var jsQuery = registry.get("Jobsearch", "query", "sessionStorage");
            var returnToJSUrl = (jsQuery && jsQuery.url && jsQuery.url.length > 0) ? jsQuery.url : "/JobSearch/jobs";
            $window.location.href = returnToJSUrl;
        }

        $scope.meta.loadTemplate = function (templateId) {
            $scope.meta.templateHasLoaded = true;

            for (var x in $scope.meta.templates.items) {
                if ($scope.meta.templates.items[x].value == templateId) {

                    $scope.model.letter.title = $scope.meta.templates.items[x].text;
                    $scope.model.letter.id = $scope.meta.templates.items[x].value;

                    if ($scope.model.letter.id < $rootScope.configMeta.maxCoverLetters.lookUpConfig.value) {
                        $scope.meta.itsANewCoverLetter = true;
                    }

                    // there is a template in memory
                    if ($scope.meta.templates.items[x].body) {
                        $scope.model.letter.body = $scope.meta.templates.items[x].body;
                    } else {
                        // if no template in memory then go get it
                        coverLetters.get({ coverLetterId: templateId }).$promise.then(function (result) {
                            $scope.model.letter.body = result.body;
                            $scope.meta.itsANewCoverLetter = false;
                            $scope.meta.itsanEditedCoverLetter = false;

                            $scope.meta.currentCoverLetter = {};
                            $scope.meta.currentCoverLetter.title = angular.copy($scope.model.letter.title);
                            $scope.meta.currentCoverLetter.body = angular.copy($scope.model.letter.body);
                        });
                    }
                }
            }
        }

        $scope.$watch('model.letter.title', function (newValue, oldValue) {
            if (oldValue && $scope.meta.currentCoverLetter) {
                if ($scope.meta.currentCoverLetter.title != newValue) {
                    $scope.meta.itsANewCoverLetter = true;
                }
                else {
                    $scope.meta.itsANewCoverLetter = false;
                }

            }
        });

        $scope.$watch('model.letter.body', function (newValue, oldValue) {
            if (oldValue && $scope.meta.currentCoverLetter) {
                if ($scope.meta.currentCoverLetter.body != newValue) {
                    $scope.meta.itsanEditedCoverLetter = true;
                }
                else {
                    $scope.meta.itsanEditedCoverLetter = false;
                }

            }
        });

        //
        //                                                       ____________________
        //  ____________________________________________________/ get data functions \_________

        function getJobInfo() {
            var deferred = $q.defer();
            if ($scope.resumeUrlId && $scope.resumeUrlType == 'core') {
                jobViewFactory.getJob({ type: $scope.resumeUrlType, id: $scope.resumeUrlId, levelOfDetail: 'BasicInfo' }).$promise.then(function (job) {
                    //console.log(job);
                    registry.set(registryNamespace, 'currentApply', { name: job.title, id: job.id, company: job.company, url: window.location.href }, 'sessionStorage');
                    $scope.job = job;

                    var location = '';
                    if (job.city && job.state) {
                        location = utilityService.tokenize(job.city) + '-' + utilityService.tokenize(job.state);
                    } else if (job.city) {
                        location = utilityService.tokenize(job.city);
                    } else {
                        location = utilityService.tokenize(job.state);
                    }
                    $scope.jobViewUrl = "/jobView/" + utilityService.tokenize(job.title) + '-job-' + location + '-id-' + job.source.toLowerCase() + '-' + $scope.resumeUrlId;
                    //$rootScope.extraBreadCrumbs = [{ display: { value: job.title }, url: $scope.jobViewUrl }, { display: $rootScope.meta.messages["365464"].lookUpMsg }];
                    $scope.saveJobEnabled = job.can_be_saved;

                    return deferred.resolve();
                });
            }
            if ($scope.resumeUrlGuid && $scope.resumeUrlType == 'cloud') {
                jobViewFactory.getCloudJob({ type: $scope.resumeUrlType, id: $scope.resumeUrlGuid }).$promise.then(function (job) {
                    //console.log(job);
                    registry.set(registryNamespace, 'currentApply', { name: job.title, id: job.id, company: job.company, url: window.location.href }, 'sessionStorage');
                    $scope.job = job;

                    var location = '';
                    if (job.city && job.state) {
                        location = utilityService.tokenize(job.city) + '-' + utilityService.tokenize(job.state);
                    } else if (job.city) {
                        location = utilityService.tokenize(job.city);
                    } else {
                        location = utilityService.tokenize(job.state);
                    }
                    $scope.jobViewUrl = "/jobView/" + utilityService.tokenize(job.title) + '-job-' + location + '-id-' + job.source.toLowerCase() + '-' + $scope.resumeUrlGuid;
                    //$rootScope.extraBreadCrumbs = [{ display: { value: job.title }, url: $scope.jobViewUrl }, { display: $rootScope.meta.messages["365464"].lookUpMsg }];
                    $scope.saveJobEnabled = job.can_be_saved;

                    return deferred.resolve();
                });
            }
            return deferred.promise;
        }

        $scope.meta.refreshResumeList = function () {
            var deferred = $q.defer();

            $scope.meta.resumesLoaded = false;
            getResumeInfo().then(function () {
                $scope.meta.resumesLoaded = true;
                //if ($scope.meta.resume.items.length > 1) {
                //$scope.meta.resume.items.pop();  // this effectivly hides the temp resume used for upload doc section
                //}
                $scope.model.resume = 0;
                return deferred.resolve()
            });
            return deferred.promise;
        }

        function getResumeInfo() {
            var deferred = $q.defer();

            //    resumesFactory.getResumesForApplication({ positionAdID: $scope.resumeUrlId, postingID: $scope.resumeUrlGuid }).$promise.then(function (result) {
            resumesFactory.getResumesForApplication({ positionAdID: $scope.resumeUrlId }).$promise.then(function (result) {
                if (result.items.length >= $scope.meta.maxResumes) {
                    $scope.meta.resumesAreFull = true;
                }
                var resumeList = [];
                resumeList.push({ text: '- Select -', value: 0 });
                for (var x in result.items) {
                    if (result.items[x].canBeUsedForApplication == true) {
                        if (result.items[x].isFinishedResume == true) {
                            resumeList.push({ text: result.items[x].resumeBasics.resumeTitle, value: result.items[x].resumeValue });
                        }
                    }
                    else {
                        $scope.serviceErrorList = [];
                        var tempObj = {};
                        tempObj.type = 'alert-success';
                        tempObj.text = 'You have successfully applied to this position with the resume titled: ' + result.items[x].resumeBasics.resumeTitle + "";
                        $scope.serviceErrorList.push(tempObj);
                    }
                }
                $scope.meta.resume.items = resumeList;

                if ($scope.resumeUrlId > 0)   //duration job
                {
                    $scope.meta.getQuestions($scope.resumeUrlId);
                }
                return deferred.resolve();

            });
            return deferred.promise;
        }

        function getcoverLetterInfo() {
            var deferred = $q.defer();
            coverLetters.get().$promise.then(function (result) {
                if (!$scope.meta.templates) {
                    $scope.meta.templates = {};
                    $scope.meta.templates.items = [];
                }

                var lettersList = [];
                for (var x in result.items) {
                    lettersList.push({ text: result.items[x].title, value: result.items[x].id });
                    $scope.meta.blankLetterSlots = $scope.meta.blankLetterSlots - 1;
                }
                $scope.meta.templates.items = lettersList;
                return deferred.resolve();
            });
            return deferred.promise;
        }

        function getCoverLetterTemplates() {
            var deferred = $q.defer();
            //load the templates select list
            coverLetters.templates().$promise.then(function (results) {
                if (!$scope.meta.templates) {
                    $scope.meta.templates = {};
                    $scope.meta.templates.items = [];
                }

                for (var x in results) {
                    if (results[x].id) {
                        $scope.meta.templates.items.push({ value: results[x].id, text: results[x].title, body: results[x].body });
                    }
                }
                return deferred.resolve();
            }
            );
            return deferred.promise;
        }

        function getEeoAAInfo() {
            if ($scope.resumeUrlId > 0) {
                var deferred = $q.defer();
                eeoAa.get({ jobId: $scope.resumeUrlId }).$promise.then(function (result) {
                    for (var propertyName in result) {
                        if (result[propertyName] === true && propertyName != '$resolved') {
                            $scope.meta.accordion.eeo.show = true;
                            break;
                        }
                    }

                    tempEeoAaStatuses = result;
                    return deferred.resolve();
                });

                return deferred.promise;
            }
        }

        function getUserInfo() {
            var deferred = $q.defer();
            userAccount.get({ levelOfDetail: 'All' }).$promise.then(function (result) {
                $scope.meta.firstName = result.firstName;
                $scope.meta.lastName = result.lastName;
                $scope.meta.user = result;

                $scope.meta.showNamePanel = ($scope.meta.firstName.trim().length == 0) || ($scope.meta.lastName.trim().length == 0);
                return deferred.resolve();
            });
            return deferred.promise;
        }

        $scope.meta.saveThisLetter = function (coverLetterId, isNew, isEdited) { //create a new letter. Issues a POST to /api/coverletters
            if (coverLetterId == 9999) { coverLetterId = 0; isNew = true; }; // this is for the blank coverletter, always save it as new

            var letterJson = {
                'id': coverLetterId,
                'title': $scope.model.letter.title,
                'body': $scope.model.letter.body,
                'templates': null
            };

            // save a new cover letter temple
            if (isNew == true) {
                var letterJson = {
                    'id': coverLetterId,
                    'title': $scope.model.letter.title,
                    'body': $scope.model.letter.body,
                    'templates': null
                };
                coverLetters.create(coverLetterId, letterJson).$promise.then(
                    function (success) {
                        getcoverLetterInfo(),
                        getCoverLetterTemplates(),
                        $scope.model.letter.id = success.id;

                        $scope.meta.itsANewCoverLetter = false;
                        $scope.meta.itsanEditedCoverLetter = false;

                        $scope.meta.blankLetterSlots = 5;
                        $scope.meta.loadTemplate(success.id);
                        //console.log(success);
                    },
                    function (error) {
                        //console.log(error);
                    }
                );

                // update the cover letter template matching the "coverLetterId"

            } else {
                coverLetters.update({ coverLetterId: coverLetterId }, letterJson).$promise.then(
                    function (success) {
                        //getcoverLetterInfo(),
                        //getCoverLetterTemplates(),
                        //$scope.model.letter.id = success.id;

                        //$scope.meta.itsANewCoverLetter = false;
                        $scope.meta.itsanEditedCoverLetter = false;

                        //console.log(success);
                    },
                    function (error) {
                        //console.log(error);
                    }
                );

            }
        };

        $scope.meta.getQuestions = function (jobId) {
            applyQuestionaire.getQuestions({ jobId: jobId }).$promise.then(
                function (success) {
                    //console.log(success);
                    if (success.questionCollection != null) {               // check for questions in object
                        $scope.meta.accordion.questions.show = true;        // show question accordion
                        for (var x in success.questionCollection) {         // pre-process questions object - make the names line up with what needed from a meta object.
                            success.questionCollection[x].label = {};
                            success.questionCollection[x].label.lookUpMsg = {};
                            success.questionCollection[x].label.lookUpMsg.value = success.questionCollection[x].title;
                            success.questionCollection[x].displayType = success.questionCollection[x].type;
                            success.questionCollection[x].max = '255';
                            success.questionCollection[x].isInline = true;
                            success.questionCollection[x].error = { required: { lookUpMsg: { id: 555, text: 'required' } } };
                            success.questionCollection[x].type = 'text';
                        }
                    }
                    $scope.meta.questions = success;                        // set the new questions object to the page scope
                },
                function (error) {
                    //console.log(error);
                }
            );
        };

        $scope.meta.postQuestionResults = function (jobId, resumeValue, data) {
            for (var x in data.questionCollection) {            // post process the data to match what the REST end point needs
                data.questionCollection[x].type = data.questionCollection[x].displayType;
                if (!Array.isArray(data.questionCollection[x].answers) && data.questionCollection[x].answers != null) {
                    var temp = data.questionCollection[x].answers;
                    data.questionCollection[x].answers = [];
                    data.questionCollection[x].answers[0] = temp;
                };
            }
            // and submit data
            applyQuestionaire.postQuestionResults({ jobId: jobId, resumeValue: resumeValue }, data).$promise.then(
                function (success) {
                    //console.log(success);
                },
                function (error) {
                    // console.log(error);
                }
            );
        };

        //
        //                                                             _________________
        //____________________________________________________________/  resume upload  \__________
        //resume upload
        $scope.meta.documents = [];
        $rootScope.meta.referenceValue = '';
        $scope.meta.errorList = [];

        $scope.meta.onUploadError = function (error) {
            if ($scope.meta.errorList) {
                $scope.meta.errorList = [];
            }
            $scope.meta.errorList.push(error);
            $scope.meta.documents = [];
            deleteDocument();
        };

        $scope.meta.onUploadSuccess = function () {
            var resumeValue = $rootScope.meta.extraUploadParams.referenceValue;
            resumesFactory.getResume({ resumeValue: resumeValue, levelOfDetail: 'UploadedDocument' }).$promise.then(
                function (result) {
                    $scope.meta.documents = result.documents;
                    var resumeName = result.documents[0].name;
                    resumesFactory.updateResumeTitle({ resumeValue: resumeValue, resumeTitle: resumeName });
                    $scope.model.resume = resumeValue;
                    $rootScope.track({ name: 'resumeFinished', resumeStatus: 'Private' }); //MGSMIL-548
                }
            );
        };

        $scope.meta.downloadFile = function (docId) {
            return documentUpload.download({ documentId: docId }).$promise.then(
                function (data) {
                    var blob = data.response.blob;
                    var fileName = data.response.fileName || 'download.bin';

                    $window.saveAs(blob, fileName);
                },
                function (error, status, config, statusText) {
                    console.log('Error: Unable to download file.');
                }
            );
        };

        $scope.meta.deleteDocument = function () { deleteDocument(); };
        function deleteDocument() {
            var resumeValue = $rootScope.meta.extraUploadParams.referenceValue;

            console.log('deleting: ' + resumeValue)
            resumesFactory.delete({ resumeValue: resumeValue }).$promise.then(function () {
                $rootScope.meta.extraUploadParams.referenceValue = null;
                $scope.model.resume = null;
                $scope.meta.documents = [];
            });
        };
    }
})();