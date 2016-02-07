var controller = function ($scope, $window, RestService, SharedService, $location, toastr, PageService) {
    PageService.setTitle(SharedService.getSubject().name)
    $scope.collections = SharedService.getCollections();

    $scope.manageExercises = function (collection) {
        SharedService.setCollection(collection);
        $location.path('/exercises');
    }

    $scope.addCollection = function(){
        var collection = $window.prompt('What is the name of the collection?').trim();
        if(collection.length == 0){
            return toastr.error('You didn\'t specify a name. Please try again');
        }else{
            SharedService.setCollection(collection);
            $location.path('/exercises');
        }
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
