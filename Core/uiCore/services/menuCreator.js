(function () {
    'use strict';
    angular.module("globalApp").service('menuCreator', ['$location', 'utilityService', '$rootScope', service]);

    function service($location, utilityService, $rootScope) {
        this.createBreadCrumbs = function (menuConfig, navMasterItems) {
            if (menuConfig && navMasterItems) {
                var path = $location.absUrl().substr($location.protocol().length + $location.host().length + 3).toLowerCase();
                var pageAlias;
                for (var i = 0; i < navMasterItems.length; i++) {
                    var item = navMasterItems[i];
                    if (item.url && path.startsWith(item.url.toLowerCase())) {
                        pageAlias = item.value;
                        break;
                    }
                }
                if (pageAlias) {
                    var stack = [];
                    utilityService.forEach(menuConfig, function (value, nodes) {
                        if (value.masterListItem && value.masterListItem === pageAlias) {
                            stack = nodes.slice();
                            stack.push(value);
                        }
                    });

                    // always include home
                    var items = [{ display: navMasterItems[0].display, url: menuConfig[0].bucket.url }];
                    //var items = [];

                    for (var j = 0; j < stack.length; j++) {
                        if (stack[j].masterListItem) {
                            for (var i = 0; i < navMasterItems.length; i++) {
                                var navMasterItem = navMasterItems[i];
                                if (navMasterItem.value === stack[j].masterListItem) {
                                    var item = { display: navMasterItem.display };
                                    if (navMasterItem.url !== '/') {
                                        item.url = navMasterItem.url;
                                    }
                                    items.push(item);
                                    break;
                                }
                            }
                        }
                    }
                    //if (items.length > 1) {
                    //    items[items.length - 1].url = null;
                    //}
                    return items;
                }
            }
            return [];
        };

        this.create = function (menuConfig, masterItemList) {

            var menuTarget = {};
            for (var b in menuConfig) {
                var display = "";
                var url = "";
                var icon = "";
                var queryString = "";
                var disabled = false;

                var bucketItem = menuConfig[b].bucket.masterListItem;
                for (var item in masterItemList) {
                    var masterItem = masterItemList[item];
                    
                    if (bucketItem == masterItem.value) {
                        display = (masterItem.display.lookUpMsg) ? masterItem.display.lookUpMsg.value : masterItem.display;
                        url = masterItem.url;
                        if (bucketItem == "icon") {
                            icon = menuConfig[b].bucket.icon;
                            url = menuConfig[b].bucket.url;
                        }
                        if (bucketItem == "externalUrl") {
                            url = menuConfig[b].bucket.url;
                            display = menuConfig[b].bucket.display;
                        }
                        if (bucketItem == "CmsPage") {
                            url = url + menuConfig[b].bucket.queryString;
                            display = menuConfig[b].bucket.display;
                        }
                    }
                }

                if (menuConfig[b].bucket.items) {
                    menuTarget[b] = {};
                    if(display != ''){
                        menuTarget[b]['display'] = display;
                    }
                    if (icon != '') {
                        menuTarget[b]['icon'] = icon;
                    }
                    if (queryString != '') {
                        menuTarget[b]['queryString'] = queryString;
                    }
                    if(url != ''){
                        menuTarget[b]['url'] = url;
                    }
                    if (disabled) {
                        menuTarget[b]['disabled'] = disabled;
                    }
                    //menuTarget[b] = { display: display, icon: icon, queryString: queryString, url: url };


                    for (var child = 0; child < menuConfig[b].bucket.items.length; child++) {
                        var displayChild = "";
                        var urlChild = "";
                        var iconChild = "";
                        var queryStringChild = "";
                        var disabledChild = false;
                        var home;
                        var bucketItemChildChild = menuConfig[b].bucket.items[child].masterListItem;

                        for (var item1 in masterItemList) {
                            var masterItem = masterItemList[item1];
                            if (bucketItemChildChild == masterItem.value) {
                                displayChild = (masterItem.display.lookUpMsg) ? masterItem.display.lookUpMsg.value : masterItem.display;
                                urlChild = masterItem.disabled ? "/" : masterItem.url;
                                disabledChild = masterItem.disabled;
                                if (bucketItemChildChild == "icon") {
                                    displayChild = "";
                                    iconChild = menuConfig[b].bucket.items[child].display;
                                    urlChild = menuConfig[b].bucket.items[child].url;
                                }
                                if (bucketItemChildChild == "externalUrl") {
                                    urlChild = menuConfig[b].bucket.items[child].url;
                                    displayChild = menuConfig[b].bucket.items[child].display;
                                }
                                if (bucketItemChildChild == "cmsPage") {
                                    urlChild = urlChild + menuConfig[b].bucket.items[child].queryString;
                                    displayChild = menuConfig[b].bucket.items[child].display;
                                }

                                
                               
                                home = (masterItemList[item1].home) ? true : false;
                            }
                        }
                        if (displayChild != "") {
                            menuTarget[b][child] = {
                                display: displayChild,
                                url: urlChild,
                                icon: iconChild,
                                queryString: queryStringChild,
                                disabled: disabledChild
                            };
                            if (home != '') {
                                menuTarget[b][child]['home'] = home;
                            }
                        }
                    }

                }
                else {
                    menuTarget[b] = { display: display, url: menuConfig[b].bucket.url, icon: icon, queryString: queryString };
                }

            }
            return menuTarget;
        }

        this.initialize = function (menuObject) {
            if (menuObject && menuObject.lookUpMsg) {
                menuObject = JSON.parse($rootScope.meta.messages[menuObject.lookUpMsg.id].lookUpMsg.value);
            }
            return menuObject;
        };
    }
})();