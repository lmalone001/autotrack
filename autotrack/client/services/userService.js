
loginmodule
    .service("userService", function($http){

        var service = {};

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
                url: 'http://autotrack/api/user/read_by_username_password.php',

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
                url: 'http://autotrack/api/user/create.php'
            });
        };

        return service;
    });
