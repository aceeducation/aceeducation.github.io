angular.module('ace-admins', [
    'ngRoute',
    'toastr',
    'ajoslin.promise-tracker',
    'ace-admins.exercises',
    'ace-admins.collections',
    'ace-admins.main'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/main'})
    }])
    .run(function ($rootScope, $location, SharedService, toastr) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.templateUrl != 'main/main.html' && !SharedService.isLoaded()) {
                $location.path('/main');
                toastr.warning('Could not refresh this page. Moving back to main page');
            }
        });
    });