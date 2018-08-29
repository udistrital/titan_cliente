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

        self.gridOptions_desagregado = {

            enableFiltering: true,
            enableSorting: true,
            enableRowSelection: false,
            enableRowHeaderSelection: false,

            columnDefs: [

                {
                    field: 'NumeroContrato',
                    displayName: $translate.instant('NUMERO_CONTRATO'),
                    headerCellClass: 'encabezado',
                    width: '20%',
                },
                {
                    field: 'VigenciaContrato',
                    displayName: $translate.instant('VIGENCIA_CONTRATO'),
                    width: '20%',
                    headerCellClass: 'encabezado',
                },
                {
                    field: 'Concepto.AliasConcepto',
                    displayName: $translate.instant('CONCEPTO_NOMBRE'),
                    width: '20%',
                    headerCellClass: 'encabezado',
                },
                {
                    field: 'Concepto.NaturalezaConcepto.Nombre',
                    displayName: $translate.instant('NATURALEZA_CONCEPTO'),
                    width: '20%',
                    headerCellClass: 'encabezado',
                },
                {
                    field: 'ValorCalculado',
                    displayName: $translate.instant('VALOR'),
                    width: '20%',
                    cellFilter: 'currency',
                    headerCellClass: 'encabezado',
                    cellClass: 'alineacion_derecha'
                },

            ]
        };





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

        self.generar_reporte = function(){

          if (self.reporte_seleccionado == "total_nomina_por_pc"){
              self.generar_reporte_nomina_pc();
          }

          if (self.reporte_seleccionado == "total_nomina_por_facultad"){
            self.generar_reporte_nomina_facultad();
          }


        };

        self.generar_desagregado = function(){

          if (self.reporte_seleccionado == "total_nomina_por_pc"){
              self.desagregacion_seleccionada = "desc_nomina_por_pc";
            //  self.generar_reporte_nomina_pc();
          }

          if (self.reporte_seleccionado == "total_nomina_por_facultad"){

            self.desagregacion_seleccionada = "desc_nomina_por_facultad";
            self.generar_desagregado_nomina_facultad();
          }


        };

        self.generar_desagregado_nomina_facultad = function(){


          self.cargando_grid = true;
          self.hayData_grid = true;
          self.gridOptions_desagregado.data = [];
          var objeto_facultad = JSON.parse(self.selected_facultad);
          var objeto_nom = JSON.parse(self.selected_nomina);

          self.objeto_nomina = {
              Id: objeto_nom.Id
          }

          self.objeto_preliquidacion = {
              Ano:parseInt(self.anoReporte),
              Mes:parseInt(self.mesReporte),
              Nomina: self.objeto_nomina
          }

          self.objeto_reporte_facultad = {
              Facultad: parseInt(objeto_facultad.Id),
              Preliquidacion: self.objeto_preliquidacion
          }

      titanMidRequest.post('gestion_reportes/desagregado_nomina_por_facultad/', self.objeto_reporte_facultad).then(function(response) {

          if(response.data === null){
              self.cargando_grid = false;
              self.hayData_grid = false;
              self.gridOptions_desagregado.data = [];
          }else{
              self.cargando_grid = false;
              self.hayData_grid = true;

              self.gridOptions_desagregado.data = response.data;
              console.log("respuesta", self.respuesta.Preliquidacion)
          }
          });
        };


        self.generar_reporte_nomina_pc = function(){

            self.panel_generacion = "true";
            self.cargando = true;
            self.hayData = true;
            var objeto_pc = JSON.parse(self.selected_pc);
            var objeto_nom = JSON.parse(self.selected_nomina);

            self.objeto_nomina = {
                Id: objeto_nom.Id
            }

            self.objeto_preliquidacion = {
                Ano:parseInt(self.anoReporte),
                Mes:parseInt(self.mesReporte),
                Nomina: self.objeto_nomina
            }

            self.objeto_reporte_pc = {
                ProyectoCurricular: parseInt(objeto_pc.Id),
                Preliquidacion: self.objeto_preliquidacion
            }

        titanMidRequest.post('gestion_reportes/total_nomina_por_proyecto/', self.objeto_reporte_pc).then(function(response) {

            if(response.data === null){
                self.cargando = false;
                self.hayData = false;
            }else{
                self.cargando = false;
                self.hayData = true;

                self.respuesta = response.data;
                console.log("respuesta", self.respuesta.Preliquidacion)
            }
            });
        };

        self.generar_reporte_nomina_facultad = function(){

            self.panel_generacion = "true";
            self.cargando = true;
            self.hayData = true;
            var objeto_facultad = JSON.parse(self.selected_facultad);
            var objeto_nom = JSON.parse(self.selected_nomina);

            self.objeto_nomina = {
                Id: objeto_nom.Id
            }

            self.objeto_preliquidacion = {
                Ano:parseInt(self.anoReporte),
                Mes:parseInt(self.mesReporte),
                Nomina: self.objeto_nomina
            }

            self.objeto_reporte_facultad = {
                Facultad: parseInt(objeto_facultad.Id),
                Preliquidacion: self.objeto_preliquidacion
            }

        titanMidRequest.post('gestion_reportes/total_nomina_por_facultad/', self.objeto_reporte_facultad).then(function(response) {

            if(response.data === null){
                self.cargando = false;
                self.hayData = false;
            }else{
                self.cargando = false;
                self.hayData = true;

                self.respuesta = response.data;
                console.log("respuesta", self.respuesta.Preliquidacion)
            }
            });
        };

        self.reporte_a_mostrar = function(panel){
            self.reporte_seleccionado = panel;
            self.titulo = panel;
            self.panel_generacion = false;
            self.desagregacion_seleccionada = false;

        };
    });
