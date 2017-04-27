/**
 * Created by Dominika on 2017-04-06.
 */

angular.module('nikoApp').controller('AccountController', function ($scope, $localStorage, $rootScope,$resource, $http) {
    $scope.message = 'Hello from AccountController';
    $scope.curUser = $localStorage.currentUser;



    $scope.saveUser = function () {
        var email = $scope.emailOfUser;
        var firstName = $scope.firstNameOfUser; //pobieramy imie z pola w html
        var password = $scope.passwordOfUser;
         var acountRole ="";

        alert(firstName + email);
        //to tylko dla testu czy dane sie pobieraja, w google chrome ctrl+shif j otwiera conosle do debuga
        //degug //tak sie wlacza debugger w js

        //Potrzebujemy stworzyc nasz obiekt, ktorego zadamy w Javie patrz RequestBody
        var userObject = {
            email: $scope.emailOfUser,
            firstName: $scope.firstName,
            password: $scope.passwordOfUser,
            role: "ROLE_USER"
        };
        alert(userObject.firstName + userObject.email);
        $http.post('/user/add', userObject).success(function () { //wywloujemy
            alert('Twoje konto zostało utworzone');
            $scope.emailOfUser = "";
            $scope.firstNameOfUser = ""; //pobieramy imie z pola w html
            $scope.passwordOfUser = "";

        }).error(function () {
            alert('Coś poszło nie tak' +
                ' Możliwe ze konto o podanym adresie email już istnieje');
        })
    };
    // alert($scope.emailZalogowany);

    // this.findOneUserByEmail = function (email) {
    //     email=$scope.emailZalogowany;
    //     var url = '/user/email/' + email;
    //     return $http({
    //         method: "GET",
    //         url: url
    //     }).then(function successCallback(response) {
    //         return response;
    //     }, function errorCallback(response) {
    //         return response.status;
    //     });
    // };
    // findOneUserByEmail();

    // $rootScope.email;

    // var findOneUserByEmail= function (email) {
    //     email=$scope.emailZalogowany;
    //         var url = '/user/email/' + email;
    //         return $http({
    //             method: "GET",
    //             url: url
    //         }).then(function successCallback(response) {
    //             return response;
    //         }, function errorCallback(response) {
    //             return response.status;
    //
    //     // LoginService
            // .getCurrentUser()
            // .then(function (response) {
                // if (response.status == 200) {
                //     $rootScope.email = response.data.email;
                //     $localStorage.email = response.data.email;
                //     $localStorage.role = response.data.role;
                //
                //     if (angular.equals(response.data.role, 'ROLE_ADMIN')) {
                //         $rootScope.admin = true;
                //         $localStorage.isAdmin = true;
                //     } else {
                //         $rootScope.admin = false;
                //         $localStorage.isAdmin = false;
                //     }
                //     $location.path("/");
                // }
    //         })
    // };
    // findOneUserByEmail();


});
