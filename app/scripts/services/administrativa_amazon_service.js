'use strict';

/**
 * @ngdoc service
 * @name titanClienteV2App.administrativaAmazonService
 * @description
 * # administrativaAmazonService
 * Service in the titanClienteV2App.
 */
angular.module('administrativaAmazonService',[])
  .factory('administrativaAmazonRequest', function ($http, CONF) {

    var path = CONF.GENERAL.ADMINISTRATIVA_AMAZON_SERVICE;
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
