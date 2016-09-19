'use strict';

angular.module('weatherApp')

.controller('IndexController', ['$scope', '$q', 'weatherService', function($scope, $q, weatherService) {

    var vm = this;

    vm.gmapsService = new google.maps.places.AutocompleteService();
    vm.search = search;
    vm.getWeather = getWeather;
    vm.weatherList = [];
    vm.showLoading = false;

    function getWeather(city) {

        if (!city) {
            vm.weatherList = [];
            return;
        }

        vm.showLoading = true;
        
        weatherService.getWeatherByCity(city).then(function(data){

            // get only weather data
            vm.weatherList = data.list.map(function(data, index){
                return {
                    icon: data.weather[0].icon,
                    main: data.weather[0].main,
                    description: data.weather[0].description,
                    date: moment().add(index, 'days').format('LL'),
                    temp: Math.round(data.temp.day),
                }
            });

            vm.showLoading = false;

        });
    }

    function search(city) {

        // No city provided
        if (!city) return [];

        var deferred = $q.defer();

        getResults(city).then(
            function(predictions) {
                var results = [];
                for (var i = 0, prediction; prediction = predictions[i]; i++) {
                    results.push(prediction.description);
                }
                deferred.resolve(results);
            }
        );

        return deferred.promise;
    }

    function getResults(city) {
        var deferred = $q.defer();

        vm.gmapsService.getQueryPredictions({
            input: city
        }, function(data) {
            deferred.resolve(data);
        });

        return deferred.promise;
    }

}]);
