'use strict';

angular.module('ace-admins', [
    'ngRoute',
    'ace-admins.exercises'
])
    .config(['$routeProvider' ,function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/exercises'})
    }]);