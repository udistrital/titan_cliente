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

            var personas_a_liquidar = [];
              if ($scope.preliquidacion.Nomina.TipoNomina.Nombre === "HCH" || $scope.preliquidacion.Nomina.TipoNomina.Nombre === "HCS"  || $scope.preliquidacion.Nomina.TipoNomina.Nombre === "CT") {
                self.nombre_seleccionado = $scope.persona.nom_proveedor;
                self.cedula_seleccionado = $scope.persona.num_documento;

                    var persona = {
                        IdPersona: parseInt($scope.persona.id_proveedor),
                        NumDocumento: parseInt($scope.persona.num_documento),
                        NumeroContrato: $scope.persona.numero_contrato,
                        VigenciaContrato: parseInt($scope.persona.vigencia),
                        Pendiente: "false",
                        FechaInicio:$scope.persona.fecha_inicio,
                        FechaFin:$scope.persona.fecha_fin,
                        ValorContrato:$scope.persona.valor_contrato,
                    };

                    personas_a_liquidar.push(persona)
              }

              if ($scope.preliquidacion.Nomina.TipoNomina.Nombre === "FP") {

                self.nombre_seleccionado = $scope.persona.NombreProveedor;
                self.cedula_seleccionado = $scope.persona.NumDocumento;

                  var persona = {
                      IdPersona: parseInt($scope.persona.Id),
                      NumDocumento: parseInt($scope.persona.NumDocumento),
                      NumeroContrato: $scope.persona.NumeroContrato,
                      VigenciaContrato: parseInt($scope.persona.VigenciaContrato),
                      Pendiente: "false",
                  };

                    personas_a_liquidar.push(persona)
              }

            var datos_preliquidacion = {
                Preliquidacion: $scope.preliquidacion,
                PersonasPreLiquidacion: personas_a_liquidar,
            };


            titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {
              var totalapagar=0;
              var salud=0;
              var pension=0;
              var arl=0;
              
              angular.forEach(response.data[0].Conceptos, function(value, key){
                
                
                //se toma el valor puntual para salud, pension y arl
                if (value.Nombre=="salud"){
                    salud=parseInt(value.Valor);
                }
                if (value.Nombre=="pension"){
                  pension=parseInt(value.Valor);
              }
              if (value.Nombre=="arl"){
                  arl=parseInt(value.Valor);
              }
           });
           //se crea objeto concepto
           const contrato = {
              Conceptos:  [],
              EstadoPago: "Listo para pago",
              Id: 0,
              NumDocumento: 0,
              NumeroContrato: "",
              Saldo_RP: 0,
              TotalAPagar: 0,
              TotalDescuentos: 0,
              TotalDevengos: 0,
              VigenciaContrato: "",
              TotalConSalud:0
            };
                  var totalapagar=0;
                  var consalud=0;
                  
                  totalapagar=response.data[0].TotalAPagar;
                  console.log(totalapagar);
                  console.log(salud);
                  console.log(pension);
                  console.log(arl);
                  consalud=totalapagar+salud+pension-arl;
                  contrato.TotalConSalud=totalapagar;
                  contrato.EstadoPago=response.data[0].EstadoPago;
                  contrato.Id=response.data[0].Id;
                  contrato.NumDocumento=response.data[0].NumDocumento;
                  contrato.NumeroContrato=response.data[0].NumeroContrato;
                  contrato.Conceptos=response.data[0].Conceptos;
                  contrato.Saldo_RP= response.data[0].Saldo_RP;
                  contrato.TotalAPagar=consalud;
                  contrato.TotalDescuentos=response.data[0].TotalDescuentos;
                  contrato.TotalDevengos=response.data[0].TotalDevengos;
                  contrato.VigenciaContrato= response.data[0].VigenciaContrato;
                  response.data[0]=contrato;
                 
                  self.detalles = response.data;
                  $scope.mostrarleyenda = "true";

              });

          }
        }


        $scope.$watch("persona", function() {
          self.preliquidar_persona();
          $scope.mostrarleyenda = "false";

        });



      },
      controllerAs: 'd_verDetallePorPersona'
    };
  });
