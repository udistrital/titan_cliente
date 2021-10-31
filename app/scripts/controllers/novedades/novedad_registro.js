'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:NovedadesNovedadRegistroCtrl
 * @description
 * # NovedadesNovedadRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
    .controller('NovedadesNovedadRegistroCtrl', function (titanRequest, titanMidRequest, parametrosRequest, $scope, $translate, $routeParams, $window) {
        var self = this;
        self.CurrentDate = new Date()
        self.tipo = $routeParams.tipo;

        if (self.tipo == 'CT') {
            self.tipo_id = 411
        } else if (self.tipo == 'HCH') {
            self.tipo_id = 409
        } else if (self.tipo == 'HCS') {
            self.tipo_id = 410
        }


        if (self.tipo_id == 411) {
            self.tipoNom_id = 414
        } else if (self.tipo_id == 419) {
            self.tipo_id = 415
        } else if (self.tipo == 410) {
            self.tipo_id = 416
        }

        self.ShowForm = function () {
            self.formVisibility = true;
            this.listar_contratos()
        };

        self.Nomina;
        self.CurrentDate = new Date();
        self.id_edicion;
        self.id_concepto_edicion;
        self.tipo_concepto_edicion;
        self.activo_edicion;
        self.num_cuotas_edicion;
        self.id_nomina_edicion;
        self.valor_novedad_edicion;
        self.persona_edicion;
        self.concepto_nombre_edicion;
        self.Cuotas;
        $scope.botones = [
            //{ clase_color: "editar", clase_css: "fa fa-pencil fa-lg  faa-shake animated-hover", titulo: $translate.instant('BTN.EDITAR'), operacion: 'edit', estado: true },
            { clase_color: "borrar", clase_css: "fa fa-trash fa-lg  faa-shake animated-hover", titulo: $translate.instant('BTN.BORRAR'), operacion: 'delete', estado: true }
        ];

        self.anioPeriodo = new Date().getFullYear();
        self.anios = [];


        self.meses = {
            1: $translate.instant('ENERO'),
            2: $translate.instant('FEBRERO'),
            3: $translate.instant('MARZO'),
            4: $translate.instant('ABRIL'),
            5: $translate.instant('MAYO'),
            6: $translate.instant('JUNIO'),
            7: $translate.instant('JULIO'),
            8: $translate.instant('AGOSTO'),
            9: $translate.instant('SEPTIEMBRE'),
            10: $translate.instant('OCTUBRE'),
            11: $translate.instant('NOVIEMBRE'),
            12: $translate.instant('DICIEMBRE')
        };

        //Crea un arreglo de objetos para tener los años desde el 1900 hasta el año actual con el metodo getFullYear()
        function calcularAnios() {
            for (var i = new Date().getFullYear(); i >= 2015; i--) {
                self.anios.push({ anio: i });
            }
        }
        calcularAnios();


        var tipo_vin = {
            Id: 0,
            Nombre: "",
            Activo: Boolean("true"),
        };

        var tipo_nom = {
            Id: 0,
            Nombre: self.tipo,
            Activo: Boolean("true"),
        };

        var nomina = {
            Id: 0,
            Descripcion: "",
            TipoVinculacion: tipo_vin,
            TipoNomina: tipo_nom,
            Activo: Boolean("true"),
        };

        $scope.gridOptions_personas = {
            paginationPageSizes: [20, 40, 60],
            paginationPageSize: 40,
            enableFiltering: true,
            enableSorting: true,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {
                    field: 'ContratoId.NumeroContrato',
                    displayName: $translate.instant('NUM_CONTRATO'),
                    width: '20%',
                    headerCellClass: 'encabezado',
                    cellClass: "text-center"
                },
                {
                    field: 'ContratoId.Documento',
                    displayName: $translate.instant('DOCUMENTO'),
                    width: '20%',
                    cellClass: "text-center",
                    headerCellClass: 'encabezado',
                },
                {
                    field: 'ContratoId.NombreCompleto',
                    displayName: $translate.instant('NOMBRE_PERSONA'),
                    width: '60%',
                    cellClass: "text-center",
                    headerCellClass: 'encabezado',
                },
            ],
        };

        $scope.gridOptions_novedades = {
            paginationPageSizes: [5, 15, 20],
            paginationPageSize: 5,
            enableFiltering: true,
            enableSorting: true,
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            columnDefs: [{
                field: 'Id',
                visible: false
            },
            {
                field: 'ConceptoNominaId.Id',
                visible: false
            },
            {
                field: 'ContratoId.Id',
                visible: false
            },
            {
                field: 'ContratoId.NumeroContrato',
                displayName: $translate.instant('NUM_CONTRATO'),
                width: '10%',
                headerCellClass: 'encabezado',
                cellClass: "text-center"
            },
            {
                field: 'ContratoId.Vigencia',
                displayName: $translate.instant('VIGENCIA'),
                width: '10%',
                headerCellClass: 'encabezado',
                cellClass: "text-center"
            },
            {
                field: 'ContratoId.NombreCompleto',
                displayName: $translate.instant('NOMBRE_PERSONA'),
                width: '20%',
                headerCellClass: 'encabezado',
                cellClass: "text-center"
            },
            {
                field: 'ConceptoNominaId.AliasConcepto',
                displayName: $translate.instant('NOMBRE_CONCEPTO_NOVEDAD'),
                width: '15%',
                headerCellClass: 'encabezado',
                cellClass: "text-center"
            },
            {
                field: 'ConceptoNominaId.TipoConceptoNominaId',
                visible: false
            },
            {
                field: 'Valor',
                displayName: $translate.instant('VALOR_CONCEPTO_NOVEDAD'),
                width: '10%',
                cellClass: "text-center",
                headerCellClass: 'encabezado',
                cellFilter: "filtro_formato_valor_novedad:row.entity"
            },
            {
                field: 'Cuotas',
                displayName: $translate.instant('NUMCUOTAS_CONCEPTO_NOVEDAD'),
                width: '10%',
                cellClass: "text-center",
                headerCellClass: 'encabezado',
                cellFilter: "filtro_formato_cuotas:row.entity"

            },
            {
                field: 'FechaInicio',
                displayName: $translate.instant('FECHA_INICIO'),
                cellTemplate: '<span>{{row.entity.FechaInicio| date:"yyyy-MM-dd":"+0900"}}</span>',
                width: '10%',
                headerCellClass: 'encabezado',
                cellClass: "text-center"
            },
            {
                field: 'FechaHasta',
                displayName: $translate.instant('FECHA_FIN'),
                cellTemplate: '<span>{{row.entity.FechaFin| date:"yyyy-MM-dd":"+0900"}}</span>',
                width: '10%',
                headerCellClass: 'encabezado',
                cellClass: "text-center"
            },
            {
                field: 'FechaCreacion',
                displayName: $translate.instant('FECHA_REGISTRO'),
                cellFilter: "filtro_fecha:row.entity",
                width: '10%',
                headerCellClass: 'encabezado',
                cellClass: "text-center"
            },
            {
                field: 'Activo',
                cellFilter: "filtro_activo:row.entity",
                width: '10%',
                headerCellClass: 'encabezado',
                cellClass: "text-center"
            },
            {
                field: 'Acciones',
                displayName: $translate.instant('ACCIONES'),
                width: '10%',
                cellClass: "text-center",
                headerCellClass: 'encabezado',
                cellTemplate: '<btn-registro funcion="grid.appScope.loadrow(fila,operacion)" grupobotones="grid.appScope.botones" fila="row"></btn-registro>',
            }
            ],
        };


        $scope.gridOptions_conceptos = {
            paginationPageSizes: [5, 15, 20],
            paginationPageSize: 10,
            enableFiltering: true,
            enableSorting: true,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                {
                    field: 'AliasConcepto',
                    displayName: $translate.instant('CONCEPTO'),
                    headerCellClass: 'encabezado',
                },
                {
                    field: 'NaturalezaConceptoNominaId',
                    displayName: $translate.instant('NATURALEZA_NOMBRE'),
                    cellClass: "text-center",
                    headerCellClass: 'encabezado',
                    cellFilter: "filtro_formato_naturaleza:row.entity"
                },
                {
                    field: 'TipoConceptoNominaId',
                    displayName: $translate.instant('TIPO_NOMBRE'),
                    cellClass: "text-center",
                    headerCellClass: 'encabezado',
                    cellFilter: "filtro_formato_tipos:row.entity"
                }
            ]
        };

        $scope.gridOptions_personas.onRegisterApi = function (gridApi) {
            self.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.Contrato = row.entity.ContratoId
                self.listar_conceptos()
            });
        };

        $scope.gridOptions_conceptos.onRegisterApi = function (gridApi) {
            self.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.concepto = row.entity

                if ($scope.concepto.TipoConceptoNominaId == 419) {
                    self.mostrar_grid_contratos_fijo = true;
                    self.mostrar_grid_contratos_porcentual = false;
                    self.mostrar_grid_contratos_ss = false;
                }

                if ($scope.concepto.TipoConceptoNominaId == 420) {
                    self.mostrar_grid_contratos_porcentual = true;
                    self.mostrar_grid_contratos_fijo = false;
                    self.mostrar_grid_contratos_ss = false;

                }

                if ($scope.concepto.ConceptoNominaId == 421) {
                    self.mostrar_grid_contratos_ss = true;
                    self.mostrar_grid_contratos_porcentual = false;
                    self.mostrar_grid_contratos_fijo = false;
                }
            });
        };

        $scope.gridOptions_personas.multiSelect = false;
        $scope.gridOptions_novedades.multiSelect = false;
        $scope.gridOptions_conceptos.multiSelect = false;

        parametrosRequest.get('parametro', 'limit=-1&query=Nombre:' + self.tipo).then(function (response) {
            self.Nomina = response.data.Data[0]
        });

        self.listar_conceptos = function () {
            titanRequest.get('concepto_nomina', 'limit=-1&query=Activo:TRUE').then(function (response) {
                if (Object.keys(response.data.Data[0]).length == 0) {
                    $scope.gridOptions_conceptos.data = [];
                    self.hayNovedad = false
                } else {
                    $scope.gridOptions_conceptos.data = response.data.Data;
                    self.hayNovedad = true
                }
            });
        }

        titanRequest.get('novedad', 'limit=-1&query=ContratoId.TipoNominaId:' + self.tipo_id + '&sortby=FechaCreacion&order=desc').then(function (response) {
            if (Object.keys(response.data.Data).length == 0) {
                $scope.gridOptions_novedades.data = [];
                self.hayNovedad = false
            } else {
                $scope.gridOptions_novedades.data = response.data.Data;
                self.hayNovedad = true
            }
        });


        self.listar_contratos = function () {
            titanRequest.get('contrato_preliquidacion', 'limit=-1&query=PreliquidacionId.Ano:' + self.CurrentDate.getFullYear() + ',PreliquidacionId.Mes:' + self.CurrentDate.getMonth() + ',PreliquidacionId.NominaId:' + self.tipoNom_id).then(function (response) {
                if (Object.keys(response.data.Data).length == 0) {
                    swal({
                        html: $translate.instant('ERROR_NOV_PRELIQ'),
                        type: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#449D44",
                        confirmButtonText: $translate.instant('VOLVER'),
                    })
                } else {
                    $scope.gridOptions_personas.data = response.data.Data;
                }
            }).catch(function (response) {
                swal({
                    html: $translate.instant('ERROR_NOV_PRELIQ'),
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#449D44",
                    confirmButtonText: $translate.instant('VOLVER'),
                })
            });
        }


        $scope.loadrow = function (row, operacion) {
            self.operacion = operacion;
            switch (operacion) {
                case "edit":
                    $scope.llenar_modal(row);
                    $('#modal_edicion_novedad').modal('show');
                    break;
                case "delete":
                    $scope.inactivar_novedad(row);
                    break;
                default:
            }
        };

        self.Registrar = function () {
           
            // if (self.ValorNovedad == undefined || self.Cuotas == undefined) {
            //     swal({
            //         html: $translate.instant('NOVEDAD_REG_ERROR'),
            //         type: "error",
            //         showCancelButton: true,
            //         showConfirmButton: false,
            //         cancelButtonColor: "#C9302C",
            //         cancelButtonText: $translate.instant('SALIR'),
            //     })
            // } else {
                if ($scope.concepto.TipoConceptoNominaId === 420 || $scope.concepto.TipoConceptoNominaId) {
                    self.novedad = {
                        ContratoId: {
                            Id: $scope.Contrato.Id
                        },
                        ConceptoNominaId: {
                            Id: $scope.concepto.Id
                        },
                        Valor: self.ValorNovedad,
                        Cuotas: self.Cuotas,
                        Activo: true
                    }
                }

                if ($scope.concepto.TipoConceptoNominaId === 421) {
                    valor = 0;
                    cuotas = 0;
                    info_contratos = self.informacion_contratos_porcentual.data;
                }

                console.log(self.novedad)
                titanMidRequest.post('novedad/agregar_novedad', self.novedad).then(function (response) {
                    console.log(response.data)
                    if (response.data == null) {
                        swal({
                            html: $translate.instant('NOVEDAD_REG_ERROR'),
                            type: "error",
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonColor: "#C9302C",
                            cancelButtonText: $translate.instant('SALIR'),
                        })
                    } else {
                        swal({
                            html: $translate.instant('NOVEDAD_REG_CORRECTO'),
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        }).then(function () {
                            $('#modal_adicion_novedad').modal('hide');
                        })
                        titanRequest.get('novedad', 'limit=-1&query=ContratoId.TipoNominaId:' + self.tipo_id + '&sortby=FechaCreacion&order=desc').then(function (response) {
                            if (Object.keys(response.data.Data[0]).length == 0) {
                                $scope.gridOptions_novedades.data = [];
                                self.hayNovedad = false
                            } else {
                                $scope.gridOptions_novedades.data = response.data.Data;
                                self.hayNovedad = true
                            }
                        })
                    }
                });
            


        };


        $scope.inactivar_novedad = function (row) {
            var fecha_actual = new Date()
            if (row.entity.Activo == false) {
                swal({
                    html: 'La novedad Ya se encuentra inactiva',
                    type: "warning",
                    confirmButtonText: 'Ok',
                    confirmButtonColor: "#FF0000",
                }).then(function (response) {
                    row.setSelected(false);
                })
            } else if (parseInt(row.entity.FechaFin.split("-")[1], 10) <= (fecha_actual.getMonth() + 1)) {
                swal({
                    html: 'No se puede inactivar una novedad pasada',
                    type: "warning",
                    confirmButtonText: 'Ok',
                    confirmButtonColor: "#FF0000",
                }).then(function (response) {
                    row.setSelected(false);
                })
            } else {
                swal({
                    html: $translate.instant('CONFIRMACION_INACTIVIDAD_NOV') + row.entity.ConceptoNominaId.AliasConcepto + "?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#449D44",
                    cancelButtonColor: "#C9302C",
                    confirmButtonText: $translate.instant('CONFIRMAR'),
                    cancelButtonText: $translate.instant('CANCELAR'),
                }).then(function () {
                    titanMidRequest.get('novedad', '/eliminar_novedad/' + row.entity.Id).then(function (response) {
                        swal({
                            html: $translate.instant('INACTIVIDAD_CORRECTA_NOV'),
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        }).then(function () {
                            $window.location.reload()
                        })
                    }).catch(function (response) {
                        swal({
                            html: $translate.instant('INACTIVIDAD_INCORRECTA_NOV'),
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        }).then(function () {
                            $window.location.reload()
                        })
                    });
                })
            }
        };

        $scope.llenar_modal = function (row) {

            self.id_edicion = row.entity.Id
            self.id_concepto_edicion = row.entity.Concepto.Id
            self.concepto_nombre_edicion = row.entity.Concepto.AliasConcepto
            self.tipo_concepto_edicion = row.entity.Concepto.TipoConcepto.Nombre
            self.activo_edicion = row.entity.Activo
            self.num_cuotas_edicion = row.entity.NumCuotas
            self.id_nomina_edicion = row.entity.Nomina.Id
            self.valor_novedad_edicion = row.entity.ValorNovedad
            self.persona_edicion = row.entity.Persona
            self.num_contrato_edicion = row.entity.NumeroContrato;
            self.vigencia_contrato_edicion = row.entity.VigenciaContrato;
            self.persona_edicion = row.entity.Persona;

        };

        self.Editar = function () {

            if ((self.valor_novedad_edicion && self.num_cuotas_edicion) || (self.valor_novedad_edicion == 0 && self.num_cuotas_edicion == 0)) {
                swal({
                    html: $translate.instant('CONFIRMACION_EDICION_NOV') +
                        "<br><b>" + self.concepto_nombre_edicion + "?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#449D44",
                    cancelButtonColor: "#C9302C",
                    confirmButtonText: $translate.instant('CONFIRMAR'),
                    cancelButtonText: $translate.instant('CANCELAR'),
                }).then(function () {
                    var nomina_novedad = {
                        Id: parseInt(self.id_nomina_edicion)
                    }
                    var concepto_novedad = {
                        Id: parseInt(self.id_concepto_edicion)
                    }

                    var novedad_por_persona_a_editar = {
                        Id: parseInt(self.id_edicion),
                        Concepto: concepto_novedad,
                        Activo: Boolean("true"),
                        FechaDesde: self.FechaInicio,
                        FechaHasta: self.FechaFin,
                        FechaRegistro: self.CurrentDate,
                        NumCuotas: parseInt(self.num_cuotas_edicion),
                        NumeroContrato: self.num_contrato_edicion,
                        VigenciaContrato: parseInt(self.vigencia_contrato_edicion),
                        Nomina: nomina_novedad,
                        ValorNovedad: parseFloat(self.valor_novedad_edicion),
                        Persona: parseInt(self.persona_edicion)
                    };

                    console.log("objeto edicion", novedad_por_persona_a_editar)

                    titanRequest.put('concepto_nomina_por_persona', novedad_por_persona_a_editar.Id, novedad_por_persona_a_editar).then(function (response) {

                        swal({
                            html: $translate.instant('EDICION_CORRECTA_NOV'),
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        }).then(function () {
                            $window.location.reload()
                        })

                    }).catch(function (response) {
                        swal({
                            html: $translate.instant('EDICION_INCORRECTA_NOV'),
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        })
                    });
                })
            }
        };

        $('#modal_adicion_novedad').on('hidden.bs.modal', function (e) {

            self.mostrar_grid_contratos_ss = false;
            self.mostrar_grid_contratos_fijo = false;
            self.mostrar_grid_contratos_porcentual = false;
            $scope.mostrar_preliq = false;
        })

    }).filter('filtro_formato_valor_novedad', function ($filter) {
        return function (input, entity) {
            var output;
            if (undefined === input || null === input) {
                return "";
            }

            if (entity.ConceptoNominaId.TipoConceptoNominaId === 420) {
                output = (input) + "%";
            }

            if (entity.ConceptoNominaId.TipoConceptoNominaId === 419) {
                output = "$" + (input);
            }

            if (entity.ConceptoNominaId.TipoConceptoNominaId === 421) {
                output = "No aplica";
            }

            return output;
        };
    }).filter('filtro_formato_cuotas', function ($filter) {
        return function (input, entity) {
            var output;
            if (undefined === input || null === input) {
                return "";
            }

            if (entity.ConceptoNominaId.TipoConceptoNominaId === 420) {
                output = "Valor";
            }

            if (entity.ConceptoNominaId.TipoConceptoNominaId === 419) {
                output = input;
            }

            if (entity.ConceptoNominaId.TipoConceptoNominaId === 421) {
                output = "No aplica";
            }

            return output;
        };
    }).filter('filtro_formato_naturaleza', function ($filter) {
        return function (input, entity) {
            var output;
            if (undefined === input || null === input) {
                return "";
            }

            if (entity.NaturalezaConceptoNominaId === 423) {
                output = "Devengo";
            }

            if (entity.NaturalezaConceptoNominaId === 424) {
                output = "Descuento";
            }

            if (entity.NaturalezaConceptoNominaId === 425) {
                output = "Seguridad Social";
            }

            return output;
        };
    }).filter('filtro_formato_tipos', function ($filter) {
        return function (input, entity) {
            var output;
            if (undefined === input || null === input) {
                return "";
            }

            if (entity.TipoConceptoNominaId === 420) {
                output = "Porcentual";
            }

            if (entity.TipoConceptoNominaId === 419) {
                output = "fijo";
            }

            if (entity.TipoConceptoNominaId === 421) {
                output = "Seguridad Social";
            }
            return output;
        };
    }).filter('filtro_fecha', function ($filter, $translate) {
        return function (input, entity) {
            var output = entity.FechaCreacion.split(" ");
            return output[0]
        };
    }).filter('filtro_activo', function ($filter, $translate) {
        return function (input, entity) {
            var output;
            if (undefined === input || null === input) {
                return "";
            }

            if (entity.Activo === true) {
                output = "Activo";
            }

            if (entity.Activo === false) {
                output = "Inactivo";
            }

            return output;
        };
    });
