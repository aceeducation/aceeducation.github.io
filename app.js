'use strict';

angular.module('ace-admins', [
    'ngRoute',
    'ace-admins.exercises',
    'ace-admins.collections'
])
    .config(['$routeProvider' ,function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/collections'})
    }]);