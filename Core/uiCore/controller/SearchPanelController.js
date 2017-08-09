(function () {
    angular.module('globalApp')
        .controller('SearchPanelController', ['$rootScope', '$scope', '$window', '$location', 'autoCompleteFactory', controller]);

    function controller($rootScope, $scope, $window, $location, autoCompleteFactory) {
        $rootScope.search = {
            location: $location.search().where,
            keywords: $location.search().q
        };

        $scope.randomNumber = Math.floor(Math.random() * (1000000 - 1) + 1);

        $scope.search = function () {
            $rootScope.$broadcast('searchClicked');
            var location = $rootScope.search.location ? $rootScope.search.location : '';
            //$rootScope.track({ name: 'jobSearch', location: location, keywords: $rootScope.search.keywords });
            
            if (($window.location.pathname).toLowerCase() == '/jobsearch') {
                // cool we're already there
                $location.search({ location: location, keywords: $rootScope.search.keywords });
            }
            else {
                var sBase = '/jobsearch/jobs';
                var sChar = '?';
                if ($rootScope.search.keywords) {
                    sBase += sChar + 'q=' + encodeURIComponent($rootScope.search.keywords);
                    sChar = '&';
                }
                if (location) {
                    sBase += sChar + 'where=' + encodeURIComponent(location);
                }
                $window.location = sBase;
            }
        };


        $scope.locationHandler = function (userInputString, timeoutPromise) {
            return autoCompleteFactory.locations({ countryId: 164, query: userInputString }, { timeout: timeoutPromise }).$promise;
        };

        $scope.locationFormatter = function (result) {
            return $scope.responseFormatter(result, $rootScope.meta.locationMeta);
        };

        $scope.keywordHandler = function (userInputString, timeoutPromise) {
            return autoCompleteFactory.enhancedsearchjobtitles({ query: userInputString, maxResults: 5 }, { timeout: timeoutPromise }).$promise;
        };

        $scope.keywordFormatter = function (result) {
            return $scope.responseFormatter(result, $rootScope.meta.keywordsMeta);
        };

        $scope.responseFormatter = function (result, meta) {
            if (!meta) return result;


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
    }
})();


