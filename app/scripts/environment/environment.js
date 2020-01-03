'use strict';

// Reemplace MODULE_APP por el nombre del módulo de la aplicación principal

/**
 * @ngdoc service
 * @name MODULE_APP.config
 * @description
 * # config
 * Constant in the MODULE_APP.
 */


angular.module('MODULE_APP')
  .constant('CONF', {
    APP: "titan", // Nombre de la app, esto cargará el logo.
    APP_MENU: "Titan", // Ingrese valor de la aplicación asociado al menú registrado en wso2
    GENERAL: {
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
    },
  });
