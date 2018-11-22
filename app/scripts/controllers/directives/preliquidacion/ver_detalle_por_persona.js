'use strict';

/**
 * @ngdoc directive
 * @name TitanClienteApp.directive:verRp
 * @description
 * # verRp
 */
angular.module('titanClienteV2App')
  .directive('verDetallePorPersona', function() {
    return {
      restrict: 'E',
      scope: {
        detalle: '=?',
      },
      templateUrl: 'views/directives/preliquidacion/ver_detalle_por_persona.html',

      controller: function($scope) {
        var ctrl = this;
        $scope.inputpestanaabierta = !$scope.inputpestanaabierta;
        ctrl.detalle_a_mostrar = $scope.detalle;
        console.log("hola el detalle", ctrl.detalle_a_mostrar)


      },
      controllerAs: 'd_verDetallePorPersona'
    };
  });
