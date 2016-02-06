var controller = function ($scope, $interval, RestService, $window, toastr) {
    $scope.newId = 'zzzzz';
    $scope.STATUS_EDITING = 'editing';
    $scope.collection = 'mikail';
    $scope.exercises = [];
    RestService.getExercises().then(function (exercises) {
        $scope.exercises = exercises;
        toastr.success('Successfully retrieved exercises.')

    }, function (err) {
        console.log(err)
        toastr.success('Could not retrieve exercises. Try refreshing the page or come back later.')

    })

    $scope.addExercise = function () {
        $scope.exercises.push({_id: $scope.newId, type: 'pd', collection: $scope.collection});
    }

    $scope.sendExercises = function () {
        angular.forEach($scope.exercises, function (exercise) {
            if (exercise._id == $scope.newId) {
                delete exercise._id
                console.log(exercise)
                RestService.postExercise(exercise).then(function (result) {
                    toastr.success('Successfully sent exercise.')
                    exercise._id = result._id;
                    console.log(result)
                }, function () {
                    toastr.error('Exercise was not sent')

                    exercise._id = $scope.newId
                    console.log('failed')
                    exercise.failed = true;
                });
            }
        });
    }

    $scope.deleteExercise = function (exercise) {
        var del = function () {
            $scope.exercises.splice($scope.exercises.indexOf(exercise), 1);
        }
        if (exercise._id == $scope.newId) {
            var answer = $window.confirm('Are you sure you want to delete this exercise? There is no going back.')
            if (!answer) return;
            toastr.success('Successfully removed exercise.')

            return del();
        }

        var answer = $window.prompt('Warning: This exercise will be removed. Type in or copy the id to confirm: ' + exercise._id)
        if (answer != exercise._id) return;
        RestService.deleteExercise(exercise).then(function () {
            del();
            toastr.success('Successfully removed exercise.')
        }, function () {
            exercise.failed = true;
        });
    }

    $scope.editExercise = function(exercise){
        exercise.status = $scope.STATUS_EDITING;
    }

    $scope.saveEditing = function(exercise){
        $window.confirm('Are you sure you want to save your changes? There is no going back.')
    }

    $scope.cancelEditing = function(exercise){
        delete exercise.status
    }

    $scope.countNewExercises = function () {
        var count = 0;
        angular.forEach($scope.exercises, function (value) {
            if (value._id == $scope.newId) {
                count++;
            }
        });
        return count;
    }

    $scope.onKeyPressed = function (event) {
        //alert(event.which)
        if (event.which === 78 && event.ctrlKey) {
            $scope.addExercise();
        }
    }
}

angular.module('ace-admins.exercises', ['ngRoute', 'toastr'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/exercises', {
            templateUrl: 'exercises/exercises.html',
            controller: 'exercises-controller'
        });
    }])
    .controller('exercises-controller', controller);

