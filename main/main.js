var controller = function ($scope, $window, SharedService, RestService, $location, toastr, promiseTracker, PageService) {
    PageService.setTitle('Ace admins');
    $scope.tracker = promiseTracker({ activationDelay: 200, minDuration: 750 });
    $scope.next = function () {
        $scope.tracker.createPromise();
        if ($scope.code === undefined || $scope.code.length != 2){
            $scope.tracker.cancel();
            return toastr.error('Wrong code');
        }
        SharedService.setCode($scope.code[1]);
        console.log('Code: ' + $scope.code[1])
        RestService.getSubject($scope.code[0]).then(function (subject) {
            $scope.tracker.cancel();
            SharedService.setSubject(subject);
            $location.path('/collections');
        }, function () {
            $scope.tracker.cancel();
            toastr.error('Could not fetch subject. Please check that the code you entered is correct.');
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
