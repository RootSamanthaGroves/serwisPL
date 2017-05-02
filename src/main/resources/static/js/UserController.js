/**
 * Created by Dominika on 2017-04-26.
 */

angular.module('nikoApp').controller('UserController', function ($scope, $resource, $http) {
    $scope.message = 'Hello from Accountuser';

    $scope.saveUser = function () {
        var email = $scope.emailOfUser;
        var firstName = $scope.firstNameOfUser; //pobieramy imie z pola w html
        var password = $scope.passwordOfUser;

        var userObject = {
            email: email,
            firstName: firstName,
            password: password


        };
        // alert(userObject.firstName+userObject.email);

        $http.post('/user/add', userObject).success(function () { //wywloujemy
            alert('Konto zostało utoworzone');
            $scope.emailOfUser = "";
            $scope.firstNameOfUser = ""; //pobieramy imie z pola w html
            $scope.passwordOfUser = "";

        }).error(function () {
            alert(' Konto nie zostało utworzone. Możliwe że podany e-mail jest już używany.Podaj poprawne dane!');
        })
    };
});
