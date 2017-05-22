/**
 * Created by Dominika on 2017-05-22.
 */
/**
 * Created by Dominika on 2017-05-08.
 */

angular.module('nikoApp').service('PolicyService', function ($http) {

    this.showMeCar = function (id) {
        var url = '/auto/id ' + id;
        return $http({
            method: "GET",
            url: url,
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            return response.status;
        });
    };







});
