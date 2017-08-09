(function ($) {
    "use strict";
    // various helper functions; as a rule of thumb if function you're about to add needs 
    // any dependency (existing service, factory, etc.) it doesn't belong here
    angular.module("globalApp").service("utilityService", [utilityService]);

    function utilityService() {
        return {
            tokenize: tokenize,
            forEach: forEach,
            setItemsDisable: setItemsDisable,
            replaceCoreEmailLink: replaceCoreEmailLink,
            getShortenedText: getShortenedText,
            resetAllDisabled: resetAllDisabled,
            destroyWatchers: destroyWatchers,
            onOpenCloseWatcher: onOpenCloseWatcher,
            checkForValuesByType: checkForValuesByType,
            scrollTop: scrollTop,
            findBottomPosition: findBottomPosition,
            removeInlineStyle: removeInlineStyle,
            getElemPositionFromTop: getElemPositionFromTop
        }
    }

    function tokenize(phrase) {
        var maxLength = 100;

        if (!phrase) {
            return phrase;
        }

        var returnString = phrase.toLowerCase();
        //Convert Characters
        returnString = returnString.replace(/ö/g, 'o');
        returnString = returnString.replace(/ç/g, 'c');
        returnString = returnString.replace(/ş/g, 's');
        returnString = returnString.replace(/ı/g, 'i');
        returnString = returnString.replace(/ğ/g, 'g');
        returnString = returnString.replace(/ü/g, 'u');

        // if there are other invalid chars, convert them into blank spaces
        returnString = returnString.replace(/[^a-z0-9\s-]/g, "");
        // convert multiple spaces and hyphens into one space       
        returnString = returnString.replace(/[\s-]+/g, " ");
        // trims current string
        returnString = returnString.replace(/^\s+|\s+$/g, "");
        // cuts string (if too long)
        if (returnString.length > maxLength)
            returnString = returnString.substring(0, maxLength);
        // add hyphens
        returnString = returnString.replace(/\s/g, "-");

        return returnString;
    }

    function forEach(node, callback) {
        var stack = [{ node: node, path: [] }];
        var walked = [];
        while (stack.length > 0) {
            var item = stack.pop();
            var node = item.node;
            var key;
            for (key in item.node) {
                if (typeof node[key] === 'object' && !key.startsWith('$')) {
                    var alreadyFound = false;
                    for (var i = 0; i < walked.length; i++) {
                        if (walked[i] === node[key]) {
                            alreadyFound = true;
                            break;
                        }
                    }
                    if (!alreadyFound) {
                        var path = item.path.slice();
                        path.push(node);
                        stack.push({ node: node[key], path: path });
                        if (callback) {
                            callback(node[key], path.slice());
                        }
                    }
                }
            }
        }
    }


    

    function replaceCoreEmailLink(frame) {
        var frameDoc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument;
        var emailLink = frameDoc.querySelector('ContactEmailLink');
        if (emailLink) {
            emailLink.href = '#';
            $(emailLink).on('click', function () {
                top.window.location.hash = top.window.location.hash + '/apply-by-email';
            });
        }
    }

    function getShortenedText(text, maxlength) {
        if (text && maxlength) {
            return (text.length > maxlength) ? text.substr(0, maxlength) + "..." : text;
        } else {
            return text;
        }
    }

    //for meta items like dropdowns
    function setItemsDisable(targetValue, itemsList, bool) {
        for (var y in itemsList) {
            var v = itemsList[y].value;
            if (v != undefined) {
                if (v == targetValue) {
                    itemsList[y].disabled = bool;
                    break;
                }
            }
        }
    }

    function resetAllDisabled(itemsList, bool) {
        if (itemsList) {
            for (var y in itemsList) {
                itemsList[y].disabled = bool;
            }
        }
    }

    //destroy watchers array
    function destroyWatchers(watchersArr) {
        if (watchersArr !== undefined) {
            for (var i = 0; i < watchersArr.length; ++i) {
                if (typeof watchersArr[i] === 'function') {
                    watchersArr[i]();
                }
            }
        }
    }

    function onOpenCloseWatcher(target, onOpen, onClose, scope) {
        if (typeof target === 'function') {
            var un = scope.$watch(target, function (n, o) {
                if (n === true) {
                    onOpen(n);
                } else if (n === false && o !== false && o !== undefined) {
                    onClose(n);
                }
            });
            return un;
        }
    }

    function checkForValuesByType(test, type, recursive) {
        if (typeof test === 'object') {
            for (var i in test) {
                if (typeof test[i] === type) {
                    if (typeof test[i] === type && test[i] === -1) {
                        continue;
                    }
                    else if (typeof test[i] === type && test[i] === false) {
                        continue;
                    }
                    else if (test[i]) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
    }

    function scrollTop(elem) {
        if(elem){
            $(elem).scrollTop(0);
        } else {
            $('body').scrollTop(0);
        }
    }

    function findBottomPosition(elem) {
        var $elem = $(elem);
        return $elem.position().top + $elem.offset().top + $elem.outerHeight(true);
    }

    function removeInlineStyle(selector) {
        selector.attr('style', function (i, style) {
            if (style) {
                return style.replace(style, '');
            }
        });
    }

    function getElemPositionFromTop(elem) {
        return $(elem).offset().top - $(window).scrollTop();
    }

})(jQuery);