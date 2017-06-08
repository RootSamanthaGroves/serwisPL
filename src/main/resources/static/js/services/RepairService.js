/**
 * Created by Dominika on 2017-05-08.
 */

angular.module('nikoApp').service('RepairService', function ($http) {

    this.showMeCar = function (id) {
        var url = '/auto/id ' + id;
        return $http({
            method: "GET",
            url: url
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            return response.status;
        });
    };


    this.deleteRepair = function (id) {
        return $http({
            method: 'DELETE',
            url: '/naprawa/delete/id/' + id
        }).then(function successCallback(response) {
            alert(response.status);
            return response;
        }, function errorCallback(response) {
            return response.status;
        });
    };

    this.updateRepair = function (car) {
        return $http({
            method: "POST",
            url: '/auto/putRelation/'+ id,
            data: car
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            return response.status;
        });
    };




});
