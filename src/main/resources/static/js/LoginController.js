/**
 * Created by Dominika on 2017-04-03.
 */
angular.module('nikoApp').controller('LoginController', function ($rootScope, $scope, LoginService, $location, $localStorage, $resource, $http) {

    $scope.test = function () {
        alert('Thanks');
    }




    // $scope.findUser = function () {
    //     var e = $scope.emailLog;
    //     var p = $scope.passwordLog;
    //     alert(p + e);
    //
    //     //     var User = $resource('user/log.json', {}, {
    //     //         query: {method: 'delete', isArray: false, cancellable: true}
    //     //     });
    //     //     User.query(function (response) {
    //     //         alert(response.email)
    //     //        // / $scope.myemail = response.email;
    //     //         // $scope.myFunc();
    //     //     });
    //     // };
    //
    //
    //     $http({
    //         method: 'DELETE',
    //         url: '/user/log/' + e + '/' + p
    //     }).success(function (data) {
    //
    //         // alert('Powiodło sie');
    //
    //         $scope.content = data.password;
    //         $scope.statuscode = data.status;
    //         if (data.password == $scope.passwordLog) {
    //
    //             if (data.email == $scope.emailLog) {
    //                 alert("Logowanie powiodło sie ")
    //             }
    //
    //         }
    //         else {
    //             alert("Nie powiodło się")
    //         }
    //
    //         // alert(  Object.values(data));
    //         // var isEmpty = (response || []).length === 0;
    //
    //         if ((data || []).length === 0) {
    //             document.getElementById("demo").innerHTML = "zle!";
    //         } else {
    //             document.getElementById("demo").innerHTML = "dobrze!";
    //
    //         }
    //
    //     })
    //         .error(function (error) {
    //             //Showing error message
    //             $scope.status = 'Nie udało sie: ' + error.message;
    //         });
    // }
    //
    // $scope.SaveUser = function () {
    //     var email = $scope.emailOfUser;
    //     var firstName = $scope.firstNameOfUser; //pobieramy imie z pola w html
    //     var password = $scope.passwordOfUser;
    //     // var acountRole ="ROLE_ADMIN";
    //
    //      alert(firstName + email);
    //     //to tylko dla testu czy dane sie pobieraja, w google chrome ctrl+shif j otwiera conosle do debuga
    //     //degug //tak sie wlacza debugger w js
    //
    //     //Potrzebujemy stworzyc nasz obiekt, ktorego zadamy w Javie patrz RequestBody
    //     var userObject = {
    //         email: $scope.emailOfUser,
    //         firstName: firstName,
    //         password: password,
    //         role: "ROLE_USER"
    //     };
    //     alert(userObject.firstName + userObject.email);
    //     $http.post('/log/newUser', userObject).success(function () { //wywloujemy
    //         alert('Twoje konto zostało utworzone');
    //         $scope.emailOfUser = "";
    //         $scope.firstNameOfUser = ""; //pobieramy imie z pola w html
    //         $scope.passwordOfUser = "";
    //
    //     }).error(function () {
    //         alert('Coś poszło nie tak' +
    //             ' Możliwe ze konto o podanym adresie email już istnieje');
    //     })
    // };


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $rootScope.slider = false;
    $scope.message = "LoginController";
    $scope.errorMsg = '';
    $scope.rememberMe = true;
    $scope.username = '';
    $scope.password = '';

    $scope.login = function () {
        var userLoginAndPassword = {
            "username": $scope.username,
            "password": $scope.password
        }
        if (userLoginAndPassword.password == "" || userLoginAndPassword.username == "") {
        } else {
            LoginService
                .login(userLoginAndPassword)
                .then(function (response) {
                        if (response.status == 200) {
                            LoginService
                                .getCurrentUser().then(function (response) {
                                $localStorage.currentUser = response.data;
                                $localStorage.showNavbar = true;
                                $localStorage.showTopMenu = true;
                                $rootScope.showNavbar = true;
                                $rootScope.showTopMenu = true;
                                $location.path('/');
                            })
                        } else {
                            alert("Nie można poprawnie dokonać autoryzacji \nPrawdopodobną przyczyną jest zły email lub/i hasło");
                            $scope.errorMsg = 'Please check your credentials and try again.';
                        }
                    }
                )
        }
    }
})
;