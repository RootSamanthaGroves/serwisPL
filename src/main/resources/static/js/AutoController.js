/**
 * Created by Dominika on 2017-04-07.
 */
angular.module('nikoApp').controller('AutoController', function ($scope, $resource, $http) {


    $scope.test = function () {
        alert('Thanks');
    }


    // (function() {
    //     $('#datepicker').datepicker({
    //         changeYear: true,
    //         showButtonPanel: true,
    //         dateFormat: 'yy',
    //         onClose: function(dateText, inst) {
    //             var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
    //             $(this).datepicker('setDate', new Date(year, 1));
    //         }
    //     });
    //     $(".date-picker-year").focus(function () {
    //         $(".ui-datepicker-month").hide();
    //     });
    // });

    $scope.saveAuto = function () {
        var marka = $scope.markaAuto;
        var model = $scope.modelAuto;
        var numerVIN = $scope.numerVinAuto;
        var numerRejestracyjny = $scope.numerRejAuto;
        var mocSilnika = $scope.mocAuto;
        var rokProdukcji = $scope.rokProAuto;
        var pojemnoscSilnika = $scope.pojSilnikaAuto;
        var rodzajNadwozia = $scope.rodzNadwoziaAuto;
        var rodzajPaliwa = $scope.rodzajPaliwAuto


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
