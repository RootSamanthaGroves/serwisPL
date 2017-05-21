/**
 * Created by Dominika on 2017-05-08.
 */
angular.module('nikoApp').service('AutoService', function ($http) {

    this.saveCar = function (car) {
        var url = '/auto/add/';
        return $http({
            method: "POST",
            url: url,
            data: car
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            return response.status;
        });
    };


    this.deleteCar = function (id) {
        return $http({
            method: 'DELETE',
            url: '/auto/delete/id/' + id
        }).then(function successCallback(response) {
            alert(response.status);
            return response;
        }, function errorCallback(response) {
            return response.status;
        });
    };

    this.deleteOneRepair = function (id, idNap) {
        return $http({
            method: 'DELETE',
            url: 'auto/deleteNap/id/' + id + '/' + idNap
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            return response.status;
        });
    };


    this.updateCar = function (car) {
        return $http({
            method: "POST",
            url: '/auto/update/',
            data: car
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            return response.status;
        });
    };

});