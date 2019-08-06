
carmodule
    .service("carService", function($http){

    var service = {};

    var host = 'http://ec2-3-91-237-5.compute-1.amazonaws.com/api/';


        // read cars by user id
     service.readCarsByUserId = function(userId){
        return $http({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
                'userid' : userId

            },
            url: host + 'car/read_by_user.php'

        });
    };

    // create car
    service.create = function(name, mileage, userId){
        return $http({
            method: 'POST',
            data: {
                'name' : name,
                'mileage' : mileage,
                'userid' : userId
            },
            url: host + 'car/create.php',

        });
    };

        service.readServiceTypesByCarId = function(carId){
            console.log(carId);
            return $http({
                method: 'POST',
                data: {
                    'carId' : carId
                },
                url: host + 'servicetype/read_by_car_id.php',

            });
        };

        service.readCarById = function(carId){
            console.log(carId);
            return $http({
                method: 'POST',
                data: {
                    'carid' : carId
                },
                url: host + 'car/read_car_by_id.php',

            });
        };

        service.readServicesByServiceTypeId = function(serviceTypeId){
            console.log(serviceTypeId);
            return $http({
                method: 'POST',
                data: {
                    'serviceTypeId' : serviceTypeId
                },
                url: host + 'service/read_by_service_type_id.php',

            });
        };

        // delete car
        service.deleteCar = function(carId){
            return $http({
                method: 'POST',
                data: { 'id' : carId },
                url: host + 'car/delete.php',

            });
        };

        service.deleteServiceType = function(serviceTypeId){
            return $http({
                method: 'POST',
                data: { 'id' : serviceTypeId },
                url: host + 'servicetype/delete.php',

            });
        };

        service.completeServiceType = function(id){
            return $http({
                method: 'POST',
                data: { 'serviceTypeId' : id },
                url: host + 'service/create.php',

            });
        };

        service.createServiceType = function(name, frequency, carId) {

            return $http({
                method: 'POST',
                data: {
                    'name' : name,
                    'frequency' : frequency,
                    'carid' : carId
                },
                url: host + 'servicetype/create.php',

            });
        }

        service.updateCar = function(name, mileage, carId){

            return $http({
                method: 'POST',
                data: {
                    'name' : name,
                    'mileage' : mileage,
                    'id' : carId
                },
                url: host + 'car/update.php',

            });
        };

        service.updateServiceType = function(name, frequency, id){

            // console.log($scope.name);
            // console.log($scope.frequency);
            // console.log($scope.id);
            return $http({
                method: 'POST',
                data: {
                    'name' : name,
                    'frequency' : frequency,
                    'id' : id
                },
                url: host + 'servicetype/update.php',

            });
        };

        service.readServiceTypeById = function(serviceTypeId){

            console.log(serviceTypeId);
            return $http({
                method: 'POST',
                data: {
                    'serviceTypeId' : serviceTypeId
                },
                url: host + 'servicetype/read_by_id.php',
            });
        };

        return service;
});
