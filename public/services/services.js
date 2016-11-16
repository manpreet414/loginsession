routerApp.factory('services', ['$window','$http', function($window,$http) {

         var obj = {};
         obj.validateLogin = function(data) {
             return $http.post("/login", data);
         }
         return obj;

     }]);
