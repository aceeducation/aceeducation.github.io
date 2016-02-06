angular
    .module('ace-admins')
    .service('SharedService', function () {
        var isLoaded = false;
        var subject = {};
        var collection = {};
        this.setSubject = function (subj) {
            subject = subj;
            isLoaded = true;
        }
        this.getSubject = function () {
            return subject;
        }
        this.getCollections = function () {
            return Object.keys(subject.collections);
        }
        this.getExercises = function (collection) {
            return subject.collections[collection];
        }
        this.setCollection = function (coll) {
            collection = coll;
        }
        this.getCollection = function () {
            return collection;
        }
        this.isLoaded = function () {
            return isLoaded;
        }
    });