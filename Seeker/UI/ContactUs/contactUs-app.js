(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute','globalApp'])
    .config(['$routeProvider', function ($routeProvider) {
        var miniSPA = '/contactus/';
        var dir = '/UI' + miniSPA;
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider.
        when(miniSPA, {
            title: '175703',
            templateUrl: dir + 'landing/contactUs-landing.html',
            controller: 'contactUsLandingCtrl'
        }).
        otherwise({
            title: '175703',
            redirectTo: miniSPA
        });
    }]).run(['$rootScope', '$http', '$route', 'titleService', run]);

    function run($rootScope, $http, $route, titleService) {
        // Execute PreResolve Phase
        //var url = '';
        //$http.get(url)
        //    .success(function (data, status, headers, config) {
        //        console.log(headers());
        //        // this callback will be called asynchronously
        //        // when the response is available
        //    })
        //    .error(function (data, status, headers, config) {
        //        // called asynchronously if an error occurs
        //        // or server returns response with an error status.
        //    });

        $rootScope.isLoaded = false;
        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages).then(function () {
            $rootScope.isLoaded = true;
            $rootScope.$watch(function () { return $route.current.title }, function (newVal) {
                titleService.setTitle("", newVal);
            });
        });

        //var req = new XMLHttpRequest();
        //req.open('GET', document.location, false);
        //req.send(null);
        //var headers = req.getAllResponseHeaders().toLowerCase();
        //console.log(headers);
    }

})();

