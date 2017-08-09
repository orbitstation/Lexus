(function (angular) {
    "use strict";
    angular.module('miniSPA').run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
        var original = $location.path;
        $location.path = function (path, reload) {
            if (reload === false) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                    $route.current = lastRoute;
                    un();
                });
            }
            return original.apply($location, [path]);
        };
    }]);

    angular.module('miniSPA').controller('resumesStartCtrl', ['$scope', '$rootScope', 'resumeBuilderDataStore', '$location', '$routeParams', '$route', 'resumesFactory', 'autoCompleteFactory', 'documentUpload', '$uibModal', '$window', '$log', 'dataSourceService', '$q', '$http', '$cookies', '$timeout', 'confirmPageRedirect', controller]);

    function controller($scope, $rootScope, resumeBuilderDataStore, $location, $routeParams, $route, resumesFactory, autoCompleteFactory, documentUpload, $uibModal, $window, $log, dataSourceService, $q, $http, $cookies, $timeout, confirmPageRedirect) {

        confirmPageRedirect.init('confirmPageRedirect', $rootScope.configLayout.confirmPageRedirect.lookUpConfig.value);
        $scope.$on('$destroy', function () {
            confirmPageRedirect.destroy();
        });

        //variables
        var dataStore = resumeBuilderDataStore;
        var resumeValue = $routeParams.resumeValue;
        var accordionOpenDelay = 0;
        var resumeTypes = {
            uploadResume: 'UploadResume',
            resumeBuilder: 'ResumeBuilder'
        };
        var accordionList = [
                'upload',
                'profileInformation',
                'profileSettings',
                'languages',
                'targetEmployerInfo',
                'skills',
                'finishingUp',
                'objectiveSummary',
                'experience',
                'education',
                'certification',
                'awards',
                'references'
        ];

        //vm bindings
        $rootScope.busyLinks = {
            mainBusyAction: false
        };
        $scope.newResume = (resumeValue) ? false : true;
        $scope.finishedLoadingResume = false;
        $scope.forms = {};
        
        $scope.$watch('forms.globalForm.$dirty', function (n, o) {
            if(n !== true){
                $rootScope.confirmPageRedirect = false;
            } else if (n === true) {
                $rootScope.confirmPageRedirect = true;
            }
        });

        $scope.$watch("forms.globalForm.$error", function (newState, oldState) {
            if (angular.equals(newState, {})) {
                $scope.$broadcast("resumeEditGlobalForm:HasNoError", newState);
            } else {
                $scope.$broadcast("resumeEditGlobalForm:HasError", newState);
            }
        }, true);


        $scope.$on('$routeChangeStart', function (next, current) {
            if (resumeValue && $rootScope.confirmPageRedirect !== true) {
                //reset();
                //checkResumeAccess();
            }
        });

        $scope.$on('moveToNextSection', function (e, data) {
            $rootScope.meta.accordion[data.clickedFrom].formName.$dirty = false;
            $scope.forms.globalForm.$dirty = false;
            if (areFormsDirty())
            {
                $scope.forms.globalForm.$dirty = true;
            }
        });

        reset();
        checkResumeAccess();

        //self unloading event handler
        $scope.$on('resumeStarted', function (event, data) {
            $scope.finishedLoadingResume = false;
            data.resumeBasics.resumeStatus = "Private";
            resumesFactory.createResume(data).$promise.then(function (data) {
                $rootScope.confirmPageRedirect = false;
                $location.path('/resumes/start/' + data.resumeValue, false);
                broadcastResume(data);
                $rootScope.track({ name: 'resumeCreated' });
                finishedLoadingResume();
                checkResumeCount();     //MGSOCSPP-3083
                setupLayout(data.resumeType).then(function (accordions) {
                    if (data.resumeType === resumeTypes.uploadResume) {
                        accordions.upload.isOpen = true;
                    } else {
                        accordions.profileInformation.isOpen = true;
                    }
                }).then(function () {
                    setFormPrestine();
                });
            });
        });


        if (resumeValue) {
            dataStore.setObj({ resumeValue: resumeValue });
            $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsEditPage;
            resumesFactory.getResume({ resumeValue: resumeValue, levelOfDetail: 'All' }).$promise.then(function (data) {
                broadcastResume(data);
                finishedLoadingResume();
                setupLayout(data.resumeType).then(function (accorions) {
                    accorions.nameAndStatus.isOpen = true;
                });
            });
        }
        else {
            finishedLoadingResume();
            $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsCreatePage;
        }

        function areFormsDirty() {
            var arr = ['nameAndStatus'].concat(accordionList);
            for (var i = 0; arr.length > i; i++) {
                var thisForm = $rootScope.meta.accordion[arr[i]];
                if (thisForm.formName && thisForm.formName.$dirty) {
                    return true;
                }
            }
            return false;
        }

        function broadcastResume(data) {
            dataStore.setObj(data);
            $scope.$broadcast('resumeServerData', data);
        }

        function reset() {
            setupLayout('', true);
            dataStore.resetData();
        }

        function finishedLoadingResume() {
            $scope.finishedLoadingResume = true;
        }

        function checkResumeAccess() {
            if (!$rootScope.isAuthenticated) {
                $location.path('/').replace();
            } else {
                if (!$routeParams.resumeValue) {
                    setupLayout('', true).then(function () {
                        checkResumeCount();
                    });
                }
                else {
                    checkResumeCount();
                }
            }
        }

        function setFormPrestine() {
            $scope.forms.globalForm.$setPristine();
            $rootScope.confirmPageRedirect = false;
        }

        //MGSOCSPP-3083
        function checkResumeCount() {
            resumesFactory.getResumes().$promise.then(function (data) {
                var currentResumes = data;
                if (currentResumes && currentResumes.items && currentResumes.maxItemsCount) {
                    if (currentResumes.items.length > currentResumes.maxItemsCount) {
                        $location.path('/resumes').replace();
                    }
                    $rootScope.resumeCount = currentResumes.items.length;
                }
            });
        }

        function setupLayout(resumeType, reset) {
            var ac = $scope.meta.accordion;
            var deferred = $q.defer();
            if (reset) {
                for (var i = 0; i < accordionList.length; i++) {
                    ac[accordionList[i]].show = false;
                    ac[accordionList[i]].isOpen = false;
                }
                ac.nameAndStatus.noButton = true;
                ac.nameAndStatus.isOpen = true;
                ac.nameAndStatus.touched = false;
                //ac.nameAndStatus.isDisabled = true;
            } else {
                if (resumeType) {
                    switch (resumeType) {
                        case resumeTypes.uploadResume:
                            ac.upload.show = true;
                            ac.profileInformation.show = returnConfig('MGS_ResumeUpload_ContactInfo_On');
                            ac.profileSettings.show = true;
                            ac.languages.show = true;
                            ac.targetEmployerInfo.show = true;
                            ac.skills.show = true;
                            ac.finishingUp.show = true;
                            break;
                        case resumeTypes.resumeBuilder:
                            ac.nameAndStatus.show = true;
                            ac.profileInformation.show = true;
                            ac.objectiveSummary.show = true;
                            ac.experience.show = true;
                            ac.education.show = true;
                            ac.certification.show = true;
                            ac.skills.show = true;
                            ac.languages.show = true;
                            ac.awards.show = true;
                            ac.references.show = true;
                            ac.targetEmployerInfo.show = true;
                            ac.profileSettings.show = true;
                            ac.finishingUp.show = true;
                            break;
                    }

                    //Applies to both types
                    $scope.meta.MGS_CreateAcct_Citizenship_On = returnConfig('MGS_CreateAcct_Citizenship_On');
                    ac.nameAndStatus.noButton = false;
                    //ac.nameAndStatus.isDisabled = false;
                }
            }
            deferred.resolve(ac);
            return deferred.promise;
        }

        function returnConfig(prop) {
            return ($rootScope.configLayout[prop].lookUpConfig.value == 'true') ? true : false;
        }

    }
})(angular);