(function ($) {
    'use strict';
    angular.module('globalApp').directive('ocsFontSize', ['cacheService', '$rootScope', 'templateUrlService', directiveFunction]);

    function directiveFunction(cacheService, $rootScope, templateUrlService) {
        return {
            restrict: 'E',
            templateUrl: templateUrlService.get('ocs-FontSize.html'),
            replace: true,
            link: link
        }
        
        function link(scope, elem, attrs) {
            var body = $('body');
            var sizes = [body.css('font-size'), '17px', '20px'];
            var aTags = $(elem).find('a');
            var cacheType = $rootScope.productVariables.caching.cacheTypesEnum.sharedCache;
            var fontSize = cacheService.provider(cacheType).get('fontSize');
            var sizeIndex = (fontSize) ? sizes.indexOf(fontSize) : undefined;

            if (sizes.length === aTags.length && fontSize) {
                activateTag(aTags.eq(sizeIndex), sizes[sizeIndex]);
            } else {
                activateTag(aTags.eq(0), sizes[0]);
            }
            
            for (var i = 0, length = aTags.length; i < length; i += 1) {
                bindTo(aTags.eq(i), i);
            }

            function bindTo(elem, index) {
                elem.on('click', function () {
                    var aTag = $(this);
                    if (!aTag.hasClass('active')) {
                        cacheService.provider(cacheType).addOrUpdate('fontSize', sizes[index]);
                        activateTag(aTag, sizes[index]);
                    }
                });
            }

            function activateTag(target, fontSize) {
                aTags.removeClass('active');
                target.addClass('active');
                body.css('font-size', fontSize);
            }
        }
    }
})(jQuery);