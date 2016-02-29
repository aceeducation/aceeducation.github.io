var controller = function ($scope, $window, RestService, SharedService, $location, toastr, PageService) {
    $scope.STATUS_EDITING = 'editing';

    window.onbeforeunload = function () {
        return '';
    };

    PageService.setTitle(SharedService.getSubject().name);
    $scope.collections = SharedService.getSubject().collections;
    console.log($scope.collections);


    $scope.manageExercises = function (collection) {
        SharedService.setCollection(collection);
        $location.path('/exercises');
    };

    $scope.editing = {
        edit: function (collection, index) {
            PageService.getCopiedCollections()[index] = angular.copy(collection);
            collection.status = $scope.STATUS_EDITING;
            console.log(PageService.getCopiedCollections());
        },
        save: function (collection, index) {
            if (!$window.confirm('Are you sure you want to save your changes? There is no going back.')) return;
            delete collection.status;
            collection.sending = true;
            RestService.putCollection(SharedService.getSubject()._id, PageService.getCopiedCollections()[index], collection).then(function () {
                collection.sending = false;
                delete PageService.getCopiedCollections()[index];
                toastr.success('Successfully updated collection name.')
            }, function () {
                collection.sending = false;
                collection.status = $scope.STATUS_EDITING;
                toastr.error('Could not update collection name.')
            });
        },
        cancel: function (collection, index) {
            angular.copy(PageService.getCopiedCollections()[index], collection);
            delete collection.status;
            console.log(PageService.getCopiedCollections());
        }
    };

    $scope.addCollection = function () {
        var collection = $window.prompt('What is the name of the collection?').trim();
        if (collection.length == 0) {
            return toastr.error('You didn\'t specify a name. Please try again');
        } else {
            SharedService.setCollection({name: collection, exercises: []});
            $location.path('/exercises');
        }
    };

    $scope.deleteCollection = function (collection) {
        console.log(collection);
        if (collection.name == $window.prompt('Are you sure you want to delete this collection? All exercises in this collections will also be deleted. Type in the name of the collection to confirm: "' + collection.name + '"')) {
            collection.sending = true;
            RestService.deleteCollection(collection, SharedService.getSubject()._id).then(function () {
                collection.sending = false;
                $scope.collections.splice($scope.collections.indexOf(collection), 1);
                toastr.success('Successfully removed collection and all of its exercises');
            }, function () {
                collection.sending = false;
            });
        } else {
            $window.alert('You typed in the wrong name. Try again.');
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
