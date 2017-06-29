'use strict';

/**
 * @ngdoc service
 * @name titanClienteV2App.titanService
 * @description
 * # titanService
 * Service in the titanClienteV2App.
 */
angular.module('titanService',[])
  .factory('titanRequest', function ($http) {
    // Service logic
    // ...
    var path = "10.20.0.254/titan_api_crud/v1/";
    // Public API here
    return {
      get: function (tabla,params) {
        return $http.get(path+tabla+"/?"+params);
      },
      post: function (tabla,elemento) {
        return $http.post(path+tabla,elemento);
      },
      put: function (tabla,id,elemento) {
        return $http.put(path+tabla+"/"+id,elemento);
      },
      delete: function (tabla,id) {
        return $http.delete(path+tabla+"/"+id);
      }
    };
  });
