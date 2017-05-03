/**
 * Created by Dominika on 2017-04-11.
 */

angular.module('nikoApp').controller('NaprawaController', function ($scope, $resource, $http) {


    $scope.test = function () {
        alert('Thanks');
    }

    $scope.saveNaprawa = function () {
        // alert(dataNaprawy+przebiegAuto);

        var naprawaObject = {
            data: $scope.dataNaprawy,
            przebieg: $scope.przebiegAuto,
            rodzaj: $scope.rodzajNaprawy,
            opis: $scope.opisNaprawy,
            koszt: $scope.kosztNaprawy
        };
        console.log(naprawaObject.data)
        alert( naprawaObject.data)
        $http.post('/naprawa/add', naprawaObject).success(function () {
            alert('Dodawanie powiodło się');

loadAllRepair();
        }).error(function () {
            alert('Coś poszło nie tak');
        })
    };

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


});

