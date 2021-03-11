  'use strict';


  /**
    * @ngdoc overview
    * @name titanMidService
    * @description Modulo para servicio de configracion provee los servicios descritos en {@link titanMidService.service:titanMidRequest titanMidRequest}
    */
  angular.module('titanMidService', [])

  /**
   * @ngdoc service
   * @name titanMidService.service:titanMidRequest
   * @requires $http
   * @requires $q
   * @requires $CONF
   * @requires token_service
   * @param {injector} $http componente http de angular
   * @param {injector} $q componente para promesas de angular
   * @param {injector} CONF componente de configuracion
   * @param {injector} token_service componente de autenticacion
   * @description
   * # titanMidRequest
   * Factory que permite gestionar los servicios para construir y gestion los elementos que se muestran por el cliente a traves del menú
   */

  .factory('titanMidRequest', function($http, $q, CONF, token_service) {
      /**
       * @ngdoc object
       * @name path
       * @propertyOf titanMidService.service:titanMidRequest
       * @description
       * Dirección del servicio consumen los servicios proveidos por {@link titanClienteV2App.service:CONF confService}
       */
      var path = CONF.GENERAL.TITAN_MID_SERVICE;
      var path2 = CONF.GENERAL.COLAS_SERVICE;
      return {

          /**
           * @ngdoc function
           * @name titanMidService.service:titanMidRequest#get_acciones
           * @methodOf titanMidService.service:titanMidRequest
           * @param {string} path url del menu a consultar opciones
           * @param {string} a menu
           * @description Metodo get_acciones para obtener las acciones ejecutables en un modulo
           */
          get_acciones: function(path, a) {
              a = a || [];
              for (var i = 0; i < a.length; i++) {
                  if (a[i].Url === path) {
                      return a[i];
                  } else if (a[i].Opciones !== null) {
                      var y;
                      if ((y == this.get_acciones(path, a[i].Opciones)) && y !== null) {
                          return y;
                      }
                  }
              }
              return null;
          },

          /**
           * @ngdoc function
           * @name titanMidService.service:titanMidRequest#get
           * @methodOf titanMidService.service:titanMidRequest
           * @param {string} tabla Nombre de la tabla en el API
           * @param {string} params parametros para filtrar la busqueda
           * @return {array|object} objeto u objetos del get
           * @description Metodo GET del servicio
           */
          get: function(tabla, params) {
            $http.get(path+tabla+"/?"+params, token_service.setting_bearer);
          },
          /**
           * @ngdoc function
           * @name titanMidService.service:titanMidRequest#post
           * @param {string} tabla Nombre de la tabla en el API
           * @param {object} elemento objeto a ser creado por el API
           * @methodOf titanMidService.service:titanMidRequest
           * @return {array|string} mensajes del evento en el servicio
           * @description Metodo POST del servicio
           */
          post: function(tabla, elemento) {
              return $http.post(path + tabla, elemento, token_service.setting_bearer);
          },
          /**
           * @ngdoc function
           * @name titanMidService.service:titanMidRequest#post
           * @param {string} tabla Nombre de la tabla en el API
           * @param {object} elemento objeto a ser creado por el API
           * @methodOf titanMidService.service:titanMidRequest
           * @return {array|string} mensajes del evento en el servicio
           * @description Metodo POST del servicio
           */
          post_cola: function(tabla, elemento) {
            return $http.post(path2 + tabla, elemento, token_service.setting_bearer);
        },


          /**
           * @ngdoc function
           * @name titanMidService.service:titanMidRequest#put
           * @param {string} tabla Nombre de la tabla en el API
           * @param {string|int} id del elemento en el API
           * @param {object} elemento objeto a ser actualizado por el API
           * @methodOf titanMidService.service:titanMidRequest
           * @return {array|string} mensajes del evento en el servicio
           * @description Metodo PUT del servicio
           */
          put: function(tabla, id, elemento) {
              return $http.put(path + tabla + "/" + id, elemento, token_service.setting_bearer);
          },

          /**
           * @ngdoc function
           * @name titanMidService.service:titanMidRequest#delete
           * @methodOf titanMidService.service:titanMidRequest
           * @param {string} tabla Nombre de la tabla en el API
           * @param {object} elemento objeto a ser eliminado por el API
           * @return {array|string} mensajes del evento en el servicio
           * @description Metodo DELETE del servicio
           */
          delete: function(tabla, id) {
              return $http.delete(path + tabla + "/" + id, token_service.setting_bearer);
          }
      };

  });
