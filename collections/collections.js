var controller = function ($scope, $window, RestService, SharedService, $location, toastr) {
    if(SharedService.isLoaded() == false){
        toastr.warning('Could not refresh this page. Moving back to main page');
        return $location.path('/afsdfdsafds');
    }

    $scope.collections = SharedService.getCollections();

    $scope.manageExercises = function (collection) {
        SharedService.setCollection(collection);
        $location.path('/exercises');
    }
};

angular.module('ace-admins.collections', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/collections', {
            templateUrl: 'collections/collections.html',
            controller: 'collections-controller'
        });
    }])
    .controller('collections-controller', controller);
