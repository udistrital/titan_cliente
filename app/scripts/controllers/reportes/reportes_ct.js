'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:ReportesCtCtrl
 * @description
 * # NovedadesNovedadRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
    .controller('ReportesCtCtrl', function(oikosRequest,titanRequest, titanMidRequest,$scope, $translate, $route, $window) {
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

            paginationPageSizes: [5, 10, 20],
            paginationPageSize: 10,
            enableFiltering: true,
            enableSorting: true,
            enableRowSelection: false,
            enableRowHeaderSelection: false,

            columnDefs: [

                {
                    field: 'NombreCompleto',
                    displayName: $translate.instant('NOMBRE_PERSONA'),
                    headerCellClass: 'encabezado',
                    width: '20%',
                },
                {
                    field: 'Documento',
                    displayName: $translate.instant('DOCUMENTO'),
                    headerCellClass: 'encabezado',
                    width: '15%',
                },
                {
                    field: 'NumeroContrato',
                    displayName: $translate.instant('NUM_CONTRATO'),
                    headerCellClass: 'encabezado',
                    width: '10%',
                },
                {
                    field: 'VigenciaContrato',
                    displayName: $translate.instant('VIGENCIA'),
                    width: '10%',
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
                    displayName:  $translate.instant('NATURALEZA_NOMBRE'),
                    width: '10%',
                    headerCellClass: 'encabezado',
                    cellFilter: "filtro_naturaleza_concepto_reporte:row.entity"
                },
                {
                    field: 'ValorCalculado',
                    displayName: $translate.instant('VALOR'),
                    width: '15%',
                    cellFilter: 'currency',
                    headerCellClass: 'encabezado',
                    cellClass: 'alineacion_derecha'
                },

            ]
        };





        $scope.$watch('ReportesCt.selected_facultad',function(){

            if(self.selected_facultad !== undefined && self.selected_nivel !== undefined){

            var objeto_facultad = JSON.parse(self.selected_facultad);

                 oikosRequest.get("dependencia/proyectosPorFacultad/" + objeto_facultad.Id + "/" + self.selected_nivel, "").then(function (response) {
                     self.proyectos = response.data;

                });
            }
        });

         $scope.$watch('ReportesCt.selected_nivel',function(){


            if(self.selected_facultad !== undefined && self.selected_nivel !== undefined){

            var objeto_facultad = JSON.parse(self.selected_facultad);

                 oikosRequest.get("dependencia/proyectosPorFacultad/" + objeto_facultad.Id + "/" + self.selected_nivel, "").then(function (response) {
                     self.proyectos = response.data;

                });
            }
        });

        self.generar_reporte = function(){


          if (self.reporte_seleccionado == "total_nomina_por_dependencia"){
            self.generar_reporte_nomina_dependencia();
          }


        };

        self.generar_desagregado = function(){


          if (self.reporte_seleccionado == "total_nomina_por_dependencia"){
            self.desagregacion_seleccionada = "desc_nomina_por_dependencia";
            self.generar_desagregado_nomina_dependencia();
          }


        };

        self.generar_desagregado_nomina_dependencia = function(){


          self.cargando_grid = true;
          self.hayData_grid = true;
          self.gridOptions_desagregado.data = [];
          //  var objeto_dependencia = JSON.parse(self.selected_dependencia);
          var objeto_dependencia = self.selected_dependencia;
          var objeto_nom = JSON.parse(self.selected_nomina);
          console.log(objeto_nom)

          self.objeto_nomina = {
              Id: objeto_nom.Id,
              TipoNomina: objeto_nom.TipoNomina
          }

          self.objeto_preliquidacion = {
              Ano:parseInt(self.anoReporte),
              Mes:parseInt(self.mesReporte),
              Nomina: self.objeto_nomina
          }

          self.objeto_reporte_dependencia = {
              //Dependencia: parseInt(objeto_dependencia),
              Dependencia: objeto_dependencia,
              Preliquidacion: self.objeto_preliquidacion
          }
          console.log("objeto dependencia",self.objeto_reporte_dependencia)

      titanMidRequest.post('gestion_reportes/desagregado_nomina_por_dependencia/', self.objeto_reporte_dependencia).then(function(response) {

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



        self.generar_reporte_nomina_dependencia = function(){

            self.panel_generacion = "true";
            self.cargando = true;
            self.hayData = true;
          //  var objeto_dependencia = JSON.parse(self.selected_dependencia);
            var objeto_dependencia = self.selected_dependencia;
            var objeto_nom = JSON.parse(self.selected_nomina);

            self.objeto_nomina = {
                Id: objeto_nom.Id
            }

            self.objeto_preliquidacion = {
                Ano:parseInt(self.anoReporte),
                Mes:parseInt(self.mesReporte),
                Nomina: self.objeto_nomina
            }

            self.objeto_reporte_dependencia = {
                //Dependencia: parseInt(objeto_dependencia),
                Dependencia: objeto_dependencia,
                Preliquidacion: self.objeto_preliquidacion
            }
            console.log("objeto dependencia",self.objeto_reporte_dependencia)

        titanMidRequest.post('gestion_reportes/total_nomina_por_dependencia/', self.objeto_reporte_dependencia).then(function(response) {

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

        self.reporte_a_mostrar = function(panel,titulo){
            self.reporte_seleccionado = panel;
            self.titulo = $translate.instant(titulo);
            self.panel_generacion = false;
            self.desagregacion_seleccionada = false;

        };
    }).filter('filtro_naturaleza_concepto_reporte', function($filter) {
        return function(input, entity) {
            var output;

            if (undefined === input || null === input) {
                return "";
            }

            if (entity.Concepto.NaturalezaConcepto.Nombre === "devengo") {
                output = "Devengo";
            }

            if (entity.Concepto.NaturalezaConcepto.Nombre === "descuento") {
                output = "Descuento";
            }

            if (entity.Concepto.NaturalezaConcepto.Nombre === "seguridad_social") {
                output = "Seguridad Social";
            }

            return output;
        };
    });
