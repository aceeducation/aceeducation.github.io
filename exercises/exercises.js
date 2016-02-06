var controller = function ($scope, $interval, RestService, $window, toastr, SharedService, $location) {
    $scope.newId = 'zzzzz';
    $scope.STATUS_EDITING = 'editing';


    if(SharedService.isLoaded() == false){
        toastr.warning('Can not refresh this page. Moving back to main page');
        return $location.path('/afsdfdsafds');
    }
    $scope.subjectId = SharedService.getSubject()._id;
    $scope.collection = SharedService.getCollection();
    $scope.exercises = [];
    $scope.exercises = SharedService.getExercises($scope.collection);

    $scope.addExercise = function () {
        $scope.exercises.push({_id: $scope.newId, type: 'pd', collection: $scope.collection});
    }

    $scope.sendExercises = function () {
        angular.forEach($scope.exercises, function (exercise) {
            if (exercise._id == $scope.newId) {
                delete exercise._id
                console.log(exercise)
                RestService.postExercise($scope.subjectId, exercise).then(function (result) {
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
        RestService.deleteExercise($scope.subjectId, exercise).then(function () {
            del();
            toastr.success('Successfully removed exercise.')
        }, function () {
            exercise.failed = true;
        });
    }

    $scope.editExercise = function (exercise) {
        exercise.status = $scope.STATUS_EDITING;
    }

    $scope.saveEditing = function (exercise) {
        if (!$window.confirm('Are you sure you want to save your changes? There is no going back.')) return;
        delete exercise.status
        RestService.putExercise($scope.subjectId, exercise).then(function () {
            toastr.success('Successfully updated exercise.')
        }, function () {
            exercise.status = $scope.STATUS_EDITING;
            toastr.error('Could not update exercise.')
        });
    }

    $scope.cancelEditing = function (exercise) {
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

