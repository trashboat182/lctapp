'use strict';

angular.module('lctapp').factory('Rest', function (Restangular) {
  return {
    users: function (user) {
      return user ? Restangular.oneUrl('api/users/' + user) : Restangular.oneUrl('api/users');
    },
    upload: function (file) {
      return file ? Restangular.oneUrl('api/upload/' + file) : Restangular.oneUrl('api/upload');
    },
    registerImage: function(user){
      return user ? Restangular.oneUrl('api/file/image/' + user) : Restangular.oneUrl('api/file/image');
    }
  };
});
