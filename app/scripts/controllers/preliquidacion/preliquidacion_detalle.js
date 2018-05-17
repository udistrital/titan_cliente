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
            paginationPageSizes: [10, 20],
            paginationPageSize: 10,
            enableFiltering: false,
            enableSorting: false,
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            enableSelectAll: false,
            columnDefs: [{
                    field: 'IdPersona',
                    visible: false
                },
                {
                    field: 'NumeroContrato',
                    displayName: $translate.instant('NUM_CONTRATO'),
                    width: '20%',
                    cellTemplate: '<button class="btn btn-link btn-block" ng-click="grid.appScope.preliquidacionDetalle.ver_seleccion_persona(row)" >{{row.entity.NumeroContrato}}</button>',
                    cellClass: function(grid, row) {
                        if (row.entity.Disponibilidad === 2) {
                            return 'si_pago';
                        } else if (row.entity.Disponibilidad === 1) {
                            return 'no_pago';
                        }
                    }
                },
                {
                    field: 'Vigencia',
                    displayName: $translate.instant('VIGENCIA'),
                    width: '10%',
                    cellClass: function(grid, row) {
                        if (row.entity.Disponibilidad === 2) {
                            return 'si_pago';
                        } else if (row.entity.Disponibilidad === 1) {
                            return 'no_pago';
                        }
                    }
                },
                {
                    field: 'NombreCompleto',
                    displayName: $translate.instant('NOMBRE_PERSONA'),
                    width: '50%',
                    cellClass: function(grid, row) {
                        if (row.entity.Disponibilidad === 2) {
                            return 'si_pago';
                        } else if (row.entity.Disponibilidad === 1) {
                            return 'no_pago';
                        }
                    }
                },
                {
                    field: 'Documento',
                    displayName: $translate.instant('DOCUMENTO'),
                    width: '20%',
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


        /*
	    self.CalcularTotalesNomina = function(){
	    	var seleccion_personas = self.gridApi.selection.getSelectedRows();
	    	var temp_sueldo_neto = 0;
	    	var temp_resumen_conceptos = {};
      	 	for (var i=0; i < seleccion_personas.length; i++){
      	 		for (var j=0; j< seleccion_personas[i].Conceptos.length; j++){
      	 			if(seleccion_personas[i].Conceptos[j].Naturaleza === "devengo"){
     					temp_sueldo_neto = temp_sueldo_neto+parseInt(seleccion_personas[i].Conceptos[j].Valor);
     					if(temp_resumen_conceptos[seleccion_personas[i].Conceptos[j].Nombre] != null){
     						temp_resumen_conceptos[seleccion_personas[i].Conceptos[j].Nombre] += parseInt(seleccion_personas[i].Conceptos[j].Valor);
     					}else{
     						temp_resumen_conceptos[seleccion_personas[i].Conceptos[j].Nombre] = parseInt(seleccion_personas[i].Conceptos[j].Valor);
     					}
	     			}else if (seleccion_personas[i].Conceptos[j].Naturaleza === "descuento"){
	     				temp_sueldo_neto = temp_sueldo_neto-parseInt(seleccion_personas[i].Conceptos[j].Valor);
	     				if(temp_resumen_conceptos[seleccion_personas[i].Conceptos[j].Nombre] != null){
     						temp_resumen_conceptos[seleccion_personas[i].Conceptos[j].Nombre] += parseInt(seleccion_personas[i].Conceptos[j].Valor);
     					}else{
     						temp_resumen_conceptos[seleccion_personas[i].Conceptos[j].Nombre] = parseInt(seleccion_personas[i].Conceptos[j].Valor);
     					}
	     			}
      	 		}

      	 	}
      	 	self.total_sueldos_neto = temp_sueldo_neto;
      	 	self.resumen_conceptos = temp_resumen_conceptos;
	    };
 */
        titanMidRequest.post('preliquidacion/resumen', self.preliquidacion).then(function(response) {

            self.total_contratos_liquidados = response.data.length
            var temp_resumen_conceptos = {};
            var temp_sueldo_neto = 0;
            for (var i = 0; i < response.data.length; i++) {

                for (var j = 0; j < response.data[i].Conceptos.length; j++) {

                    if (response.data[i].Conceptos[j].Naturaleza === "devengo") {

                        temp_sueldo_neto = temp_sueldo_neto + parseInt(response.data[i].Conceptos[j].Valor);
                        if (temp_resumen_conceptos[response.data[i].Conceptos[j].Nombre] != null) {
                            temp_resumen_conceptos[response.data[i].Conceptos[j].Nombre] += parseInt(response.data[i].Conceptos[j].Valor);
                        } else {
                            temp_resumen_conceptos[response.data[i].Conceptos[j].Nombre] = parseInt(response.data[i].Conceptos[j].Valor);
                        }
                    } else if (response.data[i].Conceptos[j].Naturaleza === "descuento") {

                        temp_sueldo_neto = temp_sueldo_neto - parseInt(response.data[i].Conceptos[j].Valor);
                        if (temp_resumen_conceptos[response.data[i].Conceptos[j].Nombre] != null) {
                            temp_resumen_conceptos[response.data[i].Conceptos[j].Nombre] += parseInt(response.data[i].Conceptos[j].Valor);
                        } else {
                            temp_resumen_conceptos[response.data[i].Conceptos[j].Nombre] = parseInt(response.data[i].Conceptos[j].Valor);
                        }
                    }
                }

            }
            self.gridOptions.data = response.data;
            self.total_sueldos_neto = temp_sueldo_neto;

            self.resumen_conceptos = temp_resumen_conceptos;
            self.respuesta_persona = response.data;


        });

        self.ver_seleccion_persona = function(row) {


            self.seleccion_conceptos = null;
            self.seleccion_conceptos = row.entity.Conceptos
            if (row.entity.Disponibilidad == 1) {
                self.estado_disponibilidad = $translate.instant('NO');
            } else {
                self.estado_disponibilidad = $translate.instant('SI');
            }

            var temp_sueldo_neto = 0;
            var temp_total_desc = 0;
            var temp_total_devengo = 0;

            for (var i = 0; i < self.seleccion_conceptos.length; i++) {
                if (self.seleccion_conceptos[i].Naturaleza === "devengo") {
                    temp_sueldo_neto = temp_sueldo_neto + parseInt(self.seleccion_conceptos[i].Valor);
                    temp_total_devengo = temp_total_devengo + parseInt(self.seleccion_conceptos[i].Valor);
                } else if (self.seleccion_conceptos[i].Naturaleza === "descuento") {
                    temp_sueldo_neto = temp_sueldo_neto - parseInt(self.seleccion_conceptos[i].Valor);
                    temp_total_desc = temp_total_desc + parseInt(self.seleccion_conceptos[i].Valor);
                }

            }
            self.seleccion_sueldoNeto = temp_sueldo_neto;
            self.seleccion_tot_descuentos = temp_total_desc;
            self.seleccion_tot_devengo = temp_total_devengo;

        };

        self.solicitar_op = function() {

            var Estado_Pre = {
                Id: 4
            }

            console.log(self.preliquidacion)
            self.preliquidacion.EstadoPreliquidacion = Estado_Pre

            titanRequest.put('preliquidacion', self.preliquidacion.Id, self.preliquidacion).then(function(response) {

                if (response.data == "OK") {
                    swal({
                        html: $translate.instant('CAMBIO_ESTADO_OP_CORRECTO'),
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#449D44",
                        confirmButtonText: $translate.instant('VOLVER'),
                    }).then(function() {
                        $location.path('/preliquidacion/preliquidacion_registro/' + self.preliquidacion.Nomina.TipoNomina.Nombre);
                        $route.reload()
                    })

                } else {
                    swal({
                        html: $translate.instant('CAMBIOS_ESTADO_OP_INCORRECTO'),
                        type: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#449D44",
                        confirmButtonText: $translate.instant('VOLVER'),
                    }).then(function() {
                        $location.path('/preliquidacion/preliquidacion_registro/' + self.preliquidacion.Nomina.TipoNomina.Nombre);
                        $route.reload()
                    })
                }
            });

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
    });
