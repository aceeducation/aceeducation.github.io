angular
    .module('ace-admins')
    .service('PageService', function ($rootScope) {
        var copiedExercises = {};
        this.setTitle = function(title){
            $rootScope.title = title;
        }
        this.getCopiedExercises = function(){
            return copiedExercises;
        }
    });