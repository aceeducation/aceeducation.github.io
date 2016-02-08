angular
    .module('ace-admins')
    .service('PageService', function ($rootScope) {
        var copiedExercises = {};
        var copiedCollections = {};
        this.setTitle = function(title){
            $rootScope.title = title;
        }
        this.getCopiedExercises = function(){
            return copiedExercises;
        }
        this.getCopiedCollections = function(){
            return copiedCollections;
        };
    });