(function () {
    "use strict";
    angular.module('miniSPA', ['ngRoute', 'globalApp'])
    .config(['$routeProvider',
      function ($routeProvider) {
          var miniSPA = '/savedSearches/';
          var dir = '/UI' + miniSPA;
          $routeProvider.caseInsensitiveMatch = true;
          $routeProvider.
          when(miniSPA, {
              title:'306850',
              templateUrl: dir + 'index/savedSearches-index.html',
              controller: 'savedSearchesIndexCtrl'
          }).
          when(miniSPA + 'edit/:id', {
              title: '347082',
              templateUrl: dir + 'edit/savedSearches-edit.html',
              controller: 'savedSearchesEditCtrl'
          }).
          when(miniSPA + 'optOutAgents/', {
              title: '306850',
              templateUrl: dir + 'optOutAgents/optOutAgents.html',
              controller: 'optOutAgentsCtrl'
          }).

          otherwise({
              title: '306850',
              redirectTo: miniSPA
          });
      }]).run(['$rootScope', '$route', 'titleService', run]);

    function run($rootScope, $route, titleService) {
        // Execute PreResolve Phase
        $rootScope.isLoaded = false;
        $rootScope.preResolvePhase($rootScope.meta, $rootScope.messages).then(function () {
            $rootScope.isLoaded = true;
            $rootScope.$watch(function () { return $route.current.title }, function (newVal) {
                titleService.setTitle("", newVal);
            });
        });
    }

})();
