(function () {
    "use strict";
    angular.module('miniSPA').controller('programsCompareCtrl', ['$scope', '$rootScope', '$log', '$timeout', '$window', '$location', '$resource', '$routeParams', '$q', '$filter', 'trainingProgramsFactory', controller]);

    function controller($scope, $rootScope, $log, $timeout, $window, $location, $resource, $routeParams, $q, $filter, trainingProgramsFactory) {

        $scope.meta.breadCrumbsExtended = $scope.meta.breadCrumbsComparePage;

        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages);

        var code1 = $routeParams.code1;
        var code2 = $routeParams.code2;
        var code3 = $routeParams.code3;
        var code4 = $routeParams.code4;

        $scope.programs = {};
        $scope.heights = [];
        $scope.tableDataLoaded = false;
        $scope.backButton = (function () {
            var defaultPath = 'search';
            var backPath = $scope.meta.backPath;

            var options = {
                saved: function () { return { url: backPath, text: $rootScope.msg(374394) }; },
                search: function () { return { url: 'programs/search', text: $rootScope.msg(374393) }; }
            };

            var path = backPath !== undefined ? backPath.replace(/.*?#\//, '') : defaultPath;
            return (options[path] || options[defaultPath])();
        })();

        $rootScope.logInWatcher(init);

        function init() {
            return $q.all([
                getProgram1(),
                getProgram2(),
                getProgram3(),
                getProgram4()
            ]).then(function (results) {
                var pass = 0;
                for (var i in results) {
                    if (results[i] !== undefined) {
                        pass++;
                    }
                }
                pass >= 2 && setPrograms(results);
            });

        }

        function setPrograms(programs) {
            for (var i in programs) {
                if (programs[i] !== undefined) {
                    var model = {
                        programName: programs[i].programDetailModel.programName,
                        providerInfo: {
                            providerName: programs[i].providerDetailModel.providerName,
                            schoolType: { isArray: true, items: programs[i].providerDetailModel.typeOfschool },
                            location: { isArray: true, items: adjustArray(programs[i].programDetailModel.locationAddresses, 'locations') }
                        },
                        generalCourseInfo: {
                            cost: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(programs[i].programDetailModel.totalCost),
                            fundingSources: { isArray: true, items: programs[i].programDetailModel.fundingSources },
                            recognitionResults: programs[i].programDetailModel.recognitionResults,
                            durations: { isArray: true, items: adjustArray(programs[i].programDetailModel.programDurations, 'dates') },
                            deliveryType: { isArray: true, items: programs[i].providerDetailModel.whereConductTraining }
                        }
                    }
                }
                programs[i] !== undefined && ($scope.programs['program' + i] = model);
            }
            $scope.tableDataLoaded = true;
        }

        function adjustArray(input, type) {
            var types = {
                locations: function () { return adjustLocations(); },
                dates: function () { return adjustDates(); }
            };

            function adjustLocations() {
                var temp = [];
                for (var i in input) {
                    temp.push(input[i].city);
                }

                return temp;
            }

            function adjustDates() {
                var temp = [];
                for (var i in input) {
                    temp.push($filter('date')(input[i].startDate, 'MM/dd/yyyy') + ' - ' + $filter('date')(input[i].endDate, 'MM/dd/yyyy'));
                }
                return temp;
            }
            var returnType = (types[type])();
            return returnType;
        }

        function getProgram1() {
            var defer = $q.defer();
            if (code1 === undefined) {
                defer.resolve();
            } else {
                trainingProgramsFactory.getProgramDetail({ id: code1 }).$promise.then(function (result) {
                    var program1 = { programDetailModel: result.programDetailModel, providerDetailModel: result.providerDetailModel };
                    defer.resolve(program1);
                }, function () {
                    defer.resolve();
                });
            }

            return defer.promise;
        }
        function getProgram2() {
            var defer = $q.defer();
            if (code2 === undefined) {
                defer.resolve();
            } else {
                trainingProgramsFactory.getProgramDetail({ id: code2 }).$promise.then(function (result) {
                    var program2 = { programDetailModel: result.programDetailModel, providerDetailModel: result.providerDetailModel };
                    defer.resolve(program2);
                }, function () {
                    defer.resolve();
                });
            }

            return defer.promise;
        }
        function getProgram3() {
            var defer = $q.defer();
            if (code3 === undefined) {
                defer.resolve();
            } else {
                trainingProgramsFactory.getProgramDetail({ id: code3 }).$promise.then(function (result) {
                    var program3 = { programDetailModel: result.programDetailModel, providerDetailModel: result.providerDetailModel };
                    defer.resolve(program3);
                }, function () {
                    defer.resolve();
                });
            }

            return defer.promise;
        }
        function getProgram4() {
            var defer = $q.defer();
            if (code4 === undefined) {
                defer.resolve();
            } else {
                trainingProgramsFactory.getProgramDetail({ id: code4 }).$promise.then(function (result) {
                    var program4 = { programDetailModel: result.programDetailModel, providerDetailModel: result.providerDetailModel };
                    defer.resolve(program4);
                }, function () {
                    defer.resolve();
                });
            }

            return defer.promise;
        }

        $scope.$watch('programs', function (n) {
            if (Object.keys(n).length >= 2) {
                $timeout(function () {
                    var temp = [];
                    for (var i = 0; i < Object.keys(n).length; i++) {
                        var height = document.getElementById('program-row-' + i).offsetHeight;
                        temp.push(height.toString() + 'px');
                    }
                    $scope.heights = angular.copy(temp);
                });
            }
        }, true);
    }
})();