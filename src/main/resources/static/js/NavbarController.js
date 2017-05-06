/**
 * Created by Dominika on 2017-04-22.
 */
angular.module('nikoApp').controller('NavbarController', function ($rootScope, $scope, $resource, $localStorage, $window, LoginService, $location, $route) {
    $rootScope.email;
    $rootScope.admin;


    $scope.Refresh = function () {
        $window.location.reload();
    }


    var loadCurrentUser = function () {
        LoginService
            .getCurrentUser()
            .then(function (response) {
                if (response.status == 200) {
                    $rootScope.email = response.data.email; //rootScope umozliwia wyswietlanei w dowolnym miejscu
                    $rootScope.name = response.data.firstName;
                    $rootScope.role = response.data.role;
                    $rootScope.id = response.data.id;
                    console.log("navbar kurwa name " + $localStorage.firstName + " " + $localStorage.role + " " + $rootScope.id);

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