var controller = function ($scope, $rootScope, $window, SharedService, RestService, $location, toastr, promiseTracker, PageService) {
    PageService.setTitle('Ace admins');
    $scope.next = function () {
        RestService.authorize($scope.code).then(function (authorized) {
            if (authorized) {
                SharedService.setCode($scope.code);
                RestService.getSubjects().then(function (subjects) {
                    SharedService.setSubjects(subjects);
                    $location.path('/subjects');
                });
            } else {
                toastr.error('Wrong code');
            }
        });
    };
};

angular.module('ace-admins.main', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'main/main.html',
            controller: 'main-controller'
        });
    }])
    .controller('main-controller', controller);
