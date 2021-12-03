'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:ConceptoConceptosConsultaCtrl
 * @description
 * # NovedadesNovedadRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
    .controller('ConceptoConceptosConsultaCtrl', function (titanRequest, parametrosRequest, $scope, $translate, $route, $window) {
        var self = this;
        self.id_edicion;
        self.alias_concepto_edicion;
        self.nombre_concepto_edicion;
        $scope.botones_activo = [
            { clase_color: "editar", clase_css: "fa fa-pencil fa-lg  faa-shake animated-hover", titulo: $translate.instant('BTN.EDITAR'), operacion: 'edit', estado: true },
            { clase_color: "borrar", clase_css: "fa fa-times-circle fa-lg  faa-shake animated-hover", titulo: $translate.instant('BTN.INACTIVAR'), operacion: 'inactive', estado: true }
        ];

        $scope.botones_inactivo = [
            { clase_color: "editar", clase_css: "fa fa-pencil fa-lg  faa-shake animated-hover", titulo: $translate.instant('BTN.EDITAR'), operacion: 'edit', estado: true },
            { clase_color: "add", clase_css: "fa fa-plus fa-lg  faa-shake animated-hover", titulo: $translate.instant('BTN.ACTIVAR'), operacion: 'active', estado: true }
        ];

        self.gridOptions_conceptos = {

            enableFiltering: true,
            enableSorting: true,
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            paginationPageSizes: [5, 10, 20],
            paginationPageSize: 10,
            columnDefs: [
                { field: 'Id', visible: false },
                { field: 'NombreConcepto', visible: false },
                {
                    field: 'AliasConcepto',
                    displayName: $translate.instant('CONCEPTO_NOMBRE'),
                    width: '40%',
                    cellClass: 'text-center',
                    headerCellClass: "encabezado",
                    sort: {
                        direction: 'asc',
                        priority: 1
                    },
                },
                {
                    field: 'NaturalezaConceptoNominaId',
                    displayName: $translate.instant('NATURALEZA_NOMBRE'),
                    width: '20%',
                    cellFilter: "filtro_naturaleza_concepto:row.entity",
                    cellClass: 'text-center',
                    headerCellClass: "encabezado",
                    sort: {
                        direction: 'asc',
                        priority: 0
                    },
                },
                {
                    field: 'TipoConceptoNominaId',
                    displayName: $translate.instant('TIPO_NOMBRE'),
                    width: '15%',
                    cellFilter: "filtro_tipo_concepto:row.entity",
                    cellClass: 'text-center',
                    headerCellClass: "encabezado"
                },
                {
                    field: 'EstadoConceptoNominaId',
                    displayName: $translate.instant('ESTADO_CONCEPTO'),
                    width: '15%',
                    cellFilter: "filtro_estado_concepto:row.entity",
                    cellClass: 'text-center',
                    headerCellClass: "encabezado"
                },
                {
                    field: 'Acciones',
                    displayName: $translate.instant('ACCIONES'),
                    width: '10%',
                    cellClass: 'text-center',
                    headerCellClass: "encabezado",
                    cellTemplate: '<a ng-if="row.entity.EstadoConceptoNominaId==417"> <btn-registro funcion="grid.appScope.loadrow(fila,operacion)" grupobotones="grid.appScope.botones_activo" fila="row"></btn-registro></a>' +
                        '<a ng-if="row.entity.EstadoConceptoNominaId==418"> <btn-registro funcion="grid.appScope.loadrow(fila,operacion)" grupobotones="grid.appScope.botones_inactivo" fila="row"></btn-registro></a>'
                }
            ]
        };



        self.gridOptions_conceptos.onRegisterApi = function (gridApi) {
            self.gridApi = gridApi;

        };

        self.gridOptions_conceptos.multiSelect = false;

        titanRequest.get('concepto_nomina', 'limit=-1').then(function (response) {
            self.gridOptions_conceptos.data = response.data.Data;
        });

        parametrosRequest.get('parametro', 'limit=0&sortby=Id&order=desc&query=tipo_parametro_id:32').then(function (response) {
            self.NaturalezaConcepto = response.data.Data;
            console.log(response.data.Data)
        });

        parametrosRequest.get('parametro', 'limit=0&sortby=Id&order=desc&query=tipo_parametro_id:31').then(function (response) {
            self.TipoConcepto = response.data.Data;
            console.log(response.data.Data)
        });

        $scope.loadrow = function (row, operacion) {
            self.operacion = operacion;

            switch (operacion) {
                case "edit":
                    $scope.llenar_modal(row);
                    $('#modal_edicion').modal('show');
                    break;
                case "inactive":
                    $scope.inactivar(row);
                    break;
                case "active":
                    $scope.activar(row);
                    break;
                default:
            }


        };

        $scope.cargar_botones = function (row) {

            $scope.botones = [];

            if (row.entity.EstadoConceptoNominaId === 417) {
                console.log("activo")

            }

            if (row.entity.EstadoConceptoNominaId === 418) {
                console.log("inactivo")
            }

            return $scope.botones
        }

        $scope.llenar_modal = function (row) {

            self.id_edicion = row.entity.Id
            self.alias_concepto_edicion = row.entity.AliasConcepto
            self.nombre_concepto_edicion = row.entity.NombreConcepto
            self.estado_concepto_edicion = row.entity.EstadoConceptoNominaId
            self.FechaCreacion = row.entity.FechaCreacion

        };

        self.actualizar = function (row) {

            if (self.alias_concepto_edicion && self.selectNaturalezaConcepto && self.selectTipoConcepto) {
                var objeto_naturaleza_concepto = JSON.parse(self.selectNaturalezaConcepto);
                var objeto_tipo_concepto = JSON.parse(self.selectTipoConcepto);

                console.log(self.FechaCreacion)

                swal({
                    html: $translate.instant('CONFIRMACION_EDICION') +
                        "<br><b>" + $translate.instant('CONCEPTO_NOMBRE') + ":</b> " + self.alias_concepto_edicion +
                        "<br><b>" + $translate.instant('NATURALEZA_NOMBRE') + ":</b> " + objeto_naturaleza_concepto.Descripcion +
                        "<br><b>" + $translate.instant('TIPO') + ":</b> " + objeto_tipo_concepto.Descripcion + "?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#449D44",
                    cancelButtonColor: "#C9302C",
                    confirmButtonText: $translate.instant('CONFIRMAR'),
                    cancelButtonText: $translate.instant('CANCELAR'),
                }).then(function () {

                    var naturaleza_concepto = {
                        Id: objeto_naturaleza_concepto.Id
                    };

                    var tipo_concepto = {
                        Id: objeto_tipo_concepto.Id
                    };

                    var concepto_editado = {
                        Id: self.id_edicion,
                        NombreConcepto: self.nombre_concepto_edicion,
                        NaturalezaConceptoNominaId: naturaleza_concepto.Id,
                        AliasConcepto: self.alias_concepto_edicion,
                        TipoConceptoNominaId: tipo_concepto.Id,
                        EstadoConceptoNominaId: self.estado_concepto_edicion,
                        FechaCreacion: self.FechaCreacion,
                        Activo: true
                    };

                    titanRequest.put('concepto_nomina', concepto_editado.Id, concepto_editado).then(function (response) {
                        swal({
                            html: $translate.instant('ACTUALIZACION_CORRECTA'),
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        }).then(function () {
                            $('#modal_edicion').modal('hide');
                            titanRequest.get('concepto_nomina', 'limit=-1').then(function (response) {
                                self.gridOptions_conceptos.data = response.data.Data;
                            });
                        })

                    }).catch(function (response) {
                        swal({
                            html: $translate.instant('ACTUALIZACION_INCORRECTA'),
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        }).then(function () {
                            $('#modal_edicion').modal('hide');

                        })
                    });

                }, function (dismiss) {
                    if (dismiss === 'cancel') {

                        $('#modal_edicion').modal('hide');
                        // $window.location.reload()
                    }
                })
            } else {
                swal({
                    html: $translate.instant('ALERTA_COMPLETAR_DATOS_EDICION'),
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#449D44",
                    confirmButtonText: $translate.instant('VOLVER'),
                })
            }
        };

        $scope.inactivar = function (row) {
            swal({
                html: $translate.instant('CONFIRMACION_DESACTIVAR') + "<b>" + row.entity.AliasConcepto + "</b>?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#449D44",
                cancelButtonColor: "#C9302C",
                confirmButtonText: $translate.instant('CONFIRMAR'),
                cancelButtonText: $translate.instant('CANCELAR'),
            }).then(function () {
                var concepto_editado = {
                    Id: row.entity.Id,
                    NombreConcepto: row.entity.NombreConcepto,
                    NaturalezaConceptoNominaId: row.entity.NaturalezaConceptoNominaId,
                    AliasConcepto: row.entity.AliasConcepto,
                    TipoConceptoNominaId: row.entity.TipoConceptoNominaId,
                    EstadoConceptoNominaId: 418,
                    FechaCreacion: row.entity.FechaCreacion,
                    Activo: false
                };
                titanRequest.put('concepto_nomina', row.entity.Id, concepto_editado).then(function (response) {
                    swal({
                        html: $translate.instant('INACTIVACION_CONCEPTO_CORRECTA'),
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#449D44",
                        confirmButtonText: $translate.instant('VOLVER'),
                    }).then(function () {
                        titanRequest.get('concepto_nomina', 'limit=-1').then(function (response) {
                            self.gridOptions_conceptos.data = response.data.Data;
                        });
                    })
                }).catch(function (response) {
                    swal({
                        html: $translate.instant('INACTIVACION_CONCEPTO_INCORRECTA'),
                        type: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#449D44",
                        confirmButtonText: $translate.instant('VOLVER'),
                    })
                });
            })
        };

        $scope.activar = function (row) {
            swal({
                html: $translate.instant('CONFIRMACION_ACTIVAR') + "<b>" + row.entity.AliasConcepto + "</b>?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#449D44",
                cancelButtonColor: "#C9302C",
                confirmButtonText: $translate.instant('CONFIRMAR'),
                cancelButtonText: $translate.instant('CANCELAR'),
            }).then(function () {

                var concepto_editado = {
                    Id: row.entity.Id,
                    NombreConcepto: row.entity.NombreConcepto,
                    NaturalezaConceptoNominaId: row.entity.NaturalezaConceptoNominaId,
                    AliasConcepto: row.entity.AliasConcepto,
                    TipoConceptoNominaId: row.entity.TipoConceptoNominaId,
                    EstadoConceptoNominaId: 417,
                    FechaCreacion: row.entity.FechaCreacion,
                    Activo: true
                };

                titanRequest.put('concepto_nomina', concepto_editado.Id, concepto_editado).then(function (response) {

                    swal({
                        html: $translate.instant('ACTIVACION_CONCEPTO_CORRECTA'),
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#449D44",
                        confirmButtonText: $translate.instant('VOLVER'),
                    }).then(function () {
                        titanRequest.get('concepto_nomina', 'limit=-1').then(function (response) {
                            self.gridOptions_conceptos.data = response.data.Data;
                        });
                    })

                }).catch(function (response) {
                    swal({
                        html: $translate.instant('ACTIVACION_CONCEPTO_INCORRECTA'),
                        type: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#449D44",
                        confirmButtonText: $translate.instant('VOLVER'),
                    })
                });


            })
        };



        self.anadir = function () {

            if (self.alias_concepto_adicion && self.selectNaturalezaConcepto && self.selectTipoConcepto) {
                var objeto_naturaleza_concepto = JSON.parse(self.selectNaturalezaConcepto);
                var objeto_tipo_concepto = JSON.parse(self.selectTipoConcepto);
                swal({
                    html: $translate.instant('CONFIRMACION_ADICION') +
                        "<br><b>" + $translate.instant('CONCEPTO_NOMBRE') + ":</b> " + self.alias_concepto_adicion +
                        "<br><b>" + $translate.instant('NATURALEZA_NOMBRE') + ":</b> " + objeto_naturaleza_concepto.Descripcion +
                        "<br><b>" + $translate.instant('TIPO') + ":</b> " + objeto_tipo_concepto.Descripcion + "?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#449D44",
                    cancelButtonColor: "#C9302C",
                    confirmButtonText: $translate.instant('CONFIRMAR'),
                    cancelButtonText: $translate.instant('CANCELAR'),
                }).then(function () {

                    var objeto_naturaleza_concepto = JSON.parse(self.selectNaturalezaConcepto);
                    var objeto_tipo_concepto = JSON.parse(self.selectTipoConcepto);

                    //pasar alias a minúscula para eliminar espacios
                    var nombre = ""+self.alias_concepto_adicion
                    nombre = nombre.toLowerCase()
                    nombre = nombre.replace(/\s+/g, '')


                    var concepto_nuevo_temp = {
                        Id: 0,
                        NombreConcepto: nombre,
                        NaturalezaConceptoNominaId: objeto_naturaleza_concepto.Id,
                        AliasConcepto: self.alias_concepto_adicion,
                        TipoConceptoNominaId: objeto_tipo_concepto.Id,
                        EstadoConceptoNominaId: 417,
                        Activo: true
                    };

                    titanRequest.post('concepto_nomina', concepto_nuevo_temp).then(function (response) {

                        swal({
                            html: $translate.instant('ADICION_CORRECTA'),
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        }).then(function () {
                            $('#modal_adicion').modal('hide');
                            self.alias_concepto_adicion = ""
                            self.selectNaturalezaConcepto = ""
                            self.selectTipoConcepto = ""
                            titanRequest.get('concepto_nomina', 'limit=-1').then(function (response) {

                                self.gridOptions_conceptos.data = response.data.Data;
                            });
                        })


                    }).catch(function (response) {
                        swal({
                            html: $translate.instant('ADICION_INCORRECTA'),
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        })
                    });

                })
            } else {
                swal({
                    html: $translate.instant('ALERTA_COMPLETAR_DATOS_EDICION'),
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#449D44",
                    confirmButtonText: $translate.instant('VOLVER'),
                })
            }
        };
    }).filter('filtro_tipo_concepto', function ($filter) {
        return function (input, entity) {
            var output;
            if (undefined === input || null === input) {
                return "";
            }

            if (entity.TipoConceptoNominaId === 420) {
                output = "Porcentaje"
            }

            if (entity.TipoConceptoNominaId === 419) {
                output = "Fijo";
            }

            if (entity.TipoConceptoNominaId === 421) {
                output = "Seguridad Social";
            }
            if (entity.TipoConceptoNominaId === 422) {
                output = 'Pago Seguridad Social'
            }

            return output;
        };
    }).filter('filtro_naturaleza_concepto', function ($filter) {
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
    }).filter('filtro_estado_concepto', function ($filter) {
        return function (input, entity) {
            var output;
            if (undefined === input || null === input) {
                return "";
            }

            if (entity.EstadoConceptoNominaId === 417) {
                output = "Activo";
            }

            if (entity.EstadoConceptoNominaId === 418) {
                output = "Inactivo";
            }
            return output;
        };
    });
