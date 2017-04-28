/**
 * Created by Dominika on 2017-04-07.
 */
angular.module('nikoApp').controller('AutoController', function ($scope, $resource, $http, $localStorage) {
    $scope.currUser = $localStorage.currentUser;

    $scope.test = function () {
        alert('Thanks');
    }




    $scope.saveAuto = function () {
        // var marka = $scope.markaAuto;
        // var model = $scope.modelAuto;
        // var numerVIN = $scope.numerVinAuto;
        // var numerRejestracyjny = $scope.numerRejAuto;
        // var mocSilnika = $scope.mocAuto;
        // var rokProdukcji = $scope.rokProAuto;
        // var pojemnoscSilnika = $scope.pojSilnikaAuto;
        // var rodzajNadwozia = $scope.rodzNadwoziaAuto;
        // var rodzajPaliwa = $scope.rodzajPaliwAuto


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

        $http.post('/auto/add', autoObject).success(function () {
            alert('Twoje auto zostało dodane');


        }).error(function () {
            alert('Coś poszło nie tak' +
                ' ');
        })
    };

});
