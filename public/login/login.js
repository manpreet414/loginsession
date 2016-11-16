routerApp.controller("login", ['$scope', '$state', "$http", "$cookies",
    function($scope, $state, $http, $cookies) {
        if ($cookies.get("user")) $state.go('dashboard');
        $scope.query = '';
        $scope.login = {
            username: '',
            password: ''
        }
        $scope.validateLogin = function() {
            $scope.errMessage = '';
            if ($scope.login.username && $scope.login.password) {
                $http({
                    url: '/login',
                    method: 'POST',
                    data: $scope.login,
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }).success(function(data, status, headers, config) {
                    var cookiesdata = { 'username': data.username,'first_name':data.first_name,'last_name':data.last_name,'expire': (Date.now() + 14400000) };
                    $cookies.put("user", JSON.stringify(cookiesdata));
                    $state.go('dashboard');
                }).error(function(data, status, headers, config) {
                    $scope.errMessage = data.errMessage;
                });
            } else {
                $scope.errMessage = "Please Fill Detail"
            }
        }
}]);
