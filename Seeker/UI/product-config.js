(function (angular) {
    "use strict";
    angular.module('globalApp')
        .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
            //$ocLazyLoadProvider.config({
            //debug: true,
            //modules: [{
            //    name: 'confirmPageRedirect',
            //    files: ['https://core.ui.lexus.monster.com/scripts/confirmPageRedirect.js']
            //}]
            //});
        }])
        .run(['$rootScope', '$window', '$injector', '$ocLazyLoad', run]);
    var sharedPartialsURL = '/UI/shared/';
    function run($rootScope, $window, $injector, $ocLazyLoad) {

        // this is an independent look up table of configs for the template layout
        $rootScope.configLayout = {
            sessionTimeout: {
                showWarning: { lookUpConfig: { value: 'true', serverId: 'MGS_TIMEOUT_SESSION_WARNING' } },
                timeToWarning: { lookUpConfig: { value: '600000', serverId: 'MGS_TIMEOUT_SESSION_WARNING_TIME' } },
                timeToLogOut: { lookUpConfig: { value: '1200000', serverId: 'MGS_TIMEOUT_SESSION_TIME' } },
                loginPage: { lookUpConfig: { value: '', serverId: 'MGS_TIMEOUT_SESSION_LOGIN_PAGE' } },
                logoutPage: { lookUpConfig: { value: '', serverId: 'MGS_TIMEOUT_SESSION_LOGOUT_PAGE' } }
            },
            header: {
                url: { lookUpConfig: { value: sharedPartialsURL + 'header.html', serverId: '' } },
                show: { lookUpConfig: { value: true, serverId: '' } }
            },
            header2: {
                url: { lookUpConfig: { value: sharedPartialsURL + 'header2.html', serverId: '' } },
                show: { lookUpConfig: { value: false, serverId: '' } }
            },
            menuBar: {
                url: { lookUpConfig: { value: sharedPartialsURL + 'main-menu.html', serverId: '' } },
                show: { lookUpConfig: { value: true, serverId: '' } }
            },
            footer: {
                url: { lookUpConfig: { value: sharedPartialsURL + 'footer.html', serverId: '' } },
                show: { lookUpConfig: { value: true, serverId: '' } }
            },
            footer2: {
                url: { lookUpConfig: { value: sharedPartialsURL + 'footer2.html', serverId: '' } },
                show: { lookUpConfig: { value: false, serverId: '' } }
            },
            spinner: 'dots',

            mainFont: { lookUpConfig: { value: 'https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,400,700|Source+Sans+Pro:300,400,600|Lato:300,400,500,700', serverId: '' } },
            mainIconsFont: { lookUpConfig: { value: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css', serverId: '' } },
            MGS_Breadcrumbs_On: { lookUpConfig: { value: true, serverId: 'MGS_Breadcrumbs_On' } },
            authenticateUsingSAML: { lookUpConfig: { value: 'false', serverId: 'AuthenticateUsingSAML' } },
            idpAuthCookieName: { lookUpConfig: { value: '', serverId: 'MGS_IdpAuthCookieName' } },
            helpTextType: { lookUpConfig: { value: '', serverId: 'MGS_LEXUS_HELP_TEXT_TYPE' } },
            redirectToJv30: { lookUpConfig: { value: 'false', serverId: 'RedirectToJv30' } },
            confirmPageRedirect: { lookUpConfig: { value: 'false', serverId: 'MGS_RedirectPageDetect' } },
            googleAutocomplete: { lookUpConfig: { value: '', serverId: 'GoogleAutocompleteAPIkey' } },
            hiringDomain: { lookUpConfig: { value: '', serverId: 'HiringDomain' } },
            enableLiteReg: { lookUpConfig: { value: '', serverId: 'Lexus_EnableLiteReg' } },
            enableRecentSearches: { lookUpConfig: { value: '', serverId: 'MGS_RECENT_SEARCHES_ENABLED' } },
            enablePoweredBy: { lookUpConfig: { value: '', serverId: 'Lexus_EnablePoweredByText' } },
            enableLogoMessage: { lookUpConfig: { value: '', serverId: 'Lexus_EnableLogoMessage' } },
            militaryServiceEnabled: { lookUpConfig: { value: '', serverId: 'LexusMilitaryServiceEnabled' } }

        };


        var deregisterResolved = $rootScope.$on('preResolved', function () {

            //Lazy loaded services based on configs
            //if ($rootScope.configLayout.confirmPageRedirect.lookUpConfig.value == 'true') {
            //    var serviceName = 'confirmPageRedirect';
            //    $rootScope[serviceName] = false;
            //    $ocLazyLoad.load(serviceName).then(function () {
            //        var confirmPageRedirect = $injector.get(serviceName);
            //        confirmPageRedirect.init(serviceName);
            //    });
            //}

            //console.log($rootScope.configLayout.googleAutocomplete.lookUpConfig.value);
            //if ($rootScope.configLayout.googleAutocomplete.lookUpConfig.value !== '') {
            //$rootScope.configLayout.googleAutocomplete.lookUpConfig.value || 
            //var confVal = 'AIzaSyD0HlOnhp_0PYqZylJT-GMYCfUDjCZyfg0';
            //var scriptSrc = String.format('https://maps.googleapis.com/maps/api/js?key={0}&libraries=places', confVal);
            //addScript(scriptSrc, function () {
            //    console.log('i am loaded', scriptSrc);
            //});
            //}

            deregisterResolved();
        });

        // this needs to mirror the meta object, it will overwrite the end point in the meta object
        $rootScope.configMeta = {

        };
    }
})(angular);


