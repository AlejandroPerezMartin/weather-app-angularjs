angular.module('weatherApp', ['ui.router', 'ngResource', 'ngMaterial'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: '/',
            views: {
                'header': {
                    templateUrl: 'views/header.html',
                },
                'content': {
                    templateUrl: 'views/home.html',
                    controllerAs: 'vm',
                    controller: 'IndexController'
                },
                'footer': {
                    templateUrl: 'views/footer.html',
                }
            }
        });

    $urlRouterProvider.otherwise('/');

});
