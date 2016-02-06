const url = 'http://localhost:3001';
//const url = 'https://acepi.herokuapp.com';

angular
    .module('ace-admins')
    .service('RestService', function ($http, $q) {
        this.getExercises = function () {
            return $q(function (resolve, reject) {
                $http({
                    method: 'GET',
                    url: url + '/subjects/56a87b66638dd86113f1240b'
                }).then(function success(object, status, headers) {
                    var collection = 'mikail';
                    resolve(object.data.collections[collection]);
                }, function error(response) {
                    reject({error: response});
                });
            });
        };
        this.postExercise = function (exercise) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'POST',
                    url: url + '/subjects/56a87b66638dd86113f1240b/exercises',
                    data: exercise
                }).then(function success(object, status, headers) {
                    resolve(object.data);
                }, function error(response) {
                    console.log(response)
                    reject({error: response})
                });
            });
        }
        this.deleteExercise = function (exercise) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'DELETE',
                    url: url + '/subjects/56a87b66638dd86113f1240b/exercises/' + exercise._id
                }).then(function success() {
                    resolve();
                }, function error(response) {
                    console.log(response)
                    reject({error: response})
                });
            });
        }
    });