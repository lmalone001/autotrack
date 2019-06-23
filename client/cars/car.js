var carmodule = angular.module('client.cars', []);

carmodule
    .controller('carController',
        function($routeParams, $scope, $rootScope, $mdDialog, $mdToast, $window,
                 carService, userService) {
        var myCar = this;
        // myCar.carIdParam = $routeParams['carId'];

            // read products
            $scope.readCarsByUserId = function(){

                console.log($rootScope.userid);
                // use products factory
                carService.readCarsByUserId($scope).then(
                    function successCallback(response){
                        console.log(response);

                        $scope.cars = response.data;
                    }, function errorCallback(response){
                        console.log(response);
                    });
            }

            // retrieve record to fill out the form
            $scope.showUpdateCarForm = function(id){

                console.log(id);
                // get product to be edited
                carService.readCarById(id).then(function successCallback(response){

                    // put the values in form
                    console.log($scope.id);
                    $scope.id = response.data.id;
                    $scope.name = response.data.name;
                    $scope.mileage = response.data.mileage;

                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: '/client/cars/update_car.html',
                        parent: angular.element(document.body),
                        targetEvent: event,
                        clickOutsideToClose: true,
                        scope: $scope,
                        preserveScope: true,
                        fullscreen: true
                    }).then(
                        function(){},

                        // user clicked 'Cancel'
                        function() {
                            // clear modal content
                            $scope.clearCarForm();
                        }
                    );

                }, function errorCallback(response){
                    $scope.showToast("Unable to retrieve record.");
                });

            }

            // retrieve record to fill out the form
            $scope.showUpdateServiceForm = function(id){

                console.log(id);
                $scope.id = id;
                console.log($scope.id);
                // get product to be edited
                carService.readServiceTypeById(id).then(function successCallback(response){

                    // put the values in form
                    console.log($scope.id);
                    $scope.id = response.data.id;
                    $scope.name = response.data.name;
                    $scope.frequency = response.data.frequency;

                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: '/client/serviceTypes/update_servicetype.html',
                        parent: angular.element(document.body),
                        targetEvent: event,
                        clickOutsideToClose: true,
                        scope: $scope,
                        preserveScope: true,
                        fullscreen: true
                    }).then(
                        function(){},

                        // user clicked 'Cancel'
                        function() {
                            // clear modal content
                            $scope.clearServiceTypeForm();
                        }
                    );

                }, function errorCallback(response){
                    $scope.showToast("Unable to retrieve record.");
                });

            }


            $rootScope.setCar = function(car){

                $rootScope.carid = car.id;
                $rootScope.carname = car.name;
                $rootScope.carmileage = car.mileage;

            }

            $rootScope.setServiceType = function(serviceType){

                $rootScope.serviceTypeId = serviceType.id;
                $rootScope.serviceTypeName = serviceType.name;

            }

            // showCreateProductForm will be here
            // show 'create product form' in dialog box
            $scope.showAddCarForm = function(){
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

            $scope.showAddServiceForm = function(){
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '/client/serviceTypes/add_service_type.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    scope: $scope,
                    preserveScope: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                });
            }

            // show 'create product form' in dialog box
            $scope.showServiceTypes = function(){

                console.log($rootScope.carid);

                // use products factory
                carService.readServiceTypesByCarId($rootScope.carid).then(
                    function successCallback(response){
                        console.log(response);

                        $scope.serviceTypes = response.data;
                        console.log($scope.serviceTypes);
                        // $window.location.href = '#/cars/' + carId;
                        // $scope.carid = carId;

                    }, function errorCallback(response){
                        console.log(response);
                    });

            }

            // update product record / save changes
            $scope.updateCar = function(){

                carService.updateCar($scope).then(function successCallback(response){

                        // tell the user product record was updated
                        $scope.showToast(response.data.message);

                        // refresh the product list
                        $scope.readCarsByUserId();

                        // close dialog
                        $scope.cancel();

                        // clear modal content
                        $scope.clearCarForm();

                    },
                    function errorCallback(response) {
                        $scope.showToast("Unable to update record.");
                    });

            }

            // update product record / save changes
            $scope.updateServiceType = function(){

                carService.updateServiceType($scope).then(function successCallback(response){

                        // tell the user product record was updated
                        $scope.showToast(response.data.message);

                        // refresh the product list
                        $scope.showServiceTypes();

                        // close dialog
                        $scope.cancel();

                        // clear modal content
                        $scope.clearServiceTypeForm();

                    },
                    function errorCallback(response) {
                        $scope.showToast("Unable to update record.");
                    });

            }

            $scope.showHistory = function(){
                console.log("show history");
                console.log($rootScope.serviceTypeId);

                // use products factory
                carService.readServicesByServiceTypeId($rootScope.serviceTypeId).then(
                    function successCallback(response){
                        console.log(response);

                        $scope.services = response.data;
                        if ($scope.services.length == 0) {
                            $scope.showToast("you don't have any history yet");
                        }

                    }, function errorCallback(response){
                        console.log(response);
                    });

            }

            $scope.createCar = function(){

                carService.create($rootScope, $scope).then(
                    function successCallback(response){

                        // tell the user new product was created
                        $scope.showToast(response.data.message);

                        // refresh the list
                        // $scope.readProducts();
                        $scope.readCarsByUserId();

                        // close dialog
                        $scope.cancel();

                        // remove form values
                        $scope.clearCarForm();
                    }, function errorCallback(response){
                            $scope.showToast("Unable to create record.");
                    });
            }

            $scope.createServiceType = function(){

                carService.createServiceType($rootScope, $scope).then(
                    function successCallback(response){

                        // tell the user new product was created
                        $scope.showToast(response.data.message);

                        // refresh the list
                        // $scope.readProducts();
                        $scope.showServiceTypes();

                        // close dialog
                        $scope.cancel();

                        // remove form values
                        $scope.clearServiceTypeForm();
                    }, function errorCallback(response){
                        $scope.showToast("Unable to create record.");
                    });
            }

            // delete product
            $scope.deleteCar = function(){

                carService.deleteCar($scope.id).then(function successCallback(response){

                    // tell the user product was deleted
                    console.log(response);
                    $scope.showToast(response.data.message);

                    // refresh the list
                    $scope.readCarsByUserId();

                }, function errorCallback(response){
                    $scope.showToast("Unable to delete record.");
                });

            }

            $scope.deleteServiceType = function(){

                carService.deleteServiceType($scope.id).then(function successCallback(response){

                    // tell the user product was deleted
                    console.log(response);
                    $scope.showToast(response.data.message);

                    // refresh the list
                    $scope.showServiceTypes();

                }, function errorCallback(response){
                    console.log(response);
                    $scope.showToast("Unable to delete record.");
                });

            }

            $scope.completeServiceType = function(){
                console.log("here");
                console.log($scope.id);
                carService.completeServiceType($scope.id).then(function successCallback(response){

                    // tell the user service was completed
                    console.log(response);
                    $scope.showToast(response.data.message);

                    // refresh the list
                    $scope.showServiceTypes();

                }, function errorCallback(response){
                    console.log(response);
                    $scope.showToast("Unable to complete service.");
                });

            }


            $scope.confirmDeleteCar = function(id){

                // set id of record to delete
                console.log(id);
                $scope.id = id;

                // dialog settings
                var confirm = $mdDialog.confirm()
                    .title('Are you sure?')
                    .textContent('Car will be deleted.')
                    .targetEvent(event)
                    .ok('Yes')
                    .cancel('No');

                // show dialog
                $mdDialog.show(confirm).then(
                    // 'Yes' button
                    function() {
                        // if user clicked 'Yes', delete product record
                        $scope.deleteCar();
                    },

                    // 'No' button
                    function() {
                        // hide dialog
                    }
                );
            }


            $scope.confirmDeleteServiceType = function(id){

                // set id of record to delete
                console.log("servicetypeid" +id);
                $scope.id = id;

                // dialog settings
                var confirm = $mdDialog.confirm()
                    .title('Are you sure?')
                    .textContent('Service will be deleted.')
                    .targetEvent(event)
                    .ok('Yes')
                    .cancel('No');

                // show dialog
                $mdDialog.show(confirm).then(
                    // 'Yes' button
                    function() {
                        // if user clicked 'Yes', delete product record
                        $scope.deleteServiceType();
                    },

                    // 'No' button
                    function() {
                        // hide dialog
                    }
                );
            }

            $scope.confirmCompleteService = function(id){

                // set id of record to delete
                console.log("servicetypeid" +id);
                $scope.id = id;

                // dialog settings
                var confirm = $mdDialog.confirm()
                    .title('Are you sure?')
                    .textContent('Service will be completed.')
                    .targetEvent(event)
                    .ok('Yes')
                    .cancel('No');

                // show dialog
                $mdDialog.show(confirm).then(
                    // 'Yes' button
                    function() {
                        // if user clicked 'Yes', delete product record
                        $scope.completeServiceType();
                    },

                    // 'No' button
                    function() {
                        // hide dialog
                    }
                );
            }

            // clear variable / form values
            $scope.clearCarForm = function(){
                $scope.name = "";
                $scope.mileage = "";
            }

            $scope.clearServiceTypeForm = function(){
                $scope.name = "";
                $scope.frequency = "";
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

            // DialogController will be here
            // methods for dialog box
            function DialogController($scope, $mdDialog) {
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
            }

        });



