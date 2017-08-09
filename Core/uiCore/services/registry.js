(function () {
    'use strict';
    angular.module('globalApp').service('registry', ['$rootScope', '$window', '$cookies', serviceFunction]);
    function serviceFunction($rootScope, $window, $cookies) {
        return {
            init: function () {
                this.keepPublicNameSpaceForLoggedOutUser = true;
                this.localStorageSuported = true;  // to debug cookie only mode set this to false
                var registry = { delayedSave: {} };
                var r = JSON.stringify(registry);

                // check and set LocalStorageSuported 
                try { localStorage.setItem('test', '.'); }
                catch (err) { this.localStorageSuported = false; }


                // local storage mode
                if (this.localStorageSuported == true) {

                    // init the registry (on disk)
                    if (!localStorage.registry) {
                        localStorage.setItem('registry', JSON.stringify(registry));
                    }
                    if (!sessionStorage.registry) {
                        sessionStorage.setItem('registry', JSON.stringify(registry));
                    }
                    // init the live registry (rootscope memory object)
                    $rootScope.registry = { localStore: {}, sessionStore: {} };
                    $rootScope.registry.localStore = JSON.parse(localStorage.registry);
                    $rootScope.registry.sessionStore = JSON.parse(sessionStorage.registry);


                    // cookie Only mode
                } else {
                    var encodedStr = encodeURIComponent(r);
                    if (!$cookies.get('localStorage') || $cookies.get('localStorage') == '""') {
                        document.cookie = "localStorage = " + encodedStr;
                    };
                    if (!$cookies.get('sessionStorage') || $cookies.get('sessionStorage') == '""') {
                        document.cookie = "sessionStorage = " + encodedStr;
                    };
                    $rootScope.registry = { localStore: {}, sessionStore: {} };
                    $rootScope.registry.localStore = JSON.parse(decodeURIComponent($cookies.get('localStorage')));
                    $rootScope.registry.sessionStore = JSON.parse(decodeURIComponent($cookies.get('sessionStorage')));
                }
            },





            // standard set and remove for simple variables
            set: function (nameSpace, name, value, type) {
                if (!type) { type = "localStorage" }

                // localStorage Mode
                if (this.localStorageSuported == true) {
                    var storage = (type === 'localStorage') ? localStorage : sessionStorage;
                    if (storage.registry) {
                        var registry = JSON.parse(storage.registry);
                    } else {
                        var registry = {};
                    }
                    if (typeof registry[nameSpace] === 'undefined') { registry[nameSpace] = {}; }
                    if (name != '') {
                        registry[nameSpace][name] = value;
                    }
                    else {
                        registry[nameSpace] = value;
                    }
                    storage.setItem('registry', JSON.stringify(registry));
                    // cookie only Mode
                } else {
                    var registry = JSON.parse(decodeURIComponent($cookies.get(type)));
                    if (typeof registry[nameSpace] === 'undefined') { registry[nameSpace] = {}; }

                    if (name != '') {
                        registry[nameSpace][name] = value;
                    }
                    else {
                        registry[nameSpace] = value;
                    }
                    document.cookie = type + " = " + encodeURIComponent(JSON.stringify(registry));
                }
                this.init();   // re initilize live version of the registry
            },


            setNameSpaceContent: function (nameSpace, value, type) {
                this.set(nameSpace, '', value, type);
            },




            getDelayedSave: function (name, type) {

                if (!type) { type = "localStorage" }

                // localstorage mode
                if (this.localStorageSuported == true) {
                    var storage = (type === 'localStorage') ? localStorage : sessionStorage;
                    return JSON.parse(storage.registry).delayedSave[name];
                }
                    // cookies only mode
                else {
                    return JSON.parse(decodeURIComponent($cookies.get(type))).delayedSave[name];
                }
            },





            getAll: function (type) {
                if (!type) { type = "localStorage" }

                // localstorage mode
                if (this.localStorageSuported == true) {
                    var storage = (type === 'localStorage') ? localStorage : sessionStorage;
                    return JSON.parse(storage.registry);
                }
                    // cookies only mode
                else {
                    return JSON.parse(decodeURIComponent($cookies.get(type)));
                }
            },


            getNameSpaceContent: function (nameSpace, type) {
                return this.get(nameSpace, '', type);
            },



            get: function (nameSpace, name, type) {
                var registry = {};
                if (!type) { type = "localStorage" }

                // localStorage mode
                if (this.localStorageSuported == true) {
                    var storage = (type === 'localStorage') ? localStorage : sessionStorage;
                    registry = JSON.parse(storage.registry);
                    // cookie only mode
                } else {
                    registry = JSON.parse(decodeURIComponent($cookies.get(type)));
                }
                var section = registry[nameSpace];
                if (typeof section !== "undefined") {
                    if (name != '') {
                        return section[name];
                    } else {
                        return section;
                    }
                }
            },





            remove: function (nameSpace, name, type) {
                if (!type) { type = "localStorage" }

                // local storage mode
                if (this.localStorageSuported == true) {
                    switch (type) {
                        case 'localStorage':
                            var registry = JSON.parse(localStorage.registry);           //get current local store of registry
                            if (nameSpace && !name) {
                                if ($rootScope.registry.localStore[nameSpace]) {
                                    delete registry[nameSpace];                             // remove from object if it exsists
                                }
                            }
                            else {
                                if ($rootScope.registry.localStore[nameSpace][name]) {
                                    delete registry[nameSpace][name];                           // remove from object if it exsists
                                }
                            }
                            localStorage.removeItem('registry')                         // remove the registry from local store
                            localStorage.setItem('registry', JSON.stringify(registry)); // set the updated object back to local store
                            break;

                        case 'sessionStorage':
                            var registry = JSON.parse(sessionStorage.registry);             //get current session store of registry
                            if (nameSpace && !name) {
                                if ($rootScope.registry.sessionStore[nameSpace]) {
                                    delete registry[nameSpace];                                 // remove from object if it exsists
                                }
                            }
                            else {
                                if ($rootScope.registry.sessionStore[nameSpace][name]) {
                                    delete registry[nameSpace][name];                           // remove from object if it exsists
                                }
                            }
                            sessionStorage.removeItem('registry');                          // remove the registry from local store
                            sessionStorage.setItem('registry', JSON.stringify(registry));   // set the updated object back to local store
                            break;
                    }
                }
                    // cookie only mode
                else {
                    registry = JSON.parse(decodeURIComponent($cookies.get(type)));

                    switch (type) {
                        case "localStorage":
                            if (nameSpace && !name) {
                                if ($rootScope.registry.localStore[nameSpace]) {
                                    delete registry[nameSpace];                             // remove from object if it exsists
                                }
                            }
                            else {
                                if ($rootScope.registry.localStore[nameSpace][name]) {
                                    delete registry[nameSpace][name];                           // remove from object if it exsists
                                }
                            }
                            break;
                        case "sessionStorage": {
                            if (nameSpace && !name) {
                                if ($rootScope.registry.sessionStore[nameSpace]) {
                                    delete registry[nameSpace];                             // remove from object if it exsists
                                }
                            }
                            else {
                                if ($rootScope.registry.sessionStore[nameSpace][name]) {
                                    delete registry[nameSpace][name];                           // remove from object if it exsists
                                }
                            }
                            break;

                        }

                    }
                    document.cookie = type + ' = ' + encodeURIComponent(JSON.stringify(registry));



                }

                this.init();                                                // re initilize live version of the registry
            },




            purge: function () {
                if (this.localStorageSuported == true) {
                    if (this.keepPublicNameSpaceForLoggedOutUser) {
                        var registryPublic = this.getNameSpaceContent("public", "localStorage");
                    }

                    localStorage.removeItem('registry');
                    sessionStorage.removeItem('registry');

                    if (this.keepPublicNameSpaceForLoggedOutUser) {
                        this.setNameSpaceContent("public", registryPublic, "localStorage");
                    }
                }
                else {
                    document.cookie = 'localStorage = ""';
                    document.cookie = 'sessionStorage = ""';
                    // use cookies
                }
                this.init();
            },

            //type is defaulted to sessionStorage, if need localStorage provide it as a type
            addDelayedSave: function (name, value, type) {
                if (!type) { type = "localStorage" }
                // localstore mode
                if (this.localStorageSuported == true) {
                    var storage = (type === 'localStorage') ? localStorage : sessionStorage;
                    var registry = JSON.parse(storage.registry);
                    if (!registry.delayedSave) registry.delayedSave = {};
                    registry.delayedSave[name] = value;
                    storage.removeItem('registry');
                    storage.setItem('registry', JSON.stringify(registry));
                }
                    // cookie only mode
                else {
                    var registry = JSON.parse(decodeURIComponent($cookies.get(type)));
                    if (!registry.delayedSave) registry.delayedSave = {};
                    registry.delayedSave[name] = value;
                    document.cookie = type + " = " + encodeURIComponent(JSON.stringify(registry));
                }
                this.init();
            },

            removeDelayedSave: function (name, type) {
                if (type === undefined) { type = 'localStorage' };
                // localstorage mode
                if (this.localStorageSuported == true) {
                    if (type == 'localStorage') {
                        var registry = JSON.parse(localStorage.registry);
                        delete registry.delayedSave[name];
                        localStorage.setItem('registry', JSON.stringify(registry));
                    } else {
                        var registry = JSON.parse(sessionStorage.registry);
                        delete registry.delayedSave[name];
                        sessionStorage.setItem('registry', JSON.stringify(registry));
                    }

                }
                    //cookies only mode
                else {
                    var registry = $cookies.get(type);
                    if (registry) {
                        registry = JSON.parse(decodeURIComponent($cookies.get(type)));
                        delete registry.delayedSave[name];
                        document.cookie = type + " = " + encodeURIComponent(JSON.stringify(registry));
                    }
                }
                this.init();
            },





            setDelayedSaveInProgress: function (name, type) {
                //if (this.localStorageSuported == true) {
                //    var storage = (type === 'localStorage') ? localStorage : sessionStorage;
                //    var registry = JSON.parse(storage.registry);
                //    registry.delayedSave[name].saveInProgress = true;
                //    storage.removeItem('registry');
                //    storage.setItem('registry', JSON.stringify(registry));
                //}
                //// use cookies
                //else {
                //    var registry = JSON.parse($cookies.get(type));
                //    registry.delayedSave[name].saveInProgress = true;
                //    document.cookie = type+" = " + JSON.stringify(registry);
                //}
                //this.init();
            },
        }
    }

})();