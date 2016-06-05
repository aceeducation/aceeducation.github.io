var deleteAllExcept = function (object, exceptArray) {
    for (var key in object) {
        if (exceptArray.indexOf(key) === -1) {
            delete object[key];
        }
    }
};

angular
    .module('ace-admins')
    .service('CorrectorService', function () {
        this.correct = function (ex) {
            var exercise = angular.copy(ex);
            switch (exercise.type){
                case 'mc':
                    deleteAllExcept(exercise, ['question', 'correctAnswer', 'alternatives', 'collection', 'type']);
                    break;
                case 'pd':
                    deleteAllExcept(exercise, ['question', 'correctAnswer', 'tags', 'collection', 'type']);
                    break;
                case 'tf':
                    deleteAllExcept(exercise, ['question', 'correctAnswer', 'collection', 'type']);
                    break;
                default:
                    break;
            }
            console.log('Corrected Exercise');
            console.log(exercise);
            return exercise
        }


    });