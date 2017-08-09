(function(angular){
    'use strict'
    angular.module('miniSPA').controller('jobsCompanyIndexCtrl', controller);
    controller.$inject = ['$rootScope', '$scope', '$routeParams', '$location'];

    function controller($rootScope, $scope, $routeParams, $location) {
        var vm = this;
        vm.alpha = alphabet();
        vm.letter = getLetter();
        vm.changeLetter = changeLetter;
       // vm.isLetter = false;

        function alphabet() {
            return [
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
                'G',
                'H',
                'I',
                'J',
                'K',
                'L',
                'M',
                'N',
                'O',
                'P',
                'Q',
                'R',
                'S',
                'T',
                'U',
                'V',
                'W',
                'X',
                'Y',
                'Z'
            ];
        }

        var companies = [
            'Cablevision Jobs & Careers',
            'Charleston Net Post and Courier Jobs & Careers',
            'Coca Cola Jobs & Careers',
            'Cognizant Technology Jobs & Careers',
            'Comcast Cable Communications Jobs & Careers',
            'Con Edison Jobs & Careers',
            'CVS Caremark Jobs & Careers',
            'CyberCoders Jobs & Careers',
        ];

        vm.companies = companies;

        function changeLetter(letter) {
            var pass = letter && checkLetter(letter);
            if (pass) {
                $location.path('/company/' + letter);
            }
        }

        function getLetter() {
            var letter = $routeParams.letter;
            if (letter) {
                if (checkLetter(letter)) {
                    vm.isLetter = true;
                    return letter;
                }
                vm.isLetter = false;
            } else {
                vm.isLetter = true;
                return 'A';
            }
        }

        function checkLetter(letter) {
            if (letter) {
                for (var i in vm.alpha) {
                    if (letter.toUpperCase() === vm.alpha[i]) {
                        return true;
                    }
                }
                return false;
            }
        }
    }
})(angular);