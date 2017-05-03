/**
 * Created by Dominika on 2017-04-07.
 */
angular.module('nikoApp').controller('AutoController', function ($scope, $resource, $http) {


    $scope.test = function () {
        alert('Thanks');
    }
    $scope.saveAuto = function () {



        var autoObject = {
            marka: $scope.markaAuto,
            model: $scope.modelAuto,
            mocSilnika: $scope.mocAuto,
            numerRejestracyjny: $scope.numerRejAuto,
            numerVIN: $scope.numerVinAuto,
            pojemnoscSilnika: $scope.pojSilnikaAuto,
            rodzajNadwozia: $scope.rodzNadwoziaAuto,
            rodzajPaliwa: $scope.rodzajPaliwAuto,
            rokProdukcji: $scope.rokProAuto
        };

        $http.post('/auto/add', autoObject).success(function (response) {
            alert('Twoje auto zostało dodane');


            loadAllCars();
            // alert($localStorage.currentUser.id + " " );
            console.log(response);
            // alert(response.id);
            id= response.id;
            // saveRel(response.id);
        }).error(function () {
            alert('Coś poszło nie tak' +
                ' ');
        })
    };

    // wyświetlanie aut
    var loadAllCars = function () {

        var Car = $resource('auto/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}

        });

        Car.query(function (response) {
            console.log(response);
            // alert(response);
            $scope.car = response; // widoku będziesz używał teraz people
            // console.log(response);
        });
    };
    loadAllCars();

    $scope.deleteCar = function (Id) {
        alert(Id)
        $http({
            method: 'DELETE',
            url: '/auto/delete/id/' + Id
        }).success(function (data) {
            alert(data.toString());

            loadAllCars();
        })
            .error(function (error) {
                loadAllCars();
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

    $scope.editCar = function () {
        var carObj = {

            id: $scope.idAutoE,
            marka: $scope.markaAutoE,
            model: $scope.modelAutoE,
            numervin: $scope.numerVinE,
            numerRej: $scope.numerRejE,
            rokprodukcji: $scope.rokProE,
            rodzjanadw: $scope.rodzNadwoziaE,
            pojemnoscsilnika: $scope.pojSilnikaE,
            mocSilnika: $scope.mocAutoE,
            rodzjapaliwa: $scope.rodzajPaliE
        };

        alert("indeks auta"+carObj.numerRej)
        // alert(carObj.model)
        $http.post('/auto/put/', carObj).success(function () { //wywloujemy
            alert('Thanks');

            loadAllCars();

        }).error(function (error) {
            alert("nie udało się ")
            //Showing error message
            console.log(error)

        })

    };









    // var saveRel = function (id) {
    //     alert(id+" "+$localStorage.currentUser.id)
    //     var Object = {
    //         idUser:$localStorage.currentUser.id,
    //         idCar: id
    //
    //
    //     };
    //
    //     $http.post('/user/put/'+ $localStorage.currentUser.id ,  Object).success(function () { //wywloujemy
    //         alert('Thanks');
    //
    //
    //
    //
    //     }).error(function () {
    //         alert("nie udało się ")
    //     })
    // };



    // $scope.saveRelations = function () {
    //     alert(id)
    //     alert($localStorage.currentUser.id + " " + id);
    //
    //
    //
    //     var questionObject = {
    //         user: $scope.$localStorage.currentUser.id,
    //         car: $scope.car.id
    //     };
    //
    //     $http.post('/question/put/'+ $routeParams.id ,  questionObject).success(function () { //wywloujemy
    //         alert('Thanks'+$scope.selected);
    //
    //
    //
    //     }).error(function () {
    //         alert("nie udało się ")
    //     })
    // };


});
