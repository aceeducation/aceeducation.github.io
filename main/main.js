var controller = function ($scope, $window, SharedService, RestService, $location, toastr, promiseTracker, PageService) {
    PageService.setTitle('Ace admins');
    $scope.tracker = promiseTracker({ activationDelay: 200, minDuration: 750 });
    $scope.subjectId = '56ac9034ea4bda7fdd4ef331';
    $scope.next = function () {
        $scope.tracker.createPromise();
        RestService.getSubject($scope.subjectId).then(function (subject) {
            $scope.tracker.cancel();
            SharedService.setSubject(subject);
            $location.path('/collections');
        }, function () {
            $scope.tracker.cancel();
            toastr.error('Could not fetch subject. Please check that the code you entered is correct.')
        });
    }
    $scope.onKeyPressed = function(event){
        if(event.keyCode == 13){
            $scope.next();
        }
    }
};

angular.module('ace-admins.main', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'main/main.html',
            controller: 'main-controller'
        });
    }])
    .controller('main-controller', controller);
