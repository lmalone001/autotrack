
loginmodule
    .service("userService", function($http){

        var service = {};

        var host = 'http://ec2-3-91-237-5.compute-1.amazonaws.com/api/';

        // read user
        service.login = function($scope){
            console.log($scope.username);
            return $http({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                data: {
                    // 'userid' : $scope.userid
                    'username' : $scope.username,
                    'password' : $scope.password

                },
                url: host + 'user/read_by_username_password.php',

            });
        };


        // register
        service.register = function($scope){
            return $http({
                method: 'POST',
                data: {
                    'username' : $scope.username,
                    'password' : $scope.password
                },
                url: host + 'user/create.php'
            });
        };

        return service;
    });
