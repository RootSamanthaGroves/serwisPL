/**
 * Created by Dominika on 2017-04-11.
 */

angular.module('nikoApp').controller('NaprawaController', function ($scope, $resource, $http, $localStorage, LoginService, AutoService, UserService) {

        $scope.items = [];
        $scope.selected = [];
        $scope.gallery = [];

        $scope.loadData = function () {
            loadAllRepairOfMyCar();

        };


        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.selectQ = function (id) {
            $scope.IdCar = 0;
            $scope.IdCar = id;
            $routeParams.id = id;
            console.log(id);
        };

        $scope.saveNaprawa = function () {


            if ($scope.gallery[0].indexOf('data:image/jpeg;base64,') >= 0) {
                $scope.image = $scope.gallery[0].replace('data:image/jpeg;base64,', '');
            }
            if ($scope.gallery[0].indexOf('data:image/png;base64,') >= 0) {
                $scope.image = $scope.gallery[0].replace('data:image/png;base64,', '');
            }
            if ($scope.gallery[0] = "undefined") {
            }



            var naprawaObject = {
                paragon: $scope.image,
                data: $scope.dataNaprawy,
                przebieg: $scope.przebiegAuto,
                rodzaj: $scope.rodzajNaprawy,
                opis: $scope.opisNaprawy,
                koszt: $scope.kosztNaprawy
            };


            $http.post('/naprawa/add', naprawaObject).success(function (data) {
                $http.post('/auto/putRelation/' + $scope.selectCar, data).success(function (data2) { //wywloujemy
                    alert("Dodano");
                });

                loadAllRepair();
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
                $scope.myCar = data; // widoku będziesz używał teraz people
                // console.log(myCar);
            }).error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person:';
            });
        };


        // wyswietlanie naprawy
        var loadAllRepair = function () {
            var Repair = $resource('naprawa/all', {}, {
                query: {method: 'get', isArray: true, cancellable: true}
            });

            Repair.query(function (response) {
                //alert(response); teraz w response masz to co bys widzial w postmanie takiego jsona
                $scope.repair = response; // widoku będziesz używał teraz people
            });
        };
        loadAllRepair();


        var loadAllRepairOfMyCar = function () {

            console.log($scope.selectCarOne);
            $http({
                method: 'GET',
                url: '/auto/id/' + $scope.selectCarOne
            }).success(function (data) {
                $scope.repairOneCar = data; // widoku będziesz używał teraz people
            }).error(function (error) {
                $scope.status = 'Unable to delete a person:';
            });

        };


        $scope.deleteRepair = function (Id) {


            $http({
                method: 'DELETE',
                url: '/naprawa/delete/id/' + Id
            }).success(function (data) {
                // alert(data.toString());

                loadAllRepair();
            })
                .error(function (error) {
                    //Showing error message
                    $scope.status = 'Unable to delete a person: ' + error.message;
                });
        }

        $scope.deleteOneRepair = function (id) {
            AutoService.deleteOneRepair($scope.selectCarOne, id).then(function (response2) {
                if (response2.status == 200) {
                    $scope.deleteRepair(id);
                }

                loadAllRepairOfMyCar();
            });
        };


        $scope.showRepair = function (Id) {


            $http({
                method: 'GET',
                url: '/naprawa/id/' + Id
            }).success(function (data) {
                console.log(data.data)
                $scope.idE = data.id;

                var myDate = new Date(data.data);
                $scope.paragonE = data.paragon;
                $scope.dataE = myDate;
                $scope.przebiegE = data.przebieg;
                $scope.rodzajE = data.rodzaj;
                $scope.opisE = data.opis;
                $scope.kosztE = data.koszt;


            })
                .error(function (error) {
                    //Showing error message
                    $scope.status = 'Unable to delete a person: ' + error.message;
                });

        }


        $scope.editRepair = function () {
            var repairObj = {

                id: $scope.idE,
                data: $scope.dataE,
                przebieg: $scope.przebiegE,
                rodzaj: $scope.rodzajE,
                opis: $scope.opisE,
                koszt: $scope.kosztE
            };
            $http.post('/naprawa/put/', repairObj).success(function () {
                // loadAllRepair();
                loadAllRepairOfMyCar();
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
                  alert(src);
                $scope.immmg = src;
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


    }
);

