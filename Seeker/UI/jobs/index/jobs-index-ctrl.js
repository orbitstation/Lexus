(function(angular){
    'use strict';

    angular.module('miniSPA').controller('jobsIndexCtrl', controller);
    controller.$inject = ['$rootScope', '$scope'];

    function controller($rootScope, $scope) {

        var vm = this;
        vm.test = 'This is a test';
        vm.alpha = alphabet();
        vm.jobsByLoc = jobsByLoc();
        vm.jobsByCat = jobsByCategory();
        vm.switch = "Two";
       
        function jobsByLoc() {
            return [
                'Alabama Jobs',
                'Alaska Jobs',
                'Arizona Jobs',
                'Arkansas Jobs',
                'California Jobs',
                'Colorado Jobs',
                'Connecticut Jobs',
                'Delaware Jobs',
                'District of Columbia Jobs',
                'Florida Jobs',
                'Georgia Jobs',
                'Guam Jobs',
                'Hawaii Jobs',
                'Idaho Jobs',
                'Illinois Jobs',
                'Indiana Jobs',
                'Iowa Jobs',
                'Kansas Jobs',
                'Kentucky Jobs',
                'Louisiana Jobs',
                'Maine Jobs',
                'Maryland Jobs',
                'Massachusetts Jobs',
                'Michigan Jobs',
                'Minnesota Jobs',
                'Mississippi Jobs',
                'Missouri Jobs',
                'Montana Jobs',
                'Nebraska Jobs',
                'Nevada Jobs',
                'New Hampshire Jobs',
                'New Jersey Jobs',
                'New Mexico Jobs',
                'New York Jobs',
                'North Carolina Jobs',
                'North Dakota Jobs',
                'Ohio Jobs',
                'Oklahoma Jobs',
                'Oregon Jobs',
                'Pennsylvania Jobs',
                'Puerto Rico Jobs',
                'Rhode Island Jobs',
                'South Carolina Jobs',
                'South Dakota Jobs',
                'Tennessee Jobs',
                'Texas Jobs',
                'Utah Jobs',
                'Vermont Jobs',
                'Virgin Islands Jobs',
                'Virginia Jobs',
                'Washington Jobs',
                'West Virginia Jobs',
                'Wisconsin Jobs',
                'Wyoming Jobs'
            ];
        }

        function jobsByCategory() {
            return [
                'Accounting Jobs',
                'Administrative Jobs',
                'Advertising Jobs',
                'Aeronautics Jobs',
                'Agriculture and Fishing Jobs',
                'Animal Services Jobs',
                'Automotive Jobs',
                'Banking Jobs',
                'Biotech Jobs',
                'Business Jobs',
                'Charity Jobs',
                'Construction Jobs',
                'Creative Design Jobs',
                'Customer Service Jobs',
                'Editorial Jobs',
                'Education Jobs',
                'Energy Jobs',
                'Engineering Jobs',
                'Environmental Jobs',
                'Executive Jobs',
                'Finance Jobs',
                'Food Services Jobs',
                'Full Time Jobs',
                'Government Jobs',
                'Healthcare Jobs',
                'Hospitality Jobs',
                'Human Resources Jobs',
                'Human Services Jobs',
                'Insurance Jobs',
                'International Jobs',
                'Internet Jobs',
                'IT Jobs',
                'Language Translator Jobs',
                'Legal Jobs',
                'Logistics Jobs',
                'Maintenance Jobs',
                'Manufacturing Jobs',
                'Marketing Jobs',
                'Media Jobs',
                'Military Jobs',
                'Overseas Jobs',
                'Part Time Jobs',
                'Pemaju Jobs',
                'Personal Services Jobs',
                'Production and Ops Jobs',
                'Project Management Jobs',
                'Quality Assurance Jobs',
                'R & D Jobs',
                'Real Estate Jobs',
                'Religious Jobs',
                'Retail Jobs',
                'Sales Jobs',
                'Science Jobs',
                'Security Jobs',
                'Skilled Trades Jobs',
                'Sports Jobs',
                'Technology Jobs',
                'Telecommunications Jobs',
                'Transportation Jobs',
                'Travel Jobs',
                'Web Jobs',
            ];
        }

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

    }
})(angular);