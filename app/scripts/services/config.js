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
    CONFIGURACION_SERVICE: "http://10.20.0.254/configuracion_api/v1/",
    TOKEN: {
        AUTORIZATION_URL: "https://10.20.0.162:9443/oauth2/authorize",
        CLIENTE_ID: "bfPMflsiPVN6WFjJZIpzjsLdlx8a",
        REDIRECT_URL: "http://localhost:9000/",
        RESPONSE_TYPE: "id_token token",
        SCOPE: "openid email",
        BUTTON_CLASS: "btn btn-warning btn-sm",
        SIGN_OUT_URL: "https://10.20.0.162:9443/oidc/logout",
        SIGN_OUT_REDIRECT_URL: "http://localhost:9000/",
        SIGN_OUT_APPEND_TOKEN: "true"
    }
};
var conf_local = {
    TITAN_SERVICE: "http://localhost:8082/v1/",
    TITAN_MID_SERVICE: "http://localhost:8081/v1/",
    CONFIGURACION_SERVICE: "http://10.20.0.254/configuracion_api/v1/",
    TOKEN: {
      AUTORIZATION_URL: "https://10.20.0.162:9443/oauth2/authorize",
      CLIENTE_ID: "NCM5qVWim6MeTGB4Ag4lyLBOlv0a",
      REDIRECT_URL: "http://localhost:9000/",
      RESPONSE_TYPE: "id_token token",
      SCOPE: "openid email",
      BUTTON_CLASS: "btn btn-warning btn-sm",
      SIGN_OUT_URL: "https://10.20.0.162:9443/oidc/logout",
      SIGN_OUT_REDIRECT_URL: "http://localhost:9000/",
      SIGN_OUT_APPEND_TOKEN: "true"
    }
};

var conf_presentacion = {
    TITAN_SERVICE: "http://10.20.0.210/titan_api_crud/v1/",
    TITAN_MID_SERVICE: "http://10.20.0.210/titan_api_mid/v1/",
    CONFIGURACION_SERVICE: "http://10.20.0.254/configuracion_api/v1/"
};



angular.module('titanClienteV2App')
    .constant('CONF', {
        GENERAL: conf_pruebas
    });
