(function () {
    "use strict";
    angular.module('miniSPA').controller('documentationDirectivesCtrl',['$scope', '$rootScope', 'autocompleteLocationsFactory', documentationDirectivesCtrl]);

    function documentationDirectivesCtrl($scope, $rootScope, autocompleteLocationsFactory)
    {
        $scope.errorList = [
            { text: 'hello', type: 'alert-success' },
            { text: 'hello', type: 'alert-info' },
            { text: 'hello', type: 'alert-warning' },
            { text: 'world', type: 'alert-danger' }
        ];

        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages);
        $scope.checkBoxes = [26949, 26950];
        $scope.modalTest = "";

        $scope.remoteApiHandler = function (userInputString, timeoutPromise) {
            return autocompleteLocationsFactory.get({ countryId: 164, query: userInputString }, { timeout: timeoutPromise }).$promise;
        };

        $scope.modalOkButton = function () {
            alert('Modal OK button clicked with information: ' + $rootScope.modalScope.modalTest);
        };

        $scope.modalCancelButton = function () {
            alert('Modal Cancel button clicked with information: ' + $rootScope.modalScope.modalTest);
        };

        $scope.responseFormatter = function (result) {

            var meta = $scope.meta.autoCompleteRemoteCall;
            if (!meta) { return result; }

            //unwrap root node
            var itemsWrapper = meta.remoteItemsWrapper;
            var unwrappedData = itemsWrapper ? result[itemsWrapper] : result;        

            //removes html tags from the input string
            function htmlToPlaintext(text) {
                return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            }

            var mappedData = [];
            var textField = meta.titlefield;
            var valueField = meta.valuefield;

            //remove html tags
            angular.forEach(unwrappedData, function (value, key) {
                mappedData.push({ id: value[valueField], text: htmlToPlaintext(value[textField]) });
            }, mappedData);

            return mappedData;
        };
    };

})();