(function () {
    'use strict';
    angular.module('globalApp').directive("ocsResumeUploadedPreview", ['$rootScope', 'resumesFactory', '$http', directiveFunction]);

    function directiveFunction($rootScope, resumesFactory, $http) {
        return {
            restrict: "E",
            bindToController: {
                model: '=',
                documents: '='
            },
            controllerAs: 'ctrl',
            templateUrl: $rootScope.registry.localStore.global.context.templateUrl + 'ocs-resume-uploaded-preview.html',
            controller: function () {

                var ctrl = this;
                ctrl.loading = false;
                ctrl.pdfDocInfo = {};
                ctrl.currentPdfPage = 1;
                ctrl.pdfPreviewImgPercentWidth = 100;
                ctrl.pdfPreviewImgPercentWidthMin = 25;
                ctrl.pdfPreviewImgPercentWidthMax = 200;
                ctrl.fileTypePdf = ".pdf";
                var pdfZoomPercentStep = 25;
                var pdfPreviewCache = [];

                ctrl.getResumePdfNumOfPages = function () {
                    resumesFactory.getResumePdfNumOfPages({ resumeValue: ctrl.model.resumeValue }).$promise.then(function (data) {
                        ctrl.pdfDocInfo = data;
                    }, function (error) {
                        //console.log(error);
                    });
                }

                ctrl.getResumePdfPageAsImage = function () {
                    var url = $rootScope.productVariables.rootUrl + '/seeker/api/me/resumes/' + ctrl.model.resumeValue + '/pdfresume/' + ctrl.currentPdfPage.toString();
                    if (pdfPreviewCache[ctrl.currentPdfPage]) {
                        ctrl.pdfImage = pdfPreviewCache[ctrl.currentPdfPage];
                    } else {
                        ctrl.loading = true;
                        $http.get(url, { responseType: 'blob' }).then(function successCallback(response) {
                            var d = response.data;
                            var blob = new Blob([d], { type: 'image/png' });
                            var src = URL.createObjectURL(blob);
                            ctrl.pdfImage = src;
                            pdfPreviewCache[ctrl.currentPdfPage] = src;
                            ctrl.loading = false;
                        }, function errorCallback(response) {
                            //console.log(response);
                        });
                    }
                }

                ctrl.goToPreviousPage = function () {
                    if (ctrl.currentPdfPage > 1) {
                        ctrl.currentPdfPage--;
                        ctrl.getResumePdfPageAsImage();
                    }
                }

                ctrl.goToNextPage = function () {
                    if (ctrl.currentPdfPage < ctrl.pdfDocInfo.pageNo) {
                        ctrl.currentPdfPage++;
                        ctrl.getResumePdfPageAsImage();
                    }
                }

                ctrl.pdfZoomOut = function () {
                    if (ctrl.pdfPreviewImgPercentWidth > ctrl.pdfPreviewImgPercentWidthMin) {
                        ctrl.pdfPreviewImgPercentWidth = ctrl.pdfPreviewImgPercentWidth - pdfZoomPercentStep;
                    }
                }

                ctrl.pdfZoomIn = function () {
                    if (ctrl.pdfPreviewImgPercentWidth < ctrl.pdfPreviewImgPercentWidthMax) {
                        ctrl.pdfPreviewImgPercentWidth = ctrl.pdfPreviewImgPercentWidth + pdfZoomPercentStep;
                    }
                }

                
                if (ctrl.documents && ctrl.documents[0] && ctrl.documents[0].fileType == ctrl.fileTypePdf) {
                    ctrl.getResumePdfNumOfPages();
                    ctrl.getResumePdfPageAsImage();
                }


            }
        };
    };

})();