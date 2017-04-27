angular.module('nikoApp').controller('HomeController', function ($scope, $rootScope, $location, LoginService, $localStorage) {
    $scope.message = 'Hello from HomeController';
    $rootScope.slider = true;
    $rootScope.email;
    $rootScope.admin;
    var loadCurrentUser = function () {
        LoginService
            .getCurrentUser()
            .then(function (response) {
                if (response.status == 200) {
                    $rootScope.email = response.data.email;
                    $localStorage.email = response.data.email;
                    $localStorage.role = response.data.role;

                    if (angular.equals(response.data.role, 'ROLE_ADMIN')) {
                        $rootScope.admin = true;
                        $localStorage.isAdmin = true;
                    } else {
                        $rootScope.admin = false;
                        $localStorage.isAdmin = false;
                    }
                    $location.path("/");
                }
            })
    };
    loadCurrentUser();
});