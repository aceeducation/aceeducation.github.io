//const url = 'http://localhost:3001';
const url = 'https://acepi.herokuapp.com';

angular
    .module('ace-admins')
    .service('RestService', function ($http, $q) {
        this.getSubject = function (subjectId) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'GET',
                    url: url + '/subjects/' + subjectId
                }).then(function success(object, status, headers) {
                    console.log(object.data)
                    resolve(object.data);
                }, function error(response) {
                    reject({error: response});
                });
            });
        }
        this.postExercise = function (subjectId, exercise) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'POST',
                    url: url + '/subjects/' + subjectId + '/exercises',
                    data: exercise
                }).then(function success(object, status, headers) {
                    resolve(object.data);
                }, function error(response) {
                    console.log(response)
                    reject({error: response})
                });
            });
        }
        this.putExercise = function (subjectId, exercise) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'PUT',
                    url: url + '/subjects/' + subjectId + '/exercises/' + exercise._id,
                    data: exercise
                }).then(function success() {
                    resolve();
                }, function error(response) {
                    console.log(response)
                    reject({error: response})
                });
            })
        }
        this.deleteExercise = function (subjectId, exercise) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'DELETE',
                    url: url + '/subjects/' + subjectId + '/exercises/' + exercise._id
                }).then(function success() {
                    resolve();
                }, function error(response) {
                    console.log(response)
                    reject({error: response})
                });
            });
        }
    });