'use strict';

/**
 * @ngdoc service
 * @name titanClienteV2App.config
 * @description
 * # config
 * Service in the titanClienteV2App.
 */
var conf_cloud = {

};
var conf_pruebas = {
    TITAN_SERVICE: "http://10.20.0.254/titan_api_crud/v1/",
    TITAN_MID_SERVICE: "http://10.20.0.254/titan_api_mid/v1/",
    CONFIGURACION_SERVICE: "http://10.20.0.254/configuracion_api/v1/"
};
var conf_local = {
    TITAN_SERVICE: "http://localhost:8082/v1/",
    TITAN_MID_SERVICE: "http://localhost:8081/v1/",
    CONFIGURACION_SERVICE: "http://10.20.0.254/configuracion_api/v1/"

};



angular.module('titanClienteV2App')
    .constant('CONF', {
        GENERAL: conf_pruebas
    });