(function () {
    angular.module('globalApp')
    .directive("ocsZipCode", ['$rootScope', '$log', 'geoLocation', 'templateUrlService', function ($rootScope, $log, geoLocation, templateUrlService) {
        return {
            restrict: "E",
            scope: {
                meta: "=",
                model: "=",
                state: "=",
                county: "="
            },
            require: '^form', //Needed to traverse up to find form controller

            templateUrl: templateUrlService.get('ocs-ZipCode.html'),

            replace: true,
            link: link
        };

        function link(scope, element, attrs, ctrl) {

            // uneque id creator
            if ($rootScope.IdCounter === undefined) { $rootScope.IdCounter = 0; }
            scope.elimentId = "elem_" + $rootScope.IdCounter++;

            // listen for changes in the model
            scope.$watch(function () {
                return scope.model;
            },
            //when model changes do this
            function handleZipChange(newValue, oldValue) {
                if (newValue) {
                    if (newValue.length === 5 && (!angular.equals(newValue, oldValue) || !scope.isSet)) {
                            ctrl.$setValidity('minlength', true);
                            scope.isSet = true;
                            geoLocation.get({ zipCode: newValue }).$promise.then(
                                function (data) { //success
                                    if (data.isError && data.isError !== undefined) {
                                        scope.county = data.county;
                                        scope.errorMessage = data.message;
                                        ctrl.$setValidity('wrong', false);
                                        return;
                                    }
                                    if (scope.state != null && parseInt(scope.state) != data.stateId) {
                                        ctrl.$setValidity('nomatch', false);
                                        return;
                                    } else {
                                        ctrl.$setValidity('nomatch', true);
                                    }
                                    scope.errorMessage = null;
                                    scope.county = data.county;
                                },
                                function (error) { //error
                                    scope.errorMessage(error.data.message);
                                    scope.county = null;
                                });
                        } else {
                            if (!element.find('input').val()) {
                                scope.county = null;
                            }
                            ctrl.$setValidity('wrong', true);
                            ctrl.$setValidity('nomatch', true);
                            ctrl.$setValidity('minlength', false);
                        }
                    }

                
                });

            
            
            }
    }]);
})();


