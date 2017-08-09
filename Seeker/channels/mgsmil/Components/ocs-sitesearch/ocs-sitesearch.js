(function () {
    angular.module('globalApp').component('ocsSiteSearchMil', {
        templateUrl: '/channels/mgsmil/components/ocs-sitesearch/ocs-sitesearch.html',
        controller: ['$element', function ($element) {
            //variables
            var ctrl = this;
            ctrl.$onInit = onInit;
            
            function onInit() {
                ctrl.siteSearch = function (query) {
                    window.location.replace("http://search.military.com/search?q=" + query + "&site=military&client=military&proxystylesheet=military&output=xml_no_dtd&access=p&filter=1&entqr=3&tabname=military");
                };

                ctrl.randomNumber = Math.floor(Math.random() * (1000000 - 1) + 1);

                ctrl.clearQuery = function () {
                    ctrl.searchQuery = '';
                };

                ctrl.clearQuery();

                //console.log($element[0]);
            }
        }]
    });
})();