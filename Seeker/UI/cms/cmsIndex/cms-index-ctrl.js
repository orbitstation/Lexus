(function () {
    "use strict";
    angular.module('miniSPA').controller('cmsIndexCtrl', ['$scope', '$rootScope', '$route', 'titleService', 'cmsFactory', '_', controller]);
    function controller($scope, $rootScope, $route, titleService, cmsFactory, _) {

        // note: remove this polyfill as soon as IE supports .include
        if (!String.prototype.includes) {String.prototype.includes = function () {'use strict';return String.prototype.indexOf.apply(this, arguments) !== -1;};}

        angular.extend($rootScope.meta, { cmsPage:'indexPage'});
        $scope.meta.jsonEdit = 'false';

        //                                                                       _________________
        // _____________________________________________________________________/ get data Source \_______ 


        $scope.sort = function (sortOn, direction) {
            var sortedList = [];
            if (direction == undefined) { direction = false };
            if (direction == true) { direction = false } else { direction = true};

            var sortedList = $scope.indexList;

            switch (sortOn) {
                case 'url':
                    if (direction) { sortedList = _.sortBy($scope.indexList, function (obj) { return obj.Url.toLowerCase(); }); } else { sortedList = _.sortBy($scope.indexList, function (obj) { return obj.Url.toLowerCase(); }).reverse(); }
                    $scope.meta.urlDirection = direction;
                    break;
                case 'status': 
                    if (direction) { sortedList = _.sortBy($scope.indexList, function (obj) { return obj.Status; }); } else { sortedList = _.sortBy($scope.indexList, function (obj) { return obj.Status; }).reverse(); };
                    $scope.meta.statusDirection = direction;
                    break;
                case 'name':
                    if (direction) { sortedList = _.sortBy($scope.indexList, function (obj) { return obj.Editor; }) } else { sortedList = _.sortBy($scope.indexList, function (obj) { return obj.Editor; }).reverse() }
                    $scope.meta.nameDirection = direction;
                    break;
                case 'date':
                    if (direction) { sortedList = _.sortBy($scope.indexList, function (obj) { return moment(obj.Date).format(); }); } else { sortedList = _.sortBy($scope.indexList, function (obj) { return moment(obj.Date).format(); }).reverse(); }
                    $scope.meta.dateDirection = direction;
                    break;
            }

            $scope.indexList = sortedList;
        }




        $scope.filter = function () {
            var sortedList = [];

            for (var row in masterIndexList) {
                // filter URL
                if ((masterIndexList[row].Url == $scope.model.filterOnUrl) || ($scope.model.filterOnUrl == '0')) {
                    // filter editor
                    if ((masterIndexList[row].Editor == $scope.model.filterOnEditor) || ($scope.model.filterOnEditor == '0')) {
                        // filter staus
                        if ((masterIndexList[row].Status.includes($scope.model.filterOnStatus) && (!($scope.model.filterOnStatus == 'Draft' && masterIndexList[row].Status.includes('Pending')))) || ($scope.model.filterOnStatus == '0')) {

                                // convert the date to (number of days) from today
                                if ($scope.model.filterOnDate != '0') {
                                    var now = moment(new Date());
                                    var end = moment(masterIndexList[row].Date);
                                    var duration = moment.duration(now.diff(end));
                                    var days = Math.round(duration.asDays());
                                }

                                // filter date
                                if ((days <= $scope.model.filterOnDate) && (days > -1) || ($scope.model.filterOnDate == '0')) {
                                    sortedList.push(masterIndexList[row]);  // add it to the filter results list
                                }
                            
                        }
                    }
                }
            }


            $scope.indexList = sortedList;

        
        }

        $scope.model = {};
        var masterIndexList = [
            { Url: 'Youth Microsite', Status: 'Draft v9', Editor: 'MMouse', Date: '06/10/2017', Time: '3:00 pm' },
            { Url: 'Youth Microsite', Status: 'Draft v9', Editor: 'MMouse', Date: '06/09/2017', Time: '3:00 pm' },
            { Url: 'Youth Microsite', Status: 'Draft v9', Editor: 'MMouse', Date: '06/08/2017', Time: '3:00 pm' },
            { Url: 'Youth Microsite', Status: 'Draft v9', Editor: 'MMouse', Date: '06/07/2017', Time: '3:00 pm' },
            { Url: 'Youth Microsite', Status: 'Draft v8', Editor: 'MBoston', Date: '06/04/2017', Time: '11:34 am' },
            { Url: 'Youth Microsite', Status: 'Draft v7', Editor: 'MMouse', Date: '06/03/2017', Time: '3:00 pm' },
            { Url: 'Youth Microsite', Status: 'Draft v6', Editor: 'MBoston', Date: '06/02/2017', Time: '11:34 am' },
            { Url: 'Youth Microsite', Status: 'Draft v5', Editor: 'MBoston', Date: '06/01/2017', Time: '6:54 pm' },
            { Url: 'Youth Microsite', Status: 'Draft v4 [Pending]', Editor: 'MBoston', Date: '06/01/2017', Time: '11:00 pm' },
            { Url: 'Youth Microsite', Status: 'Draft v2', Editor: 'JDuffyperez', Date: '05/15/2017', Time: '7:00 pm' },
            { Url: 'Youth Microsite', Status: 'Draft v1',  Editor: 'MBoston',     Date: '05/14/2017', Time: '2:04 am' },
            { Url: 'Youth Microsite', Status: 'Published', Editor: 'MMouse',      Date: '05/13/2017', Time: '8:32 pm' },
            { Url: 'Youth Microsite', Status: 'Archived',  Editor: 'JDuffyperez', Date: '05/12/2017', Time: '6:11 pm' },
            { Url: 'Youth Microsite', Status: 'Archived',  Editor: 'MMouse',      Date: '05/11/2017', Time: '3:00 pm' },
            { Url: 'Youth Microsite', Status: 'Archived',  Editor: 'MBoston',     Date: '05/11/2017', Time: '11:34 am' },
            { Url: 'Youth Microsite', Status: 'Archived', Editor: 'MMouse',       Date: '05/01/2017', Time: '3:00 pm' },
            { Url: 'Youth Microsite', Status: 'Archived', Editor: 'MBoston',      Date: '05/02/2017', Time: '11:34 am' },
            { Url: 'Military', Status: 'Draft v4', Editor: 'MBoston', Date: '06/01/2017', Time: '6:00 pm' },
            { Url: 'Military', Status: 'Draft v3', Editor: 'MBoston', Date: '05/31/2017', Time: '6:00 pm' },
            { Url: 'Military', Status: 'Draft v4', Editor: 'MBoston', Date: '05/30/2017', Time: '6:00 pm' },
            { Url: 'Military', Status: 'Draft v3', Editor: 'MBoston', Date: '05/29/2017', Time: '6:00 pm' },
            { Url: 'Military', Status: 'Draft v4', Editor: 'MBoston', Date: '05/28/2017', Time: '6:00 pm' },
            { Url: 'Military', Status: 'Draft v3', Editor: 'MBoston', Date: '05/27/2017', Time: '6:00 pm' },
            { Url: 'Military', Status: 'Draft v2', Editor: 'MBoston', Date: '05/26/2017', Time: '6:00 pm' },
            { Url: 'Military', Status: 'Draft v1', Editor: 'MBoston', Date: '05/25/2017', Time: '6:00 pm' },
            { Url: 'Military', Status: 'Published', Editor: 'JDuffyperez', Date: '05/28/2017', Time: '6:00 pm' },
            { Url: 'Military', Status: 'Archived', Editor: 'MBoston', Date: '05/11/2017', Time: '6:00 pm' },
            { Url: 'Military', Status: 'Archived', Editor: 'MMouse', Date: '05/01/2017', Time: '6:00 pm' },


        ]
        masterIndexList = _.sortBy(masterIndexList, function (obj) { return moment(obj.Date).format(); }).reverse();
        $scope.indexList = masterIndexList;






    }

})();