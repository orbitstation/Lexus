(function () {
    angular.module('globalApp').service('BudgetCalculatorService', ['budgetCalculatorFactory', function (budgetCalculatorFactory) {
        return {
            tax: 15,
            getCalculation: getCalculation
        }

        function getCalculation(utilities, misc) {
            var total = Number(calculateAll(utilities)) + Number(calculateAll(misc));
            var annual = Math.round(total * 12);
            var rawTax = Math.round(annual * (this.tax / 100));
            var taxed = annual + rawTax;
            var hourly = Math.round(taxed / 2080);

            return {
                totalMonthlyExpense: currencyFormat(total),
                totalAnnualExpense: currencyFormat(annual),
                totalAnnualTax: currencyFormat(rawTax),
                grossTargetSalary: currencyFormat(taxed),
                netTargetSalary: currencyFormat(annual),
                targetHourlyRate: currencyFormat(hourly)
            }
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
    }]);
})();
