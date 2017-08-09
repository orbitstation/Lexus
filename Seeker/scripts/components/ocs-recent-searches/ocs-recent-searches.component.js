(function () {
    angular.module('globalApp').component('ocsRecentSearches', {
        bindings: {
            viewType: '@',
            channelClass: '@',
        },
        templateUrl: '/scripts/components/ocs-recent-searches/ocs-recent-searches.component.html',
        controller: ['$scope', '$rootScope', '$element', '$timeout', 'screenSize', function ($scope, $rootScope, $element, $timeout, screenSize) {
            var ctrl = this;

            ctrl.$onInit = function () {
                ctrl.recentSearchesEnabled = $rootScope.configLayout.enableRecentSearches.lookUpConfig.value;

                if (ctrl.recentSearchesEnabled === 'true') {
                    init();
                }
            }

            function init() {
                ctrl.viewType = (function () {
                    var initial = 'other';

                    var types = [
                        'other',
                        'mobile',
                    ];

                    for (var i in types) {
                        if (ctrl.viewType.toLowerCase() === types[i]) {
                            initial = ctrl.viewType.toLowerCase();
                            break;
                        }
                    }

                    return initial;
                })();

                ctrl.isMobile = (function () {
                    return ctrl.viewType === 'mobile';
                })();

                //custom class that should be defined in channel specific customization.less file
                ctrl.channelSpecific = (ctrl.channelClass && typeof ctrl.channelClass === 'string') ? 'recent-searches-' + ctrl.channelClass : '';

                calculateWidth();

                screenSize.when('sm, md, lg', function () {
                    calculateWidth();
                });

                ctrl.itemsSource = [
                    { keyword: 'Test driver', location: 'Boston, MA' },
                    { keyword: 'Nurse', location: 'Washington, DC' },
                    { keyword: 'Accountant', location: 'San Bernardino county, CA' },
                    { keyword: 'Chef', location: 'Los Angeles, CA' },
                    { keyword: 'Commercial pilot long long', location: 'Atlanta, GA' },
                    { keyword: 'QA Tester xxx long long', location: '' },
                ];
            }

            function calculateWidth() {
                $timeout(function () {
                    ctrl.maxWidth = ctrl.viewType === 'mobile' ? 'none' : (Math.floor($element[0].getElementsByClassName('recent-searches-holder')[0].offsetWidth / 2) - 14).toString() + 'px';
                });
            }
        }]
    });
})();

