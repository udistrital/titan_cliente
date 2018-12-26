'use strict';

/**
 * @ngdoc service
 * @name titanClienteV2App.config
 * @description
 * # config
 * Service in the titanClienteV2App.
 */
var conf_prod = {
  CONFIGURACION_SERVICE: "http://api.intranetoas.udistrital.edu.co:8086/v1/",
  TITAN_MID_SERVICE: "http://api.intranetoas.udistrital.edu.co:8082/v1/",
  TITAN_SERVICE: "http://pruebasapi.intranetoas.udistrital.edu.co:8081/v1/",
  TOKEN: {
      AUTORIZATION_URL: "https://10.20.0.162:9443/oauth2/authorize",
      URL_USER_INFO: "https://10.20.0.162:9443/oauth2/userinfo",
      CLIENTE_ID: "bfPMflsiPVN6WFjJZIpzjsLdlx8a",
      REDIRECT_URL: "http://localhost:9000/",
      RESPONSE_TYPE: "code",
      SCOPE: "openid email",
      BUTTON_CLASS: "btn btn-warning btn-sm",
      SIGN_OUT_URL: "https://10.20.0.162:9443/oidc/logout",
      SIGN_OUT_REDIRECT_URL: "http://localhost:9000/",
      SIGN_OUT_APPEND_TOKEN: "true",
      REFRESH_TOKEN: "https://10.20.0.162:9443/oauth2/token",
      CLIENT_SECRET: "4C_HkdaZsMF4Fthfm6D2n5joLzEa"
  },
};

var conf_preprod = {
  CONFIGURACION_SERVICE: "http://pruebasapi.intranetoas.udistrital.edu.co:8086/v1/",
  TITAN_MID_SERVICE: "http://pruebasapi.intranetoas.udistrital.edu.co:8082/v1/",
  TITAN_SERVICE: "http://pruebasapi.intranetoas.udistrital.edu.co:8081/v1/",
  TOKEN: {
      AUTORIZATION_URL: "https://10.20.0.162:9443/oauth2/authorize",
      URL_USER_INFO: "https://10.20.0.162:9443/oauth2/userinfo",
      CLIENTE_ID: "bfPMflsiPVN6WFjJZIpzjsLdlx8a",
      REDIRECT_URL: "http://localhost:9000/",
      RESPONSE_TYPE: "code",
      SCOPE: "openid email",
      BUTTON_CLASS: "btn btn-warning btn-sm",
      SIGN_OUT_URL: "https://10.20.0.162:9443/oidc/logout",
      SIGN_OUT_REDIRECT_URL: "http://localhost:9000/",
      SIGN_OUT_APPEND_TOKEN: "true",
      REFRESH_TOKEN: "https://10.20.0.162:9443/oauth2/token",
      CLIENT_SECRET: "4C_HkdaZsMF4Fthfm6D2n5joLzEa"
  },
};

var conf_pruebas = {
    ADMINISTRATIVA_AMAZON_SERVICE: "https://tuleap.udistrital.edu.co/go_api/administrativa_amazon_api/v1/",
    TITAN_SERVICE: "http://10.20.0.254/titan_api_crud/v1/",
    TITAN_MID_SERVICE: "http://10.20.0.254/titan_api_mid/v1/",
    OIKOS_SERVICE: "https://tuleap.udistrital.edu.co/go_api/oikos_api/v1/",
    CONFIGURACION_SERVICE: "http://10.20.0.254/configuracion_api/v1/",
    TOKEN: {
        AUTORIZATION_URL: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize",
        URL_USER_INFO: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/userinfo",
        CLIENTE_ID: "tFtMBfhin7fFRpaKZVNg5rO8pW0a",
        REDIRECT_URL: "http://10.20.0.254/titan/",
        RESPONSE_TYPE: "id_token token",
        SCOPE: "openid email",
        BUTTON_CLASS: "btn btn-warning btn-sm",
        SIGN_OUT_URL: "https://autenticacion.portaloas.udistrital.edu.co/oidc/logout",
        SIGN_OUT_REDIRECT_URL: "http://10.20.0.254/titan/",
        SIGN_OUT_APPEND_TOKEN: "true",
        REFRESH_TOKEN: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/token",
        CLIENT_SECRET: "Y8WA3LDAH79QjiMvCkTfaiZsOtEa"
    },
};
var conf_local = {
    ADMINISTRATIVA_AMAZON_SERVICE: "https://tuleap.udistrital.edu.co/go_api/administrativa_amazon_api/v1/",
    TITAN_SERVICE: "http://localhost:8080/v1/",
    TITAN_MID_SERVICE: "http://localhost:8081/v1/",
    OIKOS_SERVICE: "https://tuleap.udistrital.edu.co/go_api/oikos_api/v1/",
    CONFIGURACION_SERVICE: "http://10.20.0.254/configuracion_api/v1/",
    TOKEN: {
        AUTORIZATION_URL: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize",
        URL_USER_INFO: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/userinfo",
        CLIENTE_ID: "FJ6gjbHqzAE3fKU7gO7pedGhuEAa",
        REDIRECT_URL: "http://localhost:9000/",
        RESPONSE_TYPE: "id_token token",
        SCOPE: "openid email",
        BUTTON_CLASS: "btn btn-warning btn-sm",
        SIGN_OUT_URL: "https://autenticacion.portaloas.udistrital.edu.co/oidc/logout",
        SIGN_OUT_REDIRECT_URL: "http://localhost:9000/",
        SIGN_OUT_APPEND_TOKEN: "true",
        REFRESH_TOKEN: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/token",
        CLIENT_SECRET: "Y8WA3LDAH79QjiMvCkTfaiZsOtEa"
    },
};

var conf_presentacion = {
    ADMINISTRATIVA_AMAZON_SERVICE: "https://tuleap.udistrital.edu.co/go_api/administrativa_amazon_api/v1/",
    TITAN_SERVICE: "http://10.20.0.210/titan_api_crud/v1/",
    TITAN_MID_SERVICE: "http://10.20.0.210/titan_api_mid/v1/",
    OIKOS_SERVICE: "https://tuleap.udistrital.edu.co/go_api/oikos_api/v1/",
    CONFIGURACION_SERVICE: "http://10.20.0.254/configuracion_api/v1/",
    TOKEN: {
        AUTORIZATION_URL: "https://10.20.0.162:9443/oauth2/authorize",
        URL_USER_INFO: "https://10.20.0.162:9443/oauth2/userinfo",
        CLIENTE_ID: "bfPMflsiPVN6WFjJZIpzjsLdlx8a",
        REDIRECT_URL: "http://localhost:9000/",
        RESPONSE_TYPE: "code",
        SCOPE: "openid email",
        BUTTON_CLASS: "btn btn-warning btn-sm",
        SIGN_OUT_URL: "https://10.20.0.162:9443/oidc/logout",
        SIGN_OUT_REDIRECT_URL: "http://localhost:9000/",
        SIGN_OUT_APPEND_TOKEN: "true",
        REFRESH_TOKEN: "https://10.20.0.162:9443/oauth2/token",
        CLIENT_SECRET: "4C_HkdaZsMF4Fthfm6D2n5joLzEa"
    },

};



angular.module('titanClienteV2App')
    .constant('CONF', {
        GENERAL: conf_pruebas

    });
