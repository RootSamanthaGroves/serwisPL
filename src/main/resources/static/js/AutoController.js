/**
 * Created by Dominika on 2017-04-07.
 */
angular.module('nikoApp').controller('AutoController', function ($scope, $resource, $http, $rootScope, LoginService, AutoService, UserService) {
    $scope.message = " ";
    $scope.gallery = [];
    $scope.items = [];
    $scope.selected = [];
    $scope.body_types = AutoService.bodyTypesCar();
    $scope.fuel_types = AutoService.fuelTypesCar();

    var num = 0.0;
    $scope.qty = new Quantity(12);
    $scope.cap = new Quantity(12);
    $scope.num = num;


    var listYears = [];
    var year = new Date().getFullYear();
    listYears.push(year);
    for (var i = 1; i < 118; i++) {
        listYears.push(year - i);
    }
    $scope.years = listYears;

    // walidania do nazwy numeru vin
    $(document).ready(function () {
        $('.sendButton').attr('disabled', false);

        $('#numerVinE').keyup(function () {
            if ($(this).val().length == 17) {
                $('.sendButton').attr('disabled', false);
            }
            else {
                $('.sendButton').attr('disabled', true);
            }
        })
    });

    // walidania do nazwy numeru vin
    $(document).ready(function () {
        $('.addCar').attr('disabled', true);

        $('#numerVINAuto').keyup(function () {
            if ($(this).val().length == 17) {
                $('.addCar').attr('disabled', false);
            }
            else {
                $('.addCar').attr('disabled', true);
            }
        })
    });

    // walidania do nazwy liczb
    $(document).ready(function () {
        $('.addCar').attr('disabled', true);

        $('#pojSilnikaAuto').keyup(function () {
            if ($(this).val().length >= 9) {
                $('.addCar').attr('disabled', false);
            }
            else {
                $('.addCar').attr('disabled', true);
            }
        })
    });

    // walidania do nazwy liczb
    $(document).ready(function () {
        $('.addCar').attr('disabled', true);

        $('#mocAuto').keyup(function () {
            if ($(this).val().length >= 9) {
                $('.addCar').attr('disabled', false);
            }
            else {
                $('.addCar').attr('disabled', true);
            }
        })
    });

    var idUser = function () {
        LoginService.getCurrentUser().then(function (response) {
            if (response.status == 200) {
                $scope.currentUserID = response.data.id;
                showMe(response.data.id);
            }
        })
    };
    idUser();

    $scope.saveAuto = function () {

        if ($scope.gallery.length === 0) {
            $scope.image = undefined;
        } else {
            if ($scope.gallery[0].indexOf('data:image/jpeg;base64,') >= 0) {
                $scope.image = $scope.gallery[0].replace('data:image/jpeg;base64,', '');
            }
            if ($scope.gallery[0].indexOf('data:image/png;base64,') >= 0) {
                $scope.image = $scope.gallery[0].replace('data:image/png;base64,', '');
            }
        }
        var autoObject = {
            image: $scope.image,
            marka: $scope.markaAuto,
            model: $scope.modelAuto,
            mocSilnika: $scope.qty.mocAuto,
            numerRejestracyjny: $scope.numerRejAuto,
            numerVIN: $scope.numerVinAuto,
            pojemnoscSilnika: $scope.pojSilnikaAuto,
            rodzajNadwozia: $scope.rodzNadwoziaAuto,
            rodzajPaliwa: $scope.rodzajPaliwAuto,
            rokProdukcji: new Date($scope.rokProAuto + '-01-01T01:01:01Z')
        };
        console.log(autoObject);
        msg = $scope.numerVinAuto.toUpperCase();
        console.log(msg.includes("Q") + " " + msg);
        if (msg.includes("O") || msg.includes("I") || msg.includes("Q")) {
            $('.addCar').attr('disabled', false);
            alert("Numer VIN nie mo zawierać liter I, Q, O");
        } else {
            AutoService.saveCar(autoObject).then(function (response) {
                if (response.status == 200) {
                    $scope.savedCar = response.data;
                    UserService.addUserCar($scope.savedCar).then(function (response2) {
                        if (response2.status == 200) {
                            $scope.gallery = [];
                            alert("Auto zostało dodane");
                            // picker_preview_remove.click();
                            $scope.markaAuto = "";
                            $scope.modelAuto = "";
                            $scope.mocAuto = "";
                            $scope.numerRejAuto = "";
                            $scope.numerVinAuto = "";
                            $scope.pojSilnikaAuto = "";
                            $scope.rodzNadwoziaAuto = "";
                            $scope.rodzajPaliwAuto = "";
                            $scope.rokProAuto = "";
                            showMe($scope.currentUserID);
                        }
                    })
                } else {
                    alert("Dodawanie auta nie powiodło się");
                }
            })
        }


    };

    // wyświetlanie aut
    var loadAllCars = function () {

        var Car = $resource('auto/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}

        });

        Car.query(function (response) {

            // alert(response);
            $rootScope.car = response; // widoku będziesz używał teraz people
            // console.log(response);
        });
    };
    loadAllCars();

    $scope.deleteCar = function (id) {
        UserService.deleteUserCar(id).then(function (response2) {
            if (response2.status == 200) {
                // var autko = AutoService.deleteCar(id)
            }
            showMe($scope.currentUserID);
        });
    };

    $scope.showCar = function (Id) {


        $http({
            method: 'GET',
            url: '/auto/id/' + Id
        }).success(function (data) {

            $scope.idAutoE = data.id;
            $scope.imageE = data.image;
            $scope.markaE = data.marka;
            $scope.modelE = data.model;
            $scope.numerVinE = data.numerVIN;
            $scope.numerRejE = data.numerRejestracyjny;
            $scope.rokProE = new Date(data.rokProdukcji);
            $scope.rodzNadwoziaE = data.rodzajNadwozia;
            $scope.pojSilnikaE = data.pojemnoscSilnika;
            $scope.mocAutoE = data.mocSilnika;
            $scope.rodzajPaliE = data.rodzajPaliwa;
            // console.log(data.image);
        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ';
            });

    }

    $scope.editCar = function () {
        var carObj = {
            id: $scope.idAutoE,
            marka: $scope.markaE,
            model: $scope.modelE,
            numerVIN: $scope.numerVinE,
            numerRejestracyjny: $scope.numerRejE,
            rokProdukcji: new Date($scope.rokProE + '-01-01T01:01:01Z'),// "Sat Jun 17 " + $scope.rokProE + " 01:00:02 GMT+0200 (Środkowoeuropejski czas letni)",
            rodzajNadwozia: $scope.rodzNadwoziaE,
            pojemnoscSilnika: $scope.cap.capacityAuto,

            mocSilnika: $scope.qty.mocAuto,
            rodzajPaliwa: $scope.rodzajPaliE
        };
        msg = $scope.numerVinE.toUpperCase();
        console.log(msg.includes("Q") + " " + msg);
        if (msg.includes("O") || msg.includes("I") || msg.includes("Q")) {

            $('.addCar').attr('disabled', false);
            alert("Numer VIN nie mowinien zawierać liter I, Q, O");
        } else {
            AutoService.updateCar(carObj).then(function (response) {
                if (response.status == 200) {
                    showMe($scope.currentUserID);
                } else {
                    alert("Nie udało się edytować auta");
                }
            });
        }

    };

    var showMe = function (Id) {
        $http({
            method: 'GET',
            url: '/user/id/' + Id
        }).success(function (data) {
            $scope.me = data; // widoku będziesz używał teraz people
        }).error(function (error) {
            //Showing error message
            $scope.status = 'Unable to delete a person:';
        });
    };

//IMAGE PICKER
    (function ($) {

        $.fn.imagePicker = function (options) {

            // Define plugin options
            var settings = $.extend({
                // Input name attribute
                name: "",
                // Classes for styling the input
                class: "form-control btn btn-default btn-block",
                // Icon which displays in center of input
                icon: "glyphicon glyphicon-plus"
            }, options);

            // Create an input inside each matched element
            return this.each(function () {
                $(this).html(create_btn(this, settings));
            });

        };

        // Private function for creating the input element
        function create_btn(that, settings) {
            // The input icon element
            var picker_btn_icon = $('<i class="' + settings.icon + '"></i>');

            // The actual file input which stays hidden
            var picker_btn_input = $('<input type="file" name="' + settings.name + '" />');

            // The actual element displayed
            var picker_btn = $('<div class="' + settings.class + ' img-upload-btn"></div>')
                .append(picker_btn_icon)
                .append(picker_btn_input);
            // File load listener
            picker_btn_input.change(function () {
                if ($(this).prop('files')[0]) {
                    // Use FileReader to get file
                    var reader = new FileReader();

                    // Create a preview once image has loaded
                    reader.onload = function (e) {
                        var preview = create_preview(that, e.target.result, settings);
                        $(that).html(preview);
                    }

                    // Load image
                    reader.readAsDataURL(picker_btn_input.prop('files')[0]);
                    // console.log(picker_btn_input.prop('files')[0]);
                    //MOJE
                    // alert(reader.readAsDataURL(picker_btn_input.prop('files')[0]));
                }
            });

            return picker_btn
        };

        // Private function for creating a preview element
        function create_preview(that, src, settings) {
            // The preview image
            var picker_preview_image = $('<img src="' + src + '" class="img-responsive img-rounded" />');
            //MOJE
            $scope.immmg = src;
            $scope.gallery.push(src);

            // The remove image buttoni
            var picker_preview_remove = $('<button class="btn btn-warning" id="delPhoto"><small>' +
                '<span class="glyphicon glyphicon glyphicon-trash"></span></small></button>');

            // The preview element
            var picker_preview = $('<div class="text-center"></div>')
                .append(picker_preview_image)
                .append(picker_preview_remove);

            // Remove image listener
            picker_preview_remove.click(function () {
                var btn = create_btn(that, settings);
                $(that).html(btn);
                $scope.gallery.splice($scope.gallery.indexOf(src), 1);
            });

            return picker_preview;
        };

    }(jQuery));

    $(document).ready(function () {
        $('.img-picker').imagePicker({name: 'images'});
    })
});


function Quantity(numOfPcs) {
    var mocAuto = numOfPcs;
    var capacityAutocapacityAuto = numOfPcs;

    this.__defineGetter__("qty", function () {
        return mocAuto;
    });

    this.__defineSetter__("qty", function (val) {
        val = parseInt(val);
        mocAuto = val;
        capacityAuto = val;
    });

    this.__defineGetter__("cap", function () {
        return capacityAuto;
    });

    this.__defineSetter__("cap", function (val) {
        val = parseInt(val);
        capacityAuto = val;
    });
}