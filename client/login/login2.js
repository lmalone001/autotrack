var loginmodule = angular.module('client.login', []);

loginmodule
    .controller('loginController',
        function($rootScope, $scope, $mdDialog, $mdToast, userService,$window) {

            // read products
            $scope.login = function(){

                // use products factory
                userService.login($scope)
                    .then(
                    function successCallback(response){
                        console.log(response);
                        $rootScope.userid = response.data.user.id;

                        $window.location.href = '/client/#/cars';
                    }, function errorCallback(response){
                        console.log(response);
                        // $scope.showToast(response);
                    });

            }
            // register
            $scope.register = function(){

                userService.register($scope)
                    .then(function successCallback(response){
                            console.log(response);
                            $rootScope.userid = response.data.user.id;

                }, function errorCallback(response){
                            console.log(response);
                });
            }

        });