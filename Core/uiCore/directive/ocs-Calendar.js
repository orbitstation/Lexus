(function () {
    'use strict';

    var knownCategories = {
        CareerPlanGoal: "CareerPlanGoal",
        CareerPlanActivity: "CareerPlanActivity",
        CareerPlanRecommendedActivity: "CareerPlanRecommendedActivity",
        MonsterDbAppointment: "MonsterDbAppointment",
        Holiday: "Holiday",
        EtoRegisteredEvents: "EtoRegisteredEvents"
    };

    angular.module('globalApp').directive('ocsCalendar',
        ['$timeout', '$parse', '$window', '$rootScope', '$uibModal', 'authentication', 'careerPlan', 'templateUrlService', directiveFunction]);
    function directiveFunction($timeout, $parse, $window, $rootScope, $uibModal, authentication, careerPlan, templateUrlService) {
        return {
            restrict: 'E',
            scope: {
                meta: "="
            },
            replace: true,
            templateUrl: templateUrlService.get('ocs-Calendar.html'),
            controller: ['$scope', '$rootScope', '$resource', 'authentication', controller],
            link: function (scope, element, attrs) {
                if (scope.meta) {
                    if (scope.meta !== undefined && scope.meta.showLegend !== undefined)
                    {
                        scope.showLegend = scope.meta.showLegend;
                    }
                }
            }
        };

        function controller($scope, $rootScope, $resource, authentication) {
            if ($rootScope.IdCounter === undefined) {
                $rootScope.IdCounter = 0;
            }
            $scope.calendarId = $rootScope.IdCounter++;
            $scope.showLegend = true;
            $scope.isAuthenticated = authentication.isAuthenticated();
                
            $rootScope.$on('login_success', function () {
                $scope.isAuthenticated = true;
                $scope.dataSource.read();
            });

            $rootScope.$on('logout_success', function () {
                $scope.isAuthenticated = false;
                $scope.dataSource.read();
            });

            $scope.getScheduler = function () {
                return $scope['scheduler' + $scope.calendarId.toString()];
            };

            var now = new Date();
            var startTime = now;
            startTime.setHours(7);
            startTime.setMinutes(0);

            var resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/me/events';
            var eventsCall = $resource(resourceUrl, {}, {
                post: { method: 'POST', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false },
                put: { method: 'PUT', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }
            });
            var eventsDeleteCall = $resource(resourceUrl + '/delete', {}, {
                destroy: { method: 'POST', isArray: false, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false }
            });
            var legendEntriesCall = $resource($rootScope.productVariables.rootUrl + '/seeker/api/lookups/event-categories', {}, {
                get: { method: 'GET', isArray: true, requestType: 'json', responseType: 'json', contentType: "json/application", cache: false },
            });

            $scope.legendEntriesLoaded = false;
            $scope.legendEntries = [];

            $scope.dataSource = new kendo.data.SchedulerDataSource({
                batch: true,
                transport: {
                    read: function (options) {
                        if ($scope.legendEntriesLoaded) {
                            var scheduler = $scope.getScheduler();
                            var categories = [];
                            angular.forEach($scope.legendEntries, function (value) {
                                if (value.checked) {
                                    categories = categories.concat(value.categories);
                                }
                            });
                            eventsCall.post({
                                start: scheduler.view().startDate(),
                                end: scheduler.view().endDate(),
                                categories: categories
                            })
                            .$promise
                            .then(function (data) {
                                options.success(data);
                            }, function (data) {
                                options.error(data);
                            });
                        } else {
                            options.success([]);
                        }
                    },
                    update: function (options) {
                        var data = $scope.dataSource.data();
                        var models = [];
                        angular.forEach(data, function (item) {
                            if (item.dirty && item.taskId && item.taskId !== "") {
                                models.push(item);
                            }
                        });
                        wrapPromise(options, eventsCall.put({ models: models }));
                    },
                    create: function (options) {
                        var data = $scope.dataSource.data();
                        var models = [];
                        angular.forEach(data, function (item) {
                            if (item.taskId === undefined || item.taskId === null || item.taskId === "") {
                                models.push(item);
                            }
                        });
                        wrapPromise(options, eventsCall.put({ models: models }));
                    },
                    destroy: function (options) {
                        wrapPromise(options, eventsDeleteCall.destroy(options.data));
                    }
                },
                error: function (e) {
                    console.log(e);
                },
                /*
                parameterMap: function (options, operation) {
                    var result = options;
                    if (operation === "read") {
                            
                        var scheduler = $("#scheduler").data("kendoScheduler");
                
                        if ($('#newAppointment').length == 0) {
                            scheduler.wrapper.find('.k-scheduler-fullday')
                
                                .after('<li class="k-state-default"><a href="#" id="newAppointment" class="k-link">New appointment</a></li>');
                
                            $('#newAppointment').on('click', function (e) {
                                e.preventDefault();
                
                                var date = new Date();
                                var hour = date.getHours();
                                var minutes = date.getMinutes();
                                var day = date.getDate();
                                var month = date.getMonth() + 1;
                                var year = date.getFullYear();
                
                                var startHour = 0;
                                var endHour = 0;
                                var endHour = 0;
                                var endMinutes = 0;
                
                                var startAmpm = hour >= 12 ? 'PM' : 'AM';
                                var stopAmpm = hour + 1 == 24 ? 'AM' : 'PM';
                
                                hour = hour % 12;
                                hour = hour ? hour : 12;
                
                                if (minutes >= 30) {
                                    startHour = hour;
                                    startMinutes = 30;
                                    endHour = hour + 1;
                                    endMinutes = '00';
                                } else {
                                    startHour = hour;
                                    startMinutes = '00';
                                    endHour = hour;
                                    endMinutes = 30;
                                }
                
                                var startTime = month + "/" + day + "/" + year + " " + startHour + ":" + startMinutes + " " + startAmpm;
                                var endTime = month + "/" + day + "/" + year + " " + endHour + ":" + endMinutes + " " + stopAmpm;
                
                                scheduler.addEvent({ title: "No title", start: new Date(startTime), end: new Date(endTime) });
                
                            });
                
                        }
                
                        var categories = [];
                        $(".typeSelector input:checked").each(function () {
                            categories.push($(this).attr('appointmenttype'));
                        });
                
                        var result = {
                            start: $scope.scheduler.view().startDate(),
                            end: $scope.scheduler.view().endDate(),
                            //categories: categories
                        };
                
                        return kendo.stringify(result);
                    }
                    if (operation === "update" || operation === "create") {
                        var rc = result.models[0].Category;
                
                        if (rc === allowedCategory) {
                            return kendo.stringify(result);
                        }
                        //if (rc === 'CareerPlanGoal' || rc === 'CareerPlanActivity' || rc === 'CareerPlanRecommendedActivity') {
                            //window.location = '/careerplan/careerplan.aspx/viewACareerPlan/goalId/' + result.models[0].ScopeID;
                        //}
                    }
                
                    return kendo.stringify(options);
                },*/
                serverFiltering: true,
                schema: {
                    data: "models",
                    model: {
                        id: "taskId",
                        fields: {
                            taskId: { from: "taskID", type: "String" },
                            title: { from: "title", defaultValue: "No title", validation: { required: true } },
                            start: { type: "date", from: "start" },
                            end: { type: "date", from: "end" },
                            startTimezone: { from: "startTimezone" },
                            endTimezone: { from: "endTimezone" },
                            description: { from: "description" },
                            recurrenceId: { from: "recurrenceID", type: "String" },
                            recurrenceRule: { from: "recurrenceRule" },
                            recurrenceException: { from: "recurrenceException" },
                            ownerId: { from: "ownerID", defaultValue: 1 },
                            isAllDay: { type: "boolean", from: "isAllDay" },
                            category: { type: "String", from: "category" },
                            eventDetailUrl: { type: "String", from: "eventDetailUrl" },
                            isMandatoryEvent: { type: "boolean", from: "isMandatoryEvent" },
                            isRegistrationRequired: { type: "boolean", from: "isRegistrationRequired" }
                        }
                    }
                }
            });

            $scope.rebind = function () {
                $scope.dataSource.read();
            };

            $scope.window = $window;

            $scope.confirmDelete = function (onSuccess) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    //size: 'sm',
                    template:
"<div class=\"modal-header\">" +
"  <h3 class=\"modal-title\">{{ calendarMessages.confirmDeleteTitle }}</h3>" +
"</div>" +
"<div class=\"modal-body\">" +
"  <h4>{{ calendarMessages.confirmDeleteBody }}</h4>" +
'<div ng-repeat="a in calendarMessages.activities"> {{a}} </div> ' +
"</div>" +
"<div class=\"modal-footer\">" +
"  <button class=\"btn btn-primary pull-left\" type=\"button\" ng-click=\"window.location.href = '/careerPlan/goal/' + goalId\">Edit</button>" +
"  <button class=\"btn btn-link\" type=\"button\" ng-click=\"cancel()\">Cancel</button>" +
"  <button class=\"btn btn-danger\" type=\"button\" ng-click=\"ok()\">Delete</button>" +
"</div>",
                    controller: 'ModalInstanceCtrl',
                    scope: $scope,
                    resolve: {
                    }
                }).result.then(function () {
                    onSuccess();
                });
            };

            function init() {
                legendEntriesCall.get().$promise.then(function (data) {
                    angular.forEach(data, function (value) {
                        value.checked = true;
                    });
                    $scope.legendEntries = data;
                    $scope.legendEntriesLoaded = true;

                    var resources = [];
                    angular.forEach($scope.legendEntries, function (legendEntry) {
                        angular.forEach(legendEntry.categories, function (category) {
                            resources.push({ text: legendEntry.name, color: legendEntry.color, value: category });
                        });
                    });

                    $scope.getScheduler().resources[0].dataSource.data(resources);
                    $scope.getScheduler().refresh();
                    $scope.dataSource.read();
                });

                    
            };

            $scope.calendarMessages = {
                confirmDeleteTitle: null,
                confirmDeleteBody: null
            };

            function wrapPromise(options, promise) {
                promise.$promise
                .then(function (data) {
                    options.success(data);
                }, function (data) {
                    options.error(data);
                });
            };

            $scope.schedulerOptions = {
                date: now,
                startTime: startTime,
                height: 600,
                views: [
                    "day",
                    { type: "week", selected: true },
                    "month",
                    "agenda",
                    "timeline"
                ],
                editable: {
                    confirmation: false
                },
                footer: false,
                //{
                //  command: false
                //},
                messages: {
                    today: $rootScope.meta.calendar.today.lookUpMsg.text,
                    pdf: $rootScope.meta.calendar.pdf.lookUpMsg.text,
                    save: $rootScope.meta.calendar.save.lookUpMsg.text,
                    cancel: $rootScope.meta.calendar.cancel.lookUpMsg.text,
                    destroy: $rootScope.meta.calendar.destroy.lookUpMsg.text,
                    deleteWindowTitle: $rootScope.meta.calendar.deleteWindowTitle.lookUpMsg.text,
                    ariaSlotLabel: $rootScope.meta.calendar.ariaSlotLabel.lookUpMsg.text,
                    ariaEventLabel: $rootScope.meta.calendar.ariaEventLabel.lookUpMsg.text,
                    views: {
                        day: $rootScope.meta.calendar.views.day.lookUpMsg.text,
                        week: $rootScope.meta.calendar.views.week.lookUpMsg.text,
                        agenda: $rootScope.meta.calendar.views.agenda.lookUpMsg.text,
                        month: $rootScope.meta.calendar.views.month.lookUpMsg.text,
                        timeline: $rootScope.meta.calendar.views.timeline.lookUpMsg.text,
                        timelineWeek: $rootScope.meta.calendar.views.timelineWeek.lookUpMsg.text,
                        timelineMonth: $rootScope.meta.calendar.views.timelineMonth.lookUpMsg.text
                    },
                    recurrenceMessages: {
                        deleteWindowTitle: $rootScope.meta.calendar.recurrenceMessages.deleteWindowTitle.lookUpMsg.text,
                        deleteWindowOccurrence: $rootScope.meta.calendar.recurrenceMessages.deleteWindowOccurrence.lookUpMsg.text,
                        deleteWindowSeries: $rootScope.meta.calendar.recurrenceMessages.deleteWindowSeries.lookUpMsg.text,
                        editWindowTitle: $rootScope.meta.calendar.recurrenceMessages.editWindowTitle.lookUpMsg.text,
                        editWindowOccurrence: $rootScope.meta.calendar.recurrenceMessages.editWindowOccurrence.lookUpMsg.text,
                        editWindowSeries: $rootScope.meta.calendar.recurrenceMessages.editWindowSeries.lookUpMsg.text
                    },
                    editable: { confirmation: $rootScope.meta.calendar.editable.confirmation.lookUpMsg.text },
                    editor: {
                        title: $rootScope.meta.calendar.editor.title.lookUpMsg.text,
                        start: $rootScope.meta.calendar.editor.start.lookUpMsg.text,
                        end: $rootScope.meta.calendar.editor.end.lookUpMsg.text,
                        allDayEvent: $rootScope.meta.calendar.editor.allDayEvent.lookUpMsg.text,
                        description: $rootScope.meta.calendar.editor.description.lookUpMsg.text,
                        repeat: $rootScope.meta.calendar.editor.repeat.lookUpMsg.text,
                        timezone: $rootScope.meta.calendar.editor.timezone.lookUpMsg.text,
                        startTimezone: $rootScope.meta.calendar.editor.startTimezone.lookUpMsg.text,
                        endTimezone: $rootScope.meta.calendar.editor.endTimezone.lookUpMsg.text,
                        separateTimezones: $rootScope.meta.calendar.editor.separateTimezones.lookUpMsg.text,
                        timezoneEditorTitle: $rootScope.meta.calendar.editor.timezoneEditorTitle.lookUpMsg.text,
                        timezoneEditorButton: $rootScope.meta.calendar.editor.timezoneEditorButton.lookUpMsg.text,
                        timezoneTitle: $rootScope.meta.calendar.editor.timezoneTitle.lookUpMsg.text,
                        noTimezone: $rootScope.meta.calendar.editor.noTimezone.lookUpMsg.text,
                        editorTitle: $rootScope.meta.calendar.editor.editorTitle.lookUpMsg.text
                    }
                },
                timezone: "Etc/UTC",
                currentTimeMarker: {
                    useLocalTimezone: false
                },
                dataSource: $scope.dataSource,
                resources: [{
                    field: "category",
                    title: "category",
                    dataSource: [] 
                }],
                remove: function (e) {
                    var scheduler = e.sender;
                    var cat = e.event.category;
                    var activities = e.event.goalActivities;
                    var hasActivities = (activities && activities.length > 0) ? true : false;

                    if (cat !== knownCategories.MonsterDbAppointment
                        && cat !== knownCategories.CareerPlanGoal
                        && cat !== knownCategories.CareerPlanActivity
                        && cat !== knownCategories.CareerPlanRecommendedActivity) {
                        e.preventDefault();
                    }

                    $scope.goalId = e.event.id.split('-')[1];

                    if (cat === knownCategories.CareerPlanGoal && hasActivities && !e.event.isConfirmed) {
                        $scope.calendarMessages.confirmDeleteTitle = $rootScope.meta.calendar.monster.careerPlanGoalWithActivities.confirmDeleteTitle.lookUpMsg.text;
                        $scope.calendarMessages.confirmDeleteBody = $rootScope.meta.calendar.monster.careerPlanGoalWithActivities.confirmDeleteBody.lookUpMsg.text;

                        var parsedActivities = [];
                        if (activities) {
                            for (var i = 0; i < activities.length; i++) {
                                parsedActivities.push(activities[i].name);
                            }
                        }
                        $scope.calendarMessages.activities = parsedActivities;

                        $('.k-popup-edit-form .k-scheduler-cancel').click();
                        $scope.confirmDelete(function () {
                            e.event.isConfirmed = true;
                            scheduler.removeEvent(e.event);
                        });
                        e.preventDefault();
                    }
                },
                dataBound: function (e) {
                    var scheduler = e.sender;
                    $(".k-event").each(function () {
                        var uid = $(this).data("uid");
                        if (uid) {
                            var event = scheduler.occurrenceByUid(uid);
                            if (event) {
                                var overrideDelete = null;
                                switch(event.category)
                                {
                                    case knownCategories.Holiday:
                                    case knownCategories.EtoRegisteredEvents:
                                        $(this).find(".k-event-delete,.k-resize-handle").hide();
                                        break;
                                    case knownCategories.CareerPlanActivity:
                                    case knownCategories.CareerPlanRecommendedActivity:
                                        $(this).find(".k-resize-handle").hide();
                                        overrideDelete = {
                                            title: $rootScope.meta.calendar.monster.careerPlanActivity.confirmDeleteTitle.lookUpMsg.text,
                                            body: $rootScope.meta.calendar.monster.careerPlanActivity.confirmDeleteBody.lookUpMsg.text
                                        };
                                        break;
                                    case knownCategories.CareerPlanGoal:
                                        $(this).find(".k-resize-handle").hide();
                                        overrideDelete = {
                                            title: $rootScope.meta.calendar.monster.careerPlanGoal.confirmDeleteTitle.lookUpMsg.text,
                                            body: $rootScope.meta.calendar.monster.careerPlanGoal.confirmDeleteBody.lookUpMsg.text
                                        };
                                        break;
                                    case knownCategories.MonsterDbAppointment:
                                        if ((!event.recurrenceRule || event.recurrenceRule === "") && (!event.recurrenceId || event.recurrenceId === ""))
                                        {
                                            overrideDelete = {
                                                title: $rootScope.meta.calendar.monster.monsterDbAppointment.confirmDeleteTitle.lookUpMsg.text,
                                                body: $rootScope.meta.calendar.monster.monsterDbAppointment.confirmDeleteBody.lookUpMsg.text
                                            };
                                        }
                                        break;
                                }

                                if (overrideDelete)
                                {
                                    $(this).find(".k-event-delete").click(function (event) {
                                        $scope.calendarMessages.confirmDeleteTitle = overrideDelete.title;
                                        $scope.calendarMessages.confirmDeleteBody = overrideDelete.body;
                                        $scope.confirmDelete(function () {
                                            scheduler.removeEvent(uid);
                                        });
                                        e.preventDefault();
                                        //e.stopPropagation();
                                    });
                                }
                            }
                        }
                    });
                },
                add: function (e) {
                    if (!authentication.isAuthenticated())
                    {
                        e.preventDefault();
                        return;
                    }
                    e.event.category = knownCategories.MonsterDbAppointment;
                },
                edit: function (e) {
                    var cat = e.event.category;

                    if (cat === knownCategories.Holiday) {
                        e.preventDefault();
                        return;
                    }

                    var scopeID = e.event.scopeID;
                    var parentScopeID = e.event.parentScopeID;
                    var scheduler = e.sender;

                    e.container.find("[data-container-for=category], [for=category]").hide();

                    if (cat === knownCategories.CareerPlanGoal || cat === knownCategories.CareerPlanActivity || cat === knownCategories.CareerPlanRecommendedActivity) {
                        e.container.find("input, textarea").attr('disabled', 'disabled').css('background-color', '#EEE');
                        e.container.find("input[name=start][data-role=datepicker]").data().kendoDatePicker.readonly();
                        e.container.find("input[name=start][data-role=datetimepicker]").data().kendoDateTimePicker.readonly();
                        e.container.find("input[name=end][data-role=datepicker]").data().kendoDatePicker.readonly();
                        e.container.find("input[name=end][data-role=datetimepicker]").data().kendoDateTimePicker.readonly();
                        e.container.find("[name=recurrenceRule][data-role=recurrenceeditor], [for=recurrenceRule]").parent().hide();
                        e.container.find("[role=listbox], [for=category]").parent().hide();

                        e.container.find(".k-scheduler-update")
                            .text($rootScope.meta.calendar.monster.edit.lookUpMsg.text)
                            .click(function (e) {
                                if (cat === knownCategories.CareerPlanGoal)
                                {
                                    window.location = ('/careerPlan/goal/{0}'.format(scopeID));
                                }
                                else
                                {
                                    window.location = ('/careerPlan/goal/{0}'.format(parentScopeID));
                                }
                                e.preventDefault();
                            });
                    }
                }
            };

            init();
        }
    };

})();

