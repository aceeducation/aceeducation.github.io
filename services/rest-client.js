//const url = 'http://localhost:3001';
const url = 'https://acepi.herokuapp.com';

angular
    .module('ace-admins')
    .service('RestService', function ($http, $q) {
        this.putCollection = function(subjectId, oldCollection, collection){
            console.log('Old collection: ' + oldCollection + 'Collection: ' + collection)
            return $q(function (resolve, reject) {
                $http({
                    method: 'PUT',
                    url: url + '/subjects/' + subjectId + '/collections/' + oldCollection.name,
                    data: collection
                }).then(function success(f) {
                    console.log(f)
                    resolve();
                }, function error(response) {
                    console.log(response);
                    reject({error: response})
                });
            });
        };
        this.deleteCollection = function(collection, subjectId){
            return $q(function (resolve, reject) {
                $http({
                    method: 'DELETE',
                    url: url + '/subjects/' + subjectId + '/collections/' + collection
                }).then(function success() {
                    resolve();
                }, function error(response) {
                    reject({error: response});
                });
            });
        };
        this.getSubject = function (subjectId) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'GET',
                    url: url + '/subjects/' + subjectId
                }).then(function success(object, status, headers) {
                    var subject = angular.copy(object.data);
                    delete subject.collections;

                    var collections = object.data.collections;
                    subject.collections = [];
                    for(var key in collections){
                        var collection = {};
                        collection.name = key;
                        collection.exercises = collections[key];
                        subject.collections.push(collection)
                    }
                    console.log(subject)
                    resolve(subject);
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
                    try{
                        reject(response.data.err[0].property[0])
                    }catch(e){
                        reject();
                    }
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
            });
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