var carmodule = angular.module('client.cars', []);

carmodule
    .controller('carController',
        function($scope, $rootScope, $mdDialog, $mdToast, $window, $location,
                 carService) {

            $rootScope.location = $location;

            // read cars

            $scope.readCarsByUserId = function(){
                var userId = localStorage.getItem("userId");
                console.log(userId);
                // use products factory
                carService.readCarsByUserId(userId).then(
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
                        templateUrl: '/cars/update_car.html',
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
                $scope.serviceTypeId = id;
                console.log($scope.serviceTypeId);
                // get product to be edited
                carService.readServiceTypeById(id).then(function successCallback(response){

                    // put the values in form
                    console.log($scope.id);
                    $scope.id = response.data.id;
                    $scope.name = response.data.name;
                    $scope.frequency = response.data.frequency;

                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: '/serviceTypes/update_servicetype.html',
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
                localStorage.setItem("carId", car.id);
                localStorage.setItem("carName", car.name);
                localStorage.setItem("carMileage", car.mileage);


            }

            $rootScope.getCar = function(){
                $scope.carid = localStorage.getItem("carId");
                $scope.carname = localStorage.getItem("carName");
                $scope.carmileage = localStorage.getItem("carMileage");

            }

            $rootScope.getServiceType = function(){
                $rootScope.getCar();
                $scope.serviceTypeId = localStorage.getItem("serviceTypeId");
                $scope.serviceTypeName = localStorage.getItem("serviceTypeName");

            }

            $rootScope.setServiceType = function(serviceType){
                localStorage.setItem("serviceTypeId", serviceType.id);
                localStorage.setItem("serviceTypeName", serviceType.name);


            }

            // show 'create car form' in dialog box
            $scope.showAddCarForm = function(){
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '/cars/add_car.html',
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
                    templateUrl: '/serviceTypes/add_service_type.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    scope: $scope,
                    preserveScope: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                });
            }


            $scope.showServiceTypes = function(){

                var carId = localStorage.getItem("carId");

                // use products factory
                carService.readServiceTypesByCarId(carId).then(
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

            // update car record / save changes
            $scope.updateCar = function(){

                console.log($scope.name);
                console.log($scope.mileage);
                console.log($scope.id);

                carService.updateCar($scope.name,
                    $scope.mileage,
                    $scope.id).then(function successCallback(response){

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

            // update service type record / save changes
            $scope.updateServiceType = function(){

                carService.updateServiceType($scope.name,
                    $scope.frequency,
                    $scope.id).then(function successCallback(response){

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
                console.log($scope.serviceTypeId);

                // use car service
                carService.readServicesByServiceTypeId($scope.serviceTypeId).then(
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

                $name = $scope.name;
                $mileage = $scope.mileage;
                $userId = localStorage.getItem("userId");

                carService.create($name, $mileage, $userId).then(
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

                $name = $scope.name;
                $frequency = $scope.frequency;
                $carId = $scope.carid;

                carService.createServiceType($name, $frequency, $carId).then(
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

            // delete car
            $scope.deleteCar = function(carId){

                carService.deleteCar(carId).then(function successCallback(response){

                    // tell the user car was deleted
                    console.log(response);
                    $scope.showToast(response.data.message);

                    // refresh the list
                    $scope.readCarsByUserId();

                }, function errorCallback(response){
                    $scope.showToast("Unable to delete record.");
                });

            }

            $scope.deleteServiceType = function(id){

                carService.deleteServiceType(id).then(function successCallback(response){

                    // tell the user service type was deleted
                    console.log(response);
                    $scope.showToast(response.data.message);

                    // refresh the list
                    $scope.showServiceTypes();

                }, function errorCallback(response){
                    console.log(response);
                    $scope.showToast("Unable to delete record.");
                });

            }

            $scope.completeServiceType = function(id){
                console.log("here");
                console.log(id);
                carService.completeServiceType(id).then(function successCallback(response){

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


            $scope.confirmDeleteCar = function(carId){

                // set id of record to delete
                console.log(carId);
                // $scope.carId = carId;

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
                        $scope.deleteCar(carId);
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
                // $scope.serviceTypeId = id;

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
                        $scope.deleteServiceType(id);
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
                        $scope.completeServiceType(id);
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



