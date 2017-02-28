'use strict';

/**
 * @ngdoc overview
 * @name titanClienteV2App
 * @description
 * # titanClienteV2App
 *
 * Main module of the application.
 */
angular
  .module('titanClienteV2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'afOAuth2',
    'treeControl',
    'ngMaterial',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav',
    'ui.grid.treeView',
    'ui.grid.selection',
    'ui.grid.exporter',
    'ui.grid.autoResize',
    'titanService',
    'titanMidService'
  ])
    .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix("");
      $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/nomina/nomina_consulta', {
        templateUrl: 'views/nomina/nomina_consulta.html',
        controller: 'NominaNominaConsultaCtrl',
        controllerAs: 'nominaConsulta'
      })
      .when('/preliquidacion/preliquidacion_registro', {
        templateUrl: 'views/preliquidacion/preliquidacion_registro.html',
        controller: 'PreliquidacionPreliquidacionRegistroCtrl',
        controllerAs: 'preliquidacionRegistro'
      })
      .when('/preliquidacion/preliquidacion_personas', {
        templateUrl: 'views/preliquidacion/preliquidacion_personas.html',
        controller: 'PreliquidacionPreliquidacionPersonasCtrl',
        controllerAs: 'preliquidacionPersonas'
      })
      .when('/preliquidacion/preliquidacion_detalle', {
        templateUrl: 'views/preliquidacion/preliquidacion_detalle.html',
        controller: 'PreliquidacionPreliquidacionDetalleCtrl',
        controllerAs: 'preliquidacionDetalle'
      })
      .when('/preliquidacion/resumen_preliquidacion', {
        templateUrl: 'views/preliquidacion/resumen_preliquidacion.html',
        controller: 'PreliquidacionResumenPreliquidacionCtrl',
        controllerAs: 'resumenPreliquidacion'
      })
      .when('/novedades/novedad_registro', {
        templateUrl: 'views/novedades/novedad_registro.html',
        controller: 'NovedadesNovedadRegistroCtrl',
        controllerAs: 'novedadRegistro'
      })

      .when('/novedades/novedad_consulta', {
        templateUrl: 'views/novedades/novedad_consulta.html',
        controller: 'NovedadesNovedadConsultaCtrl',
        controllerAs: 'novedadConsulta'
      })
      .when('/liquidacion/liquidacion_detalle', {
        templateUrl: 'views/liquidacion/liquidacion_detalle.html',
        controller: 'LiquidacionCtrl',
        controllerAs: 'liquidacion'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
