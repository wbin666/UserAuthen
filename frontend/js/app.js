(function() {
    'use strict';

    angular.module('PassportApp', ['ngRoute', 'ngFlash', 'ngAutodisable'])
        .config(angularLoginRouteProvider);

    angularLoginRouteProvider.$inject = ['$routeProvider', '$locationProvider'];
    function angularLoginRouteProvider($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/home.html'
            })
            .when('/forgot',{
                templateUrl: '/views/forgot.html',
                controller: 'ForgotCtrl',
                controllerAs: 'forgotVm'
            })
            .when('/login', {
                templateUrl: '/views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginVm'
            })
            .when('/profile', {
                templateUrl: '/views/profile.html',
                resolve: {
                    logincheck: checkLoggedin
                }
            })
            .when('/reset/:token', {
                templateUrl: '/views/reset.html',
                controller: 'ResetCtrl',
                controllerAs: 'resetVm'
            })
            .when('/signup', {
                templateUrl: '/views/signup.html',
                controller: 'SignUpCtrl',
                controllerAs: 'signupVm'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);

    }


    // checkLoggedin.$inject = ['$q', '$timeout', '$http', '$location', '$rootScope'];
    // function checkLoggedin($q, $timeout, $http, $location, $rootScope) {
    //     var deferred = $q.defer();
    //
    //     $http.get('/loggedin').success(function (user) {
    //         $rootScope.errorMessage = null;
    //         //User is Authenticated
    //         if (user !== '0') {
    //             $rootScope.currentUser = user;
    //             deferred.resolve();
    //         } else { //User is not Authenticated
    //             $rootScope.errorMessage = 'You need to log in.';
    //             deferred.reject();
    //             $location.url('/login');
    //         }
    //     });
    //     return deferred.promise;
    // }

    checkLoggedin.$inject = ['$q', 'userService', '$location', '$rootScope', 'Flash'];
    function checkLoggedin($q, userService, $location, $rootScope, Flash) {
        var deferred = $q.defer();

        userService.loggedinCheck()
            .then(loggedinCheckSuccessCb);

        return deferred.promise;

        function loggedinCheckSuccessCb(response) {
            //$rootScope.errorMessage = null;
            //User is Authenticated
            if (response.data !== '0') {
                $rootScope.currentUser = response.data;
                deferred.resolve();
            } else { //User is not Authenticated
                //$rootScope.errorMessage = 'You need to log in.';
                Flash.create("danger", 'You need to log in.');
                deferred.reject();
                $location.url('/login');
            }
        }
    }
    
})();