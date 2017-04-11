// create the module and name it scotchApp
var nikoApp = angular.module('nikoApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);

nikoApp.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'views/about.html',
            controller: 'HomeController'
        })

        .when('/people', {
            templateUrl: 'views/people.html',
            controller: 'PeopleController'
        })

        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutController'
        })
        .when('/account', {
            templateUrl: 'views/account.html',
            controller: 'AboutController'
        })
        .when('/logowanie', {
            templateUrl: 'views/logowanie.html',
            controller: 'LoginController'
        })
        .when('/rejestracja', {
            templateUrl: 'views/rejestracja.html',
            controller: 'LoginController'
        })
        .when('/dodajAuto', {
            templateUrl: 'views/account.html',
            controller: 'AutoController'
        })
        .when('/dodajNaprawe', {
            templateUrl: 'views/account.html',
            controller: 'NaprawaController'
        })
        .when('/dodajDaty', {
            templateUrl: 'views/account.html',
            controller: 'DatyController'
        })
        .otherwise({redirectTo: '/'});
});
