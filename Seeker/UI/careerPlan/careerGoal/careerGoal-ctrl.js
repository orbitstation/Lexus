(function () {
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

    angular.module('miniSPA').controller('careerGoalCtrl',
        ['$scope', '$rootScope', '$routeParams', 'careerPlan', '$location', '$window', 'documentUpload', '$uibModal', '_', '$log', controller]);


    function controller($scope, $rootScope, $routeParams, careerPlan, $location, $window, documentUpload, $uibModal, _, $log) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  

        $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsCreatePage;

        $rootScope.goalId = $routeParams.id;
        //holding data
        $scope.d = {};

        //error & success messages for saving data.
        $scope.save = {};

        $scope.button = {
            isBusy: false
        };

        $scope.selectRecommendedActivites = function (id, index) {
            $scope.recommendedActivities = [];
            _($scope.d.activities).forEach(function (value) {
                if (value.isCustom == false) {
                    $scope.recommendedActivities.push(value.id);
                }
            });
            //Recommended Activities
            var da = $uibModal.open({
                backdrop  : 'static',
                keyboard  : false,
                templateUrl: 'recommendedActivities.html',
                controller: ['$scope', '$rootScope', 'activityNumbers', 'activities', '$uibModalInstance', 'items',
                    function ($scope, $rootScope, activityNumbers, activities, $uibModalInstance, items) {
                    //previously selected items.
                    $scope.items = items;
                    $scope.save = {};
                    $scope.activityNumbers = activityNumbers;
                    //disabled previous selected items.
                    //user must delete to remove from disabled.
                    $scope.metaRecommendedActivities = angular.copy($rootScope.meta.recommendedActivities);
                    var allItems = $scope.metaRecommendedActivities.items;
                    _(items).forEach(function (selectedValue) {
                        _(allItems).forEach(function (value) {
                            if (selectedValue == value.value) {
                                value.disabled = true;
                            }
                        });
                    });
                    
                    //console.log(activities);
                    $scope.add = function () {
                        //converting array into correct object for saving
                        var recommendedObj = $scope.items.map(function (id) {
                            return {
                                id: id
                            };
                        });
                        //join two arrays together
                        var mergedActivities = _.unionBy(activities, recommendedObj, 'id');
                        $rootScope.activitiesLoaded.spinner = false;

                        careerPlan.createActivities({ goalId: $rootScope.goalId, allActivitiesIncluded: false }, mergedActivities)
                            .$promise.then(function success(data) {
                                $uibModalInstance.close();
                                
                            }, function failureMsg(error) {
                                $scope.save.error = [{
                                    text: error.data.message,
                                    type: 'alert-danger'
                                }];
                            });
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }],
                resolve: {
                    items: function () {
                        return $scope.recommendedActivities || [];
                    },
                    activityNumbers: function () {
                        return $scope.activityNumbers;
                    },
                    activities: function () {
                        return $scope.d.activities;
                    }
                }
            });

            da.result.then(function (items) {
                init();
            });
        };

        $scope.createCustomActivity = function (id, index) {
            //Custom Activities
            var ca = $uibModal.open({
                backdrop: 'static',
                keyboard: false,
                templateUrl: 'customActivities.html',
                controller: ['$scope', 'items', '$uibModalInstance', function ($scope, items, $uibModalInstance) {
                    $scope.activity = {};
                    $scope.activity.isCustom = true;

                    var obj = [];
                    $scope.add = function () {
                        $rootScope.activitiesLoaded.spinner = false;
                        if ($scope.activity.targetDueDate === undefined) {
                            $scope.activity.targetDueDate = new Date();
                        }
                        obj.push($scope.activity);
                        careerPlan.createActivities({ goalId: $rootScope.goalId, allActivitiesIncluded: false }, obj)
                            .$promise.then(function success(data) {
                                $uibModalInstance.close();
                            }, function failure(error) {
                                console.log(error);
                            });
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }],
                resolve: {
                    items: function () {
                        return $scope.d.activities;
                    }
                }
            });

            //passed in by uibModalInstance.close(items);
            ca.result.then(function () {
                $scope.activityNumbers.custom++;
                init();
            });
        };

        $scope.updateActivity = function (activityId) {
            $scope.activity = _.find($scope.d.activities, _.matchesProperty("id", activityId));
            $rootScope.activitiesLoaded.spinner = false;
            careerPlan.updateActivities({ goalId: $rootScope.goalId, activityId: activityId }, $scope.activity)
                .$promise.then(function success(data) {
                    init();
                }, function (error) {
                    console.log(error);
                })
            .then(function () {
                $rootScope.activitiesLoaded.spinner = true;
            });
        };

        $scope.deleteActivity = function (id, isCustom) {
            var del = $uibModal.open({
                backdrop: 'static',
                keyboard: false,
                templateUrl: 'deleteActivity.html',
                controller: ['$scope', 'items', '$uibModalInstance', function ($scope, items, $uibModalInstance) {
                    //find object with needed id
                    $scope.activity = _.find(items, _.matchesProperty('id', id));
                    $scope.delete = function () {
                        //find the correct index to remove from the list
                        var index = _.findIndex(items, { 'id': id });
                        $rootScope.activitiesLoaded.spinner = false;
                        careerPlan.removeActivity({ goalId: $rootScope.goalId, activityId: $scope.activity.id })
                            .$promise.then(function (data) {
                                items.splice(index, 1);
                                $uibModalInstance.close(items);
                            }, function (error) {
                                console.log(error);
                            });
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }],
                size: 'sm',
                resolve: {
                    items: function () {
                        return $scope.d.activities;
                    }
                }
            });

            del.result.then(function (selectedItems) {
                $scope.d.activities = selectedItems;
                $scope.activityNumbers.current--;
                $rootScope.activitiesLoaded.spinner = true;
                if (isCustom) {
                    $scope.activityNumbers.custom--;
                }
            });
        };        

        $scope.saveGoal = function () {
            if ($rootScope.goalId) {
                careerPlan.updateGoal({ goalId: $rootScope.goalId }, $scope.d).$promise.then(function (data) {
                    $location.path('');
                }, function (error) {
                    $scope.save.error = [{
                        text: error.data.message,
                        type: 'alert-danger'
                    }];
                });
            } else {
                careerPlan.createGoal($scope.d).$promise.then(function (data) {
                    //change path without reloading the controller/window
                    $location.path('/careerPlan/goal/' + data.id, false);
                    $rootScope.goalId = data.id;
                    var justCreated = true;
                    init(justCreated);
                }, function (error) {
                    console.log(error);
                });
            }
            $scope.button.isBusy = false;
        };
        
        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(init);

        function init(isJustCreated) {
            if ($rootScope.goalId) {
                if (isJustCreated) {
                    $scope.save.success = [{
                        text: $rootScope.msg(365935),
                        type: 'alert-success'
                    }];
                }

                //File upload info            
                $scope.maxItems = $rootScope.config.documentUpload.maxItems;
                $scope.documents = [];
                $scope.uploadFormParams = { 
                    referenceValue: parseInt($rootScope.goalId).toString(),
                    type: 'SeekerDoc',
                    referenceType: 'CareerGoal'
                };

                $scope.recommendedActivities = [];
                $scope.customActivities = [];
                $rootScope.activitiesLoaded = {
                    spinner: true
                };
                $scope.activityNumbers = {
                    max: 20,
                    current: 0,
                    custom: 0
                };

                careerPlan.getGoal({ goalId: $rootScope.goalId }).$promise.then(function (data) {
                    $scope.d = data;
                    $scope.d.targetDueDate = new Date(data.targetDueDate);

                    for (var i = 0; i < data.activities.length; i++) {
                        //if no date, set to null
                        $scope.d.activities[i].targetDueDate = (data.activities[i].targetDueDate != null) ? new Date(data.activities[i].targetDueDate) : null;
                        $scope.activityNumbers.current++;

                        if ($scope.d.activities[i].isCustom) {
                            $scope.activityNumbers.custom++;
                        }
                    }
                });

                //max activitie's target date is the same as goal's
                $scope.$watch(function () { return $scope.d.targetDueDate; }, function () {
                    $rootScope.meta.activityDueDate.maxDate = $scope.d.targetDueDate;
                });

                $scope.$watch(function () { return $scope.d.verificationTypeId; }, function (newVal, oldVal) {
                    if (newVal === 5 && $scope.documents.length > 0) {
                        var modalInstance = $uibModal.open({
                            backdrop: 'static',
                            keyboard: false,
                            templateUrl: 'deleteDocuments.html',
                            controller: 'ModalInstanceCtrl',
                            size: 'sm'
                        });

                        modalInstance.result.then(okToDeleteDocs, dismiss);
                        function dismiss() {
                            //Set the dropdown back to previous value
                            $scope.d.verificationTypeId = oldVal;
                        }
                        function okToDeleteDocs() {
                            console.log('Deleting!');
                        }
                    }
                });

                initUploadedDocuments();

            } else {
                //prevent landing on new goal creation if the limit was reached
                careerPlan.getGoals().$promise.then(function (data) {
                    if (data.items.length === data.maxItemsCount) {
                        $location.path('/careerPlan/');
                    }
                });
            }
        }

        //                                                                               ________________________
        // _____________________________________________________________________________/   Document upload stuff \_____
        // 

        function initUploadedDocuments() {
            $rootScope.dcumentsLoaded = false;
            documentUpload.query({referenceType: 'CareerGoal', referenceValue: $rootScope.goalId }).$promise.then(
                function (result) {
                    $scope.documents = result;
                }, function (error) {
                    console.log(error);
                }
            ).then(function () {
                $rootScope.dcumentsLoaded = true;
            });
        }

        //upload callbacks
        $scope.onDocUploadError = function (error) {
            $scope.save.error = [error];
        }

        $scope.onDocUploadSuccess = function () {
            initUploadedDocuments();
        };
        //end upload callbacks

        $scope.downloadFile = function (docId) {
            return documentUpload.download({ documentId: docId }).$promise.then(
                function (data) {
                    var blob = data.response.blob;
                    var fileName = data.response.fileName || 'download.bin';

                    //using saveAs.js (part of upcoming HTML5 API, but so far a polyfill in filesaver.min.js)                
                    $window.saveAs(blob, fileName);
                },
                function (error, status, config, statusText) {
                    $log.log('Error: Unable to download file.');
                }
            );
        };
        
        $scope.deleteDocument = function (id) {
            var modalInstance = $uibModal.open({
                backdrop: 'static',
                keyboard: false,
                animate: true,
                templateUrl: 'deleteDocument.html',
                controller: 'ModalInstanceCtrl',
                size: 'sm'
            });

            modalInstance.result.then(function () {
                okToDelete();
            }, function (error) {
                $log.info('Modal dismissed at: ' + new Date());
            }).then(function () {
                $rootScope.dcumentsLoaded = true;
            });

            function okToDelete() {
                var data = { documentId: id };
                $rootScope.dcumentsLoaded = false;
                documentUpload.delete({}, data, function () {
                    var itemIndex = findIndexByKey($scope.documents, 'id', id);
                    if (itemIndex > -1) {
                        var removedItems = $scope.documents.splice(itemIndex, 1);
                        $log.log("Document " + removedItems[0].name + " deleted.");
                    }
                });
            }
        };

        function findIndexByKey(arraytosearch, key, valuetosearch) {
            for (var i = 0; i < arraytosearch.length; i++) {
                if (arraytosearch[i][key] === valuetosearch) {
                    return i;
                }
            }
            return -1;
        }
    }
})();