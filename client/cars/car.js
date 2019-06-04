var carmodule = angular.module('client.cars', []);

carmodule
    .controller('carController',
        function($scope, $rootScope, $mdDialog, $mdToast, carService, userService) {

            // read products
            $scope.readCarsByUserId = function(){


                console.log($rootScope.userid);
                // use products factory
                carService.readCarsByUserId($scope)
                    .then(
                        function successCallback(response){
                            console.log(response);

                            $scope.cars = response.data;
                        }, function errorCallback(response){
                            console.log(response);
                        });

            }
                // create new product
                $scope.createCar = function(){

                    carService.createCar($scope)
                        .then(function successCallback(response){

                            // tell the user new product was created
                            $scope.showToast(response.data.message);

                            // refresh the list
                            // $scope.readProducts();

                            // close dialog
                            $scope.cancel();

                            // remove form values
                            $scope.clearProductForm();

                        }, function errorCallback(response){
                            $scope.showToast("Unable to create record.");
                        });
                }

                // show 'create product form' in dialog box
                $scope.showAddCarForm = function(event){

                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: '/client/cars/add_car.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        scope: $scope,
                        preserveScope: true,
                        fullscreen: true // Only for -xs, -sm breakpoints.
                    });
                }

            // clear variable / form values
            $scope.clearProductForm = function(){
                $scope.id = "";
                $scope.name = "";
                $scope.description = "";
                $scope.price = "";
            }

            // methods for dialog box
            function DialogController($scope, $mdDialog) {
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
            }

            // show toast message
            $scope.showToast = function(message){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(message)
                        .hideDelay(3000)
                        .position("top right")
                );
            }

        });



