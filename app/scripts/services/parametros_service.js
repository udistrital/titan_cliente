'use strict';


/**
  * @ngdoc overview
  * @name parametrosService
  * @description Modulo para servicio de configracion provee los servicios descritos en {@link parametrosService.service:parametrosRequest parametrosRequest}
  */
angular.module('parametrosService', [])

    /**
     * @ngdoc service
     * @name parametrosService.service:parametrosRequest
     * @requires $http
     * @requires $q
     * @requires $CONF
     * @requires token_service
     * @param {injector} $http componente http de angular
     * @param {injector} $q componente para promesas de angular
     * @param {injector} CONF componente de configuracion
     * @param {injector} token_service componente de autenticacion
     * @description
     * # parametrosService
     * Factory que permite gestionar los servicios para construir y gestion los elementos que se muestran por el cliente a traves del menú
     */

    .factory('parametrosRequest', function ($http, $q, CONF, token_service) {
        /**
         * @ngdoc object
         * @name path
         * @propertyOf parametrosService.service:parametrosRequest
         * @description
         * Dirección del servicio consumen los servicios proveidos por {@link titanClienteV2App.service:CONF confService}
         */
        var path = CONF.GENERAL.PARAMETROS_SERVICE;
        return {

            /**
             * @ngdoc function
             * @name parametrosService.service:parametrosRequest#get_acciones
             * @methodOf parametrosService.service:parametrosService
             * @param {string} path url del menu a consultar opciones
             * @param {string} a menu
             * @description Metodo get_acciones para obtener las acciones ejecutables en un modulo
             */
            get_acciones: function (path, a) {
                a = a || [];
                for (var i = 0; i < a.length; i++) {
                    if (a[i].Url === path) {
                        return a[i];
                    } else if (a[i].Opciones !== null) {
                        var y;
                        if ((y = this.get_acciones(path, a[i].Opciones)) && y != null) {
                            return y;
                        }
                    }
                }
                return null;
            },

            /**
             * @ngdoc function
             * @name parametrosService.service:parametrosRequest#get
             * @methodOf parametrosService.service:parametrosService
             * @param {string} tabla Nombre de la tabla en el API
             * @param {string} params parametros para filtrar la busqueda
             * @return {array|object} objeto u objetos del get
             * @description Metodo GET del servicio
             */
            get: function (tabla, params) {
                return $http.get(path + tabla + "/?" + params, token_service.setting_bearer);
            },
        };

    });
