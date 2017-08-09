(function() {
    angular.module("dropbox-picker", [])
        .provider("DropBoxSettings", dropBoxSettings)
        .directive("dropBoxPicker", ["DropBoxSettings", dropBoxDirective]);

    function dropBoxSettings () {
        this.linkType = 'direct',
        this.multiselect = false,
        this.extensions = ['documents', 'images', 'text'],
        this.$get = function () {
            return {
                linkType: this.linkType,
                multiselect: this.multiselect,
                extensions: this.extensions
            }
        },
        this.configure = function (e) {
            for (key in e) this[key] = e[key];
        }
    }

    function dropBoxDirective(DropBoxSettings) {
        return {
            restrict: "A",
            scope: {
                //dbpickerFiles: "=",
                onPicked: '&'
            },
            link: function (scope, element, attrs) {
                function instanciate() {
                    Dropbox.choose(dropboxOptions);
                }

                var dropboxOptions = {
                    success: dropboxsuccess,
                    cancel: function () { },
                    linkType: DropBoxSettings.linkType,
                    multiselect: DropBoxSettings.multiselect,
                    extensions: DropBoxSettings.extensions
                };

                function dropboxsuccess(files) {
                    //scope.$apply(function () {
                    //    for (var i = 0; i < files.length; i++) {
                    //        scope.dbpickerFiles.push(files[i]);
                    //    }
                    //});

                    (scope.onPicked || angular.noop)({ filesInfo: files });
                };

                element.bind("click", function () {
                    instanciate();
                });
            }
        }
    }

})();
