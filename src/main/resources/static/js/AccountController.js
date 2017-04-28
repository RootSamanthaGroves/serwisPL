/**
 * Created by Dominika on 2017-04-06.
 */

angular.module('nikoApp').controller('AccountController', function ($scope, $localStorage, $resource, $http, UserService) {
    $scope.message = 'Hello from AccountController';
    $scope.curUser;
    var getUserById = function (id) {
        UserService.getUserById(id)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.curUser = response.data;
                    alert($localStorage.currentUser.id);
                }
            })
    };
    getUserById($localStorage.currentUser.id);
    // alert(curUser.firstName)


    $scope.saveUser = function () {
        var email = $scope.emailOfUser;
        var firstName = $scope.firstNameOfUser; //pobieramy imie z pola w html
        var password = $scope.passwordOfUser;
        var acountRole = "";

        alert(firstName + email);


        //Potrzebujemy stworzyc nasz obiekt, ktorego zadamy w Javie patrz RequestBody
        var userObject = {
            email: $scope.emailOfUser,
            firstName: $scope.firstName,
            password: $scope.passwordOfUser,
            role: "ROLE_USER"
        };
        alert(userObject.firstName + userObject.email);
        $http.post('/user/add', userObject).success(function () { //wywloujemy
            alert('Twoje konto zostało utworzone');
            $scope.emailOfUser = "";
            $scope.firstNameOfUser = ""; //pobieramy imie z pola w html
            $scope.passwordOfUser = "";

        }).error(function () {
            alert('Coś poszło nie tak' +
                ' Możliwe ze konto o podanym adresie email już istnieje');
        })
    };
    // alert($scope.emailZalogowany);

    // this.findOneUserByEmail = function () {
    //     // email=$scope.curUser.email;
    //     alert($scope.emailA)
    //     var url = '/user/email/' + email;
    //     return $http({
    //         method: "GET",
    //         url: url
    //     }).then(function successCallback(response) {
    //         return response;
    //     }, function errorCallback(response) {
    //         return response.status;
    //     });
    // };

    // $rootScope.loadAllSurveyFromDb = function () {
    //     var Survey = $resource('survey/all', {}, {
    //         query: {method: 'get', isArray: true, cancellable: true}
    //     });
    //
    //     Survey.query(function (response) {
    //         $scope.survey = response;
    //     });
    // };

    // $scope.findOneUserByEmail = function (email) {
    //     alert("blablba" + email);
        // var Me = $resource('user/email', {}, {
        //     query: {method: 'get', isArray: true, cancellable: true}
        // });
        //
        // Me.query(function (response) {
        //     $scope.Me = response;
        // });
        //     var user = $resource('user//email',{},{
        //         query: {method: 'get', isArray: false, cencellable:true}
        //     });
        // .get('/user/email', email).success(function () { //wywloujemy
        //     alert('Udało sie');
        //
        //
        // }).error(function () {
        //     alert('Coś poszło nie tak' +
        //         ' Możliwe ze konto o podanym adresie email już istnieje');
        // })
        // to działa

    //     var user = $resource('user/email', {}, {
    //         query: {method: 'get', isArray: false, cancellable: true}
    //
    //     });
    //     console.log(user);
    //     user.query(function (response) {
    //         $scope.myemail = response;
    //
    //     });
    //
    // }


    // $rootScope.email;

    // var findOneUserByEmail= function (email) {
    //     email=$scope.emailZalogowany;
    //         var url = '/user/email/' + email;
    //         return $http({
    //             method: "GET",
    //             url: url
    //         }).then(function successCallback(response) {
    //             return response;
    //         }, function errorCallback(response) {
    //             return response.status;
    //
    //     // LoginService
    // .getCurrentUser()
    // .then(function (response) {
    // if (response.status == 200) {
    //     $rootScope.email = response.data.email;
    //     $localStorage.email = response.data.email;
    //     $localStorage.role = response.data.role;
    //
    //     if (angular.equals(response.data.role, 'ROLE_ADMIN')) {
    //         $rootScope.admin = true;
    //         $localStorage.isAdmin = true;
    //     } else {
    //         $rootScope.admin = false;
    //         $localStorage.isAdmin = false;
    //     }
    //     $location.path("/");
    // }
    //         })
    // };
    // findOneUserByEmail();


});
