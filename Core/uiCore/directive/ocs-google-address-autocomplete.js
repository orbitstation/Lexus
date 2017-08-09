(function () {
    angular.module('globalApp')
        .directive('ocsGoogleAddressAutoComplete', ocsGoogleAddressAutoComplete);
    ocsGoogleAddressAutoComplete.$inject = ['templateUrlService', '$rootScope'];
    function ocsGoogleAddressAutoComplete(templateUrlService, $rootScope) {
        return {
            //replace: true,
            require: 'ngModel',
            scope: {
                meta: '=',
                ngModel: '=',
                googleModel: '=',
                onSelect: '&?',	// optional callback on selected successfully: 'onPostedBid(googleModel)'.
                formSize: '@'
            },
            templateUrl: templateUrlService.get('ocs-GoogleAddressAutoComplete.html'),
            link: function ($scope, element, attrs, model) {
                var googleOptions = {
                    types: ['address'],  // change or empty it, if you want no restrictions 
                    componentRestrictions: { country: 'us' }  // change or empty it, if you want no restrictions
                };

                $scope.elementID = attrs.id + '-location-autocomplete';

                var inputFound = $(element[0]).find('input')[0];

                var autocomplete = new google.maps.places.Autocomplete(inputFound, googleOptions);
                google.maps.event.addListener(autocomplete, 'place_changed', function () {

                    /**
                     * Search gor the passed 'type' of info into the google place component
                     * @param {type} components
                     * @param {type} type
                     * @returns {type} 
                     */
                    function extract(components, type) {
                        for (var i = 0; i < components.length; i++)
                            for (var j = 0; j < components[i].types.length; j++)
                                if (components[i].types[j] == type) return components[i].short_name;
                        return '';
                    };


                    $scope.$apply(function () {
                        var place = autocomplete.getPlace();
                        //console.log(place);
                        if (!place.geometry) {
                            // User entered the name of a Place that was not suggested and pressed the Enter key, or the Place Details request failed.
                            model.$setValidity('place', false);
                            //console.log("No details available for input: '" + place.name + "'");
                            return;
                        }

                        $scope.googleModel = {};
                        $scope.googleModel.placeId = place.place_id;
                        $scope.googleModel.latitude = place.geometry.location.lat();
                        $scope.googleModel.longitude = place.geometry.location.lng();
                        $scope.googleModel.formattedAddress = place.formatted_address;
                        if (place.address_components) {
                            $scope.googleModel.address = [
                                extract(place.address_components, 'street_number'),
                                extract(place.address_components, 'route'),
                            ].join(' ');
                            $scope.googleModel.cityName = extract(place.address_components, 'locality') || extract(place.address_components, 'neighborhood');
                            $scope.googleModel.provName = extract(place.address_components, 'administrative_area_level_2');
                            $scope.googleModel.regionName = extract(place.address_components, 'administrative_area_level_1');
                            $scope.googleModel.zipCodeId = extract(place.address_components, 'postal_code');
                            $scope.googleModel.countryCode = extract(place.address_components, 'country');
                        }

                        model.$setViewValue(inputFound.value);
                        model.$setValidity('place', true);

                        if (attrs.onSelect) $scope.onSelect({ $item: $scope.googleModel });
                    });
                });
            }
        }
    }
})();