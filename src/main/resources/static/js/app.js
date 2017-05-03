// create the module and name it scotchApp
var nikoApp = angular.module('nikoApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngStorage']);

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


        .when('/auta', {
            templateUrl: 'views/car.html',
            controller: 'AutoController'
        })
        .when('/naprawy', {
            templateUrl: 'views/repair.html',
            controller: 'NaprawaController'
        })
        .when('/polisa', {
            templateUrl: 'views/polisa.html',
            controller: 'AccountController'
        })
        .when('/badanietechniczne', {
            templateUrl: 'views/badanie.html',
            controller: 'AccountController'
        })
        .otherwise({redirectTo: '/'});
});

nikoApp.run(function ($localStorage, $rootScope, LoginService, $location) {
    if ($localStorage.currentUser == undefined) {
        $localStorage.currentUser = null;
    }
});
