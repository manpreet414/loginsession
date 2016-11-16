routerApp.factory('services', ['$window','$http', function($window,$http) {

         var service = {};
         service.login = function(data) {
             return $http.post("/login", data);
         }

         service.signup = function(data) {
             return $http.post("/signup", data);
         }
         service.session = function(data) {
             return $http.get("/me", data);
         }
         service.logout = function(data) {
             return $http.get("/logout", data);
         }
         return service;

     }]);
