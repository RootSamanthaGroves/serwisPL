/**
 * Created by Dominika on 2017-04-03.
 */
angular.module('nikoApp').controller('LoginController', function ($scope, $resource, $http) {
    $scope.message = '';

    $scope.test = function () {
        alert('Thanks');
    }
    // $(document).ready(function () {
    //     $('[data-toggle="tooltip"]').tooltip();
    // });

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
            $scope.emailOfUser = "";
            $scope.firstNameOfUser = ""; //pobieramy imie z pola w html
            $scope.passwordOfUser = "";

        }).error(function () {
                  alert('Coś poszło nie tak' +
                ' Możliwe ze konto o podanym adresie email już istnieje');
        })
    };

    // $scope.logowanie = function () {
    //     // var email = $scope.emailLog;
    //     // var password = $scope.passwordLog;
    //
    //     alert(password + email);
    //
    //     alert($scope.emailLog+" "+$scope.passwordLog);
    //     $http.post('/user/log',$scope.emailLog, $scope.passwordLog ).success(function () { //wywloujemy
    //         alert('Działa');
    //
    //
    //     }).error(function () {
    //         alert('Coś poszło nie tak' );
    //     })
    // };



    $scope.findDebil = function () {
        var  e=$scope.emailLog;
        var p = $scope.passwordLog;
        alert(p + e);

    //     var User = $resource('user/log.json', {}, {
    //         query: {method: 'delete', isArray: false, cancellable: true}
    //     });
    //     User.query(function (response) {
    //         alert(response.email)
    //        // / $scope.myemail = response.email;
    //         // $scope.myFunc();
    //     });
    // };


        $http({
            method: 'DELETE',
            url: '/user/log/' + e+'/'+p
        }).success(function (data) {

             alert('Powiodło sie');

            $scope.content = data.password;
            $scope.statuscode = data.status;
            if(data.password==$scope.passwordLog ){

                if(data.email==$scope.emailLog ){
                    alert("takkk")
                }

            }
            else
            {  alert("Nie powiodło się")}

            alert(  Object.values(data));
            // var isEmpty = (response || []).length === 0;

            if ((data || []).length === 0) {
                document.getElementById("demo").innerHTML = "zle!";
            } else {
                document.getElementById("demo").innerHTML = "dobrze!";
            }

        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Nieu dało sie: ' + error.message;






                });
    }



});