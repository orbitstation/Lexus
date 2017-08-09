(function () {
    'use strict';
    angular.module('globalApp').directive('ocsHtmlFrame', ['$parse', '$rootScope', '$log', '$sce', '$timeout', 'utilityService', 'deviceRotate', '$window', 'titleService', directiveFunction]);

    function directiveFunction($parse, $rootScope, $log, $sce, $timeout, utilityService, deviceRotate, $window, titleService) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    content: '=',
                    type: '@',
                    src: '@',
                    loaded: '='
                },
                link: function (scope, element, attrs) {
                    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
                    var eventer = window[eventMethod];
                    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
                    var iHeight;

                    var unwatch = scope.$watchGroup(['content', 'src'], function (type) {
                        var iframe = document.createElement('iframe');
                        iframe.width = "100%";
                        iframe.scrolling = "yes";
                        iframe.frameBorder = 0;
                        iframe.height = "800px";

                        if (scope.src && scope.src.length > 0 && !scope.type) {
                            iframe.src = scope.src;
                            iframe.onload = function () {
                                this.style.height = this.contentWindow.document.body.scrollHeight + 20 + 'px';
                                utilityService.replaceCoreEmailLink(this);
                                applyStyles();
                            };
                        }
                        else if (scope.content && !scope.type) {
                            iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(scope.content);
                            iframe.onload = function () { };
                        }
                        else if (scope.src && scope.src.length > 0 && scope.type) {
                            iframe.src = $sce.trustAsResourceUrl(scope.src);
                            eventer(messageEvent, function (e) {
                                if (e.data) {
                                    var iStr = 'iframe';
                                    if (e.data.substring(0, iStr.length) === iStr) {
                                        var data = e.data.substring(iStr.length);
                                        var iData;
                                        try{
                                            iData = JSON.parse(decodeURIComponent(data));
                                            iframe.height = iData.height;
                                            iframe.style.overflow = 'hidden';
                                            document.title = iData.content.title;
                                        }
                                        catch (err) {
                                            console.log(err);
                                        }
                                    }
                                }
                            }, false);
                        }
                        
                        
                        element.empty();
                        element.append(iframe);

                        //apply new styles on device rotate
                        deviceRotate(applyStyles);

                        function applyStyles() {
                            var elem = $('.content-wrapper');
                            var iframeWidth = elem.outerWidth() + 2;
                            if (scope.src.startsWith("/") && elem.find('iframe')[0].contentDocument) {
                                var innerHtml = elem.find('iframe')[0].contentDocument.children[0];
                                $(innerHtml).css({
                                    'overflow-y': 'hidden',
                                    '-webkit-overflow-scrolling': 'touch',
                                    'width': iframeWidth
                                });
                                $(innerHtml.children[1]).css("cssText", "overflow-x: auto !important;");
                            }
                        }
                        unwatch();
                    });
                }
            };
        };
})();