(function (angular) {
    angular.module("globalApp")
    .run(['$rootScope', function ($rootScope) {
        var channel = '/channels/mgsmil/';
        $rootScope.channelsTest.mgsmil = 'mgsmil';
        $rootScope.domainName = "http://www.military.com/";

        $rootScope.configLayout.header.show.lookUpConfig.value = false;
        $rootScope.configLayout.menuBar.show.lookUpConfig.value = false;

        $rootScope.configLayout.header2.url.lookUpConfig.value = '/UI/shared/header1.html';
        $rootScope.configLayout.header2.show.lookUpConfig.value = true;

        $rootScope.configLayout.mainFont.lookUpConfig.value = "https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700|Roboto:300,400,500,700";
        $rootScope.configLayout.mainIconsFont.lookUpConfig.value = "https://fonts.googleapis.com/icon?family=Material+Icons";

        $rootScope.configLayout.footer.show.lookUpConfig.value = false;

        $rootScope.configLayout.footer2.url.lookUpConfig.value = channel + 'partials/footer.html';
        $rootScope.configLayout.footer2.show.lookUpConfig.value = true;

        $rootScope.configLayout.spinner = 'circle';

        $rootScope.meta.menuConfig = { lookUpMsg: { id: 377812, text: '' } };
        $rootScope.meta.navMasterItems = { lookUpMsg: { id: 377811, text: '' } };
        $rootScope.meta.menuLogged = { lookUpMsg: { id: 377813, text: '' } };

        $rootScope.logo = {
            url: 'http://www.military.com/'
        };

    }])
    .service('updateResumeIntercept', [function () {
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        return {
            request: function (config) {
                if (config.url.indexOf('/seeker/api/me') > -1 && config.method === 'PUT') {                    
                    var cookie = getCookie('LoginInfo');
                    if (cookie)
                        config.headers['MilLogInfoCookie'] = cookie;
 
                }
                return config;
            }
        }
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('updateResumeIntercept');
    }]);
})(angular);