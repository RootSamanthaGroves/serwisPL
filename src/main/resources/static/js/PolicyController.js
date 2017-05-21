/**
 * Created by Dominika on 2017-05-04.
 */

angular.module('nikoApp').controller('PolicyController', function ($scope, $resource, $http) {
    $scope.message = 'Hello from AccountController';


    // wyswietlanie polis
    var loadAllPolicy = function () {
        var Policy = $resource('daty/all/polisa', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });
        Policy.query(function (response) {
            $scope.policy = response;

        });
    };
    loadAllPolicy();


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


    $scope.deletePolicy = function (Id) {
        $http({
            method: 'DELETE',
            url: 'daty/delete/polisa/id/' + Id
        }).success(function (data) {
            loadAllPolicy();
        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });
    }


    $scope.showPolicy = function (Id) {

        alert(Id)
        $http({
            method: 'GET',
            url: '/daty/polisa/id/' + Id
        }).success(function (date) {
            console.log(date.id)
            $scope.IdE = date.id;
            $scope.DataDodaniaE = new Date(date.data);
            $scope.NumerPolisyE = date.numerPolisy;
            $scope.DataOdE = new Date(date.dataOd);
            $scope.DataDoE = new Date(date.dataDo);
            $scope.SkladkaE = date.skladka;

        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });

    }


    $scope.savePolicy = function () {

        //Potrzebujemy stworzyc nasz obiekt, ktorego zadamy w Javie patrz RequestBody
        var policyObject = {
            data: $scope.DataDodania,
            numerPolisy: $scope.NumerPolisy,
            dataOd: $scope.DataOd,
            dataDo: $scope.DataDo,
            skladka: $scope.Skladka

        };


        $http.post('/daty/addPolisa', policyObject).success(function (data) { //wywloujemy
            loadAllPolicy();
        }).error(function () {
            alert('Coś poszło nie tak' +
                ' Możliwe ze konto o podanym adresie email już istnieje');
        })
    };


    $scope.editPolicy = function () {
        var policyObj = {

            id: $scope.IdE,
            data: $scope.DataDodaniaE,
            numerPolisy: $scope.NumerPolisyE,
            dataDo: $scope.DataDoE,
            dataOd: $scope.DataOdE,
            numerPolisy: $scope.NumerPolisyE,
            skladka: $scope.SkladkaE
        };

        alert("indeks " + policyObj.id)
        $http.post('daty/polisa/put/', policyObj).success(function () { //wywloujemy
            loadAllPolicy();

        }).error(function (error) {
            alert("nie udało się ")
            //Showing error message
            console.log(error)

        })

    };


});
