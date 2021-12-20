'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:PreliquidacionPreliquidacionPersonasCtrl
 * @description
 * # PreliquidacionPreliquidacionPersonasCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
    .controller('PreliquidacionPreliquidacionPersonasCtrl', function ($localStorage, titanMidRequest, titanRequest, $window, $translate, $route, $location, $scope) {
        var self = this;

        self.preliquidacion = $localStorage.preliquidacion
        self.generar_disponibilidad;
        self.btnGenerartxt = $translate.instant('GENERAR');
        self.saving = false;

        if (self.preliquidacion.NominaId.ParametroPadreId.Nombre === "FP") {

            var rowtpl = '<div ng-class="{\'personas_liquidar\':true, \'personas_no_liquidar\':row.entity.IdEPS==0 || row.entity.IdARL==0 || row.entity.IdFondoPension==0 || row.entity.IdCajaCompensacion==0}"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div></div>';
            self.gridOptions = {
                paginationPageSizes: [20, 40, 60],
                paginationPageSize: 40,
                enableFiltering: true,
                enableSorting: true,
                enableRowSelection: true,
                enableSelectAll: true,
                rowTemplate: rowtpl,
                columnDefs: [
                    { field: 'Id', visible: false },
                    {
                        field: 'NumDocumento', displayName: $translate.instant('DOCUMENTO'),
                        cellTemplate: '<button class="btn btn-link btn-block" ng-click="grid.appScope.preliquidacionPersonas.preliquidar_persona(row)" >{{row.entity.NumDocumento}}</button>',
                    },
                    {
                        field: 'NombreProveedor', displayName: $translate.instant('NOMBRE_PERSONA'),
                        cellClass: 'text-center'
                    },
                    { field: 'NumeroContrato', displayName: $translate.instant('NUM_CONTRATO'), visible: false },
                    { field: 'VigenciaContrato', displayName: $translate.instant('VIGENCIA'), visible: false },
                ],
                onRegisterApi: function (gridApi) {
                    $scope.myGridApi = gridApi;
                }
            };
        }






        /*------- PARA PLANTA ------

        if (self.preliquidacion.Nomina.TipoNomina.Descripcion === "Funcionarios de planta") {
            var rowtpl = '<div ng-class="{\'personas_liquidar\':true, \'personas_no_liquidar\':row.entity.IdEPS==0 || row.entity.IdARL==0 || row.entity.IdFondoPension==0 || row.entity.IdCajaCompensacion==0}"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div></div>';
            self.gridOptions = {
                paginationPageSizes: [5, 15, 20],
                paginationPageSize: 5,
                enableFiltering: true,
                enableSorting: true,
                enableRowSelection: true,
                enableSelectAll: true,
                rowTemplate: rowtpl,
                columnDefs: [
                    { field: 'Id', visible: false },
                    { field: 'NumDocumento', displayName: $translate.instant('DOCUMENTO') },
                    { field: 'NombreProveedor', displayName: $translate.instant('NOMBRE_PERSONA') },
                    { field: 'NumeroContrato', displayName: $translate.instant('NUM_CONTRATO') },
                    { field: 'VigenciaContrato', displayName: $translate.instant('VIGENCIA') },
                ],
                onRegisterApi: function(gridApi) {
                    self.gridApi = gridApi;
                }
            };

            titanRequest.post('funcionario_proveedor', self.preliquidacion.Nomina).then(function(response) {
                self.gridOptions.data = response.data;

            });

            self.generar_preliquidacion = function() {
                var personas = self.gridApi.selection.getSelectedRows();
                var personas_sin_ss = []
                var personas_a_liquidar = [];
                for (var i = 0; i < personas.length; i++) {
                    if (personas[i].IdEPS === 0 || personas[i].IdARL === 0 || personas[i].IdFondoPension === 0 || personas[i].IdCajaCompensacion === 0) {
                        //swal("¡ERROR!","No se puede realizar liquidación","error")
                        var persona = {
                            IdPersona: personas[i].Id,
                            NumDocumento: personas[i].NumDocumento,
                            NumeroContrato: personas[i].NumeroContrato,
                            VigenciaContrato: parseInt(personas[i].VigenciaContrato)
                        };
                        personas_sin_ss.push(persona)
                    }
                }
                if (personas_sin_ss.length != 0) {
                    swal({
                        html: $translate.instant('ALERTA_PERSONAS_SIN_SS'),
                        type: "error",
                        showCancelButton: true,
                        confirmButtonColor: "#449D44",
                        cancelButtonColor: "#C9302C",
                        confirmButtonText: $translate.instant('VOLVER'),
                        cancelButtonText: $translate.instant('SALIR'),
                    }).then(function() {
                        //si da click en ir a contratistas
                        $window.location.href = '#/nomina/nomina_consulta';
                    }, function(dismiss) {

                        if (dismiss === 'cancel') {
                            //si da click en Salir
                            $window.location.href = '#/nomina/nomina_consulta';
                        }
                    })
                } else {
                    for (var i = 0; i < personas.length; i++) {
                        var persona = {
                            IdPersona: personas[i].Id,
                            NumDocumento: personas[i].NumDocumento,
                            NumeroContrato: personas[i].NumeroContrato,
                            VigenciaContrato: parseInt(personas[i].VigenciaContrato)
                        };

                        personas_a_liquidar.push(persona)
                    }
                    var datos_preliquidacion = {
                        Preliquidacion: self.preliquidacion,
                        PersonasPreLiquidacion: personas_a_liquidar

                    };
                    titanRequest.delete('detalle_preliquidacion', '' + self.preliquidacion.Id).then(function(response) {

                    });

                    self.saving = true;
                    self.btnGenerartxt = $translate.instant('GENERANDO');
                    titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

                        self.saving = false;
                        self.btnGenerartxt = $translate.instant('GENERAR');
                        $window.location.href = '#/preliquidacion/preliquidacion_detalle';
                    });;

                }
            }


        };

                if (self.preliquidacion.Nomina.TipoNomina.Descripcion === "Docentes de planta") {
                    self.gridOptions = {
                        paginationPageSizes: [5, 15, 20],
                        paginationPageSize: 5,
                        enableFiltering: true,
                        enableSorting: true,
                        enableRowSelection: true,
                        enableSelectAll: true,
                        columnDefs: [
                            { field: 'Id', visible: false },
                            { field: 'NumDocumento', displayName: $translate.instant('DOCUMENTO') },
                            { field: 'NombreProveedor', displayName: $translate.instant('NOMBRE_PERSONA') },
                            { field: 'NumeroContrato', displayName: $translate.instant('NUM_CONTRATO') },
                            { field: 'VigenciaContrato', displayName: $translate.instant('VIGENCIA') },

                        ],
                        onRegisterApi: function(gridApi) {
                            self.gridApi = gridApi;
                        }

                    };
                    titanRequest.post('funcionario_proveedor', self.preliquidacion.Nomina).then(function(response) {
                        self.gridOptions.data = response.data;
                    });

                    self.generar_preliquidacion = function() {
                        var personas = self.gridApi.selection.getSelectedRows();

                        var personas_a_liquidar = [];
                        for (var i = 0; i < personas.length; i++) {
                            var persona = {
                                IdPersona: personas[i].Id,
                                NumDocumento: personas[i].NumDocumento,
                                NumeroContrato: personas[i].NumeroContrato,
                                VigenciaContrato: parseInt(personas[i].VigenciaContrato)
                            };

                            personas_a_liquidar.push(persona)
                        }
                        var datos_preliquidacion = {
                            Preliquidacion: self.preliquidacion,
                            PersonasPreLiquidacion: personas_a_liquidar

                        };
                        titanRequest.delete('detalle_preliquidacion', '' + self.preliquidacion.Id).then(function(response) {});

                        self.saving = true;
                        self.btnGenerartxt = $translate.instant('GENERANDO');
                        titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

                            self.saving = false;
                            self.btnGenerartxt = $translate.instant('GENERAR')
                            $window.location.href = '#/preliquidacion/preliquidacion_detalle';
                        });;

                    };

                }


        if (self.preliquidacion.Nomina.TipoNomina.Nombre === "PE") {
            self.gridOptions = {
                paginationPageSizes: [5, 15, 20],
                paginationPageSize: 5,
                enableFiltering: true,
                enableSorting: true,
                enableRowSelection: true,
                enableSelectAll: true,
                columnDefs: [
                    { field: 'Id', visible: false },
                    { field: 'NumDocumento', displayName: $translate.instant('DOCUMENTO') },
                    { field: 'NombreProveedor', displayName: $translate.instant('NOMBRE_PERSONA') },
                    { field: 'NumeroContrato', displayName: $translate.instant('NUM_CONTRATO') },
                    { field: 'VigenciaContrato', displayName: $translate.instant('VIGENCIA') },

                ],
                onRegisterApi: function(gridApi) {
                    self.gridApi = gridApi;
                }

            };
            titanRequest.post('funcionario_proveedor', self.preliquidacion.Nomina).then(function(response) {
                self.gridOptions.data = response.data;
            });

            self.generar_preliquidacion = function() {
                var personas = self.gridApi.selection.getSelectedRows();

                var personas_a_liquidar = [];
                for (var i = 0; i < personas.length; i++) {
                    var persona = {
                        IdPersona: personas[i].Id,
                        NumDocumento: personas[i].NumDocumento,
                        NumeroContrato: personas[i].NumeroContrato,
                        VigenciaContrato: parseInt(personas[i].VigenciaContrato)
                    };

                    personas_a_liquidar.push(persona)
                }
                var datos_preliquidacion = {
                    Preliquidacion: self.preliquidacion,
                    PersonasPreLiquidacion: personas_a_liquidar

                };
                titanRequest.delete('detalle_preliquidacion', '' + self.preliquidacion.Id).then(function(response) {

                });

                self.saving = true;
                self.btnGenerartxt = $translate.instant('GENERANDO');
                titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

                    self.saving = false;
                    self.btnGenerartxt = $translate.instant('GENERAR');
                    $window.location.href = '#/preliquidacion/preliquidacion_detalle';
                });;

            };

        }
        */
    }).filter('filtro_nombres_meses', function ($filter, $translate) {
        return function (input, entity) {
            var output;
            if (undefined === input || null === input) {
                return "";
            }

            if (entity.Mes === 1) {
                output = $translate.instant('ENERO');
            }
            if (entity.Mes === 2) {
                output = $translate.instant('FEBRERO');
            }
            if (entity.Mes === 3) {
                output = $translate.instant('MARZO');
            }
            if (entity.Mes === 4) {
                output = $translate.instant('ABRIL');
            }
            if (entity.Mes === 5) {
                output = $translate.instant('MAYO');
            }
            if (entity.Mes === 6) {
                output = $translate.instant('JUNIO');
            }
            if (entity.Mes === 7) {
                output = $translate.instant('JULIO');
            }
            if (entity.Mes === 8) {
                output = $translate.instant('AGOSTO');
            }
            if (entity.Mes === 9) {
                output = $translate.instant('SEPTIEMBRE');
            }
            if (entity.Mes === 10) {
                output = $translate.instant('OCTUBRE');
            }
            if (entity.Mes === 11) {
                output = $translate.instant('NOVIEMBRE');
            }
            if (entity.Mes === 12) {
                output = $translate.instant('DICIEMBRE');
            }
            return output;
        };
    });
