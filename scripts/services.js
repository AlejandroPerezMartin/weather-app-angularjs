
angular.module('weatherApp')

.constant('OWM_APIKEY', 'fc6e378fcfd970d319651c9959d0ce91') // Get your own key: https://console.developers.google.com/

.service('weatherService', ['$http', '$resource', 'OWM_APIKEY', function($http, $resource, OWM_APIKEY){

        /*
         * Get weather by city name
         * @param {String} city
         */
        this.getWeatherByCity = function(city){
            return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city +'&mode=json&units=metric&cnt=7&APPID=' + OWM_APIKEY)
                .then(function(response){
                    return response.data;
                }
            );
        }

}]);
