'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:CrearReportesCtrl
 * @description
 * # NovedadesNovedadRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
    .controller('CrearReportesCtrl', function(titanRequest, titanMidRequest,$scope, $translate, $route, $window) {
        var self = this;
        
        self.generar_reporte_nomina_facultad = function(){

            self.objeto_nomina = {
                Id: 4
            }

            self.objeto_preliquidacion = {
                Ano:2018,
                Mes:2,
                Nomina: self.objeto_nomina
            }

            self.objeto_detalle = {
                Preliquidacion: self.objeto_preliquidacion
            }

        titanMidRequest.post('gestion_reportes/total_nomina_por_facultad/', self.objeto_detalle).then(function(response) {
            
            if(response.data === null){
                self.total = 0;
            }else{
                self.total = response.data
            }
            });
        };
    });
