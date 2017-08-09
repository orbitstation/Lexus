(function () {
    "use strict";
    angular.module('miniSPA').controller('optOutAgentsCtrl', ['$scope', '$routeParams', '$location', 'userFactory', 'optOutAgentsFactory', controller]);

    function controller($scope, $routeParams, $location, userFactory, optOutAgentsFactory) {
        var searchObject = $location.search();

        $scope.model = {};
        //$scope.model.token = $routeParams.token;  // use this for a route variable  + add "/:oot" to the app router
        $scope.model.token = searchObject.uid;

        $scope.errorList = [];
        userFactory.getByToken({ token: $scope.model.token }).$promise.then(
            function (response) {
                $scope.email = response.emailAddress;
            });

        $scope.submit = function () {
            var alertMsg = {};
            $scope.errorList = [];
            optOutAgentsFactory.put($scope.model).$promise.then(
                function (data) { //success
                    alertMsg.text = ($scope.model.optOut) ? $scope.msg(117427) : $scope.msg(117428);
                    alertMsg.type = "alert-success";
                    $scope.errorList.push(alertMsg);
                },
                function (error) { //error
                    alertMsg.text = $scope.msg(163773);
                    alertMsg.type = "alert-danger";
                    $scope.errorList.push(alertMsg);
                });
        };

        $scope.$watch('model.survey', function (newValue, oldValue) {
           
            $scope.showOtherComments = false;
            $scope.model.otherComment = '';
            for (var x in $scope.model.survey) {
                if ($scope.model.survey[x] == 12) {
                    console.log($scope.showOtherComments);
                    $scope.showOtherComments = true;
                }
            }
        });
    }

})();