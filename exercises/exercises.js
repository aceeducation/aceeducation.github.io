var controller = function ($scope, $interval, RestService, $window, toastr, SharedService, $location, PageService) {
    $scope.NEW_ID = 'zzzzz';
    $scope.STATUS_EDITING = 'editing';

    $scope.subject = SharedService.getSubject();
    $scope.collection = SharedService.getCollection().name;
    $scope.exercises = SharedService.getExercises($scope.collection);
    console.log($scope.exercises);
    PageService.setTitle($scope.subject.code + ' - ' + $scope.collection);

    $scope.addExercise = function () {
        $scope.exercises.push({_id: $scope.NEW_ID, type: 'pd', collection: $scope.collection});
    };

    $scope.sendExercises = function () {
        angular.forEach($scope.exercises, function (exercise) {
            if (exercise._id == $scope.NEW_ID) {
                delete exercise._id;
                delete exercise.error;
                console.log(exercise);
                RestService.postExercise($scope.subject._id, exercise).then(function (result) {
                    toastr.success('Successfully sent exercise.');
                    exercise._id = result._id;
                    console.log(result)
                }, function (attribute) {
                    exercise._id = $scope.NEW_ID;
                    if (attribute !== undefined) {
                        exercise.error = {};
                        exercise.error[attribute] = true;
                        toastr.error('Exercise was not sent. ' + attribute);
                        console.log(exercise)
                    } else {
                        toastr.error('Exercise was not sent. lol');
                    }

                    console.log('failed')
                    exercise.failed = true;
                });
            }
        });
    };

    $scope.deleteExercise = function (exercise) {
        var del = function () {
            $scope.exercises.splice($scope.exercises.indexOf(exercise), 1);
        }
        if (exercise._id == $scope.NEW_ID) {
            var answer = $window.confirm('Are you sure you want to delete this exercise?')
            if (!answer) return;
            return del();
        }

        var answer = $window.prompt('Warning: This exercise will be removed. There is no going back. Type in or copy the id to confirm: ' + exercise._id).trim();
        if (answer != exercise._id) return $window.alert('You typed in the wrong id. Try again.');
        RestService.deleteExercise($scope.subject._id, exercise).then(function () {
            del();
            toastr.success('Successfully removed exercise.')
        }, function () {
            exercise.failed = true;
        });
    }

    $scope.editing = {
        edit: function (exercise) {
            console.log(exercise)
            PageService.getCopiedExercises()[exercise._id] = angular.copy(exercise);
            exercise.status = $scope.STATUS_EDITING;
        },
        save: function (exercise) {
            if (!$window.confirm('Are you sure you want to save your changes? There is no going back.')) return;
            delete exercise.status
            RestService.putExercise($scope.subject._id, exercise).then(function () {
                delete PageService.getCopiedExercises()[exercise._id];
                toastr.success('Successfully updated exercise.')
            }, function () {
                exercise.status = $scope.STATUS_EDITING;
                toastr.error('Could not update exercise.')
            });
        },
        cancel: function (exercise) {
            console.log(PageService.getCopiedExercises());
            angular.copy(PageService.getCopiedExercises()[exercise._id], exercise);
            delete exercise.status;
        }
    };


    $scope.countNewExercises = function () {
        var count = 0;
        angular.forEach($scope.exercises, function (value) {
            if (value._id == $scope.NEW_ID) {
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

angular.module('ace-admins.exercises', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/exercises', {
            templateUrl: 'exercises/exercises.html',
            controller: 'exercises-controller'
        });
    }])
    .controller('exercises-controller', controller);

