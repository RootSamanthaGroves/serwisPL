/**
 * Created by Dominika on 2017-05-04.
 */

angular.module('nikoApp').controller('TechnicalController', function ($scope, $resource, $http, LoginService, RepairService) {
    // $scope.message = 'Hello from TechnicalController';
    // $scope.selectedCar;
    // $scope.myCar;
    // $scope.listOfCars = [];
    // $scope.study;
    //
    // $scope.setEdit = function (h) {
    //     $scope.edit = h;
    // };
    //
    // $scope.selectedItemChanged = function () {
    //     $scope.study = $scope.selectedCar.badanieTechnicznes;
    //     console.log($scope.selectedCar);
    //     console.log($scope.study);
    // };
    //
    // $scope.deleteStudy = function (Id) {
    //     $http({
    //         method: 'DELETE',
    //         url: 'daty/delete/badanie/id/' + Id
    //     }).success(function (data) {
    //         $scope.selectedItemChanged();
    //     })
    //         .error(function (error) {
    //             //Showing error message
    //             $scope.status = 'Unable to delete a person: ' + error.message;
    //         });
    // };
    //
    // $scope.showStudy = function (Id) {
    //     $http({
    //         method: 'GET',
    //         url: '/daty/badanie/id/' + Id
    //     }).success(function (data) {
    //         $scope.idTech = data.id;
    //         $scope.datawykonaniaBadania = new Date(data.dataBadania);
    //         $scope.terminBadania = new Date(data.dataWaznosci);
    //     })
    //         .error(function (error) {
    //             //Showing error message
    //             $scope.status = 'Unable to delete a person: ' + error.message;
    //         });
    // };
    //
    // $scope.saveStudy = function () {
    //     console.log($scope.edycja);
    //     var badanieObject = {
    //         dataBadania: $scope.datawykonaniaBadania,
    //         dataWaznosci: $scope.terminBadania
    //     };
    //
    //     $http.post('daty/addBadanie', badanieObject).success(function (data) { //wywloujemy
    //         alert('Dodano');
    //         $scope.selectedItemChanged();
    //         $scope.datawykonaniaBadania = "";
    //         $scope.terminBadania = "";
    //     }).error(function () {
    //         alert('Coś poszło nie tak');
    //     })
    // };
    //
    // $scope.saveStudy2Car = function (id) {
    //     var badanieObject = {
    //         dataBadania: $scope.datawykonaniaBadania,
    //         dataWaznosci: $scope.terminBadania
    //     };
    //
    //     $http.post('daty/addBadanie/' + id, badanieObject).success(function (data) { //wywloujemy
    //         alert('Dodano');
    //         $scope.selectedItemChanged();
    //         $scope.datawykonaniaBadania = "";
    //         $scope.terminBadania = "";
    //     }).error(function () {
    //         alert('Coś poszło nie tak');
    //     })
    // };
    //
    // var idUser = function () {
    //     LoginService.getCurrentUser().then(function (response) {
    //         if (response.status == 200) {
    //             $scope.currentUserID = response.data.id;
    //             showMyCars(response.data.id);
    //         }
    //     })
    // };
    // idUser();
    //
    // var showMyCars = function (Id) {
    //     $http({
    //         method: 'GET',
    //         url: '/user/id/' + Id
    //     }).success(function (data) {
    //         myCar = data;
    //         $scope.listOfCars = myCar.auto;
    //     }).error(function (error) {
    //         //Showing error message
    //         $scope.status = 'Unable to delete a person:';
    //     });
    // };
    //
    // $scope.showMyCars2 = function () {
    //     $http({
    //         method: 'GET',
    //         url: '/user/id/' + $scope.currentUserID
    //     }).success(function (data) {
    //         myCar = data;
    //         $scope.listOfCars = myCar.auto;
    //     }).error(function (error) {
    //         $scope.status = 'Unable to delete a person:';
    //     });
    // };
    //
    // $scope.editStudy = function () {
    //     console.log($scope.edycja);
    //     var badanieObj = {
    //         id: $scope.idTech,
    //         dataBadania: $scope.datawykonaniaBadania,
    //         dataWaznosci: $scope.terminBadania
    //     };
    //     $http.post('daty/badanie/put/', badanieObj).success(function (data) { //wywloujemy
    //         alert('Thanks');
    //         idUser();
    //         $scope.selectedItemChanged();
    //     }).error(function (error) {
    //         alert("nie udało się ");
    //         console.log(error)
    //     })
    // };


    $scope.loadData = function () {
        loadAllInspectionOfMyCar($scope.idToGet);
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
            $scope.myCar = data; // widoku będziesz używał teraz people
            // console.log(myCar);
        }).error(function (error) {
            //Showing error message
            $scope.status = 'Unable to delete a person:';
        });
    };


    $scope.selectQ = function (id) {
        $scope.IdCar = 0;
        $scope.IdCar = id;
        $routeParams.id = id;
        console.log(id);
    };

    // wyswietlanie badań technicznych
    var loadAllInspection = function () {
        var Inspection = $resource('daty/all/polisa', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });
        Inspection.query(function (response) {
            $scope.Inspection = response;

        });
    };
    loadAllInspection();


    // wyswietlanie badann
    var loadAllBadanieTechniczne = function () {
        var BadanieT = $resource('daty/all/badanietechniczne', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });
        BadanieT.query(function (response) {
            $scope.badaniet = response; // widoku będziesz używał teraz people
        });
    };
    loadAllBadanieTechniczne();


    var loadAllInspectionOfMyCar = function (id) {
        console.log(id);
        $http({
            method: 'GET',
            url: '/auto/id/' + id
        }).success(function (data) {
            $scope.InspectionOneCar = data;
            console.log(data);
        }).error(function (error) {
            $scope.status = 'Unable to delete a person:';
        });
    };

    $scope.deleteInspection = function (Id) {
        $http({
            method: 'DELETE',
            url: 'daty/delete/polisa/id/' + Id
        }).success(function (data) {
            loadAllInspection();
        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });
    };


    $scope.deleteOneInspection = function (id) {
        AutoService.deleteOneInspection($scope.selectCarOne, id).then(function (response2) {
            if (response2.status == 200) {
                $scope.deleteInspection(id);
            }
            loadAllInspectionOfMyCar($scope.idToGet);
        });
    };

    $scope.showInspection = function (Id) {

        $http({
            method: 'GET',
            url: '/daty/badanie/id/' + Id
        }).success(function (date) {

            $scope.idTech= Id;
            $scope.DataOdE = new Date(date.dataBadania);
            $scope.DataDoE = new Date(date.dataWaznosci);

        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });
    };

    $scope.saveInspection = function (id) {
        //Potrzebujemy stworzyc nasz obiekt, ktorego zadamy w Javie patrz RequestBody
        var InspectionObject = {
            dataBadania: $scope.DataOd,
            dataWaznosci: $scope.DataDo
        };

        $http.post('/daty/addBadanie', InspectionObject).success(function (data) {
            $http.post('/auto/putRelationBadanie/' + $scope.idToGet, data).success(function (data2) { //wywloujemy
                alert("Badanie techniczne zostalo dodane");
                loadAllInspectionOfMyCar(id);
                window.location.reload(true);
            });

        }).error(function () {
            alert('Coś poszło nie tak');
        })
    };

    $scope.editInspection = function () {
        var InspectionObj = {
            id: $scope.idTech,
            dataBadania: $scope.DataOdE,
            dataWaznosci: $scope.DataDoE
        };
        $http.post('daty/badanie/put/',InspectionObj ).success(function () {

            window.location.reload(true);
        }).error(function (error) {
            alert("nie udało się ");
            //Showing error message
            console.log(error)
        })
    };

    var carInspection = function (id) {
        AutoService.getCar(id).then(function (response2) {
            console.log(" badanie" + Inspection.size);
            if (response2.status == 200) {
                if (response2.Inspection.size == 0) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        });
    };

    $scope.getCarId = function (id) {
        $scope.idToGet = id;
        console.log(id);
    }
});
