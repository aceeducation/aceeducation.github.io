var controller = function ($scope, $window, RestService, SharedService, $location) {
    $scope.collections = []
    RestService.getSubject('56a87b66638dd86113f1240b').then(function(subject){
        SharedService.setSubject(subject);
        $scope.collections = SharedService.getCollections();
    }, function(){
        //console.log(err)
    })

    $scope.manageExercises = function (collection) {
        SharedService.setCollection(collection);
        $location.path('/exercises');
    }
};

angular.module('ace-admins.collections', ['ngRoute', 'toastr'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/collections', {
            templateUrl: 'collections/collections.html',
            controller: 'collections-controller'
        });
    }])
    .controller('collections-controller', controller);
