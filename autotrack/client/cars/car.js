var carmodule = angular.module('client.cars', []);

carmodule
    .controller('carController',
        function($scope, $rootScope, $mdDialog, $mdToast, carService, userService) {

    // read products
    $scope.readCarsByUserId = function(){


        console.log($rootScope.userid);
        // use products factory
        carService.readCarsByUserId($scope).
        then(
            function successCallback(response){
                console.log(response);

                $scope.cars = response.data;
        }, function errorCallback(response){
            console.log(response);
        });

    }

});