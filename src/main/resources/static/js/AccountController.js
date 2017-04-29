/**
 * Created by Dominika on 2017-04-06.
 */

angular.module('nikoApp').controller('AccountController', function ($scope, $localStorage, $resource, $http, UserService) {
    $scope.message = 'Hello from AccountController';
    $scope.curUser;


    // var getUserById = function (id) {
    //     UserService.getUserById(id)
    //         .then(function (response) {
    //             if (response.status == 200) {
    //                 $scope.curUser = response.data;
    //                 // alert($localStorage.currentUser.id);
    //             }
    //         })
    // };

// wyświetlanie aut
    var loadAllCars = function () {
        var Car = $resource('auto/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        Car.query(function (response) {
            //alert(response); teraz w response masz to co bys widzial w postmanie takiego jsona
            $scope.car = response; // widoku będziesz używał teraz people
        });
    };
    loadAllCars();

    // wyswietlanie naprawy
    var loadAllRepair = function () {
        var Repair = $resource('naprawa/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        Repair.query(function (response) {
            //alert(response); teraz w response masz to co bys widzial w postmanie takiego jsona
            $scope.repair = response; // widoku będziesz używał teraz people
        });
    };
    loadAllRepair();


    // $scope.saveRelations = function () {
    //     alert($localStorage.currentUser.id + " " + $scope.car.ir);
    //     // console.log($scope.selected + " " + $scope.question);
    //
    //
    //
    //     var questionObject = {
    //         question: $scope.question,
    //         answers: $scope.selected
    //     };
    //
    //     $http.post('/question/put/'+ $routeParams.id ,  questionObject).success(function () { //wywloujemy
    //         alert('Thanks'+$scope.selected);
    //         loadAllQuestionFromDb();
    //
    //
    //
    //     }).error(function () {
    //         alert("nie udało się ")
    //     })
    // };

    $scope.deleteCar = function (Id) {
        $http({
            method: 'DELETE',
            url: '/auto/delete/id/' + Id
        }).success(function (data) {
            console.log(data);
            //Showing Success message
            // $scope.status = "The Survey Deleted Successfully!!!";
            // alert('Delete User');

            loadAllCars();
        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });
    }




    $scope.deleteRepair = function (Id) {
        $http({
            method: 'DELETE',
            url: '/naprawa/delete/id/' + Id
        }).success(function (data) {
            //Showing Success message
            // $scope.status = "The Survey Deleted Successfully!!!";
             alert(data.toString());

            loadAllRepair();
        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });
    }


$scope.showCar = function (Id) {

alert(Id)


    $http({
        method: 'GET',
        url: '/auto/id/' + Id
    }).success(function (data) {
        //Showing Success message
        // $scope.status = "The Survey Deleted Successfully!!!";
        alert(data.model);
        $scope.markaAutoE=data.marka;
        $scope.modelAutoE=data.model;
        $scope.numerVinAuto=data.numerVIN;
        $scope.numerRejAuto=data.numerRejestracyjny;
        $scope.rokProAuto=data.rokProdukcji;
        $scope.rodzNadwoziaAuto=data.rodzajNadwozia;
        $scope.pojSilnikaAuto=data.pojemnoscSilnika;
        $scope.mocAuto=data.mocSilnika;
        $scope.rodzajPaliwAuto=data.rodzajPaliwa;





    })
        .error(function (error) {
            //Showing error message
            $scope.status = 'Unable to delete a person: ' + error.message;
        });
    // var Car = $resource('auto/id/'+Id, {}, {
    //     query: {method: 'get', isArray: true, cancellable: true}
    // });
    //
    // Car.query(function (response) {
    //     // alert(response.model);
    //     $scope.car = response;
    // });

}


    $scope.saveUser = function () {
        var email = $scope.emailOfUser;
        var firstName = $scope.firstNameOfUser; //pobieramy imie z pola w html
        // var password = $scope.passwordOfUser;
        // var acountRole = "";

        alert(firstName + email);


        //Potrzebujemy stworzyc nasz obiekt, ktorego zadamy w Javie patrz RequestBody
        var userObject = {
            email: $scope.emailOfUser,
            firstName: $scope.firstName,
            password: $scope.passwordOfUser,
            role: "ROLE_USER"
        };
        alert(userObject.firstName + userObject.email);
        $http.post('/user/add', userObject).success(function (data) { //wywloujemy
            alert('Twoje konto zostało utworzone');
            $scope.emailOfUser = "";
            $scope.firstNameOfUser = ""; //pobieramy imie z pola w html
            $scope.passwordOfUser = "";
            console.log(data.object.indexOf());
        }).error(function () {
            alert('Coś poszło nie tak' +
                ' Możliwe ze konto o podanym adresie email już istnieje');
        })
    };


    $scope.editCar = function (Id,text) {

        var car = prompt("Please enter the answer"+Id, text);

        var carObj = {
            c:car

        };
        alert(carObj.c);


        // wyświetlanie aut

            var Car = $resource('auto/id'+Id, {}, {
                query: {method: 'get', isArray: true, cancellable: true}
            });

            Car.query(function (response) {
                alert(response.model);
                $scope.car = response;
            });



        // $http.put('/auto/id', carObj).success(function (response) { //wywloujemy
        //     alert('auto update' + carObj);
        //     loadAllCars();
        // }).error(function () {
        //     alert('We have problem!');
        // })


        // $http.post('/auto/put/'+ Id ,  carObj).success(function () { //wywloujemy
        //     alert('Thanks');
        //
        //     loadAllCars();
        //
        //     // for(var i = 0; questionObject.length(); i++){
        //     //     console.log(questionObject.answers[i].answer);
        //     // }
        //
        // }).error(function () {
        //     alert("nie udało się ")
        // })


        // $http({
        //
        //     method: 'PUT',
        //     url: '/auto/put/id/' + Id
        // }).success(function (data) {
        //     //Showing Success message
        //     $scope.status = "The Survey Deleted Successfully!!!";
        //     alert('Update User');
        //     loadAllCars();
        // })
        //     .error(function (error) {
        //         //Showing error message
        //         $scope.status = 'Unable to delete a person: ' + error.message;
        //     })

    };


    // alert($scope.emailZalogowany);

    // this.findOneUserByEmail = function () {
    //     // email=$scope.curUser.email;
    //     alert($scope.emailA)
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

    // $rootScope.loadAllSurveyFromDb = function () {
    //     var Survey = $resource('survey/all', {}, {
    //         query: {method: 'get', isArray: true, cancellable: true}
    //     });
    //
    //     Survey.query(function (response) {
    //         $scope.survey = response;
    //     });
    // };

    // $scope.findOneUserByEmail = function (email) {
    //     alert("blablba" + email);
        // var Me = $resource('user/email', {}, {
        //     query: {method: 'get', isArray: true, cancellable: true}
        // });
        //
        // Me.query(function (response) {
        //     $scope.Me = response;
        // });
        //     var user = $resource('user//email',{},{
        //         query: {method: 'get', isArray: false, cencellable:true}
        //     });
        // .get('/user/email', email).success(function () { //wywloujemy
        //     alert('Udało sie');
        //
        //
        // }).error(function () {
        //     alert('Coś poszło nie tak' +
        //         ' Możliwe ze konto o podanym adresie email już istnieje');
        // })
        // to działa

    //     var user = $resource('user/email', {}, {
    //         query: {method: 'get', isArray: false, cancellable: true}
    //
    //     });
    //     console.log(user);
    //     user.query(function (response) {
    //         $scope.myemail = response;
    //
    //     });
    //
    // }


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
