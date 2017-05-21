/**
 * Created by Dominika on 2017-04-11.
 */

angular.module('nikoApp').controller('DatyController', function ($scope, $resource, $http) {





    $scope.saveBadanie = function () {
        // alert(dataNaprawy+przebiegAuto);

        var badanieObject = {

            data: $scope.datawykonaniaBadania,
             dataD: $scope.terminBadania

        };

        alert(badanieObject.data+" "+ badanieObject.dataD)

        console.log(badanieObject.data)

        $http.post('/daty/addBadanie', badanieObject).success(function () {
            alert('Dodawanie powiodło się');


        }).error(function () {
            alert('Coś poszło nie tak');
        })
    };

    $scope.saveUbezpieczenie = function () {
        // alert(dataNaprawy+przebiegAuto);

        var ubezpieczenieObject = {

            // dataDod: $scope.dataDodania,
            numerPolisy: $scope.numerPolisy,
            dataDod: new Date($scope.dataO),
            dataO: $scope.dataOd,
            dataD: $scope.dataDo,
            skladka: $scope.skladkaOC
            // data: $scope.dataNaprawy,
            // przebieg: $scope.przebiegAuto,
            // rodzaj: $scope.rodzajNaprawy,
            // opis: $scope.opisNaprawy,
            // koszt: $scope.kosztNaprawy
        };
        console.log(ubezpieczenieObject.dataO)

        $http.post('/daty/addPolisa', ubezpieczenieObject).success(function () {
            alert('Dodawanie powiodło się');


        }).error(function () {
            alert('Coś poszło nie tak');
        })
    };

});

