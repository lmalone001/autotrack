var loginmodule = angular.module('client.login', []);

loginmodule
    .controller('loginController',
        function($rootScope, $scope, $mdDialog, $mdToast, $window, $location,
                    userService) {

            $rootScope.location = $location;

            // read products
            $scope.login = function(){

                // use products factory
                userService.login($scope)
                    .then(function successCallback(response){
                        console.log(response);
                        // $rootScope.userid = response.data.id;
                        var userId = response.data.id;
                        localStorage.setItem("userId", userId);
                        $window.location.href = '/#/cars';

                    }, function errorCallback(response){
                        console.log(response.data.message);
                        $scope.showToast(response.data.message);
                    });

            }
            // register
            $scope.register = function(){

                userService.register($scope)
                    .then(function successCallback(response){
                        console.log(response.data.id);
                        $rootScope.userid = response.data.id;
                        $window.location.href = '/#/login';
                        // $scope.showToast("You are registered!");

                }, function errorCallback(response){
                        console.log(response.data.message);
                        $scope.showToast(response.data.message);
                });
            }

        });