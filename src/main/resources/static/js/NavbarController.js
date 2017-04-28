/**
 * Created by Dominika on 2017-04-22.
 */
angular.module('nikoApp').controller('NavbarController', function ($rootScope, $scope, $resource, $localStorage, LoginService, $location, $route) {
    $rootScope.email;
    $rootScope.admin;

    var loadCurrentUser = function () {
        LoginService
            .getCurrentUser()
            .then(function (response) {
                if (response.status == 200) {
                    $rootScope.email = response.data.email;
                    $localStorage.name = response.data.name;
                    $localStorage.role = response.data.role;


                    if (angular.equals(response.data.role, 'ROLE_ADMIN')) {
                        $rootScope.admin = true;
                        $localStorage.isAdmin = true;
                    } else {
                        $rootScope.admin = false;
                        $localStorage.isAdmin = false;
                    }
                }
            })
    };
    loadCurrentUser();

    $scope.removeUserFromStorage = function () {
        delete $localStorage.email;
        delete $localStorage.isAdmin;
        $localStorage.$reset();
        LoginService
            .logoutUser()
            .then(function (response) {
                if (response.status == 200) {
                    alert('Zostałeś wylogowany.');
                    // $route.reload();
                    $location.path("#/");
                    $location.path("#/");
                }
            })
    }
});