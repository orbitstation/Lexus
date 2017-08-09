var globalApp = angular.module('globalApp', [
    "ngAnimate",
    "ui.bootstrap",
    "ui.mask",
    "ui.validate",
    "ui.tinymce",
    "ngResource",
    "ngRoute",
    "ngCookies",
    "ngSanitize",
    "angucomplete-alt",
    'jcs.angular-http-batch',
    "angular-cache",
    "lodash",
    "angular.bind.notifier",
    "lk-google-picker",
    "dropbox-picker",
    "vcRecaptcha",
    "sticky",
    'headroom',
    "matchMedia", //https://github.com/jacopotarantino/angular-match-media
    "oc.lazyLoad"
]);

//
//   this config should be in a service and off of this page
//
//
(function () {
    'use strict';
    angular.module('globalApp').config(['$httpProvider', function ($httpProvider) {
        function detectIE() {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }
            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }
            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                // Edge (IE 12+) => return version number
                return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }
            // other browser
            return false;
        }

        if (detectIE() === 11 || detectIE() === 10 || detectIE() === 9) {
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        }
    }]);


    angular.module('globalApp').config(['$logProvider', 'lkGoogleSettingsProvider', 'DropBoxSettingsProvider', configFunction]);

    function configFunction($logProvider, lkGoogleSettingsProvider, DropBoxSettingsProvider) {
        $logProvider.debugEnabled(true);

        ///TODO: Move ApiKey and ClientId to ChannelConfig.
        lkGoogleSettingsProvider.configure({
            apiKey: 'AIzaSyAgqvKJrJAl_fkYueUcH9fuz7yJJiyUobU', 
            clientId: '795743966271-muv79fkqpjhqo8pan5rp7b9gedl4b1vm.apps.googleusercontent.com',
            scopes: ['https://www.googleapis.com/auth/drive.readonly']
        });

        DropBoxSettingsProvider.configure({
            linkType: 'direct',//dropbox link type
            multiselect: false,//dropbox multiselect
            extensions: ['.pdf', '.doc', '.docx', '.gif', '.jpg', '.png']//dropbox file extensions
        });
    };

})();

(function (angular) {
    'use strict';
    angular.module('globalApp').config([
      '$provide',
      function ($provide) {
          $provide.decorator('$templateCache', ['$delegate', function ($delegate) {
              var originalGet = $delegate.get;
              var originalPut = $delegate.put;

              $delegate.get = function (key) {
                  return originalGet(key.toLowerCase());
              };
              $delegate.put = function (key, value) {
                  originalPut(key.toLowerCase(), value);
              };

              return $delegate;
          }]);

          return this;
      }
    ]);
})(angular);

(function (angular) {
    'use strict';
    angular.module('globalApp').config(['$sceDelegateProvider', function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
          // Allow same origin resource loads.
          'self',
          // Allow loading from our assets domain.  Notice the difference between * and **.
          'https://core.ui.lexus.monster.com/**',
        'https://qax5-core.ui.lexus.monster.com/**']);
    }]);
})(angular);

//
//  Batching URL hack
//
var disablebatchingcookie = 'disablebatching';

var batchingparam = getParameterByName(disablebatchingcookie);
if(batchingparam) {
    setCookie(disablebatchingcookie, batchingparam, 1);
} else {
    batchingparam = getCookie(disablebatchingcookie);
}

if(batchingparam != "true") {
(function (angular) {
    'use strict';
    angular.module('globalApp').config(['httpBatchConfigProvider',
       function (httpBatchConfigProvider) {
           httpBatchConfigProvider.setAllowedBatchEndpoint(
                'https://services.lexus.monster.com',
                'https://services.lexus.monster.com/api/batch',
                {
                    maxBatchedRequestPerCall: 20,
                    excludes: [
                        'pdfresume'
                    ]
                });
       }
    ]);
})(angular);
}

//
// EO
//

// configure tracking providers
(function () {
    'use strict';
    angular.module('globalApp').run(['trackService', 'adobeTracking', 'inlineScriptTracking', runFunction]);
    function runFunction(trackService, adobeTracking, inlineScriptTracking) {
        trackService.addSink(adobeTracking);
        trackService.addSink(inlineScriptTracking);
    }
})();

// this should be the only run on this page
(function () {
    'use strict';

    angular.module('globalApp').run(['$rootScope', 'productVariables', 'lookUpGlobalJson', 'logInWatcher', 'gotoAnchor', 'registry', 'contextService', 'coreUiTemplateService', 'trackService', runFunction]);
    function runFunction($rootScope, productVariables, lookUpGlobalJson, logInWatcher, gotoAnchor, registry, contextService, coreUiTemplateService, trackService) {
        registry.init();          // initilizes the regestry from web storage
        contextService.init();
        coreUiTemplateService.init(); // caches templates; note this service is being defined via gulp
        productVariables.init();  // adds the rootscope product variables
        lookUpGlobalJson.init();  // add rootscope functions for the templates to get messages and configs
        logInWatcher.init();      // adds the log in rootscope watcher function
        gotoAnchor.init();        // adds an angular polyfill to goto #anchor 
        trackService.init();      // add track function 




    }

})();


// this needs to be refactored so it can work fron the above function
(function () {
    'use strict';

    // has to run after rootScope was initialized
    angular.module('globalApp').run(['authentication', '$rootScope', 'timeoutManager', runFunction]);
    function runFunction(authentication, $rootScope, timeoutManager) {
        authentication.scheduleRenewal();
    };


})();

//
// TEMP BATCHING OVERRIDE
// DELETE AFTER 500 IS SOLVED
//

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function getParameterByName(name, url) {
    if (!name) return "";
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//
// EO
//