'use strict';

/**
 * @ngdoc directive
 * @name TitanClienteApp.directive:verRp
 * @description
 * # verRp
 */
angular.module('titanClienteV2App')
  .directive('verDetallePorPersona', function(titanMidRequest) {
    return {
      restrict: 'E',
      scope: {
        persona: '=?',
        preliquidacion: '=?',
        open: '=?',
        mostrarleyenda: '=?'
      },
      templateUrl: 'views/directives/preliquidacion/ver_detalle_por_persona.html',

      controller: function($scope) {
        var self = this;
        $scope.inputpestanaabierta = $scope.open;
        $scope.mostrarleyenda = "false"
        self.preliquidar_persona = function() {

          if($scope.persona != undefined && $scope.preliquidacion != undefined){

            $scope.preliquidacion.Definitiva = false;
            self.nombre_seleccionado = $scope.persona.nom_proveedor;
            self.cedula_seleccionado = $scope.persona.num_documento;
            var personas_a_liquidar = [];
              if ($scope.preliquidacion.Nomina.TipoNomina.Nombre === "HCH" || $scope.preliquidacion.Nomina.TipoNomina.Nombre === "HCS"  || $scope.preliquidacion.Nomina.TipoNomina.Nombre === "CT") {

                    var persona = {
                        IdPersona: parseInt($scope.persona.id_proveedor),
                        NumDocumento: parseInt($scope.persona.num_documento),
                        NumeroContrato: $scope.persona.numero_contrato,
                        VigenciaContrato: parseInt($scope.persona.vigencia),
                        Pendiente: "false",

                    };

                    personas_a_liquidar.push(persona)
              }


            var datos_preliquidacion = {
                Preliquidacion: $scope.preliquidacion,
                PersonasPreLiquidacion: personas_a_liquidar

            };


            titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {
                  self.detalles = response.data
                  $scope.mostrarleyenda = "true";

              });

          }
        }


        $scope.$watch("persona", function() {
          self.preliquidar_persona();
        });



      },
      controllerAs: 'd_verDetallePorPersona'
    };
  });
