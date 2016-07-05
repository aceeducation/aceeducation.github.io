//const url = 'http://localhost:3000';
const url = 'https://acepi.herokuapp.com';

angular
    .module('ace-admins')
    .service('RestService', function ($http, $q) {
        this.putCollection = function (subjectId, oldCollection, collection, code) {
            console.log('Old collection: ' + oldCollection + 'Collection: ' + collection);
            console.log(collection);
            var body = {oldCollectionName: oldCollection.name, newCollectionName: collection.name}
            return $q(function (resolve, reject) {
                $http({
                    method: 'PUT',
                    url: url + '/subjects/' + subjectId + '/collections',
                    data: body,
                    headers: {
                        code: code
                    }
                }).then(function success(f) {
                    console.log(f);
                    resolve();
                }, function error(response) {
                    console.log(response);
                    reject({error: response})
                });
            });
        };
        this.authorize = function (code) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'POST',
                    url: url + '/authorize',
                    data: {code: code}
                }).then(function success() {
                    resolve(true);
                }, function error(response) {
                    reject({error: response});
                });
            });
        };
        this.deleteCollection = function (collection, subjectId, code) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'DELETE',
                    url: url + '/subjects/' + subjectId + '/collections/' + collection.name,
                    headers: {
                        code: code
                    }
                }).then(function success() {
                    resolve();
                }, function error(response) {
                    reject({error: response});
                });
            });
        };
        this.getSubjects = function(){
            return $q(function (resolve, reject) {
                $http({
                    method: 'GET',
                    url: url + '/subjects'
                }).then(function success(object, status, headers) {
                    resolve(object.data);
                }, function error(response) {
                    reject({error: response});
                });
            });
        };
        this.getCollections = function (subjectId) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'GET',
                    url: url + '/subjects/' + subjectId + '/exercises'
                }).then(function success(object) {
                    var collections = {};
                    var exercises = object.data;

                    for(var i= 0; i < exercises.length ; i++){
                        if(!collections.hasOwnProperty(exercises[i].collection)){
                            collections[exercises[i].collection] = [exercises[i]]
                        }else{
                            collections[exercises[i].collection].push(exercises[i])
                        }
                    }

                    collectionsArray = [];
                    for (var key in collections) {
                        var collection = {};
                        collection.name = key;
                        collection.exercises = collections[key];
                        collectionsArray.push(collection)
                    }


                    resolve(collectionsArray);
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
                }).then(function success(object) {
                    resolve(object.data);
                }, function error(response) {
                    reject({error: response});
                });
            });
        };
        this.postExercise = function (subjectId, exercise, code) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'POST',
                    url: url + '/subjects/' + subjectId + '/exercises',
                    data: exercise,
                    headers: {
                        code: code
                    }
                }).then(function success(object, status, headers) {
                    console.log(object)
                    resolve(object.data);
                }, function error(response) {
                    console.log(response)
                    try {
                        reject(response.data.err[0].property[0])
                    } catch (e) {
                        reject();
                    }
                });
            });
        };
        this.putExercise = function (subjectId, exerciseId, exercise, code) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'PUT',
                    url: url + '/subjects/' + subjectId + '/exercises/' + exerciseId,
                    data: exercise,
                    headers: {
                        code: code
                    }
                }).then(function success() {
                    resolve();
                }, function error(response) {
                    console.log(response)
                    try {
                        reject(response.data.err[0].property[0])
                    } catch (e) {
                        reject();
                    }
                });
            });
        };
        this.deleteExercise = function (subjectId, exercise, code) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'DELETE',
                    url: url + '/subjects/' + subjectId + '/exercises/' + exercise._id,
                    headers: {
                        code: code
                    }
                }).then(function success() {
                    resolve();
                }, function error(response) {
                    console.log(response)
                    reject({error: response})
                });
            });
        };
    });