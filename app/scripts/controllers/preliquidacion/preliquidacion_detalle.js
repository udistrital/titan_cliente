'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:PreliquidacionPreliquidacionDetalleCtrl
 * @description
 * # PreliquidacionPreliquidacionDetalleCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
    .controller('PreliquidacionPreliquidacionDetalleCtrl', function($localStorage, $scope, titanMidRequest, titanRequest, preliquidacion, $translate, $http, $route, $location) {
        var self = this;
        self.numero_conceptos = 0;
        self.resumen_conceptos;
        self.imagen_ud;
        self.seleccion_sueldoNeto = 0;
        self.respuesta_persona;
        self.respuesta_conceptos;
        //self.preliquidacion = preliquidacion;
        self.preliquidacion = $localStorage.preliquidacion

        self.gridOptions = {
            paginationPageSizes: [20, 40,60],
            paginationPageSize: 40,
            enableFiltering: true,
            enableSorting: true,
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            enableSelectAll: false,
            columnDefs: [{
                    field: 'IdPersona',
                    visible: false
                },

                {
                    field: 'NumDocumento',
                    displayName: $translate.instant('DOCUMENTO'),
                    width: '40%',
                    headerCellClass: 'encabezado',
                    cellTemplate: '<button class="btn btn-link btn-block" ng-click="grid.appScope.preliquidacionDetalle.ver_seleccion_persona(row)" >{{row.entity.NumDocumento}}</button>',
                    cellClass: function(grid, row) {
                        if (row.entity.Disponibilidad === 2) {
                            return 'text-center si_pago';
                        } else if (row.entity.Disponibilidad === 1) {
                            return 'text-center no_pago';
                        }
                    }
                },
                {
                    field: 'NombreCompleto',
                    displayName: $translate.instant('NOMBRE_PERSONA'),
                    width: '60%',
                    headerCellClass: 'encabezado',
                    cellClass: function(grid, row) {
                        if (row.entity.Disponibilidad === 2) {
                            return 'si_pago';
                        } else if (row.entity.Disponibilidad === 1) {
                            return 'no_pago';
                        }
                    }
                },
                {
                    field: 'Disponibilidad',
                    visible: false
                }

            ],
            onRegisterApi: function(gridApi) {
                self.gridApi = gridApi;

            }
        };


        self.gridOptions_detalle = {

            paginationPageSizes: [20, 40,60],
            paginationPageSize: 40,
            enableFiltering: true,
            enableSorting: true,
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            enableSelectAll: false,

            columnDefs: [


                {
                    field: 'Concepto.AliasConcepto',
                    displayName: $translate.instant('CONCEPTO_NOMBRE'),
                    width: '60%',
                    sort: {
                       direction: 'asc',
                       priority: 2
                   },
                    headerCellClass: 'encabezado',
                    cellClass: function(grid, row) {
                        if (row.entity.Concepto.NaturalezaConcepto.Id === 1) {
                            return 'text-center devengo';
                        } else if (row.entity.Concepto.NaturalezaConcepto.Id === 2) {
                            return 'text-center descuento';
                        } else if (row.entity.Concepto.NaturalezaConcepto.Id === 3) {
                            return 'text-center seguridad_social';
                        }
                    }
                },
                {
                    field: 'Concepto.NaturalezaConcepto.Id',
                    sort: {
                       direction: 'asc',
                       priority: 1
                   },
                    visible:false
                },

                {
                    field: 'ValorCalculado',
                    displayName: $translate.instant('VALOR'),
                    width: '40%',
                    cellFilter: 'currency',
                    headerCellClass: 'encabezado',
                    cellClass: function(grid, row) {
                        if (row.entity.Concepto.NaturalezaConcepto.Id === 1) {
                            return 'alineacion_derecha devengo';
                        } else if (row.entity.Concepto.NaturalezaConcepto.Id === 2) {
                            return 'alineacion_derecha descuento';
                        } else if (row.entity.Concepto.NaturalezaConcepto.Id === 3) {
                            return 'alineacion_derecha seguridad_social';
                        }
                    }
                },

            ]
        };


        self.gridOptions_resumen = {

            paginationPageSizes: [20, 40,60],
            paginationPageSize: 40,
            enableFiltering: true,
            enableSorting: true,
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            enableSelectAll: false,

            columnDefs: [

               {
                    field: 'NombreConcepto',
                    displayName: $translate.instant('CONCEPTO_NOMBRE'),
                    headerCellClass: 'encabezado',
                    sort: {
                       direction: 'asc',
                       priority: 1
                   },
                    width: '60%',
                    cellClass: function(grid, row) {
                        if (row.entity.NaturalezaConcepto === "devengo") {
                            return 'text-center devengo';
                        } else if (row.entity.NaturalezaConcepto === "descuento") {
                            return 'text-center descuento';
                        } else if (row.entity.NaturalezaConcepto === "seguridad_social") {
                            return 'text-center seguridad_social';
                        }
                    }
                },
                {
                     field: 'NaturalezaConceptoId',
                     sort: {
                        direction: 'asc',
                        priority: 0
                    },
                     visible:false
                 },
                {
                     field: 'NaturalezaConcepto',
                     displayName: $translate.instant('TIPO_CONCEPTO'),
                     headerCellClass: 'encabezado',
                     sort: {
                        direction: 'asc',
                        priority: 1
                    },
                     width: '25%',
                     cellClass: function(grid, row) {
                         if (row.entity.NaturalezaConcepto === "devengo") {
                             return 'text-center devengo';
                         } else if (row.entity.NaturalezaConcepto === "descuento") {
                             return 'text-center descuento';
                         } else if (row.entity.NaturalezaConcepto === "seguridad_social") {
                             return 'text-center seguridad_social';
                         }
                     },
                    cellFilter: "filtro_naturaleza_concepto_detalle:row.entity"
                 },
                {
                    field: 'Total',
                    displayName: $translate.instant('TOTAL'),
                    width: '35%',
                    cellFilter: 'currency',
                    cellClass: 'alineacion_derecha',
                    headerCellClass: 'encabezado',
                    cellClass: function(grid, row) {
                        if (row.entity.NaturalezaConcepto === "devengo") {
                            return 'alineacion_derecha devengo';
                        } else if (row.entity.NaturalezaConcepto === "descuento") {
                            return 'alineacion_derecha descuento';
                        } else if (row.entity.NaturalezaConcepto === "seguridad_social") {
                            return 'alineacion_derecha seguridad_social';
                        }
                    }
                },
              ]
        };


       titanMidRequest.post('preliquidacion/resumen_conceptos', self.preliquidacion).then(function(response) {
         self.gridOptions_resumen.data = response.data.ResumenTotalConceptos;
         self.total_devengos = response.data.TotalDevengos
         self.total_descuentos = response.data.TotalDescuentos
         //console.log("response", response.data)
       })

        titanMidRequest.post('preliquidacion/personas_x_preliquidacion', self.preliquidacion).then(function(response) {
          self.gridOptions.data = response.data;
          self.total_contratos_liquidados = response.data.length;
        });



        self.ver_seleccion_persona = function(row) {
          self.persona_seleccionada_nombre = row.entity.NombreCompleto
          self.gridOptions_detalle.data = [];
          //Mostrar contratos
          var query = "query=Preliquidacion.Id:"+self.preliquidacion.Id+",Persona:"+row.entity.IdPersona
          titanRequest.get('detalle_preliquidacion', query).then(function(response) {
            self.gridOptions_detalle.data = response.data;
            self.num_contrato = response.data[0].NumeroContrato + " de "
            self.vigencia = response.data[0].VigenciaContrato
            self.calcular_totales(response.data);
          });

        };

        self.calcular_totales = function(detalle){

          var total_devengos = 0;
          var total_descuentos = 0;
          var total_a_pagar = 0;
          angular.forEach(detalle, function(value, key){
                  if (value.Concepto.NaturalezaConcepto.Nombre == "devengo") {
                    total_devengos = total_devengos + parseInt(value.ValorCalculado);

                  }

                  if (value.Concepto.NaturalezaConcepto.Nombre == "descuento") {
                    total_descuentos = total_descuentos + parseInt(value.ValorCalculado);

                  }
             });

             total_a_pagar = total_devengos - total_descuentos
             self.total_devengos_persona = total_devengos;
             self.total_descuentos_persona = total_descuentos;
             self.total_a_pagar_persona = total_a_pagar;
             console.log("sel",self.total_devengos_persona)
        };

      
        self.solicitar_necesidad = function() {


        };

        self.generar_pdf = function() {
            $http.get("scripts/models/imagen_ud.json")
                .then(function(response) {
                    self.imagen_ud = response.data;
                    var personas = self.gridApi.selection.getSelectedRows();

                    if (personas.length == 0) {
                        swal({
                            html: $translate.instant('ALERTA_SELECCION_PERSONAS_PDF'),
                            type: "error",
                            showCancelButton: true,
                            confirmButtonColor: "#449D44",
                            cancelButtonColor: "#C9302C",
                            confirmButtonText: $translate.instant('VOLVER'),
                            cancelButtonText: $translate.instant('SALIR'),
                        }).then(function() {
                            $location.path('/nomina/nomina_consulta');
                            $route.reload()

                        }, function(dismiss) {

                            if (dismiss === 'cancel') {
                                //si da click en Salir
                                $location.path('/nomina/nomina_consulta');
                                $route.reload()
                            }
                        })
                    } else {
                        self.generar_reporte_para_todos(personas);
                    }
                });

        };

        self.generar_reporte_para_todos = function(row) {

            var content = [];
            var mes_preliquidacion = self.preliquidacion.Mes
            var ano_preliquidacion = self.preliquidacion.Ano
            var desc_nomina = self.preliquidacion.Nomina.Descripcion
            angular.forEach(row, function(persona, index) {

                var num_conceptos;
                var cuerpo_devengos = []
                var cuerpo_descuentos = []

                var valor;
                var valor_descuentos = 0;
                var valor_devengos = 0;
                var valor_devengos_formato;
                var valor_descuentos_formato;
                var encabezado;
                var espacio;
                var tabla_detalle_pago;
                var espacio_pagina;
                var i;
                var j;
                var fecha_generacion = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

                var cuerpo_tabla = [

                    [{ text: $translate.instant('PAGO_PERIODO_PDF') + ano_preliquidacion + '-' + mes_preliquidacion, style: 'tableHeader', colSpan: 5, alignment: 'center' }, {}, {}, {}, {}],
                    [{ text: $translate.instant('NOMBRE_RUBRO'), style: 'tableHeader', alignment: 'center' }, { text: $translate.instant('NOMBRE_BENEFICIARIO'), style: 'tableHeader', alignment: 'center' }, { text: $translate.instant('NOMBRE_ORDEN_PAGO'), style: 'tableHeader', alignment: 'center' }, { text: $translate.instant('FECHA_PDF'), style: 'tableHeader', alignment: 'center' }, { text: $translate.instant('CONCEPTO_PDF'), style: 'tableHeader', alignment: 'center' }],
                    //  datos_persona = self.respuesta_persona[i].NomProveedor + "\n\n" + self.respuesta_persona[i].NumDocumento

                ]


                encabezado = {
                    columns: [{
                            width: 'auto',
                            stack: [{
                                image: self.imagen_ud.imagen,
                                alignment: 'left',
                                width: 100,
                                margin: [0, 0, 0, 0],
                            }]
                        },
                        {
                            width: '*',
                            alignment: 'right',
                            stack: [{
                                style: 'header',
                                text: "\n" + $translate.instant('TITULO_DETALLE_PAGO_PDF') + "\n" + fecha_generacion,
                            }]
                        },

                    ]
                };

                espacio = {
                    text: "\n"
                };

                tabla_detalle_pago = {
                    table: {
                        headerRows: 1,
                        body: cuerpo_tabla
                    },

                };

                espacio_pagina = {
                    text: ' ',
                    pageBreak: 'after'
                };




                for (i = 0; i < self.respuesta_persona.length; i++) {

                    if (self.respuesta_persona[i].IdPersona == persona.IdPersona) {
                        self.numero_de_conceptos(persona)
                        num_conceptos = (4 + self.numero_conceptos + 2) //numero de filas anteriores a los conceptos: 3 + 2 total devengos y descuentos
                            //nota: no se internacionaliza porque son datos que se traerán de kronos
                        cuerpo_tabla.push([{ rowSpan: num_conceptos, text: 'Rubro asociado' }, { text: persona.NomProveedor }, '12345', { text: fecha_generacion }, 'Pago de nómina reserva sistema integral de información de diferentes cps correspondiente al mes de enero con sus respectivos soportes'], [{}, { text: $translate.instant('DETALLE_PAGO_PDF'), style: 'tableHeader', colSpan: 4, alignment: 'center' }, {}, {}, {}])

                        for (j = 0; j < self.respuesta_persona[i].Conceptos.length; j++) {
                            valor = parseInt(self.respuesta_persona[i].Conceptos[j].Valor);
                            valor = valor.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                            if (self.respuesta_persona[i].Conceptos[j].Naturaleza === "devengo") {
                                cuerpo_devengos.push([{}, { text: self.respuesta_persona[i].Conceptos[j].Nombre, colSpan: 3, alignment: 'right' }, {}, {}, { text: valor, alignment: 'right' }])
                                valor_devengos = valor_devengos + parseInt(self.respuesta_persona[i].Conceptos[j].Valor)
                            }
                            if (self.respuesta_persona[i].Conceptos[j].Naturaleza === "descuento") {
                                cuerpo_descuentos.push([{}, { text: self.respuesta_persona[i].Conceptos[j].Nombre, colSpan: 3, alignment: 'right' }, {}, {}, { text: valor, alignment: 'right' }])
                                valor_descuentos = valor_descuentos + parseInt(self.respuesta_persona[i].Conceptos[j].Valor)
                            }
                        }
                    }
                }

                valor_devengos_formato = valor_devengos.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                cuerpo_devengos.push([{}, { text: $translate.instant('TOTAL_DEVENGADO_PDF'), style: 'tableHeader', colSpan: 3, alignment: 'right' }, {}, {}, { text: valor_devengos_formato, style: 'tableHeader', alignment: 'right' }])

                cuerpo_tabla.push([{}, { text: $translate.instant('DEVENGOS_PDF'), style: 'tableHeader', colSpan: 3, alignment: 'center' }, {}, {}, { text: $translate.instant('VALOR_PDF'), style: 'tableHeader', alignment: 'center' }])
                for (i = 0; i < cuerpo_devengos.length; i++) {
                    cuerpo_tabla.push(cuerpo_devengos[i])
                }


                valor_descuentos_formato = valor_descuentos.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                cuerpo_descuentos.push([{}, { text: $translate.instant('TOTAL_DESCUENTOS_PDF'), style: 'tableHeader', colSpan: 3, alignment: 'right' }, {}, {}, { text: valor_descuentos_formato, style: 'tableHeader', alignment: 'right' }])

                cuerpo_tabla.push([{}, { text: $translate.instant('DESCUENTOS_PDF'), style: 'tableHeader', colSpan: 3, alignment: 'center' }, {}, {}, { text: $translate.instant('VALOR_PDF'), style: 'tableHeader', alignment: 'center' }])

                for (i = 0; i < cuerpo_descuentos.length; i++) {
                    cuerpo_tabla.push(cuerpo_descuentos[i])
                }

                var temp = row.length - 1
                if (temp == index) {

                    content.push(encabezado)
                    content.push(espacio)
                    content.push(tabla_detalle_pago)
                } else {
                    content.push(encabezado)
                    content.push(espacio)
                    content.push(tabla_detalle_pago)
                    content.push(espacio_pagina)
                }


                self.numero_conceptos = 0

            });

            var docDefinition = {
                content: content,
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10]
                    },
                    subheader: {
                        fontSize: 16,
                        bold: true,
                        margin: [0, 10, 0, 5]
                    },
                    tableExample: {
                        margin: [0, 5, 0, 15]
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black'
                    }
                }
            };

            pdfMake.createPdf(docDefinition).download(desc_nomina + '- ' + ano_preliquidacion + '-' + mes_preliquidacion);

        };

        self.numero_de_conceptos = function(row) {
            for (var i = 0; i < self.respuesta_persona.length; i++) {
                if (self.respuesta_persona[i].IdPersona == row.IdPersona) {
                    for (var j = 0; j < self.respuesta_persona[i].Conceptos.length; j++) {
                        if (self.respuesta_persona[i].Conceptos[j].Naturaleza === "devengo") {
                            self.numero_conceptos = self.numero_conceptos + 1
                        }
                        if (self.respuesta_persona[i].Conceptos[j].Naturaleza === "descuento") {
                            self.numero_conceptos = self.numero_conceptos + 1

                        }
                    }
                }
            }
        };
    }).filter('filtro_naturaleza_concepto_detalle', function($filter) {
        return function(input, entity) {
            var output;

            if (undefined === input || null === input) {
                return "";
            }

            if (entity.NaturalezaConcepto === "devengo") {
                output = "Devengo";
            }

            if (entity.NaturalezaConcepto === "descuento") {
                output = "Descuento";
            }

            if (entity.NaturalezaConcepto === "seguridad_social") {
                output = "Seguridad Social";
            }

            return output;
        };
    });
