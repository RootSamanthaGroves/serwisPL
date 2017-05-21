// create the module and name it scotchApp
var nikoApp = angular.module('nikoApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngStorage']);

nikoApp.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'views/about.html',
            controller: 'HomeController'
        })

        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutController'
        })

        .when('/logowanie', {
            templateUrl: 'views/logowanie.html',
            controller: 'LoginController'
        })
        .when('/rejestracja', {
            templateUrl: 'views/rejestracja.html',
            controller: 'UserController'
        })
        .when('/me', {
            templateUrl: 'views/me.html',
            controller: 'LoginController'
        })
        .when('/auta', {
            templateUrl: 'views/car.html',
            controller: 'AutoController'
        })
        .when('/naprawy', {
            templateUrl: 'views/repair.html',
            controller: 'NaprawaController'
        })
        .when('/policy', {
            templateUrl: 'views/policy.html',
            controller: 'PolicyController'
        })
        .when('/technical', {
            templateUrl: 'views/technical.html',
            controller: 'TechnicalController'
        })
        .otherwise({redirectTo: '/'});
});

nikoApp.run(function ($localStorage, $rootScope, LoginService, $location) {
    if ($localStorage.currentUser == undefined) {
        $localStorage.currentUser = null;
    }
});
