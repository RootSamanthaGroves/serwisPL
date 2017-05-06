/**
 * Created by Dominika on 2017-04-07.
 */
angular.module('nikoApp').controller('AutoController', function ($scope, $resource, $http, $rootScope, LoginService, $location, $localStorage) {

    $scope.gallery = [];
    $scope.items = [];
    $scope.selected = [];
    var idAddcar= 1;
    var item;

    $scope.test = function () {
        alert('Thanks');
    }


    //user
    // $scope.selectQ = function () {
    //     $scope.user = 0;
    //     $scope.user = IdU;
    //     $routeParams.id = IdU;
    //     alert(IdU);
    // };


    //car a, selected
    //item, list
    // $scope. toggle = function () {
    //     console.log("toggle");
    //     var idx = $scope.selected.indexOf(item);
    //     console.log(item);
    //     if (idx > -1) {
    //         $scope.selected.splice(idx, 1);
    //     }
    //     else {
    //         $scope.selected.push(item);
    //     }
    // };

    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(item);
        }
    };

    // var exists = function (item, list) {
    //     return list.indexOf(item) > -1;
    //     alert("exist");
    // };

    $rootScope.saveAuto = function () {

        var autoObject = {
            image: $scope.gallery[0].replace('data:image/jpeg;base64,', ''),
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

        $http.post('/auto/add', autoObject).success(function (data) {
            alert('Twoje auto zostało dodane');


            loadAllCars();
            console.log(data.id);

             item =autoObject;



            $scope.toggle(data, $scope.selected);


            alert("id dodanego auta " + data)
            // saveRel(response.id);
        }).error(function () {
            alert('Coś poszło nie tak' +
                ' ');
        })
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

    $scope.deleteCar = function (Id) {
        // alert(Id)
        $http({
            method: 'DELETE',
            url: '/auto/delete/id/' + Id
        }).success(function (data) {

            loadAllCars();
        })
            .error(function (error) {
                loadAllCars();
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error;
            });
    }

    $scope.showCar = function (Id) {


        $http({
            method: 'GET',
            url: '/auto/id/' + Id
        }).success(function (data) {

            $scope.idAutoE = data.id;
            $scope.markaE = data.marka;
            $scope.modelE = data.model;
            $scope.numerVinE = data.numerVIN;
            $scope.numerRejE = data.numerRejestracyjny;
            $scope.rokProE = new Date(data.rokProdukcji);
            $scope.rodzNadwoziaE = data.rodzajNadwozia;
            $scope.pojSilnikaE = data.pojemnoscSilnika;
            $scope.mocAutoE = data.mocSilnika;
            $scope.rodzajPaliE = data.rodzajPaliwa;

            alert(new Date(data.rokProdukcji));


        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });

    }

    $scope.editCar = function () {
        var carObj = {

            id: $scope.idAutoE,
            marka: $scope.markaE,
            model: $scope.modelE,
            numerVIN: $scope.numerVinE,
            numerRejestracyjny: $scope.numerRejE,
            rokProdukcji: $scope.rokProE,
            rodzajNadwozia: $scope.rodzNadwoziaE,
            pojemnoscSilnika: $scope.pojSilnikaE,
            mocSilnika: $scope.mocAutoE,
            rodzajPaliwa: $scope.rodzajPaliE
        };


        $http.post('/auto/put/', carObj).success(function () { //wywloujemy
            alert('Thanks');

            loadAllCars();

        }).error(function (error) {
            alert("nie udało się ")
            //Showing error message
            console.log(error)

        })

    };

    $scope.AddRelation = function (id) {



         alert( $rootScope.id);
        // console.log($scope.selected + " " + $scope.question);



        var userObject = {
            id:$rootScope.id,
            // email:$rootScope.email,
            // role:$rootScope.role,
            auto: $scope.selected
        };

        alert(userObject.id+" uzytkownik     auto "+ userObject.auto)

        $http.post('/user/putRelation/'+ $rootScope.id,  userObject).success(function (data) { //wywloujemy
            alert('Thanks'+$scope.selected);
            loadAllCars();



        }).error(function (error) {
            alert("nie udało się ")
            //Showing error message
            console.log(error)

        })

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
            // alert(src);
            // $scope.immmg = src;
            $scope.gallery.push(src);
            // The remove image button
            var picker_preview_remove = $('<button class="btn btn-warning"><small>' +
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
