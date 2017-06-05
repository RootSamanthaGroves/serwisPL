/**
 * Created by Dominika on 2017-05-04.
 */

angular.module('nikoApp').controller('TechnicalController', function ($scope, $resource, $http, LoginService) {
    $scope.message = 'Hello from TechnicalController';
    $scope.selectedCar;
    $scope.myCar;
    $scope.listOfCars = [];
    $scope.study;

    $scope.setEdit = function (h) {
        $scope.edit = h;

    };

    // wyswietlanie naprawy
/*    var loadAllStudy = function (car) {
        // var Study = $resource('daty/all/badanietechniczne', {}, {
        //     query: {method: 'get', isArray: true, cancellable: true}
        // });

        //Study.query(function (response)
        $scope.study = car;
        console.log($scope.car + "banannanaa");
        // });
    };*/

    $scope.selectedItemChanged = function(){

        $scope.study = $scope.selectedCar.badanieTechnicznes;
        console.log($scope.selectedCar);
        console.log($scope.study);
    }


    $scope.deleteStudy = function (Id) {
        $http({
            method: 'DELETE',
            url: 'daty/delete/badanie/id/' + Id
        }).success(function (data) {
            // alert(data.toString());

            $scope.selectedItemChanged();
        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });
    }

    $scope.showStudy = function (Id) {


        $http({
            method: 'GET',
            url: '/daty/badanie/id/' + Id
        }).success(function (data) {
            $scope.idTech = data.id;
            $scope.datawykonaniaBadania = new Date(data.dataBadania);
            $scope.terminBadania = new Date(data.dataWaznosci);
        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });

    }

    $scope.saveStudy = function () {
        console.log($scope.edycja);
        var badanieObject = {
            dataBadania: $scope.datawykonaniaBadania,
            dataWaznosci: $scope.terminBadania

        };

        $http.post('daty/addBadanie', badanieObject).success(function (data) { //wywloujemy
            alert('Dodano');
            $scope.selectedItemChanged();
            $scope.datawykonaniaBadania = "";
            $scope.terminBadania = "";
        }).error(function () {
            alert('Coś poszło nie tak');
        })

    };

    $scope.saveStudy2Car = function (id) {
        //console.log($scope.edycja);
        var badanieObject = {
            dataBadania: $scope.datawykonaniaBadania,
            dataWaznosci: $scope.terminBadania

        };

        $http.post('daty/addBadanie/' + id, badanieObject).success(function (data) { //wywloujemy
            alert('Dodano');
            $scope.selectedItemChanged();
            $scope.datawykonaniaBadania = "";
            $scope.terminBadania = "";
        }).error(function () {
            alert('Coś poszło nie tak');
        })

    };

    var idUser = function () {
        LoginService.getCurrentUser().then(function (response) {
            if (response.status == 200) {
                $scope.currentUserID = response.data.id;
                showMyCars(response.data.id);
            }
        })
    };
    idUser();

    var showMyCars = function (Id) {
        $http({
            method: 'GET',
            url: '/user/id/' + Id
        }).success(function (data) {
            myCar = data;
            //console.log(myCar.auto[0]);
            $scope.listOfCars = myCar.auto;
        }).error(function (error) {
            //Showing error message
            $scope.status = 'Unable to delete a person:';
        });
    };

    $scope.showMyCars2 = function () {
        $http({
            method: 'GET',
            url: '/user/id/' + $scope.currentUserID
        }).success(function (data) {
            myCar = data;
            //console.log(myCar.auto[0]);
            $scope.listOfCars = myCar.auto;
        }).error(function (error) {
            //Showing error message
            $scope.status = 'Unable to delete a person:';
        });
    };

    $scope.editStudy = function () {
        console.log($scope.edycja);
        var badanieObj = {
            id: $scope.idTech,
            dataBadania: $scope.datawykonaniaBadania,
            dataWaznosci: $scope.terminBadania
        };
        // console.log(badanieObj.idTech);
        // console.log(badanieObj.dataWaznosci);
        // console.log(badanieObj.dataBadania);
        $http.post('daty/badanie/put/', badanieObj).success(function (data) { //wywloujemy
            alert('Thanks');
            idUser();
            $scope.selectedItemChanged();

        }).error(function (error) {
            alert("nie udało się ")
            console.log(error)

        })

    };


 //   selectedItemChanged();

});
