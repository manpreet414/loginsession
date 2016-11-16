routerApp.controller("signup", ['$scope', '$state', "$http","$cookies",
    function($scope, $state, $http, $cookies) {
      if($cookies.get("user")) $state.go('dashboard');
        $scope.signup = {
            email:'',
            username: '',
            password: '',
            confirm_pw:''
        }
        $scope.validateSignup = function() {
            $scope.signup.username = $scope.signup.email;
            // if($scope.signup.username && $scope.signup.password && ($scope.signup.password == $scope.signup.confirm_pw)) {
             $http({
                  url: '/signup',
                  method: 'POST',
                  data: $scope.signup,
                  headers: {'Content-Type':'application/json'},
              withCredentials:true
            }).success(function (data, status, headers, config) {
              $scope.status = true;
            }).error(function (data, status, headers, config) {
              $scope.errMessage = data.errMessage;
              console.log("errr----",data , status ,headers ,config);
            });
          // } else {
          //   console.log("not sent call");
          // }
      }
    }
]);
