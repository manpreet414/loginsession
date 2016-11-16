var routerApp = angular.module('testjob', ['ui.router', 'ngCookies']);
routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('dashboard', {
            url: '/',
            templateUrl: 'dashboard/dashboard.html',
            controller: 'dashboard'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'login/login.html',
            controller: 'login'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'signup/signup.html',
            controller: 'signup'
        })
});
