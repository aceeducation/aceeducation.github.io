angular.module('ace-admins', [
    'ngRoute',
    'toastr',
    'ajoslin.promise-tracker',
    'ace-admins.exercises',
    'ace-admins.collections',
    'ace-admins.main'
])
    .config(['$routeProvider' ,function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/main'})
    }]);