'use strict';

/**
 * @ngdoc service
 * @name titanClienteV2App.config
 * @description
 * # config
 * Service in the titanClienteV2App.
 */

var conf_prod = {
    ADMINISTRATIVA_AMAZON_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_amazon_api/v1/",
    CONFIGURACION_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/",
    OIKOS_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/oikos_crud_api/v1/",
    TITAN_MID_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/titan_api_mid/v1/",
    TITAN_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/titan_api_crud/v1/",
    COLAS_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/cola/v1/",
    TOKEN: {
        AUTORIZATION_URL: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize",
        URL_USER_INFO: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/userinfo",
        CLIENTE_ID: "RtKvddUD9v_IvIOjaR9FXFaxc4Qa",
        REDIRECT_URL: "https://titan.portaloas.udistrital.edu.co/",
        RESPONSE_TYPE: "id_token token",
        SCOPE: "openid email",
        BUTTON_CLASS: "btn btn-warning btn-sm",
        SIGN_OUT_URL: "https://autenticacion.portaloas.udistrital.edu.co/oidc/logout",
        SIGN_OUT_REDIRECT_URL: "https://titan.portaloas.udistrital.edu.co/",
        SIGN_OUT_APPEND_TOKEN: "true",
        REFRESH_TOKEN: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/token",
        CLIENT_SECRET: "4C_HkdaZsMF4Fthfm6D2n5joLzEa"
    },
};

var conf_preprod = {
    ADMINISTRATIVA_AMAZON_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_amazon_api/v1/",
    CONFIGURACION_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/",
    OIKOS_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/oikos_crud_api/v1",
    TITAN_MID_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/titan_api_mid/v1/",
    TITAN_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/titan_api_crud/v1/",
    COLAS_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/cola/v1/",
    TOKEN: {
        AUTORIZATION_URL: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize",
        URL_USER_INFO: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/userinfo",
        CLIENTE_ID: "B8dEcXp6KGJrHtAxZm3_OQ_pm4Ia",
        REDIRECT_URL: "https://pruebastitan.portaloas.udistrital.edu.co/",
        RESPONSE_TYPE: "id_token token",
        SCOPE: "openid email",
        BUTTON_CLASS: "btn btn-warning btn-sm",
        SIGN_OUT_URL: "https://autenticacion.portaloas.udistrital.edu.co/oidc/logout",
        SIGN_OUT_REDIRECT_URL: "https://pruebastitan.portaloas.udistrital.edu.co/",
        SIGN_OUT_APPEND_TOKEN: "true",
        REFRESH_TOKEN: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/token",
        CLIENT_SECRET: "4C_HkdaZsMF4Fthfm6D2n5joLzEa"
    },
};

var conf_local = {


    ADMINISTRATIVA_AMAZON_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_amazon_api/v1/",
    CONFIGURACION_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/",
    OIKOS_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/oikos_crud_api/v1",
    TITAN_MID_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/titan_api_mid/v1/",
    TITAN_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/titan_api_crud/v1/",
    COLAS_SERVICE: "https://autenticacion.portaloas.udistrital.edu.co/apioas/cola/v1/",

    TOKEN: {
        AUTORIZATION_URL: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize",
        URL_USER_INFO: "https://autenticacion.portaloas.udistrital.edu.co/oauth2/userinfo",
        CLIENTE_ID: "sWe9_P_C76DWGOsLcOY4T7BYH6oa",
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



angular.module('titanClienteV2App')
    .constant('CONF', {

        GENERAL: conf_prod


    });
