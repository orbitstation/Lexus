//  pre-resolve all messages : 
//     this creates a list of messages in the meta data for the page, it then gets the messages from the server, and then adds the new data to the meta mesages
//     example : 
//       metaBefore: { lookUpMsg: { id: 364081, text: 'Create Account' } }
//       metaAfter:  { lookUpMsg: { id: 364081, text: 'Create Account' , value: 'Create Account from service' } }
//
(function () {
    'use strict';
    angular.module('globalApp').service('resolveMetaMessages', ['$rootScope', '$q', 'getMessage', runFunction]);
    function runFunction($rootScope, $q, getMessage) {

        //                                                _______________________
        //_______________________________________________/   private functions   \_____________________
        //
        function createList(j, list) {
            if (list == undefined) { var list = [] };
            for (var x in j) {
                if (typeof j[x] === 'object') {
                    if (x === 'lookUpMsg') {
                        var id = j[x].id;
                        var itsNew = true;
                        if (id > 0) {
                            for (var q in list) { if (id == list[q]) { itsNew = false; } }
                            if (itsNew === true) { list.push(id); }
                        }
                    }
                    else { createList(j[x], list) }
                }
            }
            return (list);
        }

        function getData(list) {
            var deferred = $q.defer();
            if (list) {
                var formattedList = [];
                for (var x in list) {
                    formattedList.push('{"id":' + list[x] + '}');
                }
                formattedList = '{"messages":[' + formattedList + ']}';

                getMessage.post(formattedList).$promise.then(function (data) {
                    return deferred.resolve(data.messages);
                });
            }
            return deferred.promise;
        }

        function placeData(j, returnedData) {
            for (var x in j) {
                if (typeof j[x] === 'object') {
                    if (x === 'lookUpMsg') {
                        var id = j[x].id;
                        var text = j[x].text;
                        var msg = lookup(id, returnedData);
                        // if you want message defaults to come from "text:" then add it below
                        if (msg !== undefined) { j[x].value = msg; } else { j[x].value = text; }
                    }
                    else { placeData(j[x], returnedData) }
                }
            }
            return;
        }

        function lookup(id, j) {
            if (j) {
                var r = 0;
                for (r = 0; r < j.length; r++) {
                    if (j[r].id == id) {
                        if (j[r].text) {
                            return (j[r].text);
                        }
                    }
                }
            }
        }
        
        //                                                _______________________
        //_______________________________________________/  messages pre-resolve \_____________________
        //

        return {
            init: function () {
                var deferred = $q.defer();
                getData(createList($rootScope.meta)).then(function (results) {

                    // this is for the debug [M] function
                    $rootScope.serverMessagesObj = results;
                    placeData($rootScope.meta, results);

                    return deferred.resolve($rootScope.meta);
                });
                return deferred.promise;
            }
        }
    }

})();












////below is working code to make the messages "pile up" from page to page, this will cache the messages as they are discovered.
////I have disabled it for now, because we are still creating the product, and this optimization makes it vary difficult to add and or debug new functions.

//var messageCacheType = $rootScope.productVariables.caching.cacheTypesEnum.sharedCache;
//// get data for message Ids in meta 
//function getMessageData(messages) {
//    var deferred = $q.defer();
//    if (messages) {

//        //get cached messages            
//        var cachedMessages = cacheService.provider(messageCacheType).get(getMessagesCacheKey());

//        //find messages not in cache            
//        var msgs = _.map(messages, function (value) { return { 'id': value } });
//        var notCachedIds = _.differenceBy(msgs, cachedMessages, 'id');

//        //if everything is in cache, resolve promise here
//        if (!notCachedIds || notCachedIds.length < 1) {
//            $rootScope.serverMessagesObj = cachedMessages;
//            appendList($rootScope.meta);
//            return deferred.resolve(cachedMessages);
//        }

//        var formattedList = { 'messages': notCachedIds };
//        getMessage.post(formattedList).$promise.then(function (data) {

//            //merge resultset with cached items
//            var messageCacheKey = getMessagesCacheKey();
//            var cacheProvider = cacheService.provider(messageCacheType);
//            var cachedItems = cacheProvider.get(messageCacheKey);

//            //TODO - find out why extend doesn't work here
//            //var allMessages = _.extend(cachedMessages, data.messages);
//            var allMessages = cachedItems || [];
//            for (var i = 0; i < data.messages.length; i++) {
//                allMessages.push(data.messages[i]);
//            }

//            //cache the merged items
//            cacheProvider.addOrUpdate(messageCacheKey, allMessages);

//            //make the items accessible via meta system
//            $rootScope.serverMessagesObj = allMessages;
//            appendList($rootScope.meta);
//            return deferred.resolve($rootScope.meta);
//        });

//    }

//    return deferred.promise;
//}



//function getMessagesCacheKey() {
//    var channelId = $rootScope.productVariables.ChannelID;
//    return 'messages_' + channelId;
//}


