(function (angular) {
    angular.module("globalApp").run(['$rootScope', function ($rootScope) {
        $rootScope.channelsTest.skr_techvets = 'skr_techvets';

        $rootScope.meta.logo.src = 'https://securemedia.newjobs.com/id/mgs/' + $rootScope.registry.localStore.global.context.ChannelID + '/US-TechVets-logo-retina@2x.png';
        $rootScope.meta.logoMobile.src = 'https://securemedia.newjobs.com/id/mgs/' + $rootScope.registry.localStore.global.context.ChannelID + '/US-TechVets-logo-retina@2x.png';
        
        angular.extend($rootScope.meta, {});

    }]);
})(angular);