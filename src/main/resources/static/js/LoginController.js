/**
 * Created by Dominika on 2017-04-03.
 */
angular.module('nikoApp').controller('LoginController', function ($scope, $resource, $http) {
    $scope.message = '';

    $scope.test = function () {
        alert('Thanks');
    }
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $scope.saveUser = function () {
        var email = $scope.emailOfUser;
        var firstName = $scope.firstNameOfUser; //pobieramy imie z pola w html
        var password = $scope.passwordOfUser;
        // var acountRole ="ROLE_ADMIN";

        // alert(firstName + email);
        //to tylko dla testu czy dane sie pobieraja, w google chrome ctrl+shif j otwiera conosle do debuga
        //degug //tak sie wlacza debugger w js

        //Potrzebujemy stworzyc nasz obiekt, ktorego zadamy w Javie patrz RequestBody
        var userObject = {
            email: $scope.emailOfUser,
            firstName: firstName,
            password: password,
            role: "ROLE_USER"
        };
        alert(userObject.firstName + userObject.email);
        $http.post('/user/add', userObject).success(function () { //wywloujemy
            alert('Twoje konto zostało utworzone');
            // $scope.emailOfUser = "";
            // $scope.firstNameOfUser = ""; //pobieramy imie z pola w html
            // $scope.passwordOfUser = "";

        }).error(function () {
                  alert('Coś poszło nie tak' +
                ' Możliwe ze konto o podanym adresie email już istnieje');
        })
    };

});