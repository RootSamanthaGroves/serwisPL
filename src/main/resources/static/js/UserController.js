/**
 * Created by Dominika on 2017-04-26.
 */

angular.module('nikoApp').controller('UserController', function ($scope, $resource, $http) {
    $scope.message = 'Hello from Accountuser';

    // dwalidania do nazwy usera
    $(document).ready(function(){
        $('.sendButton').attr('disabled',true);

        $('#imie').keyup(function(){
            if($(this).val().length >=3){
                $('.sendButton').attr('disabled', false);
            }
            else
            {
                $('.sendButton').attr('disabled', true);
            }
        })
    });



// do hasła
    $(document).ready(function(){
        $('.sendButton').attr('disabled',true);

        $('#password').keyup(function(){


            if($(this).val().length >=5){
                $('.sendButton').attr('disabled', false);
            }
            else
            {
                $('.sendButton').attr('disabled', true);
            }
        })
    });


// do maila
    $(document).ready(function(){
        $('.sendButton').attr('disabled',true);

        $('#email').keyup(function(){


            if($(this).val().length >=4){
                $('.sendButton').attr('disabled', false);
            }
            else
            {
                $('.sendButton').attr('disabled', true);
            }
        })
    });




    $scope.saveUser = function () {


        var email = $scope.email;
        var firstName = $scope.firstNameOfUser; //pobieramy imie z pola w html
        var password = $scope.passwordOfUser;



        var userObject = {
            email: email,
            firstName: firstName,
            password: password


        };


            $http.post('/user/add', userObject).success(function () { //wywloujemy
                alert('Konto zostało utoworzone');
                $scope.email = "";
                $scope.firstNameOfUser = ""; //pobieramy imie z pola w html
                $scope.passwordOfUser = "";

            }).error(function () {
                alert(' Konto nie zostało utworzone. Możliwe że podany e-mail jest już używany.Podaj poprawne dane!');
            })



    };
});
