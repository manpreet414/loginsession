routerApp.controller("dashboard", ['$scope', '$state', "$http", "$cookies",
    function($scope, $state, $http, $cookies) {
        if (!$cookies.get("user")) {
                console.log("find session user");
                $http({
                    url: '/me',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }).success(function(data, status, headers, config) {
                    if(data.username) {
                        var cookiesdata = { 'username': data.username,'first_name':data.first_name,'last_name':data.last_name,'expire': (Date.now() + 14400000) };
                        $cookies.put("user", JSON.stringify(cookiesdata));
                    } else {
                        $state.go('login');
                    }
                }).error(function(data, status, headers, config) {
                    $state.go('login');
                });
        } else {
            $scope.user = JSON.parse($cookies.get("user"));
        }
        $scope.logout = function() {
                $http({
                    url: '/logout',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }).success(function(data, status, headers, config) {
                	$scope.user = '';
                    $cookies.remove("user");
                    $state.go('login');
                }).error(function(data, status, headers, config) {
                    $scope.errMessage = data.errMessage;
                });
        }
    }
]);
