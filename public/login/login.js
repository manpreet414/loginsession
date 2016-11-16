routerApp.controller("login", ['$scope', '$state', "$cookies","services",
    function($scope, $state, $cookies,services) {
        if ($cookies.get("user")) $state.go('dashboard');
        $scope.query = '';
        $scope.login = {
            username: '',
            password: ''
        }
        $scope.validateLogin = function() {
            $scope.errMessage = '';
            if ($scope.login.username && $scope.login.password) {
                services.login($scope.login).then(function(response){
                    var cookiesdata = { 'username': response.data.username,'first_name':response.data.first_name,'last_name':response.data.last_name,'expire': (Date.now() + 14400000) };
                    $cookies.put("user", JSON.stringify(cookiesdata));
                    $state.go('dashboard');
                },function(err){
                    $scope.errMessage = err.data.errMessage;
                });
            } else {
                $scope.errMessage = "Please Fill Detail"
            }
        }
}]);
