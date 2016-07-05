var controller = function ($scope, $rootScope, $location, $window, RestService, PageService, SharedService) {
    PageService.setTitle('Pick subject');
    $rootScope.headertitle = 'Pick subject';


    $scope.subjects = SharedService.getSubjects();

    $scope.onSubjectClick = function (s) {
        RestService.getSubject(s._id).then(function (subject) {
                SharedService.setSubject(subject);
                $location.path('/collections');
        }, function () {
            toastr.error('Could not fetch subject. Please check that the code you entered is correct.');
        });
    }
};

angular.module('ace-admins.subjects', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/subjects', {
            templateUrl: 'subjects/subjects.html',
            controller: 'subjects-controller'
        });
    }])
    .controller('subjects-controller', controller);
