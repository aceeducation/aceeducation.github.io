var controller = function ($scope, $interval, RestService, $window, toastr, SharedService, $location, PageService) {
    $scope.NEW_ID = 'zzzzz';
    $scope.STATUS_EDITING = 'editing';
    $scope.defaultType = 'pd';

    window.onbeforeunload = function () {
        return '';
    };

    $window.onkeypress = function (event) {
        if (event.keyCode === 13 && event.ctrlKey) {
            $scope.$apply(function(){
                $scope.addExercise();
            });
        }
    };

    $scope.subject = SharedService.getSubject();
    $scope.collection = SharedService.getCollection().name;
    $scope.defaultTags = [$scope.collection];
    console.log($scope.collection);
    $scope.exercises = SharedService.getExercises($scope.collection);
    console.log($scope.exercises);
    PageService.setTitle($scope.subject.code + ' - ' + $scope.collection);

    $scope.addExercise = function () {
        $scope.exercises.push({_id: $scope.NEW_ID, type: $scope.defaultType, collection: $scope.collection, tags: $scope.defaultTags});
    };

    $scope.sendExercises = function () {
        angular.forEach($scope.exercises, function (exercise) {
            if (exercise._id == $scope.NEW_ID) {
                delete exercise._id;
                delete exercise.error;
                exercise.sending = true;
                console.log(exercise);
                RestService.postExercise($scope.subject._id, exercise).then(function (result) {
                    delete  exercise.sending;
                    toastr.success('Successfully sent exercise.');
                    exercise._id = result._id;
                    console.log(result);
                }, function (attribute) {
                    delete  exercise.sending;
                    exercise._id = $scope.NEW_ID;
                    if (attribute !== undefined) {
                        exercise.error = {};
                        exercise.error[attribute] = true;
                        toastr.error('Exercise was not sent.');
                        console.log(exercise)
                    } else {
                        toastr.error('Exercise was not sent.');
                    }
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

        var answer = $window.prompt('Are you sure you want to remove this exercise? "'+ exercise.question +'" (yes)').trim().toLowerCase();
        if (answer != 'yes') return;
        exercise.sending = true;
        RestService.deleteExercise($scope.subject._id, exercise).then(function () {
            delete  exercise.sending;
            del();
            toastr.success('Successfully removed exercise.')
        }, function () {
            delete  exercise.sending
            toastr.error('Could not delete exercise. Please try again later.')
        });
    }

    $scope.editing = {
        edit: function (exercise) {
            console.log(exercise);
            PageService.getCopiedExercises()[exercise._id] = angular.copy(exercise);
            exercise.status = $scope.STATUS_EDITING;
        },
        save: function (exercise) {
            if (!$window.confirm('Are you sure you want to save your changes? There is no going back.')) return;
            delete exercise.status;
            delete exercise.error;
            exercise.sending = true;

            RestService.putExercise($scope.subject._id, exercise).then(function () {
                delete PageService.getCopiedExercises()[exercise._id];
                delete  exercise.sending;
                toastr.success('Successfully updated exercise.')
            }, function (attribute) {
                exercise.status = $scope.STATUS_EDITING;
                delete  exercise.sending;
                if (attribute !== undefined) {
                    exercise.error = {};
                    exercise.error[attribute] = true;
                    toastr.error('Exercise was not updated.');
                    console.log(exercise)
                } else {
                    toastr.error('Exercise was not updated.');
                }
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
    };
};

angular.module('ace-admins.exercises', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/exercises', {
            templateUrl: 'exercises/exercises.html',
            controller: 'exercises-controller'
        });
    }])
    .controller('exercises-controller', controller);

