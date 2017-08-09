(function () {
    'use strict';
    angular.module('globalApp').directive('ocsUpload', ['$parse', '$rootScope', '$log', 'FileUploader', 'authenticationStorage', 'documentUpload', '_', 'templateUrlService', '$timeout', 'resumesFactory', '$q', directiveFunction]);

    function directiveFunction($parse, $rootScope, $log, FileUploader, authenticationStorage, documentUpload, _, templateUrlService, $timeout, resumesFactory, $q) {
        return {
            restrict: "E",
            scope: {
                meta: "=",                    
                documents: "=",
                extraUploadParams: "=", //extra form params passed with the upload request
                onSuccess: "&",
                onError: "&"
            },

            templateUrl: templateUrlService.get('ocs-Upload.html'),

            link: {
                pre: function (scope, element, attrs) {
                    scope.error = [];
                    var maxItems = (scope.meta && scope.meta.maxItems) || 15;
                    scope.allowedTypes = (scope.meta && scope.meta.allowedTypes) || ['doc', 'docx', 'pdf', 'txt', 'gif', 'jpg', 'rtf'];
                    scope.maxFileSize = (scope.meta && scope.meta.maxFileSize) || 500000;
                    scope.showTitle = (scope.meta && scope.meta.hideTitle) ? false : true;

                    scope.status = {
                        reachedMaxItems: false
                    }

                    scope.$watch("documents.length", function () {
                        checkReachedMaxItems();
                    });
                    
                    var resources;
                    if ($rootScope.productVariables.ChannelID === 10429) {
                        resources = { document: '/trainer/api/me/documents/upload' };
                    } else {
                        resources = { document: '/seeker/api/me/documents/upload' };
                    }

                    var resourceUrl = $rootScope.productVariables.rootUrl + resources['document'];
                    scope.uploader = new FileUploader({
                        url: resourceUrl,
                        withCredentials: false,
                        autoUpload: false,
                        method: 'POST',
                        removeAfterUpload: true,
                        queueLimit: 10
                    });

                    if (typeof scope.extraUploadParams === "object") {
                        _.merge(scope.uploader.formData, scope.extraUploadParams);
                    }

                    scope.uploader.filters.push({
                        name: 'allowedTypeFilter',
                        fn: function (item, options) {                                
                            var fileName = item.name.split('.');
                            var ext = fileName[fileName.length - 1];
                            if (scope.allowedTypes.indexOf(ext) === -1) {
                                return false;                                    
                            }
                            return true;
                        }
                    });

                    scope.uploader.filters.push({
                        name: 'maxSizeFilter',
                        fn: function (item, options) {                                
                            var size = item.size;
                            if (scope.maxFileSize < size) {                                    
                                return false;
                            }
                            return true;
                        }
                    });                        

                    scope.uploader.onWhenAddingFileFailed = function (item, filter, options) {
                        var errorMsg = '';
                        var fileName = item.name.split('.');
                        var ext = fileName[fileName.length - 1];
                        var filterName = filter.name;
                        if (filterName === 'allowedTypeFilter') {                                
                            errorMsg = item.name + ' - ' + $rootScope.msg(378970) + ' ' + ext;
                        }
                        if (filterName === 'maxSizeFilter') {                                
                            errorMsg = item.name + ' - ' + $rootScope.msg(378971) + ' (' + scope.maxFileSize / 1000 + ' kb)';
                        }

                        onFileValidationError(errorMsg);                            
                    };

                    scope.uploader.onAfterAddingAll = function (addedFileItems) {                            
                        if (scope.documents.length + scope.uploader.queue.length > maxItems || addedFileItems.length < 1) {
                            scope.uploader.clearQueue();
                        } else {
                            uploadAll();
                        }
                    }                        

                    scope.uploader.onBeforeUploadItem = function (item) {
                        //update the request and add necessary payload
                        item.formData.push({ 'name': item.file.name });
                        if (typeof scope.extraUploadParams.type !== "undefined"){item.formData.push({ 'type': scope.extraUploadParams.type });}
                        if (typeof scope.extraUploadParams.referenceValue !== "undefined") {item.formData.push({ 'referenceValue': scope.extraUploadParams.referenceValue });}
                        if (typeof scope.extraUploadParams.referenceType !== "undefined"){item.formData.push({ 'referenceType': scope.extraUploadParams.referenceType });}

                        //supply auth header since the underlying scope.uploader service utilize the XMLHttpRequest directly (our http injector is not triggered)
                        //this might be fixed in future release (see https://github.com/nervgh/angular-file-upload/milestones/3.0.0)
                        item.headers = {
                            'Authorization': 'Bearer ' + authenticationStorage.getToken(),
                            'ChannelID': $rootScope.productVariables.ChannelID,
                            'AppID': $rootScope.productVariables.ApplicationID
                        };
                    };

                    scope.uploader.onSuccessItem = function (item) {
                        var fileName = item.file.name;                            
                        onUploadSuccess(fileName);
                    };

                    scope.uploader.onErrorItem = function (item, response) {
                        if (item.cloudInfo === undefined) {
                            onUploadError(item.file.name);
                        }
                    };                                                

                    scope.upload = function () {
                        uploadAll();
                    };

                    scope.browse = function () {
                        var fileUploadEl = angular.element('#fileUpload');
                        fileUploadEl.val(null);
                        fileUploadEl.click();
                    }                                                                        

                    //support for google drive picker                
                    scope.onGDrivePicked = function (fileInfo) {

                        var fileMeta = fileInfo.meta;

                        var file = {
                            name: fileMeta.title,
                            size: fileMeta.fileSize,
                            type: fileMeta.fileExtension,
                            url: fileMeta.downloadUrl,
                            token: fileInfo.token
                        };
                        addToUploadQueue(file);
                        scope.$apply();
                    }

                    //support for google drive picker                
                    scope.onDropBoxPicked = function (filesInfo) {

                        var fileMeta = filesInfo[0];

                        var fileInfo = {
                            name: fileMeta.name,
                            size: fileMeta.bytes,
                            type: getFileSuffix(fileMeta.name),
                            url: fileMeta.link
                        };
                        addToUploadQueue(fileInfo);
                        scope.$apply();
                    }                        

                    function addToUploadQueue(fileInfo) {
                        var fileItem = new FileUploader.FileItem(scope.uploader, {});                            
                        fileItem.file = { name: fileInfo.name, size: fileInfo.size };
                        fileItem.size = fileInfo.size;
                        fileItem.type = fileInfo.type;
                        fileItem.cloudInfo = {
                            'url': fileInfo.url,
                            'authToken': fileInfo.token,
                            'name': fileInfo.name,
                            'type': scope.extraUploadParams.type,
                            'referenceValue': scope.extraUploadParams.referenceValue,
                            'referenceType': scope.extraUploadParams.referenceType
                        };

                        if (typeof scope.extraUploadParams === "object") {
                            _.merge(fileItem.cloudInfo, _.transform(scope.extraUploadParams, _.ary(_.extend, 2), {}));
                        }

                        fileItem.lastModifiedDate = new Date();
                        fileItem.name = fileInfo.name;                            
                        scope.uploader.addToQueue(fileItem);
                    }                        

                    function displayUploadResult(isSuccess, fileName) {
                        var msgSuffix = isSuccess ? ' uploaded' : ' failed to upload';
                        $log.log(" Document " + fileName + msgSuffix);
                    }

                    function getFileSuffix(fileName) {
                        var fileSuffix = "";
                        if (fileName.indexOf(".") >= 0) {
                            var aFileNameParts = fileName.split(".");
                            if (aFileNameParts.length > 1) {
                                var lastItem = aFileNameParts[aFileNameParts.length - 1];
                                fileSuffix = lastItem || '';                                    
                            }
                        }
                        return fileSuffix;
                    }

                    function onUploadSuccess(fileName) {
                        displayUploadResult(true, fileName);
                        if (typeof scope.onSuccess() === "function") {
                            scope.error = [];
                            scope.onSuccess()();
                            removeSpinner();
                        }
                    }

                    function checkReachedMaxItems() {
                        if (maxItems && scope.documents && scope.uploader && scope.uploader.queue) {
                            if ((scope.documents.length + scope.uploader.queue.length) >= maxItems) {
                                scope.status.reachedMaxItems = true;
                            } else {
                                scope.status.reachedMaxItems = false;
                            }
                        }
                    }

                    function onUploadError(fileName) {
                        displayUploadResult(false, fileName);
                        var err = { type: 'alert-danger', text: 'Unable to upload file ' + fileName };
                        if (typeof scope.onError() === "function") {
                            scope.onError()(err);
                        } else {
                            scope.error.push(err);
                        }
                        removeSpinner();
                    }

                    function onFileValidationError(errorMsg) {                            
                        var err = { type: 'alert-danger', text: errorMsg };
                        if (typeof scope.onError() === "function") {
                            scope.onError()(err);
                        } else {
                            scope.error.push(err);
                        }
                    }

                    function localFileUpload(item) {
                        scope.uploader.uploadItem(item);
                    }

                    function cloudFileUpload(item) {
                        scope.uploader.removeFromQueue(item);
                        documentUpload.uploadFromCloud({}, item.cloudInfo).$promise.then(
                            function (response) {
                                onUploadSuccess(response.name);
                            }, function (response) {
                                onUploadError(response.config.data.docName);
                            });
                    }

                    function uploadAll() {
                        scope.isLoaded = false;
                        angular.forEach(scope.uploader.queue, function (item) {

                            // if you are trying to upload a type 'resume' document without a 'resumeValue' present
                            // then it is assumed that you need to first create a resume, and then upload.

                            if (scope.extraUploadParams.type == 'Resume' && scope.extraUploadParams.referenceValue == null) {     
                                createResume().then(function (data) {
                                    
                                    
                                    if (item.cloudInfo) {
                                        item.cloudInfo.referenceValue = data.resumeValue;
                                        cloudFileUpload(item);
                                    } else {
                                        scope.extraUploadParams.referenceValue = data.resumeValue;
                                        localFileUpload(item);
                                    }
                                });
                            } else{
                                if (item.cloudInfo) { cloudFileUpload(item); } else { localFileUpload(item); }
                            }
                        });
                    }

                    function removeSpinner() {
                        $timeout(isLoaded, 500);
                        function isLoaded() {
                            scope.isLoaded = true;
                        }
                    }

                    function createResume() {
                        var deferred = $q.defer();
                        var currentDate = new Date();
                        var resumeTitle = 'resume uploaded on ' + currentDate.toDateString();
                        if ($rootScope.meta.extraUploadParams.referenceValue == null) {
                            var data = {
                                resumeBasics: {
                                    resumeTitle: resumeTitle,
                                    resumeActive: false,
                                    resumeConfidential: false,
                                    resumeStatus: 'Private'
                                },
                                resumeType: "UploadResume"
                            };
                            resumesFactory.createResume(data).$promise.then(function (data) {
                                $rootScope.meta.extraUploadParams.referenceValue = data.resumeValue;
                                $rootScope.track({ name: 'resumeCreated' }); //MGSMIL-548
                                return deferred.resolve(data);
                            });
                        }
                        return deferred.promise;
                    };
                }
            }
        };
    };
})();
