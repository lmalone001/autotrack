// Declare app level module which depends on views, and core components
var myApp = angular.module('client', [
    'ngRoute',
    'client.cars',
    'client.login',
    'ngMaterial',
    'ngAnimate',
    'ngMessages'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');

    $routeProvider
      .when('/', {
          templateUrl: 'cars/cars.html',
          controller: 'carController',
          controllerAs: 'cars'
      })
      .when('/login', {
          templateUrl: 'login/login.html',
          controller: 'loginController',
          controllerAs: 'login'
      })
        .when('/register', {
            templateUrl: 'register/register.html',
            controller: 'loginController',
            controllerAs: 'register'
        })
        .when('/schedule/:carId', {
            templateUrl: 'serviceTypes/serviceTypes.html',
            controller: 'carController',
            controllerAs: 'myCar'
        })
        .when('/history/:serviceTypeId', {
            templateUrl: 'history/history.html',
            controller: 'carController',
            controllerAs: 'cars'
        })
        .when('/cars', {
          templateUrl: 'cars/cars.html',
          controller: 'carController',
          controllerAs: 'cars'
       })
        .when('/upcoming', {
            templateUrl: 'cars/cars.html',
            controller: 'carController',
            controllerAs: 'cars'
        })
        .when('/history', {
            templateUrl: 'cars/cars.html',
            controller: 'carController',
            controllerAs: 'cars'
        })
        .when('/logout', {
            templateUrl: 'cars/cars.html',
            controller: 'carController',
            controllerAs: 'cars'
        })
        .when('', {
            templateUrl: 'login/login.html',
            controller: 'loginController',
            controllerAs: 'login'
        })
        .otherwise({redirectTo: '/login'});
}]);

