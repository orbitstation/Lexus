(function () {
    "use strict";
    angular.module('miniSPA').controller('budgetCalculatorIndexCtrl',
        ['$scope', '$rootScope', 'budgetCalculatorFactory', 'screenSize', '_', 'registry', '$uibModal', 'authentication', controller]);

    function controller($scope, $rootScope, budgetCalculatorFactory, screenSize, _, registry, $uibModal, authentication) {
        var tax = 15;
        var storage = 'budgetCalc';
        var storedCalcs = registry.getDelayedSave(storage, 'sessionStorage');
        $scope.errors = [];
        
        //get the user's data if logged in
        $rootScope.logInWatcher(init);

        init();
        function init() {
            if (!$rootScope.isAuthenticated) {
                if (storedCalcs) {
                    $scope.expense = storedCalcs;
                } else {
                    getData();
                }
            } else {
                getData();
            }
            //UTILITIES
            //housing and utilities
            $scope.tempUtility = {};
            $scope.totalUtilities = 0;
            $scope.addCustomUtility = function (expense) {
                //expenseObj, expensesType, expenseTotal, expenseTemp
                addExpense(expense, $scope.expense.utilities, $scope.customUtilities, $scope.tempUtility);
            };
        
            $scope.deleteCustomUtility = function (obj) {
                _.remove($scope.expense.utilities, function (n) {
                    return obj.name === n.name;
                });
            };

            //Live calculation
            $scope.$watch('expense.utilities', function (newVal, oldVal) {
                $scope.totalUtilities = calculateAll(newVal);
                $scope.updateHeight = false;
            }, true);


            //MISCELLANEOUS
            //miscellaneous amounts, loans & credit payments
            $scope.tempMisc = {};
            $scope.totalMisc = 0;
            $scope.addCustomMisc = function (expense) {
                addExpense(expense, $scope.expense.misc, $scope.totalMisc, $scope.tempMisc);
            };

            $scope.deleteCustomMisc = function (obj) {
                _.remove($scope.expense.misc, function (n) {
                    return obj.name === n.name;
                });
            };

            //Live calculation
            $scope.$watch('expense.misc', function (newVal, oldVal) {
                $scope.totalMisc = calculateAll(newVal);
                $scope.updateHeight = false;
            }, true);

            $scope.resetResults = function (arr) {
                angular.forEach(arr, function (value, key) {
                    _.remove(value, function (n) {
                        return n.isCustom === true;
                    });
                    angular.forEach(value, function (item) {
                        //console.log(item);
                        if (item.isCustom === true) {
                            item.name = null;
                            item.amount = null;
                        } else {
                            item.amount = null;
                        }
                    });
                });
            };

            //Watch updated totals and change results
            $scope.$watchGroup(['totalUtilities', 'totalMisc'], function () {
                var total = Number($scope.totalUtilities) + Number($scope.totalMisc);
                var annual = Math.round(total * 12);
                var rawTax = Math.round(annual * (tax/100));
                var taxed = annual + rawTax;
                var hourly = Math.round(taxed / 2080);
                
                $scope.updateHeight = true;

                $scope.totalMonthlyExpense = currencyFormat(total);
                $scope.totalAnnualExpense = currencyFormat(annual);
                $scope.totalAnnualTax = currencyFormat(rawTax);

                $scope.grossSargetSalary = currencyFormat(taxed);
                $scope.netTargetSalary = currencyFormat(annual);
                $scope.targetHourlyRate = currencyFormat(hourly);
                //if going to do autosave...
                //$scope.saveExpenses();
            });
        }

        //Watch on form dirty - triggers session start KPI
        $scope.$watch('globalForm.$dirty', function (newVal, oldVal) {
            if (newVal) {
                $rootScope.track({ name: 'budgetCalculator', tag: 'event17' })
            }
        });

        $scope.saveExpenses = function () {
            if ($rootScope.isAuthenticated) {
                budgetCalculatorFactory.saveExpenses($scope.expense).$promise.then(function (data) {
                    $scope.updateHeight = false;
                    $scope.updateHeight = true;
                    $scope.saveNotify = [
                        {
                            text: $rootScope.msg(367570),
                            type: "alert-success"
                        }
                    ];
                }, function (error) {
                    console.log(error);
                });
            } else {
                //Save to cache
                registry.addDelayedSave(storage, $scope.expense);
                $rootScope.login.boxOpen = true;
            }
            //Session complete KPI
            $rootScope.track({ name: 'budgetCalculator', tag: 'event18', salary: $scope.grossSargetSalary })
        };

        function addExpense(expenseObj, expensesType, expenseTotal, expenseTemp) {
            //var firstIsDigit = !parseInt(expenseObj.name.substring(1, 0));
            if (expenseObj.name && expenseObj.amount) {
                var dup = false;
                for (var key in expensesType) {
                    if (String(expenseObj.name) == expensesType[key].name) {
                        dup = true;
                        expensesType[key].amount = expenseObj.amount;
                        break;
                    }
                }

                if (!dup) {
                    var tempRecord = {
                        name: String(expenseObj.name),
                        amount: expenseObj.amount,
                        isCustom: true
                    };
                    expensesType.push(tempRecord);
                }

                expenseTotal = calculateAll(expensesType);

                //reset temp data to clean up the fields
                for (var prop in expenseTemp) {
                    delete expenseTemp[prop];
                }
            }
        }

        function getData() {
            budgetCalculatorFactory.getExpenses().$promise.then(function (data) {
                $scope.expense = data;
            }, function (error) {
                $scope.errors = [{
                    text: error && error.data && error.data.message ? error.data.message : 'Generic server error',
                    type: 'alert-danger'
                }];
                console.log(error);
            });
        }

        function calculateAll(objs) {
            var temp = 0;
            for (var key in objs) {
                if (objs[key].hasOwnProperty('amount')) {
                    if (objs[key].amount !== NaN) {
                        temp += Number(objs[key].amount);
                    }
                }
            }
            return temp.toFixed(2) || 0;
        }

        function currencyFormat(number) {
            var decimalplaces = 2;
            var decimalcharacter = ".";
            var thousandseparater = ",";
            number = parseFloat(number);
            var sign = number < 0 ? "-" : "";
            var formatted = new String(number.toFixed(decimalplaces));
            if (decimalcharacter.length && decimalcharacter != ".") { formatted = formatted.replace(/\./, decimalcharacter); }
            var integer = "";
            var fraction = "";
            var strnumber = new String(formatted);
            var dotpos = decimalcharacter.length ? strnumber.indexOf(decimalcharacter) : -1;
            if (dotpos > -1) {
                if (dotpos) { integer = strnumber.substr(0, dotpos); }
                fraction = strnumber.substr(dotpos + 1);
            }
            else { integer = strnumber; }
            if (integer) { integer = String(Math.abs(integer)); }
            while (fraction.length < decimalplaces) { fraction += "0"; }
            var temparray = new Array();
            while (integer.length > 3) {
                temparray.unshift(integer.substr(-3));
                integer = integer.substr(0, integer.length - 3);
            }
            temparray.unshift(integer);
            integer = temparray.join(thousandseparater);
            return sign + integer + decimalcharacter + fraction;
        }
    }
})();