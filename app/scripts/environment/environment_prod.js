'use strict';

// Reemplace titanClienteV2App por el nombre del módulo de la aplicación principal

/**
 * @ngdoc service
 * @name titanClienteV2App.config
 * @description
 * # config
 * Constant in the titanClienteV2App.
 */


angular.module('titanClienteV2App')
  .constant('CONF', {
    APP: "titan", // Nombre de la app, esto cargará el logo.
    APP_MENU: "Titan", // Ingrese valor de la aplicación asociado al menú registrado en wso2
    GENERAL: {
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
    },
  });
