(function () {
    "use strict";
    angular.module('miniSPA').controller('menuCreatorIndexCtrl', ['$scope', '$rootScope', 'menuCreator', controller]);
    function controller($scope, $rootScope, menuCreator) {
        //                                                                               ________________________
        // _____________________________________________________________________________/   Init Page Variables  \_____
        //  


        //                                                                               ________________________
        // _____________________________________________________________________________/    Get logged-in Data   \_____
        //  get the user's data if logged in
        $rootScope.logInWatcher(function () {

        });

        //                                                                               ________________________
        // _____________________________________________________________________________/                        \_____
        // 

        // set a watch on $scope.buckets
        $scope.$watch('buckets', function () {
            $rootScope.meta.navTemp = menuCreator.create($scope.buckets, $rootScope.meta.navTemp, $rootScope.meta.navMasterItems);
        }, true);


        //$scope.buckets = $rootScope.meta.menuConfig;
        $scope.buckets = [];


        $scope.delete = function (w, key) {
            delete $scope.buckets.splice(key, 1);
        };
        $scope.deleteSub = function (w, key) {
            delete w.bucket.items.splice(key, 1);
            if (w.bucket.items.length === 0) {
                delete w.bucket['items'];
            }
        };

        $scope.addSub = function (j) {
            if (!j.bucket.items) {
                j.bucket.items = [];
            }
            var temp1 = { masterListItem: 'Home' };
            var l = j.bucket.items.length;
            j.bucket.items[l] = temp1;
        };

        $scope.addBucket = function (j) {
            //console.log(j);
            var temp = [{ bucket: { masterListItem: 'Home' } }];
            $scope.buckets = $scope.buckets.concat(temp);
        };

    }

})();









//$scope.createNavJson = function () {
//    $scope.meta.nav1 = {};
//    for (var b in $scope.buckets) {
//        var display = "";
//        var url = "";
//        var icon = "";
//        var queryString = "";
//        var bucketItem = $scope.buckets[b].bucket.masterListItem;
//        for (var item in $scope.meta.navMasterItems) {
//            var masterItem = $scope.meta.navMasterItems[item];
//            if (bucketItem == masterItem.value) {
//                display = masterItem.display.lookUpMsg.value;
//                url = masterItem.url;
//                if (bucketItem == "externalUrl") {
//                    url = $scope.buckets[b].bucket.url;
//                    display = $scope.buckets[b].bucket.display;
//                }
//                if (bucketItem == "CmsPage") {
//                    url = url + $scope.buckets[b].bucket.queryString;
//                    display = $scope.buckets[b].bucket.display;
//                }
//            }
//        }



//        if ($scope.buckets[b].bucket.items) {
//            $scope.meta.nav1[b] = { display: display, icon: icon, queryString: queryString };


//            for (var child = 0; child < $scope.buckets[b].bucket.items.length; child++) {
//                var displayChild = "";
//                var urlChild = "";
//                var iconChild = "";
//                var queryStringChild = "";
//                var bucketItemChildChild = $scope.buckets[b].bucket.items[child].masterListItem;

//                for (var item1 in $scope.meta.navMasterItems) {
//                    var masterItem = $scope.meta.navMasterItems[item1];
//                    if (bucketItemChildChild == masterItem.value) {
//                        displayChild = masterItem.display.lookUpMsg.value;
//                        urlChild = masterItem.url;
//                        if (bucketItemChildChild == "externalUrl") {
//                            urlChild = $scope.buckets[b].bucket.items[child].url;
//                            displayChild = $scope.buckets[b].bucket.items[child].display;
//                        }
//                        if (bucketItemChildChild == "CmsPage") {
//                            urlChild = urlChild + $scope.buckets[b].bucket.items[child].queryString;
//                            displayChild = $scope.buckets[b].bucket.items[child].display;
//                        }
//                    }
//                }
//                if (displayChild != "") {
//                    $scope.meta.nav1[b][child] = { display: displayChild, url: urlChild, icon: iconChild, queryString: queryStringChild };
//                }
//            }

//        }
//        else {

//            $scope.meta.nav2[b] = { display: display, url: url, icon: icon, queryString: queryString };

//        }

//    }

//}

