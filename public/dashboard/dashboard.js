routerApp.controller("dashboard", ['$scope', '$state', "services", "$cookies",
    function($scope, $state, services, $cookies) {
        if (!$cookies.get("user")) {
            console.log("find user session");
            services.session().then(function(response) {
                if (response.data.username) {
                    var cookiesdata = { 'username': response.data.username, 'first_name': response.data.first_name, 'last_name': response.data.last_name, 'expire': (Date.now() + 14400000) };
                    $cookies.put("user", JSON.stringify(cookiesdata));
                    $scope.user = cookiesdata;
                } else {
                    $state.go('login');
                }
            }, function(err) {
                $state.go('login');
            });
        } else {
            $scope.user = JSON.parse($cookies.get("user"));
        }

        $scope.logout = function() {
            services.logout().then(function(response) {
                $scope.user = '';
                $cookies.remove("user");
                $state.go('login');
            }, function(err) {
                $scope.errMessage = data.errMessage;
            });
        }
    }
]);
