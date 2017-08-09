(function (angular, Headroom) {

    if (!angular) {
        return;
    }

    function headroom(HeadroomService) {
        return {
            scope: {
                scroller: '@',
                options: '='
            },
            link: function ($scope, $element) {
                //default options
                var options = Object.create(HeadroomService.options);
                newOptions();
                $scope.$watch($scope.options, function (n, o) {
                    if (!angular.equals(n, o)) {
                        newOptions();
                    }
                });

                if ($scope.scroller) {
                    options.scroller = document.querySelector($scope.scroller);
                }
                var headroom = new HeadroomService($element[0], options).init();
                $scope.$on('$destroy', function () {
                    headroom.destroy();
                });

                function newOptions(){
                    if ($scope.options) {
                        angular.merge(options, $scope.options);
                    }
                }

            }
        };
    }

    headroom.$inject = ['HeadroomService'];

    function HeadroomService() {
        return Headroom;
    }

    angular
      .module('headroom', [])
      .directive('headroom', headroom)
      .factory('HeadroomService', HeadroomService);

})(window.angular, window.Headroom);