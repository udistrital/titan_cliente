'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:NovedadesNovedadRegistroCtrl
 * @description
 * # NovedadesNovedadRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
    .controller('NovedadesNovedadRegistroCtrl', function(titanRequest, titanMidRequest, $scope, $translate, $routeParams, $window) {
        var self = this;
        self.tipo = $routeParams.tipo;
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
        $scope.botones = [
            { clase_color: "editar", clase_css: "fa fa-pencil fa-lg  faa-shake animated-hover", titulo: $translate.instant('BTN.EDITAR'), operacion: 'edit', estado: true },
            { clase_color: "borrar", clase_css: "fa fa-trash fa-lg  faa-shake animated-hover", titulo: $translate.instant('BTN.BORRAR'), operacion: 'delete', estado: true }
        ];

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


        var preliquidacion = {
              Ano: self.CurrentDate.getFullYear(),
              Mes: self.CurrentDate.getMonth(),
              Nomina: nomina
         }




        $scope.gridOptions_personas = {
            paginationPageSizes: [5, 10, 20],
            paginationPageSize: 10,
            enableFiltering: true,
            enableSorting: true,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            columnDefs: [
                { field: 'id_proveedor', visible: false },
                { field: 'numero_contrato', displayName: $translate.instant('NUM_CONTRATO'), width: '20%' },
                { field: 'vigencia', displayName: $translate.instant('VIGENCIA'), width: '10%' },
                { field: 'nom_proveedor', displayName: $translate.instant('NOMBRE_PERSONA'), width: '50%' },
                { field: 'num_documento', displayName: $translate.instant('DOCUMENTO'), width: '20%' }


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
                    field: 'Concepto.Id',
                    visible: false
                },
                {
                    field: 'Concepto.AliasConcepto',
                    displayName: $translate.instant('NOMBRE_CONCEPTO_NOVEDAD'),
                    width: '30%'
                },
                {
                    field: 'Concepto.TipoConcepto.Nombre',
                    visible: false
                },
                {
                    field: 'ValorNovedad',
                    displayName: $translate.instant('VALOR_CONCEPTO_NOVEDAD'),
                    width: '20%',
                    cellClass: "alineacion_derecha",
                    cellFilter: "filtro_formato_valor_novedad:row.entity"
                },
                {
                    field: 'NumCuotas',
                    displayName: $translate.instant('NUMCUOTAS_CONCEPTO_NOVEDAD'),
                    width: '15%',
                    cellClass: "alineacion_derecha",
                    cellFilter: "filtro_formato_cuotas:row.entity"

                },
                { field: 'FechaDesde', visible: false },
                { field: 'FechaHasta', visible: false },
                { field: 'FechaRegistro', displayName: $translate.instant('FECHA_REGISTRO'), cellTemplate: '<span>{{row.entity.FechaRegistro| date:"yyyy-MM-dd":"+0900"}}</span>', width: '25%', cellClass: "alineacion_derecha" },
                { field: 'Activo', visible: false },
                { field: 'Nomina.Id', visible: false },
                {
                    field: 'Acciones',
                    displayName: $translate.instant('ACCIONES'),
                    width: '10%',
                    cellTemplate: '<center><btn-registro funcion="grid.appScope.loadrow(fila,operacion)" grupobotones="grid.appScope.botones" fila="row"></btn-registro><center>',
                }
                //  cellTemplate: '<button class="btn btn-danger btn-circle" ng-click="grid.appScope.inactivar_novedad(row)" type="submit"><i class="glyphicon glyphicon-trash"></i></button>&nbsp;<button type="button" class="btn btn-success btn-circle" ng-click="grid.appScope.llenar_modal(row)" data-toggle="modal" data-target="#modal_edicion_novedad"><i class="glyphicon glyphicon-pencil"></i></button>&nbsp'},
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
                { field: 'Id', visible: false },
                { field: 'AliasConcepto', displayName: $translate.instant('CONCEPTO') },
                { field: 'NaturalezaConcepto.Id', visible: false },
                { field: 'TipoConcepto.Id', visible: false },
            ]

        };

        $scope.gridOptions_personas.onRegisterApi = function(gridApi) {
            self.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function(row) {
                self.listar_novedades(row)
            });

        };

        $scope.gridOptions_conceptos.onRegisterApi = function(gridApi) {
            self.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function(row) {
                $scope.concepto = row.entity

            });
        };

        $scope.gridOptions_personas.multiSelect = false;
        $scope.gridOptions_novedades.multiSelect = false;
        $scope.gridOptions_conceptos.multiSelect = false;

        titanMidRequest.post('gestion_personas_a_liquidar/listar_personas_a_preliquidar_argo', preliquidacion).then(function(response) {
            $scope.gridOptions_personas.data = response.data;
        });



        titanRequest.get('nomina', 'limit=0&query=TipoNomina.Nombre:' + self.tipo + '&sortby=Id&order=desc').then(function(response) {
            self.Nomina = response.data[0]

        });

        self.listar_conceptos = function(){
          titanRequest.get('concepto_nomina', 'limit=-1&query=EstadoConceptoNomina.Id:1').then(function(response) {
              $scope.gridOptions_conceptos.data = response.data;
              $('#modal_adicion_novedad').modal('show');
          });

        };

        self.listar_novedades = function(row) {
            $scope.persona = row.entity

            titanRequest.get('concepto_nomina_por_persona', 'limit=0&query=Activo:TRUE,NumeroContrato:' + $scope.persona.numero_contrato + ',VigenciaContrato:' + $scope.persona.vigencia +',Nomina.TipoNomina.Nombre:' + self.tipo + '&sortby=Id&order=desc').then(function(response) {
                if (response.data == null) {
                    $scope.gridOptions_novedades.data = [];
                    self.hayNovedad = false
                } else {
                    $scope.gridOptions_novedades.data = response.data;
                    self.hayNovedad = true
                }

            });
        }


        $scope.loadrow = function(row, operacion) {
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

        self.Registrar = function() {


            var valor = parseFloat(self.ValorNovedad)
            var cuotas = parseInt(self.NumCuotas)

           if ($scope.concepto.TipoConcepto.Nombre === "porcentual") {
                cuotas = 999;
            }

            if ($scope.concepto.TipoConcepto.Nombre === "seguridad_social") {
                valor = 0;
                cuotas = 0;
            }

            if ((valor && cuotas) || (valor == 0 && cuotas == 0)) {

                var concepto = { Id: parseInt($scope.concepto.Id) };
                var nomina = { Id: parseInt(self.Nomina.Id) };
                var novedad_por_persona = {
                    Concepto: concepto,
                    Activo: Boolean("true"),
                    FechaDesde: self.FechaInicio,
                    FechaHasta: self.FechaFin,
                    FechaRegistro: self.CurrentDate,
                    NumCuotas: cuotas,
                    NumeroContrato: $scope.persona.numero_contrato,
                    VigenciaContrato: parseInt($scope.persona.vigencia),
                    Nomina: nomina,
                    ValorNovedad: valor
                };


                titanRequest.post('concepto_nomina_por_persona', novedad_por_persona).then(function(response) {

                    if (typeof(response.data) == "object") {
                        swal({
                            html: $translate.instant('NOVEDAD_REG_CORRECTO'),
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        }).then(function() {
                            $('#modal_adicion_novedad').modal('hide');
                            $window.location.reload()
                        })

                    }
                    if (typeof(response.data) == "string") {
                        swal({
                            html: $translate.instant('NOVEDAD_REG_ERROR'),
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        }).then(function() {
                            $('#modal_adicion_novedad').modal('hide');
                            $window.location.reload()
                        })

                    }
                });
            }
        };


        $scope.inactivar_novedad = function(row) {
            swal({
                html: $translate.instant('CONFIRMACION_INACTIVIDAD_NOV') + row.entity.Concepto.AliasConcepto + "?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#449D44",
                cancelButtonColor: "#C9302C",
                confirmButtonText: $translate.instant('CONFIRMAR'),
                cancelButtonText: $translate.instant('CANCELAR'),
            }).then(function() {
                var nomina_novedad = {
                    Id: parseInt(row.entity.Nomina.Id)
                }
                var concepto_novedad = {
                    Id: parseInt(row.entity.Concepto.Id)
                }

                var novedad_por_persona_a_inactivar = {
                    Id: row.entity.Id,
                    Concepto: concepto_novedad,
                    Activo: Boolean(false),
                    FechaDesde: row.entity.FechaDesde,
                    FechaHasta: row.entity.FechaHasta,
                    FechaRegistro: row.entity.FechaRegistro,
                    NumCuotas: row.entity.NumCuotas,
                    NumeroContrato: $scope.persona.numero_contrato,
                    VigenciaContrato: parseInt($scope.persona.vigencia),
                    Nomina: nomina_novedad,
                    ValorNovedad: row.entity.ValorNovedad
                };

                titanRequest.put('concepto_nomina_por_persona', novedad_por_persona_a_inactivar.Id, novedad_por_persona_a_inactivar).then(function(response) {
                    if (response.data == "OK") {
                        swal({
                            html: $translate.instant('INACTIVIDAD_CORRECTA_NOV'),
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        }).then(function() {
                            $window.location.reload()
                        })
                    } else {
                        swal({
                            html: $translate.instant('INACTIVIDAD_INCORRECTA_NOV'),
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        }).then(function() {
                            $window.location.reload()
                        })
                    }
                });


            })
        };

        $scope.llenar_modal = function(row) {

            self.id_edicion = row.entity.Id
            self.id_concepto_edicion = row.entity.Concepto.Id
            self.concepto_nombre_edicion = row.entity.Concepto.AliasConcepto
            self.tipo_concepto_edicion = row.entity.Concepto.TipoConcepto.Nombre
            self.activo_edicion = row.entity.Activo
            self.num_cuotas_edicion = row.entity.NumCuotas
            self.id_nomina_edicion = row.entity.Nomina.Id
            self.valor_novedad_edicion = row.entity.ValorNovedad
            self.persona_edicion = row.entity.Persona
        };

        self.Editar = function() {

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
                }).then(function() {
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
                        NumeroContrato: $scope.persona.numero_contrato,
                        VigenciaContrato: parseInt($scope.persona.vigencia),
                        Nomina: nomina_novedad,
                        ValorNovedad: parseFloat(self.valor_novedad_edicion)
                    };

                    titanRequest.put('concepto_nomina_por_persona', novedad_por_persona_a_editar.Id, novedad_por_persona_a_editar).then(function(response) {
                        if (response.data == "OK") {
                            swal({
                                html: $translate.instant('EDICION_CORRECTA_NOV'),
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#449D44",
                                confirmButtonText: $translate.instant('VOLVER'),
                            }).then(function() {
                                $window.location.reload()
                            })
                        } else {
                            swal({
                                html: $translate.instant('EDICION_INCORRECTA_NOV'),
                                type: "error",
                                showCancelButton: false,
                                confirmButtonColor: "#449D44",
                                confirmButtonText: $translate.instant('VOLVER'),
                            }).then(function() {
                                $window.location.reload()
                            })
                        }
                    });


                })
            }
        };



    }).filter('filtro_formato_valor_novedad', function($filter) {
        return function(input, entity) {
            var output;
            if (undefined === input || null === input) {
                return "";
            }

            if (entity.Concepto.TipoConcepto.Nombre === "porcentual") {
                output = (input) + "%";
            }

            if (entity.Concepto.TipoConcepto.Nombre === "fijo") {
                output = "$" + (input);
            }

            if (entity.Concepto.TipoConcepto.Nombre === "seguridad_social") {
                output = "No aplica";
            }

            return output;
        };
    }).filter('filtro_formato_cuotas', function($filter) {
        return function(input, entity) {
            var output;
            if (undefined === input || null === input) {
                return "";
            }

            if (entity.Concepto.TipoConcepto.Nombre === "porcentual") {
                output = "Fija";
            }

            if (entity.Concepto.TipoConcepto.Nombre === "fijo") {
                output = input;
            }

            if (entity.Concepto.TipoConcepto.Nombre === "seguridad_social") {
                output = "No aplica";
            }

            return output;
        };
    });
