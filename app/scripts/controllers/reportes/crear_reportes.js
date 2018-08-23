'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:CrearReportesCtrl
 * @description
 * # NovedadesNovedadRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
    .controller('CrearReportesCtrl', function(oikosRequest,titanRequest, titanMidRequest,$scope, $translate, $route, $window) {
        var self = this;

        self.anioPeriodo = new Date().getFullYear();
        self.mesPeriodo = new Date().getMonth();
        self.anios = [];


        self.meses = {
            1: "Enero",
            2: "Febrero",
            3: "Marzo",
            4: "Abril",
            5: "Mayo",
            6: "Junio",
            7: "Julio",
            8: "Agosto",
            9: "Septiembre",
            10: "Octubre",
            11: "Noviembre",
            12: "Diciembre"
        };

        //Crea un arreglo de objetos para tener los años desde el 1900 hasta el año actual con el metodo getFullYear()
        function calcularAnios() {
            for (var i = new Date().getFullYear(); i >= 2015; i--) {
                self.anios.push({ anio: i });
            }
        }
        calcularAnios();

       

        oikosRequest.get("dependencia", "limit=-1&query=DependenciaTipoDependencia.TipoDependenciaId.Id:2").then(function (response) {
            self.facultades = response.data;
            
          
        });

         titanRequest.get('nomina', 'limit=-1').then(function(response) {
            self.nominas = response.data;

        });

        $scope.$watch('crearReportes.selected_facultad',function(){
            
            if(self.selected_facultad !== undefined && self.selected_nivel !== undefined){

            var objeto_facultad = JSON.parse(self.selected_facultad);
       
                 oikosRequest.get("dependencia/proyectosPorFacultad/" + objeto_facultad.Id + "/" + self.selected_nivel, "").then(function (response) {
                     self.proyectos = response.data;
           
                });
            }
        });

         $scope.$watch('crearReportes.selected_nivel',function(){
            
       
            if(self.selected_facultad !== undefined && self.selected_nivel !== undefined){

            var objeto_facultad = JSON.parse(self.selected_facultad);
          
                 oikosRequest.get("dependencia/proyectosPorFacultad/" + objeto_facultad.Id + "/" + self.selected_nivel, "").then(function (response) {
                     self.proyectos = response.data;
           
                });
            }
        });


        self.generar_reporte_nomina_pc = function(){

          
            var objeto_pc = JSON.parse(self.selected_pc);

            self.objeto_nomina = {
                Id: 4
            }

            self.objeto_preliquidacion = {
                Ano:parseInt(self.anoReporte),
                Mes:parseInt(self.mesReporte),
                Nomina: self.objeto_nomina
            }

            self.objeto_reporte_pc = {
                ProyectoCurricular: objeto_pc.Id,
                Preliquidacion: self.objeto_preliquidacion
            }

            console.log("hola soy tu objeto", self.objeto_reporte_pc)
        titanMidRequest.post('gestion_reportes/total_nomina_por_facultad/', self.objeto_reporte_pc).then(function(response) {
            
            if(response.data === null){
                self.total = 0;
            }else{
                self.total = response.data
            }
            });
        };

        self.reporte_a_mostrar = function(panel){
            self.reporte_seleccionado = panel;

        };
    });
