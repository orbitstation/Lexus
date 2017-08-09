(function () {
    'use strict';

    var path = "/channels/mgsmil/components/ocs-jobsearch-ad/";

    var module = angular.module('globalApp');

    function GetQueryStringValue(url, field) {
        var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        var value = reg.exec(url);

        return value ? value[1] : null;
    }


    module.component("ocsJobsearchAdComponent", {
        templateUrl: path + 'jsadvertisement.html',
        bindings: {
            keyword: "<",
            location: "<",
            template: "@?",
            adType: "@?",
            position: "@?"
        },
        controllerAs: "model",
        controller: ['$rootScope', '$element', '$timeout', 'screenSize', function JobsearchAdCtrl($rootScope, $element, $timeout, screenSize) {
            var model = this;
            
            if (!model.position || !model.position.length) {
                return;
            }

            var types = {
                'default': 'jsAdvertisementIframeSource.html',
                'banner': 'jsAdvertisementIframeBannerSource.html',
                'mobile': 'jsAdvertisementIframeMobileBannerSource.html',
            }
            var type = types[model.adType] || types['default'];
            model.height = 0;

            var template = model.template;
            function GetSearchCriteria() {
                var keyword = (model.keyword) ? window.encodeURIComponent(model.keyword) : "";
                var location = (model.location) ? window.encodeURIComponent(model.location) : "";
                var position = (model.position) ? window.encodeURIComponent(model.position) : "";
                UpdateIframeUrl(keyword, location, position);
            };

            function UpdateIframeUrl(keyword, location, position) {
                model.iframeUrl = template ?
                    path + template + ".html?q=" + keyword + "&loc=" + location + "&pos=" + position :
                    path + type + "?q=" + keyword + "&loc=" + location + "&pos=" + position;
            }

            function calculateFrameHeight(type) {
                if (iframe[0].contentDocument === null) {
                    return
                }
                var types = {
                    normal: 120,
                    small: 90
                };
                $timeout(function () {
                    var content = iframe[0].contentDocument.getElementsByClassName('jsAdvertisement');
                    var empty = /empty.gif/;
                    var isEmpty = empty.test(content[0].getElementsByTagName('a')[0].href);
                    
                    if (content && !isEmpty) {
                        var height = content[0].offsetHeight;
                        model.height = height > types[type] ? height : types[type];
                    }
                });
            }

            function setMobileHeight() {
                $timeout(function () {
                    model.height = 50;
                });
            }

            model.$onInit = function onInitHandler() {
                GetSearchCriteria();
            };

            //listen for changes to the search criteria - update the keyword and location parameters for the Ad
            $rootScope.$on('$locationChangeSuccess', function SearchCriteriaChanged(event, newSearchUrl) {
                var keyword = GetQueryStringValue(newSearchUrl, "keywords");
                var location = GetQueryStringValue(newSearchUrl, "location");
                
                UpdateIframeUrl(keyword, location, model.position);
            });

            var frameLoaded = false;
            var reCalculate = true;
            var iframe = $element[0].getElementsByTagName('iframe');

            if (iframe.length) {
                screenSize.rules = {
                    lg: '(min-width: 1200px)', // default rule
                    md: '(min-width: 992px) and (max-width: 1199px)', // default rule
                    sm: '(min-width: 768px) and (max-width: 991px)', // default rule
                    xs: '(min-width: 536px) and (max-width: 767px)', // formerly default rule, but extended with custom rule below. 
                    cxs: '(max-width: 537px)'
                }

                iframe[0].onload = function () {
                    if (model.adType === 'mobile') {
                        setMobileHeight();
                        return;
                    }

                    var type = model.adType === 'banner' ? 'small' : screenSize.is('cxs') ? 'small' : 'normal';
                    calculateFrameHeight(type)
                    frameLoaded = true;
                }

                screenSize.on('cxs', function (isTrue) {
                    if (frameLoaded) {
                        if (model.adType === 'mobile') {
                            setMobileHeight();
                            return;
                        }

                        if (isTrue) {
                            !reCalculate && calculateFrameHeight('small');
                            reCalculate = true;
                        } else if (reCalculate) {
                            calculateFrameHeight('normal');
                            reCalculate = false;
                        }
                    }
                });
            }
        }]
    });
})();