/**
 * Created by Dominika on 2017-05-04.
 */

angular.module('nikoApp').controller('TechnicalController', function ($scope, $resource, $http) {
    $scope.message = 'Hello from TechnicalController';

    $scope.setEdit = function(h){
        $scope.edit = h;

    };

    // wyswietlanie naprawy
    var loadAllStudy = function () {
        var Study = $resource('daty/all/badanietechniczne', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        Study.query(function (response) {
            //alert(response); teraz w response masz to co bys widzial w postmanie takiego jsona
            $scope.study = response; // widoku będziesz używał teraz people
        });
    };
    loadAllStudy();


    $scope.deleteStudy = function (Id) {
        $http({
            method: 'DELETE',
            url: 'daty/delete/badanie/id/' + Id
        }).success(function (data) {
            // alert(data.toString());

            loadAllStudy();
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
            loadAllStudy();
            $scope.datawykonaniaBadania = "";
            $scope.terminBadania = "";
        }).error(function () {
            alert('Coś poszło nie tak');
        })

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

            loadAllStudy();

        }).error(function (error) {
            alert("nie udało się ")
                 console.log(error)

        })

    };


});
