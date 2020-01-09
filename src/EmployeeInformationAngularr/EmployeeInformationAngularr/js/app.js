var myApp = angular.module('myApp',
    ['ngRoute', 'firebase'])
    .constant('FIREBASE_URL', 'https://angularregistration07-35546.firebaseio.com/');

//old
//var myApp = angular.module('myApp',
//    ['ngRoute', 'firebase'])
//    .constant('FIREBASE_URL', 'https://angreg77.firebaseIO.com/');


myApp.run(['$rootScope', '$location',
    function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError',
            function (event, next, previous, error) {
                if (error == 'AUTH_REQUIRED') {
                    $rootScope.message = 'Sorry, you must log in to access that page';
                    $location.path('/login');
                } // AUTH REQUIRED
            }); //event info
    }]); //run

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/login', {
            templateUrl: 'views/login.html',
            controller: 'RegistrationController'
        }).
        //when('/register', {
        //    templateUrl: 'views/register.html',
        //    controller: 'RegistrationController'
        //}).
        when('/changepassword', {
            templateUrl: 'views/changepassword.html',
            //controller: TODO : Change Password controller
        }). //changepassword
        when('/adduser', {
            templateUrl: 'views/adduser.html',
            controller: 'RegistrationController'
        }). //adduser
        when('/maintenanceusers', {
            templateUrl: 'views/maintenanceusers.html',
            //controller: TODO : Maintenance User controller
        }). //maintenanceusers
        when('/success', {
            templateUrl: 'views/success.html',
            controller: 'SuccessController',
            resolve: {
                currentAuth: function (Authentication) {
                    return Authentication.requireAuth();
                } //current Auth
            } //resolve
        }).
        otherwise({
            redirectTo: '/login'
        });
}]);