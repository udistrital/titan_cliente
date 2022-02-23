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
