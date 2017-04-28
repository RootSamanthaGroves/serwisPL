/**
 * Created by Dominika on 2017-04-28.
 */
angular.module('nikoApp').service('UserService', function ($http) {

        this.getUserById = function (id) {
            var url = '/user/id/' + id;
            return $http({
                method: "GET",
                url: url
            }).then(function successCallback(response) {
                return response;
            }, function errorCallback(response) {
                return response.status;
            });
        };

    }
);