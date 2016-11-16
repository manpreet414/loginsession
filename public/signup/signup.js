routerApp.controller("signup", ['$scope', '$state', "$cookies", "services",
    function($scope, $state, $cookies, services) {
      if($cookies.get("user")) $state.go('dashboard');
        $scope.signup = {
            email:'',
            username: '',
            password: '',
            confirm_pw:''
        }
        $scope.validateSignup = function() {
            $scope.signup.username = $scope.signup.email;
            services.signup($scope.signup).then(function(response){
                $scope.status = true;
            },function(err){
                $scope.errMessage = err.data.errMessage;
            });
      }
    }
]);
