/**
 * Created by Dominika on 2017-04-07.
 */
angular.module('nikoApp').controller('AutoController', function ($scope, $resource, $http, $localStorage) {
    $scope.currUser = $localStorage.currentUser;
    var id;
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

           // alert($localStorage.currentUser.id + " " );
            console.log(response);
            // alert(response.id);
            id= response.id;
            saveRel(response.id);
        }).error(function () {
            alert('Coś poszło nie tak' +
                ' ');
        })
    };

    var saveRel = function (id) {
        alert(id+" "+$localStorage.currentUser.id)
        var Object = {
            idUser:$localStorage.currentUser.id,
            idCar: id


        };

        $http.post('/user/put/'+ $localStorage.currentUser.id ,  Object).success(function () { //wywloujemy
            alert('Thanks');




        }).error(function () {
            alert("nie udało się ")
        })
    };



    $scope.saveRelations = function () {
        alert(id)
        alert($localStorage.currentUser.id + " " + id);



        var questionObject = {
            user: $scope.$localStorage.currentUser.id,
            car: $scope.car.id
        };

        $http.post('/question/put/'+ $routeParams.id ,  questionObject).success(function () { //wywloujemy
            alert('Thanks'+$scope.selected);



        }).error(function () {
            alert("nie udało się ")
        })
    };


});
