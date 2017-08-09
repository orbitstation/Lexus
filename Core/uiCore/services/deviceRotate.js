(function () {
    angular.module('globalApp').service('deviceRotate', ['$window', '$rootScope', service]);

    function service($window, $rootScope) {
        return function (callback) {
            var supportsOrientationChange = "onorientationchange" in $window;
            var orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

            $window.onload = updateOrientation();

            $window.addEventListener(orientationEvent, function () {
                updateOrientation();
            }, false);

            function updateOrientation() {
                switch ($window.orientation) {
                    case 0:
                        rotationEvent(0);
                        break;
                    case -90:
                        rotationEvent(-90);
                        break;
                    case 90:
                        rotationEvent(90);
                        break;

                    case 180:
                        rotationEvent(180);
                        break;
                }
                var orientation = ($window.orientation);
            }

            function rotationEvent(deg) {
                $rootScope.$broadcast('rotationChanged', { degree: deg });
                callback();
            }
        }
    }
})();