(function() {
    "use strict";

    angular.module('globalApp').factory('documentUpload', ['$resource', '$rootScope', factoryFunction]);

    function factoryFunction($resource, $rootScope) {
        var resourceUrl;
        if ($rootScope.productVariables.ChannelID === 10429) {
            resourceUrl = $rootScope.productVariables.rootUrl + '/trainer/api/me/documents';
        } else {
            resourceUrl = $rootScope.productVariables.rootUrl + '/seeker/api/me/documents';
        }
         
        var factory = $resource(resourceUrl + '/:documentId', { documentId: '@documentId' }, {
            query: {
                method: 'GET',
                url: resourceUrl,
                params: { referenceType: '@referenceType', referenceValue: '@referenceValue' },
                isArray: true
            },
            download: {
                method: 'GET',
                url: resourceUrl + '/:documentId/download',
                params: { documentId: '@documentId' },
                //headers: {
                //    accept: '*/*' //todo- we might restrict the accepted mime types
                //},
                responseType: 'arraybuffer',
                cache: false,
                transformResponse: function(data, headers) {
                    var blob = null;
                    if (data) {
                        blob = new Blob([data], {
                            type: headers('content-type') || 'application/octet-stream'
                        });
                    }
                     
                    var fileName = getFileNameFromHeader(headers('content-disposition'));
                    var result = {
                        blob: blob,
                        fileName: fileName
                    };
 
                    return {
                        response: result
                    };
                }
            },
            uploadFromCloud: {
                method: 'POST',
                url: resourceUrl + '/uploadFromCloud'
            }
        });
        return factory;        
    };

    function getFileNameFromHeader(header) {
        if (!header) return null;
        var result = header.split(";")[1].trim().split("=")[1];
        return result.replace(/"/g, '');
    }

})();