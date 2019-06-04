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
      .when('/login', {
          templateUrl: 'login/login.html',
          controller: 'loginController',
          controllerAs: 'login'
      })
      .when('/cars', {
          templateUrl: 'cars/cars.html',
          controller: 'carController',
          controllerAs: 'cars'
       })

      .otherwise({redirectTo: '/'});
}]);

