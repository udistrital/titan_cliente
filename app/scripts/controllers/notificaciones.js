'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:NotificacionesCtrl
 * @description
 * # NotificacionesCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('NotificacionesCtrl', function ($scope, notificacion) {
    $scope.imagePath = 'images/yeoman.png';
    $scope.notificacion = notificacion;
  });
