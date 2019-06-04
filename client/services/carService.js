
carmodule
    .service("carService", function($http){

    var service = {};

        // read cars by user id
        service.readCarsByUserId = function($scope){

            console.log($scope.userid);
        return $http({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
                'userid' : $scope.userid
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

    return service;
});
