/**
 * Created by Dominika on 2017-05-04.
 */

angular.module('nikoApp').controller('TechnicalController', function ($scope, $localStorage, $resource, $http, UserService) {
    $scope.message = 'Hello from AccountController';
    $scope.curUser;




    // var loadMeCars = function (id) {
    //     var Car = $resource('auto/', {}, {
    //         query: {method: 'get', isArray: true, cancellable: true}
    //     });
    //
    //     Car.query(function (response) {
    //         $scope.dataM=$scope.car.data;
    //         //alert(response); teraz w response masz to co bys widzial w postmanie takiego jsona
    //         $scope.car = response; // widoku będziesz używał teraz people
    //     });
    // };
    // loadMeCars();

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


// // wyświetlanie aut
//     var loadAllCars = function () {
//         var Car = $resource('auto/all', {}, {
//             query: {method: 'get', isArray: true, cancellable: true}
//         });
//
//         Car.query(function (response) {
//             //alert(response); teraz w response masz to co bys widzial w postmanie takiego jsona
//             $scope.car = response; // widoku będziesz używał teraz people
//         });
//     };
//     loadAllCars();



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

    // $scope.deleteCar = function (Id) {
    //     $http({
    //         method: 'DELETE',
    //         url: '/auto/delete/id/' + Id
    //     }).success(function (data) {
    //         alert(data.toString());
    //         console.log(data);
    //         //Showing Success message
    //         // $scope.status = "The Survey Deleted Successfully!!!";
    //         // alert('Delete User');
    //
    //         loadAllCars();
    //
    //     })
    //         .error(function (error) {
    //             //Showing error message
    //             $scope.status = 'Unable to delete a person: ' + error.message;
    //         });
    // }


    $scope.deleteRepair = function (Id) {
        $http({
            method: 'DELETE',
            url: '/naprawa/delete/id/' + Id
        }).success(function (data) {
            // alert(data.toString());

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
            alert(data.id);
            console.log(data.id)
            $scope.idAutoE=data.id;
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

    }

    $scope.showRepair = function (Id) {

        alert(Id)
        $http({
            method: 'GET',
            url: '/naprawa/id/' + Id
        }).success(function (data) {
            //Showing Success message
            // $scope.status = "The Survey Deleted Successfully!!!";
            alert(data.id);
            console.log(data.data)
            $scope.idE=data.id;

            var myDate = new Date(data.data);
            $scope.dataE=myDate;
            $scope.przebiegE=data.przebieg;
            $scope.rodzajE=data.rodzaj;
            $scope.opisE=data.opis;
            $scope.kosztE=data.koszt;


        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });

    }

    $scope.saveUser = function () {
        var email = $scope.emailOfUser;
        var firstName = $scope.firstNameOfUser; //pobieramy imie z pola w html
        // var password = $scope.passwordOfUser;
        // var acountRole = "";



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


//     $scope.editCar = function () {
//         var carObj = {
//
//             id: $scope.idAutoE,
//             marka: $scope.markaAutoE,
//             model: $scope.modelAutoE,
//             numervin: $scope.numerVinAuto,
//             numerRej: $scope.numerRejAuto,
//             rokprodukcji: $scope.rokProAuto,
//             rodzjanadw: $scope.rodzNadwoziaAuto,
//             pojemnoscsilnika: $scope.pojSilnikaAuto,
//             mocSilnika: $scope.mocAuto,
//             rodzjapaliwa: $scope.rodzajPaliwAuto
//         };
//
// alert("indeks auta"+carObj.numerRej)
//         // alert(carObj.model)
//         $http.post('/auto/put/', carObj).success(function () { //wywloujemy
//             alert('Thanks');
//
//             loadAllCars();
//
//         }).error(function (error) {
//                     alert("nie udało się ")
//                     //Showing error message
//             console.log(error)
//
//         })
//
//     };
    $scope.editRepair = function () {
        var repairObj = {

            id: $scope.idE,
            data: $scope.dataE,
            przebieg: $scope.przebiegE,
            rodzaj: $scope.rodzajE,
            opis: $scope.opisE,
            koszt: $scope.kosztE
        };

        alert("indeks auta"+repairObj.id)
        // alert(carObj.model)
        $http.post('/naprawa/put/', repairObj).success(function () { //wywloujemy
            alert('Thanks');

            loadAllRepair();

        }).error(function (error) {
            alert("nie udało się ")
            //Showing error message
            console.log(error)

        })

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
