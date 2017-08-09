
(function () {
    "use strict";
    angular.module('miniSPA', ['globalApp'])
    .run(['$rootScope', '$location', 'authentication', 'authenticationStorage', 'registry' , '$window', run]);

    function run($rootScope, $location, authentication, authenticationStorage, registry, $window) {
        // Check for token (and redirect?)
        //console.log("logoutSSO");
        //remove trackuserid from reg
        registry.set('global', 'trackUserID', 0, 'sessionStorage');
        authentication.logout();

        var redirectUrl = getParameterByName("redirect");
        if (redirectUrl) {

            //$window.location.href = redirectUrl;
            //console.log('logoutSSO 1');
            $window.location.replace(redirectUrl);
        }
        else {
            //$window.location.href = "http://www.military.com/member-reg/login.html";
            //console.log('logoutSSO 2');
            $window.location.replace("http://www.military.com/member-reg/login.html");
        }
    }

    function getParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

})();


