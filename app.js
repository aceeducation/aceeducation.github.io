angular.module('ace-admins', [
        'ngRoute',
        'toastr',
        'ajoslin.promise-tracker',
        'ace-admins.exercises',
        'ace-admins.collections',
        'ace-admins.main'
    ])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider.otherwise({redirectTo: '/main'});
        $httpProvider.defaults.headers.common = {
            'environment': 'testing'
        }
    })
    .run(function ($rootScope, $location, SharedService) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.templateUrl != 'main/main.html' && !SharedService.isLoaded()) {
                $location.path('/main');
            }
        });
    })
    .directive('focusMe', function () {
        return {
            link: function (scope, element, attrs) {
                scope.$watch(attrs.focusMe, function (value) {
                    if (value) {
                        element[0].focus();
                        scope[attrs.focusMe] = false;
                    }
                })
            }
        }
    })
    .directive('onEnter', function () {
        return {
            link: function (scope, element, attrs) {
                element.bind("keypress", function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.onEnter);
                        });
                        event.preventDefault();
                    }
                });
            }
        }
    });