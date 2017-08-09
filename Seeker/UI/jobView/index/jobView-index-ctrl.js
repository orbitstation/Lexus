(function () {
    "use strict";
    angular.module('miniSPA').controller('jobViewIndexCtrl', ['$scope', '$rootScope', 'productVariables', '$log', 'BrowserDetect', '$timeout', '$window', '$location', '$resource', '$sanitize', 'jobViewFactory', 'savedJobsFactory', '$routeParams', 'sendJobEmailFactory', 'UserAccount', 'vcRecaptchaService', 'applicationHistory', 'utilityService', 'registry', '$sce', 'samlAuth', controller]);
    function controller($scope, $rootScope, productVariables, $log, BrowserDetect, $timeout, $window, $location, $resource, $sanitize, jobViewFactory, savedJobsFactory, $routeParams, sendJobEmailFactory, UserAccount, vcRecaptchaService, applicationHistory, utilityService, registry, $sce, samlAuth) {
        
        $scope.meta.errorList = [];
        $scope.serviceErrorList = [];
        $scope.logInModal = false;
        $scope.isJobLoaded = false;
        $scope.triggerSSO = false;
        $scope.moment = moment;
        $scope.jobPostingDateFormat = $rootScope.meta.locale.jobPostingDateFormat;
        $scope.print = function () {
            window.print();
        };
        $rootScope.sendToFriendCaptchaResponse = '';
        $scope.sendToFriend = {
            open: false
        };
        $scope.jobSearchSession = registry.get("Jobsearch", "query", "sessionStorage");

        //MGSOCSPP-3350 - add to breadcrumbs
        if ($rootScope.meta.breadCrumbs && $rootScope.meta.breadCrumbs.length < 2) {
            if ($scope.jobSearchSession && $scope.jobSearchSession.url) {
                $rootScope.meta.breadCrumbs.push({ display: { id: 0, value: $rootScope.meta.messages[346842].lookUpMsg.value }, url: $scope.jobSearchSession.url }); //jobsearch
            }
            $rootScope.meta.breadCrumbs.push({ display: { id: 0, value: $rootScope.meta.messages[211742].lookUpMsg.value }, url: '' }); //job view
        }

        //Remove footer for all
        $rootScope.configLayout.footer2.show.lookUpConfig.value = false;
        $rootScope.configLayout.footer.show.lookUpConfig.value = false;

        //Buttons that should not double click
        $scope.busyLinks = {
            apply: false
        };

        var jobTypes = [];
        jobTypes.push({ type: "cloud", regex: /id[-]cloud[-]([0-9a-f-]+)[/]?$/i });
        jobTypes.push({ type: "core", regex: /id[-]core[-]([0-9]+)[/]?$/i });
        jobTypes.push({ type: "core", regex: /[-]([0-9]+)\.aspx/i });
        for (var i = 0; i < jobTypes.length; i++)
        {
            var match = jobTypes[i].regex.exec($location.path());
            if (match) {
                $scope.id = match[1];
                $scope.type = jobTypes[i].type;
                break;
            }
        }

        $rootScope.logInWatcher(
         function () {
             if ($scope.job && $scope.job.is_saved) {
                 $scope.jobIsSaved = true;
             }
         }
     );

        var fromSavedJobs = (/saved$/).test($location.url());

        if ($scope.id && $scope.type) {
            var query = { type: $scope.type, id: $scope.id };
            if ($scope.type === 'core')
            {
                $scope.coreJobUrl = '/jobs/' + $scope.id;
                query.levelOfDetail = 'BasicInfo';
            }

            $scope.useCoreJobView = $scope.configMeta.useCoreJobView.lookUpConfig.value;

            jobViewFactory.getJob(query).$promise.then(function (job) {
                var jobusesEJB = false;
                if (job.flags)
                    jobusesEJB = job.flags.uses_EJB ? job.flags.uses_EJB : false;
                var cloudJob = (job.source == 'Cloud');
                var useJV30Tracking = !jobusesEJB || cloudJob;

                $rootScope.track({ name: 'jobView', pageIndex: $location.search().page_index ? $location.search().page_index : 1, usejv30tracking: useJV30Tracking });
        		$scope.job = job;
        		$scope.jobIsSaved = job.is_saved;
        		$rootScope.extraBreadCrumbs = [{ display: { value: job.title } }];
        		$scope.coreJobViewUrl = $sce.trustAsResourceUrl(job.core_jobview_url);
        		$scope.isJobLoaded = true;
        		SetPageTitle(job);
        	}, function (error) {
        		$scope.job = null;
        		$scope.serviceErrorList.push({ text: $rootScope.meta.errors['404'].lookUpMsg.text, type: 'alert-danger' });
        		// todo: display some message to user
        	});
        }

        $scope.saveJob = function () {
            if ($rootScope.isAuthenticated) {
                savedJobsFactory.saveJob({ jobId: $scope.job.id, jobType: $scope.job.source }).$promise.then(function (response) {
                    $scope.jobIsSaved = true;
                },
                function (response) {
                    $rootScope.topMasterErrors.push({ type: 'alert-danger', text: response.data.message });
                });
            }
            else {
                var saveObj = {
                    jobId: $scope.job.id,
                    jobType: $scope.job.source,
                    expireOn: dateAdd(new Date(), 'minute', 10),
                    saveInProgress: false
                };
                registry.addDelayedSave('saveJob', saveObj, 'localStorage');
                $scope.job.is_saved = true;

                // check for saml login
                if (samlAuth.isAuthenticatingUsingSaml()) {
                    // saml is true
                    $scope.triggerSSO = true;
                }
                else {
                    $rootScope.login.boxOpen = true;
                    // zip to top 
                    window.scrollTo(0, 0);
                }
            }
        };


        $scope.backToSearchResults = function () {
            if ( $scope.jobSearchSession.url ) {
                $window.location.href =  $scope.jobSearchSession.url;
            }

        }

        $scope.back = function () {
            $window.history.back();
        };

        $scope.openEmailModal = function () {
            if ($rootScope.isAuthenticated) {
                UserAccount.get({ levelOfDetail: 'email' }).$promise.then(function (response) {
                    $rootScope.sendFrom = response.emailAddress;
                });
            }
            $scope.sendToFriend.open = true;
        };

        
        $scope.ignoreBusy = function () {
            if (!$rootScope.isAuthenticated) {
                return true;
            }
            return false;
        };


        $scope.applyForJob = function () {
            if (fromSavedJobs) {
                //we came here from saved jobs page
                $rootScope.track({ name: 'applyJobviaSavedJobs' });
            }
            $rootScope.track({ name: 'applyStart' });
            if ($scope.job.source === "Cloud") {
                if ($scope.job.awm)
                {
                    openApplyPage();
                }
                else{
                    // This isn't a mistake, popups inside promises are blocked, have to do it now
                    window.open($scope.job.applyUrl);
                    if ($rootScope.isAuthenticated) {
                        $scope.cloudJob = {};
                        $scope.cloudJob.companyName = $scope.job.company;
                        $scope.cloudJob.jobViewLink = $scope.job.applyUrl;
                        $scope.cloudJob.jobLocation = $scope.job.city + ', ' + $scope.job.state;
                        $scope.cloudJob.jobTitle = $scope.job.title;

                        applicationHistory.saveCloudApplication({ jobId: $scope.id }, $scope.cloudJob).$promise.then(function () {
                        }, function (error) {
                            $scope.serviceErrorList.push({ text: $rootScope.meta.errors['404'].lookUpMsg.text, type: 'alert-danger' });
                        }).then(function () {
                            $scope.busyLinks.apply = false;
                        });
                    }
                    return;
                }
            }
            if ($scope.job.source === "Core") {
                // apply be external url
                if ($scope.job.applyUrl) {
                    window.open($scope.job.applyUrl);
                    if($rootScope.isAuthenticated) {
                        applicationHistory.saveCoreApplication({ jobId: $scope.id }, { type: "ExternalUrl" }).$promise.then(function () {
                        }, function (error) {
                            $scope.serviceErrorList.push({ text: $rootScope.meta.errors['404'].lookUpMsg.text, type: 'alert-danger' });
                        }).then(function () {
                            $scope.busyLinks.apply = false;
                        });
                    }
                    return;
                }
                openApplyPage();
            }
        };

        $rootScope.sendMail = function (sendFrom, sendTo, callback) {
            sendTo = sendTo.replace(';', ',');
            var regex = /^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4}[\W]*,{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4})[\W]*$/g;
            var match = regex.exec(sendTo);      
            if (match == null)
            {
                $scope.meta.errorList.push({ text: $rootScope.msg(151900), type: 'alert-danger' });
                return false;
            }

            var recipientsarray = sendTo.split(',');
            var cleanArry = new Array();
            $.each(recipientsarray, function(idx, val) {

                cleanArry.push($.trim(this));

            });

            cleanArry = cleanArry.filter(function (v) { return v !== '' });
            var payload = {
                sender: sendFrom,
                jobUrl: window.location.href,
                title: $scope.job.title,
                location: $scope.job.city,
                company: $scope.job.company,
                notes: '',
                recipients: cleanArry,
                captchaResponse: $rootScope.sendToFriendCaptchaResponse
            };

            sendJobEmailFactory.post(payload).$promise.then(function (success) {
                $scope.meta.errorList = [];
                callback();
            }, function (fail) {
                $scope.meta.errorList.push({ text: 'The email failed to send.', type: 'alert-danger' });
                vcRecaptchaService.reload(0);
            });
        };

        function dateAdd(date, interval, units) {
            var ret = new Date(date); //don't change original date
            switch (interval.toLowerCase()) {
                case 'year': ret.setFullYear(ret.getFullYear() + units); break;
                case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); break;
                case 'month': ret.setMonth(ret.getMonth() + units); break;
                case 'week': ret.setDate(ret.getDate() + 7 * units); break;
                case 'day': ret.setDate(ret.getDate() + units); break;
                case 'hour': ret.setTime(ret.getTime() + units * 3600000); break;
                case 'minute': ret.setTime(ret.getTime() + units * 60000); break;
                case 'second': ret.setTime(ret.getTime() + units * 1000); break;
                default: ret = undefined; break;
            }
            return ret;
        }

        function openApplyPage()  {
            var location = '';
            if ($scope.job.city && $scope.job.state) {
                location = utilityService.tokenize($scope.job.city) + '-' + utilityService.tokenize($scope.job.state);
            } else if ($scope.job.city) {
                location = utilityService.tokenize($scope.job.city);
            } else {
                location = utilityService.tokenize($scope.job.state);
            }
            // apply online
            $location.url('/jobView/' + utilityService.tokenize($scope.job.title) + '-job-' + location + '-id-' + $scope.job.source.toLowerCase() + '-' + $scope.id + '/apply');
        }

        function SetPageTitle(job) {
            var pageTitle = $rootScope.msg(365227);
            pageTitle = pageTitle.replace("%JOB TITLE%", (job.title) ? job.title : "");
            pageTitle = pageTitle.replace("%COMPANY%", (job.company) ? job.company : "");
            pageTitle = pageTitle.replace("%CITY%", (job.city) ? job.city : "");
            pageTitle = pageTitle.replace("%STATE%", (job.state) ? job.state : "");
            pageTitle = pageTitle.replace("%LOCATION%", (job.location) ? job.location : "");
            
            document.title = pageTitle;
        }

    }
})();