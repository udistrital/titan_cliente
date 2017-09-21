'use strict';

/**
 * @ngdoc directive
 * @name titanClienteV2App.directive:btnRegistro
 * @description
 * # btnRegistro
 */
angular.module('titanClienteV2App')
  .directive('btnRegistro', function() {
  return {
      restrict: 'E',
      scope: {
          fila: '=',
          funcion: '&',
          grupobotones: '='
      },
      templateUrl: 'views/directives/btn_registro.html',
      link: function(scope, elm, attrs) {
          //console.log(scope);
      }
  };
});
