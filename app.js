angular.module('ace-admins', [
        'ngRoute',
        'toastr',
        'ajoslin.promise-tracker',
        'ace-admins.exercises',
        'ace-admins.collections',
        'ace-admins.subjects',
        'ace-admins.main',
        'ngLoadingSpinner'
    ])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider.otherwise({redirectTo: '/main'});
        $httpProvider.defaults.headers.common = {
            //'environment': 'testing'
        }
    })
    .run(function ($rootScope, $location, SharedService) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            console.log({event: event});
            console.log({next: next});
            console.log({current: current});
            if (next == current || current === undefined) {
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