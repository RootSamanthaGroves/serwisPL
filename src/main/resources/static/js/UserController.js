/**
 * Created by Dominika on 2017-04-26.
 */

angular.module('nikoApp').controller('UserController', function ($scope, $resource, $http) {
    $scope.message = 'Hello from Accountuser';

    $scope.saveUser = function () {
        var email = $scope.emailOfUser;
        var firstName = $scope.firstNameOfUser; //pobieramy imie z pola w html
        var password = $scope.passwordOfUser;

        // if ( $scope.emailOfUser.length< 2) {
        //     greeting = "Good day";
        // } else {
        //     greeting = "Good evening";
        // }


        // var email = Boolean(100);
        // $scope.firstName = Boolean(firstName.length<2);
        //  alert('Nazwa użytkownika jest za krótka!');
        //  var password = Boolean(password.length<5);
        //  alert(firstName.length<2);

        // document.getElementById("demo").innerHTML = email.length;
        // document.getElementById("demo").innerHTML = firstName.length;


        // alert('Podaj poprawne dane!');


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
