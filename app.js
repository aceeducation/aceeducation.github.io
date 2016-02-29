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
    .run(function ($rootScope, $location, SharedService, toastr, $window) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.templateUrl != 'main/main.html' && !SharedService.isLoaded()) {
                $location.path('/main');
            }
        });
    })
    .directive('focusMe', function () {
        return {
            link: function (scope, element, attrs) {
                scope.$watch(attrs.focusMe, function(value){
                    if(value){
                        element[0].focus();
                        scope[attrs.focusMe] = false;
                    }
                })
            }
        }
    });