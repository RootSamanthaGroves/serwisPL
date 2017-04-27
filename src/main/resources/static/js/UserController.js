/**
 * Created by Dominika on 2017-04-26.
 */

angular.module('nikoApp').controller('UserController', function ($scope, $resource, $http) {
    $scope.message = 'Hello from Accountuser';
    // alert($scope.message);


    $scope.saveUser= function () {
        var email = $scope.emailOfUser;
        var firstName = $scope.firstNameOfUser; //pobieramy imie z pola w html
        var password = $scope.passwordOfUser;
        // alert(firstName);

        //to tylko dla testu czy dane sie pobieraja, w google chrome ctrl+shif j otwiera conosle do debuga
        //degug //tak sie wlacza debugger w js

        //Potrzebujemy stworzyc nasz obiekt, ktorego zadamy w Javie patrz RequestBody
        var userObject = {
            email: email,
            firstName: firstName,
             password: password


        };
        alert(userObject.firstName+userObject.email);
        $http.post('/user/add',userObject).success(function () { //wywloujemy
            alert('Thanks');
            $scope.emailOfUser = "";
            $scope.firstNameOfUser = ""; //pobieramy imie z pola w html
            $scope.passwordOfUser = "";

        }).error(function () {
            alert('We have problem!');
        })
    };
});
