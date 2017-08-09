(function (angular) {
    "use strict";
    angular.module('globalApp').service('adobeTracking', ['$rootScope', '$window', '$q', 'registry', '$route', function ($rootScope, $window, $q, registry, $route) {
        var _config = null;
        var _configured = false;
        var _trackUserID = 0;

        // we're getting out of the "good practices" here - dynamic script loading is always ugly stuff
        // no way around though for the various tracking methods
        function getScript(src) {
            var deferred = $q.defer();
            var s = $window.document.createElement('script');
            s.src = src;
            s.async = true;
            s.onreadystatechange = s.onload = function () {
                if ((!s.readyState || /loaded|complete/.test(s.readyState))) {
                    deferred.resolve();
                }
            };
            $window.document.body.appendChild(s);
            return deferred.promise;
        }

        function getScripts(array) {
            var deferred = $q.defer();

            var loaders = [];

            if (array) {
                angular.forEach(array, function (url) {
                    loaders.push({
                        url: url,
                        getScript: function () {
                            getScript(this.url).then(function () {
                                if (loaders.length == 1) {
                                    deferred.resolve();
                                }
                                else {
                                    // remove first item
                                    loaders.splice(0, 1);
                                    loaders[0].getScript();
                                }
                            });
                        }
                    });
                });
            }
            
            if (loaders.length > 0)
            {
                loaders[0].getScript();
            }
            else
            {
                deferred.resolve();
            }

            return deferred.promise;
        }

        function getProperties()
        {
            if (!$rootScope.isAuthenticated) {
                _trackUserID = 0;
            }
            var result = {
                eVar2: _trackUserID === 0 ? "unrecognized" : "authenticated",
                channel: $rootScope.productVariables.ChannelID.toString(),
                eVar1: "D=g",
                prop1: "D=g",
                eVar4: _trackUserID.toString(),
                version: 0,
                appID: $rootScope.productVariables.ApplicationID,
                channelID: $rootScope.productVariables.ChannelID,
                countryID: $rootScope.productVariables.CountryID,
                pageName: getPageName(),
                events: ""
            };

            if ($rootScope.meta && $rootScope.meta.tracking && $rootScope.meta.tracking.pages) {
                for (var pageName in $rootScope.meta.tracking.pages) {
                    var page = $rootScope.meta.tracking.pages[pageName];
                    if (pageName.toLowerCase() === $route.current.loadedTemplateUrl.toLowerCase() && page.adobe) {
                        if (page.adobe.extras) {
                            for (var x in page.adobe.extras) {
                                var value = page.adobe.extras[x];
                                if (typeof value === "string")
                                {
                                    result[x] = value;
                                    continue;
                                }
                                if (typeof value === "function")
                                {
                                    result[x] = value();
                                    continue;
                                }
                                throw new Error('meta.tracking.pages[\'' + pageName + '\].adobe.extras.' + x + ' should be function or string');
                            }
                        }
                    }
                }
            }

            return result;
        }

        function copy(source, target)
        {
            //clear existing stuff
            for (var x in target) {
                if (x.indexOf('eVar') != -1 || x.indexOf('prop') != -1)
                    delete target[x];
            }

            for (var x in source) {
                target[x] = source[x];
            }


        }


        function afterScriptsLoaded(config) {
            _config = config;

            var trackUserID = $rootScope.registry.sessionStore.global.trackUserID;
            if (typeof trackUserID !== "undefined")
            {
                _trackUserID = trackUserID;
            }

            // at this point global tracking "engine" _m should be defined
            var _m = $window._m;
            var properties = getProperties();
            copy(properties, _m.ATM.s);
            //console.log('Firing adobe tracking impression (miniSPA init) ', properties.pageName, new Date());
            _m.ATM.s.t();

            $rootScope.$watch('registry.sessionStore.global.trackUserID', function (newValue) {
                if (typeof newValue !== "undefined")
                {
                    _trackUserID = newValue;
                    // copy(getProperties(trackUserID), _m.ATM.s);
                    // to track or not to track impression after login - that is the question
                }
            });

            // woo hoo we can track impressions now :)
            $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
                //do not track empty destination routes - '/'
                if (next.loadedTemplateUrl) {
                    var properties = getProperties();
                    //console.log('Firing adobe tracking impression ($routeChangeSuccess) ', properties.pageName, new Date(),next,current);
                    copy(properties, _m.ATM.s);
                    _m.ATM.s.t();
                }
            });
        }

        function getPageName() {
            var pageName = 'undefined';
            if ($route.current && $route.current.loadedTemplateUrl)
            {
                pageName = $route.current.loadedTemplateUrl;
            }
            return _config.pageNamePrefix + pageName;
        }

        function beforeScriptsLoaded(config) {
            if (config.properites) {
                angular.forEach(config.properites, function (property) {
                    switch (property.name) {
                        case "accountName":
                            $window.DYNAMIC_S_ACCOUNT = property.value;
                            return;
                        case "currencyCode":
                            $window.DYNAMIC_S_CURRENCYCODE = property.value;
                            return;
                        case "pageNamePrefix":
                            config.pageNamePrefix = property.value;
                            return;
                    }
                });
            }
        }

        function configure(config) {
            var deferred = $q.defer();
            if (!_configured) {
                _configured = true;
                beforeScriptsLoaded(config);
                getScripts(config.trackingScriptUrls).then(function () {
                    afterScriptsLoaded(config);
                    deferred.resolve();
                });
            }
            else {
                deferred.resolve();
            }

            return deferred.promise;
        }

        return {
            name: "Adobe",
            configure: configure,
            track: function (event) {

                //disable lexus adobe trcaking when using jv30
                if ((event.name == "jobView" && event.usejv30tracking) && $rootScope.configLayout.redirectToJv30.lookUpConfig.value == "true")
                    return;

				var properties = getProperties();
                //MGSPROD-1239 - Removing the pageName attribute for KPI tag
                properties.pageName = ""

                if ($rootScope.meta && $rootScope.meta.tracking && $rootScope.meta.tracking.events)
                {
                    var myEvent = $rootScope.meta.tracking.events[event.name];
                    if (myEvent && myEvent.adobe)
                    {
                        for(var x in myEvent.adobe)
                        {
                            var value = myEvent.adobe[x];
                            if (typeof value === "string")
                            {
                                properties[x] = myEvent.adobe[x];
                                continue;
                            }
                            if (typeof value === "function")
                            {
                                properties[x] = value(event);
                                continue;
                            }
                            throw new Error('meta.tracking.events.' + event.name + '.adobe.' + x + ' should be function or string');
                        }
                    }
                }                
                copy(properties, $window._m.ATM.s);
                console.log('Firing tracking event', properties.pageName, event.name, new Date());
                $window._m.ATM.s.t();
            }
        };
    }]);
})(angular);