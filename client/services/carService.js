
carmodule
    .service("carService", function($http){

    var service = {};

    // read cars by user id
     service.readCarsByUserId = function($scope){
        // console.log($scope.userid);
         $scope.userid = 1;
        return $http({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
                'userid' : $scope.userid
            //

            },
            url: 'http://autotrack/api/car/read_by_user.php',

        });
    };

    // create car
    service.create = function($rootScope, $scope){
        return $http({
            method: 'POST',
            data: {
                'name' : $scope.name,
                'mileage' : $scope.mileage,
                'userid' : $rootScope.userid
            },
            url: 'http://autotrack/api/car/create.php'
        });
    };

    //read onehere

        // create car
        service.readServiceTypesByCarId = function(carId){
            console.log(carId);
            return $http({
                method: 'POST',
                data: {
                    'carId' : carId
                },
                url: 'http://autotrack/api/servicetype/read_by_car_id.php'
            });
        };

        service.readCarById = function(carId){
            console.log(carId);
            return $http({
                method: 'POST',
                data: {
                    'carid' : carId
                },
                url: 'http://autotrack/api/car/read_car_by_id.php'
            });
        };

        service.readServicesByServiceTypeId = function(serviceTypeId){
            console.log(serviceTypeId);
            return $http({
                method: 'POST',
                data: {
                    'serviceTypeId' : serviceTypeId
                },
                url: 'http://autotrack/api/service/read_by_service_type_id.php'
            });
        };



        // delete car
        service.deleteCar = function(id){
            return $http({
                method: 'POST',
                data: { 'id' : id },
                url: 'http://autotrack/api/car/delete.php'
            });
        };

        service.deleteServiceType = function(id){
            return $http({
                method: 'POST',
                data: { 'id' : id },
                url: 'http://autotrack/api/servicetype/delete.php'
            });
        };

        service.completeServiceType = function(id){
            return $http({
                method: 'POST',
                data: { 'serviceTypeId' : id },
                url: 'http://autotrack/api/service/create.php'
            });
        };

        service.createServiceType = function($rootScope, $scope) {
            console.log($scope.name);
            console.log($scope.frequency);
            console.log($scope.carid);
            return $http({
                method: 'POST',
                data: {
                    'name' : $scope.name,
                    'frequency' : $scope.frequency,
                    'carid' : $scope.carid
                },
                url: 'http://autotrack/api/servicetype/create.php'
            });
        }

        service.updateCar = function($scope){

            console.log($scope.name);
            console.log($scope.mileage);
            console.log($scope.id);
            return $http({
                method: 'POST',
                data: {
                    'name' : $scope.name,
                    'mileage' : $scope.mileage,
                    'id' : $scope.id
                },
                url: 'http://autotrack/api/car/update.php'
            });
        };

        service.updateServiceType = function($scope){

            console.log($scope.name);
            console.log($scope.frequency);
            console.log($scope.id);
            return $http({
                method: 'POST',
                data: {
                    'name' : $scope.name,
                    'frequency' : $scope.frequency,
                    'id' : $scope.id
                },
                url: 'http://autotrack/api/servicetype/update.php'
            });
        };

        service.readServiceTypeById = function(id){

            console.log(id);
            return $http({
                method: 'POST',
                data: {
                    'serviceTypeId' : id
                },
                url: 'http://autotrack/api/servicetype/read_by_id.php'
            });
        };


        return service;
});
