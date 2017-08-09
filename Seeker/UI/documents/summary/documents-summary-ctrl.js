(function () {
    "use strict";
    angular.module('miniSPA').controller('documentsSummaryCtrl', ['$scope', '$rootScope', '$log', 'documentUpload', '$window', '$uibModal', controller]);
    function controller($scope, $rootScope, $log, documentUpload, $window, $uibModal) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  
        
        $scope.errorList = [];
        $scope.maxItems = $rootScope.config.documentUpload.maxItems;

        // init template variables
        $scope.documents = [];
        
        //$scope.uploadMsg = ' ';

        function init() {
            if ($rootScope.isAuthenticated)
            {
                documentUpload.query().$promise.then(
                    function (result) {
                        $scope.documents = result;
                    }
                );
            }
        }        

        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(init);
        init();


        //                                                                               ________________________
        // _____________________________________________________________________________/    Upload callbacks   \_____
        //  
        $scope.onUploadError = function (error) {
            $scope.errorList = [error];
        };

        $scope.onUploadSuccess = function () {
            init();
        };

        //                                                                               ________________________
        // _____________________________________________________________________________/        Download        \_____
        // 
        
        $scope.downloadFile = function (docId) {
            return documentUpload.download({ documentId: docId }).$promise.then(
                function (data) {
                    var blob = data.response.blob;
                    var fileName = data.response.fileName || 'download.bin';

                    //using saveAs.js (part of upcoming HTML5 API, but so far a polyfill in filesaver.min.js)                
                    $window.saveAs(blob, fileName);
                },
                function(error, status, config, statusText) {
                    //$scope.labelType = 'alert-danger';
                    //$scope.uploadMsg = "Error: Unable to download file.";
                    $log.log('Error: Unable to download file.');
                }
            );
        };

        //                                                                               ________________________
        // _____________________________________________________________________________/         Delete         \_____
        $scope.deleteDocument = function (id) { 
            this.open(function() {
                var data = { documentId: id };
                documentUpload.delete({}, data, function () {
                    //console.log("deleting: " + id);

                    var itemIndex = findIndexByKey($scope.documents, 'id', id);
                    if (itemIndex > -1) {
                        var removedItems = $scope.documents.splice(itemIndex, 1);
                        //$scope.labelType = 'alert-success';
                        //$scope.uploadMsg = "Document " + removedItems[0].name + " deleted.";
                        $log.log("Document " + removedItems[0].name + " deleted.");
                    }                    
                });
            });                            
        };        

        //                                                                               ________________________
        // _____________________________________________________________________________/     Misc. Functions    \_____        

        function findIndexByKey(arraytosearch, key, valuetosearch) {

            for (var i = 0; i < arraytosearch.length; i++) {

                if (arraytosearch[i][key] === valuetosearch) {
                    return i;
                }
            }
            return -1;
        }        

        // modal window open function
        $scope.open = function (onSuccess) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                }
            });

            modalInstance.result.then(function () {
                onSuccess();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };       
    }
})();