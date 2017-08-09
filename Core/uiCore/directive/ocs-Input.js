(function () {
    'use strict';
    angular.module('globalApp').directive("ocsInput", ['$rootScope', 'templateUrlService', 'autoCompleteFactory', 'UserAudit', '$timeout', directiveFunction]);

    function directiveFunction($rootScope, templateUrlService, autoCompleteFactory, UserAudit, $timeout) {
        var emailRX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i;
        return {
            restrict: "E",
            scope: {
                meta: "=",
                model: "=",
                addOn: "=",
                addOnBtn: "=",
                addOnBtnFn: "&",
                match: "@",
                valideemail: '@',
                valideemailvalue:'@',
                focus: '@?'
            },
            require: '?model',
            templateUrl: templateUrlService.get('ocs-Input.html'),
            //replace: true,
            controller: ['$scope', function ($scope) {
                if ($scope.valideemail !== undefined) {
                    $scope.$watch(function () { return $scope.singleItemForm; }, function (n, o) {
                        if (n !== undefined) {
                            $scope.checkEmailExists = function () {
                                n.$setValidity('emailexists', true);
                                n.$setDirty();
                                
                                if ($scope.model !== undefined && $scope.model !== $scope.valideemailvalue) {
                                    UserAudit.getUserByEmail({ emailAddress: $scope.model }).$promise.then(function (data) {
                                        if (data.userId > 0) {
                                            n.$setValidity('emailexists', false);
                                            n.$setDirty();
                                        } else {
                                            n.$setValidity('emailexists', true);
                                            n.$setDirty();
                                        }
                                    }, function (err) {
                                        console.log(err);
                                    });
                                }
                            }
                        }
                    });
                }
            }],
            link: function (scope, element, attrs, ctrl) {
                //if (!ctrl) { return; }
                //console.log(ctrl);
                // set the form invalid if there are custom errors displayed
                //scope.$watch("meta.customValidatorNames", function (newValue, oldValue) {
                //    if (oldValue) {
                //        if (newValue.length > 0) {
                            //console.log(ctrl);
                            //ctrl.$setValidity("singleItemForm.$error.skillDupe", true);
                            //console.log('the form is in an error state');
                            //  wrong!! element.singleItemForm.$invalid = true;
                            //  possable solution,  look to contect us page for example
                            //    ctrl.$setValidity('regexValidate', regex.test(value));
                //        }
                //    }
                //});


                scope.getTypeAhead = function () {
                    //var browser = BrowserDetect().init().browser;
                    //console.log(browser);
                    if (scope.model) {
                        if (scope.model.indexOf("-") > -1) {
                            scope.model = scope.model.split(/ - (.+)?/)[1];
                            scope.meta.autoCompleteData = [];
                        } else {
                            if (autoCompleteFactory[scope.meta.autoComplete]) {
                                autoCompleteFactory[scope.meta.autoComplete]({ query: scope.model }).$promise.then(function (data) {
                                    scope.meta.autoCompleteData = data.items;
                                });
                            }
                        }
                    }
                };

                // this incriments the global counter and creates a new uneque ID
                if ($rootScope.IdCounter === undefined) { $rootScope.IdCounter = 0; }
                scope.elementID = "elem_" + $rootScope.IdCounter++;

                setFocus();

                function setFocus() {
                    if (scope.focus && scope.focus == "1") {
                        $timeout(function () {
                            $("input:visible", element[0]).focus();
                        });
                    }
                }

                //allows to resize the form
                scope.formSize = attrs.formSize;

                //if (scope.meta && scope.meta.type === 'email') {
                //    scope.meta.type = 'text';
                //    // This regex doesn't allow for double 
                //    scope.meta.pattern = emailRX;
                //}
                // look up mask name and resolve, if not found then pass value as is
                //temp = $rootScope.productVariables.standardMask[scope.meta.mask];
                //if (temp == undefined) { scope.mask = scope.meta.mask; } else { scope.mask = temp; }

                scope.filter = function (event) {
                    //console.log(event.keyCode);

                    if ((event.keyCode >= 49) && (event.keyCode <= 57)) {
                        c = String.fromCharCode(event.keyCode);
                        if (scope.model == undefined) { scope.model = c; } else { scope.model = scope.model + c; }
                        //event.preventDefault();
                    }
                }

                

                if (scope.meta) {
                    //replace the pattern if its in the look up table
                    if (scope.meta.pattern) {
                        switch (scope.meta.pattern) {
                            case "currency":
                                scope.meta.pattern = /^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$/;
                                break;
                            case "email":
                                scope.meta.pattern = emailRX;
                                break;
                            case "ssn":
                                //scope.meta.pattern = /^(9[0-9]{8})|(000[0-9]{6})|(666[0-9]{6})|([0-9]{3}00[0-9]{4})|([0-9]{5}0000)$/;   // from MGS 1000
                                scope.meta.pattern = /^(?!000)(?!666)(?!9)\d{3}[- ]?(?!00)\d{2}[- ]?(?!0000)\d{4}$/; // http://jsfiddle.net/scottux/7cMV3/ 
                                break;
                            case "integerOnly":
                                scope.meta.pattern = /^\d+$/;
                                break;
                        }
                    }


                    // allows trailing space char on passwords
                    if (scope.meta.type === "password") { scope.trim = false; }


                }

                if (scope.meta && scope.meta.mask) {
                    var maskEvents = (scope.meta.mask && scope.meta.mask.bindMaskEvents) ? scope.meta.mask.bindMaskEvents : 'undefined';

                    if (typeof maskEvents !== 'undefined') {
                        for (var eventName in maskEvents) {
                            element.bind(eventName, function ($event) { });
                        }
                    }
                }



            }
        };

    };

})();

