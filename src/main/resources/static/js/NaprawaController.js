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
      
        $http.post('/naprawa/add', naprawaObject).success(function () {
            alert('Dodawanie powiodło się');


        }).error(function () {
            alert('Coś poszło nie tak');
        })
    };

});

